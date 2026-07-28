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

/**
 * Background style definition — absolute-fill container behind the surface
 * content, hosting theme-specific layers (e.g. glass blur) or custom
 * content (gradients, images).
 */
const background = tv({
  base: 'surface__background',
});

export const surfaceClassNames = combineStyles({
  root,
  background,
});

export const surfaceStyleSheet = StyleSheet.create({
  root: {
    borderCurve: 'continuous',
  },
});
