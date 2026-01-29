import { tv } from 'tailwind-variants';
import { combineStyles } from '../../helpers/internal/utils';

const root = tv({
  base: 'h-32',
});

export const textAreaClassNames = combineStyles({
  root,
});
