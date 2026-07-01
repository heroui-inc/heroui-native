import type { TextPropsIOS } from 'react-native';
import type { TextType } from './text.types';

/**
 * Display names for Text components
 */
export const DISPLAY_NAME = {
  TEXT_ROOT: 'HeroUINative.Text',
  TEXT_HEADING: 'HeroUINative.Text.Heading',
  TEXT_PARAGRAPH: 'HeroUINative.Text.Paragraph',
  TEXT_CODE: 'HeroUINative.Text.Code',
} as const;

export const DYNAMIC_TYPE_RAMP: Record<
  TextType,
  TextPropsIOS['dynamicTypeRamp']
> = {
  'h1': 'largeTitle',
  'h2': 'title1',
  'h3': 'title2',
  'h4': 'title3',
  'h5': 'headline',
  'h6': 'subheadline',
  'body': 'body',
  'body-sm': 'body',
  'body-xs': 'footnote',
  'code': 'body',
};

/**
 * Monospaced font family used by `Text.Code` on Android and web.
 *
 * iOS uses `'Menlo'` directly; the platform branch lives in
 * `styleSheet.code` in `text.styles.ts`.
 */
export const CODE_FONT_FAMILY = 'monospace';
