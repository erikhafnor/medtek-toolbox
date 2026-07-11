// Lab catalog derived from the `labs` content collection. English entries are
// canonical (device requirements come from their equipment lists — model
// numbers are language-neutral); titles fall back per locale by shared slug.

import { getCollection } from 'astro:content';
import type { Locale } from '../i18n';
import { devicesForEquipment } from './inventory';
import { parseDurationHours } from './logic';

export interface LabCatalogEntry {
  /** Slug without locale prefix, e.g. 'mte200-defibrillator'. */
  id: string;
  title: string;
  course: string;
  durationHours: number;
  equipment: string[];
  requiredDevices: string[];
}

export async function getLabCatalog(locale: Locale = 'en'): Promise<LabCatalogEntry[]> {
  const all = await getCollection('labs');
  const forLocale = new Map(
    all
      .filter((e) => e.id.startsWith(`${locale}/`))
      .map((e) => [e.id.replace(`${locale}/`, ''), e])
  );

  return all
    .filter((e) => e.id.startsWith('en/'))
    .map((en) => {
      const slug = en.id.replace('en/', '');
      const localized = forLocale.get(slug) ?? en;
      return {
        id: slug,
        title: localized.data.title,
        course: en.data.course,
        durationHours: parseDurationHours(en.data.duration),
        equipment: localized.data.equipment,
        requiredDevices: devicesForEquipment(en.data.equipment),
      };
    })
    .sort((a, b) => a.id.localeCompare(b.id));
}

export function requiredDevicesByLab(catalog: LabCatalogEntry[]): Record<string, string[]> {
  return Object.fromEntries(catalog.map((lab) => [lab.id, lab.requiredDevices]));
}
