import { defineConfig } from '@lingui/cli';
import { formatter } from '@lingui/format-po';

/**
 * Lingui catalog configuration for the example app.
 *
 * Showcase screens (`src/components/showcases`, `src/app/(home)/showcases`) are
 * intentionally left untranslated and pinned to LTR, because the goal of the
 * localization work is previewing *components* in RTL rather than translating
 * marketing copy and brand clones.
 *
 * Lingui is pinned to v5. The v6 CLI forwards catalog `exclude` to Node's
 * `fs.globSync` as `options.exclude`, which only accepts an array from Node
 * 22.15 onwards and throws on the runtimes this repo currently targets.
 */
export default defineConfig({
  sourceLocale: 'en',
  locales: ['en', 'ar', 'he'],
  fallbackLocales: {
    default: 'en',
  },
  format: formatter({ lineNumbers: false }),
  catalogs: [
    {
      path: '<rootDir>/src/locales/{locale}/messages',
      include: ['<rootDir>/src'],
      exclude: [
        '<rootDir>/src/components/showcases',
        '<rootDir>/src/app/(home)/showcases',
        '<rootDir>/src/locales',
      ],
    },
  ],
});
