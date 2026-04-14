import { StyleSheet } from 'react-native';
import { tv } from 'tailwind-variants';
import { combineStyles } from '../../helpers/internal/utils';

const input = tv({
  base: 'py-3.5 px-3 rounded-2xl text-foreground font-normal border-[1.5px] focus:border-accent',
  variants: {
    variant: {
      primary: 'bg-field border-field ios:shadow-field android:shadow-sm',
      secondary: 'bg-default border-default',
    },
    isInvalid: {
      true: 'border-danger focus:border-danger',
      false: '',
    },
    isDisabled: {
      true: 'disabled:opacity-disabled',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'primary',
    isInvalid: false,
    isDisabled: false,
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

export const inputClassNames = combineStyles({
  input,
  inputSelectionColor,
  placeholderTextColor,
});

export const inputStyleSheet = StyleSheet.create({
  borderCurve: {
    borderCurve: 'continuous',
  },
});
