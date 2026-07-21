import { StyleSheet } from 'react-native';
import { tv } from '../../helpers/external/utils/cn';
import { combineStyles } from '../../helpers/internal/utils';

const root = tv({
  base: 'chip__root',
  variants: {
    variant: {
      primary: '',
      secondary: 'chip__root--variant-secondary',
      tertiary: 'chip__root--variant-tertiary',
      soft: '',
    },
    size: {
      sm: 'chip__root--size-sm',
      md: 'chip__root--size-md',
      lg: 'chip__root--size-lg',
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
      className: 'chip__root--variant-primary--color-accent',
    },
    {
      variant: 'primary',
      color: 'default',
      className: 'chip__root--variant-primary--color-default',
    },
    {
      variant: 'primary',
      color: 'success',
      className: 'chip__root--variant-primary--color-success',
    },
    {
      variant: 'primary',
      color: 'warning',
      className: 'chip__root--variant-primary--color-warning',
    },
    {
      variant: 'primary',
      color: 'danger',
      className: 'chip__root--variant-primary--color-danger',
    },
    // Soft variant colors
    {
      variant: 'soft',
      color: 'accent',
      className: 'chip__root--variant-soft--color-accent',
    },
    {
      variant: 'soft',
      color: 'default',
      className: 'chip__root--variant-soft--color-default',
    },
    {
      variant: 'soft',
      color: 'success',
      className: 'chip__root--variant-soft--color-success',
    },
    {
      variant: 'soft',
      color: 'warning',
      className: 'chip__root--variant-soft--color-warning',
    },
    {
      variant: 'soft',
      color: 'danger',
      className: 'chip__root--variant-soft--color-danger',
    },
  ],
  defaultVariants: {
    size: 'md',
    variant: 'primary',
    color: 'accent',
  },
});

const label = tv({
  base: 'chip__label',
  variants: {
    variant: {
      primary: '',
      secondary: '',
      tertiary: '',
      soft: '',
    },
    size: {
      sm: 'chip__label--size-sm',
      md: 'chip__label--size-md',
      lg: 'chip__label--size-lg',
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
      className: 'chip__label--variant-primary--color-accent',
    },
    {
      variant: 'primary',
      color: 'default',
      className: 'chip__label--variant-primary--color-default',
    },
    {
      variant: 'primary',
      color: 'success',
      className: 'chip__label--variant-primary--color-success',
    },
    {
      variant: 'primary',
      color: 'warning',
      className: 'chip__label--variant-primary--color-warning',
    },
    {
      variant: 'primary',
      color: 'danger',
      className: 'chip__label--variant-primary--color-danger',
    },
    // Secondary variant text colors
    {
      variant: 'secondary',
      color: 'accent',
      className: 'chip__label--variant-secondary--color-accent',
    },
    {
      variant: 'secondary',
      color: 'default',
      className: 'chip__label--variant-secondary--color-default',
    },
    {
      variant: 'secondary',
      color: 'success',
      className: 'chip__label--variant-secondary--color-success',
    },
    {
      variant: 'secondary',
      color: 'warning',
      className: 'chip__label--variant-secondary--color-warning',
    },
    {
      variant: 'secondary',
      color: 'danger',
      className: 'chip__label--variant-secondary--color-danger',
    },
    // Tertiary variant text colors
    {
      variant: 'tertiary',
      color: 'accent',
      className: 'chip__label--variant-tertiary--color-accent',
    },
    {
      variant: 'tertiary',
      color: 'default',
      className: 'chip__label--variant-tertiary--color-default',
    },
    {
      variant: 'tertiary',
      color: 'success',
      className: 'chip__label--variant-tertiary--color-success',
    },
    {
      variant: 'tertiary',
      color: 'warning',
      className: 'chip__label--variant-tertiary--color-warning',
    },
    {
      variant: 'tertiary',
      color: 'danger',
      className: 'chip__label--variant-tertiary--color-danger',
    },
    // Soft variant text colors
    {
      variant: 'soft',
      color: 'accent',
      className: 'chip__label--variant-soft--color-accent',
    },
    {
      variant: 'soft',
      color: 'default',
      className: 'chip__label--variant-soft--color-default',
    },
    {
      variant: 'soft',
      color: 'success',
      className: 'chip__label--variant-soft--color-success',
    },
    {
      variant: 'soft',
      color: 'warning',
      className: 'chip__label--variant-soft--color-warning',
    },
    {
      variant: 'soft',
      color: 'danger',
      className: 'chip__label--variant-soft--color-danger',
    },
  ],
  defaultVariants: {
    size: 'md',
    variant: 'primary',
    color: 'accent',
  },
});

export const chipClassNames = combineStyles({
  root,
  label,
});

export const chipStyleSheet = StyleSheet.create({
  root: {
    borderCurve: 'continuous',
  },
});

export type LabelContentSlots = keyof ReturnType<typeof label>;
