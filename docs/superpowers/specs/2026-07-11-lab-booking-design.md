# Lab Booking System — Design

**Date:** 2026-07-11
**Status:** Superseded by `2026-08-31-mte210-slot-booking-design.md`, which replaced the
workstation/interval model with the MTE210 weekly Wednesday slot. Kept for context.

## Goal

Let students book lab sessions for the MTE200/MTE210 lab assignments, with server-side
enforcement of room capacity (8 workstations) and device availability — in particular the
Fluke analyzers, of which the department owns exactly one of each model.

## Constraints (from course staff)

- Lab room is open **Tuesdays 09:00–16:00** and **Thursdays 12:00–16:00**.
- One room, **8 workstations**; a booking occupies one workstation (one group per station).
- Each lab requires specific devices (from the lab's `equipment` frontmatter). Overlapping
  bookings must never require more units of a device than the inventory holds.
- Fluke devices (ESA615, ProSim 8, QA-ES III, Impulse 7000DP, IDA-5, VT900A): **1 unit each**.
- Must be testable on a Vercel preview deployment before merging.

## Approaches considered

1. **Astro + `@astrojs/vercel` adapter, API routes in `src/pages/api/`, Neon Postgres** ← chosen.
   Idiomatic Astro; pages stay prerendered, only API routes are server-rendered; local dev
   works with `astro dev`; content collections (lab equipment) available server-side so the
   lab catalog has one source of truth.
2. Static site + separate root `api/` directory of raw Vercel functions. Leaves the build
   untouched but splits the codebase idiom and cannot reuse `astro:content` for lab data.
3. Third-party booking SaaS (Cal.com etc.). No device-inventory constraint model; rejected.

## Data model (Neon Postgres)

```sql
CREATE TABLE bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lab_id text NOT NULL,
  booking_date date NOT NULL,
  start_hour int NOT NULL,
  end_hour int NOT NULL,            -- exclusive
  workstation int NOT NULL,         -- 1..8, auto-assigned lowest free
  student_name text NOT NULL,
  student_email text NOT NULL,      -- never exposed via public API
  cancel_token text NOT NULL,       -- returned once at creation; needed to cancel
  created_at timestamptz DEFAULT now()
);
```

Schema is created idempotently on first use (`ensureSchema`), so a fresh preview-branch
database works without a manual migration step.

### Concurrency

All writes run inside a transaction that first takes `pg_advisory_xact_lock(<constant>)`,
serializing booking creation (single room, low volume — contention is irrelevant). The
availability check and insert therefore cannot race. Workstation double-booking is also
rejected by re-checking inside the same transaction.

## Domain logic (`src/lib/booking/`)

- `inventory.ts` — device inventory: key, display name, quantity, and matchers that map lab
  `equipment` strings to device keys. Fluke devices have quantity 1 (per course staff). Other
  tracked devices default to 2 — **course staff should adjust these counts to the real
  inventory**; the file is the single place to edit. Untracked generic equipment (cables,
  hand tools, ESD mats…) is not capacity-constrained.
- `logic.ts` — pure functions, unit-tested: opening hours (`Tue 9–16`, `Thu 12–16`), interval
  overlap, device usage per hour, conflict detection (workstations + devices), lowest-free
  workstation assignment, bookable-date generation (next 8 weeks, Europe/Oslo "today").
- `db.ts` — Neon serverless Pool, `ensureSchema`, `listBookingsByDate`,
  `createBooking` (advisory-lock transaction), `cancelBooking` (id + token).

## API (Astro endpoints, `prerender = false`)

- `GET /api/availability?date=YYYY-MM-DD` → `{ date, openHours, bookings: [...] }` — public
  fields only (lab, hours, workstation, student first name); no emails, no tokens.
- `POST /api/bookings` — `{ labId, date, startHour, duration, name, email }`. Validates
  opening hours, lab exists, date bookable; computes required devices from the lab catalog;
  rejects with a translatable error code on conflict. Returns booking + `cancelToken`.
- `DELETE /api/bookings/:id?token=…` — cancel with the token from creation.

Lab catalog (id, title, duration, required devices) is derived at runtime from the `labs`
content collection (EN entries are canonical; slugs match NO entries).

## UI

- New pages `/en/booking/` and `/no/booking/` (prerendered shells) hosting a Svelte 5 island
  `BookingSystem.svelte`: pick a lab → pick a date (upcoming Tue/Thu) → see an
  hour-by-hour availability grid (free workstations + which required devices are taken) →
  choose start time and duration (defaults from the lab's `duration`) → enter name/email →
  confirm. After booking: confirmation with cancel link; bookings are also remembered in
  `localStorage` ("my bookings" list with cancel buttons).
- `?lab=<slug>` query param preselects a lab; each lab page gets a "Book this lab" button.
- Nav gains a "Book a lab session" / "Book labtid" item. All strings bilingual via the
  existing `t()` dictionary plus a labels object passed to the island.

## Out of scope (v1)

- Email confirmations, admin UI (staff can edit rows in the Neon console), login/auth,
  rate limiting. Booking is honor-system with a cancel token, appropriate for a class tool.

## Testing

- Vitest unit tests for `logic.ts` and the inventory mapping.
- Build + `astro dev` API exercise (create → conflict → cancel) against the real database.
- Manual smoke test on the Vercel preview deployment.

## Deployment notes

- `@astrojs/vercel` adapter added; build output moves to `.vercel/output`, so the pagefind
  step in `package.json` indexes `.vercel/output/static` instead of `dist`.
- Neon database `neon-orange-desert` provisioned via Vercel Marketplace; `DATABASE_URL` is
  set for Production/Preview/Development. All environments currently share one database.
