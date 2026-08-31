// The teaching lab all MTE200/MTE210 lab work runs in.
//
// Shared by the lab pages and the booking system, so a room change is a
// one-line edit here. A single lab can override it with a `room:` field in its
// frontmatter; everything else falls back to LAB_ROOM.

import type { Locale } from './i18n';

/** Room number as signposted in the building. */
export const LAB_ROOM = 'KE E-455';

/** What the room is, per locale — shown next to the number. */
export const LAB_ROOM_NAME: Record<Locale, string> = {
  en: 'Medical Technology Lab',
  no: 'Lab for medisinsk teknologi',
};

/** e.g. "KE E-455 · Lab for medisinsk teknologi". */
export function roomLabel(locale: Locale, room: string = LAB_ROOM): string {
  return `${room} · ${LAB_ROOM_NAME[locale]}`;
}
