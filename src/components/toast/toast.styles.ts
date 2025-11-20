import { StyleSheet } from 'react-native';
import { tv } from 'tailwind-variants';
import { combineStyles } from '../../helpers/theme/utils/combine-styles';

const root = tv({
  base: 'absolute top-0 left-0 right-0 rounded-3xl p-4 bg-surface shadow-2xl shadow-black/10',
});

const label = tv({
  base: 'text-base font-medium',
  variants: {
    variant: {
      default: 'text-foreground',
      accent: 'text-foreground',
      success: 'text-success',
      warning: 'text-warning',
      danger: 'text-danger',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const description = tv({
  base: 'text-sm text-muted',
});

const action = tv({
  base: '',
  variants: {
    variant: {
      default: '',
      accent: '',
      success: 'bg-success',
      warning: 'bg-warning',
      danger: '',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const toastStyles = combineStyles({
  root,
  label,
  description,
  action,
});

export const styleSheet = StyleSheet.create({
  root: {
    borderCurve: 'continuous',
  },
});

export default toastStyles;
