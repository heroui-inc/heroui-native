import { StyleSheet } from 'react-native';
import { tv } from 'tailwind-variants';
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
  base: 'flex-row items-center justify-center border-0',
  variants: {
    variant: {
      primary: 'bg-accent',
      secondary: 'bg-default',
      tertiary: 'bg-default',
      outline: 'bg-transparent border border-border',
      ghost: 'bg-transparent',
      danger: 'bg-danger',
      ['danger-soft']: 'bg-danger-soft border-0',
    },
    size: {
      sm: 'h-[36px] px-3.5 gap-1.5 rounded-3xl',
      md: 'h-[48px] px-4 gap-2 rounded-3xl',
      lg: 'h-[56px] px-5 gap-2.5 rounded-4xl',
    },
    isIconOnly: {
      true: 'p-0 aspect-square',
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
  base: 'font-medium',
  variants: {
    variant: {
      primary: 'text-accent-foreground',
      secondary: 'text-accent-soft-foreground',
      tertiary: 'text-default-foreground',
      outline: 'text-default-foreground',
      ghost: 'text-default-foreground',
      danger: 'text-danger-foreground',
      ['danger-soft']: 'text-danger',
    },
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
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
