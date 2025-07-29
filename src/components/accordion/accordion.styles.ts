import { StyleSheet } from 'react-native';
import { tv } from 'tailwind-variants';

const root = tv({
  slots: {
    container: 'flex-col',
    divider: 'h-px bg-border',
  },
  variants: {
    variant: {
      default: {
        container: '',
        divider: '',
      },
      border: {
        container: 'border border-border rounded-xl overflow-hidden',
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
    base: 'flex-row items-center justify-between py-4 px-4',
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

const styles = StyleSheet.create({
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
  styles,
});

export default accordionStyles;
