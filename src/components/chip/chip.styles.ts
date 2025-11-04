import { StyleSheet } from 'react-native';
import { tv } from 'tailwind-variants';
import { combineStyles } from '../../helpers/theme/utils/combine-styles';

const root = tv({
  base: 'self-start flex-row items-center justify-center rounded-full gap-1 overflow-hidden',
  variants: {
    variant: {
      primary: 'border-0',
      secondary: 'border border-border bg-default',
      tertiary: 'border border-border bg-transparent',
      soft: 'border-0',
    },
    size: {
      sm: 'px-2 h-5',
      md: 'px-3 h-6',
      lg: 'px-4 h-7',
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
    size: 'md',
    variant: 'primary',
    color: 'accent',
  },
});

const label = tv({
  base: 'font-medium',
  variants: {
    variant: {
      primary: '',
      secondary: '',
      tertiary: '',
      soft: '',
    },
    size: {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
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
    // Secondary variant text colors
    {
      variant: 'secondary',
      color: 'accent',
      className: 'text-accent',
    },
    {
      variant: 'secondary',
      color: 'default',
      className: 'text-default-foreground',
    },
    {
      variant: 'secondary',
      color: 'success',
      className: 'text-success',
    },
    {
      variant: 'secondary',
      color: 'warning',
      className: 'text-warning',
    },
    {
      variant: 'secondary',
      color: 'danger',
      className: 'text-danger',
    },
    // Tertiary variant text colors
    {
      variant: 'tertiary',
      color: 'accent',
      className: 'text-foreground',
    },
    {
      variant: 'tertiary',
      color: 'default',
      className: 'text-default-foreground',
    },
    {
      variant: 'tertiary',
      color: 'success',
      className: 'text-success',
    },
    {
      variant: 'tertiary',
      color: 'warning',
      className: 'text-warning',
    },
    {
      variant: 'tertiary',
      color: 'danger',
      className: 'text-danger',
    },
    // Soft variant text colors
    {
      variant: 'soft',
      color: 'accent',
      className: 'text-accent',
    },
    {
      variant: 'soft',
      color: 'default',
      className: 'text-default-foreground',
    },
    {
      variant: 'soft',
      color: 'success',
      className: 'text-success',
    },
    {
      variant: 'soft',
      color: 'warning',
      className: 'text-warning',
    },
    {
      variant: 'soft',
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

const chipStyles = combineStyles({
  root,
  label,
});

export const styleSheet = StyleSheet.create({
  root: {
    borderCurve: 'continuous',
  },
});

export type LabelContentSlots = keyof ReturnType<typeof label>;
export default chipStyles;
