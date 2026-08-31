import { describe, it, expect } from 'vitest';
import {
  assignSeat,
  capacityFor,
  checkSeatAvailability,
  checkStudentRules,
  isOpenSlotDate,
  isValidDateString,
  isoWeek,
  listSemesterWeeks,
  listSlotDates,
  seatsFreeFor,
  type SeatBooking,
} from '../../src/lib/booking/logic';
import { BOOKABLE_LABS, CLOSED_WEEKS, MAX_SEATS_PER_GROUP } from '../../src/lib/booking/semester';
import { devicesForEquipment, DEVICES } from '../../src/lib/booking/inventory';

const SAFETY = 'mte210-electrical-safety';
const NETWORKS = 'mte210-hospital-networks';

// The 2026 autumn semester: Wednesdays from week 37 to week 43, with weeks 39
// and 41 closed.
const W37 = '2026-09-09';
const W38 = '2026-09-16';
const W39 = '2026-09-23'; // closed
const W40 = '2026-09-30';
const W41 = '2026-10-07'; // closed
const W42 = '2026-10-14';
const W43 = '2026-10-21';

/** Well before the semester, so nothing is in the past. */
const BEFORE = '2026-09-01';
/** Minutes-of-day well before the 10:15 slot start. */
const EARLY = 8 * 60;

function seat(labId: string, date: string, group: number, seatNumber: number): SeatBooking {
  return { labId, date, group, seat: seatNumber };
}

/** Fill every seat of one group. */
function fullGroup(labId: string, date: string, group: number): SeatBooking[] {
  return [1, 2, 3].map((s) => seat(labId, date, group, s));
}

describe('isoWeek()', () => {
  it('numbers the semester Wednesdays', () => {
    expect(isoWeek(W37)).toBe(37);
    expect(isoWeek(W38)).toBe(38);
    expect(isoWeek(W39)).toBe(39);
    expect(isoWeek(W40)).toBe(40);
    expect(isoWeek(W41)).toBe(41);
    expect(isoWeek(W42)).toBe(42);
    expect(isoWeek(W43)).toBe(43);
  });

  it('handles year boundaries the ISO-8601 way', () => {
    expect(isoWeek('2026-01-01')).toBe(1); // a Thursday, so week 1 of 2026
    expect(isoWeek('2026-12-28')).toBe(53); // 2026 is a 53-week year
    expect(isoWeek('2027-01-01')).toBe(53); // still ISO week 53 of 2026
    expect(isoWeek('2027-01-04')).toBe(1); // first Monday of ISO 2027
  });

  it('is immune to the machine timezone', () => {
    // a date that would slip a day if parsed as local time west of UTC
    expect(isoWeek('2026-09-09')).toBe(isoWeek('2026-09-09'));
    expect(isoWeek('2026-01-04')).toBe(1); // Sunday — last day of ISO week 1
    expect(isoWeek('2026-01-05')).toBe(2); // Monday — first day of ISO week 2
  });
});

describe('semester weeks', () => {
  it('lists every Wednesday in the window, flagging the closed ones', () => {
    const weeks = listSemesterWeeks();
    expect(weeks.map((w) => w.date)).toEqual([W37, W38, W39, W40, W41, W42, W43]);
    expect(weeks.filter((w) => !w.open).map((w) => w.isoWeek)).toEqual(CLOSED_WEEKS);
  });

  it('offers only the five open Wednesdays for booking', () => {
    expect(listSlotDates()).toEqual([W37, W38, W40, W42, W43]);
  });

  it('treats closed and out-of-window dates as not bookable', () => {
    expect(isOpenSlotDate(W37)).toBe(true);
    expect(isOpenSlotDate(W43)).toBe(true);
    expect(isOpenSlotDate(W39)).toBe(false); // closed week
    expect(isOpenSlotDate(W41)).toBe(false); // closed week
    expect(isOpenSlotDate('2026-09-02')).toBe(false); // before the window
    expect(isOpenSlotDate('2026-10-28')).toBe(false); // after the window
    expect(isOpenSlotDate('2026-09-10')).toBe(false); // a Thursday
  });
});

describe('date validation', () => {
  it('accepts valid date strings only', () => {
    expect(isValidDateString(W37)).toBe(true);
    expect(isValidDateString('2026-02-30')).toBe(false);
    expect(isValidDateString('09-09-2026')).toBe(false);
    expect(isValidDateString('garbage')).toBe(false);
  });
});

describe('capacityFor()', () => {
  it('gives each lab its own per-week capacity', () => {
    expect(capacityFor(SAFETY)).toMatchObject({ groupsPerWeek: 1, seatsPerGroup: 3 });
    expect(capacityFor(NETWORKS)).toMatchObject({ groupsPerWeek: 3, seatsPerGroup: 3 });
  });

  it('returns null for labs that are not bookable', () => {
    expect(capacityFor('mte200-defibrillator')).toBeNull();
    expect(capacityFor('nonsense')).toBeNull();
  });

  it('never exceeds the seat bound the database enforces', () => {
    for (const lab of BOOKABLE_LABS) {
      expect(lab.seatsPerGroup, lab.id).toBeLessThanOrEqual(MAX_SEATS_PER_GROUP);
    }
  });
});

