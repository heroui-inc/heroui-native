import { StyleSheet } from 'react-native';
import { tv } from 'tailwind-variants';

const overlay = tv({
  base: 'absolute inset-0 bg-black/20',
});

const contentContainer = tv({
  base: 'flex-1 p-5 pb-safe-offset-3 bg-transparent',
});

const contentBackground = tv({
  base: 'bg-overlay rounded-t-[32px]',
});

const contentHandleIndicator = tv({
  base: 'bg-muted',
});

const close = tv({
  base: '',
});

const label = tv({
  base: 'text-lg font-medium text-foreground',
});

const description = tv({
  base: 'text-base text-muted',
});

const bottomSheetStyles = {
  overlay,
  contentContainer,
  contentBackground,
  contentHandleIndicator,
  close,
  label,
  description,
};

export const styleSheet = StyleSheet.create({
  contentContainer: {
    borderCurve: 'continuous',
  },
});

export default bottomSheetStyles;
