import { StyleSheet } from 'react-native';
import { tv } from 'tailwind-variants';
import { combineStyles } from '../../helpers/internal/utils';

/**
 * Root style definition
 *
 * @note ANIMATED PROPERTIES (cannot be set via className):
 * The following property is animated and cannot be overridden using Tailwind classes:
 * - `transform` (specifically `scale`) - Animated for press feedback transitions (unpressed: 1, pressed: 0.96)
 *
 * To customize this property, use the `animation` prop on `Checkbox`:
 * ```tsx
 * <Checkbox
 *   animation={{
 *     scale: { value: [1, 0.96], timingConfig: { duration: 150 } }
 *   }}
 * />
 * ```
 *
 * To completely disable animated styles and apply your own via className or style prop,
 * set `isAnimatedStyleActive={false}` on `Checkbox`.
 */
const root = tv({
  base: 'size-6 rounded-lg overflow-hidden',
  variants: {
    variant: {
      primary: 'bg-field shadow-field',
      secondary: 'bg-default',
    },
    isSelected: {
      true: '',
      false: '',
    },
    isDisabled: {
      true: 'disabled:opacity-disabled disabled:pointer-events-none',
      false: '',
    },
    isInvalid: {
      true: 'border border-danger',
      false: 'border-0',
    },
  },
  compoundVariants: [
    {
      isSelected: false,
      isInvalid: true,
      className: 'bg-transparent',
    },
  ],
  defaultVariants: {
    variant: 'primary',
    isSelected: false,
    isDisabled: false,
    isInvalid: false,
  },
});

/**
 * Indicator style definition
 *
 * @note ANIMATED PROPERTIES (cannot be set via className):
 * The following properties are animated and cannot be overridden using Tailwind classes:
 * - `opacity` - Animated for selection transitions (unselected: 0, selected: 1)
 * - `borderRadius` - Animated for selection transitions (unselected: 8, selected: 0)
 * - `transform` (specifically `translateX` and `scale`) - Animated for selection transitions (translateX: unselected: -4, selected: 0; scale: unselected: 0.8, selected: 1)
 *
 * To customize these properties, use the `animation` prop on `Checkbox.Indicator`:
 * ```tsx
 * <Checkbox.Indicator
 *   animation={{
 *     opacity: { value: [0, 1], timingConfig: { duration: 100 } },
 *     borderRadius: { value: [8, 0], timingConfig: { duration: 50 } },
 *     translateX: { value: [-4, 0], timingConfig: { duration: 100 } },
 *     scale: { value: [0.8, 1], timingConfig: { duration: 100 } }
 *   }}
 * />
 * ```
 *
 * To completely disable animated styles and apply your own via className or style prop,
 * set `isAnimatedStyleActive={false}` on `Checkbox.Indicator`.
 */
const indicator = tv({
  base: 'absolute inset-0 items-center justify-center',
  variants: {
    isInvalid: {
      true: 'bg-danger',
      false: 'bg-accent',
    },
  },
  defaultVariants: {
    isInvalid: false,
  },
});

export const checkboxClassNames = combineStyles({
  root,
  indicator,
});

export const checkboxStyleSheet = StyleSheet.create({
  root: {
    borderCurve: 'continuous',
  },
});
