import { tv } from 'tailwind-variants';
import { combineStyles } from '../../helpers/internal/utils';

const prefix = tv({
  base: 'absolute left-0 top-0 bottom-0 items-center justify-center z-10 px-3 gap-3',
  variants: {
    isDisabled: {
      true: 'opacity-disabled',
    },
  },
  defaultVariants: {
    isDisabled: false,
  },
});

const suffix = tv({
  base: 'absolute right-0 top-0 bottom-0 items-center justify-center z-10 px-3 gap-3',
  variants: {
    isDisabled: {
      true: 'opacity-disabled',
    },
  },
  defaultVariants: {
    isDisabled: false,
  },
});

export const inputGroupClassNames = combineStyles({
  prefix,
  suffix,
});
