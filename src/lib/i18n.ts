export type Locale = 'en' | 'no';

const translations: Record<Locale, Record<string, string>> = {
  en: {
    'site.title': 'MedTek Toolbox',
    'site.tagline': 'The clinical engineering reference platform',
    'nav.devices': 'Devices',
    'nav.scenarios': 'Scenarios',
    'nav.labs': 'Lab Assignments',
    'nav.reference': 'Quick Reference',
    'search.placeholder': 'Search devices, scenarios, standards...',
    'search.prompt': 'What are you working on?',
    'level.1': 'Level 1 — Basic',
    'level.2': 'Level 2 — Multi-system',
    'level.3': 'Level 3 — Intermittent',
    'scenario.briefing': 'Briefing',
    'scenario.hint': 'Click for hint',
    'scenario.lab_handoff': 'Hands-on: Perform this test in the lab',
    'scenario.learning': 'Key Takeaways',
    'scenario.complete': 'Scenario complete',
    'scenario.next': 'Next scenario',
    'scenario.correct': 'correct answers',
    'footer.credit': 'Built at the University of Stavanger',
    'footer.description': 'Open-source clinical engineering reference platform',
  },
  no: {
    'site.title': 'MedTek Toolbox',
    'site.tagline': 'Referanseplattformen for klinisk ingeniørarbeid',
    'nav.devices': 'Utstyr',
    'nav.scenarios': 'Scenarioer',
    'nav.labs': 'Laboppgaver',
    'nav.reference': 'Hurtigreferanse',
    'search.placeholder': 'Søk utstyr, scenarioer, standarder...',
    'search.prompt': 'Hva jobber du med?',
    'level.1': 'Nivå 1 — Grunnleggende',
    'level.2': 'Nivå 2 — Flersystem',
    'level.3': 'Nivå 3 — Intermitterende',
    'scenario.briefing': 'Situasjonsbeskrivelse',
    'scenario.hint': 'Klikk for hint',
    'scenario.lab_handoff': 'Praktisk: Utfør denne testen på lab',
    'scenario.learning': 'Viktige læringspunkter',
    'scenario.complete': 'Scenario fullført',
    'scenario.next': 'Neste scenario',
    'scenario.correct': 'riktige svar',
    'footer.credit': 'Utviklet ved Universitetet i Stavanger',
    'footer.description': 'Åpen referanseplattform for klinisk ingeniørarbeid',
  },
};

export function t(locale: Locale, key: string): string {
  return translations[locale]?.[key] ?? key;
}

export function getLocaleFromUrl(url: string): Locale {
  const segment = url.split('/').filter(Boolean)[0];
  return segment === 'no' ? 'no' : 'en';
}

export function getAlternateUrl(url: string): string {
  const locale = getLocaleFromUrl(url);
  const alternate = locale === 'en' ? 'no' : 'en';
  return url.replace(`/${locale}/`, `/${alternate}/`);
}
