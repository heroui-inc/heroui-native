import { StyleSheet } from 'react-native';
import { tv } from 'tailwind-variants';
import { combineStyles } from '../../helpers/theme/utils/combine-styles';

const root = tv({
  base: 'gap-3',
});

const item = tv({
  base: 'flex-row items-center justify-between gap-3',
  variants: {
    isDisabled: {
      true: 'opacity-disabled pointer-events-none',
    },
  },
  defaultVariants: {
    isDisabled: false,
  },
});

const itemIndicator = tv({
  base: 'size-6 rounded-full border border-field-border items-center justify-center overflow-hidden',
  variants: {
    isOnSurface: {
      true: 'bg-surface-secondary',
      false: 'bg-field',
    },
    isSelected: {
      true: 'bg-accent',
      false: '',
    },
    isInvalid: {
      true: 'bg-transparent border-danger',
      false: '',
    },
  },
  compoundVariants: [
    {
      isInvalid: true,
      isSelected: true,
      className: 'bg-danger border-danger',
    },
  ],
  defaultVariants: {
    isSelected: false,
    isInvalid: false,
  },
});

const itemIndicatorThumb = tv({
  base: 'size-2.5 dark:size-3 rounded-full',
  variants: {
    isOnSurface: {
      true: 'bg-on-surface',
      false: 'bg-field',
    },
    isSelected: {
      true: 'opacity-100',
      false: 'opacity-0',
    },
  },
});

const errorMessage = tv({
  base: '',
});

const radioGroupStyles = combineStyles({
  root,
  errorMessage,
  item,
  itemIndicator,
  itemIndicatorThumb,
});

export const styleSheet = StyleSheet.create({
  borderCurve: {
    borderCurve: 'continuous',
  },
});

export default radioGroupStyles;
