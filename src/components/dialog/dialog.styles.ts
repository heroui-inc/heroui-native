import { StyleSheet } from 'react-native';
import { tv } from 'tailwind-variants';
import { combineStyles } from '../../providers/theme/helpers';

const portal = tv({
  base: 'absolute inset-0 items-center justify-center p-5',
});

const overlay = tv({
  base: 'absolute inset-0 bg-black/50',
});

const content = tv({
  base: 'bg-background rounded-lg border border-border p-5',
});

const close = tv({
  base: 'self-end',
});

const title = tv({
  base: 'text-xl font-semibold text-foreground',
});

const description = tv({
  base: 'text-base text-foreground/80',
});

const dialogStyles = combineStyles({
  portal,
  overlay,
  content,
  close,
  title,
  description,
});

export const nativeStyles = StyleSheet.create({
  contentContainer: {
    borderCurve: 'continuous',
  },
});

export default dialogStyles;
