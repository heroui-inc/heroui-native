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
  base: 'size-6 rounded-full border items-center justify-center overflow-hidden',
  variants: {
    isSelected: {
      true: 'bg-accent border-accent',
      false: 'bg-background-secondary border-border',
    },
    isInvalid: {
      true: 'border-[1.5px] border-danger/30',
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
});

const itemIndicatorThumb = tv({
  base: 'size-2.5 dark:size-3 rounded-full bg-background',
  variants: {
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
