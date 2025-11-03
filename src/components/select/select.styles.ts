import { StyleSheet } from 'react-native';
import { tv } from 'tailwind-variants';

const trigger = tv({
  base: '',
  variants: {
    isDisabled: {
      true: 'opacity-disabled',
    },
  },
});

const value = tv({
  base: 'text-base text-foreground font-normal',
});

const portal = tv({
  base: 'absolute inset-0',
});

const overlay = tv({
  base: 'absolute inset-0',
});

const popoverContent = tv({
  base: 'bg-overlay rounded-3xl border border-border p-3 px-4 shadow-lg shadow-black/5 dark:shadow-none',
});

const bottomSheetContent = tv({
  base: 'p-5',
});

const dialogContent = tv({
  slots: {
    wrapper: 'absolute inset-0 justify-center p-5',
    content: 'bg-overlay rounded-lg border border-border p-5',
  },
});

const close = tv({
  base: '',
});

const listLabel = tv({
  base: 'text-sm text-muted font-medium px-2 py-1.5',
});

const item = tv({
  base: 'flex-row items-center gap-2 px-2 py-3',
});

const itemLabel = tv({
  base: 'flex-1 text-base text-foreground font-medium',
});

const itemDescription = tv({
  base: 'text-sm/snug text-muted font-normal',
});

const itemIndicator = tv({
  base: 'size-5 items-center justify-center',
});

const selectStyles = {
  trigger,
  portal,
  overlay,
  popoverContent,
  bottomSheetContent,
  dialogContent,
  close,
  value,
  item,
  itemLabel,
  itemDescription,
  itemIndicator,
  listLabel,
};

export type DialogContentFallbackSlots = keyof ReturnType<typeof dialogContent>;

export const styleSheet = StyleSheet.create({
  contentContainer: {
    borderCurve: 'continuous',
  },
});

export default selectStyles;
