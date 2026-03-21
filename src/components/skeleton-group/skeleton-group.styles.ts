import { tv } from 'tailwind-variants';
import { combineStyles } from '../../helpers/internal/utils';

const root = tv({
  base: '',
});

export const skeletonGroupClassNames = combineStyles({
  root,
});
