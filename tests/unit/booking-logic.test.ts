import { describe, it, expect } from 'vitest';
import {
  assignSeat,
  bookingConfigFor,
  capacityFor,
  checkSeatAvailability,
  checkStudentRules,
  courseById,
  hasOpenSlot,
  isOpenSlotDate,
  isPastSlot,
  isLabOpenYet,
  isValidDateString,
  isoWeek,
  labDates,
  labRunsOn,
  listSemesterWeeks,
  listSlotDates,
  minutesOfDay,
  seatsFreeFor,
  slotOf,
  type SeatBooking,
} from '../../src/lib/booking/logic';
import {
  ALL_BOOKABLE_LABS,
  COURSES,
  scheduledDates,
  seatsNeededFor,
  MAX_SEATS_PER_GROUP,
  MAX_SLOTS_PER_DAY,
} from '../../src/lib/booking/courses';
import { devicesForEquipment, DEVICES } from '../../src/lib/booking/inventory';

const SAFETY = 'mte210-electrical-safety';
const NETWORKS = 'mte210-hospital-networks';
const DEFIB = 'mte200-defibrillator';
const ECG = 'mte200-ecg-recording';

const MTE200 = courseById('MTE200')!;
const MTE210 = courseById('MTE210')!;

// MTE210 — Wednesdays, weeks 37–43, weeks 39 and 41 closed.
const WED37 = '2026-09-09';
const WED38 = '2026-09-16';
const WED39 = '2026-09-23'; // closed
const WED40 = '2026-09-30';
const WED41 = '2026-10-07'; // closed
const WED42 = '2026-10-14';
const WED43 = '2026-10-21';

// MTE200 — Tuesdays, weeks 37–47, week 41 closed.
const TUE37 = '2026-09-08';
const TUE38 = '2026-09-15';
const TUE39 = '2026-09-22'; // open for MTE200
const TUE41 = '2026-10-06'; // closed
const TUE47 = '2026-11-17'; // last

/** Well before either semester, so nothing is in the past. */
const BEFORE = '2026-09-01';
/** Minutes-of-day before any slot starts. */
const EARLY = 7 * 60;

function seat(labId: string, date: string, slot: number, group: number, n: number): SeatBooking {
  return { labId, date, slot, group, seat: n };
}

function fullGroup(labId: string, date: string, slot: number, group: number): SeatBooking[] {
  return [1, 2, 3].map((n) => seat(labId, date, slot, group, n));
}

describe('isoWeek()', () => {
  it('numbers the semester lab days', () => {
    expect(isoWeek(TUE37)).toBe(37);
    expect(isoWeek(WED37)).toBe(37); // same ISO week, one day apart
    expect(isoWeek(WED43)).toBe(43);
    expect(isoWeek(TUE47)).toBe(47);
  });

  it('handles year boundaries the ISO-8601 way', () => {
    expect(isoWeek('2026-01-01')).toBe(1); // a Thursday, so week 1 of 2026
    expect(isoWeek('2026-12-28')).toBe(53); // 2026 is a 53-week year
    expect(isoWeek('2027-01-01')).toBe(53); // still ISO week 53 of 2026
    expect(isoWeek('2027-01-04')).toBe(1); // first Monday of ISO 2027
  });
});

