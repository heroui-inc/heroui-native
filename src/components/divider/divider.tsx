import { forwardRef } from 'react';
import { View } from 'react-native';
import { DISPLAY_NAME, THICK_VARIANT_HEIGHT } from './divider.constants';
import dividerStyles, { styleSheet } from './divider.styles';
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

  const tvStyles = dividerStyles.root({
    variant,
    orientation,
    className,
  });

  const thicknessStyles = (() => {
    if (thickness !== undefined) {
      return orientation === 'horizontal'
        ? { height: thickness }
        : { width: thickness };
    }

    if (variant === 'thin') {
      return orientation === 'horizontal'
        ? styleSheet.hairlineWidth
        : styleSheet.hairlineWidthVertical;
    }

    if (variant === 'thick') {
      return orientation === 'horizontal'
        ? { height: THICK_VARIANT_HEIGHT }
        : { width: THICK_VARIANT_HEIGHT };
    }

    return {};
  })();

  return (
    <View
      ref={ref}
      className={tvStyles}
      style={[thicknessStyles, style]}
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
 * Uses StyleSheet.hairlineWidth for the thin variant by default.
 *
 * @see Full documentation: https://heroui.com/components/divider
 */
const Divider = DividerRoot;

export default Divider;
