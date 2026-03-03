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
  slots: {
    container: '',
    text: 'text-sm text-muted font-medium',
  },
});

const track = tv({
  base: 'rounded-xl bg-default',
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
  base: 'absolute rounded-xl bg-accent',
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
  slots: {
    thumbContainer: 'absolute p-[2px] bg-accent rounded-xl',
    thumbKnob: 'flex-1 bg-accent-foreground rounded-xl shadow-field',
  },
  variants: {
    orientation: {
      horizontal: { thumbContainer: 'w-7 h-5' },
      vertical: { thumbContainer: 'w-5 h-7' },
    },
  },
  defaultVariants: {
    orientation: 'horizontal',
  },
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

export type OutputSlots = keyof ReturnType<typeof output>;
export type ThumbSlots = keyof ReturnType<typeof thumb>;

export { sliderClassNames };
export default sliderClassNames;
