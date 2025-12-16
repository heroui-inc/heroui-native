import { forwardRef } from 'react';
import { View } from 'react-native';
import { DISPLAY_NAME } from './divider.constants';
import dividerStyles from './divider.styles';
import type { DividerProps } from './divider.types';

// --------------------------------------------------

const DividerRoot = forwardRef<View, DividerProps>((props, ref) => {
  const {
    variant = 'thin',
    orientation = 'horizontal',
    thickness,
    className,
    style,
    ...restProps
  } = props;

  const tvStyles = dividerStyles({
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
      className={tvStyles}
      style={customThicknessStyle ? [customThicknessStyle, style] : style}
      {...restProps}
    />
  );
});

// --------------------------------------------------

DividerRoot.displayName = DISPLAY_NAME.ROOT;

/**
 * Divider component for visual separation
 *
 * @component Divider - A simple line to separate content visually.
 * Supports horizontal and vertical orientations with thin and thick variants.
 * Uses hairline width utility classes for the thin variant by default.
 * Custom thickness can be provided via the thickness prop to override variant-based sizing.
 *
 * @see Full documentation: https://heroui.com/components/divider
 */
const Divider = DividerRoot;

export default Divider;
