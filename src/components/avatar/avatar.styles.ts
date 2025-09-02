import { StyleSheet } from 'react-native';
import { tv } from 'tailwind-variants';
import { combineStyles } from '../../providers/theme/helpers';

/**
 * Avatar root styles
 */
const avatarRoot = tv({
  base: 'items-center justify-center overflow-hidden rounded-full border border-border bg-default',
  variants: {
    size: {
      sm: 'h-8 w-8',
      md: 'h-10 w-10',
      lg: 'h-12 w-12',
    },
  },
  defaultVariants: {
    size: 'md',
    color: 'default',
  },
});

/**
 * Avatar image styles
 */
const avatarImage = tv({
  base: 'h-full w-full rounded-full',
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
export const avatarNativeStyles = StyleSheet.create({
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
