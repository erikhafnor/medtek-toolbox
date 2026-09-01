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
  import type { BookingLabels } from '../../lib/booking/labels';
  import type { Locale } from '../../lib/i18n';

  interface LabInfo {
    id: string;
    title: string;
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

<div class="grid gap-8 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
  <div class="space-y-6">
    <!-- Course and lab selector -->
    <section class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 class="mb-3 text-sm font-medium text-gray-700">{labels.course}</h2>
      <div class="flex flex-wrap gap-2" role="group" aria-label={labels.course}>
        {#each courseIds as id (id)}
          <button
            type="button"
            aria-pressed={selectedCourseId === id}
            onclick={() => pickCourse(id)}
            class={`rounded-lg border px-4 py-2 text-sm font-semibold transition-colors ${
              selectedCourseId === id
                ? 'border-gray-900 bg-gray-900 text-white'
                : 'border-gray-300 bg-white text-gray-700 hover:border-gray-500'
            }`}
          >
            {id}
          </button>
        {/each}
      </div>

      <h2 class="mt-5 mb-3 text-sm font-medium text-gray-700">{labels.lab}</h2>
      <div class="flex flex-wrap gap-2" role="group" aria-label={labels.lab}>
        {#each courseLabs as lab (lab.id)}
          <button
            type="button"
            aria-pressed={selectedLabId === lab.id}
            onclick={() => {
              selectedLabId = lab.id;
              submitError = null;
              success = null;
            }}
            class={`rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
              selectedLabId === lab.id
                ? 'border-blue-600 bg-blue-600 text-white'
                : 'border-gray-300 bg-white text-gray-700 hover:border-blue-400'
            }`}
          >
            {lab.title}
          </button>
        {/each}
      </div>

      {#if selectedLab}
        <p class="mt-3 text-xs font-medium text-gray-600">{capacityNote}</p>
        {#if selectedLab.requiredDevices.length > 0}
          <p class="mt-2 text-xs text-gray-500">
            <span class="font-medium">{labels.requires}:</span>
            {#each selectedLab.requiredDevices as key (key)}
              <span
                class={`ml-1 inline-block rounded border px-1.5 py-0.5 ${
                  (inventory[key]?.quantity ?? 0) <= 1
                    ? 'border-amber-200 bg-amber-50 text-amber-800'
                    : 'border-blue-100 bg-blue-50 text-blue-700'
                }`}
              >
                {inventory[key]?.label ?? key}
                {#if (inventory[key]?.quantity ?? 0) <= 1}
                  · {labels.singleUnit}
                {/if}
              </span>
            {/each}
          </p>
        {/if}
      {/if}
    </section>

    <!-- Student details -->
    <section class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 class="mb-3 text-sm font-medium text-gray-700">{labels.yourDetails}</h2>
      <div class="grid gap-4 sm:grid-cols-2">
        <div>
          <label for="booking-name" class="mb-1 block text-xs font-medium text-gray-600">
            {labels.name}
          </label>
          <input
            id="booking-name"
            type="text"
            bind:value={name}
            placeholder={labels.namePlaceholder}
            minlength="2"
            maxlength="80"
            class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
          />
        </div>
        <div>
          <label for="booking-email" class="mb-1 block text-xs font-medium text-gray-600">
            {labels.email}
          </label>
          <input
            id="booking-email"
            type="email"
            bind:value={email}
            placeholder={labels.emailPlaceholder}
            maxlength="120"
            class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
          />
        </div>
      </div>
      {#if !detailsValid}
        <p class="mt-2 text-xs text-gray-500">{labels.detailsHint}</p>
      {/if}
    </section>

    {#if submitError}
      <div
        class="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        role="alert"
      >
        {labels.errors[submitError] ?? labels.errors.network}
      </div>
    {/if}

    {#if success}
      <div
        class="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800"
        role="status"
      >
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
        <p class="mt-1 text-emerald-700">{labels.successKeep}</p>
        {@render calendarLinks(success)}
      </div>
    {/if}

    <!-- Rotation overview: which labs are set up on which day -->
    {#if weeklyPlan.length > 0}
      <section class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 class="text-sm font-semibold text-gray-900">{labels.weeklyPlan}</h2>
        <p class="mt-0.5 text-xs text-gray-500">{labels.weeklyPlanHint}</p>
        <div class="mt-3 overflow-x-auto">
          <table class="w-full border-collapse text-xs">
            <tbody>
              {#each weeklyPlan as day (day.date)}
                <tr class="border-b border-gray-100 last:border-0">
                  <th
                    scope="row"
                    class="whitespace-nowrap py-1.5 pr-3 text-left font-medium text-gray-600"
                  >
                    {fill(labels.week, { week: day.isoWeek })}
                  </th>
                  <td class="py-1.5">
                    {#if !day.open}
                      <span
                        class="rounded border border-amber-200 bg-amber-50 px-1.5 py-0.5 font-medium text-amber-800"
                      >
                        {labels.weekClosed}
                      </span>
                    {/if}
                    <span class="flex flex-wrap gap-1">
                      {#each day.labs as lab (lab.id)}
                        <button
                          type="button"
                          onclick={() => {
                            selectedLabId = lab.id;
                            submitError = null;
                            success = null;
                          }}
                          class={`rounded border px-1.5 py-0.5 transition-colors ${
                            lab.id === selectedLabId
                              ? 'border-blue-300 bg-blue-50 font-medium text-blue-800'
                              : 'border-gray-200 bg-gray-50 text-gray-600 hover:border-blue-300'
                          }`}
                        >
                          {lab.title}
                        </button>
                      {/each}
                    </span>
                  </td>
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
      </section>
    {/if}

    <!-- Semester seat map -->
    <section class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 class="text-sm font-semibold text-gray-900">{labels.semester}</h2>
      <p class="mt-0.5 text-xs text-gray-500">{semesterRange}</p>
      <p class="text-xs font-medium text-gray-600">{roomLabel(locale)}</p>
      {#if closedNote}
        <p class="text-xs text-gray-500">{closedNote}</p>
      {/if}
      {#if weeks.length > 0}
        <p class="text-xs text-gray-500">{fill(labels.runsOnDays, { count: weeks.length })}</p>
      {/if}
      {#if opensOn}
        <p
          class="mt-3 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-medium text-amber-800"
        >
          {fill(labels.lockedNote, { date: formatDate(opensOn) })}
        </p>
      {/if}

      {#if loadFailed}
        <p class="mt-4 text-sm text-red-600" role="alert">{labels.errors.network}</p>
      {:else if bookings === null}
        <p class="mt-4 text-sm text-gray-400">{labels.loading}</p>
      {:else if selectedLab && course}
        <ul class="mt-4 space-y-3">
          {#each weeks as week (week.date)}
            <li
              class={`rounded-lg border p-4 ${
                week.open ? 'border-gray-200 bg-white' : 'border-gray-200 bg-gray-50'
              }`}
            >
              <div class="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                <p class={`text-sm font-medium ${week.open ? 'text-gray-900' : 'text-gray-400'}`}>
                  {fill(labels.week, { week: week.isoWeek })} · {formatDate(week.date)}
                </p>
                {#if !week.open}
                  <span
                    class="rounded border border-amber-200 bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-800"
                  >
                    {labels.weekClosed}
                  </span>
                {/if}
              </div>

              {#if week.open}
                <div class="mt-3 space-y-3">
                  {#each course.slots as _period, index (index)}
                    {@const slot = index + 1}
                    {@const past = isPastSlot(course, week.date, slot, today, nowMinutes)}
                    {@const clash = myOtherLabInSlot(week.date, slot)}
                    <!-- addressable per day and slot, so tests and deep links
                         do not depend on the surrounding markup -->
                    <div
                      data-date={week.date}
                      data-slot={slot}
                      class={course.slots.length > 1 ? 'rounded-md bg-gray-50/70 p-2' : ''}
                    >
                      <div class="flex flex-wrap items-baseline gap-x-2">
                        <span
                          class={`text-xs font-semibold tabular-nums ${
                            past ? 'text-gray-400' : 'text-gray-700'
                          }`}
                        >
                          {slotTime(slot)}
                        </span>
                        {#if past}
                          <span class="text-xs text-gray-400">{labels.weekPast}</span>
                        {:else if clash}
                          <span class="text-xs text-amber-700">
                            {fill(labels.busyThisWeek, { lab: clash.labTitle })}
                          </span>
                        {/if}
                      </div>

                      <div class="mt-1.5 space-y-1.5">
                        {#each groupNumbers(selectedLab) as group (group)}
                          {@const taken = seatsIn(week.date, slot, group)}
                          {@const free = freeSeatsIn(week.date, slot, group)}
                          <div class="flex flex-wrap items-center gap-2">
                            {#if selectedLab.groupsPerSlot > 1}
                              <span
                                class={`w-20 shrink-0 text-xs font-medium ${
                                  past ? 'text-gray-400' : 'text-gray-600'
                                }`}
                              >
                                {fill(labels.group, { group })}
                              </span>
                            {/if}

                            {#each taken as seatBooking (seatBooking.id)}
                              <span
                                class={`rounded-full border px-2.5 py-1 text-xs ${
                                  isMine(seatBooking)
                                    ? 'border-emerald-300 bg-emerald-50 font-medium text-emerald-800'
                                    : 'border-gray-200 bg-gray-100 text-gray-700'
                                }`}
                              >
                                <!-- nbsp: Svelte strips a leading space here, and it
                                     keeps "(you)" on the same line as the name -->
                                {seatBooking.bookedBy}{#if isMine(seatBooking)}&nbsp;<span
                                    class="font-normal">({labels.you})</span
                                  >{/if}
                              </span>
                            {/each}

                            {#if free === 0}
                              <span class="text-xs text-gray-400">{labels.groupFull}</span>
                            {:else if !past}
                              <button
                                type="button"
                                disabled={!detailsValid ||
                                  claiming !== null ||
                                  opensOn !== null ||
                                  myBookingForLab !== undefined ||
                                  clash !== undefined}
                                onclick={() => claimSeat(week.date, slot, group)}
                                title={opensOn
                                  ? labels.errors['opens-later']
                                  : myBookingForLab
                                    ? labels.errors['already-booked']
                                    : clash
                                      ? labels.errors['same-slot']
                                      : ''}
                                class="rounded-full border border-dashed border-blue-400 px-2.5 py-1 text-xs font-medium text-blue-700 transition-colors hover:border-blue-600 hover:bg-blue-50 disabled:cursor-not-allowed disabled:border-gray-200 disabled:text-gray-300 disabled:hover:bg-transparent"
                              >
                                {claiming === `${week.date}:${slot}:${group}`
                                  ? labels.booking
                                  : `+ ${labels.freeSeat}`}
                              </button>
                              <span class="text-xs text-gray-400">
                                {fill(labels.seatsLeft, {
                                  free,
                                  total: selectedLab.seatsPerGroup,
                                })}
                              </span>
                            {:else}
                              <span class="text-xs text-gray-400">
                                {fill(labels.seatsLeft, {
                                  free,
                                  total: selectedLab.seatsPerGroup,
                                })}
                              </span>
                            {/if}
                          </div>
                        {/each}
                      </div>
                    </div>
                  {/each}
                </div>
              {/if}
            </li>
          {/each}
        </ul>
      {/if}
    </section>
  </div>

  <!-- My bookings -->
  <section class="rounded-xl border border-gray-200 bg-gray-50 p-4" aria-label={labels.myBookings}>
    <h2 class="mb-3 text-sm font-semibold text-gray-900">{labels.myBookings}</h2>
    {#if myBookings.length === 0}
      <p class="text-sm text-gray-400">{labels.myBookingsEmpty}</p>
    {:else}
      <ul class="space-y-3">
        {#each myBookings as booking (booking.id)}
          <li class="rounded-lg border border-gray-200 bg-white p-3 text-sm">
            <p class="font-medium text-gray-900">{booking.labTitle}</p>
            <p class="text-gray-500">
              {formatDate(booking.date)} · {booking.start}–{booking.end}
            </p>
            <p class="text-gray-500">
              {fill(labels.group, { group: booking.group })} · {labels.room} {LAB_ROOM}
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
      {#if cancelError}
        <p class="mt-2 text-xs text-red-600" role="alert">{cancelError}</p>
      {/if}
    {/if}
  </section>
</div>
