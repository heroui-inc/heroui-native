import { tv } from 'tailwind-variants';
import { combineStyles } from '../../theme/helpers';

const root = tv({
  base: 'gap-1.5',
  variants: {
    orientation: {
      horizontal: 'flex-row flex-wrap gap-x-6 gap-y-3',
      vertical: 'flex-col gap-y-3',
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
