import { StyleSheet } from 'react-native';
import { tv } from 'tailwind-variants';
import { combineStyles } from '../../helpers/theme/utils/combine-styles';

/**
 * Avatar root styles
 */
const avatarRoot = tv({
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
    color: 'default',
  },
});

/**
 * Avatar image styles
 */
const avatarImage = tv({
  base: 'h-full w-full',
});

/**
 * Avatar fallback styles with slots
 */
const avatarFallback = tv({
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

/**
 * Native styles for border curves
 */
export const styleSheet = StyleSheet.create({
  borderCurve: {
    borderCurve: 'continuous',
  },
});

/**
 * Combined avatar styles
 */
const avatarStyles = combineStyles({
  root: avatarRoot,
  image: avatarImage,
  fallback: avatarFallback,
});

/**
 * Export slot types for type-safe classNames props
 */
export type AvatarFallbackSlots = keyof ReturnType<typeof avatarFallback>;

export default avatarStyles;
