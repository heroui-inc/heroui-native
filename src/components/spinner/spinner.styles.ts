import { combineStyles } from '@/theme/utils';
import { tv } from 'tailwind-variants';

const root = tv({
  base: 'items-center justify-center',
  variants: {
    size: {
      sm: 'w-4 h-4',
      md: 'w-6 h-6',
      lg: 'w-8 h-8',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const indicator = tv({
  base: 'items-center justify-center w-full h-full',
});

const spinnerStyles = combineStyles({
  root,
  indicator,
});

export default spinnerStyles;
