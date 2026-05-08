/**
 * Display names for Text components
 */
export const DISPLAY_NAME = {
  TEXT_ROOT: 'HeroUINative.Text',
  TEXT_HEADING: 'HeroUINative.Text.Heading',
  TEXT_PARAGRAPH: 'HeroUINative.Text.Paragraph',
  TEXT_CODE: 'HeroUINative.Text.Code',
} as const;

/**
 * Monospaced font family used by `Text.Code` on Android and web.
 *
 * iOS uses `'Menlo'` directly; the platform branch lives in
 * `styleSheet.code` in `text.styles.ts`.
 */
export const CODE_FONT_FAMILY = 'monospace';
