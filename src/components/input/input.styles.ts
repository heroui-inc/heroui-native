import { StyleSheet } from 'react-native';
import { tv } from '../../helpers/external/utils/cn';
import { combineStyles } from '../../helpers/internal/utils';

const input = tv({
  base: 'min-h-12 px-3 text-foreground font-normal rounded-field border-field-width border-field-border outline-2 outline-transparent focus:outline-accent',
  variants: {
    variant: {
      primary: 'bg-field ios:shadow-field android:shadow-sm',
      secondary: 'bg-default',
    },
    isInvalid: {
      true: 'outline-danger focus:outline-danger',
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
