import { describe, it, expect } from 'vitest';
import {
  buildIcs,
  icsFilename,
  escapeIcsText,
  foldIcsLine,
  googleCalendarUrl,
  osloToUtc,
  utcStamp,
  type CalendarEvent,
} from '../../src/lib/booking/calendar';
import { LAB_ROOM } from '../../src/lib/room';

const event: CalendarEvent = {
  uid: 'abc-123',
  title: 'Lab i elektrisk sikkerhetstesting',
  date: '2026-09-16',
  start: '10:15',
  end: '13:00',
  location: LAB_ROOM,
  description: 'MTE210 · Gruppe 1',
};

/** Fixed stamp so the generated file is deterministic in tests. */
const NOW = new Date('2026-08-31T12:00:00Z');

describe('osloToUtc()', () => {
  it('converts summer time (CEST, UTC+2)', () => {
    expect(osloToUtc('2026-09-16', '10:15').toISOString()).toBe('2026-09-16T08:15:00.000Z');
    expect(osloToUtc('2026-09-16', '13:00').toISOString()).toBe('2026-09-16T11:00:00.000Z');
  });

  it('converts winter time (CET, UTC+1) — a later semester must not drift', () => {
    // Norway leaves summer time on 25 October 2026
    expect(osloToUtc('2026-11-04', '10:15').toISOString()).toBe('2026-11-04T09:15:00.000Z');
    expect(osloToUtc('2026-12-02', '13:00').toISOString()).toBe('2026-12-02T12:00:00.000Z');
  });

  it('handles the days either side of the autumn transition', () => {
    expect(osloToUtc('2026-10-21', '10:15').toISOString()).toBe('2026-10-21T08:15:00.000Z');
    expect(osloToUtc('2026-10-28', '10:15').toISOString()).toBe('2026-10-28T09:15:00.000Z');
  });
});

describe('utcStamp()', () => {
  it('formats an instant as a basic-format UTC stamp', () => {
    expect(utcStamp(new Date('2026-09-16T08:15:00Z'))).toBe('20260916T081500Z');
  });
});

describe('escapeIcsText()', () => {
  it('escapes the characters RFC 5545 reserves', () => {
    expect(escapeIcsText('a,b')).toBe('a\\,b');
    expect(escapeIcsText('a;b')).toBe('a\\;b');
    expect(escapeIcsText('a\\b')).toBe('a\\\\b');
    expect(escapeIcsText('a\nb')).toBe('a\\nb');
    expect(escapeIcsText('a\r\nb')).toBe('a\\nb');
  });

  it('escapes the backslash before the other replacements introduce their own', () => {
    expect(escapeIcsText('50%\\, or so')).toBe('50%\\\\\\, or so');
  });
});

describe('foldIcsLine()', () => {
  it('leaves a short line alone', () => {
    expect(foldIcsLine('SUMMARY:short')).toBe('SUMMARY:short');
  });

  it('folds a long line with CRLF and a leading space', () => {
    const folded = foldIcsLine('SUMMARY:' + 'x'.repeat(200));
    const parts = folded.split('\r\n');
    expect(parts.length).toBeGreaterThan(1);
    expect(parts.slice(1).every((p) => p.startsWith(' '))).toBe(true);
    // unfolding restores the original
    expect(parts.map((p, i) => (i === 0 ? p : p.slice(1))).join('')).toBe(
      'SUMMARY:' + 'x'.repeat(200)
    );
  });

  it('counts octets, not characters, so Norwegian letters cannot overflow', () => {
    const folded = foldIcsLine('SUMMARY:' + 'å'.repeat(100));
    for (const part of folded.split('\r\n')) {
      expect(new TextEncoder().encode(part).length).toBeLessThanOrEqual(75);
    }
  });
});

describe('buildIcs()', () => {
  const ics = buildIcs(event, NOW);

  it('is a complete VCALENDAR with one VEVENT', () => {
    expect(ics).toContain('BEGIN:VCALENDAR');
    expect(ics).toContain('VERSION:2.0');
    expect(ics).toContain('BEGIN:VEVENT');
    expect(ics).toContain('END:VEVENT');
    expect(ics.trimEnd().endsWith('END:VCALENDAR')).toBe(true);
  });

  it('uses UTC instants matching the Oslo wall-clock slot', () => {
    expect(ics).toContain('DTSTART:20260916T081500Z');
    expect(ics).toContain('DTEND:20260916T110000Z');
    expect(ics).toContain('DTSTAMP:20260831T120000Z');
  });

  it('carries the room, title and a stable uid', () => {
    expect(ics).toContain(`LOCATION:${LAB_ROOM}`);
    expect(ics).toContain('SUMMARY:Lab i elektrisk sikkerhetstesting');
    expect(ics).toContain('UID:abc-123');
  });

  it('uses CRLF line endings throughout, as the spec requires', () => {
    expect(ics.split('\n').every((line) => line === '' || line.endsWith('\r'))).toBe(true);
  });

  it('escapes reserved characters in user-supplied text', () => {
    const ics = buildIcs({ ...event, description: 'Gruppe 1, seat 2; bring notes' }, NOW);
    expect(ics).toContain('DESCRIPTION:Gruppe 1\\, seat 2\\; bring notes');
  });
});

describe('icsFilename()', () => {
  it('names the file after the lab and date', () => {
    expect(icsFilename('mte200-defibrillator', '2026-09-08')).toBe(
      'mte200-defibrillator-2026-09-08.ics'
    );
  });

  it('strips anything that has no place in a filename', () => {
    expect(icsFilename('../../etc/passwd', '2026-09-08')).toBe('etcpasswd-2026-09-08.ics');
    expect(icsFilename('', '2026-09-08')).toBe('lab-2026-09-08.ics');
  });
});

describe('googleCalendarUrl()', () => {
  const url = new URL(googleCalendarUrl(event));

  it('points at the Google template action', () => {
    expect(url.origin + url.pathname).toBe('https://calendar.google.com/calendar/render');
    expect(url.searchParams.get('action')).toBe('TEMPLATE');
  });

  it('passes the same UTC window as the ics file', () => {
    expect(url.searchParams.get('dates')).toBe('20260916T081500Z/20260916T110000Z');
  });

  it('passes the title and room unescaped — the query string is not ics text', () => {
    expect(url.searchParams.get('text')).toBe('Lab i elektrisk sikkerhetstesting');
    expect(url.searchParams.get('location')).toBe(LAB_ROOM);
  });
});
