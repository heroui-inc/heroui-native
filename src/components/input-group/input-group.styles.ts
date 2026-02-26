import { StyleSheet } from 'react-native';
import { tv } from 'tailwind-variants';
import { combineStyles } from '../../helpers/internal/utils';

const root = tv({
  base: 'flex-row items-center gap-2 px-3 rounded-2xl border-2',
  variants: {
    variant: {
      primary: 'bg-field border-field ios:shadow-field android:shadow-sm',
      secondary: 'bg-default border-default',
    },
    isFocused: {
      true: 'border-accent',
    },
    isInvalid: {
      true: 'border-danger',
    },
    isDisabled: {
      true: 'opacity-disabled',
    },
  },
  compoundVariants: [
    { isFocused: true, isInvalid: true, class: 'border-danger' },
  ],
  defaultVariants: {
    variant: 'primary',
    isFocused: false,
    isInvalid: false,
    isDisabled: false,
  },
});

const prefix = tv({
  base: 'items-center justify-center',
});

const suffix = tv({
  base: 'items-center justify-center',
});

/**
 * @note Strips the Input component's own visual shell (border, bg, shadow,
 * rounded corners, horizontal padding) so that InputGroup root owns them.
 * @see {@link ../input/input.styles.ts} for the base Input styles being overridden.
 */
const input = tv({
  base: 'flex-1 px-0 border-0 bg-transparent rounded-none ios:shadow-none android:shadow-none',
});

export const inputGroupClassNames = combineStyles({
  root,
  prefix,
  suffix,
  input,
});

export const inputGroupStyleSheet = StyleSheet.create({
  borderCurve: {
    borderCurve: 'continuous',
  },
});
