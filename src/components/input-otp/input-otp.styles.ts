import { StyleSheet } from 'react-native';
import { tv } from 'tailwind-variants';
import { combineStyles } from '../../helpers/theme/utils/combine-styles';

const root = tv({
  base: 'flex-row items-center gap-2',
});

const group = tv({
  base: 'flex-row items-center gap-2',
});

const slot = tv({
  base: 'h-12 w-11 items-center justify-center rounded-[14px] border-[1.5px] border-field-border bg-field shadow-field',
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
    isPlaceholder: {
      true: 'text-muted/50',
    },
  },
  defaultVariants: {
    isPlaceholder: false,
  },
});

const slotCaret = tv({
  base: 'absolute inset-0 items-center justify-center',
});

const separator = tv({
  base: 'h-0.5 w-2 rounded-full bg-divider/50',
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
