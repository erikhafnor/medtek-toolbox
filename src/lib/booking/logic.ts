// Pure booking domain logic — no I/O, shared by API endpoints and the
// booking UI island. All times are whole hours in Europe/Oslo local time;
// dates are 'YYYY-MM-DD' strings.

export const WORKSTATION_COUNT = 8;
export const BOOKING_WINDOW_DAYS = 56; // 8 weeks ahead

/** Room opening hours, keyed by day of week (0 = Sunday … 6 = Saturday). */
export const OPENING_HOURS: Record<number, { start: number; end: number }> = {
  2: { start: 9, end: 16 }, // Tuesday 09:00–16:00
  4: { start: 12, end: 16 }, // Thursday 12:00–16:00
};

export interface BookingInterval {
  labId: string;
  startHour: number;
  /** Exclusive end hour. */
  endHour: number;
  workstation: number;
}

export interface AvailabilityRequest {
  labId: string;
  date: string;
  startHour: number;
  endHour: number;
}

export type AvailabilityResult =
  | { ok: true; workstation: number }
  | { ok: false; reason: 'closed' | 'outside-hours' | 'no-workstation' }
  | { ok: false; reason: 'device-conflict'; devices: string[] };

/** Day of week for a 'YYYY-MM-DD' string, immune to local timezone. */
export function dayOfWeek(date: string): number {
  return new Date(`${date}T00:00:00Z`).getUTCDay();
}

export function isValidDateString(date: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return false;
  const d = new Date(`${date}T00:00:00Z`);
  return !Number.isNaN(d.getTime()) && d.toISOString().slice(0, 10) === date;
}

export function openingHoursFor(date: string): { start: number; end: number } | null {
  return OPENING_HOURS[dayOfWeek(date)] ?? null;
}

export function overlaps(aStart: number, aEnd: number, bStart: number, bEnd: number): boolean {
  return aStart < bEnd && bStart < aEnd;
}

/** Today's date in the lab's timezone, as 'YYYY-MM-DD'. */
export function osloToday(now: Date = new Date()): string {
  // sv-SE locale formats as YYYY-MM-DD
  return new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Oslo' }).format(now);
}

/** Current hour of day (0–23) in the lab's timezone. */
export function osloHour(now: Date = new Date()): number {
  return Number(
    new Intl.DateTimeFormat('en-GB', {
      timeZone: 'Europe/Oslo',
      hour: '2-digit',
      hour12: false,
    }).format(now)
  );
}

/** Upcoming open days (Tue/Thu) from today through the booking window. */
export function listBookableDates(today: string = osloToday()): string[] {
  const dates: string[] = [];
  const start = new Date(`${today}T00:00:00Z`);
  for (let i = 0; i <= BOOKING_WINDOW_DAYS; i++) {
    const d = new Date(start.getTime() + i * 86_400_000);
    const iso = d.toISOString().slice(0, 10);
    if (openingHoursFor(iso)) dates.push(iso);
  }
  return dates;
}

export function isBookableDate(date: string, today: string = osloToday()): boolean {
  if (!isValidDateString(date) || !openingHoursFor(date)) return false;
  const diffDays =
    (new Date(`${date}T00:00:00Z`).getTime() - new Date(`${today}T00:00:00Z`).getTime()) /
    86_400_000;
  return diffDays >= 0 && diffDays <= BOOKING_WINDOW_DAYS;
}

/** Lowest-numbered workstation free for the whole interval, or null. */
export function assignWorkstation(
  existing: BookingInterval[],
  startHour: number,
  endHour: number
): number | null {
  for (let station = 1; station <= WORKSTATION_COUNT; station++) {
    const taken = existing.some(
      (b) => b.workstation === station && overlaps(b.startHour, b.endHour, startHour, endHour)
    );
    if (!taken) return station;
  }
  return null;
}

/**
 * Devices that would be over-booked if `request` were added to `existing`.
 *
 * For every hour of the requested interval, counts units of each required
 * device claimed by overlapping bookings; a device conflicts when usage
 * would exceed its inventory quantity.
 *
 * An existing booking whose lab is no longer in the catalog (renamed/removed
 * content) fails CLOSED: it is treated as holding every device, so stale
 * bookings can never cause an over-booked analyzer.
 */
export function findDeviceConflicts(
  request: AvailabilityRequest,
  existing: BookingInterval[],
  requiredDevicesByLab: Record<string, string[]>,
  quantities: Record<string, number>
): string[] {
  const required = requiredDevicesByLab[request.labId] ?? [];
  const conflicts = new Set<string>();
  for (const device of required) {
    const quantity = quantities[device] ?? 0;
    for (let hour = request.startHour; hour < request.endHour; hour++) {
      const inUse = existing.filter((b) => {
        if (hour < b.startHour || hour >= b.endHour) return false;
        const devices = requiredDevicesByLab[b.labId];
        return devices ? devices.includes(device) : true;
      }).length;
      if (inUse + 1 > quantity) {
        conflicts.add(device);
        break;
      }
    }
  }
  return [...conflicts];
}

/** Full availability check for a requested booking against existing ones. */
export function checkAvailability(
  request: AvailabilityRequest,
  existing: BookingInterval[],
  requiredDevicesByLab: Record<string, string[]>,
  quantities: Record<string, number>
): AvailabilityResult {
  const hours = openingHoursFor(request.date);
  if (!hours) return { ok: false, reason: 'closed' };
  if (
    !Number.isInteger(request.startHour) ||
    !Number.isInteger(request.endHour) ||
    request.startHour < hours.start ||
    request.endHour > hours.end ||
    request.endHour <= request.startHour
  ) {
    return { ok: false, reason: 'outside-hours' };
  }

  const deviceConflicts = findDeviceConflicts(
    request,
    existing,
    requiredDevicesByLab,
    quantities
  );
  if (deviceConflicts.length > 0) {
    return { ok: false, reason: 'device-conflict', devices: deviceConflicts };
  }

  const workstation = assignWorkstation(existing, request.startHour, request.endHour);
  if (workstation === null) return { ok: false, reason: 'no-workstation' };

  return { ok: true, workstation };
}

/** Parse a duration like "3 hours" / "3 timer" to whole hours (default 3). */
export function parseDurationHours(duration: string | undefined): number {
  const match = duration?.match(/(\d+)/);
  return match ? Number(match[1]) : 3;
}
