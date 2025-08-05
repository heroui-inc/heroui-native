import { combineStyles } from '@/theme/utils';
import { tv } from 'tailwind-variants';

const root = tv({
  base: 'gap-1.5',
  variants: {
    orientation: {
      horizontal: 'flex-row flex-wrap gap-x-6 gap-y-2',
      vertical: 'flex-col',
    },
  },
});

const radioGroupStyles = combineStyles({
  root,
});

export default radioGroupStyles;
