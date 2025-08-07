import { combineStyles } from '@/theme/utils';
import { tv } from 'tailwind-variants';

const root = tv({
  base: 'relative border items-center justify-center overflow-hidden w-6 h-6 rounded-[6px]',
  variants: {
    isDisabled: {
      true: 'opacity-disabled pointer-events-none',
    },
    isReadOnly: {
      true: 'pointer-events-none',
    },
  },
  defaultVariants: {
    isDisabled: false,
    isReadOnly: false,
  },
});

const background = tv({
  base: 'absolute inset-0 rounded-[5px]',
});

const indicator = tv({
  base: 'absolute inset-0 items-center justify-center',
});

const checkboxStyles = combineStyles({
  root,
  background,
  indicator,
});

export default checkboxStyles;
