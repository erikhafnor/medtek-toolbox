// UI strings for the booking island, following the LabLayout convention of
// per-language label objects (the global i18n dictionary stays lean).
//
// Templates use {placeholders} filled in by the island; keep the placeholder
// names identical across languages.

import type { Locale } from '../i18n';

export interface BookingLabels {
  title: string;
  intro: string;
  course: string;
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
  opensOn: string;
  lockedNote: string;
  weeklyPlan: string;
  weeklyPlanHint: string;
  runsOnDays: string;
  busyThisWeek: string;
  room: string;
  addToCalendar: string;
  calendarFile: string;
  googleCalendar: string;
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
    title: 'Book lab time',
    intro:
      'Pick your course and lab assignment, then take a free seat. MTE200 runs Tuesdays in two slots (09:00–11:30 and 11:30–14:00); MTE210 runs Wednesdays 10:15–13:00. All lab work is in room KE E-455. You can see which seats your fellow students have taken, and add your session to your calendar afterwards.',
    course: 'Course',
    lab: 'Lab assignment',
    requires: 'Equipment',
    singleUnit: 'single unit',
    capacityNote: '{groups} {groupWord} × up to {seats} students per slot',
    groupOne: 'group',
    groupMany: 'groups',
    semester: 'Semester overview',
    semesterRange: '{first} – {last} · every {day}',
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
    opensOn: 'Opens {date}',
    lockedNote:
      'These labs open for booking on {date}, once the first three are done. You can already see when they run.',
    weeklyPlan: 'Weekly plan',
    weeklyPlanHint: 'Three labs run each lab day, each in both slots.',
    runsOnDays: 'This lab runs on {count} lab days.',
    busyThisWeek: 'You already have {lab} in this slot.',
    room: 'Room',
    addToCalendar: 'Add to calendar',
    calendarFile: 'Calendar file',
    googleCalendar: 'Google',
    yourDetails: 'Your details',
    name: 'Name',
    namePlaceholder: 'e.g. Kari Nordmann',
    email: 'Email',
    emailPlaceholder: 'you@stud.uis.no',
    detailsHint: 'Fill in your name and email to take a seat.',
    loading: 'Loading availability…',
    successTitle: 'Seat booked!',
    successBody: 'You have seat {seat} in group {group} on {date}, {time}, in {room}.',
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
      'same-slot':
        'You already have a lab session in that time slot. You cannot be in two places at once — pick another slot.',
      'unknown-lab': 'Unknown lab assignment.',
      'not-scheduled': 'This lab does not run on that day — pick one of its own lab days.',
      'opens-later': 'This lab is not open for booking yet.',
      'invalid-input': 'Please check the form — some fields are missing or invalid.',
      busy: 'The booking service is busy right now — please try again in a few seconds.',
      'service-unavailable': 'The booking service is temporarily unavailable. Please try again.',
      'not-found': 'The booking could not be found — it may already be cancelled.',
      network: 'Could not reach the booking service. Please try again.',
    },
  },
  no: {
    title: 'Book labtid',
    intro:
      'Velg emne og laboppgave, og ta en ledig plass. MTE200 går tirsdager i to økter (09:00–11:30 og 11:30–14:00); MTE210 går onsdager 10:15–13:00. All labbing er i rom KE E-455. Du ser hvilke plasser medstudentene har tatt, og kan legge økta i kalenderen din etterpå.',
    course: 'Emne',
    lab: 'Laboppgave',
    requires: 'Utstyr',
    singleUnit: 'kun én enhet',
    capacityNote: '{groups} {groupWord} × maks {seats} studenter per økt',
    groupOne: 'gruppe',
    groupMany: 'grupper',
    semester: 'Semesteroversikt',
    semesterRange: '{first} – {last} · hver {day}',
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
    opensOn: 'Åpner {date}',
    lockedNote:
      'Disse labbene åpner for booking {date}, når de tre første er unnagjort. Du ser allerede når de går.',
    weeklyPlan: 'Ukeplan',
    weeklyPlanHint: 'Tre labber går hver labdag, hver av dem i begge økter.',
    runsOnDays: 'Denne labben går {count} labdager.',
    busyThisWeek: 'Du har allerede {lab} i denne økta.',
    room: 'Rom',
    addToCalendar: 'Legg til i kalender',
    calendarFile: 'Kalenderfil',
    googleCalendar: 'Google',
    yourDetails: 'Dine opplysninger',
    name: 'Navn',
    namePlaceholder: 'f.eks. Kari Nordmann',
    email: 'E-post',
    emailPlaceholder: 'deg@stud.uis.no',
    detailsHint: 'Fyll inn navn og e-post for å ta en plass.',
    loading: 'Laster tilgjengelighet…',
    successTitle: 'Plass booket!',
    successBody: 'Du har plass {seat} i gruppe {group} {date}, kl. {time}, i {room}.',
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
      'same-slot':
        'Du har allerede en labtime i den økta. Du kan ikke være to steder samtidig — velg en annen økt.',
      'unknown-lab': 'Ukjent laboppgave.',
      'not-scheduled': 'Denne labben går ikke den dagen — velg en av labbens egne dager.',
      'opens-later': 'Denne labben er ikke åpen for booking ennå.',
      'invalid-input': 'Sjekk skjemaet — noen felt mangler eller er ugyldige.',
      busy: 'Bookingtjenesten er opptatt akkurat nå — prøv igjen om noen sekunder.',
      'service-unavailable': 'Bookingtjenesten er midlertidig utilgjengelig. Prøv igjen.',
      'not-found': 'Fant ikke bookingen — den kan allerede være avbestilt.',
      network: 'Fikk ikke kontakt med bookingtjenesten. Prøv igjen.',
    },
  },
};
