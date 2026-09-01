// Catalog of the bookable labs, derived from the `labs` content collection.
// English entries are canonical (equipment lists carry the model numbers, which
// are language-neutral); titles fall back per locale by shared slug.
//
// Build-time only: the API validates lab ids against `bookingConfigFor()` in
// logic.ts, so nothing at request time depends on content collections.

import { getCollection } from 'astro:content';
import type { Locale } from '../i18n';
import { devicesForEquipment } from './inventory';
import { ALL_BOOKABLE_LABS, COURSES } from './courses';

export interface LabCatalogEntry {
  /** Slug without locale prefix, e.g. 'mte200-defibrillator'. */
  id: string;
  title: string;
  /** Compact name for the schedule grid and rotation table. */
  shortTitle: string;
  /** Course code, so the UI can group labs without a second lookup. */
  course: string;
  equipment: string[];
  /** Tracked devices the lab uses — shown to students, not a booking gate. */
  requiredDevices: string[];
  groupsPerSlot: number;
  seatsPerGroup: number;
}

/** The bookable labs, in the order course staff listed them in courses.ts. */
export async function getLabCatalog(locale: Locale = 'en'): Promise<LabCatalogEntry[]> {
  const all = await getCollection('labs');
  const bySlug = (prefix: string) =>
    new Map(
      all
        .filter((entry) => entry.id.startsWith(`${prefix}/`))
        .map((entry) => [entry.id.replace(`${prefix}/`, ''), entry])
    );
  const english = bySlug('en');
  const localized = bySlug(locale);

  return ALL_BOOKABLE_LABS.map(({ course, lab }) => {
    const canonical = english.get(lab.id);
    if (!canonical) {
      // fail the build rather than silently dropping a lab students must book
      throw new Error(
        `booking/courses.ts lists '${lab.id}', which has no entry in src/content/labs/en/`
      );
    }
    const translated = localized.get(lab.id) ?? canonical;
    return {
      id: lab.id,
      title: translated.data.title,
      shortTitle: translated.data.shortTitle ?? translated.data.title,
      course: course.id,
      equipment: translated.data.equipment,
      requiredDevices: devicesForEquipment(canonical.data.equipment),
      groupsPerSlot: lab.groupsPerSlot,
      seatsPerGroup: lab.seatsPerGroup,
    };
  });
}

/** Is this lab slug one students can book? Used to gate the lab-page button. */
export function isBookableLab(slug: string): boolean {
  return ALL_BOOKABLE_LABS.some(({ lab }) => lab.id === slug);
}

/** Course codes that have bookable labs, in configuration order. */
export function bookableCourses(): string[] {
  return COURSES.filter((course) => course.labs.length > 0).map((course) => course.id);
}
