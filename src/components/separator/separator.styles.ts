import { tv } from 'tailwind-variants';
import { combineStyles } from '../../helpers/internal/utils';

const root = tv({
  base: 'bg-separator',
  variants: {
    variant: {
      thin: '',
      thick: '',
    },
    orientation: {
      horizontal: '',
      vertical: 'h-full',
    },
  },
  compoundVariants: [
    // Thin variant - horizontal orientation
    {
      variant: 'thin',
      orientation: 'horizontal',
      className: 'h-hairline',
    },
    // Thin variant - vertical orientation
    {
      variant: 'thin',
      orientation: 'vertical',
      className: 'w-hairline',
    },
    // Thick variant - horizontal orientation
    {
      variant: 'thick',
      orientation: 'horizontal',
      className: `h-[6px]`,
    },
    // Thick variant - vertical orientation
    {
      variant: 'thick',
      orientation: 'vertical',
      className: `w-[6px]`,
    },
  ],
  defaultVariants: {
    variant: 'thin',
    orientation: 'horizontal',
  },
});

export const separatorClassNames = combineStyles({
  root,
});
