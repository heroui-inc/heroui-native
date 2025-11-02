import { StyleSheet } from 'react-native';
import { tv } from 'tailwind-variants';

const root = tv({
  base: 'p-4 rounded-3xl overflow-hidden',
  variants: {
    variant: {
      default: 'bg-surface',
      secondary: 'bg-surface-secondary',
      tertiary: 'bg-surface-tertiary',
      quaternary: 'bg-surface-quaternary',
      transparent: 'bg-transparent',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export const styleSheet = StyleSheet.create({
  root: {
    borderCurve: 'continuous',
  },
});

export default root;
