# Lab Slot Booking — Design

**Date:** 2026-08-31
**Status:** Implemented on `feat/lab-booking`
**Supersedes:** `2026-07-11-lab-booking-design.md` (workstation/interval model)

## Goal

Let students sign themselves up for lab slots in both lab courses, see which
seats their classmates have taken, and put the session in their own calendar.
Course staff set every date, time and capacity in one file.

## Constraints (from course staff)

| | MTE200 | MTE210 |
|---|---|---|
| Day | Tuesday | Wednesday |
| Slots | 09:00–11:30 and 11:30–14:00 | 10:15–13:00 |
| First lab day | 2026-09-08 (week 37) | 2026-09-09 (week 37) |
| Last lab day | 2026-11-17 (week 47) | 2026-10-21 (week 43) |
| Closed weeks | 41 | 39 and 41 |
| Lab days | 10 | 5 |
| Labs | 3 core + 4 elective | electrical safety, HL7/DICOM |
| Capacity per lab | 1 group × 3 students per slot | 1 × 3, and 3 × 3 |
| Cohort | 21 students = 7 groups | — |
| Labs per day | 3 (one supervisor) | no limit needed |

Room: **KE E-455**, the medical technology lab, for everything.

Rules that apply to a student rather than to remaining capacity:

- **One seat per lab.** Each lab is done once, however many weeks apart.
- **One seat per slot.** Nobody is in two places at once. Keyed on the *slot*,
  not the day, so a student may take the 09:00 and the 11:30 MTE200 period on
  the same Tuesday — which is the point of running two.

### Why the labs run in blocks

There is one supervisor, so only **three labs are set up on any Tuesday**
(`maxLabsPerDay`). Seven labs therefore cannot all be open all semester, and
each lab lists the days it actually runs.

A lab day seats 6 students in a lab (2 slots × 3), so a lab taken by all 21
needs ⌈21/6⌉ = 4 days.

- **Block 1 — core.** ECG, defibrillator, infusion pump. Everyone takes all
  three. Runs weeks 37–40 plus a fifth day in week 42: **30 seats against 21**,
  so a group that misses a session, or that ends up a pair rather than a three,
  still has somewhere to go. Without that spare day the block fits exactly, with
  a single spare group-slot per lab and no room for the ordinary friction of a
  semester.
- **Block 2 — elective.** Blood pressure, electrosurgery, ultrasound,
  ventilator; students take **two of the four** (`electivePicks: 2`). Rotating
  three-at-a-time across weeks 43–47 gives each lab 3–4 days. Because only about
  half the cohort takes any one of them, `seatsNeededFor` requires
  ⌈21 × 2 ÷ 4⌉ = 11 seats rather than 21, which every one of them clears with
  room to spare. It carries `opensOn: 2026-09-30` — visible from day one so
  students can plan, claimable once the four core days are done. The spare
  week-42 day is deliberately not part of that gate: it exists for stragglers,
  and everyone else should be able to book ahead by then.

Making block 2 elective is what buys block 1 its spare day. All seven labs being
compulsory needs 28 lab-days against the 30 available, leaving nothing to move;
electives free two.

Three build-time checks keep this honest: no day may exceed `maxLabsPerDay`,
every lab must reach `seatsNeededFor`, and every scheduled date must be an open
lab day. Dropping a Tuesday from the rotation fails the build rather than
quietly stranding a group.

**Assumption worth revisiting:** elective sizing assumes take-up is broadly even
across the four. If most of the cohort converged on the same two labs, the
three-day ventilator lab (18 seats) would fill. Raising `electivePicks`, or
giving a lab another date, both surface as build errors rather than surprises.

### Why one group per lab per slot

Most analyzers in the room are single-unit. The only devices two MTE200 labs
share are the LIFEPAK 15 (blood pressure + defibrillator) and the Keysight scope
(defibrillator + electrosurgery), and the department owns two of each. With one
group per lab per slot, peak demand for any device is therefore one unit per lab
and all seven labs can run in parallel with no clash. That is what removes the
need for a device-conflict engine: **the per-lab group cap is the capacity
model**, and `inventory.ts` only feeds the equipment display.

A unit test pins the assumption — it fails if either shared device drops below
two — so the reasoning cannot silently rot.

## Configuration

`src/lib/booking/courses.ts` is the only file staff edit between semesters:

```ts
export const COURSES: CourseBooking[] = [
  {
    id: 'MTE200',
    weekday: TUESDAY,
    slots: [{ start: '09:00', end: '11:30' }, { start: '11:30', end: '14:00' }],
    firstDate: '2026-09-08', lastDate: '2026-11-17', closedWeeks: [41],
    labs: [ /* seven labs, 1 × 3 each */ ],
  },
  { id: 'MTE210', weekday: WEDNESDAY, slots: [{ start: '10:15', end: '13:00' }], … },
];
```

