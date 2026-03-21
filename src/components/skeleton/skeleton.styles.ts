import { StyleSheet } from 'react-native';
import { tv } from 'tailwind-variants';
import { combineStyles } from '../../helpers/internal/utils';

/**
 * Main skeleton component styles
 *
 * @note ANIMATED PROPERTIES (cannot be set via className):
 * The following property is animated and cannot be overridden using Tailwind classes:
 * - `opacity` - Animated for pulse variant transitions (min: 0.5, max: 1)
 *
 * Note: The shimmer variant uses an internal overlay with `transform` (translateX) animation, which doesn't affect the className prop.
 *
 * To customize these properties, use the `animation` prop on `Skeleton`:
 * ```tsx
 * <Skeleton
 *   variant="pulse"
 *   animation={{
 *     pulse: { minOpacity: 0.5, maxOpacity: 1, duration: 1000, easing: Easing.inOut(Easing.ease) }
 *   }}
 * />
 * ```
 *
 * For shimmer variant:
 * ```tsx
 * <Skeleton
 *   variant="shimmer"
 *   animation={{
 *     shimmer: { duration: 1500, speed: 1, highlightColor: '#ffffff', easing: Easing.linear }
 *   }}
 * />
 * ```
 *
 * To completely disable animated styles and apply your own via className or style prop,
 * set `isAnimatedStyleActive={false}` on `Skeleton`.
 */
const root = tv({
  base: 'bg-muted/30 overflow-hidden',
});

export const skeletonClassNames = combineStyles({
  root,
});

export const skeletonStyleSheet = StyleSheet.create({
  borderCurve: {
    borderCurve: 'continuous',
  },
});
