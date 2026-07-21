import { tv } from '../../helpers/external/utils/cn';
import { combineStyles } from '../../helpers/internal/utils';

const root = tv({
  base: 'separator__root',
  variants: {
    variant: {
      thin: '',
      thick: '',
    },
    orientation: {
      horizontal: '',
      vertical: 'separator__root--orientation-vertical',
    },
  },
  compoundVariants: [
    // Thin variant - horizontal orientation
    {
      variant: 'thin',
      orientation: 'horizontal',
      className: 'separator__root--variant-thin--orientation-horizontal',
    },
    // Thin variant - vertical orientation
    {
      variant: 'thin',
      orientation: 'vertical',
      className: 'separator__root--variant-thin--orientation-vertical',
    },
    // Thick variant - horizontal orientation
    {
      variant: 'thick',
      orientation: 'horizontal',
      className: 'separator__root--variant-thick--orientation-horizontal',
    },
    // Thick variant - vertical orientation
    {
      variant: 'thick',
      orientation: 'vertical',
      className: 'separator__root--variant-thick--orientation-vertical',
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
