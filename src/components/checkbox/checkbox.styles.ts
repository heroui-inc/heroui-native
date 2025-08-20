import { tv } from 'tailwind-variants';
import { combineStyles } from '../../providers/theme/helpers';

const root = tv({
  base: 'relative border items-center justify-center overflow-hidden w-6 h-6 rounded-[6px]',
  variants: {
    isDisabled: {
      true: 'opacity-disabled pointer-events-none',
    },
  },
  defaultVariants: {
    isDisabled: false,
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
