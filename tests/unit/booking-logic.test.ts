import { describe, it, expect } from 'vitest';
import {
  assignWorkstation,
  checkAvailability,
  dayOfWeek,
  findDeviceConflicts,
  isBookableDate,
  isValidDateString,
  listBookableDates,
  openingHoursFor,
  overlaps,
  parseDurationHours,
  WORKSTATION_COUNT,
  type BookingInterval,
} from '../../src/lib/booking/logic';
import { devicesForEquipment, DEVICES } from '../../src/lib/booking/inventory';

// 2026-07-14 is a Tuesday, 2026-07-16 is a Thursday, 2026-07-15 a Wednesday.
const TUE = '2026-07-14';
const THU = '2026-07-16';
const WED = '2026-07-15';

const REQUIRED: Record<string, string[]> = {
  'defib-lab': ['fluke-impulse7000', 'lifepak15'],
  'safety-lab': ['fluke-esa615'],
  'teardown-lab': ['fluke-esa615', 'alaris-cc'],
  'ecg-lab': ['fluke-prosim8'],
};
const QUANTITIES: Record<string, number> = {
  'fluke-impulse7000': 1,
  'fluke-esa615': 1,
  'fluke-prosim8': 1,
  lifepak15: 2,
  'alaris-cc': 8,
};

function booking(
  labId: string,
  startHour: number,
  endHour: number,
  workstation = 1
): BookingInterval {
  return { labId, startHour, endHour, workstation };
}

describe('opening hours', () => {
  it('is open Tuesday 9-16', () => {
    expect(openingHoursFor(TUE)).toEqual({ start: 9, end: 16 });
  });
  it('is open Thursday 12-16', () => {
    expect(openingHoursFor(THU)).toEqual({ start: 12, end: 16 });
  });
  it('is closed other days', () => {
    expect(openingHoursFor(WED)).toBeNull();
    expect(openingHoursFor('2026-07-18')).toBeNull(); // Saturday
  });
  it('computes day of week without timezone drift', () => {
    expect(dayOfWeek(TUE)).toBe(2);
    expect(dayOfWeek(THU)).toBe(4);
  });
});

describe('date validation', () => {
  it('accepts valid date strings only', () => {
    expect(isValidDateString('2026-07-14')).toBe(true);
    expect(isValidDateString('2026-02-30')).toBe(false);
    expect(isValidDateString('14-07-2026')).toBe(false);
    expect(isValidDateString('garbage')).toBe(false);
  });
  it('lists only Tuesdays and Thursdays within the window', () => {
    const dates = listBookableDates('2026-07-13'); // a Monday
    expect(dates[0]).toBe(TUE);
    expect(dates[1]).toBe(THU);
    expect(dates.every((d) => [2, 4].includes(dayOfWeek(d)))).toBe(true);
    expect(dates.length).toBe(16); // 8 weeks × 2 days
  });
  it('rejects past dates and dates beyond the window', () => {
    expect(isBookableDate(TUE, '2026-07-13')).toBe(true);
    expect(isBookableDate('2026-07-07', '2026-07-13')).toBe(false); // past Tuesday
    expect(isBookableDate('2026-12-01', '2026-07-13')).toBe(false); // beyond 8 weeks
    expect(isBookableDate(WED, '2026-07-13')).toBe(false); // closed day
  });
});

describe('overlaps()', () => {
  it('detects partial and full overlap, rejects adjacency', () => {
    expect(overlaps(9, 12, 11, 14)).toBe(true);
    expect(overlaps(9, 12, 9, 12)).toBe(true);
    expect(overlaps(9, 12, 12, 15)).toBe(false);
    expect(overlaps(12, 15, 9, 12)).toBe(false);
  });
});

describe('assignWorkstation()', () => {
  it('assigns the lowest free station', () => {
    expect(assignWorkstation([], 9, 12)).toBe(1);
    expect(assignWorkstation([booking('x', 9, 12, 1)], 9, 12)).toBe(2);
    expect(assignWorkstation([booking('x', 9, 12, 1)], 12, 15)).toBe(1);
  });
  it('returns null when all stations overlap', () => {
    const full = Array.from({ length: WORKSTATION_COUNT }, (_, i) =>
      booking('x', 10, 13, i + 1)
    );
    expect(assignWorkstation(full, 12, 15)).toBeNull();
    expect(assignWorkstation(full, 13, 15)).toBe(1);
  });
});

