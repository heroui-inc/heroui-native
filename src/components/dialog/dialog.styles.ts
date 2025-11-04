import { StyleSheet } from 'react-native';
import { tv } from 'tailwind-variants';
import { combineStyles } from '../../helpers/theme/utils/combine-styles';

const portal = tv({
  base: 'absolute inset-0 justify-center p-5',
});

const overlay = tv({
  base: 'absolute inset-0 bg-black/30',
  variants: {
    isDefaultAnimationDisabled: {
      true: 'bg-transparent',
    },
  },
});

const content = tv({
  base: 'bg-overlay rounded-3xl border border-border p-5',
});

const close = tv({
  base: '',
});

const title = tv({
  base: 'text-lg font-medium text-foreground',
});

const description = tv({
  base: 'text-base font-normal text-muted',
});

const dialogStyles = combineStyles({
  portal,
  overlay,
  content,
  close,
  title,
  description,
});

export const styleSheet = StyleSheet.create({
  contentContainer: {
    borderCurve: 'continuous',
  },
});

export default dialogStyles;
