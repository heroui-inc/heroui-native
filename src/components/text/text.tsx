import { forwardRef, useMemo } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { HeroText } from '../../helpers/internal/components';
import type { TextRef } from '../../helpers/internal/types';
import { CODE_FONT_FAMILY, DISPLAY_NAME } from './text.constants';
import { textClassNames } from './text.styles';
import type {
  TextCodeProps,
  TextHeadingProps,
  TextParagraphProps,
  TextProseProps,
  TextRootProps,
} from './text.types';

// --------------------------------------------------

const TextRoot = forwardRef<TextRef, TextRootProps>((props, ref) => {
  const { children, type = 'body', className, ...restProps } = props;

  const rootClassName = textClassNames.root({ type, className });

  return (
    <HeroText ref={ref} className={rootClassName} {...restProps}>
      {children}
    </HeroText>
  );
});

// --------------------------------------------------

const TextHeading = forwardRef<TextRef, TextHeadingProps>((props, ref) => {
  const { type = 'h1', accessibilityRole = 'header', ...restProps } = props;
  return (
    <TextRoot
      ref={ref}
      type={type}
      accessibilityRole={accessibilityRole}
      {...restProps}
    />
  );
});

// --------------------------------------------------

const TextParagraph = forwardRef<TextRef, TextParagraphProps>((props, ref) => {
  const { type = 'body', ...restProps } = props;
  return <TextRoot ref={ref} type={type} {...restProps} />;
});

// --------------------------------------------------

const TextCode = forwardRef<TextRef, TextCodeProps>((props, ref) => {
  const { style, ...restProps } = props;

  const mergedStyle = useMemo(
    () =>
      Array.isArray(style) ? [styles.code, ...style] : [styles.code, style],
    [style]
  );

  return <TextRoot ref={ref} type="code" style={mergedStyle} {...restProps} />;
});

// --------------------------------------------------

const TextProse = forwardRef<TextRef, TextProseProps>((props, ref) => {
  return <TextRoot ref={ref} type="body" {...props} />;
});

// --------------------------------------------------

TextRoot.displayName = DISPLAY_NAME.TEXT_ROOT;
TextHeading.displayName = DISPLAY_NAME.TEXT_HEADING;
TextParagraph.displayName = DISPLAY_NAME.TEXT_PARAGRAPH;
TextCode.displayName = DISPLAY_NAME.TEXT_CODE;
TextProse.displayName = DISPLAY_NAME.TEXT_PROSE;

/**
 * Compound Text component with semantic sub-components.
 *
 * @component Text - Generic text element with a `type` prop for semantic
 * typography variants (headings, body, code). Maps each type to native
 * typography tokens via Tailwind utility classes.
 *
 * @component Text.Heading - Convenience wrapper restricted to heading types
 * (`h1`–`h6`). Sets `accessibilityRole="header"` automatically.
 *
 * @component Text.Paragraph - Convenience wrapper restricted to body types
 * (`body`, `body-sm`, `body-xs`).
 *
 * @component Text.Code - Renders monospaced text using the `code` type and
 * applies a platform monospace font family.
 *
 * @component Text.Prose - Minimal body-text wrapper intended for longer
 * prose passages. Currently equivalent to `body` type.
 *
 * @see Full documentation: https://heroui.com/docs/native/components/text
 */
const CompoundText = Object.assign(TextRoot, {
  /** Heading text – renders h1-h6 with header accessibility role */
  Heading: TextHeading,
  /** Paragraph text – renders body / body-sm / body-xs */
  Paragraph: TextParagraph,
  /** Code text – monospaced font with code styling */
  Code: TextCode,
  /** Prose text – long-form body content */
  Prose: TextProse,
});

export default CompoundText;

// --------------------------------------------------

const styles = StyleSheet.create({
  code: {
    fontFamily: Platform.select({
      ios: 'Menlo',
      android: CODE_FONT_FAMILY,
      default: CODE_FONT_FAMILY,
    }),
  },
});
