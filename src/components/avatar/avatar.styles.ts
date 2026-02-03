import { StyleSheet } from 'react-native';
import { tv } from 'tailwind-variants';
import { combineStyles } from '../../helpers/internal/utils';

/**
 * Avatar root styles
 */
const root = tv({
  base: 'items-center justify-center overflow-hidden rounded-full',
  variants: {
    variant: {
      default: 'bg-default',
      soft: '',
    },
    size: {
      sm: 'size-10',
      md: 'size-12',
      lg: 'size-16',
    },
    color: {
      accent: '',
      default: '',
      success: '',
      warning: '',
      danger: '',
    },
  },
  compoundVariants: [
    // Soft variant colors
    {
      variant: 'soft',
      color: 'accent',
      className: 'bg-accent/15',
    },
    {
      variant: 'soft',
      color: 'default',
      className: 'bg-default',
    },
    {
      variant: 'soft',
      color: 'success',
      className: 'bg-success/15',
    },
    {
      variant: 'soft',
      color: 'warning',
      className: 'bg-warning/15',
    },
    {
      variant: 'soft',
      color: 'danger',
      className: 'bg-danger/15',
    },
  ],
  defaultVariants: {
    variant: 'default',
    size: 'md',
    color: 'accent',
  },
});

/**
 * Avatar image styles
 *
 * @note ANIMATED PROPERTIES (cannot be set via className):
 * The following property is animated and cannot be overridden using Tailwind classes:
 * - `opacity` - Animated for image loading transitions (from 0 to 1 when image loads)
 *
 * To customize this property, use the `animation` prop on `Avatar.Image`:
 * ```tsx
 * <Avatar.Image
 *   animation={{
 *     opacity: { value: [0, 1], timingConfig: { duration: 200, easing: Easing.in(Easing.ease) } }
 *   }}
 * />
 * ```
 *
 * To completely disable animated styles and apply your own via className or style prop,
 * set `isAnimatedStyleActive={false}` on `Avatar.Image`.
 */
const image = tv({
  base: 'h-full w-full',
});

/**
 * Avatar fallback styles with slots
 */
const fallback = tv({
  slots: {
    container: 'h-full w-full items-center justify-center rounded-full',
    text: 'font-medium',
  },
  variants: {
    size: {
      sm: {
        text: 'text-xs',
      },
      md: {
        text: 'text-sm',
      },
      lg: {
        text: 'text-base',
      },
    },
    color: {
      default: {
        text: 'text-default-foreground',
      },
      accent: {
        text: 'text-accent',
      },
      success: {
        text: 'text-success',
      },
      warning: {
        text: 'text-warning',
      },
      danger: {
        text: 'text-danger',
      },
    },
  },
  defaultVariants: {
    size: 'md',
    color: 'default',
  },
});

export const avatarClassNames = combineStyles({
  root,
  image,
  fallback,
});

export const avatarStyleSheet = StyleSheet.create({
  borderCurve: {
    borderCurve: 'continuous',
  },
});

/**
 * Export slot types for type-safe classNames props
 */
export type AvatarFallbackSlots = keyof ReturnType<typeof fallback>;
