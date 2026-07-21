import { StyleSheet } from 'react-native';
import { tv } from '../../helpers/external/utils/cn';
import { combineStyles } from '../../helpers/internal/utils';

/**
 * @note Platform/state-prefixed Tailwind utilities (`ios:`, `android:`, `focus:`,
 * `disabled:`) stay here because the uniwind CSS parser does not support them
 * inside custom CSS classes. All plain styles live in `styles/components/input.css`.
 */
const input = tv({
  base: 'input__input ios:outline-2 ios:outline-transparent ios:focus:outline-accent android:border-[1.5px] android:border-transparent android:focus:border-accent',
  variants: {
    variant: {
      primary:
        'input__input--variant-primary ios:shadow-field android:shadow-sm',
      secondary: 'input__input--variant-secondary',
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
