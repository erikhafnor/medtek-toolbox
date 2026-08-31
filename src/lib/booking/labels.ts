// UI strings for the booking island, following the LabLayout convention of
// per-language label objects (the global i18n dictionary stays lean).
//
// Templates use {placeholders} filled in by the island; keep the placeholder
// names identical across languages.

import type { Locale } from '../i18n';

export interface BookingLabels {
  title: string;
  intro: string;
  lab: string;
  requires: string;
  singleUnit: string;
  capacityNote: string;
  groupOne: string;
  groupMany: string;
  semester: string;
  semesterRange: string;
  closedWeeksNote: string;
  week: string;
  group: string;
  seatsLeft: string;
  freeSeat: string;
  booking: string;
  groupFull: string;
  weekClosed: string;
  weekPast: string;
  yourDetails: string;
  name: string;
  namePlaceholder: string;
  email: string;
  emailPlaceholder: string;
  detailsHint: string;
  loading: string;
  successTitle: string;
  successBody: string;
  successKeep: string;
  myBookings: string;
  myBookingsEmpty: string;
  cancel: string;
  cancelling: string;
  errors: Record<string, string>;
}

export const BOOKING_LABELS: Record<Locale, BookingLabels> = {
  en: {
    title: 'Book lab time — MTE210',
    intro:
      'MTE210 has one lab session a week: Wednesdays 10:15–13:00. Pick an assignment and take a free seat in a group — you can see which seats your fellow students have already taken.',
    lab: 'Lab assignment',
    requires: 'Equipment',
    singleUnit: 'single unit',
    capacityNote: '{groups} {groupWord} × up to {seats} students per week',
    groupOne: 'group',
    groupMany: 'groups',
    semester: 'Semester overview',
    semesterRange: '{first} – {last} · Wednesdays {start}–{end}',
    closedWeeksNote: 'Week {weeks} closed for booking.',
    week: 'Week {week}',
    group: 'Group {group}',
    seatsLeft: '{free} of {total} seats free',
    freeSeat: 'Take seat',
    you: 'you',
    booking: 'Booking…',
    groupFull: 'Full',
    weekClosed: 'Closed for booking',
    weekPast: 'Passed',
    yourDetails: 'Your details',
    name: 'Name',
    namePlaceholder: 'e.g. Kari Nordmann',
    email: 'Email',
    emailPlaceholder: 'you@stud.uis.no',
    detailsHint: 'Fill in your name and email to take a seat.',
    loading: 'Loading availability…',
    successTitle: 'Seat booked!',
    successBody: 'You have seat {seat} in group {group} on {date}, {time}.',
    successKeep:
      'Your booking is saved in this browser under “My bookings”, where you can cancel it if plans change.',
    myBookings: 'My bookings',
    myBookingsEmpty: 'No bookings in this browser yet.',
    cancel: 'Cancel booking',
    cancelling: 'Cancelling…',
    errors: {
      'closed-week': 'That week is not open for booking.',
      'past-slot': 'That lab session has already started or passed.',
      'group-full': 'That group just filled up — please pick another seat.',
      'already-booked':
        'You already have a seat for this lab assignment. Cancel it first if you want to move.',
      'unknown-lab': 'Unknown lab assignment.',
      'invalid-input': 'Please check the form — some fields are missing or invalid.',
      busy: 'The booking service is busy right now — please try again in a few seconds.',
      'service-unavailable': 'The booking service is temporarily unavailable. Please try again.',
      'not-found': 'The booking could not be found — it may already be cancelled.',
      network: 'Could not reach the booking service. Please try again.',
    },
  },
  no: {
    title: 'Book labtid — MTE210',
    intro:
      'MTE210 har én laboratorietime i uka: onsdager 10:15–13:00. Velg laboppgave og ta en ledig plass i en gruppe — du ser hvilke plasser medstudentene allerede har tatt.',
    lab: 'Laboppgave',
    requires: 'Utstyr',
    singleUnit: 'kun én enhet',
    capacityNote: '{groups} {groupWord} × maks {seats} studenter per uke',
    groupOne: 'gruppe',
    groupMany: 'grupper',
    semester: 'Semesteroversikt',
    semesterRange: '{first} – {last} · onsdager {start}–{end}',
    closedWeeksNote: 'Uke {weeks} er stengt for booking.',
    week: 'Uke {week}',
    group: 'Gruppe {group}',
    seatsLeft: '{free} av {total} plasser ledige',
    freeSeat: 'Ta plass',
    you: 'deg',
    booking: 'Booker…',
    groupFull: 'Full',
    weekClosed: 'Stengt for booking',
    weekPast: 'Passert',
    yourDetails: 'Dine opplysninger',
    name: 'Navn',
    namePlaceholder: 'f.eks. Kari Nordmann',
    email: 'E-post',
    emailPlaceholder: 'deg@stud.uis.no',
    detailsHint: 'Fyll inn navn og e-post for å ta en plass.',
    loading: 'Laster tilgjengelighet…',
    successTitle: 'Plass booket!',
    successBody: 'Du har plass {seat} i gruppe {group} {date}, kl. {time}.',
    successKeep:
      'Bookingen er lagret i denne nettleseren under «Mine bookinger», der du kan avbestille hvis planene endrer seg.',
    myBookings: 'Mine bookinger',
    myBookingsEmpty: 'Ingen bookinger i denne nettleseren ennå.',
    cancel: 'Avbestill',
    cancelling: 'Avbestiller…',
    errors: {
      'closed-week': 'Denne uka er ikke åpen for booking.',
      'past-slot': 'Denne labtimen har allerede startet eller er passert.',
      'group-full': 'Gruppa ble full akkurat nå — velg en annen plass.',
      'already-booked':
        'Du har allerede en plass på denne laboppgaven. Avbestill den først hvis du vil bytte.',
      'unknown-lab': 'Ukjent laboppgave.',
      'invalid-input': 'Sjekk skjemaet — noen felt mangler eller er ugyldige.',
      busy: 'Bookingtjenesten er opptatt akkurat nå — prøv igjen om noen sekunder.',
      'service-unavailable': 'Bookingtjenesten er midlertidig utilgjengelig. Prøv igjen.',
      'not-found': 'Fant ikke bookingen — den kan allerede være avbestilt.',
      network: 'Fikk ikke kontakt med bookingtjenesten. Prøv igjen.',
    },
  },
};
