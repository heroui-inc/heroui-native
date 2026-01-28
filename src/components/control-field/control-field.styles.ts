import { tv } from 'tailwind-variants';
import { combineStyles } from '../../helpers/internal/utils';

const root = tv({
  base: 'flex-row items-center gap-3',
});

const indicator = tv({
  base: '',
});

export const controlFieldClassNames = combineStyles({
  root,
  indicator,
});
