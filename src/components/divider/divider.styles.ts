import { StyleSheet } from 'react-native';
import { tv } from 'tailwind-variants';
import { combineStyles } from '../../providers/theme/helpers';

const root = tv({
  base: 'bg-divider',
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
  defaultVariants: {
    variant: 'thin',
    orientation: 'horizontal',
  },
});

export const nativeStyles = StyleSheet.create({
  hairlineWidth: {
    height: StyleSheet.hairlineWidth,
  },
  hairlineWidthVertical: {
    width: StyleSheet.hairlineWidth,
  },
});

const dividerStyles = combineStyles({
  root,
});

export default dividerStyles;
