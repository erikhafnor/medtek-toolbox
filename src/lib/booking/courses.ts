// Booking configuration — the one file course staff edit between semesters.
//
// Each course books its own weekday, its own slots within that day, its own
// semester window and closed weeks, and its own per-lab capacity. Nothing else
// in the codebase hardcodes a time, a date or a lab id.
//
// Capacity note: most analyzers in the room are single-unit, so a lab runs one
// group per slot. The only devices two labs share are the LIFEPAK 15 (blood
// pressure + defibrillator) and the Keysight scope (defibrillator +
// electrosurgery), and the department owns two of each — so with one group per
// lab per slot every lab can run in parallel without an equipment clash.

export const TUESDAY = 2;
export const WEDNESDAY = 3;

/** One bookable period within a lab day, as Europe/Oslo wall-clock. */
export interface CourseSlot {
  /** 'HH:MM' */
  start: string;
  /** 'HH:MM' */
  end: string;
}

export interface BookableLab {
  /** Slug in the `labs` content collection, without locale prefix. */
  id: string;
  /** Groups that can run this lab in one slot. */
  groupsPerSlot: number;
  /** Students per group. */
  seatsPerGroup: number;
}

export interface CourseBooking {
  /** Course code, matching the `course` field in lab frontmatter. */
  id: string;
  /** Day of week the lab session runs (0 = Sunday … 6 = Saturday). */
  weekday: number;
  /** Slots within the day, in order. Slot numbers are 1-based indexes here. */
  slots: CourseSlot[];
  /** First lab date of the semester — must fall on `weekday`. */
  firstDate: string;
  /** Last lab date of the semester, inclusive — must fall on `weekday`. */
  lastDate: string;
  /** ISO week numbers inside the window that are closed for booking. */
  closedWeeks: number[];
  labs: BookableLab[];
}

export const COURSES: CourseBooking[] = [
  {
    id: 'MTE200',
    weekday: TUESDAY,
    // two 2.5-hour slots back to back
    slots: [
      { start: '09:00', end: '11:30' },
      { start: '11:30', end: '14:00' },
    ],
    firstDate: '2026-09-08', // ISO week 37
    lastDate: '2026-11-17', // ISO week 47
    closedWeeks: [41],
    // one group per lab per slot: the analyzers are single-unit
    labs: [
      { id: 'mte200-blood-pressure-spo2', groupsPerSlot: 1, seatsPerGroup: 3 },
      { id: 'mte200-ecg-recording', groupsPerSlot: 1, seatsPerGroup: 3 },
      { id: 'mte200-defibrillator', groupsPerSlot: 1, seatsPerGroup: 3 },
      { id: 'mte200-electrosurgery', groupsPerSlot: 1, seatsPerGroup: 3 },
      { id: 'mte200-infusion-pump', groupsPerSlot: 1, seatsPerGroup: 3 },
      { id: 'mte200-ventilator', groupsPerSlot: 1, seatsPerGroup: 3 },
      { id: 'mte200-ultrasound', groupsPerSlot: 1, seatsPerGroup: 3 },
    ],
  },
  {
    id: 'MTE210',
    weekday: WEDNESDAY,
    slots: [{ start: '10:15', end: '13:00' }],
    firstDate: '2026-09-09', // ISO week 37
    lastDate: '2026-10-21', // ISO week 43
    closedWeeks: [39, 41],
    labs: [
      { id: 'mte210-electrical-safety', groupsPerSlot: 1, seatsPerGroup: 3 },
      { id: 'mte210-hospital-networks', groupsPerSlot: 3, seatsPerGroup: 3 },
    ],
  },
];

/** Every bookable lab across all courses, paired with its course. */
export const ALL_BOOKABLE_LABS: Array<{ course: CourseBooking; lab: BookableLab }> = COURSES.flatMap(
  (course) => course.labs.map((lab) => ({ course, lab }))
);

/** Largest group size configured — the bound for the DB CHECK constraint. */
export const MAX_SEATS_PER_GROUP = Math.max(
  ...ALL_BOOKABLE_LABS.map(({ lab }) => lab.seatsPerGroup)
);

/** Most slots any course runs in a day — the other DB CHECK bound. */
export const MAX_SLOTS_PER_DAY = Math.max(...COURSES.map((course) => course.slots.length));

// Fail loudly at build time on a config typo. Slot dates are derived by stepping
// a week at a time from firstDate, so a start date on the wrong weekday would
// silently produce a semester with no bookable dates at all.
function weekdayOf(date: string): number {
  return new Date(`${date}T00:00:00Z`).getUTCDay();
}

const seenLabIds = new Set<string>();
for (const course of COURSES) {
  for (const [field, value] of [
    ['firstDate', course.firstDate],
    ['lastDate', course.lastDate],
  ] as const) {
    const parsed = new Date(`${value}T00:00:00Z`);
    if (Number.isNaN(parsed.getTime()) || weekdayOf(value) !== course.weekday) {
      throw new Error(
        `booking/courses.ts: ${course.id} ${field} (${value}) must fall on weekday ${course.weekday}`
      );
    }
  }
  if (course.lastDate < course.firstDate) {
    throw new Error(`booking/courses.ts: ${course.id} lastDate is before firstDate`);
  }
  if (course.slots.length === 0) {
    throw new Error(`booking/courses.ts: ${course.id} has no slots`);
  }
  for (const { start, end } of course.slots) {
    if (!/^\d{2}:\d{2}$/.test(start) || !/^\d{2}:\d{2}$/.test(end) || end <= start) {
      throw new Error(`booking/courses.ts: ${course.id} has an invalid slot ${start}–${end}`);
    }
  }
  for (const lab of course.labs) {
    // a lab id must resolve to exactly one course, or a booking is ambiguous
    if (seenLabIds.has(lab.id)) {
      throw new Error(`booking/courses.ts: lab '${lab.id}' is listed in more than one course`);
    }
    seenLabIds.add(lab.id);
    if (lab.groupsPerSlot < 1 || lab.seatsPerGroup < 1) {
      throw new Error(`booking/courses.ts: lab '${lab.id}' has a capacity below 1`);
    }
  }
}
