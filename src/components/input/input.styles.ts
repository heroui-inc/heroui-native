import { StyleSheet } from 'react-native';
import { tv } from '../../helpers/external/utils/cn';
import { combineStyles } from '../../helpers/internal/utils';

const input = tv({
  base: 'min-h-12 px-3 text-foreground font-normal rounded-field border-field-width border-field-border ios:outline-2 ios:outline-transparent ios:focus:outline-accent android:border-[1.5px] android:border-transparent android:focus:border-accent',
  variants: {
    variant: {
      primary: 'bg-field ios:shadow-field android:shadow-sm',
      secondary: 'bg-default',
    },
    isInvalid: {
      true: 'ios:outline-danger ios:focus:outline-danger android:border-danger android:focus:border-danger',
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
