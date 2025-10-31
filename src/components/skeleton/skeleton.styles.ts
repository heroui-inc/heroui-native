import { StyleSheet } from 'react-native';
import { tv } from 'tailwind-variants';
import { combineStyles } from '../../helpers/theme/utils/combine-styles';

/**
 * Main skeleton component styles
 */
const skeleton = tv({
  base: 'bg-muted/30 overflow-hidden',
});

/**
 * Gradient wrapper styles for shimmer effect
 */
const gradientWrapper = tv({
  base: 'absolute inset-0',
});

/**
 * Native styles for border curve
 */
export const nativeStyles = StyleSheet.create({
  borderCurve: {
    borderCurve: 'continuous',
  },
});

/**
 * Combined skeleton styles
 */
const styleSheet = combineStyles({
  skeleton,
  gradientWrapper,
});

export default styleSheet;
