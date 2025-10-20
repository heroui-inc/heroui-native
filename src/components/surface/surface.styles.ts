import { StyleSheet } from 'react-native';
import { tv } from 'tailwind-variants';

const root = tv({
  base: 'p-4 rounded-lg border border-border overflow-hidden ',
  variants: {
    variant: {
      'none': 'bg-transparent',
      '1': 'bg-surface-1',
      '2': 'bg-surface-2',
      '3': 'bg-surface-3',
    },
  },
  defaultVariants: {
    variant: '1',
  },
});

export const styleSheet = StyleSheet.create({
  surfaceRoot: {
    borderCurve: 'continuous',
  },
});

export default root;