Validated at module load, so a typo fails the build rather than producing a
silently empty semester: both dates must fall on the course's weekday, the
window must not run backwards, slots must be well-formed and ordered, and a lab
id must appear in exactly one course (otherwise a booking would be ambiguous).

## Data model (Neon Postgres)

```sql
CREATE TABLE slot_bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lab_id text NOT NULL,
  booking_date date NOT NULL,
  slot_number int NOT NULL DEFAULT 1 CHECK (slot_number >= 1),
  group_number int NOT NULL CHECK (group_number >= 1),
  seat_number int NOT NULL CHECK (seat_number >= 1),
  student_name text NOT NULL,
  student_email text NOT NULL,
  cancel_token text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT slot_bookings_seat_key
    UNIQUE (lab_id, booking_date, slot_number, group_number, seat_number)
);
CREATE UNIQUE INDEX slot_bookings_one_per_lab_idx
  ON slot_bookings (lab_id, lower(student_email));
CREATE UNIQUE INDEX slot_bookings_one_per_slot_idx
  ON slot_bookings (booking_date, slot_number, lower(student_email));
```

The three unique indexes enforce the course rules in the database itself: a
group cannot hold a fourth student, one email cannot hold two seats in a lab,
and one email cannot hold two seats in a slot. Violations are translated back
into ordinary error codes rather than surfacing as a 500.

Upper-bound CHECKs on seats were deliberately dropped. They froze capacity at
whatever was configured the day the table was created, so raising
`seatsPerGroup` in `courses.ts` would have produced unexplained 503s.

### Migration

`slot_number` was added after the first release. `ensureSchema` carries a
migration guarded on the column's existence — not run unconditionally, because
dropping and recreating a unique index on every cold start would briefly leave
the rule unenforced. Existing rows default to slot 1, which is correct: every
pre-slot booking belongs to a course that had one slot.

### Concurrency

Seat creation runs inside a transaction that first takes
`pg_advisory_xact_lock`, with `lock_timeout` and `statement_timeout` set, so the
availability check and the INSERT cannot race.

## Domain logic (`src/lib/booking/logic.ts`)

Pure, unit-tested, no I/O. Everything is derived from a `CourseBooking`:
`isoWeek`, `listSemesterWeeks`, `listSlotDates`, `isOpenSlotDate`, `slotOf`,
`isPastSlot` (judged per slot, so the 11:30 period survives the 09:00 one),
`assignSeat`, `seatsFreeFor`, `checkSeatAvailability`, and `checkStudentRules`
for the two per-student rules above.

## Calendar export (`src/lib/booking/calendar.ts`)

Each booking offers an `.ics` download and a Google Calendar link, both carrying
the room and the slot's own times. Bookings are stored as Oslo wall-clock, so
the UTC offset is read from the timezone database per date rather than
hardcoded: the MTE200 window crosses the 25 October change, so its November
Tuesdays export at +01:00 while September's export at +02:00, with no code edit.
The writer escapes RFC 5545 reserved characters and folds lines at 75 **octets**
— Norwegian letters cost two bytes, so a character count would overflow and
break the import.

## API

- `GET /api/availability` — both courses' whole semesters plus every booking,
  public fields only (first name, never email or token).
- `POST /api/bookings` — `{ labId, date, slot, group, name, email }`. Errors:
  `invalid-input`, `unknown-lab`, `closed-week`, `past-slot`, `group-full`,
  `already-booked`, `same-slot`, `busy`, `service-unavailable`.
- `DELETE /api/bookings/:id` — cancel with the `x-cancel-token` header.

## UI

One page for both courses: course tabs → lab buttons → a weekly plan table
showing which labs run on which day → a list of **the selected lab's own** lab
days, each showing its slots and each slot its groups and seats. Because a lab's
list only holds its own days, closed weeks are called out in the plan table
instead, which is where someone would look for what happens in a given week. A
lab that has not opened yet shows its days with a banner and disabled buttons. Free seats
are buttons; closed weeks render greyed and labelled rather than hidden. A slot
where the student already holds another lab is disabled with a note naming it.
Slot blocks carry `data-date` / `data-slot` so tests and deep links do not
depend on surrounding markup.

## Lab durations

Frontmatter durations on the nine bookable labs were set to their real slot
length (MTE200 2.5 hours, MTE210 2 hours 45 minutes) on staff confirmation that
the labs fit. The two non-bookable MTE210 labs keep their original estimates.

## Out of scope

Email confirmations, staff admin UI, authentication, waiting lists. Booking
stays honour-system with a cancel token, appropriate for a class tool.
