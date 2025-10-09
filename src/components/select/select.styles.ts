import { StyleSheet } from 'react-native';
import { tv } from 'tailwind-variants';

const portal = tv({
  base: 'absolute inset-0',
});

const overlay = tv({
  base: 'absolute inset-0',
  variants: {
    isDark: {
      true: 'bg-black/25',
      false: 'bg-black/5',
    },
  },
});

const popoverContent = tv({
  base: 'bg-panel rounded-lg border border-border p-3 px-4',
  variants: {
    isDark: {
      true: '',
      false: 'shadow-md shadow-black/5',
    },
  },
});

const bottomSheetContent = tv({
  base: 'flex-1 p-5',
});

const dialogContent = tv({
  slots: {
    wrapper: 'absolute inset-0 justify-center p-5',
    content: 'bg-panel rounded-lg border border-border p-5',
  },
});

const close = tv({
  base: '',
});

const title = tv({
  base: 'text-lg font-medium text-foreground',
});

const description = tv({
  base: 'text-base/snug font-normal',
  variants: {
    isDark: {
      true: 'text-muted-foreground',
      false: 'text-muted',
    },
  },
});

const selectStyles = {
  portal,
  overlay,
  popoverContent,
  bottomSheetContent,
  dialogContent,
  close,
  title,
  description,
};

export type DialogContentFallbackSlots = keyof ReturnType<typeof dialogContent>;

export const styleSheet = StyleSheet.create({
  contentContainer: {
    borderCurve: 'continuous',
  },
});

export default selectStyles;
