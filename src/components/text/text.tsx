import { forwardRef } from 'react';
import { HeroText } from '../../helpers/internal/components';
import type { TextRef } from '../../helpers/internal/types';
import { DISPLAY_NAME, DYNAMIC_TYPE_RAMP } from './text.constants';
import { styleSheet, textClassNames } from './text.styles';
import type {
  TextCodeProps,
  TextHeadingProps,
  TextParagraphProps,
  TextRootProps,
} from './text.types';

// --------------------------------------------------

const TextRoot = forwardRef<TextRef, TextRootProps>((props, ref) => {
  const {
    children,
    type = 'body',
    align = 'start',
    color = 'default',
    weight,
    truncate = false,
    numberOfLines,
    style,
    className,
    ...restProps
  } = props;

  const rootClassName = textClassNames.root({
    type,
    align,
    color,
    weight,
    className,
  });

  const resolvedNumberOfLines = numberOfLines ?? (truncate ? 1 : undefined);
  const resolvedStyle = type === 'code' ? [styleSheet.code, style] : style;

  return (
    <HeroText
      ref={ref}
      className={rootClassName}
      numberOfLines={resolvedNumberOfLines}
      style={resolvedStyle}
      {...restProps}
    >
      {children}
    </HeroText>
  );
});

// --------------------------------------------------

const TextHeading = forwardRef<TextRef, TextHeadingProps>((props, ref) => {
  const {
    type = 'h1',
    accessibilityRole = 'header',
    dynamicTypeRamp = DYNAMIC_TYPE_RAMP[type],
    ...restProps
  } = props;
  return (
    <TextRoot
      ref={ref}
      type={type}
      accessibilityRole={accessibilityRole}
      dynamicTypeRamp={dynamicTypeRamp}
      {...restProps}
    />
  );
});

// --------------------------------------------------

const TextParagraph = forwardRef<TextRef, TextParagraphProps>((props, ref) => {
  const {
    type = 'body',
    dynamicTypeRamp = DYNAMIC_TYPE_RAMP[type],
    ...restProps
  } = props;
  return (
    <TextRoot
      ref={ref}
      type={type}
      dynamicTypeRamp={dynamicTypeRamp}
      {...restProps}
    />
  );
});

// --------------------------------------------------

const TextCode = forwardRef<TextRef, TextCodeProps>((props, ref) => {
  return <TextRoot ref={ref} type="code" {...props} />;
});

// --------------------------------------------------

TextRoot.displayName = DISPLAY_NAME.TEXT_ROOT;
TextHeading.displayName = DISPLAY_NAME.TEXT_HEADING;
TextParagraph.displayName = DISPLAY_NAME.TEXT_PARAGRAPH;
TextCode.displayName = DISPLAY_NAME.TEXT_CODE;

/**
 * Compound Typography component with semantic sub-components.
 *
 * @component Typography - Root text element. Selects a typography preset via
 * `type` and exposes orthogonal `align`, `color`, `weight`, and `truncate`
 * props. `truncate` is implemented via React Native's `numberOfLines={1}`;
 * an explicit `numberOfLines` prop, if provided, takes precedence. When
 * `type="code"`, the platform-appropriate monospace `fontFamily` from
 * `styleSheet.code` is merged into `style` (since the project's NativeWind
 * theme has no `font-mono` token).
 *
 * @component Typography.Heading - Convenience wrapper restricted to heading
 * types (`h1`–`h6`). Sets `accessibilityRole="header"` automatically.
 *
 * @component Typography.Paragraph - Convenience wrapper restricted to body
 * types (`body`, `body-sm`, `body-xs`).
 *
 * @component Typography.Code - Chip-styled inline monospaced text. Thin
 * wrapper that forces `type="code"`; the monospace `fontFamily` is applied
 * at the root.
 *
 * @see Full documentation: https://heroui.com/docs/native/components/typography
 */
const CompoundTypography = Object.assign(TextRoot, {
  /** Heading text – renders h1-h6 with header accessibility role */
  Heading: TextHeading,
  /** Paragraph text – renders body / body-sm / body-xs */
  Paragraph: TextParagraph,
  /** Code text – chip-styled inline monospaced text */
  Code: TextCode,
});

export default CompoundTypography;
