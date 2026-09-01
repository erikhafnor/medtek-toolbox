<script lang="ts">
  // Booking island — rendered client:only, so browser APIs are safe here.
  //
  // Both courses' semesters arrive in a single /api/availability response; this
  // component composes them into a week → slot → group seat map and posts a
  // seat claim. The server remains the authority on capacity — everything
  // disabled here is also rejected there.
  import {
    courseById,
    isPastSlot,
    listSemesterWeeks,
    osloMinutesOfDay,
    isLabOpenYet,
    labDates,
    labOpensOn,
    osloToday,
    seatsFreeFor,
    slotOf,
    type SeatBooking,
  } from '../../lib/booking/logic';
  import { COURSES } from '../../lib/booking/courses';
  import {
    buildIcs,
    googleCalendarUrl,
    icsFilename,
    type CalendarEvent,
  } from '../../lib/booking/calendar';
  import { LAB_ROOM, roomLabel } from '../../lib/room';
  import { RETENTION_DAYS_AFTER_SEMESTER } from '../../lib/booking/retention';
  import type { BookingLabels } from '../../lib/booking/labels';
  import type { Locale } from '../../lib/i18n';

  interface LabInfo {
    id: string;
    title: string;
    shortTitle: string;
    course: string;
    equipment: string[];
    requiredDevices: string[];
    groupsPerSlot: number;
    seatsPerGroup: number;
  }
  interface PublicSeat extends SeatBooking {
    id: string;
    bookedBy: string;
  }
  interface StoredBooking {
    id: string;
    labId: string;
    labTitle: string;
    date: string;
    slot: number;
    /** Slot times captured at booking time, so an exported event stays right. */
    start: string;
    end: string;
    group: number;
    seat: number;
    cancelToken: string;
  }

  let {
    labs,
    inventory,
    locale,
    labels,
  }: {
    labs: LabInfo[];
    inventory: Record<string, { label: string; quantity: number }>;
    locale: Locale;
    labels: BookingLabels;
  } = $props();

  const BOOKINGS_KEY = 'medtek-lab-seats';
  const STUDENT_KEY = 'medtek-student';
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const intl = locale === 'no' ? 'nb-NO' : 'en-GB';
  const courseIds = COURSES.map((course) => course.id);

  function initialLabId(): string {
    const requested = new URLSearchParams(window.location.search).get('lab');
    return labs.some((l) => l.id === requested) ? requested! : (labs[0]?.id ?? '');
  }

  function loadStoredBookings(): StoredBooking[] {
    try {
      const parsed = JSON.parse(localStorage.getItem(BOOKINGS_KEY) ?? '[]');
      if (!Array.isArray(parsed)) return [];
      const today = osloToday();
      return parsed.filter(
        (b) =>
          b &&
          typeof b.id === 'string' &&
          typeof b.cancelToken === 'string' &&
          typeof b.labId === 'string' &&
          typeof b.labTitle === 'string' &&
          typeof b.date === 'string' &&
          typeof b.start === 'string' &&
          typeof b.end === 'string' &&
          Number.isInteger(b.slot) &&
          Number.isInteger(b.group) &&
          Number.isInteger(b.seat) &&
          b.date >= today
      );
    } catch {
      return [];
    }
  }

  /** Name and email are remembered so the next lab needs no retyping. */
  function loadStudent(): { name: string; email: string } {
    try {
      const parsed = JSON.parse(localStorage.getItem(STUDENT_KEY) ?? '{}');
      return {
        name: typeof parsed?.name === 'string' ? parsed.name : '',
        email: typeof parsed?.email === 'string' ? parsed.email : '',
      };
    } catch {
      return { name: '', email: '' };
    }
  }

  const student = loadStudent();
  const firstLabId = initialLabId();

  let selectedLabId = $state(firstLabId);
  let selectedCourseId = $state(
    labs.find((l) => l.id === firstLabId)?.course ?? courseIds[0]
  );
  let name = $state(student.name);
  let email = $state(student.email);

  let bookings = $state<PublicSeat[] | null>(null);
  let loadFailed = $state(false);
  let refreshTick = $state(0);

  /** `date:slot:group` of the seat being claimed, so one button spins. */
  let claiming = $state<string | null>(null);
  let submitError = $state<string | null>(null);
  let success = $state<StoredBooking | null>(null);

  let myBookings = $state(loadStoredBookings());
  let cancellingId = $state<string | null>(null);
  let cancelError = $state<string | null>(null);

  const today = osloToday();
  const nowMinutes = osloMinutesOfDay();

  const courseLabs = $derived(labs.filter((l) => l.course === selectedCourseId));
  const selectedLab = $derived(
    courseLabs.find((l) => l.id === selectedLabId) ?? courseLabs[0]
  );
  const course = $derived(courseById(selectedCourseId));
  const courseWeeks = $derived(course ? listSemesterWeeks(course) : []);
  /** Only the days the selected lab actually runs — its slice of the rotation. */
  const weeks = $derived.by(() => {
    const runs = new Set(labDates(selectedLabId));
    return courseWeeks.filter((week) => runs.has(week.date));
  });
  /** Elective labs say so, since students take only some of them. */
  const electiveInfo = $derived.by(() => {
    if (!course?.electivePicks) return null;
    const lab = course.labs.find((l) => l.id === selectedLabId);
    if (!lab?.elective) return null;
    return { picks: course.electivePicks, total: course.labs.filter((l) => l.elective).length };
  });

  /** A core lab whose schedule carries a spare day beyond what the cohort needs. */
  const hasSpareDay = $derived.by(() => {
    const lab = course?.labs.find((l) => l.id === selectedLabId);
    if (!course?.cohortSize || !lab || lab.elective) return false;
    const seats = labDates(selectedLabId).length * course.slots.length * lab.seatsPerGroup;
    return seats - course.cohortSize >= course.slots.length * lab.seatsPerGroup;
  });

  /** Set while the lab is visible but not yet claimable. */
  const opensOn = $derived(
    selectedLab && !isLabOpenYet(selectedLab.id, today) ? labOpensOn(selectedLab.id) : null
  );

  /** Which labs run on each lab day — the rotation, for the plan table. */
  const weeklyPlan = $derived.by(() =>
    // closed weeks stay in, so the gap in the semester is explained here rather
    // than silently missing from a lab's own list of days
    courseWeeks.map((week) => ({
      ...week,
      labs: week.open ? courseLabs.filter((lab) => labDates(lab.id).includes(week.date)) : [],
    }))
  );
  const detailsValid = $derived(name.trim().length >= 2 && EMAIL_RE.test(email.trim()));

  /** A seat this browser already holds for the selected lab, if any. */
  const myBookingForLab = $derived(myBookings.find((b) => b.labId === selectedLabId));

  /**
   * A seat this browser holds in a *different* lab in the same slot. Surfaced
   * so the slot is visibly blocked rather than failing only on submit.
   */
  function myOtherLabInSlot(date: string, slot: number): StoredBooking | undefined {
    return myBookings.find(
      (b) => b.date === date && b.slot === slot && b.labId !== selectedLabId
    );
  }

  function pickCourse(id: string) {
    selectedCourseId = id;
    selectedLabId = labs.find((l) => l.course === id)?.id ?? '';
    submitError = null;
    success = null;
  }

  // Load both semesters, and reload after every mutation.
  $effect(() => {
    void refreshTick;
    bookings = null;
    loadFailed = false;
    let stale = false;
    fetch('/api/availability')
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error(String(r.status)))))
      .then((data) => {
        if (!stale) bookings = data.bookings ?? [];
      })
      .catch(() => {
        if (!stale) loadFailed = true;
      });
    return () => {
      stale = true;
    };
  });

  function persistBookings(list: StoredBooking[]) {
    myBookings = list;
    try {
      localStorage.setItem(BOOKINGS_KEY, JSON.stringify(list));
    } catch {
      // private browsing or a full quota — the booking itself still stands
    }
  }

  function persistStudent() {
    try {
      localStorage.setItem(STUDENT_KEY, JSON.stringify({ name: name.trim(), email: email.trim() }));
    } catch {
      // non-fatal; the fields simply won't be remembered next visit
    }
  }

  function fill(template: string, values: Record<string, string | number>): string {
    return template.replace(/\{(\w+)\}/g, (_, key) => String(values[key] ?? ''));
  }

  function formatDate(date: string): string {
    return new Intl.DateTimeFormat(intl, {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      timeZone: 'UTC',
    }).format(new Date(`${date}T00:00:00Z`));
  }

  function formatShort(date: string): string {
    return new Intl.DateTimeFormat(intl, {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      timeZone: 'UTC',
    }).format(new Date(`${date}T00:00:00Z`));
  }

  function weekdayName(date: string): string {
    return new Intl.DateTimeFormat(intl, { weekday: 'long', timeZone: 'UTC' }).format(
      new Date(`${date}T00:00:00Z`)
    );
  }

  const semesterRange = $derived(
    weeks.length === 0
      ? ''
      : fill(labels.semesterRange, {
          first: formatShort(weeks[0].date),
          last: formatShort(weeks[weeks.length - 1].date),
          day: weekdayName(weeks[0].date),
        })
  );

  const closedNote = $derived(
    !course || course.closedWeeks.length === 0
      ? ''
      : fill(labels.closedWeeksNote, {
          weeks: new Intl.ListFormat(intl, { type: 'conjunction' }).format(
            course.closedWeeks.map(String)
          ),
        })
  );

  const capacityNote = $derived(
    selectedLab
      ? fill(labels.capacityNote, {
          groups: selectedLab.groupsPerSlot,
          groupWord: selectedLab.groupsPerSlot === 1 ? labels.groupOne : labels.groupMany,
          seats: selectedLab.seatsPerGroup,
        })
      : ''
  );

  /** Seats already claimed in one group of one slot, in seat order. */
  function seatsIn(date: string, slot: number, group: number): PublicSeat[] {
    return (bookings ?? [])
      .filter(
        (b) =>
          b.labId === selectedLabId && b.date === date && b.slot === slot && b.group === group
      )
      .sort((a, b) => a.seat - b.seat);
  }

  function freeSeatsIn(date: string, slot: number, group: number): number {
    return seatsFreeFor(bookings ?? [], selectedLabId, date, slot, group);
  }

  function isMine(seatBooking: PublicSeat): boolean {
    return myBookings.some((b) => b.id === seatBooking.id);
  }

  function groupNumbers(lab: LabInfo): number[] {
    return Array.from({ length: lab.groupsPerSlot }, (_, i) => i + 1);
  }

  /** Every group of one slot, with its seats — one row of the sign-up sheet. */
  function groupsIn(date: string, slot: number) {
    if (!selectedLab) return [];
    return groupNumbers(selectedLab).map((group) => ({
      group,
      taken: seatsIn(date, slot, group),
      free: freeSeatsIn(date, slot, group),
    }));
  }

  function slotTime(slotIndex: number): string {
    const period = course ? slotOf(course, slotIndex) : null;
    return period ? `${period.start}–${period.end}` : '';
  }

  async function claimSeat(date: string, slot: number, group: number) {
    if (!detailsValid || !selectedLab || !course) return;
    claiming = `${date}:${slot}:${group}`;
    submitError = null;
    success = null;
    persistStudent();
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          labId: selectedLab.id,
          date,
          slot,
          group,
          name: name.trim(),
          email: email.trim(),
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        submitError = data.error ?? 'network';
        // someone may have taken the seat meanwhile — refresh the stale map
        if (response.status === 409) refreshTick++;
        return;
      }
      const period = slotOf(course, slot);
      const stored: StoredBooking = {
        id: data.booking.id,
        labId: selectedLab.id,
        labTitle: selectedLab.title,
        date,
        slot,
        start: period?.start ?? '',
        end: period?.end ?? '',
        group,
        seat: data.booking.seat,
        cancelToken: data.cancelToken,
      };
      persistBookings([...myBookings, stored]);
      success = stored;
      refreshTick++;
    } catch {
      submitError = 'network';
    } finally {
      claiming = null;
    }
  }

  /** A booking as a calendar event: its own slot times, in the lab room. */
  function toEvent(booking: StoredBooking): CalendarEvent {
    const labPage = `${window.location.origin}/${locale}/labs/${booking.labId}/`;
    return {
      // stable per booking, so re-importing updates rather than duplicates
      uid: `${booking.id}@medtek.tools`,
      title: booking.labTitle,
      date: booking.date,
      start: booking.start,
      end: booking.end,
      location: roomLabel(locale),
      description: `${fill(labels.group, { group: booking.group })}\n${labPage}`,
    };
  }

  function downloadIcs(booking: StoredBooking) {
    const blob = new Blob([buildIcs(toEvent(booking))], {
      type: 'text/calendar;charset=utf-8',
    });
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    link.download = icsFilename(booking.labId, booking.date);
    document.body.appendChild(link);
    link.click();
    link.remove();
    // revoked on the next tick: Safari reads the blob after click() returns
    setTimeout(() => URL.revokeObjectURL(href), 0);
  }

  /** Bookings recovered by email — view only, so no cancel token comes back. */
  let lookupEmail = $state('');
  let lookupBusy = $state(false);
  let lookupResult = $state<Array<{ labId: string; date: string; slot: number; group: number }> | null>(
    null
  );

  async function findMyBookings() {
    const email = (lookupEmail || email).trim();
    if (!EMAIL_RE.test(email)) return;
    lookupBusy = true;
    lookupResult = null;
    try {
      const response = await fetch('/api/bookings/lookup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await response.json().catch(() => ({}));
      lookupResult = response.ok ? (data.bookings ?? []) : [];
    } catch {
      lookupResult = [];
    } finally {
      lookupBusy = false;
    }
  }

  function labTitleOf(labId: string): string {
    return labs.find((l) => l.id === labId)?.title ?? labId;
  }

  function slotTimeOf(labId: string, slot: number): string {
    const c = COURSES.find((course) => course.labs.some((l) => l.id === labId));
    const period = c ? slotOf(c, slot) : null;
    return period ? `${period.start}–${period.end}` : '';
  }

  async function cancelStored(booking: StoredBooking) {
    cancellingId = booking.id;
    cancelError = null;
    try {
      const response = await fetch(`/api/bookings/${booking.id}`, {
        method: 'DELETE',
        headers: { 'x-cancel-token': booking.cancelToken },
      });
      if (response.status === 204 || response.status === 404) {
        persistBookings(myBookings.filter((b) => b.id !== booking.id));
        if (success?.id === booking.id) success = null;
        refreshTick++;
      } else {
        cancelError = labels.errors.network;
      }
    } catch {
      cancelError = labels.errors.network;
    } finally {
      cancellingId = null;
    }
  }

  const chipClass =
    'rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700 transition-colors hover:border-blue-400 hover:bg-blue-100';

  /** One card shell, so every panel on the page shares the same edge. */
  const panel = 'rounded-xl border border-gray-200 bg-white';
</script>

{#snippet calendarLinks(booking: StoredBooking)}
  <p class="mt-2 text-xs text-gray-400">{labels.addToCalendar}</p>
  <div class="mt-1 flex flex-wrap items-center gap-2">
    <button type="button" onclick={() => downloadIcs(booking)} class={chipClass}>
      {labels.calendarFile}
    </button>
    <a
      href={googleCalendarUrl(toEvent(booking))}
      target="_blank"
      rel="noopener noreferrer"
      class={chipClass}
    >
      {labels.googleCalendar}
    </a>
  </div>
{/snippet}

{#snippet seatRow(date: string, slot: number, group: number, taken: PublicSeat[], free: number, past: boolean, clash: StoredBooking | undefined)}
  <span class="flex flex-wrap items-center gap-1">
    {#if selectedLab && selectedLab.groupsPerSlot > 1}
      <span class="mr-0.5 w-4 shrink-0 text-[11px] font-semibold text-gray-400">
        {String.fromCharCode(64 + group)}
      </span>
    {/if}

    {#each taken as s (s.id)}
      <span
        class={`rounded px-1.5 py-0.5 text-[11px] leading-tight ${
          isMine(s)
            ? 'bg-emerald-100 font-semibold text-emerald-800'
            : 'bg-gray-100 text-gray-600'
        }`}
        title={isMine(s) ? labels.you : s.bookedBy}
      >{s.bookedBy}{#if isMine(s)}&nbsp;<span class="font-normal">({labels.you})</span>{/if}</span>
    {/each}

    {#each Array(free) as _, i (i)}
      {#if i === 0 && !past}
        <!-- the affordance stays visible but disabled: a grid of inert boxes
             gives no clue that a seat can be taken at all -->
        <button
          type="button"
          disabled={!detailsValid ||
            claiming !== null ||
            opensOn !== null ||
            myBookingForLab !== undefined ||
            clash !== undefined}
          title={opensOn
            ? labels.errors['opens-later']
            : myBookingForLab
              ? labels.errors['already-booked']
              : clash
                ? labels.errors['same-slot']
                : !detailsValid
                  ? labels.detailsHint
                  : ''}
          onclick={() => claimSeat(date, slot, group)}
          class="rounded border border-dashed border-blue-400 px-1.5 py-0.5 text-[11px] font-semibold leading-tight text-blue-700 transition-colors hover:border-blue-600 hover:bg-blue-50 disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-gray-50 disabled:text-gray-400 disabled:hover:bg-gray-50"
        >
          {claiming === `${date}:${slot}:${group}` ? labels.booking : `+ ${labels.freeSeat}`}
        </button>
      {:else}
        <span
          class="inline-block h-[18px] w-[18px] rounded border border-dashed border-gray-300 bg-gray-50/60"
          title={labels.freeSeat}
          aria-label={labels.freeSeat}
        ></span>
      {/if}
    {/each}

    {#if free === 0}
      <span class="text-[11px] text-gray-400">{labels.groupFull}</span>
    {/if}
  </span>
{/snippet}

<div class="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px] lg:items-start">
  <div class="space-y-5">
    <!-- Controls: course, lab, and who you are -->
    <section class={`${panel} divide-y divide-gray-100`}>
      <div class="p-5">
        <div class="flex flex-wrap items-start gap-x-6 gap-y-3">
          <div class="flex shrink-0 items-center gap-2">
            <span class="text-xs font-semibold uppercase tracking-wide text-gray-400">
              {labels.course}
            </span>
            <div class="flex rounded-lg border border-gray-300 p-0.5" role="group" aria-label={labels.course}>
              {#each courseIds as id (id)}
                <button
                  type="button"
                  aria-pressed={selectedCourseId === id}
                  onclick={() => pickCourse(id)}
                  class={`rounded-md px-3 py-1 text-sm font-semibold transition-colors ${
                    selectedCourseId === id
                      ? 'bg-gray-900 text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {id}
                </button>
              {/each}
            </div>
          </div>

          <div
            class="flex w-full min-w-0 flex-wrap gap-1.5 sm:w-auto sm:flex-1"
            role="group"
            aria-label={labels.lab}
          >
            {#each courseLabs as lab (lab.id)}
              <button
                type="button"
                aria-pressed={selectedLabId === lab.id}
                title={lab.title}
                onclick={() => {
                  selectedLabId = lab.id;
                  submitError = null;
                  success = null;
                }}
                class={`rounded-lg px-2.5 py-1 text-sm font-medium transition-colors ${
                  selectedLabId === lab.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {lab.shortTitle}
              </button>
            {/each}
          </div>
        </div>
      </div>

      <div class="flex flex-wrap items-end gap-3 bg-gray-50/70 p-5">
        <div class="min-w-[10rem] flex-1">
          <label for="booking-name" class="mb-1 block text-xs font-medium text-gray-500">
            {labels.name}
          </label>
          <input
            id="booking-name"
            type="text"
            bind:value={name}
            placeholder={labels.namePlaceholder}
            minlength="2"
            maxlength="80"
            class="w-full rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none"
          />
        </div>
        <div class="min-w-[12rem] flex-1">
          <label for="booking-email" class="mb-1 block text-xs font-medium text-gray-500">
            {labels.email}
          </label>
          <input
            id="booking-email"
            type="email"
            bind:value={email}
            placeholder={labels.emailPlaceholder}
            maxlength="120"
            class="w-full rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm focus:border-blue-500 focus:outline-none"
          />
        </div>
        {#if !detailsValid}
          <p class="basis-full text-xs text-gray-500 sm:basis-auto sm:pb-2">{labels.detailsHint}</p>
        {/if}
        <p class="basis-full text-[11px] leading-relaxed text-gray-400">
          {fill(labels.privacy, { retention: RETENTION_DAYS_AFTER_SEMESTER })}
        </p>
      </div>
    </section>

    {#if submitError}
      <p class="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
        {labels.errors[submitError] ?? labels.errors.network}
      </p>
    {/if}

    {#if success}
      <div class="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800" role="status">
        <p class="font-semibold">{labels.successTitle}</p>
        <p class="mt-0.5">
          {fill(labels.successBody, {
            seat: success.seat,
            group: success.group,
            date: formatDate(success.date),
            time: `${success.start}–${success.end}`,
            room: LAB_ROOM,
          })}
        </p>
        {@render calendarLinks(success)}
      </div>
    {/if}

    <!-- The sign-up sheet: lab days down, sessions across -->
    <section class={panel} aria-label={labels.semester}>
      <div class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-gray-100 p-5">
        <div>
          <h2 class="text-base font-semibold text-gray-900">{selectedLab?.title}</h2>
          <p class="mt-0.5 text-xs text-gray-500">
            {capacityNote} · {roomLabel(locale)}
          </p>
        </div>
        <p class="text-xs text-gray-400">{semesterRange}</p>
      </div>

      {#if electiveInfo}
        <p class="border-b border-gray-100 bg-violet-50/60 px-5 py-2 text-xs font-medium text-violet-800">
          {fill(labels.electiveNote, electiveInfo)}
        </p>
      {:else if hasSpareDay}
        <p class="border-b border-gray-100 px-5 py-2 text-xs text-gray-500">{labels.spareDayNote}</p>
      {/if}
      {#if opensOn}
        <p class="border-b border-gray-100 bg-amber-50 px-5 py-2 text-xs font-medium text-amber-800">
          {fill(labels.lockedNote, { date: formatDate(opensOn) })}
        </p>
      {:else if myBookingForLab}
        <!-- without this the seats simply go quiet once you hold one, and the
             reason you cannot take another is invisible -->
        <p class="border-b border-gray-100 bg-emerald-50 px-5 py-2 text-xs font-medium text-emerald-800">
          {labels.errors['already-booked']}
        </p>
      {/if}

      {#if loadFailed}
        <p class="p-5 text-sm text-red-600" role="alert">{labels.errors.network}</p>
      {:else if bookings === null}
        <p class="p-5 text-sm text-gray-400">{labels.loading}</p>
      {:else if selectedLab && course}
        <div class="overflow-x-auto">
          <table class="w-full border-collapse text-sm">
            <thead>
              <tr class="border-b border-gray-100 text-left">
                <th scope="col" class="w-px whitespace-nowrap py-2 pl-5 pr-3 text-xs font-semibold uppercase tracking-wide text-gray-400">
                  {labels.day}
                </th>
                {#each course.slots as period, i (i)}
                  <th scope="col" class="py-2 pr-5 text-xs font-semibold tabular-nums text-gray-500">
                    {period.start}–{period.end}
                  </th>
                {/each}
              </tr>
            </thead>
            <tbody>
              {#each weeks as week (week.date)}
                <tr class="border-b border-gray-50 align-top last:border-0 hover:bg-gray-50/60">
                  <th scope="row" class="whitespace-nowrap py-2.5 pl-5 pr-3 text-left font-normal">
                    <span class="block text-xs font-semibold text-gray-900">
                      {fill(labels.week, { week: week.isoWeek })}
                    </span>
                    <span class="block text-[11px] text-gray-400">{formatShort(week.date)}</span>
                  </th>
                  {#each course.slots as _period, i (i)}
                    {@const slot = i + 1}
                    {@const past = isPastSlot(course, week.date, slot, today, nowMinutes)}
                    {@const clash = myOtherLabInSlot(week.date, slot)}
                    <td class="py-2.5 pr-5" data-date={week.date} data-slot={slot}>
                      {#if past}
                        <span class="text-[11px] text-gray-300">{labels.weekPast}</span>
                      {:else}
                        <span class="flex flex-col gap-1">
                          {#each groupsIn(week.date, slot) as g (g.group)}
                            {@render seatRow(week.date, slot, g.group, g.taken, g.free, past, clash)}
                          {/each}
                        </span>
                        {#if clash}
                          <span class="mt-1 block text-[11px] text-amber-700">
                            {fill(labels.busyThisWeek, { lab: clash.labTitle })}
                          </span>
                        {/if}
                      {/if}
                    </td>
                  {/each}
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
        {#if closedNote}
          <p class="border-t border-gray-100 px-5 py-2.5 text-xs text-gray-500">{closedNote}</p>
        {/if}
      {/if}
    </section>
  </div>

  <div class="space-y-5">
    <!-- My bookings -->
    <section class={panel} aria-label={labels.myBookings}>
      <h2 class="border-b border-gray-100 px-4 py-3 text-sm font-semibold text-gray-900">
        {labels.myBookings}
      </h2>
      {#if myBookings.length === 0}
        <p class="px-4 py-3 text-sm text-gray-400">{labels.myBookingsEmpty}</p>
      {:else}
        <ul class="divide-y divide-gray-100">
          {#each myBookings as booking (booking.id)}
            <li class="px-4 py-3 text-sm">
              <p class="font-medium text-gray-900">{booking.labTitle}</p>
              <p class="mt-0.5 text-xs text-gray-500">
                {formatDate(booking.date)} · {booking.start}–{booking.end}
              </p>
              <p class="text-xs text-gray-500">
                {fill(labels.group, { group: booking.group })} · {LAB_ROOM}
              </p>
              {@render calendarLinks(booking)}
              <button
                type="button"
                onclick={() => cancelStored(booking)}
                disabled={cancellingId === booking.id}
                class="mt-2 text-xs font-medium text-red-600 underline underline-offset-2 hover:text-red-700 disabled:text-gray-400"
              >
                {cancellingId === booking.id ? labels.cancelling : labels.cancel}
              </button>
            </li>
          {/each}
        </ul>
      {/if}
      {#if cancelError}
        <p class="px-4 pb-3 text-xs text-red-600" role="alert">{cancelError}</p>
      {/if}
    </section>

    <!-- Recover bookings made in another browser -->
    <section class={panel}>
      <h2 class="border-b border-gray-100 px-4 py-3 text-sm font-semibold text-gray-900">
        {labels.findMine}
      </h2>
      <div class="px-4 py-3">
        <p class="text-xs text-gray-500">{labels.findMineHint}</p>
        <div class="mt-2 flex flex-wrap gap-2">
          <label class="sr-only" for="booking-lookup">{labels.email}</label>
          <input
            id="booking-lookup"
            type="email"
            bind:value={lookupEmail}
            placeholder={email || labels.emailPlaceholder}
            maxlength="120"
            class="min-w-0 flex-1 rounded-lg border border-gray-300 px-2.5 py-1.5 text-xs focus:border-blue-500 focus:outline-none"
          />
          <button
            type="button"
            onclick={findMyBookings}
            disabled={lookupBusy}
            class="rounded-lg bg-gray-900 px-2.5 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-gray-700 disabled:bg-gray-300"
          >
            {lookupBusy ? labels.findMineSearching : labels.findMineAction}
          </button>
        </div>

        {#if lookupResult !== null}
          {#if lookupResult.length === 0}
            <p class="mt-2 text-xs text-gray-500">{labels.findMineNone}</p>
          {:else}
            <p class="mt-2 text-xs text-gray-500">
              {fill(labels.findMineFound, { count: lookupResult.length })}
            </p>
            <ul class="mt-1 space-y-1.5">
              {#each lookupResult as b (b.labId + b.date + b.slot)}
                <li class="rounded border border-gray-200 px-2 py-1.5 text-xs">
                  <span class="block font-medium text-gray-900">{labTitleOf(b.labId)}</span>
                  <span class="block text-gray-500">
                    {formatDate(b.date)} · {slotTimeOf(b.labId, b.slot)} · {LAB_ROOM}
                  </span>
                </li>
              {/each}
            </ul>
            <p class="mt-2 text-[11px] text-gray-400">{labels.findMineCancelHint}</p>
          {/if}
        {/if}
      </div>
    </section>

    <!-- Rotation: which labs are set up each week -->
    {#if weeklyPlan.length > 0}
      <section class={panel} aria-label={labels.weeklyPlan}>
        <div class="border-b border-gray-100 px-4 py-3">
          <h2 class="text-sm font-semibold text-gray-900">{labels.weeklyPlan}</h2>
          <p class="mt-0.5 text-xs text-gray-500">{labels.weeklyPlanHint}</p>
        </div>
        <table class="w-full border-collapse text-xs">
          <tbody>
            {#each weeklyPlan as day (day.date)}
              <tr class="border-b border-gray-50 last:border-0">
                <th scope="row" class="whitespace-nowrap py-1.5 pl-4 pr-2 text-left align-top font-medium text-gray-500">
                  {fill(labels.week, { week: day.isoWeek })}
                </th>
                <td class="py-1.5 pr-4">
                  {#if !day.open}
                    <span class="text-gray-400">{labels.weekClosed}</span>
                  {:else}
                    <span class="flex flex-wrap gap-1">
                      {#each day.labs as lab (lab.id)}
                        <button
                          type="button"
                          onclick={() => {
                            selectedLabId = lab.id;
                            submitError = null;
                            success = null;
                          }}
                          title={lab.title}
                          class={`rounded px-1.5 py-0.5 transition-colors ${
                            lab.id === selectedLabId
                              ? 'bg-blue-100 font-semibold text-blue-800'
                              : 'text-gray-600 hover:bg-gray-100'
                          }`}
                        >
                          {lab.shortTitle}
                        </button>
                      {/each}
                    </span>
                  {/if}
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      </section>
    {/if}
  </div>
</div>
