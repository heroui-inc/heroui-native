import { StyleSheet } from 'react-native';
import { tv } from 'tailwind-variants';
import { combineStyles } from '../../helpers/internal/utils';

const portal = tv({
  base: 'absolute inset-0',
});

/**
 * Tooltip content style definition
 *
 * @note ANIMATED PROPERTIES (cannot be set via className):
 * The following properties are animated and cannot be overridden using Tailwind classes:
 * - `opacity` - Animated for content show/hide transitions
 * - `transform` (specifically `scale`, `translateX`, `translateY`) - Animated for show/hide transitions
 *
 * To customize these properties, use the `animation` prop on `Tooltip.Content`:
 * ```tsx
 * <Tooltip.Content
 *   animation={{
 *     entering: myCustomEnteringAnimation,
 *     exiting: myCustomExitingAnimation,
 *   }}
 * />
 * ```
 */
const content = tv({
  base: 'absolute bg-overlay px-2.5 py-1.5 rounded-xl shadow-overlay',
});

const text = tv({
  base: 'text-sm text-foreground',
});

const arrow = tv({
  base: 'absolute',
});

export const tooltipClassNames = combineStyles({
  portal,
  content,
  text,
  arrow,
});

export const tooltipStyleSheet = StyleSheet.create({
  contentContainer: {
    borderCurve: 'continuous',
  },
});
