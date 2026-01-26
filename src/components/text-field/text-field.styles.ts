import { StyleSheet } from 'react-native';
import { tv } from 'tailwind-variants';
import { combineStyles } from '../../helpers/internal/utils';

const root = tv({
  base: 'gap-2',
});

const input = tv({
  base: 'py-3 px-3 rounded-2xl text-foreground font-normal border-2 focus:border-accent',
  variants: {
    variant: {
      primary: 'bg-field border-field shadow-field',
      secondary: 'bg-default border-default',
    },
    isInvalid: {
      true: 'border-danger focus:border-danger',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'primary',
    isInvalid: false,
  },
});

const placeholderTextColor = tv({
  base: 'accent-field-placeholder',
});

const inputSelectionColor = tv({
  base: 'accent-accent',
  variants: {
    isInvalid: {
      true: 'accent-danger',
    },
  },
});

export const styleSheet = StyleSheet.create({
  borderCurve: {
    borderCurve: 'continuous',
  },
});

const textFieldStyles = combineStyles({
  root,
  input,
  inputSelectionColor,
  placeholderTextColor,
});

export default textFieldStyles;
