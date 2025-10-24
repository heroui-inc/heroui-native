import { StyleSheet } from 'react-native';
import { tv } from 'tailwind-variants';
import { combineStyles } from '../../providers/theme/helpers';

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
        container: 'border border-border rounded-xl',
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
  base: 'flex-row items-center justify-between p-4 gap-4 bg-background z-10 overflow-hidden',
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

const indicator = tv({
  base: 'items-center justify-center',
});

const content = tv({
  base: 'px-4 pb-4 bg-background',
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

const styleSheet = StyleSheet.create({
  borderContainer: {
    borderCurve: 'continuous',
  },
});

const accordionStyles = combineStyles({
  root,
  item,
  trigger,
  indicator,
  content,
  styleSheet,
});

export type RootSlots = keyof ReturnType<typeof root>;
export default accordionStyles;
