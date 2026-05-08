import type { TextProps as RNTextProps } from 'react-native';

/**
 * Semantic type variants for the Text component.
 *
 * Heading types (`h1`–`h6`) map to decreasing font sizes with semibold weight.
 * Body types (`body`, `body-sm`, `body-xs`) map to running text with explicit
 * line-heights. `code` maps to a chip-like monospaced style.
 */
export type TextType =
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'body'
  | 'body-sm'
  | 'body-xs'
  | 'code';

/**
 * Horizontal text alignment.
 *
 * `start` and `end` are RTL-aware (flip to right/left under RTL).
 *
 * @note `justify` is iOS-only on React Native; Android falls back to left.
 */
export type TextAlign = 'start' | 'center' | 'end' | 'justify';

/**
 * Semantic foreground color preset.
 */
export type TextColor = 'default' | 'muted';

/**
 * Font weight override, applied independently of the `type` variant.
 */
export type TextWeight = 'normal' | 'medium' | 'semibold' | 'bold';

/**
 * Props for the Text component root
 */
export interface TextRootProps extends RNTextProps {
  /**
   * Semantic type that determines typography styling (size, weight, line-height).
   * @default 'body'
   */
  type?: TextType;
  /**
   * Horizontal alignment. RTL-aware for `start` and `end`.
   * @default 'start'
   */
  align?: TextAlign;
  /**
   * Semantic foreground color preset.
   * @default 'default'
   */
  color?: TextColor;
  /**
   * Font weight override. When set, overrides the weight implied by `type`.
   */
  weight?: TextWeight;
  /**
   * Truncates the text to a single line with an ellipsis.
   *
   * @default false
   */
  truncate?: boolean;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Content to render
   */
  children?: React.ReactNode;
}

/**
 * Props for Text.Heading sub-component
 */
export interface TextHeadingProps extends Omit<TextRootProps, 'type'> {
  /**
   * Heading level, restricted to heading types
   * @default 'h1'
   */
  type?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

/**
 * Props for Text.Paragraph sub-component
 */
export interface TextParagraphProps extends Omit<TextRootProps, 'type'> {
  /**
   * Paragraph type, restricted to body types
   * @default 'body'
   */
  type?: 'body' | 'body-sm' | 'body-xs';
}

/**
 * Props for Text.Code sub-component
 */
export interface TextCodeProps extends Omit<TextRootProps, 'type'> {}
