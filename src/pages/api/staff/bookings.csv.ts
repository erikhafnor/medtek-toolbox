export const prerender = false;

import type { APIRoute } from 'astro';
import { listBookingsForStaff, listCompletions } from '../../../lib/booking/db';
import { COURSES } from '../../../lib/booking/courses';
import { slotOf } from '../../../lib/booking/logic';

/** RFC 4180: quote every field and double any quote inside it. */
function csvCell(value: string | number): string {
  return `"${String(value).replace(/"/g, '""')}"`;
}

/**
 * The roster as a spreadsheet. Gated by src/middleware.ts along with the
 * roster page — it carries the same student emails.
 */
export const GET: APIRoute = async () => {
  let bookings;
  let completions;
  try {
    [bookings, completions] = await Promise.all([listBookingsForStaff(), listCompletions()]);
  } catch (err) {
    console.error('staff csv read failed:', err);
    return new Response('Could not load bookings.', { status: 503 });
  }
  // so the exported sheet can be graded from directly
  const approved = new Set(
    completions.map((c) => `${c.labId}|${c.studentEmail.toLowerCase()}`)
  );

  const header = [
    'course',
    'lab',
    'date',
    'slot',
    'start',
    'end',
    'group',
    'seat',
    'student',
    'email',
    'booked_at',
    'approved',
  ];

  const rows = bookings.map((b) => {
    const course = COURSES.find((c) => c.labs.some((l) => l.id === b.labId));
    const period = course ? slotOf(course, b.slot) : null;
    return [
      course?.id ?? '',
      b.labId,
      b.date,
      b.slot,
      period?.start ?? '',
      period?.end ?? '',
      b.group,
      b.seat,
      b.studentName,
      b.studentEmail,
      b.createdAt,
      approved.has(`${b.labId}|${b.studentEmail.toLowerCase()}`) ? 'yes' : 'no',
    ]
      .map(csvCell)
      .join(',');
  });

  // BOM so Excel opens the Norwegian characters correctly
  const body = `﻿${header.map(csvCell).join(',')}\r\n${rows.join('\r\n')}\r\n`;
  const stamp = new Date().toISOString().slice(0, 10);

  return new Response(body, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="labbookinger-${stamp}.csv"`,
      'Cache-Control': 'no-store',
    },
  });
};
