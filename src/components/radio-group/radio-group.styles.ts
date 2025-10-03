import { tv } from 'tailwind-variants';
import { combineStyles } from '../../providers/theme/helpers';

const root = tv({
  base: 'gap-1.5',
  variants: {
    orientation: {
      horizontal: 'flex-row flex-wrap gap-x-6 gap-y-3',
      vertical: 'flex-col gap-y-3',
    },
  },
});

const errorMessage = tv({
  base: '',
  variants: {
    orientation: {
      horizontal: 'w-full',
      vertical: '',
    },
  },
});

const item = tv({
  base: 'flex-row items-center gap-3',
  variants: {
    isDisabled: {
      true: 'opacity-disabled pointer-events-none',
    },
  },
  defaultVariants: {
    isDisabled: false,
  },
});

const indicator = tv({
  base: 'rounded-full border items-center justify-center h-6 w-6',
});

const indicatorBackground = tv({
  base: 'absolute inset-0 rounded-full',
});

const indicatorThumb = tv({
  base: 'rounded-full h-2.5 w-2.5',
  variants: {
    isDark: {
      true: 'h-3 w-3',
      false: '',
    },
  },
});

const itemContent = tv({
  base: 'flex-shrink-0',
  variants: {
    orientation: {
      horizontal: '',
      vertical: 'flex-1',
    },
  },
});

const radioGroupStyles = combineStyles({
  root,
  errorMessage,
  item,
  indicator,
  indicatorBackground,
  indicatorThumb,
  itemContent,
});

export default radioGroupStyles;
