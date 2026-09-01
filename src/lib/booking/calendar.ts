// Calendar export for booked lab sessions — a pure module, no I/O and no DOM,
// so it is unit-testable and safe to import from the client island.
//
// Times are stored as Europe/Oslo wall-clock ("10:15"), but a calendar file
// must pin an absolute instant. Rather than hardcoding +02:00 — correct for the
// autumn 2026 window but wrong the moment staff move the semester past the
// October DST change — the offset is read from the timezone database for each
// date, so a November slot exports as +01:00 without anyone noticing.

const TIME_ZONE = 'Europe/Oslo';
const PRODID = '-//medtek.tools//Lab booking//EN';

export interface CalendarEvent {
  /** Stable id, so re-importing updates the event instead of duplicating it. */
  uid: string;
  title: string;
  /** 'YYYY-MM-DD' */
  date: string;
  /** 'HH:MM' Europe/Oslo wall-clock. */
  start: string;
  /** 'HH:MM' Europe/Oslo wall-clock. */
  end: string;
  location: string;
  description: string;
}

/** UTC offset of Europe/Oslo at a given instant, in milliseconds. */
function zoneOffsetMs(instant: Date): number {
  const name = new Intl.DateTimeFormat('en-US', {
    timeZone: TIME_ZONE,
    timeZoneName: 'longOffset',
  })
    .formatToParts(instant)
    .find((part) => part.type === 'timeZoneName')?.value;

  const match = /GMT([+-])(\d{2}):(\d{2})/.exec(name ?? '');
  if (!match) return 0; // 'GMT' with no offset means UTC
  const sign = match[1] === '-' ? -1 : 1;
  return sign * (Number(match[2]) * 60 + Number(match[3])) * 60_000;
}

/** The absolute instant of an Oslo wall-clock date and time. */
export function osloToUtc(date: string, time: string): Date {
  const [year, month, day] = date.split('-').map(Number);
  const [hour, minute] = time.split(':').map(Number);
  const asIfUtc = Date.UTC(year, month - 1, day, hour, minute);

  // Two passes: the offset sampled at the naive instant can belong to the wrong
  // side of a DST change, so re-sample at the corrected instant and use that.
  const firstGuess = asIfUtc - zoneOffsetMs(new Date(asIfUtc));
  return new Date(asIfUtc - zoneOffsetMs(new Date(firstGuess)));
}

/** Basic-format UTC stamp, e.g. '20260916T081500Z'. */
export function utcStamp(instant: Date): string {
  return `${instant.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')}`;
}

/** Escape the characters RFC 5545 reserves inside a TEXT value. */
export function escapeIcsText(value: string): string {
  return value
    .replace(/\\/g, '\\\\') // first, so it does not escape the escapes below
    .replace(/;/g, '\\;')
    .replace(/,/g, '\\,')
    .replace(/\r?\n/g, '\\n');
}

/**
 * Fold a content line to 75 octets, per RFC 5545. Counted in octets rather than
 * characters because 'å' and '·' take two or three bytes each — a line of
 * Norwegian text that looks short can still overflow and break the import.
 */
export function foldIcsLine(line: string): string {
  const encoder = new TextEncoder();
  if (encoder.encode(line).length <= 75) return line;

  const parts: string[] = [];
  let current = '';
  let octets = 0;
  for (const char of line) {
    const size = encoder.encode(char).length;
    // continuation lines spend one octet on their leading space
    const limit = parts.length === 0 ? 75 : 74;
    if (octets + size > limit) {
      parts.push(current);
      current = '';
      octets = 0;
    }
    current += char;
    octets += size;
  }
  parts.push(current);
  return parts.join('\r\n ');
}

/** A complete single-event .ics file. */
export function buildIcs(event: CalendarEvent, now: Date = new Date()): string {
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    `PRODID:${PRODID}`,
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${escapeIcsText(event.uid)}`,
    `DTSTAMP:${utcStamp(now)}`,
    `DTSTART:${utcStamp(osloToUtc(event.date, event.start))}`,
    `DTEND:${utcStamp(osloToUtc(event.date, event.end))}`,
    `SUMMARY:${escapeIcsText(event.title)}`,
    `LOCATION:${escapeIcsText(event.location)}`,
    `DESCRIPTION:${escapeIcsText(event.description)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ];
  // CRLF endings, and a trailing one — some parsers drop an unterminated line
  return lines.map(foldIcsLine).join('\r\n') + '\r\n';
}

/** One-click "add to Google Calendar" link for the same event. */
export function googleCalendarUrl(event: CalendarEvent): string {
  const url = new URL('https://calendar.google.com/calendar/render');
  // query-string values carry their own encoding; ics escaping would show
  // literal backslashes in the Google form
  url.searchParams.set('action', 'TEMPLATE');
  url.searchParams.set('text', event.title);
  url.searchParams.set(
    'dates',
    `${utcStamp(osloToUtc(event.date, event.start))}/${utcStamp(osloToUtc(event.date, event.end))}`
  );
  url.searchParams.set('location', event.location);
  url.searchParams.set('details', event.description);
  return url.toString();
}

/** Filename for a downloaded booking, e.g. 'mte200-defibrillator-2026-09-08.ics'. */
export function icsFilename(labId: string, date: string): string {
  const safe = labId.replace(/[^a-z0-9-]/gi, '') || 'lab';
  return `${safe}-${date}.ics`;
}
