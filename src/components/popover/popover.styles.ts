import { StyleSheet } from 'react-native';
import { tv } from 'tailwind-variants';

const portal = tv({
  base: 'absolute inset-0 p-4',
});

const overlay = tv({
  base: 'absolute inset-0 bg-transparent',
});

const content = tv({
  base: 'absolute bg-panel rounded-lg border border-border p-4 shadow-md shadow-black/10',
});

const close = tv({
  base: '',
});

const title = tv({
  base: 'text-lg font-medium text-foreground',
});

const description = tv({
  base: 'text-base text-muted-foreground font-normal',
});

const popoverStyles = {
  portal,
  overlay,
  content,
  close,
  title,
  description,
};

export type RootSlots = keyof typeof popoverStyles;

export const nativeStyles = StyleSheet.create({
  contentContainer: {
    borderCurve: 'continuous',
  },
});

export default popoverStyles;
