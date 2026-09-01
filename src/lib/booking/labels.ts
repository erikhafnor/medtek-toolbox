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
  session: string;
  day: string;
  seatsHeld: string;
  privacy: string;
  findMine: string;
  findMineHint: string;
  findMineAction: string;
  findMineSearching: string;
  findMineNone: string;
  findMineFound: string;
  findMineCancelHint: string;
  runsOnDays: string;
  electiveNote: string;
  spareDayNote: string;
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
      'Take a seat on a lab session. You can see who else is signed up, and put your session in your calendar once you have booked.',
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
    weeklyPlanHint: 'Which labs are set up each week.',
    session: 'Session',
    day: 'Day',
    seatsHeld: '{taken} of {total} seats taken',
    privacy:
      'Your name and email are stored only to run the lab sign-up, and are visible to course staff. Other students see your first name on the schedule. Bookings are deleted {retention} days after the last lab day; a record that you completed a lab is kept for grading.',
    findMine: 'Booked on another device?',
    findMineHint:
      'Your bookings are remembered in the browser you booked from. Enter your email to see them anywhere.',
    findMineAction: 'Find my bookings',
    findMineSearching: 'Searching…',
    findMineNone: 'No bookings found for that email.',
    findMineFound: 'Found {count} booking(s) for that email:',
    findMineCancelHint:
      'To cancel one, use the browser you booked from — or ask course staff.',
    runsOnDays: 'This lab runs on {count} lab days.',
    electiveNote: 'Elective — choose {picks} of these {total} labs.',
    spareDayNote: 'Everyone takes this lab. The last day is spare, for catching up.',
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
      'Ta en plass på en labøkt. Du ser hvem andre som er påmeldt, og kan legge økta i kalenderen din når du har booket.',
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
    weeklyPlanHint: 'Hvilke labber som er satt opp hver uke.',
    session: 'Økt',
    day: 'Dag',
    seatsHeld: '{taken} av {total} plasser tatt',
    privacy:
      'Navn og e-post lagres kun for å drifte labpåmeldingen, og er synlig for emneansvarlig. Medstudenter ser fornavnet ditt i timeplanen. Bookinger slettes {retention} dager etter siste labdag; registrering av at du har fullført en lab beholdes for karaktersetting.',
    findMine: 'Booket på en annen enhet?',
    findMineHint:
      'Bookingene dine huskes i nettleseren du booket fra. Skriv inn e-posten din for å se dem hvor som helst.',
    findMineAction: 'Finn bookingene mine',
    findMineSearching: 'Søker…',
    findMineNone: 'Fant ingen bookinger på den e-posten.',
    findMineFound: 'Fant {count} booking(er) på den e-posten:',
    findMineCancelHint:
      'For å avbestille, bruk nettleseren du booket fra — eller kontakt emneansvarlig.',
    runsOnDays: 'Denne labben går {count} labdager.',
    electiveNote: 'Valgfri — velg {picks} av disse {total} labbene.',
    spareDayNote: 'Alle tar denne labben. Siste dag er en reservedag for oppsamling.',
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
