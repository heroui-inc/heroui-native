/**
 * Intl polyfills required by `@lingui/core`.
 *
 * Hermes does not ship a complete `Intl` implementation, and Lingui relies on
 * `Intl.Locale` for locale resolution and `Intl.PluralRules` for plural
 * selection. Arabic in particular needs real plural rules (it has six plural
 * categories against English's two), so the locale data cannot be skipped.
 *
 * The `/polyfill-force` entry points install the polyfill unconditionally,
 * which avoids the slow runtime feature detection that the plain `/polyfill`
 * entry points perform on low-end devices.
 *
 * This module must be imported before any other i18n module.
 */
import '@formatjs/intl-locale/polyfill-force';

import '@formatjs/intl-pluralrules/polyfill-force';

import '@formatjs/intl-pluralrules/locale-data/ar';
import '@formatjs/intl-pluralrules/locale-data/en';
import '@formatjs/intl-pluralrules/locale-data/he';
