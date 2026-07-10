import { StyleSheet } from 'react-native';
import { tv } from '../../helpers/external/utils/cn';
import { combineStyles } from '../../helpers/internal/utils';

const root = tv({
  base: 'surface__root',
  variants: {
    variant: {
      default: 'surface__root--variant-default',
      secondary: 'surface__root--variant-secondary',
      tertiary: 'surface__root--variant-tertiary',
      transparent: 'surface__root--variant-transparent',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export const surfaceClassNames = combineStyles({
  root,
});

export const surfaceStyleSheet = StyleSheet.create({
  root: {
    borderCurve: 'continuous',
  },
});
