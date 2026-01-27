import { tv } from 'tailwind-variants';
import { combineStyles } from '../../helpers/internal/utils';

const root = tv({
  base: 'gap-1.5',
});

const textFieldStyles = combineStyles({
  root,
});

export default textFieldStyles;
