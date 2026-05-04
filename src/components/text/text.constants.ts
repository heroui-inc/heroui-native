/**
 * Display names for Text components
 */
export const DISPLAY_NAME = {
  TEXT_ROOT: 'HeroUINative.Text',
  TEXT_HEADING: 'HeroUINative.Text.Heading',
  TEXT_PARAGRAPH: 'HeroUINative.Text.Paragraph',
  TEXT_CODE: 'HeroUINative.Text.Code',
  TEXT_PROSE: 'HeroUINative.Text.Prose',
} as const;

/**
 * Monospaced font family fallback for the Code sub-component.
 * Platform-specific monospace defaults are handled by RN when this value
 * is used as `fontFamily`.
 */
export const CODE_FONT_FAMILY = 'monospace';
