import { tv } from 'tailwind-variants';
import { combineStyles } from '../../providers/theme/helpers';

const radioRoot = tv({
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

const indicator = tv({
  base: 'rounded-full border items-center justify-center h-6 w-6',
});

const background = tv({
  base: 'absolute inset-0 rounded-full',
});

const thumb = tv({
  base: 'rounded-full h-2.5 w-2.5',
  variants: {
    isDark: {
      true: 'h-3 w-3',
      false: '',
    },
  },
});

const content = tv({
  base: '',
  variants: {
    orientation: {
      horizontal: '',
      vertical: 'flex-1',
    },
  },
});

const label = tv({
  base: 'text-foreground font-medium text-base',
});

const description = tv({
  base: 'text-muted-foreground text-base',
});

const radioStyles = combineStyles({
  radioRoot,
  indicator,
  background,
  thumb,
  content,
  label,
  description,
});

export default radioStyles;
