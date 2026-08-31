# MTE210 Weekly Slot Booking — Design

**Date:** 2026-08-31
**Status:** Approved, ready to implement
**Supersedes:** `2026-07-11-lab-booking-design.md` (workstation/interval model)

## Goal

Let MTE210 students sign themselves up for the course's single weekly lab slot —
**Wednesdays 10:15–13:00** — and see at a glance which seats other students have
already taken. Course staff set the semester window and per-lab capacity in one file.

## Constraints (from course staff)

- One slot per week: **Wednesday 10:15–13:00**. No other times exist.
- Semester window: **9 September 2026 (week 37) through week 43 (21 October 2026)**, inclusive.
- **Week 39 (23 Sept) and week 41 (7 Oct) are closed** for booking.
- **Lab 1 — "Elektrisk sikkerhetstesting"** (`mte210-electrical-safety`):
  1 group per week, max 3 students per group.
- **Lab 2 — "HL7 og DICOM"** (`mte210-hospital-networks`):
  3 groups per week, max 3 students per group.
- Both labs run in the same Wednesday slot; their capacity is independent.
- Students sign up **individually into a seat**, choosing which group to join, so
  groups can form on the site.
- A student may hold **at most one seat per lab** (so: Lab 1 once, Lab 2 once).
- A student may hold **at most one seat per Wednesday**, across both labs — the
  two labs share the one weekly slot, so nobody can attend both at once.

That yields 5 bookable Wednesdays:

| Wednesday | ISO week | Status |
|---|---|---|
| 2026-09-09 | 37 | open |
| 2026-09-16 | 38 | open |
| 2026-09-23 | 39 | **closed** |
| 2026-09-30 | 40 | open |
| 2026-10-07 | 41 | **closed** |
| 2026-10-14 | 42 | open |
| 2026-10-21 | 43 | open (last) |

Capacity: Lab 1 = 5 × 1 × 3 = **15 seats**. Lab 2 = 5 × 3 × 3 = **45 seats**.

## Approaches considered

1. **Seat/slot model in a new table** ← chosen. `logic.ts` is rewritten around
   weeks, groups and seats; a new `slot_bookings` table replaces the workstation
   columns. The old `bookings` table is left untouched rather than contorted.
2. Keep the hour-interval model, hardcode 10–13, map "group" onto "workstation".
   Less churn, but every identifier in the codebase would then lie about what it
   holds, and the shared Neon database would mix two meanings in one table.
3. Run a second booking mode alongside the existing MTE200 one. Rejected —
   only the two MTE210 labs are in scope.

## Semester configuration

`src/lib/booking/semester.ts` is the single file course staff edit between semesters:

```ts
export const SLOT = { start: '10:15', end: '13:00' }; // Wednesdays
export const FIRST_DATE = '2026-09-09';  // week 37
export const LAST_DATE  = '2026-10-21';  // week 43, inclusive
export const CLOSED_WEEKS = [39, 41];    // ISO week numbers
export const BOOKABLE_LABS = [
  { id: 'mte210-electrical-safety', groupsPerWeek: 1, seatsPerGroup: 3 },
  { id: 'mte210-hospital-networks', groupsPerWeek: 3, seatsPerGroup: 3 },
];
```

Closed weeks are keyed by ISO week number, matching how staff describe them.
`FIRST_DATE` must be a Wednesday; the date list is derived from it, so a
non-Wednesday start would silently produce an empty semester — validated at module
load with a thrown error rather than left as a trap.

## Data model (Neon Postgres)

A new table, seat-level, so over-filling is structurally impossible:

```sql
CREATE TABLE slot_bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lab_id text NOT NULL,
  booking_date date NOT NULL,
  group_number int NOT NULL CHECK (group_number >= 1),
  seat_number int NOT NULL CHECK (seat_number >= 1 AND seat_number <= 3),
  student_name text NOT NULL,
  student_email text NOT NULL,
  cancel_token text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (lab_id, booking_date, group_number, seat_number)
);
CREATE UNIQUE INDEX slot_bookings_one_per_lab_idx
  ON slot_bookings (lab_id, lower(student_email));
CREATE UNIQUE INDEX slot_bookings_one_per_slot_idx
  ON slot_bookings (booking_date, lower(student_email));
CREATE INDEX slot_bookings_lab_date_idx ON slot_bookings (lab_id, booking_date);
```

The three unique indexes enforce the course rules in the database itself,
independently of the application check: a group can never hold a fourth student,
one email can never hold two seats in the same lab, and one email can never hold
two seats in the same Wednesday slot. Schema creation stays
idempotent (`ensureSchema`), so a fresh preview database needs no migration step.

The pre-existing `bookings` table is left in place and unused. It is not dropped:
the Neon database is shared across Production/Preview/Development, so a drop from
one environment would destroy data visible to the others.

### Concurrency

Unchanged in shape from the previous design: booking creation runs inside a
transaction that first takes `pg_advisory_xact_lock(<constant>)`, with
`lock_timeout` and `statement_timeout` set, so the seat availability check and the
INSERT cannot race. A losing racer that somehow slips past the check is still
rejected by the unique constraint, which is translated into the same
`group-full` / `already-booked` error codes rather than a 500.

## Domain logic (`src/lib/booking/logic.ts`, rewritten)

Pure, unit-tested, no I/O:

- `isoWeek(date)` — ISO-8601 week number for a `YYYY-MM-DD` string, timezone-immune.
- `listSlotDates()` — the bookable Wednesdays: every Wednesday from `FIRST_DATE`
  to `LAST_DATE` whose ISO week is not in `CLOSED_WEEKS`.
