import { StyleSheet } from 'react-native';
import { tv } from '../../helpers/external/utils/cn';
import { combineStyles } from '../../helpers/internal/utils';

const root = tv({
  base: 'flex-row items-center gap-2',
});

const group = tv({
  base: 'flex-row items-center gap-2',
});

const slot = tv({
  base: 'h-12 w-11 items-center justify-center rounded-field border-field-width border-field-border overflow-hidden',
  variants: {
    variant: {
      primary: 'bg-field shadow-field',
      secondary: 'bg-default',
    },
    isActive: {
      true: 'outline-2 outline-accent',
    },
    isInvalid: {
      true: 'outline-2 outline-danger',
    },
    isDisabled: {
      true: 'opacity-disabled pointer-events-none',
    },
  },
  defaultVariants: {
    variant: 'primary',
    isActive: false,
    isInvalid: false,
    isDisabled: false,
  },
});

const slotPlaceholder = tv({
  base: 'text-lg font-semibold text-field-placeholder/50',
});

const slotValue = tv({
  base: 'text-lg font-semibold text-foreground',
});

const slotCaret = tv({
  base: 'absolute w-0.5 rounded-full bg-field-placeholder',
});

const separator = tv({
  base: 'h-0.5 w-2 rounded-full bg-separator/50',
});

export const inputOTPClassNames = combineStyles({
  root,
  group,
  slot,
  slotPlaceholder,
  slotValue,
  slotCaret,
  separator,
});

export const inputOTPStyleSheet = StyleSheet.create({
  slotRoot: {
    borderCurve: 'continuous',
  },
});
