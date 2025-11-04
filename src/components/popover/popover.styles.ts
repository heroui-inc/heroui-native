import { StyleSheet } from 'react-native';
import { tv } from 'tailwind-variants';

const portal = tv({
  base: 'absolute inset-0',
});

const overlay = tv({
  base: 'absolute inset-0',
});

const popoverContent = tv({
  base: 'absolute bg-overlay rounded-3xl border border-border p-3 px-4 shadow-lg shadow-black/5 dark:shadow-none',
});

const bottomSheetContent = tv({
  base: 'flex-1 p-5 bg-transparent',
});

const close = tv({
  base: '',
});

const title = tv({
  base: 'text-lg font-medium text-foreground',
});

const description = tv({
  base: 'text-base/snug font-normal text-muted',
});

const arrow = tv({
  base: 'absolute z-50',
});

const popoverStyles = {
  portal,
  overlay,
  popoverContent,
  bottomSheetContent,
  close,
  title,
  description,
  arrow,
};

export const styleSheet = StyleSheet.create({
  contentContainer: {
    borderCurve: 'continuous',
  },
});

export default popoverStyles;
