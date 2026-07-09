import { StyleSheet } from 'react-native';
import { tv } from '../../helpers/external/utils/cn';
import { combineStyles } from '../../helpers/internal/utils';

const portal = tv({
  base: 'popover__portal',
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
  base: 'popover__overlay',
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
 *   presentation="popover"
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
const content = tv({
  base: 'popover__content',
});

/**
 * @note When Popover.Content uses `presentation="bottom-sheet"`, it uses `bottomSheetClassNames`
 * from `../bottom-sheet/bottom-sheet.styles` instead of `popoverClassNames.content`.
 * See `popover.tsx` PopoverContentBottomSheet component for usage.
 */

const close = tv({
  base: '',
});

const label = tv({
  base: 'popover__label',
});

const description = tv({
  base: 'popover__description',
});

const arrow = tv({
  base: 'popover__arrow',
});

export const popoverClassNames = combineStyles({
  portal,
  overlay,
  content,
  close,
  label,
  description,
  arrow,
});

export const popoverStyleSheet = StyleSheet.create({
  contentContainer: {
    borderCurve: 'continuous',
  },
});
