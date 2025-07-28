import { StyleSheet } from 'react-native';
import { tv } from 'tailwind-variants';

const root = tv({
  base: 'self-start flex-row items-center justify-center rounded-full py-1 gap-1',
  variants: {
    size: {
      sm: 'px-2',
      md: 'px-3',
      lg: 'px-4',
    },
    variant: {
      primary: 'border-0',
      secondary: 'border border-border bg-default',
      tertiary: 'border border-border bg-transparent',
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
  base: 'font-medium',
  variants: {
    size: {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
    },
  },
  compoundVariants: [
    // Primary variant text colors
    {
      variant: 'primary',
      color: 'accent',
      className: 'text-accent-foreground',
    },
    {
      variant: 'primary',
      color: 'default',
      className: 'text-default-foreground',
    },
    {
      variant: 'primary',
      color: 'success',
      className: 'text-success-foreground',
    },
    {
      variant: 'primary',
      color: 'warning',
      className: 'text-warning-foreground',
    },
    {
      variant: 'primary',
      color: 'danger',
      className: 'text-danger-foreground',
    },
    // Secondary & Tertiary variant text colors
    {
      variant: ['secondary', 'tertiary'],
      color: ['accent', 'default'],
      className: 'text-foreground',
    },
    {
      variant: ['secondary', 'tertiary'],
      color: 'success',
      className: 'text-success',
    },
    {
      variant: ['secondary', 'tertiary'],
      color: 'warning',
      className: 'text-warning',
    },
    {
      variant: ['secondary', 'tertiary'],
      color: 'danger',
      className: 'text-danger',
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

export const nativeStyles = StyleSheet.create({
  root: {
    borderCurve: 'continuous',
  },
});

const chipStyles = Object.assign({
  root,
  startContent,
  label,
  endContent,
});

export default chipStyles;
