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
      horizontal: 'w-full',
      vertical: 'h-full',
    },
    size: {
      sm: '',
      md: '',
      lg: '',
    },
  },
  compoundVariants: [
    { orientation: 'horizontal', size: 'sm', className: 'h-1' },
    { orientation: 'horizontal', size: 'md', className: 'h-1.5' },
    { orientation: 'horizontal', size: 'lg', className: 'h-2' },
    { orientation: 'vertical', size: 'sm', className: 'w-1' },
    { orientation: 'vertical', size: 'md', className: 'w-1.5' },
    { orientation: 'vertical', size: 'lg', className: 'w-2' },
  ],
  defaultVariants: {
    orientation: 'horizontal',
    size: 'md',
  },
});

const fill = tv({
  base: 'absolute rounded-full',
  variants: {
    color: {
      default: 'bg-foreground',
      accent: 'bg-accent',
      success: 'bg-success',
      warning: 'bg-warning',
      danger: 'bg-danger',
    },
  },
  defaultVariants: {
    color: 'accent',
  },
});

const thumb = tv({
  base: 'absolute rounded-full bg-white border-2 items-center justify-center',
  variants: {
    size: {
      sm: 'h-4 w-4',
      md: 'h-5 w-5',
      lg: 'h-6 w-6',
    },
    color: {
      default: 'border-foreground',
      accent: 'border-accent',
      success: 'border-success',
      warning: 'border-warning',
      danger: 'border-danger',
    },
  },
  defaultVariants: {
    size: 'md',
    color: 'accent',
  },
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
