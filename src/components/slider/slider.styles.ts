import { StyleSheet } from 'react-native';
import { tv } from 'tailwind-variants';
import { combineStyles } from '../../helpers/internal/utils';

const root = tv({
  slots: {
    container: 'gap-2',
  },
  variants: {
    orientation: {
      horizontal: {
        container: 'w-full',
      },
      vertical: {
        container: 'h-full items-center',
      },
    },
    isDisabled: {
      true: {
        container: 'opacity-disabled',
      },
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
  base: 'justify-center rounded-full bg-default overflow-visible',
  variants: {
    orientation: {
      horizontal: 'w-full h-1.5',
      vertical: 'h-full w-1.5',
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
});

const fill = tv({
  base: 'absolute rounded-full bg-accent',
});

const thumb = tv({
  base: 'absolute rounded-full bg-white border-2 border-accent items-center justify-center h-5 w-5',
});

const sliderClassNames = combineStyles({
  root,
  output,
  track,
  fill,
  thumb,
});

export type RootSlots = keyof ReturnType<typeof root>;

export const styleSheet = StyleSheet.create({
  thumb: {
    borderCurve: 'continuous',
  },
  track: {
    borderCurve: 'continuous',
  },
  fill: {
    borderCurve: 'continuous',
  },
});

export { sliderClassNames };
export default sliderClassNames;
