import { StyleSheet } from 'react-native';
import { tv } from 'tailwind-variants';
import { combineStyles } from '../../theme/helpers';

const root = tv({
  base: 'self-start flex-row items-center justify-center rounded-full py-1 gap-1 overflow-hidden',
  variants: {
    variant: {
      primary: 'border-0',
      secondary: 'border border-border bg-default',
      tertiary: 'border border-border bg-transparent',
    },
    size: {
      sm: 'px-2',
      md: 'px-3',
      lg: 'px-4',
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
    // Primary variant colors
    {
      variant: 'primary',
      color: 'accent',
      className: 'bg-accent',
    },
    {
      variant: 'primary',
      color: 'default',
      className: 'bg-default',
    },
    {
      variant: 'primary',
      color: 'success',
      className: 'bg-success',
    },
    {
      variant: 'primary',
      color: 'warning',
      className: 'bg-warning',
    },
    {
      variant: 'primary',
      color: 'danger',
      className: 'bg-danger',
    },
  ],
  defaultVariants: {
    size: 'md',
    variant: 'primary',
    color: 'accent',
  },
});

const startContent = tv({
  base: 'items-center justify-center',
});

const label = tv({
  slots: {
    container: 'items-center justify-center',
    text: 'font-medium',
  },
  variants: {
    variant: {
      primary: {
        text: '',
      },
      secondary: {
        text: '',
      },
      tertiary: {
        text: '',
      },
    },
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
      accent: {
        text: '',
      },
      default: {
        text: '',
      },
      success: {
        text: '',
      },
      warning: {
        text: '',
      },
      danger: {
        text: '',
      },
    },
  },
  compoundVariants: [
    // Primary variant text colors
    {
      variant: 'primary',
      color: 'accent',
      className: {
        text: 'text-accent-foreground',
      },
    },
    {
      variant: 'primary',
      color: 'default',
      className: {
        text: 'text-default-foreground',
      },
    },
    {
      variant: 'primary',
      color: 'success',
      className: {
        text: 'text-success-foreground',
      },
    },
    {
      variant: 'primary',
      color: 'warning',
      className: {
        text: 'text-warning-foreground',
      },
    },
    {
      variant: 'primary',
      color: 'danger',
      className: {
        text: 'text-danger-foreground',
      },
    },
    // Secondary & Tertiary variant text colors
    {
      variant: ['secondary', 'tertiary'],
      color: ['accent', 'default'],
      className: {
        text: 'text-foreground',
      },
    },
    {
      variant: ['secondary', 'tertiary'],
      color: 'success',
      className: {
        text: 'text-success',
      },
    },
    {
      variant: ['secondary', 'tertiary'],
      color: 'warning',
      className: {
        text: 'text-warning',
      },
    },
    {
      variant: ['secondary', 'tertiary'],
      color: 'danger',
      className: {
        text: 'text-danger',
      },
    },
  ],
  defaultVariants: {
    size: 'md',
    variant: 'primary',
    color: 'accent',
  },
});

const endContent = tv({
  base: 'items-center justify-center',
});

const background = tv({
  base: 'absolute inset-0 rounded-full',
});

export const nativeStyles = StyleSheet.create({
  root: {
    borderCurve: 'continuous',
  },
});

const chipStyles = combineStyles({
  root,
  startContent,
  label,
  endContent,
  background,
});

export type LabelSlots = keyof ReturnType<typeof label>;
export default chipStyles;
