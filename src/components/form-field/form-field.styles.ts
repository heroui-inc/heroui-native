import { tv } from 'tailwind-variants';
import { combineStyles } from '../../helpers/theme/utils/combine-styles';

const root = tv({
  base: 'flex-row items-center gap-3',
  variants: {
    isDisabled: {
      true: 'opacity-disabled pointer-events-none',
    },
  },
  defaultVariants: {
    isDisabled: false,
  },
});

const title = tv({
  base: 'text-base font-medium text-foreground',
});

const description = tv({
  base: 'text-sm font-normal text-muted',
});

const indicator = tv({
  base: '',
});

const errorMessage = tv({
  base: '',
});

const formFieldStyles = combineStyles({
  root,
  title,
  description,
  indicator,
  errorMessage,
});

export default formFieldStyles;
