// Pure booking domain logic for the MTE210 weekly lab slot — no I/O, shared by
// the API endpoints and the booking UI island.
//
// The slot itself is fixed (Wednesdays 10:15–13:00, see semester.ts), so time of
// day is never a variable here: a booking is a seat in a group, in a lab, in a
// given week. Dates are 'YYYY-MM-DD' strings in Europe/Oslo.

import {
  BOOKABLE_LABS,
  CLOSED_WEEKS,
  FIRST_DATE,
  LAST_DATE,
  SLOT,
  WEDNESDAY,
  type BookableLab,
} from './semester';

/** One student's claim on a seat. The public shape — never carries an email. */
export interface SeatBooking {
  labId: string;
  date: string;
  group: number;
  seat: number;
}

/** A student asking to join a specific group in a specific week. */
export interface SeatRequest {
  labId: string;
  date: string;
  group: number;
}

export type SeatUnavailableReason =
  | 'unknown-lab'
  | 'closed-week'
  | 'past-slot'
  | 'invalid-input'
  | 'group-full';

export type SeatResult = { ok: true; seat: number } | { ok: false; reason: SeatUnavailableReason };

/** A Wednesday in the semester window — closed ones included, flagged. */
export interface SemesterWeek {
  date: string;
  isoWeek: number;
  open: boolean;
}

const DAY_MS = 86_400_000;

/** Minutes past midnight at which the slot begins, from the SLOT config. */
export const SLOT_START_MINUTES = (() => {
  const [hour, minute] = SLOT.start.split(':').map(Number);
  return hour * 60 + minute;
})();

export function isValidDateString(date: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) return false;
  const parsed = new Date(`${date}T00:00:00Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0, 10) === date;
}

/**
 * ISO-8601 week number for a 'YYYY-MM-DD' string.
 *
 * Parsed as UTC so the result never shifts with the machine timezone. The week
 * is identified by its Thursday, which is what makes weeks at a year boundary
 * fall on the correct side (2027-01-01 is still week 53 of 2026).
 */
export function isoWeek(date: string): number {
  const thursday = new Date(`${date}T00:00:00Z`);
  const dayFromMonday = (thursday.getUTCDay() + 6) % 7;
  thursday.setUTCDate(thursday.getUTCDate() - dayFromMonday + 3);

  // week 1 is by definition the week containing 4 January
  const firstThursday = new Date(Date.UTC(thursday.getUTCFullYear(), 0, 4));
  const firstDayFromMonday = (firstThursday.getUTCDay() + 6) % 7;
  firstThursday.setUTCDate(firstThursday.getUTCDate() - firstDayFromMonday + 3);

  return 1 + Math.round((thursday.getTime() - firstThursday.getTime()) / (7 * DAY_MS));
}

/** Every Wednesday in the semester window, closed weeks flagged not open. */
export function listSemesterWeeks(): SemesterWeek[] {
  const weeks: SemesterWeek[] = [];
  for (
    let day = new Date(`${FIRST_DATE}T00:00:00Z`);
    day.toISOString().slice(0, 10) <= LAST_DATE;
    day = new Date(day.getTime() + 7 * DAY_MS)
  ) {
    const date = day.toISOString().slice(0, 10);
    const week = isoWeek(date);
    weeks.push({ date, isoWeek: week, open: !CLOSED_WEEKS.includes(week) });
  }
  return weeks;
}

/** Just the Wednesdays that accept bookings. */
export function listSlotDates(): string[] {
  return listSemesterWeeks()
    .filter((week) => week.open)
    .map((week) => week.date);
}

/** Is this date a Wednesday in the window whose week is not closed? */
export function isOpenSlotDate(date: string): boolean {
  if (!isValidDateString(date)) return false;
  if (date < FIRST_DATE || date > LAST_DATE) return false;
  if (new Date(`${date}T00:00:00Z`).getUTCDay() !== WEDNESDAY) return false;
  return !CLOSED_WEEKS.includes(isoWeek(date));
}

/** Per-week capacity for a bookable lab, or null if the lab is not bookable. */
export function capacityFor(labId: string): BookableLab | null {
  return BOOKABLE_LABS.find((lab) => lab.id === labId) ?? null;
}

/** Today's date in the lab's timezone, as 'YYYY-MM-DD'. */
export function osloToday(now: Date = new Date()): string {
  // sv-SE locale formats as YYYY-MM-DD
  return new Intl.DateTimeFormat('sv-SE', { timeZone: 'Europe/Oslo' }).format(now);
}

/** Minutes past midnight in the lab's timezone — compared against slot start. */
export function osloMinutesOfDay(now: Date = new Date()): number {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Oslo',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).formatToParts(now);
  const value = (type: string) => Number(parts.find((part) => part.type === type)?.value ?? '0');
  return value('hour') * 60 + value('minute');
}

/** Has this slot already started (or passed) as of the given moment? */
export function isPastSlot(
  date: string,
  today: string = osloToday(),
  nowMinutes: number = osloMinutesOfDay()
): boolean {
  if (date < today) return true;
  return date === today && nowMinutes >= SLOT_START_MINUTES;
}

function seatsTakenIn(existing: SeatBooking[], request: SeatRequest): Set<number> {
  return new Set(
    existing
      .filter(
        (b) => b.labId === request.labId && b.date === request.date && b.group === request.group
      )
      .map((b) => b.seat)
  );
}

/** Lowest seat number free in the requested group, or null if it is full. */
export function assignSeat(
  existing: SeatBooking[],
  request: SeatRequest,
  seatsPerGroup: number
): number | null {
  const taken = seatsTakenIn(existing, request);
  for (let seat = 1; seat <= seatsPerGroup; seat++) {
    if (!taken.has(seat)) return seat;
  }
  return null;
}

/** How many seats remain in one group — 0 for a lab that is not bookable. */
export function seatsFreeFor(
  existing: SeatBooking[],
  labId: string,
  date: string,
  group: number
): number {
  const lab = capacityFor(labId);
  if (!lab) return 0;
  const taken = seatsTakenIn(existing, { labId, date, group });
  return Math.max(0, lab.seatsPerGroup - taken.size);
}

/**
 * Full decision for a seat request: is the lab bookable, the group within
 * capacity, the week open and still ahead, and a seat free?
 *
 * `existing` only needs to cover the requested lab and date; extra rows are
 * filtered out, so callers may pass the whole semester.
 */
export function checkSeatAvailability(
  request: SeatRequest,
  existing: SeatBooking[],
  today: string = osloToday(),
  nowMinutes: number = osloMinutesOfDay()
): SeatResult {
  const lab = capacityFor(request.labId);
  if (!lab) return { ok: false, reason: 'unknown-lab' };

  if (
    !Number.isInteger(request.group) ||
    request.group < 1 ||
    request.group > lab.groupsPerWeek
  ) {
    return { ok: false, reason: 'invalid-input' };
  }

  // covers closed weeks, non-Wednesdays and anything outside the semester
  if (!isOpenSlotDate(request.date)) return { ok: false, reason: 'closed-week' };
  if (isPastSlot(request.date, today, nowMinutes)) return { ok: false, reason: 'past-slot' };

  const seat = assignSeat(existing, request, lab.seatsPerGroup);
  if (seat === null) return { ok: false, reason: 'group-full' };

  return { ok: true, seat };
}
