import { StyleSheet } from 'react-native';
import { tv } from 'tailwind-variants';

const root = tv({
  slots: {
    container: 'flex-col overflow-hidden',
    divider: 'h-px bg-border',
  },
  variants: {
    variant: {
      default: {
        container: '',
        divider: '',
      },
      border: {
        container: 'border border-border rounded-xl ',
        divider: '',
      },
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const item = tv({
  base: 'flex-col overflow-hidden',
});

const trigger = tv({
  slots: {
    base: 'flex-row items-center justify-between py-4 px-4 bg-background z-10 overflow-hidden',
    highlight: 'absolute inset-0',
  },
  variants: {
    variant: {
      default: '',
      border: '',
    },
    isDisabled: {
      true: {
        base: 'opacity-disabled',
      },
    },
  },
  defaultVariants: {
    variant: 'default',
    isDisabled: false,
  },
});

const indicator = tv({
  base: 'items-center justify-center',
});

const content = tv({
  base: 'px-4 pb-4',
  variants: {
    variant: {
      default: '',
      border: '',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const nativeStyles = StyleSheet.create({
  borderContainer: {
    borderCurve: 'continuous',
  },
});

const accordionStyles = Object.assign({
  root,
  item,
  trigger,
  indicator,
  content,
  nativeStyles,
});

export default accordionStyles;
