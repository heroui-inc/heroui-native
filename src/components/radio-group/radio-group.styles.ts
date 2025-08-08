import { tv } from 'tailwind-variants';
import { combineStyles } from '../../theme/utils';

const root = tv({
  base: 'gap-1.5',
  variants: {
    orientation: {
      horizontal: 'flex-row flex-wrap gap-x-6 gap-y-2',
      vertical: 'flex-col',
    },
  },
});

const errorMessage = tv({
  base: '',
  variants: {
    orientation: {
      horizontal: 'w-full',
      vertical: '',
    },
  },
});

const radioGroupStyles = combineStyles({
  root,
  errorMessage,
});

export default radioGroupStyles;
