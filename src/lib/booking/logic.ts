// Pure booking domain logic — no I/O, shared by the API endpoints and the
// booking UI island.
//
// A booking is a seat, in a group, in a slot, on a lab day. Everything about
// when a course runs lives in courses.ts; this module only derives from it.
// Dates are 'YYYY-MM-DD' strings and times are Europe/Oslo wall-clock.

import {
  ALL_BOOKABLE_LABS,
  COURSES,
  type BookableLab,
  type CourseBooking,
  type CourseSlot,
} from './courses';

/** One student's claim on a seat. The public shape — never carries an email. */
export interface SeatBooking {
  labId: string;
  date: string;
  /** 1-based index into the course's slots. */
  slot: number;
  group: number;
  seat: number;
}

/** A student asking for a seat in a specific group, slot and week. */
export interface SeatRequest {
  labId: string;
  date: string;
  slot: number;
  group: number;
}

export type SeatUnavailableReason =
  | 'unknown-lab'
  | 'closed-week'
  | 'past-slot'
  | 'invalid-input'
  | 'group-full';

export type SeatResult = { ok: true; seat: number } | { ok: false; reason: SeatUnavailableReason };

/** A lab day in the semester window — closed ones included, flagged. */
export interface SemesterWeek {
  date: string;
  isoWeek: number;
  open: boolean;
}

/** Where a lab sits in the configuration. */
export interface LabBookingConfig {
  course: CourseBooking;
  lab: BookableLab;
}

const DAY_MS = 86_400_000;

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

/** The course a lab belongs to, with its capacity — null if not bookable. */
export function bookingConfigFor(labId: string): LabBookingConfig | null {
  return ALL_BOOKABLE_LABS.find(({ lab }) => lab.id === labId) ?? null;
}

/** Per-slot capacity for a bookable lab, or null if the lab is not bookable. */
export function capacityFor(labId: string): BookableLab | null {
  return bookingConfigFor(labId)?.lab ?? null;
}

export function courseById(id: string): CourseBooking | null {
  return COURSES.find((course) => course.id === id) ?? null;
}

/** Every lab day in a course's window, closed weeks flagged not open. */
export function listSemesterWeeks(course: CourseBooking): SemesterWeek[] {
  const weeks: SemesterWeek[] = [];
  for (
    let day = new Date(`${course.firstDate}T00:00:00Z`);
    day.toISOString().slice(0, 10) <= course.lastDate;
    day = new Date(day.getTime() + 7 * DAY_MS)
  ) {
    const date = day.toISOString().slice(0, 10);
    const week = isoWeek(date);
    weeks.push({ date, isoWeek: week, open: !course.closedWeeks.includes(week) });
  }
  return weeks;
}

/** Just the lab days that accept bookings. */
export function listSlotDates(course: CourseBooking): string[] {
  return listSemesterWeeks(course)
    .filter((week) => week.open)
    .map((week) => week.date);
}

/** Is this date a lab day in the window whose week is not closed? */
export function isOpenSlotDate(course: CourseBooking, date: string): boolean {
  if (!isValidDateString(date)) return false;
  if (date < course.firstDate || date > course.lastDate) return false;
  if (new Date(`${date}T00:00:00Z`).getUTCDay() !== course.weekday) return false;
  return !course.closedWeeks.includes(isoWeek(date));
}

/** The slot for a 1-based slot number, or null when out of range. */
export function slotOf(course: CourseBooking, slot: number): CourseSlot | null {
  if (!Number.isInteger(slot) || slot < 1 || slot > course.slots.length) return null;
  return course.slots[slot - 1];
}

/** Minutes past midnight for an 'HH:MM' wall-clock time. */
export function minutesOfDay(time: string): number {
  const [hour, minute] = time.split(':').map(Number);
  return hour * 60 + minute;
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

/**
 * Has this slot already started (or passed)?
 *
 * Judged per slot, not per day: on a Tuesday at noon the 09:00 slot is gone but
 * the 11:30 one has only just begun — and is also gone, while a 13:00 slot
 * would still be open.
 */
export function isPastSlot(
  course: CourseBooking,
  date: string,
  slot: number,
  today: string = osloToday(),
  nowMinutes: number = osloMinutesOfDay()
): boolean {
  if (date < today) return true;
  if (date > today) return false;
  const period = slotOf(course, slot);
  if (!period) return true;
  return nowMinutes >= minutesOfDay(period.start);
}

/** Is any slot on this date still open for booking? */
export function hasOpenSlot(
  course: CourseBooking,
  date: string,
  today: string = osloToday(),
  nowMinutes: number = osloMinutesOfDay()
): boolean {
  return course.slots.some(
    (_, index) => !isPastSlot(course, date, index + 1, today, nowMinutes)
  );
}

function seatsTakenIn(existing: SeatBooking[], request: SeatRequest): Set<number> {
  return new Set(
    existing
      .filter(
        (b) =>
          b.labId === request.labId &&
          b.date === request.date &&
          b.slot === request.slot &&
          b.group === request.group
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
  slot: number,
  group: number
): number {
  const lab = capacityFor(labId);
  if (!lab) return 0;
  const taken = seatsTakenIn(existing, { labId, date, slot, group });
  return Math.max(0, lab.seatsPerGroup - taken.size);
}

/**
 * Full decision for a seat request: is the lab bookable, the slot and group
 * within range, the week open and still ahead, and a seat free?
 *
 * `existing` only needs to cover the requested lab, date and slot; extra rows
 * are filtered out, so callers may pass the whole semester.
 */
export function checkSeatAvailability(
  request: SeatRequest,
  existing: SeatBooking[],
  today: string = osloToday(),
  nowMinutes: number = osloMinutesOfDay()
): SeatResult {
  const config = bookingConfigFor(request.labId);
  if (!config) return { ok: false, reason: 'unknown-lab' };
  const { course, lab } = config;

  if (!slotOf(course, request.slot)) return { ok: false, reason: 'invalid-input' };
  if (
    !Number.isInteger(request.group) ||
    request.group < 1 ||
    request.group > lab.groupsPerSlot
  ) {
    return { ok: false, reason: 'invalid-input' };
  }

  // covers closed weeks, the wrong weekday, and anything outside the semester
  if (!isOpenSlotDate(course, request.date)) return { ok: false, reason: 'closed-week' };
  if (isPastSlot(course, request.date, request.slot, today, nowMinutes)) {
    return { ok: false, reason: 'past-slot' };
  }

  const seat = assignSeat(existing, request, lab.seatsPerGroup);
  if (seat === null) return { ok: false, reason: 'group-full' };

  return { ok: true, seat };
}

/** One seat a specific student holds — the student's own view of a booking. */
export interface StudentSeat {
  labId: string;
  date: string;
  slot: number;
}

/**
 * Rules that depend on who is asking rather than on remaining capacity:
 *
 * - `already-booked` — a student does each lab once, so a second seat in the
 *   same lab is refused however many weeks apart.
 * - `same-slot` — nobody can be in two places at once, so a student holding a
 *   seat in a given slot on a given day cannot take another. Two labs in
 *   *different* slots on the same day are fine: that is what the second MTE200
 *   period is for.
 *
 * Returns null when the request breaks neither rule.
 */
export function checkStudentRules(
  mine: StudentSeat[],
  request: StudentSeat
): 'already-booked' | 'same-slot' | null {
  if (mine.some((seat) => seat.labId === request.labId)) return 'already-booked';
  if (mine.some((seat) => seat.date === request.date && seat.slot === request.slot)) {
    return 'same-slot';
  }
  return null;
}
