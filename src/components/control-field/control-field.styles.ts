import { tv } from 'tailwind-variants';
import { combineStyles } from '../../helpers/internal/utils';

const root = tv({
  base: 'flex-row items-center gap-3',
});

const indicator = tv({
  base: '',
});

const controlFieldStyles = combineStyles({
  root,
  indicator,
});

export default controlFieldStyles;