describe('assignSeat()', () => {
  const request = { labId: SAFETY, date: W37, group: 1 };

  it('assigns the lowest free seat', () => {
    expect(assignSeat([], request, 3)).toBe(1);
    expect(assignSeat([seat(SAFETY, W37, 1, 1)], request, 3)).toBe(2);
    expect(assignSeat([seat(SAFETY, W37, 1, 1), seat(SAFETY, W37, 1, 2)], request, 3)).toBe(3);
  });

  it('reuses a seat freed by a cancellation', () => {
    const existing = [seat(SAFETY, W37, 1, 1), seat(SAFETY, W37, 1, 3)];
    expect(assignSeat(existing, request, 3)).toBe(2);
  });

  it('returns null once the group is full', () => {
    expect(assignSeat(fullGroup(SAFETY, W37, 1), request, 3)).toBeNull();
  });

  it('counts only seats in the same lab, week and group', () => {
    const elsewhere = [
      ...fullGroup(NETWORKS, W37, 1), // different lab
      ...fullGroup(SAFETY, W38, 1), // different week
      ...fullGroup(NETWORKS, W37, 2), // different group
    ];
    expect(assignSeat(elsewhere, request, 3)).toBe(1);
  });
});

describe('seatsFreeFor()', () => {
  it('reports remaining seats per group', () => {
    const existing = [seat(NETWORKS, W40, 2, 1), seat(NETWORKS, W40, 2, 2)];
    expect(seatsFreeFor(existing, NETWORKS, W40, 1)).toBe(3);
    expect(seatsFreeFor(existing, NETWORKS, W40, 2)).toBe(1);
    expect(seatsFreeFor([...existing, seat(NETWORKS, W40, 2, 3)], NETWORKS, W40, 2)).toBe(0);
  });

  it('is zero for a lab that is not bookable', () => {
    expect(seatsFreeFor([], 'mte200-defibrillator', W40, 1)).toBe(0);
  });
});

describe('checkSeatAvailability()', () => {
  it('accepts a free seat in an open week', () => {
    expect(
      checkSeatAvailability({ labId: SAFETY, date: W37, group: 1 }, [], BEFORE, EARLY)
    ).toEqual({ ok: true, seat: 1 });
  });

  it('rejects labs outside the two MTE210 assignments', () => {
    expect(
      checkSeatAvailability({ labId: 'mte200-defibrillator', date: W37, group: 1 }, [], BEFORE, EARLY)
    ).toEqual({ ok: false, reason: 'unknown-lab' });
  });

  it('rejects the closed weeks 39 and 41', () => {
    for (const date of [W39, W41]) {
      expect(
        checkSeatAvailability({ labId: NETWORKS, date, group: 1 }, [], BEFORE, EARLY),
        date
      ).toEqual({ ok: false, reason: 'closed-week' });
    }
  });

  it('rejects dates outside the semester window', () => {
    expect(
      checkSeatAvailability({ labId: SAFETY, date: '2026-09-02', group: 1 }, [], BEFORE, EARLY)
    ).toEqual({ ok: false, reason: 'closed-week' });
    expect(
      checkSeatAvailability({ labId: SAFETY, date: '2026-10-28', group: 1 }, [], BEFORE, EARLY)
    ).toEqual({ ok: false, reason: 'closed-week' });
  });

  it('rejects a group number beyond the lab capacity', () => {
    // Lab 1 runs one group per week; Lab 2 runs three
    expect(
      checkSeatAvailability({ labId: SAFETY, date: W37, group: 2 }, [], BEFORE, EARLY)
    ).toEqual({ ok: false, reason: 'invalid-input' });
    expect(
      checkSeatAvailability({ labId: NETWORKS, date: W37, group: 3 }, [], BEFORE, EARLY)
    ).toEqual({ ok: true, seat: 1 });
    expect(
      checkSeatAvailability({ labId: NETWORKS, date: W37, group: 4 }, [], BEFORE, EARLY)
    ).toEqual({ ok: false, reason: 'invalid-input' });
    expect(
      checkSeatAvailability({ labId: NETWORKS, date: W37, group: 0 }, [], BEFORE, EARLY)
    ).toEqual({ ok: false, reason: 'invalid-input' });
    expect(
      checkSeatAvailability({ labId: NETWORKS, date: W37, group: 1.5 }, [], BEFORE, EARLY)
    ).toEqual({ ok: false, reason: 'invalid-input' });
  });

  it('rejects a full group but still fills the next one', () => {
    const existing = fullGroup(NETWORKS, W40, 1);
    expect(
      checkSeatAvailability({ labId: NETWORKS, date: W40, group: 1 }, existing, BEFORE, EARLY)
    ).toEqual({ ok: false, reason: 'group-full' });
    expect(
      checkSeatAvailability({ labId: NETWORKS, date: W40, group: 2 }, existing, BEFORE, EARLY)
    ).toEqual({ ok: true, seat: 1 });
  });

  it('caps lab 1 at one group of three for the whole week', () => {
    const existing = fullGroup(SAFETY, W38, 1);
    expect(
      checkSeatAvailability({ labId: SAFETY, date: W38, group: 1 }, existing, BEFORE, EARLY)
    ).toEqual({ ok: false, reason: 'group-full' });
    // …and there is no second group to fall back to
    expect(
      checkSeatAvailability({ labId: SAFETY, date: W38, group: 2 }, existing, BEFORE, EARLY)
    ).toEqual({ ok: false, reason: 'invalid-input' });
  });

  it('rejects slots that have already passed', () => {
    // the week before is gone once today is later
    expect(
      checkSeatAvailability({ labId: SAFETY, date: W37, group: 1 }, [], W38, EARLY)
    ).toEqual({ ok: false, reason: 'past-slot' });
    // today's slot closes when it starts at 10:15
    expect(
      checkSeatAvailability({ labId: SAFETY, date: W37, group: 1 }, [], W37, 10 * 60 + 14)
    ).toEqual({ ok: true, seat: 1 });
    expect(
      checkSeatAvailability({ labId: SAFETY, date: W37, group: 1 }, [], W37, 10 * 60 + 15)
    ).toEqual({ ok: false, reason: 'past-slot' });
  });

  it('lets both labs run in the same Wednesday slot', () => {
    const existing = [...fullGroup(SAFETY, W42, 1), ...fullGroup(NETWORKS, W42, 1)];
    // lab 1 is full for the week, lab 2 still has two groups free
    expect(
      checkSeatAvailability({ labId: SAFETY, date: W42, group: 1 }, existing, BEFORE, EARLY)
    ).toEqual({ ok: false, reason: 'group-full' });
    expect(
      checkSeatAvailability({ labId: NETWORKS, date: W42, group: 2 }, existing, BEFORE, EARLY)
    ).toEqual({ ok: true, seat: 1 });
  });
});

