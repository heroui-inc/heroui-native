import { forwardRef } from 'react';
import { View } from 'react-native';
import { DISPLAY_NAME } from './separator.constants';
import { separatorClassNames } from './separator.styles';
import type { SeparatorProps } from './separator.types';

// --------------------------------------------------

const SeparatorRoot = forwardRef<View, SeparatorProps>((props, ref) => {
  const {
    variant = 'thin',
    orientation = 'horizontal',
    thickness,
    className,
    style,
    ...restProps
  } = props;

  const rootClassName = separatorClassNames.root({
    variant,
    orientation,
    className,
  });

  /**
   * Custom thickness handling: when thickness prop is provided,
   * override the variant-based thickness with inline styles
   */
  const customThicknessStyle =
    thickness !== undefined
      ? orientation === 'horizontal'
        ? { height: thickness }
        : { width: thickness }
      : undefined;

  return (
    <View
      ref={ref}
      className={rootClassName}
      style={customThicknessStyle ? [customThicknessStyle, style] : style}
      {...restProps}
    />
  );
});

// --------------------------------------------------

SeparatorRoot.displayName = DISPLAY_NAME.ROOT;

/**
 * Separator component for visual separation
 *
 * @component Separator - A simple line to separate content visually.
 * Supports horizontal and vertical orientations with thin and thick variants.
 * Uses hairline width utility classes for the thin variant by default.
 * Custom thickness can be provided via the thickness prop to override variant-based sizing.
 *
 * @see Full documentation: https://heroui.com/docs/native/components/separator
 */
const Separator = SeparatorRoot;

export default Separator;
