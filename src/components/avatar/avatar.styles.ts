import { StyleSheet } from 'react-native';
import { tv } from '../../helpers/external/utils/cn';
import { combineStyles } from '../../helpers/internal/utils';

/**
 * Avatar root styles
 */
const root = tv({
  base: 'avatar__root',
  variants: {
    variant: {
      default: 'avatar__root--variant-default',
      soft: '',
    },
    size: {
      sm: 'avatar__root--size-sm',
      md: 'avatar__root--size-md',
      lg: 'avatar__root--size-lg',
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
      className: 'avatar__root--variant-soft--color-accent',
    },
    {
      variant: 'soft',
      color: 'default',
      className: 'avatar__root--variant-soft--color-default',
    },
    {
      variant: 'soft',
      color: 'success',
      className: 'avatar__root--variant-soft--color-success',
    },
    {
      variant: 'soft',
      color: 'warning',
      className: 'avatar__root--variant-soft--color-warning',
    },
    {
      variant: 'soft',
      color: 'danger',
      className: 'avatar__root--variant-soft--color-danger',
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
  base: 'avatar__image',
});

/**
 * Avatar fallback styles with slots
 */
const fallback = tv({
  slots: {
    container: 'avatar__fallback-container',
    text: 'avatar__fallback-text',
  },
  variants: {
    size: {
      sm: {
        text: 'avatar__fallback-text--size-sm',
      },
      md: {
        text: 'avatar__fallback-text--size-md',
      },
      lg: {
        text: 'avatar__fallback-text--size-lg',
      },
    },
    color: {
      default: {
        text: 'avatar__fallback-text--color-default',
      },
      accent: {
        text: 'avatar__fallback-text--color-accent',
      },
      success: {
        text: 'avatar__fallback-text--color-success',
      },
      warning: {
        text: 'avatar__fallback-text--color-warning',
      },
      danger: {
        text: 'avatar__fallback-text--color-danger',
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
