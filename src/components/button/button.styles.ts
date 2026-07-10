import { StyleSheet } from 'react-native';
import { tv } from '../../helpers/external/utils/cn';
import { combineStyles } from '../../helpers/internal/utils';

/**
 * Button root style definition
 *
 * @note ANIMATED PROPERTIES (cannot be set via className):
 * The following property is animated and cannot be overridden using Tailwind classes:
 * - `transform` (specifically `scale`) — Animated for press feedback transitions
 *   (unpressed: 1, pressed: adjusted scale based on container width, default: 0.985)
 *
 * To customize this property, use the `animation` prop on `Button`:
 * ```tsx
 * <Button
 *   animation={{
 *     scale: { value: 0.985, timingConfig: { duration: 300, easing: Easing.out(Easing.ease) } }
 *   }}
 * />
 * ```
 *
 * To disable the scale animation, set `animation={{ scale: false }}` or `animation={false}`.
 */
const root = tv({
  base: 'button__root',
  variants: {
    variant: {
      primary: 'button__root--variant-primary',
      secondary: 'button__root--variant-secondary',
      tertiary: 'button__root--variant-tertiary',
      outline: 'button__root--variant-outline',
      ghost: 'button__root--variant-ghost',
      danger: 'button__root--variant-danger',
      ['danger-soft']: 'button__root--variant-danger-soft',
    },
    size: {
      sm: 'button__root--size-sm',
      md: 'button__root--size-md',
      lg: 'button__root--size-lg',
    },
    isIconOnly: {
      true: 'button__root--is-icon-only',
    },
    isDisabled: {
      true: 'disabled:opacity-disabled disabled:pointer-events-none',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
    isIconOnly: false,
    isDisabled: false,
  },
});

const label = tv({
  base: 'button__label',
  variants: {
    variant: {
      primary: 'button__label--variant-primary',
      secondary: 'button__label--variant-secondary',
      tertiary: 'button__label--variant-tertiary',
      outline: 'button__label--variant-outline',
      ghost: 'button__label--variant-ghost',
      danger: 'button__label--variant-danger',
      ['danger-soft']: 'button__label--variant-danger-soft',
    },
    size: {
      sm: 'button__label--size-sm',
      md: 'button__label--size-md',
      lg: 'button__label--size-lg',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

export const buttonClassNames = combineStyles({
  root,
  label,
});

export const buttonStyleSheet = StyleSheet.create({
  buttonRoot: {
    borderCurve: 'continuous',
  },
});
