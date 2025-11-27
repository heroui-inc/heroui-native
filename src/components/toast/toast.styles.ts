import { StyleSheet } from 'react-native';
import { tv } from 'tailwind-variants';
import { combineStyles } from '../../helpers/theme/utils/combine-styles';

/**
 * Toast root styles with container and overlay slots
 */
const root = tv({
  slots: {
    container:
      'rounded-3xl px-3 py-4 bg-surface border border-muted/10 shadow-2xl shadow-black/5 overflow-hidden',
    overlay: 'absolute -top-1 left-0 right-0 -bottom-1 bg-surface rounded-3xl',
  },
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

/**
 * Export slot types for type-safe classNames props
 */
export type ToastRootSlots = keyof ReturnType<typeof root>;

export const styleSheet = StyleSheet.create({
  root: {
    borderCurve: 'continuous',
  },
});

export default toastStyles;
