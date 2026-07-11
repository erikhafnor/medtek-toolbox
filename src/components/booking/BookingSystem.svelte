<script lang="ts">
  // Booking island — rendered client:only, so browser APIs are safe here.
  import {
    WORKSTATION_COUNT,
    checkAvailability,
    listBookableDates,
    openingHoursFor,
    osloHour,
    osloToday,
  } from '../../lib/booking/logic';
  import type { AvailabilityResult } from '../../lib/booking/logic';
  import type { BookingLabels } from '../../lib/booking/labels';
  import type { Locale } from '../../lib/i18n';

  interface LabInfo {
    id: string;
    title: string;
    course: string;
    durationHours: number;
    equipment: string[];
    requiredDevices: string[];
  }
  interface PublicBooking {
    id: string;
    labId: string;
    startHour: number;
    endHour: number;
    workstation: number;
    bookedBy: string;
  }
  interface StoredBooking {
    id: string;
    labId: string;
    labTitle: string;
    date: string;
    startHour: number;
    endHour: number;
    workstation: number;
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

  const requiredByLab: Record<string, string[]> = Object.fromEntries(
    labs.map((l) => [l.id, l.requiredDevices])
  );
  const quantities: Record<string, number> = Object.fromEntries(
    Object.entries(inventory).map(([k, v]) => [k, v.quantity])
  );

  const STORAGE_KEY = 'medtek-lab-bookings';
  const PALETTE = [
    'bg-blue-100 text-blue-800 border-blue-200',
    'bg-emerald-100 text-emerald-800 border-emerald-200',
    'bg-amber-100 text-amber-800 border-amber-200',
    'bg-violet-100 text-violet-800 border-violet-200',
    'bg-rose-100 text-rose-800 border-rose-200',
    'bg-cyan-100 text-cyan-800 border-cyan-200',
    'bg-lime-100 text-lime-800 border-lime-200',
    'bg-fuchsia-100 text-fuchsia-800 border-fuchsia-200',
    'bg-orange-100 text-orange-800 border-orange-200',
    'bg-teal-100 text-teal-800 border-teal-200',
    'bg-indigo-100 text-indigo-800 border-indigo-200',
  ];

  function labColor(labId: string): string {
    const idx = labs.findIndex((l) => l.id === labId);
    return PALETTE[(idx >= 0 ? idx : 0) % PALETTE.length];
  }

  function initialLabId(): string {
    const requested = new URLSearchParams(window.location.search).get('lab');
    return labs.some((l) => l.id === requested) ? requested! : (labs[0]?.id ?? '');
  }

  function loadStoredBookings(): StoredBooking[] {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
      if (!Array.isArray(parsed)) return [];
      const today = osloToday();
      return parsed.filter((b) => b && typeof b.date === 'string' && b.date >= today);
    } catch {
      return [];
    }
  }

  const dates = listBookableDates();

  let selectedLabId = $state(initialLabId());
  let selectedDate = $state(dates[0] ?? '');
  let duration = $state(0);
  let chosenStart = $state<number | null>(null);
  let name = $state('');
  let email = $state('');

  let bookings = $state<PublicBooking[] | null>(null);
  let loadFailed = $state(false);
  let refreshTick = $state(0);

  let submitting = $state(false);
  let submitError = $state<{ code: string; devices?: string[] } | null>(null);
  let success = $state<StoredBooking | null>(null);

  let myBookings = $state(loadStoredBookings());
  let cancellingId = $state<string | null>(null);
  let cancelError = $state<string | null>(null);

  const selectedLab = $derived(labs.find((l) => l.id === selectedLabId) ?? labs[0]);
  const openHours = $derived(openingHoursFor(selectedDate));
  const maxDuration = $derived(openHours ? openHours.end - openHours.start : 0);

  // Reset duration to the lab's suggested length when lab or date changes.
  $effect(() => {
    const suggested = selectedLab?.durationHours ?? 3;
    duration = Math.max(1, Math.min(suggested, maxDuration));
  });

  // Fetch the day's bookings whenever the date changes or after a mutation.
  $effect(() => {
    const date = selectedDate;
    void refreshTick;
    if (!date) return;
    bookings = null;
    loadFailed = false;
    let stale = false;
    fetch(`/api/availability?date=${date}`)
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

  const startOptions = $derived.by(() => {
    if (!openHours || !bookings || !selectedLab) return [];
    const today = osloToday();
    const nowHour = selectedDate === today ? osloHour() : -1;
    const options: Array<{ hour: number; result: AvailabilityResult; past: boolean }> = [];
    for (let hour = openHours.start; hour + duration <= openHours.end; hour++) {
      const result = checkAvailability(
        { labId: selectedLab.id, date: selectedDate, startHour: hour, endHour: hour + duration },
        bookings,
        requiredByLab,
        quantities
      );
      options.push({ hour, result, past: hour < nowHour });
    }
    return options;
  });

  // Drop the chosen start time if it becomes unavailable.
  $effect(() => {
    if (
      chosenStart !== null &&
      !startOptions.some((o) => o.hour === chosenStart && o.result.ok && !o.past)
    ) {
      chosenStart = null;
    }
  });

  const canSubmit = $derived(
    chosenStart !== null && name.trim().length >= 2 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
  );

  function formatDate(date: string): string {
    return new Intl.DateTimeFormat(locale === 'no' ? 'nb-NO' : 'en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      timeZone: 'UTC',
    }).format(new Date(`${date}T00:00:00Z`));
  }

  const hh = (hour: number) => `${String(hour).padStart(2, '0')}:00`;

  function deviceLabels(keys: string[]): string {
    return keys.map((k) => inventory[k]?.label ?? k).join(', ');
  }

  function optionTitle(option: { result: AvailabilityResult; past: boolean }): string {
    if (option.past) return labels.errors['past-date'];
    if (option.result.ok) return '';
    if (option.result.reason === 'device-conflict') {
      return `${labels.unavailableDevice} ${deviceLabels(option.result.devices)}`;
    }
    return labels.unavailableFull;
  }

  function persist(bookingsList: StoredBooking[]) {
    myBookings = bookingsList;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookingsList));
  }

  async function submit(event: SubmitEvent) {
    event.preventDefault();
    if (!canSubmit || chosenStart === null || !selectedLab) return;
    submitting = true;
    submitError = null;
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          labId: selectedLab.id,
          date: selectedDate,
          startHour: chosenStart,
          duration,
          name: name.trim(),
          email: email.trim(),
        }),
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        submitError = { code: data.error ?? 'network', devices: data.devices };
        return;
      }
      const stored: StoredBooking = {
        id: data.booking.id,
        labId: selectedLab.id,
        labTitle: selectedLab.title,
        date: selectedDate,
        startHour: data.booking.startHour,
        endHour: data.booking.endHour,
        workstation: data.booking.workstation,
        cancelToken: data.cancelToken,
      };
      persist([...myBookings, stored]);
      success = stored;
      chosenStart = null;
      refreshTick++;
    } catch {
      submitError = { code: 'network' };
    } finally {
      submitting = false;
    }
  }

  async function cancelStored(booking: StoredBooking) {
    cancellingId = booking.id;
    cancelError = null;
    try {
      const response = await fetch(
        `/api/bookings/${booking.id}?token=${encodeURIComponent(booking.cancelToken)}`,
        { method: 'DELETE' }
      );
      if (response.status === 204 || response.status === 404) {
        persist(myBookings.filter((b) => b.id !== booking.id));
        if (success?.id === booking.id) success = null;
        if (booking.date === selectedDate) refreshTick++;
      } else {
        cancelError = labels.errors.network;
      }
    } catch {
      cancelError = labels.errors.network;
    } finally {
      cancellingId = null;
    }
  }

  function bookingAt(station: number, hour: number): PublicBooking | undefined {
    return bookings?.find(
      (b) => b.workstation === station && hour >= b.startHour && hour < b.endHour
    );
  }

  const gridHours = $derived(
    openHours
      ? Array.from({ length: openHours.end - openHours.start }, (_, i) => openHours.start + i)
      : []
  );

  function fillTemplate(template: string, booking: StoredBooking): string {
    return template
      .replace('{station}', String(booking.workstation))
      .replace('{date}', formatDate(booking.date))
      .replace('{time}', `${hh(booking.startHour)}–${hh(booking.endHour)}`);
  }
