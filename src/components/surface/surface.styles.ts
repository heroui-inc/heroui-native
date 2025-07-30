import { StyleSheet } from 'react-native';
import { tv } from 'tailwind-variants';

const root = tv({
  base: 'p-4 rounded-lg',
  variants: {
    variant: {
      'none': 'bg-transparent',
      '1': 'bg-surface-1 border border-border',
      '2': 'bg-surface-2 border border-border',
      '3': 'bg-surface-3 border border-border',
    },
  },
  defaultVariants: {
    variant: '1',
  },
});

export const nativeStyles = StyleSheet.create({
  surfaceRoot: {
    borderCurve: 'continuous',
  },
});

export default root;
