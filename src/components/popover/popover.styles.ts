import { StyleSheet } from 'react-native';
import { tv } from 'tailwind-variants';

const portal = tv({
  base: 'absolute inset-0',
});

const overlay = tv({
  base: 'absolute inset-0',
  variants: {
    isTransparent: {
      true: '',
      false: 'bg-black/50',
    },
  },
  defaultVariants: {
    isTransparent: true,
  },
});

const content = tv({
  base: 'absolute bg-background rounded-lg shadow-lg border border-border p-4 min-w-[200px] max-w-[320px]',
});

const close = tv({
  base: 'absolute right-2 top-2 p-1 rounded-md',
});

const title = tv({
  base: 'text-lg font-semibold text-foreground mb-1',
});

const description = tv({
  base: 'text-sm text-muted-foreground font-normal',
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
