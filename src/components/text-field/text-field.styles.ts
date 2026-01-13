import { StyleSheet } from 'react-native';
import { tv } from 'tailwind-variants';
import { combineStyles } from '../../helpers/theme/utils/combine-styles';

const root = tv({
  base: 'gap-1',
  variants: {
    isDisabled: {
      true: 'pointer-events-none opacity-disabled',
    },
  },
});

const label = tv({
  slots: {
    text: 'mx-1 text-base text-foreground font-medium',
    asterisk: 'text-lg/6 text-danger',
  },
  variants: {
    isDisabled: {
      true: {
        text: '',
        asterisk: 'text-muted',
      },
    },
    isInvalid: {
      true: {
        text: 'text-danger',
      },
    },
  },
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

const description = tv({
  base: 'm-1 text-sm text-muted',
});

const errorMessage = tv({
  base: 'p-1',
});

export const styleSheet = StyleSheet.create({
  borderCurve: {
    borderCurve: 'continuous',
  },
});

const textFieldStyles = combineStyles({
  root,
  label,
  input,
  inputSelectionColor,
  placeholderTextColor,
  description,
  errorMessage,
});

export type LabelSlots = keyof ReturnType<typeof label>;

export default textFieldStyles;
