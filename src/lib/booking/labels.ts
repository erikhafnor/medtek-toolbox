// UI strings for the booking island, following the LabLayout convention of
// per-language label objects (the global i18n dictionary stays lean).

import type { Locale } from '../i18n';

export interface BookingLabels {
  title: string;
  intro: string;
  lab: string;
  date: string;
  startTime: string;
  duration: string;
  hours: string;
  hour: string;
  requires: string;
  singleUnit: string;
  name: string;
  namePlaceholder: string;
  email: string;
  emailPlaceholder: string;
  submit: string;
  submitting: string;
  loading: string;
  gridTitle: string;
  workstation: string;
  freeStations: string;
  noStartTimes: string;
  unavailableDevice: string;
  unavailableFull: string;
  successTitle: string;
  successBody: string;
  successKeep: string;
  myBookings: string;
  myBookingsEmpty: string;
  cancel: string;
  cancelling: string;
  bookAnother: string;
  openTuesday: string;
  openThursday: string;
  errors: Record<string, string>;
}

export const BOOKING_LABELS: Record<Locale, BookingLabels> = {
  en: {
    title: 'Book a lab session',
    intro:
      'Reserve a workstation for a lab assignment. The room has 8 workstations, and sessions are checked against the device inventory — labs that need the same analyzer cannot run at the same time.',
    lab: 'Lab assignment',
    date: 'Date',
    startTime: 'Start time',
    duration: 'Duration',
    hours: 'hours',
    hour: 'hour',
    requires: 'Requires',
    singleUnit: 'single unit',
    name: 'Name (group representative)',
    namePlaceholder: 'e.g. Kari Nordmann',
    email: 'Email',
    emailPlaceholder: 'you@stud.uis.no',
    submit: 'Book session',
    submitting: 'Booking…',
    loading: 'Loading availability…',
    gridTitle: 'Room overview',
    workstation: 'Station',
    freeStations: 'Free stations at the busiest hour',
    noStartTimes: 'No available start times for this lab on this date.',
    unavailableDevice: 'In use:',
    unavailableFull: 'All workstations taken',
    successTitle: 'Session booked!',
    successBody: 'You have workstation {station} on {date}, {time}.',
    successKeep:
      'Your booking is saved in this browser under “My bookings”, where you can cancel it if plans change.',
    myBookings: 'My bookings',
    myBookingsEmpty: 'No bookings in this browser yet.',
    cancel: 'Cancel booking',
    cancelling: 'Cancelling…',
    bookAnother: 'Book another session',
    openTuesday: 'Tuesdays 09:00–16:00',
    openThursday: 'Thursdays 12:00–16:00',
    errors: {
      closed: 'The lab room is closed on that date.',
      'outside-hours': 'That time is outside the room’s opening hours.',
      'no-workstation': 'All 8 workstations are taken in that time slot.',
      'device-conflict': 'Required equipment is already booked in that time slot:',
      'invalid-input': 'Please check the form — some fields are missing or invalid.',
      'past-date': 'That date or time has already passed.',
      'unknown-lab': 'Unknown lab assignment.',
      'too-many-bookings':
        'This email already has the maximum number of upcoming bookings (6). Cancel one first.',
      busy: 'The booking service is busy right now — please try again in a few seconds.',
      'service-unavailable': 'The booking service is temporarily unavailable. Please try again.',
      'not-found': 'The booking could not be found — it may already be cancelled.',
      network: 'Could not reach the booking service. Please try again.',
    },
  },
  no: {
    title: 'Book labtid',
    intro:
      'Reserver en arbeidsstasjon for en laboppgave. Rommet har 8 arbeidsstasjoner, og hver booking sjekkes mot utstyrsbeholdningen — labber som trenger samme analysator kan ikke gå samtidig.',
    lab: 'Laboppgave',
    date: 'Dato',
    startTime: 'Starttid',
    duration: 'Varighet',
    hours: 'timer',
    hour: 'time',
    requires: 'Krever',
    singleUnit: 'kun én enhet',
    name: 'Navn (gruppekontakt)',
    namePlaceholder: 'f.eks. Kari Nordmann',
    email: 'E-post',
    emailPlaceholder: 'deg@stud.uis.no',
    submit: 'Book økt',
    submitting: 'Booker…',
    loading: 'Laster tilgjengelighet…',
    gridTitle: 'Romoversikt',
    workstation: 'Stasjon',
    freeStations: 'Ledige stasjoner i travleste time',
    noStartTimes: 'Ingen ledige starttider for denne labben på valgt dato.',
    unavailableDevice: 'I bruk:',
    unavailableFull: 'Alle arbeidsstasjoner er opptatt',
    successTitle: 'Økt booket!',
    successBody: 'Du har arbeidsstasjon {station} {date} kl. {time}.',
    successKeep:
      'Bookingen er lagret i denne nettleseren under «Mine bookinger», der du kan avbestille hvis planene endrer seg.',
    myBookings: 'Mine bookinger',
    myBookingsEmpty: 'Ingen bookinger i denne nettleseren ennå.',
    cancel: 'Avbestill',
    cancelling: 'Avbestiller…',
    bookAnother: 'Book en ny økt',
    openTuesday: 'Tirsdager 09:00–16:00',
    openThursday: 'Torsdager 12:00–16:00',
    errors: {
      closed: 'Labrommet er stengt denne datoen.',
      'outside-hours': 'Tidspunktet er utenfor rommets åpningstid.',
      'no-workstation': 'Alle 8 arbeidsstasjoner er opptatt i dette tidsrommet.',
      'device-conflict': 'Nødvendig utstyr er allerede booket i dette tidsrommet:',
      'invalid-input': 'Sjekk skjemaet — noen felt mangler eller er ugyldige.',
      'past-date': 'Datoen eller tidspunktet har allerede passert.',
      'unknown-lab': 'Ukjent laboppgave.',
      'too-many-bookings':
        'Denne e-postadressen har allerede maks antall kommende bookinger (6). Avbestill en først.',
      busy: 'Bookingtjenesten er opptatt akkurat nå — prøv igjen om noen sekunder.',
      'service-unavailable': 'Bookingtjenesten er midlertidig utilgjengelig. Prøv igjen.',
      'not-found': 'Fant ikke bookingen — den kan allerede være avbestilt.',
      network: 'Fikk ikke kontakt med bookingtjenesten. Prøv igjen.',
    },
  },
};
