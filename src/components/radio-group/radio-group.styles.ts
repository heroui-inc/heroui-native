import { StyleSheet } from 'react-native';
import { tv } from 'tailwind-variants';
import { combineStyles } from '../../helpers/internal/utils';

const root = tv({
  base: 'gap-3',
});

const item = tv({
  base: 'flex-row items-center justify-between gap-3',
  variants: {
    isDisabled: {
      true: 'opacity-disabled pointer-events-none',
    },
  },
  defaultVariants: {
    isDisabled: false,
  },
});

const itemIndicator = tv({
  base: 'size-6 rounded-full border border-field-border items-center justify-center overflow-hidden',
  variants: {
    variant: {
      primary: 'bg-field shadow-field',
      secondary: 'bg-default',
    },
    isSelected: {
      true: 'bg-accent',
      false: '',
    },
    isInvalid: {
      true: 'bg-transparent border-danger',
      false: '',
    },
  },
  compoundVariants: [
    {
      isInvalid: true,
      isSelected: true,
      className: 'bg-danger border-danger',
    },
  ],
  defaultVariants: {
    variant: 'primary',
    isSelected: false,
    isInvalid: false,
  },
});

/**
 * Indicator thumb style definition
 *
 * @note ANIMATED PROPERTIES (cannot be set via className):
 * The following property is animated and cannot be overridden using Tailwind classes:
 * - `transform` (specifically `scale`) - Animated for selection transitions (unselected: 1.5, selected: 1)
 *
 * To customize this property, use the `animation` prop on `RadioGroup.IndicatorThumb`:
 * ```tsx
 * <RadioGroup.IndicatorThumb
 *   animation={{
 *     scale: { value: [1.5, 1], timingConfig: { duration: 300, easing: Easing.out(Easing.ease) } }
 *   }}
 * />
 * ```
 *
 * To completely disable animated styles and apply your own via className or style prop,
 * set `isAnimatedStyleActive={false}` on `RadioGroup.IndicatorThumb`.
 */
const itemIndicatorThumb = tv({
  base: 'size-2.5 dark:size-3 rounded-full bg-accent-foreground',
  variants: {
    isSelected: {
      true: 'opacity-100',
      false: 'opacity-0',
    },
  },
});

const errorMessage = tv({
  base: '',
});

const radioGroupStyles = combineStyles({
  root,
  errorMessage,
  item,
  itemIndicator,
  itemIndicatorThumb,
});

export const styleSheet = StyleSheet.create({
  borderCurve: {
    borderCurve: 'continuous',
  },
});

export default radioGroupStyles;
