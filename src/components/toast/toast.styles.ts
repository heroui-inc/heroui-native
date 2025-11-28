import { StyleSheet } from 'react-native';
import { tv } from 'tailwind-variants';
import { combineStyles } from '../../helpers/theme/utils/combine-styles';

/**
 * Toast root styles
 */
const root = tv({
  base: 'rounded-3xl bg-surface border-[16px] border-surface outline outline-muted/5 shadow-2xl shadow-black/5 overflow-hidden',
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
