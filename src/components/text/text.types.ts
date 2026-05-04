import type { TextProps as RNTextProps } from 'react-native';

/**
 * Semantic type variants for the Text component.
 *
 * Heading types (`h1`–`h6`) map to decreasing font sizes with bold/semibold weight.
 * Body types (`body`, `body-sm`, `body-xs`) map to regular-weight running text.
 * `code` maps to a monospaced style.
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
 * Props for the Text component root
 */
export interface TextRootProps extends RNTextProps {
  /**
   * Semantic type that determines typography styling (size, weight, line-height).
   * @default 'body'
   */
  type?: TextType;
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

/**
 * Props for Text.Prose sub-component (multi-line body text wrapper)
 */
export interface TextProseProps extends Omit<TextRootProps, 'type'> {}
