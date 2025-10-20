import { tv } from 'tailwind-variants';
import { combineStyles } from '../../providers/theme/helpers';

const root = tv({
  base: 'flex-row items-center gap-3',
  variants: {
    orientation: {
      horizontal: 'flex-row',
      vertical: 'flex-col items-start',
    },
    alignIndicator: {
      start: 'flex-row-reverse',
      end: '',
    },
    isDisabled: {
      true: 'opacity-disabled pointer-events-none',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
    alignIndicator: 'end',
    isDisabled: false,
  },
});

const content = tv({
  base: 'flex-shrink-0',
  variants: {
    isInline: {
      true: '',
      false: 'flex-1',
    },
  },
});

const title = tv({
  base: 'text-foreground font-medium text-lg',
});

const description = tv({
  base: 'text-base font-normal text-muted',
});

const indicator = tv({
  base: '',
});

const errorMessage = tv({
  base: 'mt-1',
});

const formFieldStyles = combineStyles({
  root,
  content,
  title,
  description,
  indicator,
  errorMessage,
});

export default formFieldStyles;