</script>

<div class="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:items-start">
  <!-- Booking form -->
  <form class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm" onsubmit={submit}>
    <div class="grid gap-5 sm:grid-cols-2">
      <div class="sm:col-span-2">
        <label for="booking-lab" class="mb-1 block text-sm font-medium text-gray-700">
          {labels.lab}
        </label>
        <select
          id="booking-lab"
          bind:value={selectedLabId}
          class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
        >
          {#each labs as lab (lab.id)}
            <option value={lab.id}>{lab.course} — {lab.title}</option>
          {/each}
        </select>
        {#if selectedLab && selectedLab.requiredDevices.length > 0}
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
      </div>

      <div>
        <label for="booking-date" class="mb-1 block text-sm font-medium text-gray-700">
          {labels.date}
        </label>
        <select
          id="booking-date"
          bind:value={selectedDate}
          class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
        >
          {#each dates as date (date)}
            <option value={date}>{formatDate(date)}</option>
          {/each}
        </select>
        <p class="mt-1 text-xs text-gray-400">{labels.openTuesday} · {labels.openThursday}</p>
      </div>

      <div>
        <label for="booking-duration" class="mb-1 block text-sm font-medium text-gray-700">
          {labels.duration}
        </label>
        <select
          id="booking-duration"
          bind:value={duration}
          class="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
        >
          {#each Array.from({ length: maxDuration }, (_, i) => i + 1) as option (option)}
            <option value={option}>
              {option} {option === 1 ? labels.hour : labels.hours}
            </option>
          {/each}
        </select>
      </div>

      <fieldset class="sm:col-span-2">
        <legend class="mb-1 block text-sm font-medium text-gray-700">{labels.startTime}</legend>
        {#if loadFailed}
          <p class="text-sm text-red-600" role="alert">{labels.errors.network}</p>
        {:else if bookings === null}
          <p class="text-sm text-gray-400">{labels.loading}</p>
        {:else if startOptions.length === 0 || !startOptions.some((o) => o.result.ok && !o.past)}
          <p class="text-sm text-gray-500">{labels.noStartTimes}</p>
        {:else}
          <div class="flex flex-wrap gap-2">
            {#each startOptions as option (option.hour)}
              <button
                type="button"
                disabled={!option.result.ok || option.past}
                aria-pressed={chosenStart === option.hour}
                title={optionTitle(option)}
                onclick={() => (chosenStart = option.hour)}
                class={`rounded-lg border px-3 py-1.5 text-sm font-medium transition-colors ${
                  chosenStart === option.hour
                    ? 'border-blue-600 bg-blue-600 text-white'
                    : option.result.ok && !option.past
                      ? 'border-gray-300 bg-white text-gray-700 hover:border-blue-400'
                      : 'cursor-not-allowed border-gray-200 bg-gray-50 text-gray-300 line-through'
                }`}
              >
                {hh(option.hour)}–{hh(option.hour + duration)}
              </button>
            {/each}
          </div>
        {/if}
      </fieldset>

      <div>
        <label for="booking-name" class="mb-1 block text-sm font-medium text-gray-700">
          {labels.name}
        </label>
        <input
          id="booking-name"
          type="text"
          bind:value={name}
          placeholder={labels.namePlaceholder}
          required
          minlength="2"
          maxlength="80"
          class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
        />
      </div>

      <div>
        <label for="booking-email" class="mb-1 block text-sm font-medium text-gray-700">
          {labels.email}
        </label>
        <input
          id="booking-email"
          type="email"
          bind:value={email}
          placeholder={labels.emailPlaceholder}
          required
          maxlength="120"
          class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
        />
      </div>
    </div>

    {#if submitError}
      <div class="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
        {labels.errors[submitError.code] ?? labels.errors.network}
        {#if submitError.devices?.length}
          <ul class="mt-1 list-inside list-disc">
            {#each submitError.devices as device (device)}
              <li>{device}</li>
            {/each}
          </ul>
        {/if}
      </div>
    {/if}

    {#if success}
      <div class="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800" role="status">
        <p class="font-semibold">{labels.successTitle}</p>
        <p class="mt-0.5">{fillTemplate(labels.successBody, success)}</p>
        <p class="mt-1 text-emerald-700">{labels.successKeep}</p>
      </div>
    {/if}

    <button
      type="submit"
      disabled={!canSubmit || submitting}
      class="mt-5 w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300 sm:w-auto"
    >
      {submitting ? labels.submitting : labels.submit}
    </button>
  </form>

  <div class="space-y-6">
    <!-- Room overview grid -->
    <section class="rounded-xl border border-gray-200 bg-white p-4 shadow-sm" aria-label={labels.gridTitle}>
      <h2 class="mb-3 text-sm font-semibold text-gray-900">
        {labels.gridTitle} — {formatDate(selectedDate)}
      </h2>
      {#if bookings === null && !loadFailed}
        <p class="text-sm text-gray-400">{labels.loading}</p>
      {:else if openHours}
        <div class="overflow-x-auto">
          <table class="w-full border-collapse text-[11px]">
            <thead>
              <tr>
                <th class="p-1 text-left font-medium text-gray-400">{labels.workstation}</th>
                {#each gridHours as hour (hour)}
                  <th class="p-1 text-center font-medium text-gray-400">{hour}</th>
                {/each}
              </tr>
            </thead>
            <tbody>
              {#each Array.from({ length: WORKSTATION_COUNT }, (_, i) => i + 1) as station (station)}
                <tr>
                  <td class="p-1 font-medium tabular-nums text-gray-500">{station}</td>
                  {#each gridHours as hour (hour)}
                    {@const booked = bookingAt(station, hour)}
                    <td class="p-0.5">
                      {#if booked}
                        <div
                          class={`h-6 truncate rounded border px-1 leading-6 ${labColor(booked.labId)}`}
                          title={`${labs.find((l) => l.id === booked.labId)?.title ?? booked.labId} · ${booked.bookedBy} · ${hh(booked.startHour)}–${hh(booked.endHour)}`}
                        >
                          {booked.bookedBy}
                        </div>
                      {:else}
                        <div class="h-6 rounded border border-dashed border-gray-200"></div>
                      {/if}
                    </td>
                  {/each}
                </tr>
              {/each}
            </tbody>
          </table>
        </div>
        <p class="mt-2 text-xs text-gray-400">
          {WORKSTATION_COUNT - new Set(bookings?.map((b) => b.workstation)).size}/{WORKSTATION_COUNT}
          {labels.free}
        </p>
      {/if}
    </section>

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
                {formatDate(booking.date)} · {hh(booking.startHour)}–{hh(booking.endHour)} ·
                {labels.workstation} {booking.workstation}
              </p>
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
</div>
