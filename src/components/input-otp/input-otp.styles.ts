import { StyleSheet } from 'react-native';
import { tv } from '../../helpers/external/utils/cn';
import { combineStyles } from '../../helpers/internal/utils';

const root = tv({
  base: 'input-otp__root',
});

const group = tv({
  base: 'input-otp__group',
});

const slot = tv({
  base: 'input-otp__slot',
  variants: {
    variant: {
      primary: 'input-otp__slot--variant-primary',
      secondary: 'input-otp__slot--variant-secondary',
    },
    isActive: {
      true: 'input-otp__slot--is-active',
    },
    isInvalid: {
      true: 'input-otp__slot--is-invalid',
    },
    isDisabled: {
      true: 'input-otp__slot--is-disabled',
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
  base: 'input-otp__slot-placeholder',
});

const slotValue = tv({
  base: 'input-otp__slot-value',
});

const slotCaret = tv({
  base: 'input-otp__slot-caret',
});

const separator = tv({
  base: 'input-otp__separator',
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
