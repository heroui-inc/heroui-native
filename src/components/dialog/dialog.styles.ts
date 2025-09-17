import { StyleSheet } from 'react-native';
import { tv } from 'tailwind-variants';
import { combineStyles } from '../../providers/theme/helpers';

const overlay = tv({
  base: 'absolute inset-0 z-50 items-center justify-center bg-black/50',
});

const content = tv({
  slots: {
    container:
      'z-50 mx-4 max-w-lg w-full bg-background rounded-lg border border-border p-6 shadow-lg',
    closeButton:
      'absolute right-4 top-4 rounded-sm opacity-70 active:opacity-100',
    closeIcon: 'h-4 w-4 text-muted-foreground',
  },
});

const header = tv({
  base: 'flex flex-col space-y-1.5',
});

const body = tv({
  base: 'py-4',
});

const footer = tv({
  base: 'flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2',
});

const title = tv({
  base: 'text-lg font-semibold leading-none text-foreground',
});

const description = tv({
  base: 'text-sm text-muted-foreground',
});

const dialogStyles = combineStyles({
  overlay,
  content,
  header,
  body,
  footer,
  title,
  description,
});

export type OverlaySlots = keyof ReturnType<typeof overlay>;
export type ContentSlots = keyof ReturnType<typeof content>;

export const nativeStyles = StyleSheet.create({
  contentContainer: {
    borderCurve: 'continuous',
  },
});

export default dialogStyles;
