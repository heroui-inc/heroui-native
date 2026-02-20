import { StyleSheet } from 'react-native';
import { tv } from 'tailwind-variants';
import { combineStyles } from '../../helpers/internal/utils';

const root = tv({
  base: 'gap-2',
  variants: {
    orientation: {
      horizontal: 'w-full',
      vertical: 'h-full items-center',
    },
    isDisabled: {
      true: 'opacity-disabled',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
    isDisabled: false,
  },
});

const output = tv({
  base: 'text-sm text-muted font-medium',
});

const track = tv({
  base: 'rounded-full bg-default',
  variants: {
    orientation: {
      horizontal: 'w-full h-5 justify-center',
      vertical: 'h-full w-5 items-center',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
});

const fill = tv({
  base: 'absolute rounded-full bg-accent',
  variants: {
    orientation: {
      horizontal: 'inset-y-0',
      vertical: 'inset-x-0',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
});

const thumb = tv({
  base: 'absolute w-7 h-5 bg-accent-foreground border-2 border-accent rounded-2xl shadow-field',
});

const sliderClassNames = combineStyles({
  root,
  output,
  track,
  fill,
  thumb,
});

export const styleSheet = StyleSheet.create({
  borderCurve: {
    borderCurve: 'continuous',
  },
});

export { sliderClassNames };
export default sliderClassNames;
