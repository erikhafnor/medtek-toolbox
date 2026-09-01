// Booking configuration — the one file course staff edit between semesters.
//
// Each course books its own weekday, its own slots within that day, its own
// semester window and closed weeks, and its own per-lab capacity and schedule.
// Nothing else in the codebase hardcodes a time, a date or a lab id.
//
// Two limits shape MTE200. Most analyzers are single-unit, so a lab runs one
// group per slot. And there is one supervisor, so at most three labs are set up
// on any one Tuesday (`maxLabsPerDay`) — which is why each lab lists the days it
// actually runs instead of being open all semester.

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
  /**
   * The lab days this lab actually runs, as 'YYYY-MM-DD'. Omit to run on every
   * open day of the course — right for a course with no rotation.
   */
  dates?: string[];
  /**
   * Bookable only from this date onward, so a later block of labs can be
   * visible (students see the plan) without being claimable yet. Omit for a lab
   * that opens immediately.
   */
  opensOn?: string;
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
  /** How many labs one supervisor can run in a day. Omit for no limit. */
  maxLabsPerDay?: number;
  /** Students on the course, so the build can prove every lab seats them all. */
  cohortSize?: number;
  labs: BookableLab[];
}

// MTE200 autumn 2026: 21 students = 7 groups of 3, seven labs, one supervisor.
// Block 1 runs the three labs everyone starts with, on the four Tuesdays before
// the closed week. Block 2 rotates the remaining four labs three-at-a-time over
// the six Tuesdays after it, so each still gets at least 21 seats.
const BLOCK_1 = ['2026-09-08', '2026-09-15', '2026-09-22', '2026-09-29'];
/** Block 2 opens once block 1's last lab day has passed. */
const BLOCK_2_OPENS = '2026-09-30';

