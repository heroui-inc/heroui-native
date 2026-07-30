import { fixupConfigRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import lingui from 'eslint-plugin-lingui';
import prettier from 'eslint-plugin-prettier';
import { defineConfig } from 'eslint/config';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  {
    extends: fixupConfigRules(compat.extends('@react-native', 'prettier')),
    plugins: { prettier },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'prettier/prettier': [
        'error',
        {
          quoteProps: 'consistent',
          singleQuote: true,
          tabWidth: 2,
          trailingComma: 'es5',
          useTabs: false,
          plugins: ['prettier-plugin-organize-imports'],
        },
      ],
    },
  },
  {
    // Translation coverage guard for the example app. Showcases are
    // deliberately pinned to English, so they are excluded here in the same way
    // they are excluded from `example/lingui.config.ts`.
    files: ['example/src/**/*.{ts,tsx}'],
    ignores: [
      'example/src/components/showcases/**',
      'example/src/app/(home)/showcases/**',
      'example/src/locales/**',
      // Component API names (`Accordion`, `BottomSheet`) and route segments.
      'example/src/helpers/data/components.ts',
      // BCP 47 locale tags.
      'example/src/i18n/locales.ts',
    ],
    plugins: { lingui },
    rules: {
      'lingui/no-unlocalized-strings': [
        'error',
        {
          // Patterns are compiled without the unicode flag, so stick to ASCII
          // classes rather than `\p{...}` escapes.
          ignore: [
            // No letters at all, so never user-facing prose.
            '^[^a-zA-Z]*$',
            // Style tokens and identifiers: lowercase, no sentence punctuation,
            // and at least one `-` or `:` separator (`flex-row items-center`).
            '^(?=.*[-:])[a-z0-9][a-z0-9\\s:/\\[\\]._%-]*$',
            // Size, scale and dimension tokens (`XS`, `lg`, `10px`, `0.5x`).
            '^(xs|sm|md|lg|xl|xxl|xxxl)$',
            '^(XS|SM|MD|LG|XL|[SML]|X{2,3}L)$',
            '^\\d+px$',
            '^\\d+(\\.\\d+)?x$',
            // Uppercase codes and initials (`US`, `GB`, `EC`).
            '^[A-Z]{1,3}$',
            // Semantic version strings.
            '^v\\d+(\\.\\d+)*$',
            // Colors in every notation the demos use.
            '^#[0-9a-fA-F]{3,8}$',
            '^(rgb|rgba|hsl|hsla)\\(',
            // Edge, alignment and theme identifiers.
            '^(left|right|top|bottom|start|end|center)$',
            '^(default|lavender|mint|sky)$',
            // Keyboard shortcut hints such as `⌘ B`.
            '^[\\u2318\\u2325\\u21e7\\u2303] [A-Z]$',
            // URLs, hostnames, bundle identifiers and sample email addresses.
            '^https?://',
            '^com\\.',
            '^[a-z0-9-]+\\.[a-z]{2,}$',
            '^[^\\s@]+@[^\\s@]+$',
          ],
          // Props and object keys carrying identifiers, style tokens and
          // component API values rather than copy.
          ignoreNames: [
            { regex: { pattern: '^(data|aria)-', flags: 'i' } },
            { regex: { pattern: '^[A-Z0-9_]+$' } },
            { regex: { pattern: 'className$', flags: 'i' } },
            { regex: { pattern: 'colors?$', flags: 'i' } },
            { regex: { pattern: 'Id$' } },
            { regex: { pattern: 'style$', flags: 'i' } },
            { regex: { pattern: '^(keyboard|header|gesture)[A-Z]' } },
            { regex: { pattern: '^(light|dark)Variant$' } },
            { regex: { pattern: '^(primary|secondary|tertiary)$' } },
            'accessibilityRole',
            'align',
            'animation',
            'autoCapitalize',
            'autoComplete',
            'behavior',
            'borderCurve',
            'colorScheme',
            'contentFit',
            'currency',
            'decelerationRate',
            'direction',
            'displayName',
            'duration',
            'entering',
            'exiting',
            'fallback',
            'feedbackVariant',
            'flag',
            'fontFamily',
            'hostName',
            'href',
            'icon',
            'iconName',
            'id',
            'inputMode',
            'key',
            'mode',
            'name',
            'orientation',
            'path',
            'pathname',
            'placement',
            'pointerEvents',
            'position',
            'presentation',
            'resizeMode',
            'route',
            'selectionMode',
            'size',
            'source',
            'status',
            'testID',
            'textContentType',
            'tint',
            'type',
            'unit',
            'uri',
            'value',
            'variant',
            // react-native-svg geometry and paint attributes.
            'clipPath',
            'clipRule',
            'd',
            'fill',
            'fillRule',
            'gradientUnits',
            'mask',
            'offset',
            'points',
            'preserveAspectRatio',
            'stroke',
            'strokeLinecap',
            'strokeLinejoin',
            'transform',
            'viewBox',
          ],
          // Developer-facing APIs that take identifiers or diagnostics, not copy.
          ignoreFunctions: [
            '*.addEventListener',
            '*.endsWith',
            '*.startsWith',
            'console.*',
            'cn',
            'Error',
            'fetch',
            'Platform.select',
            'require',
            'router.*',
            'scheduleOnRN',
            'Set',
            'toast.hide',
            'Uniwind.*',
            'useState',
            'React.useState',
            'useThemeColor',
          ],
        },
      ],
    },
  },
  {
    ignores: [
      'node_modules/',
      'lib/',
      '.yarn/',
      'example/src/uniwind.d.ts',
      // Compiled Lingui catalogs, regenerated by `yarn i18n:compile`.
      'example/src/locales/',
    ],
  },
]);
