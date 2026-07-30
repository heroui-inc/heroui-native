/**
 * Single source of truth for the locales the example app can render.
 *
 * The app ships English plus Arabic and Hebrew. The two RTL locales use
 * unrelated scripts on purpose: Arabic is cursive with contextual letter forms,
 * while Hebrew is non-joining, so between them they exercise both text shaping
 * paths rather than testing the same one twice.
 *
 * Choosing a language is the only direction control in the app: the layout
 * direction is derived from the selected locale rather than being an
 * independent setting, which is how a real localized app behaves.
 */

/** Right-to-left locales offered in the settings sheet. */
export const RTL_LOCALES = ['ar', 'he'] as const;

/** A right-to-left locale supported by the app. */
export type RtlLocale = (typeof RTL_LOCALES)[number];

/**
 * Every locale offered in the settings sheet, in display order.
 *
 * Keep in sync with {@link RTL_LOCALES}: each entry here that is not the source
 * locale is expected to be listed there so its direction resolves correctly.
 */
export const APP_LOCALES = ['en', 'ar', 'he'] as const;

/** Any locale supported by the app, including the left-to-right source locale. */
export type AppLocale = (typeof APP_LOCALES)[number];

/** Locale applied on first launch. */
export const DEFAULT_LOCALE: AppLocale = 'en';

/**
 * Display names for every locale, written in the language itself.
 *
 * Endonyms are deliberately not translated: a language picker is far easier to
 * use when every option is readable to the speaker looking for it.
 */
export const APP_LOCALE_LABELS: Record<AppLocale, string> = {
  en: 'English',
  ar: 'العربية',
  he: 'עברית',
};

/**
 * Type guard narrowing an arbitrary string to a supported RTL locale.
 *
 * Doubles as the direction lookup for a locale, since a locale is right-to-left
 * exactly when it appears in {@link RTL_LOCALES}.
 *
 * @param value - Candidate locale code.
 * @returns `true` when the value is one of {@link RTL_LOCALES}.
 */
export const isRtlLocale = (value: string): value is RtlLocale => {
  return RTL_LOCALES.some((locale) => locale === value);
};

/**
 * Type guard narrowing an arbitrary string to a supported app locale.
 *
 * Used to validate the value handed back by `RadioGroup.onValueChange`, which
 * is typed as a plain `string`.
 *
 * @param value - Candidate locale code.
 * @returns `true` when the value is one of {@link APP_LOCALES}.
 */
export const isAppLocale = (value: string): value is AppLocale => {
  return APP_LOCALES.some((locale) => locale === value);
};
