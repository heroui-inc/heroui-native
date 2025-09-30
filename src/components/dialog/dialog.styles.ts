import { StyleSheet } from 'react-native';
import { tv } from 'tailwind-variants';
import { combineStyles } from '../../providers/theme/helpers';

const portal = tv({
  base: 'absolute inset-0 justify-center p-5',
});

const overlay = tv({
  base: 'absolute inset-0 bg-black/50',
  variants: {
    isDefaultAnimationDisabled: {
      true: 'bg-transparent',
    },
  },
});

const content = tv({
  base: 'bg-panel rounded-lg border border-border p-5',
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