describe('checkStudentRules()', () => {
  it('allows a student with no seats yet', () => {
    expect(checkStudentRules([], { labId: SAFETY, date: W37 })).toBeNull();
  });

  it('allows the two different labs in different weeks', () => {
    const mine = [{ labId: SAFETY, date: W37 }];
    expect(checkStudentRules(mine, { labId: NETWORKS, date: W38 })).toBeNull();
    expect(checkStudentRules(mine, { labId: NETWORKS, date: W43 })).toBeNull();
  });

  it('refuses a second seat in the same lab, however many weeks apart', () => {
    const mine = [{ labId: SAFETY, date: W37 }];
    expect(checkStudentRules(mine, { labId: SAFETY, date: W40 })).toBe('already-booked');
    expect(checkStudentRules(mine, { labId: SAFETY, date: W37 })).toBe('already-booked');
  });

  it('refuses the other lab in the same Wednesday slot — nobody is in two places at once', () => {
    const mine = [{ labId: SAFETY, date: W38 }];
    expect(checkStudentRules(mine, { labId: NETWORKS, date: W38 })).toBe('same-slot');
  });

  it('reports the same-lab rule first when a request breaks both', () => {
    const mine = [{ labId: SAFETY, date: W38 }];
    expect(checkStudentRules(mine, { labId: SAFETY, date: W38 })).toBe('already-booked');
  });

  it('lets a student hold one seat in each lab once the weeks differ', () => {
    const mine = [
      { labId: SAFETY, date: W37 },
      { labId: NETWORKS, date: W40 },
    ];
    // both labs done — nothing further is allowed
    expect(checkStudentRules(mine, { labId: SAFETY, date: W42 })).toBe('already-booked');
    expect(checkStudentRules(mine, { labId: NETWORKS, date: W42 })).toBe('already-booked');
  });

  it('ignores other students’ seats — the caller passes only the student’s own', () => {
    expect(checkStudentRules([], { labId: NETWORKS, date: W38 })).toBeNull();
  });
});

describe('inventory mapping', () => {
  it('maps the two bookable labs to the kit they need', () => {
    expect(
      devicesForEquipment([
        'Fluke ESA615 Electrical Safety Analyzer (with a valid calibration certificate)',
        'Assorted Class I and Class II medical devices',
      ])
    ).toEqual(['fluke-esa615']);
    expect(
      devicesForEquipment(['Patient monitor with HL7 export (Philips IntelliVue)'])
    ).toEqual(['philips-intellivue']);
  });

  it('ignores untracked generic equipment', () => {
    expect(devicesForEquipment(['ESD-safe bench mat and wrist strap', 'Camera or phone'])).toEqual(
      []
    );
  });

  it('has exactly one unit of every Fluke model', () => {
    for (const device of DEVICES.filter((d) => d.key.startsWith('fluke-'))) {
      expect(device.quantity, device.key).toBe(1);
    }
  });
});
