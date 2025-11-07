import { StyleSheet } from 'react-native';
import { tv } from 'tailwind-variants';
import { combineStyles } from '../../helpers/theme/utils/combine-styles';

const root = tv({
  base: 'size-6 rounded-[8px] overflow-hidden',
  variants: {
    isOnSurface: {
      true: 'bg-surface-secondary',
      false: 'bg-field',
    },
    isSelected: {
      true: '',
      false: '',
    },
    isDisabled: {
      true: 'opacity-disabled pointer-events-none',
      false: '',
    },
    isInvalid: {
      true: '',
      false: '',
    },
  },
  compoundVariants: [
    {
      isSelected: false,
      isInvalid: true,
      className: 'bg-transparent border border-danger',
    },
  ],
  defaultVariants: {
    isSelected: false,
    isDisabled: false,
    isInvalid: false,
  },
});

const indicator = tv({
  base: 'absolute inset-0 items-center justify-center',
  variants: {
    isInvalid: {
      true: 'bg-danger',
      false: 'bg-accent',
    },
  },
  defaultVariants: {
    isInvalid: false,
  },
});

const checkboxStyles = combineStyles({
  root,
  indicator,
});

export const styleSheet = StyleSheet.create({
  root: {
    borderCurve: 'continuous',
  },
});

export default checkboxStyles;