- `listSemesterWeeks()` — every Wednesday in the window *including* closed ones,
  each tagged `open` / `closed`, so the UI can explain the gaps.
- `isBookableSlot(date, today)` — is this an open, not-yet-passed slot date?
- `capacityFor(labId)` — `{ groupsPerWeek, seatsPerGroup }` or null for unknown labs.
- `checkStudentRules(mine, request)` — the rules that depend on who is asking:
  `already-booked` (a second seat in the same lab) and `same-slot` (any seat
  already held that Wednesday). Pure, so both the API and the UI share it.
- `assignSeat(existing, group, seatsPerGroup)` — lowest free seat number, or null.
- `checkSeatAvailability(request, existing, today)` — the full decision, returning
  `{ ok: true, seat }` or a reason code.

Removed with the workstation model: `WORKSTATION_COUNT`, `OPENING_HOURS`,
`assignWorkstation`, `findDeviceConflicts`, `checkAvailability`,
`listBookableDates`, `isBookableDate`, `openingHoursFor`, `overlaps`, `dayOfWeek`.

**Device-conflict checking leaves the booking path.** Three Lab 2 groups share one
Philips IntelliVue, which the old inventory rule would have rejected — but course
staff have specified three groups, so the per-week group limits *are* the capacity
model now. `inventory.ts` is kept, but only to display "Requires: Fluke ESA615 ·
single unit" on the form. This also retires the correctness risk in that file's
estimated non-Fluke quantities, which no longer gate anything.

## API (Astro endpoints, `prerender = false`)

- `GET /api/availability` — no parameters. Returns the whole semester in one call
  (at most 60 rows), and the client composes the grid:
  ```json
  {
    "slot": { "start": "10:15", "end": "13:00" },
    "weeks": [{ "date": "2026-09-09", "isoWeek": 37, "open": true }],
    "labs": [{ "labId": "…", "groupsPerWeek": 1, "seatsPerGroup": 3 }],
    "bookings": [{ "id": "…", "labId": "…", "date": "…", "group": 1,
                   "seat": 1, "bookedBy": "Kari" }]
  }
  ```
  Public fields only — first name, never email or cancel token.
- `POST /api/bookings` — `{ labId, date, group, name, email }`. Validates that the
  lab is bookable, the date is an open future slot, and the group number is within
  capacity; assigns the lowest free seat. Error codes: `invalid-input`,
  `unknown-lab`, `closed-week`, `past-slot`, `group-full`, `already-booked`,
  `busy`, `service-unavailable`.
- `DELETE /api/bookings/:id` — unchanged; cancel with the token issued at creation,
  sent in an `x-cancel-token` header.

The lab catalog (id, title, required devices for display) is still derived from the
`labs` content collection, filtered to `BOOKABLE_LABS` and ordered to match it, so
Lab 1 and Lab 2 appear in course order rather than alphabetically.

## UI

`BookingSystem.svelte` is rewritten around the semester grid:

- Lab selector for the two labs; `?lab=<slug>` still preselects.
- One card per Wednesday in the window. Each card lists the lab's groups and the
  members in each; free seats are buttons. Closed weeks 39 and 41 render greyed
  and labelled *Stengt for booking* / *Closed for booking* rather than hidden, so
  the gap in the semester is explained. Past Wednesdays grey out automatically
  against Europe/Oslo "today".
- Clicking a free seat opens the name/email form for that seat and confirms.
- `localStorage` "my bookings" list with cancel buttons carries over unchanged.
- All strings bilingual via `BOOKING_LABELS` in `labels.ts`.

Elsewhere: only the two MTE210 lab pages keep the "Book a lab session" button, so
`bookingSlug` is passed from `[...slug].astro` only when the slug is bookable.

## Testing

- Vitest unit tests for `logic.ts`: ISO week numbers across a year boundary, the
  5-date semester list, weeks 39/41 excluded, capacity lookup, lowest-free-seat
  assignment, group-full and unknown-lab rejection, past-slot rejection.
- Playwright e2e: both locales render; a seat can be booked and cancelled again
  (which also cleans up the shared database).
- Manual smoke test on the Vercel preview deployment before merge.

## Room and calendar export

All lab work runs in **KE E-455**, the medical technology lab. `src/lib/room.ts`
holds the room number and its per-locale name, shared by the booking system and
the lab pages, so a room change is a one-line edit. A single lab can override it
with a `room:` field in its frontmatter; every lab page falls back to `LAB_ROOM`,
which is why no content files needed editing.

`src/lib/booking/calendar.ts` turns a booking into a calendar entry — a pure
module, unit-tested, no DOM. Each booking in "My bookings", and the confirmation
message, offers two routes: an `.ics` download (Outlook, Apple Calendar, and
anything else) and a Google Calendar template link.

Times are stored as Europe/Oslo wall-clock, but a calendar entry needs an
absolute instant, so the UTC offset is read from the timezone database per date
rather than hardcoded. The autumn 2026 window is entirely CEST (+02:00), but a
semester moved past the October change would export as CET (+01:00) with no code
edit; both cases are unit-tested. The `.ics` output escapes RFC 5545 reserved
characters and folds lines at 75 **octets**, since Norwegian text costs two bytes
a letter and a naive character count would overflow and break the import.

## Out of scope

Email confirmations, staff admin UI, authentication, waiting lists. Booking stays
honour-system with a cancel token, appropriate for a class tool of this size.
