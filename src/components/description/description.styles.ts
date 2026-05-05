import { tv } from 'tailwind-variants';
import { combineStyles } from '../../helpers/internal/utils';

const root = tv({
  base: 'text-sm text-muted',
  variants: {
    isInvalid: {
      true: 'text-danger',
    },
    isDisabled: {
      true: 'opacity-disabled',
      false: '',
    },
  },
  defaultVariants: {
    isDisabled: false,
  },
});

export const descriptionClassNames = combineStyles({
  root,
});
