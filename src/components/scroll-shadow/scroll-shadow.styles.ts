import { StyleSheet } from 'react-native';
import { tv } from 'tailwind-variants';

/**
 * ScrollShadow component styles using tailwind-variants
 */
export const scrollShadowStyles = tv({
  base: '',
});

/**
 * Native styles for properties not supported by NativeWind
 */
export const nativeStyles = StyleSheet.create({
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
