import type { Messages } from '@lingui/core';
import { i18n } from '@lingui/core';
import { messages as arMessages } from '../locales/ar/messages';
import { messages as enMessages } from '../locales/en/messages';
import { messages as heMessages } from '../locales/he/messages';
import { DEFAULT_LOCALE, type AppLocale } from './locales';

/**
 * Compiled catalogs, imported statically.
 *
 * Metro cannot resolve dynamic `import()` of locale files at runtime, and the
 * example app already pins a custom Metro transformer for Uniwind, so the
 * `@lingui/metro-transformer` (which would allow importing `.po` directly) is
 * deliberately not used. Catalogs are compiled ahead of time with
 * `yarn i18n:compile` and committed.
 */
const CATALOGS: Record<AppLocale, Messages> = {
  en: enMessages,
  ar: arMessages,
  he: heMessages,
};

/**
 * Loads and activates a locale on the shared Lingui instance.
 *
 * @param locale - Locale to activate.
 */
export const activateLocale = (locale: AppLocale): void => {
  i18n.loadAndActivate({ locale, messages: CATALOGS[locale] });
};

// Activate the source locale at module scope so the very first render already
// has a populated catalog. Without this, `I18nProvider` throws because the
// active locale is undefined.
activateLocale(DEFAULT_LOCALE);

export { i18n };
