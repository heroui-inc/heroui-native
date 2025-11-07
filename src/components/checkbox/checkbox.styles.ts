import { StyleSheet } from 'react-native';
import { tv } from 'tailwind-variants';
import { combineStyles } from '../../helpers/theme/utils/combine-styles';

const root = tv({
  base: 'size-6 rounded-lg overflow-hidden',
  variants: {
    isDisabled: {
      true: 'opacity-disabled pointer-events-none',
    },
  },
  defaultVariants: {
    isDisabled: false,
  },
});

const indicator = tv({
  base: 'absolute inset-0 items-center justify-center',
  variants: {
    isSelected: {
      true: 'bg-accent border-accent',
      false: 'bg-background-secondary border-border',
    },
    isInvalid: {
      true: 'bg-transparent border-danger',
      false: '',
    },
  },
  compoundVariants: [
    {
      isInvalid: true,
      isSelected: true,
      className: 'bg-danger border-danger',
    },
  ],
  defaultVariants: {
    isSelected: false,
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
