import { StyleSheet } from 'react-native';
import { tv } from 'tailwind-variants';
import { combineStyles } from '../../providers/theme/helpers';

const content = tv({
  slots: {
    container: 'absolute inset-0 items-center justify-center p-5 bg-black/70',
    content: 'bg-background rounded-lg border border-border p-5 gap-8',
    closeButton: 'self-end -mb-5',
  },
});

const header = tv({
  base: '',
});

const body = tv({
  base: '',
});

const footer = tv({
  base: '',
});

const title = tv({
  base: 'text-xl font-semibold text-foreground',
});

const description = tv({
  base: 'text-base text-foreground/80',
});

const dialogStyles = combineStyles({
  content,
  header,
  body,
  footer,
  title,
  description,
});

export type ContentSlots = keyof ReturnType<typeof content>;

export const nativeStyles = StyleSheet.create({
  contentContainer: {
    borderCurve: 'continuous',
  },
});

export default dialogStyles;
