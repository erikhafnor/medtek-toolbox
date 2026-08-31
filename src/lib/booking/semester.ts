// Semester configuration for MTE210 lab booking — the one file course staff
// edit between semesters.
//
// MTE210 has a single weekly lab slot: Wednesdays 10:15–13:00. Both labs run in
// that same slot, each with its own per-week capacity, so booking one lab never
// consumes capacity in the other.

/** Day-of-week index used throughout: the lab slot is always a Wednesday. */
export const WEDNESDAY = 3;

/** The weekly slot, as wall-clock time in Europe/Oslo. */
export const SLOT = { start: '10:15', end: '13:00' } as const;

/** First bookable Wednesday of the semester. */
export const FIRST_DATE = '2026-09-09'; // ISO week 37

/** Last bookable Wednesday of the semester, inclusive. */
export const LAST_DATE = '2026-10-21'; // ISO week 43

/**
 * ISO week numbers inside the window that are closed for booking. Closed weeks
 * still appear in the UI, greyed out, so the gap in the semester is explained.
 */
export const CLOSED_WEEKS: number[] = [39, 41];

export interface BookableLab {
  /** Slug in the `labs` content collection, without locale prefix. */
  id: string;
  /** Groups that can run this lab in one Wednesday slot. */
  groupsPerWeek: number;
  /** Students per group. */
  seatsPerGroup: number;
}

/** The only labs that can be booked, in the order students meet them. */
export const BOOKABLE_LABS: BookableLab[] = [
  { id: 'mte210-electrical-safety', groupsPerWeek: 1, seatsPerGroup: 3 },
  { id: 'mte210-hospital-networks', groupsPerWeek: 3, seatsPerGroup: 3 },
];

/** Largest group size in the config — the bound for the DB CHECK constraint. */
export const MAX_SEATS_PER_GROUP = Math.max(...BOOKABLE_LABS.map((l) => l.seatsPerGroup));

// Fail loudly at build time on a config typo. The slot dates are derived by
// stepping a week at a time from FIRST_DATE, so a start date that is not a
// Wednesday would silently produce a semester with no bookable slots at all.
for (const [name, value] of [
  ['FIRST_DATE', FIRST_DATE],
  ['LAST_DATE', LAST_DATE],
] as const) {
  const parsed = new Date(`${value}T00:00:00Z`);
  if (Number.isNaN(parsed.getTime()) || parsed.getUTCDay() !== WEDNESDAY) {
    throw new Error(`booking/semester.ts: ${name} (${value}) must be a Wednesday`);
  }
}
if (LAST_DATE < FIRST_DATE) {
  throw new Error(`booking/semester.ts: LAST_DATE (${LAST_DATE}) is before FIRST_DATE`);
}
