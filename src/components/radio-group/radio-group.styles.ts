import { tv } from 'tailwind-variants';
import { combineStyles } from '../../providers/theme/helpers';

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
  base: 'rounded-full border items-center justify-center h-6 w-6',
});

const itemIndicatorBackground = tv({
  base: 'absolute inset-0 rounded-full',
});

const itemIndicatorThumb = tv({
  base: 'rounded-full h-2.5 w-2.5',
  variants: {
    isDark: {
      true: 'h-3 w-3',
      false: '',
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
  itemIndicatorBackground,
  itemIndicatorThumb,
});

export default radioGroupStyles;
