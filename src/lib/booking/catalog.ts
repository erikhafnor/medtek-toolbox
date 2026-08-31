// Catalog of the bookable MTE210 labs, derived from the `labs` content
// collection. English entries are canonical (equipment lists carry the model
// numbers, which are language-neutral); titles fall back per locale by shared
// slug.
//
// Build-time only: the API validates lab ids against `capacityFor()` in
// semester.ts, so nothing at request time depends on content collections.

import { getCollection } from 'astro:content';
import type { Locale } from '../i18n';
import { devicesForEquipment } from './inventory';
import { BOOKABLE_LABS } from './semester';

export interface LabCatalogEntry {
  /** Slug without locale prefix, e.g. 'mte210-electrical-safety'. */
  id: string;
  title: string;
  course: string;
  equipment: string[];
  /** Tracked devices the lab uses — shown to students, not a booking gate. */
  requiredDevices: string[];
  groupsPerWeek: number;
  seatsPerGroup: number;
}

/** The bookable labs, in the order course staff listed them in semester.ts. */
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

  return BOOKABLE_LABS.map((lab) => {
    const canonical = english.get(lab.id);
    if (!canonical) {
      // fail the build rather than silently dropping a lab students must book
      throw new Error(
        `booking/semester.ts lists '${lab.id}', which has no entry in src/content/labs/en/`
      );
    }
    const translated = localized.get(lab.id) ?? canonical;
    return {
      id: lab.id,
      title: translated.data.title,
      course: canonical.data.course,
      equipment: translated.data.equipment,
      requiredDevices: devicesForEquipment(canonical.data.equipment),
      groupsPerWeek: lab.groupsPerWeek,
      seatsPerGroup: lab.seatsPerGroup,
    };
  });
}

/** Is this lab slug one students can book? Used to gate the lab-page button. */
export function isBookableLab(slug: string): boolean {
  return BOOKABLE_LABS.some((lab) => lab.id === slug);
}
