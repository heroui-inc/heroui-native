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
  slots: {
    container:
      'h-[48px] px-3 rounded-2xl border-[1.5px] flex-row items-center gap-3',
    input: 'flex-1 h-full text-foreground font-normal',
  },
  variants: {
    isMultiline: {
      true: {
        container: 'h-[120px]',
        input: 'py-2.5',
      },
    },
  },
});

const inputStartContent = tv({
  base: '',
});

const inputEndContent = tv({
  base: '',
});

const description = tv({
  base: 'm-1 text-sm text-muted font-normal',
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
  inputStartContent,
  inputEndContent,
  description,
  errorMessage,
});

export type LabelSlots = keyof ReturnType<typeof label>;
export type InputSlots = keyof ReturnType<typeof input>;

export default textFieldStyles;
