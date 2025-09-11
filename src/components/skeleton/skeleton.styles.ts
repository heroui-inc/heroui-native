import { StyleSheet } from 'react-native';
import { tv } from 'tailwind-variants';
import { combineStyles } from '../../providers/theme/helpers';

/**
 * Main skeleton component styles
 */
const skeleton = tv({
  base: 'bg-muted/60 overflow-hidden',
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
const skeletonStyles = combineStyles({
  skeleton,
  gradientWrapper,
});

export default skeletonStyles;
