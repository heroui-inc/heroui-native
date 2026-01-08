import { StyleSheet } from 'react-native';
import { tv } from 'tailwind-variants';
import { combineStyles } from '../../helpers/theme/utils/combine-styles';

const root = tv({
  base: '',
});

const group = tv({
  base: 'flex-row items-center gap-2',
});

const slot = tv({
  base: 'h-12 w-12 rounded-xl border-[1.5px] border-field-border bg-field items-center justify-center',
  variants: {
    isActive: {
      true: 'border-accent',
    },
    isInvalid: {
      true: 'border-danger',
    },
    isDisabled: {
      true: 'opacity-disabled pointer-events-none',
    },
  },
  defaultVariants: {
    isActive: false,
    isInvalid: false,
    isDisabled: false,
  },
});

const slotText = tv({
  base: 'text-lg font-semibold text-foreground',
  variants: {
    isActive: {
      true: '',
    },
    isInvalid: {
      true: '',
    },
    isDisabled: {
      true: 'text-muted',
    },
  },
  defaultVariants: {
    isActive: false,
    isInvalid: false,
    isDisabled: false,
  },
});

const slotCaret = tv({
  base: '',
});

const separator = tv({
  base: 'h-0.5 w-6 bg-border',
});

export const styleSheet = StyleSheet.create({
  slotRoot: {
    borderCurve: 'continuous',
  },
});

const inputOTPStyles = combineStyles({
  root,
  group,
  slot,
  slotText,
  slotCaret,
  separator,
});

export default inputOTPStyles;
