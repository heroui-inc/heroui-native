import { tv } from 'tailwind-variants';
import { combineStyles } from '../../providers/theme/helpers';

const root = tv({
  base: 'gap-3',
});

const item = tv({
  base: 'flex-row items-center justify-between gap-3',
  variants: {
    isDisabled: {
      true: 'opacity-disabled pointer-events-none',
    },
  },
  defaultVariants: {
    isDisabled: false,
  },
});

const itemIndicator = tv({
  base: 'size-6 rounded-full border items-center justify-center overflow-hidden',
  variants: {
    color: {
      default: '',
      success: '',
      warning: '',
      danger: '',
    },
    isSelected: {
      true: '',
      false: 'bg-transparent border-border',
    },
    isInvalid: {
      true: 'border-[1.5px] border-danger/30',
      false: '',
    },
  },
  compoundVariants: [
    {
      color: 'default',
      isSelected: true,
      className: 'bg-accent border-accent',
    },
    {
      color: 'success',
      isSelected: true,
      className: 'bg-success border-success',
    },
    {
      color: 'warning',
      isSelected: true,
      className: 'bg-warning border-warning',
    },
    {
      color: 'danger',
      isSelected: true,
      className: 'bg-danger border-danger',
    },
    {
      isInvalid: true,
      isSelected: true,
      className: 'bg-danger border-danger',
    },
  ],
});

const itemIndicatorThumb = tv({
  base: 'rounded-full h-2.5 w-2.5',
  variants: {
    isDark: {
      true: 'h-3 w-3',
      false: '',
    },
  },
});

const errorMessage = tv({
  base: '',
});

const radioGroupStyles = combineStyles({
  root,
  errorMessage,
  item,
  itemIndicator,
  itemIndicatorThumb,
});

export default radioGroupStyles;
