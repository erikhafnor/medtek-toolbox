// How long booking records are kept.
//
// A booking holds a student's name and email — personal data. Nothing about
// running the labs needs it once the semester is over, so it should not sit in
// the database indefinitely. This file is the single place that rule lives, so
// the privacy note students read and the purge action staff use cannot drift
// apart.

import { COURSES } from './courses';

/** Bookings are deleted this many days after the last lab day of the semester. */
export const RETENTION_DAYS_AFTER_SEMESTER = 30;

/** The last lab day across all courses. */
export function lastLabDay(): string {
  return COURSES.map((c) => c.lastDate).sort().reverse()[0];
}

/** The date from which bookings may be deleted, as 'YYYY-MM-DD'. */
export function purgeAllowedFrom(): string {
  const last = new Date(`${lastLabDay()}T00:00:00Z`);
  last.setUTCDate(last.getUTCDate() + RETENTION_DAYS_AFTER_SEMESTER);
  return last.toISOString().slice(0, 10);
}

export const RETENTION_NOTE = `bookings are kept until ${RETENTION_DAYS_AFTER_SEMESTER} days after the last lab day`;
