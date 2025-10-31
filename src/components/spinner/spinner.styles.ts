import { tv } from 'tailwind-variants';
import { combineStyles } from '../../helpers/theme/utils/combine-styles';

const root = tv({
  base: 'items-center justify-center',
  variants: {
    size: {
      sm: 'size-4',
      md: 'size-6',
      lg: 'size-8',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const indicator = tv({
  base: 'size-full items-center justify-center',
});

const spinnerStyles = combineStyles({
  root,
  indicator,
});

export default spinnerStyles;
