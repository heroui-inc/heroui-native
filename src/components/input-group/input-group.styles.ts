import { tv } from '../../helpers/external/utils/cn';
import { combineStyles } from '../../helpers/internal/utils';

const prefix = tv({
  base: 'input-group__prefix',
  variants: {
    isDisabled: {
      true: 'input-group__prefix--is-disabled',
    },
  },
  defaultVariants: {
    isDisabled: false,
  },
});

const suffix = tv({
  base: 'input-group__suffix',
  variants: {
    isDisabled: {
      true: 'input-group__suffix--is-disabled',
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