export const COURSES: CourseBooking[] = [
  {
    id: 'MTE200',
    weekday: TUESDAY,
    // two 2.5-hour slots back to back; every scheduled lab runs in both
    slots: [
      { start: '09:00', end: '11:30' },
      { start: '11:30', end: '14:00' },
    ],
    firstDate: '2026-09-08', // ISO week 37
    lastDate: '2026-11-17', // ISO week 47
    closedWeeks: [41],
    maxLabsPerDay: 3,
    cohortSize: 21,
    labs: [
      // Block 1 — everyone takes these three first
      { id: 'mte200-ecg-recording', groupsPerSlot: 1, seatsPerGroup: 3, dates: BLOCK_1 },
      { id: 'mte200-defibrillator', groupsPerSlot: 1, seatsPerGroup: 3, dates: BLOCK_1 },
      { id: 'mte200-infusion-pump', groupsPerSlot: 1, seatsPerGroup: 3, dates: BLOCK_1 },

      // Block 2 — four labs rotating three-at-a-time across weeks 42–47
      {
        id: 'mte200-blood-pressure-spo2',
        groupsPerSlot: 1,
        seatsPerGroup: 3,
        dates: ['2026-10-13', '2026-10-27', '2026-11-03', '2026-11-10'],
        opensOn: BLOCK_2_OPENS,
      },
      {
        id: 'mte200-electrosurgery',
        groupsPerSlot: 1,
        seatsPerGroup: 3,
        dates: ['2026-10-13', '2026-10-20', '2026-11-03', '2026-11-10', '2026-11-17'],
        opensOn: BLOCK_2_OPENS,
      },
      {
        id: 'mte200-ultrasound',
        groupsPerSlot: 1,
        seatsPerGroup: 3,
        dates: ['2026-10-13', '2026-10-20', '2026-10-27', '2026-11-10', '2026-11-17'],
        opensOn: BLOCK_2_OPENS,
      },
      {
        id: 'mte200-ventilator',
        groupsPerSlot: 1,
        seatsPerGroup: 3,
        dates: ['2026-10-20', '2026-10-27', '2026-11-03', '2026-11-17'],
        opensOn: BLOCK_2_OPENS,
      },
    ],
  },
  {
    id: 'MTE210',
    weekday: WEDNESDAY,
    slots: [{ start: '10:15', end: '13:00' }],
    firstDate: '2026-09-09', // ISO week 37
    lastDate: '2026-10-21', // ISO week 43
    closedWeeks: [39, 41],
    // no rotation: both labs run every open Wednesday
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

/** Most slots any course runs in a day. */
export const MAX_SLOTS_PER_DAY = Math.max(...COURSES.map((course) => course.slots.length));

// ---------------------------------------------------------------------------
// Config validation. These run at module load, so a mistake fails the build
// rather than quietly stranding a cohort halfway through the semester.
// ---------------------------------------------------------------------------

const DAY_MS = 86_400_000;

function weekdayOf(date: string): number {
  return new Date(`${date}T00:00:00Z`).getUTCDay();
}

function isoWeekOf(date: string): number {
  const thursday = new Date(`${date}T00:00:00Z`);
  thursday.setUTCDate(thursday.getUTCDate() - ((thursday.getUTCDay() + 6) % 7) + 3);
  const firstThursday = new Date(Date.UTC(thursday.getUTCFullYear(), 0, 4));
  firstThursday.setUTCDate(
    firstThursday.getUTCDate() - ((firstThursday.getUTCDay() + 6) % 7) + 3
  );
  return 1 + Math.round((thursday.getTime() - firstThursday.getTime()) / (7 * DAY_MS));
}

/** Open lab days of a course — duplicated from logic.ts to keep this file standalone. */
function openDaysOf(course: CourseBooking): string[] {
  const days: string[] = [];
  for (
    let day = new Date(`${course.firstDate}T00:00:00Z`);
    day.toISOString().slice(0, 10) <= course.lastDate;
    day = new Date(day.getTime() + 7 * DAY_MS)
  ) {
    const date = day.toISOString().slice(0, 10);
    if (!course.closedWeeks.includes(isoWeekOf(date))) days.push(date);
  }
  return days;
}

/** The days a lab runs: its own list, or every open day when it has none. */
export function scheduledDates(course: CourseBooking, lab: BookableLab): string[] {
  return lab.dates ?? openDaysOf(course);
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

  const openDays = new Set(openDaysOf(course));
  const labsPerDay = new Map<string, string[]>();

  for (const lab of course.labs) {
    // a lab id must resolve to exactly one course, or a booking is ambiguous
    if (seenLabIds.has(lab.id)) {
      throw new Error(`booking/courses.ts: lab '${lab.id}' is listed in more than one course`);
    }
    seenLabIds.add(lab.id);
    if (lab.groupsPerSlot < 1 || lab.seatsPerGroup < 1) {
      throw new Error(`booking/courses.ts: lab '${lab.id}' has a capacity below 1`);
    }

    const dates = scheduledDates(course, lab);
    for (const date of dates) {
      if (!openDays.has(date)) {
        throw new Error(
          `booking/courses.ts: lab '${lab.id}' is scheduled on ${date}, which is not an open ${course.id} lab day`
        );
      }
      labsPerDay.set(date, [...(labsPerDay.get(date) ?? []), lab.id]);
    }

    if (lab.opensOn && !/^\d{4}-\d{2}-\d{2}$/.test(lab.opensOn)) {
      throw new Error(`booking/courses.ts: lab '${lab.id}' has an invalid opensOn`);
    }

    // every student must be able to get a seat, or the schedule strands someone
    if (course.cohortSize !== undefined) {
      const seats = dates.length * course.slots.length * lab.groupsPerSlot * lab.seatsPerGroup;
      if (seats < course.cohortSize) {
        throw new Error(
          `booking/courses.ts: lab '${lab.id}' seats ${seats} students but ${course.id} has ${course.cohortSize}`
        );
      }
    }
  }

  // one supervisor can only run so many labs at once
  if (course.maxLabsPerDay !== undefined) {
    for (const [date, ids] of labsPerDay) {
      if (ids.length > course.maxLabsPerDay) {
        throw new Error(
          `booking/courses.ts: ${ids.length} labs scheduled on ${date} (${ids.join(', ')}), but ${course.id} allows ${course.maxLabsPerDay} per day`
        );
      }
    }
  }
}