describe('course configuration', () => {
  it('gives MTE200 two Tuesday slots and MTE210 one Wednesday slot', () => {
    expect(MTE200.weekday).toBe(2);
    expect(MTE200.slots).toEqual([
      { start: '09:00', end: '11:30' },
      { start: '11:30', end: '14:00' },
    ]);
    expect(MTE210.weekday).toBe(3);
    expect(MTE210.slots).toEqual([{ start: '10:15', end: '13:00' }]);
  });

  it('starts both courses in week 37', () => {
    expect(isoWeek(MTE200.firstDate)).toBe(37);
    expect(isoWeek(MTE210.firstDate)).toBe(37);
  });

  it('closes week 41 for both, and week 39 only for MTE210', () => {
    expect(MTE200.closedWeeks).toEqual([41]);
    expect(MTE210.closedWeeks).toEqual([39, 41]);
  });

  it('resolves every lab to exactly one course', () => {
    const ids = ALL_BOOKABLE_LABS.map(({ lab }) => lab.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(bookingConfigFor(DEFIB)?.course.id).toBe('MTE200');
    expect(bookingConfigFor(SAFETY)?.course.id).toBe('MTE210');
    expect(bookingConfigFor('nonsense')).toBeNull();
  });

  it('keeps every lab within the bounds the database enforces', () => {
    for (const { lab } of ALL_BOOKABLE_LABS) {
      expect(lab.seatsPerGroup, lab.id).toBeLessThanOrEqual(MAX_SEATS_PER_GROUP);
    }
    for (const course of COURSES) {
      expect(course.slots.length, course.id).toBeLessThanOrEqual(MAX_SLOTS_PER_DAY);
    }
  });

  it('books all seven MTE200 labs, one group each per slot', () => {
    expect(MTE200.labs).toHaveLength(7);
    for (const lab of MTE200.labs) {
      expect(lab.groupsPerSlot, lab.id).toBe(1);
      expect(lab.seatsPerGroup, lab.id).toBe(3);
    }
  });
});

describe('semester weeks', () => {
  it('lists MTE200 Tuesdays from week 37 to 47, flagging week 41 closed', () => {
    const weeks = listSemesterWeeks(MTE200);
    expect(weeks[0].date).toBe(TUE37);
    expect(weeks[weeks.length - 1].date).toBe(TUE47);
    expect(weeks).toHaveLength(11);
    expect(weeks.filter((w) => !w.open).map((w) => w.isoWeek)).toEqual([41]);
    expect(weeks.every((w) => new Date(`${w.date}T00:00:00Z`).getUTCDay() === 2)).toBe(true);
  });

  it('offers ten bookable Tuesdays for MTE200', () => {
    const dates = listSlotDates(MTE200);
    expect(dates).toHaveLength(10);
    expect(dates).toContain(TUE39); // week 39 is closed for MTE210 only
    expect(dates).not.toContain(TUE41);
  });

  it('still offers five bookable Wednesdays for MTE210', () => {
    expect(listSlotDates(MTE210)).toEqual([WED37, WED38, WED40, WED42, WED43]);
  });

  it('rejects a date on the other course’s weekday', () => {
    expect(isOpenSlotDate(MTE200, TUE38)).toBe(true);
    expect(isOpenSlotDate(MTE200, WED38)).toBe(false); // Wednesday
    expect(isOpenSlotDate(MTE210, TUE38)).toBe(false); // Tuesday
    expect(isOpenSlotDate(MTE200, TUE41)).toBe(false); // closed week
    expect(isOpenSlotDate(MTE200, '2026-11-24')).toBe(false); // past the window
  });
});

describe('date validation', () => {
  it('accepts valid date strings only', () => {
    expect(isValidDateString(TUE37)).toBe(true);
    expect(isValidDateString('2026-02-30')).toBe(false);
    expect(isValidDateString('08-09-2026')).toBe(false);
    expect(isValidDateString('garbage')).toBe(false);
  });
});

describe('slots', () => {
  it('resolves 1-based slot numbers', () => {
    expect(slotOf(MTE200, 1)).toEqual({ start: '09:00', end: '11:30' });
    expect(slotOf(MTE200, 2)).toEqual({ start: '11:30', end: '14:00' });
    expect(slotOf(MTE200, 3)).toBeNull();
    expect(slotOf(MTE200, 0)).toBeNull();
    expect(slotOf(MTE210, 2)).toBeNull(); // MTE210 has one slot
  });

  it('parses wall-clock times', () => {
    expect(minutesOfDay('09:00')).toBe(540);
    expect(minutesOfDay('11:30')).toBe(690);
    expect(minutesOfDay('10:15')).toBe(615);
  });
});

describe('isPastSlot()', () => {
  it('judges each slot separately on the day itself', () => {
    // 10:00 on the lab Tuesday: the 09:00 slot has started, 11:30 has not
    expect(isPastSlot(MTE200, TUE38, 1, TUE38, 10 * 60)).toBe(true);
    expect(isPastSlot(MTE200, TUE38, 2, TUE38, 10 * 60)).toBe(false);
    // 11:30 exactly: the second slot is now gone too
    expect(isPastSlot(MTE200, TUE38, 2, TUE38, 11 * 60 + 30)).toBe(true);
    expect(isPastSlot(MTE200, TUE38, 2, TUE38, 11 * 60 + 29)).toBe(false);
  });

  it('treats whole earlier and later days uniformly', () => {
    expect(isPastSlot(MTE200, TUE37, 2, TUE38, EARLY)).toBe(true);
    expect(isPastSlot(MTE200, TUE47, 1, TUE38, 23 * 60)).toBe(false);
  });

  it('reports a day as still open while any slot remains', () => {
    expect(hasOpenSlot(MTE200, TUE38, TUE38, 10 * 60)).toBe(true); // 11:30 left
    expect(hasOpenSlot(MTE200, TUE38, TUE38, 12 * 60)).toBe(false); // both gone
  });
});

describe('capacityFor()', () => {
  it('gives each lab its own per-slot capacity', () => {
    expect(capacityFor(SAFETY)).toMatchObject({ groupsPerSlot: 1, seatsPerGroup: 3 });
    expect(capacityFor(NETWORKS)).toMatchObject({ groupsPerSlot: 3, seatsPerGroup: 3 });
    expect(capacityFor(DEFIB)).toMatchObject({ groupsPerSlot: 1, seatsPerGroup: 3 });
  });

  it('returns null for labs that are not bookable', () => {
    expect(capacityFor('mte210-ct-imaging')).toBeNull();
    expect(capacityFor('nonsense')).toBeNull();
  });
});

describe('assignSeat()', () => {
  const request = { labId: DEFIB, date: TUE37, slot: 1, group: 1 };

  it('assigns the lowest free seat', () => {
    expect(assignSeat([], request, 3)).toBe(1);
    expect(assignSeat([seat(DEFIB, TUE37, 1, 1, 1)], request, 3)).toBe(2);
  });

  it('reuses a seat freed by a cancellation', () => {
    const existing = [seat(DEFIB, TUE37, 1, 1, 1), seat(DEFIB, TUE37, 1, 1, 3)];
    expect(assignSeat(existing, request, 3)).toBe(2);
  });

  it('returns null once the group is full', () => {
    expect(assignSeat(fullGroup(DEFIB, TUE37, 1, 1), request, 3)).toBeNull();
  });

  it('counts only seats in the same lab, day, slot and group', () => {
    const elsewhere = [
      ...fullGroup(ECG, TUE37, 1, 1), // different lab
      ...fullGroup(DEFIB, TUE38, 1, 1), // different week
      ...fullGroup(DEFIB, TUE37, 2, 1), // different slot — the key case
    ];
    expect(assignSeat(elsewhere, request, 3)).toBe(1);
  });
});

describe('seatsFreeFor()', () => {
  it('counts the two Tuesday slots independently', () => {
    const existing = [seat(DEFIB, TUE38, 1, 1, 1), seat(DEFIB, TUE38, 1, 1, 2)];
    expect(seatsFreeFor(existing, DEFIB, TUE38, 1, 1)).toBe(1);
    expect(seatsFreeFor(existing, DEFIB, TUE38, 2, 1)).toBe(3);
  });

  it('is zero for a lab that is not bookable', () => {
    expect(seatsFreeFor([], 'mte210-ct-imaging', TUE38, 1, 1)).toBe(0);
  });
});

describe('checkSeatAvailability()', () => {
  it('accepts a free seat in an open slot', () => {
    expect(
      checkSeatAvailability({ labId: DEFIB, date: TUE37, slot: 1, group: 1 }, [], BEFORE, EARLY)
    ).toEqual({ ok: true, seat: 1 });
    expect(
      checkSeatAvailability({ labId: DEFIB, date: TUE37, slot: 2, group: 1 }, [], BEFORE, EARLY)
    ).toEqual({ ok: true, seat: 1 });
  });

  it('rejects labs that are not bookable', () => {
    expect(
      checkSeatAvailability(
        { labId: 'mte210-ct-imaging', date: TUE37, slot: 1, group: 1 },
        [],
        BEFORE,
        EARLY
      )
    ).toEqual({ ok: false, reason: 'unknown-lab' });
  });

  it('rejects a slot number the course does not run', () => {
    expect(
      checkSeatAvailability({ labId: DEFIB, date: TUE37, slot: 3, group: 1 }, [], BEFORE, EARLY)
    ).toEqual({ ok: false, reason: 'invalid-input' });
    // MTE210 has a single slot, so slot 2 does not exist there
    expect(
      checkSeatAvailability({ labId: SAFETY, date: WED37, slot: 2, group: 1 }, [], BEFORE, EARLY)
    ).toEqual({ ok: false, reason: 'invalid-input' });
  });

  it('rejects the closed weeks per course', () => {
    expect(
      checkSeatAvailability({ labId: DEFIB, date: TUE41, slot: 1, group: 1 }, [], BEFORE, EARLY)
    ).toEqual({ ok: false, reason: 'closed-week' });
    // week 39 is closed for MTE210 but open for MTE200
    expect(
      checkSeatAvailability({ labId: NETWORKS, date: WED39, slot: 1, group: 1 }, [], BEFORE, EARLY)
    ).toEqual({ ok: false, reason: 'closed-week' });
    expect(
      checkSeatAvailability({ labId: DEFIB, date: TUE39, slot: 1, group: 1 }, [], BEFORE, EARLY)
    ).toEqual({ ok: true, seat: 1 });
  });

  it('rejects a booking made on the other course’s weekday', () => {
    expect(
      checkSeatAvailability({ labId: DEFIB, date: WED38, slot: 1, group: 1 }, [], BEFORE, EARLY)
    ).toEqual({ ok: false, reason: 'closed-week' });
  });

  it('rejects a group number beyond the lab capacity', () => {
    expect(
      checkSeatAvailability({ labId: DEFIB, date: TUE37, slot: 1, group: 2 }, [], BEFORE, EARLY)
    ).toEqual({ ok: false, reason: 'invalid-input' });
    expect(
      checkSeatAvailability({ labId: NETWORKS, date: WED37, slot: 1, group: 3 }, [], BEFORE, EARLY)
    ).toEqual({ ok: true, seat: 1 });
  });

  it('fills one slot without touching the other', () => {
    const existing = fullGroup(DEFIB, TUE38, 1, 1);
    expect(
      checkSeatAvailability({ labId: DEFIB, date: TUE38, slot: 1, group: 1 }, existing, BEFORE, EARLY)
    ).toEqual({ ok: false, reason: 'group-full' });
    expect(
      checkSeatAvailability({ labId: DEFIB, date: TUE38, slot: 2, group: 1 }, existing, BEFORE, EARLY)
    ).toEqual({ ok: true, seat: 1 });
  });

  it('rejects slots that have already started', () => {
    expect(
      checkSeatAvailability({ labId: DEFIB, date: TUE38, slot: 1, group: 1 }, [], TUE38, 10 * 60)
    ).toEqual({ ok: false, reason: 'past-slot' });
    // …while the afternoon slot that day is still open
    expect(
      checkSeatAvailability({ labId: DEFIB, date: TUE38, slot: 2, group: 1 }, [], TUE38, 10 * 60)
    ).toEqual({ ok: true, seat: 1 });
  });

  it('rejects a lab on a Tuesday it is not scheduled to run', () => {
    // ultrasound is a block 2 lab; it never runs in week 38
    expect(
      checkSeatAvailability(
        { labId: 'mte200-ultrasound', date: TUE38, slot: 1, group: 1 },
        [],
        BEFORE,
        EARLY
      )
    ).toEqual({ ok: false, reason: 'not-scheduled' });
  });

  it('refuses a block 2 lab until it opens, then accepts it', () => {
    const request = { labId: 'mte200-ultrasound', date: '2026-10-20', slot: 1, group: 1 };
    // before block 1 has finished
    expect(checkSeatAvailability(request, [], '2026-09-15', EARLY)).toEqual({
      ok: false,
      reason: 'opens-later',
    });
    // on the day block 2 opens
    expect(checkSeatAvailability(request, [], '2026-09-30', EARLY)).toEqual({ ok: true, seat: 1 });
  });

  it('accepts block 1 labs straight away', () => {
    expect(
      checkSeatAvailability({ labId: ECG, date: TUE37, slot: 1, group: 1 }, [], BEFORE, EARLY)
    ).toEqual({ ok: true, seat: 1 });
  });

  it('lets the three block 1 labs share a Tuesday', () => {
    const blockOne = [ECG, DEFIB, 'mte200-infusion-pump'];
    const existing = blockOne.flatMap((id) => fullGroup(id, TUE38, 1, 1));
    for (const id of blockOne) {
      expect(
        checkSeatAvailability({ labId: id, date: TUE38, slot: 1, group: 1 }, existing, BEFORE, EARLY),
        id
      ).toEqual({ ok: false, reason: 'group-full' });
      // …the afternoon period of the same day is untouched
      expect(
        checkSeatAvailability({ labId: id, date: TUE38, slot: 2, group: 1 }, existing, BEFORE, EARLY),
        id
      ).toEqual({ ok: true, seat: 1 });
    }
  });
});

describe('lab rotation', () => {
  it('runs block 1 on the four core Tuesdays plus a spare day in week 42', () => {
    for (const id of [ECG, DEFIB, 'mte200-infusion-pump']) {
      expect(labDates(id), id).toEqual([
        TUE37,
        TUE38,
        '2026-09-22',
        '2026-09-29',
        '2026-10-13',
      ]);
    }
  });

  it('gives every core lab room for the cohort with a day to spare', () => {
    // 5 days x 2 slots x 3 seats = 30 seats for 21 students
    for (const id of [ECG, DEFIB, 'mte200-infusion-pump']) {
      expect(labDates(id).length * 2 * 3, id).toBe(30);
    }
  });

  it('never schedules more than three labs on one day', () => {
    for (const course of COURSES) {
      if (course.maxLabsPerDay === undefined) continue;
      const perDay = new Map<string, string[]>();
      for (const lab of course.labs) {
        for (const date of scheduledDates(course, lab)) {
          perDay.set(date, [...(perDay.get(date) ?? []), lab.id]);
        }
      }
      for (const [date, ids] of perDay) {
        expect(ids.length, `${date}: ${ids.join(', ')}`).toBeLessThanOrEqual(course.maxLabsPerDay);
      }
    }
  });

  it('seats everyone who needs each lab', () => {
    for (const { course, lab } of ALL_BOOKABLE_LABS) {
      if (course.cohortSize === undefined) continue;
      const seats =
        scheduledDates(course, lab).length *
        course.slots.length *
        lab.groupsPerSlot *
        lab.seatsPerGroup;
      expect(seats, lab.id).toBeGreaterThanOrEqual(seatsNeededFor(course, lab));
    }
  });

  it('sizes a core lab for the whole cohort and an elective for its share', () => {
    const mte200 = courseById('MTE200')!;
    const core = mte200.labs.find((l) => l.id === ECG)!;
    const elective = mte200.labs.find((l) => l.id === 'mte200-ventilator')!;
    expect(seatsNeededFor(mte200, core)).toBe(21);
    // 21 students choosing 2 of 4 electives = 10.5 per lab, rounded up
    expect(seatsNeededFor(mte200, elective)).toBe(11);
    expect(labDates('mte200-ventilator').length * 2 * 3).toBeGreaterThanOrEqual(11);
  });

  it('marks exactly the four block 2 labs as elective', () => {
    const mte200 = courseById('MTE200')!;
    expect(mte200.labs.filter((l) => l.elective).map((l) => l.id)).toEqual([
      'mte200-blood-pressure-spo2',
      'mte200-electrosurgery',
      'mte200-ultrasound',
      'mte200-ventilator',
    ]);
    expect(mte200.electivePicks).toBe(2);
  });

  it('splits the seven MTE200 labs into a block of three and a block of four', () => {
    const mte200 = COURSES.find((c) => c.id === 'MTE200')!;
    const immediate = mte200.labs.filter((l) => !l.opensOn);
    const later = mte200.labs.filter((l) => l.opensOn);
    expect(immediate.map((l) => l.id)).toEqual([
      'mte200-ecg-recording',
      'mte200-defibrillator',
      'mte200-infusion-pump',
    ]);
    expect(later).toHaveLength(4);
    expect(new Set(later.map((l) => l.opensOn))).toEqual(new Set(['2026-09-30']));
  });

  it('knows which days a lab runs and when it opens', () => {
    expect(labRunsOn(ECG, TUE37)).toBe(true);
    expect(labRunsOn(ECG, '2026-10-13')).toBe(true); // the spare week-42 day
    expect(labRunsOn(ECG, '2026-10-20')).toBe(false); // block 2 territory
    expect(labRunsOn('mte200-ultrasound', '2026-10-13')).toBe(false);
    expect(labRunsOn('mte200-ultrasound', '2026-10-20')).toBe(true);
    expect(isLabOpenYet(ECG, '2026-09-01')).toBe(true);
    expect(isLabOpenYet('mte200-ultrasound', '2026-09-01')).toBe(false);
    expect(isLabOpenYet('mte200-ultrasound', '2026-09-30')).toBe(true);
  });

  it('lets MTE210 labs run on every open Wednesday, with no rotation', () => {
    expect(labDates(SAFETY)).toEqual([WED37, WED38, WED40, WED42, WED43]);
  });
});

describe('checkStudentRules()', () => {
  it('allows a student with no seats yet', () => {
    expect(checkStudentRules([], { labId: DEFIB, date: TUE37, slot: 1 })).toBeNull();
  });

  it('refuses a second seat in the same lab, however many weeks apart', () => {
    const mine = [{ labId: DEFIB, date: TUE37, slot: 1 }];
    expect(checkStudentRules(mine, { labId: DEFIB, date: TUE47, slot: 2 })).toBe('already-booked');
  });

  it('refuses a second lab in the same slot on the same day', () => {
    const mine = [{ labId: DEFIB, date: TUE37, slot: 1 }];
    expect(checkStudentRules(mine, { labId: ECG, date: TUE37, slot: 1 })).toBe('same-slot');
  });

  it('allows two labs on the same Tuesday in different slots', () => {
    // the whole point of the second MTE200 period
    const mine = [{ labId: DEFIB, date: TUE37, slot: 1 }];
    expect(checkStudentRules(mine, { labId: ECG, date: TUE37, slot: 2 })).toBeNull();
  });

  it('allows MTE200 on Tuesday and MTE210 on Wednesday in the same week', () => {
    const mine = [{ labId: DEFIB, date: TUE37, slot: 1 }];
    expect(checkStudentRules(mine, { labId: SAFETY, date: WED37, slot: 1 })).toBeNull();
  });

  it('reports the same-lab rule first when a request breaks both', () => {
    const mine = [{ labId: DEFIB, date: TUE37, slot: 1 }];
    expect(checkStudentRules(mine, { labId: DEFIB, date: TUE37, slot: 1 })).toBe('already-booked');
  });
});

describe('inventory mapping', () => {
  it('maps real lab equipment strings to tracked devices', () => {
    expect(devicesForEquipment(['Fluke ESA615 Electrical Safety Analyzer'])).toEqual([
      'fluke-esa615',
    ]);
    expect(devicesForEquipment(['Fluke Impulse 7000DP'])).toContain('fluke-impulse7000');
    expect(devicesForEquipment(['Patient monitor with HL7 export (Philips IntelliVue)'])).toEqual([
      'philips-intellivue',
    ]);
  });

  it('ignores untracked generic equipment', () => {
    expect(devicesForEquipment(['Test lung', 'Camera or phone'])).toEqual([]);
  });

  it('has exactly one unit of every Fluke model', () => {
    for (const device of DEVICES.filter((d) => d.key.startsWith('fluke-'))) {
      expect(device.quantity, device.key).toBe(1);
    }
  });

  it('has two of each device that a pair of MTE200 labs share', () => {
    // blood pressure + defibrillator both need a LIFEPAK 15; defibrillator +
    // electrosurgery both need a scope. One group per lab per slot only avoids
    // a clash while the department owns two of each.
    for (const key of ['lifepak15', 'keysight-scope']) {
      expect(DEVICES.find((d) => d.key === key)?.quantity, key).toBeGreaterThanOrEqual(2);
    }
  });
});
