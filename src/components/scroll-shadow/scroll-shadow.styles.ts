import { StyleSheet } from 'react-native';
import { tv } from 'tailwind-variants';
import { combineStyles } from '../../helpers/internal/utils';

/**
 * ScrollShadow component styles using tailwind-variants
 */
const root = tv({
  base: '',
});

export const scrollShadowClassNames = combineStyles({
  root,
});

/**
 * Native styles for properties not supported by NativeWind
 */
export const scrollShadowStyleSheet = StyleSheet.create({
  topShadow: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    pointerEvents: 'none',
  },
  bottomShadow: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    pointerEvents: 'none',
  },
  leftShadow: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    zIndex: 10,
    pointerEvents: 'none',
  },
  rightShadow: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    zIndex: 10,
    pointerEvents: 'none',
  },
});
