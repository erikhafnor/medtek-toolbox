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
  /**
   * A lab students choose rather than all take. Elective labs are sized for
   * `electivePicks` of them, not for the whole cohort.
   */
  elective?: boolean;
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
  /** How many of the elective labs each student must take. */
  electivePicks?: number;
  labs: BookableLab[];
}

// MTE200 autumn 2026: 21 students = 7 groups of 3, seven labs, one supervisor.
//
// Block 1 is the three labs every student takes, on weeks 37–40 plus a fifth
// day in week 42 — the spare day exists so a group that misses a session, or
// that ends up as a pair rather than a three, still has somewhere to go.
//
// Block 2 is elective: students choose two of its four labs. It rotates
// three-at-a-time across weeks 43–47, which is why the four labs need only
// enough seats for their share of the cohort rather than all of it.
const BLOCK_1 = ['2026-09-08', '2026-09-15', '2026-09-22', '2026-09-29', '2026-10-13'];
/**
 * Block 2 opens once the four core block 1 days are done, not once its spare
 * week-42 day is — week 42 is for stragglers, and everyone else should be able
 * to plan the rest of their semester by then.
 */
const BLOCK_2_OPENS = '2026-09-30';

// MTE210 autumn 2026: 18 students = 6 groups, one Wednesday slot a week.
//
// Three of the five labs are gated by a single instrument — the ESA615, the
// PHYWE CT cabinet — and so take one group (3 students) a week, needing six
// Wednesdays each to get the cohort through. Six for block 1 plus six for
// block 2 is twelve, and the window to mid-November holds nine, so the blocks
// overlap: CT imaging starts in week 42 while electrical safety finishes.
// Strict back-to-back blocks would run to 9 December.
const MTE210_WEEKS = [
  '2026-09-09', // wk 37
  '2026-09-16', // wk 38
  '2026-09-30', // wk 40
  '2026-10-14', // wk 42
  '2026-10-21', // wk 43
  '2026-10-28', // wk 44
  '2026-11-04', // wk 45
  '2026-11-11', // wk 46
  '2026-11-18', // wk 47
];
/** Block 2 opens after block 1's first three Wednesdays, before its own start. */
const MTE210_BLOCK_2_OPENS = '2026-10-01';

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
    electivePicks: 2,
    labs: [
      // Block 1 — everyone takes these three first
      { id: 'mte200-ecg-recording', groupsPerSlot: 1, seatsPerGroup: 3, dates: BLOCK_1 },
      { id: 'mte200-defibrillator', groupsPerSlot: 1, seatsPerGroup: 3, dates: BLOCK_1 },
      { id: 'mte200-infusion-pump', groupsPerSlot: 1, seatsPerGroup: 3, dates: BLOCK_1 },

      // Block 2 — elective, four labs rotating three-at-a-time across weeks 43–47
      {
        id: 'mte200-blood-pressure-spo2',
        groupsPerSlot: 1,
        seatsPerGroup: 3,
        dates: ['2026-10-20', '2026-11-03', '2026-11-10', '2026-11-17'],
        opensOn: BLOCK_2_OPENS,
        elective: true,
      },
      {
        id: 'mte200-electrosurgery',
        groupsPerSlot: 1,
        seatsPerGroup: 3,
        dates: ['2026-10-20', '2026-10-27', '2026-11-10', '2026-11-17'],
        opensOn: BLOCK_2_OPENS,
        elective: true,
      },
      {
        id: 'mte200-ultrasound',
        groupsPerSlot: 1,
        seatsPerGroup: 3,
        dates: ['2026-10-20', '2026-10-27', '2026-11-03', '2026-11-17'],
        opensOn: BLOCK_2_OPENS,
        elective: true,
      },
      {
        id: 'mte200-ventilator',
        groupsPerSlot: 1,
        seatsPerGroup: 3,
        dates: ['2026-10-27', '2026-11-03', '2026-11-10'],
        opensOn: BLOCK_2_OPENS,
        elective: true,
      },
    ],
  },
  {
    id: 'MTE210',
    weekday: WEDNESDAY,
    slots: [{ start: '10:15', end: '13:00' }],
    firstDate: '2026-09-09', // ISO week 37
    lastDate: '2026-11-18', // ISO week 47
    closedWeeks: [39, 41],
    maxLabsPerDay: 3,
    cohortSize: 18,
    labs: [
      // Block 1 — the two labs everyone starts with
      {
        id: 'mte210-electrical-safety',
        groupsPerSlot: 1, // one ESA615
        seatsPerGroup: 3,
        dates: MTE210_WEEKS.slice(0, 6),
      },
      {
        id: 'mte210-hospital-networks',
        groupsPerSlot: 3, // workstations, not a single instrument
        seatsPerGroup: 3,
        dates: MTE210_WEEKS.slice(0, 3),
      },

      // Block 2 — opens once block 1's opening run is done
      {
        id: 'mte210-ct-imaging',
        groupsPerSlot: 1, // one PHYWE XR 4.0 cabinet
        seatsPerGroup: 3,
        dates: MTE210_WEEKS.slice(3),
        opensOn: MTE210_BLOCK_2_OPENS,
      },
      {
        id: 'mte210-syringe-pump-teardown',
        groupsPerSlot: 2, // two oscilloscopes; eight Alaris pumps
        seatsPerGroup: 3,
        dates: MTE210_WEEKS.slice(6),
        opensOn: MTE210_BLOCK_2_OPENS,
      },
      {
        id: 'mte210-ct-reconstruction',
        groupsPerSlot: 3, // lab PCs running 3D Slicer
        seatsPerGroup: 3,
        dates: MTE210_WEEKS.slice(6),
        opensOn: MTE210_BLOCK_2_OPENS,
      },
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

/**
 * How many students must fit in a lab. Everyone takes a core lab, so it needs
 * the whole cohort. An elective is taken by roughly its share of the cohort —
 * `electivePicks` of `n` labs — so it needs that share, assuming take-up is
 * broadly even across the choices.
 */
export function seatsNeededFor(course: CourseBooking, lab: BookableLab): number {
  const cohort = course.cohortSize ?? 0;
  if (!lab.elective || !course.electivePicks) return cohort;
  const electives = course.labs.filter((l) => l.elective).length || 1;
  return Math.ceil((cohort * course.electivePicks) / electives);
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
      const needed = seatsNeededFor(course, lab);
      if (seats < needed) {
        throw new Error(
          `booking/courses.ts: lab '${lab.id}' seats ${seats} students but needs ${needed}` +
            (lab.elective ? ' (its share of the elective block)' : ` (${course.id} cohort)`)
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
