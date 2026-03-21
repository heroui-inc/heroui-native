import { tv } from 'tailwind-variants';
import { combineStyles } from '../../helpers/internal/utils';

const root = tv({
  base: 'gap-1.5',
});

export const textFieldClassNames = combineStyles({
  root,
});
