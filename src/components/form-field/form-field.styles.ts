import { tv } from 'tailwind-variants';
import { combineStyles } from '../../theme/utils';

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
    isReadOnly: {
      true: 'pointer-events-none',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
    alignIndicator: 'end',
    isDisabled: false,
    isReadOnly: false,
  },
});

const content = tv({
  base: 'flex-1',
  variants: {
    isInline: {
      true: 'flex-0',
    },
  },
});

const label = tv({
  slots: {
    container: '',
    text: 'text-foreground font-medium text-base',
  },
});

const description = tv({
  slots: {
    container: '',
    text: 'text-muted-foreground text-sm',
  },
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
  label,
  description,
  indicator,
  errorMessage,
});

export default formFieldStyles;
