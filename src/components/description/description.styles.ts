import { tv } from '../../helpers/external/utils/cn';
import { combineStyles } from '../../helpers/internal/utils';

const root = tv({
  base: 'description__root',
  variants: {
    isInsideField: {
      true: 'description__root--is-inside-field',
    },
    isInvalid: {
      true: 'description__root--is-invalid',
    },
    isDisabled: {
      true: 'description__root--is-disabled',
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
