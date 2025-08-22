import { StyleSheet } from 'react-native';
import { tv } from 'tailwind-variants';

const root = tv({
  base: 'items-center justify-center overflow-hidden bg-muted',
  variants: {
    size: {
      sm: 'w-8 h-8',
      md: 'w-10 h-10',
      lg: 'w-12 h-12',
      xl: 'w-16 h-16',
    },
    radius: {
      sm: 'rounded-md',
      md: 'rounded-lg',
      lg: 'rounded-xl',
      xl: 'rounded-2xl',
      full: 'rounded-full',
    },
    isDisabled: {
      true: 'opacity-disabled',
    },
    isLoading: {
      true: 'opacity-60',
    },
  },
  defaultVariants: {
    size: 'md',
    radius: 'full',
    isDisabled: false,
    isLoading: false,
  },
});

const fallback = tv({
  base: 'w-full h-full items-center justify-center bg-muted text-muted-foreground font-medium',
  variants: {
    size: {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
      xl: 'text-lg',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const image = tv({
  variants: {
    radius: {
      sm: 'rounded-md',
      md: 'rounded-lg',
      lg: 'rounded-xl',
      xl: 'rounded-2xl',
      full: 'rounded-full',
    },
  },
  defaultVariants: {
    radius: 'full',
  },
});

const text = tv({
  base: 'text-foreground',
  variants: {
    size: {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
      xl: 'text-lg',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const nativeStyles = StyleSheet.create({
  avatarRoot: {
    borderCurve: 'continuous',
  },
  avatarImage: {
    borderCurve: 'continuous',
  },
  avatarFallback: {
    borderCurve: 'continuous',
  },
  avatarGroup: {
    borderCurve: 'continuous',
  },
  avatarGroupTotal: {
    borderCurve: 'continuous',
  },
});

export default {
  root,
  fallback,
  image,
  text,
};
