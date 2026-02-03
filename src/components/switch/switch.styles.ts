import { StyleSheet } from 'react-native';
import { tv } from 'tailwind-variants';
import { combineStyles } from '../../helpers/internal/utils';

/**
 * Root style definition
 *
 * @note ANIMATED PROPERTIES (cannot be set via className):
 * The following properties are animated and cannot be overridden using Tailwind classes:
 * - `backgroundColor` - Animated for selection transitions (unselected: default, selected: accent)
 * - `transform` (specifically `scale`) - Animated for press feedback transitions (unpressed: 1, pressed: 0.96)
 *
 * To customize these properties, use the `animation` prop on `Switch`:
 * ```tsx
 * <Switch
 *   animation={{
 *     backgroundColor: { value: ['#e5e5e5', '#007AFF'], timingConfig: { duration: 175 } },
 *     scale: { value: [1, 0.96], timingConfig: { duration: 150 } }
 *   }}
 * />
 * ```
 *
 * To completely disable animated styles and apply your own via className or style prop,
 * set `isAnimatedStyleActive={false}` on `Switch`.
 */
const root = tv({
  base: 'w-[48px] h-[24px] rounded-full justify-center overflow-hidden',
  variants: {
    isDisabled: {
      true: 'opacity-disabled pointer-events-none',
      false: '',
    },
  },
  defaultVariants: {
    isDisabled: false,
  },
});

/**
 * Thumb style definition
 *
 * @note ANIMATED PROPERTIES (cannot be set via className):
 * The following properties are animated and cannot be overridden using Tailwind classes:
 * - `left` - Animated for thumb position transitions (unselected: left edge offset, selected: right edge offset)
 * - `backgroundColor` - Animated for selection transitions (unselected: white, selected: accent-foreground)
 *
 * To customize these properties, use the `animation` prop on `Switch.Thumb`:
 * ```tsx
 * <Switch.Thumb
 *   animation={{
 *     left: { value: 2, springConfig: { damping: 120, stiffness: 1600, mass: 2 } },
 *     backgroundColor: { value: ['white', '#ffffff'], timingConfig: { duration: 175 } }
 *   }}
 * />
 * ```
 *
 * To completely disable animated styles and apply your own via className or style prop,
 * set `isAnimatedStyleActive={false}` on `Switch.Thumb`.
 */
const thumb = tv({
  base: 'absolute left-[2px] items-center justify-center w-[28px] h-[20px] rounded-full shadow-field overflow-hidden',
});

const startContent = tv({
  base: 'absolute left-[2px]',
});

const endContent = tv({
  base: 'absolute right-[2px]',
});

export const switchClassNames = combineStyles({
  root,
  thumb,
  startContent,
  endContent,
});

export const switchStyleSheet = StyleSheet.create({
  borderCurve: {
    borderCurve: 'continuous',
  },
});
