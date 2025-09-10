import { tv } from 'tailwind-variants';
import { combineStyles } from '../../providers/theme/helpers';

/**
 * Main skeleton component styles
 */
const skeleton = tv({
  base: 'bg-muted overflow-hidden',
});

/**
 * Gradient wrapper styles for shimmer effect
 */
const gradientWrapper = tv({
  base: 'absolute inset-0',
});

/**
 * Combined skeleton styles
 */
const skeletonStyles = combineStyles({
  skeleton,
  gradientWrapper,
});

export default skeletonStyles;
