import { StyleSheet } from 'react-native';
import { tv } from 'tailwind-variants';

const portal = tv({
  base: 'absolute inset-0',
});

/**
 * Overlay style definition
 *
 * @note ANIMATED PROPERTIES (cannot be set via className):
 * The following property is animated and cannot be overridden using Tailwind classes:
 * - `opacity` - Animated for overlay show/hide transitions (idle: 0, open: 1, close: 0)
 *
 * To customize this property, use the `animation` prop on `Popover.Overlay`:
 * ```tsx
 * <Popover.Overlay
 *   animation={{
 *     opacity: { value: [0, 1, 0] }
 *   }}
 * />
 * ```
 *
 * To completely disable animated styles and apply your own via className or style prop,
 * set `isAnimatedStyleActive={false}` on `Popover.Overlay`.
 */
const overlay = tv({
  base: 'absolute inset-0',
});

/**
 * Popover content style definition
 *
 * @note ANIMATED PROPERTIES (cannot be set via className):
 * The following properties are animated and cannot be overridden using Tailwind classes:
 * - `opacity` - Animated for content show/hide transitions (idle: 0, open: 1, close: 0)
 * - `transform` (specifically `scale`, `translateX`, `translateY`) - Animated for content show/hide transitions (scale: idle: 0.95, open: 1, close: 0.95; translateX/translateY: based on placement)
 * - `transformOrigin` - Animated for content show/hide transitions (based on placement: 'top', 'bottom', 'left', 'right')
 *
 * To customize these properties, use the `animation` prop on `Popover.Content`:
 * ```tsx
 * <Popover.Content
 *   animation={{
 *     opacity: { value: [0, 1, 0] },
 *     scale: { value: [0.95, 1, 0.95] },
 *     translateX: { value: [4, 0, 4] },
 *     translateY: { value: [4, 0, 4] },
 *     transformOrigin: { value: 'top' }
 *   }}
 * />
 * ```
 *
 * To completely disable animated styles and apply your own via className or style prop,
 * set `isAnimatedStyleActive={false}` on `Popover.Content`.
 */
const popoverContent = tv({
  base: 'absolute bg-overlay p-3 px-4 rounded-3xl shadow-overlay',
});

const close = tv({
  base: '',
});

const label = tv({
  base: 'text-lg font-medium text-foreground',
});

const description = tv({
  base: 'text-base/snug text-muted',
});

const arrow = tv({
  base: 'absolute z-50',
});

const popoverStyles = {
  portal,
  overlay,
  popoverContent,
  close,
  label,
  description,
  arrow,
};

export const styleSheet = StyleSheet.create({
  contentContainer: {
    borderCurve: 'continuous',
  },
});

export default popoverStyles;
