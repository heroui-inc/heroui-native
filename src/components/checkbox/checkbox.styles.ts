import { StyleSheet } from 'react-native';
import { tv } from 'tailwind-variants';
import { combineStyles } from '../../helpers/theme/utils/combine-styles';

const root = tv({
  base: 'size-6 border rounded-[8px] items-center justify-center overflow-hidden',
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
