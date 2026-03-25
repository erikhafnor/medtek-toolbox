import { describe, it, expect } from 'vitest';
import { t, getLocaleFromUrl, getAlternateUrl } from '../../src/lib/i18n';

describe('i18n', () => {
  describe('t()', () => {
    it('returns English string for en locale', () => {
      expect(t('en', 'nav.devices')).toBe('Devices');
    });
    it('returns Norwegian string for no locale', () => {
      expect(t('no', 'nav.devices')).toBe('Utstyr');
    });
    it('returns key if translation missing', () => {
      expect(t('en', 'nonexistent.key')).toBe('nonexistent.key');
    });
  });
  describe('getLocaleFromUrl()', () => {
    it('extracts en locale', () => {
      expect(getLocaleFromUrl('/en/devices/defibrillator')).toBe('en');
    });
    it('extracts no locale', () => {
      expect(getLocaleFromUrl('/no/scenarios/defib')).toBe('no');
    });
  });
  describe('getAlternateUrl()', () => {
    it('switches en to no', () => {
      expect(getAlternateUrl('/en/devices/defibrillator')).toBe('/no/devices/defibrillator');
    });
    it('switches no to en', () => {
      expect(getAlternateUrl('/no/scenarios/defib')).toBe('/en/scenarios/defib');
    });
  });
});