describe('device conflicts', () => {
  it('blocks two labs needing the same single-unit Fluke at overlapping times', () => {
    const existing = [booking('safety-lab', 9, 12, 1)];
    const conflicts = findDeviceConflicts(
      { labId: 'teardown-lab', date: TUE, startHour: 11, endHour: 14 },
      existing,
      REQUIRED,
      QUANTITIES
    );
    expect(conflicts).toEqual(['fluke-esa615']);
  });

  it('allows the same labs back-to-back', () => {
    const existing = [booking('safety-lab', 9, 12, 1)];
    expect(
      findDeviceConflicts(
        { labId: 'teardown-lab', date: TUE, startHour: 12, endHour: 15 },
        existing,
        REQUIRED,
        QUANTITIES
      )
    ).toEqual([]);
  });

  it('allows different labs with disjoint devices at the same time', () => {
    const existing = [booking('safety-lab', 9, 12, 1)];
    expect(
      findDeviceConflicts(
        { labId: 'ecg-lab', date: TUE, startHour: 9, endHour: 12 },
        existing,
        REQUIRED,
        QUANTITIES
      )
    ).toEqual([]);
  });

  it('respects multi-unit quantities', () => {
    // two LIFEPAKs: two concurrent defib labs exhaust the single Impulse 7000
    // first, and a third would also exhaust the LIFEPAKs
    const existing = [booking('defib-lab', 9, 12, 1)];
    const conflicts = findDeviceConflicts(
      { labId: 'defib-lab', date: TUE, startHour: 10, endHour: 13 },
      existing,
      REQUIRED,
      QUANTITIES
    );
    expect(conflicts).toEqual(['fluke-impulse7000']);
  });
});

describe('checkAvailability()', () => {
  const request = { labId: 'safety-lab', date: TUE, startHour: 9, endHour: 12 };

  it('accepts a valid request and assigns a workstation', () => {
    expect(checkAvailability(request, [], REQUIRED, QUANTITIES)).toEqual({
      ok: true,
      workstation: 1,
    });
  });

  it('rejects closed days and out-of-hours requests', () => {
    expect(checkAvailability({ ...request, date: WED }, [], REQUIRED, QUANTITIES)).toEqual({
      ok: false,
      reason: 'closed',
    });
    expect(
      checkAvailability({ ...request, date: THU, startHour: 9, endHour: 12 }, [], REQUIRED, QUANTITIES)
    ).toEqual({ ok: false, reason: 'outside-hours' });
    expect(
      checkAvailability({ ...request, startHour: 14, endHour: 17 }, [], REQUIRED, QUANTITIES)
    ).toEqual({ ok: false, reason: 'outside-hours' });
    expect(
      checkAvailability({ ...request, startHour: 12, endHour: 12 }, [], REQUIRED, QUANTITIES)
    ).toEqual({ ok: false, reason: 'outside-hours' });
  });

  it('reports device conflicts before workstation exhaustion', () => {
    const existing = [booking('safety-lab', 10, 13, 3)];
    const result = checkAvailability(request, existing, REQUIRED, QUANTITIES);
    expect(result).toEqual({ ok: false, reason: 'device-conflict', devices: ['fluke-esa615'] });
  });

  it('rejects when all 8 workstations are taken', () => {
    const existing = Array.from({ length: WORKSTATION_COUNT }, (_, i) =>
      booking('ecg-lab', 9, 12, i + 1)
    );
    // request a lab with no device overlap so the workstation check is hit
    const result = checkAvailability(
      { labId: 'safety-lab', date: TUE, startHour: 10, endHour: 13 },
      existing,
      REQUIRED,
      QUANTITIES
    );
    expect(result).toEqual({ ok: false, reason: 'no-workstation' });
  });
});

describe('inventory mapping', () => {
  it('maps real lab equipment strings to Fluke devices', () => {
    expect(
      devicesForEquipment([
        'Fluke ESA615 Electrical Safety Analyzer (with a valid calibration certificate)',
        'CareFusion Alaris CC Syringe Pump (one per group)',
        'Digital multimeter (DMM)',
      ])
    ).toEqual(expect.arrayContaining(['fluke-esa615', 'alaris-cc']));
    expect(devicesForEquipment(['IDA-5 Infusion Device Analyzer (Fluke Biomedical)'])).toContain(
      'fluke-ida5'
    );
    expect(devicesForEquipment(['Fluke Impulse 7000DP'])).toContain('fluke-impulse7000');
    expect(devicesForEquipment(['Fluke QA-ES III Electrosurgery Analyzer'])).toContain(
      'fluke-qaes3'
    );
    expect(
      devicesForEquipment(['Fluke ProSim 8 Vital Signs and ECG Patient Simulator'])
    ).toContain('fluke-prosim8');
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

describe('parseDurationHours()', () => {
  it('parses English and Norwegian duration strings', () => {
    expect(parseDurationHours('3 hours')).toBe(3);
    expect(parseDurationHours('6 timer')).toBe(6);
    expect(parseDurationHours(undefined)).toBe(3);
  });
});
