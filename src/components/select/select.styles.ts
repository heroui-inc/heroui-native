import { StyleSheet } from 'react-native';
import { tv } from 'tailwind-variants';

const value = tv({
  base: 'text-base text-foreground font-normal',
});

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

const item = tv({
  base: 'flex-row items-center gap-2 px-2 py-2.5',
});

const itemLabel = tv({
  base: 'flex-1 text-base text-foreground font-medium',
});

const itemIndicator = tv({
  base: 'size-5 items-center justify-center bg-red-500',
});

const group = tv({
  base: 'gap-3',
});

const groupLabel = tv({
  base: 'text-sm font-medium px-2 py-1.5',
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
  value,
  item,
  itemLabel,
  itemIndicator,
  group,
  groupLabel,
};

export type DialogContentFallbackSlots = keyof ReturnType<typeof dialogContent>;

export const styleSheet = StyleSheet.create({
  contentContainer: {
    borderCurve: 'continuous',
  },
});

export default selectStyles;
