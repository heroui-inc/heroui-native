import { StyleSheet } from 'react-native';
import { tv } from 'tailwind-variants';
import { combineStyles } from '../../providers/theme/helpers';

const root = tv({
  base: 'flex-col gap-2',
});

const list = tv({
  base: 'flex-row items-center justify-center gap-1 mr-auto',
  variants: {
    variant: {
      pill: 'rounded-[12px] bg-surface-2 p-[3px]',
      line: 'border-b border-border',
    },
  },
  defaultVariants: {
    variant: 'pill',
  },
});

const trigger = tv({
  base: 'flex-row items-center justify-center px-3 py-1.5 gap-1.5',
  variants: {
    isDisabled: {
      true: 'opacity-disabled pointer-events-none',
      false: '',
    },
  },
  defaultVariants: {
    isDisabled: false,
  },
});

const label = tv({
  base: 'text-base font-medium text-foreground',
});

const indicator = tv({
  base: 'absolute',
  variants: {
    variant: {
      pill: 'rounded-[10px] border-[0.5px] border-border shadow-sm dark:shadow-none shadow-black/[0.08] bg-background',
      line: 'border-b-2 border-foreground bottom-0',
    },
  },
  defaultVariants: {
    variant: 'pill',
  },
});

const content = tv({
  base: '',
});

export const styleSheet = StyleSheet.create({
  listRoot: {
    borderCurve: 'continuous',
  },
  triggerRoot: {
    borderCurve: 'continuous',
  },
});

const tabsStyles = combineStyles({
  root,
  list,
  trigger,
  label,
  indicator,
  content,
  styleSheet,
});

export type RootSlots = keyof ReturnType<typeof root>;

export default tabsStyles;
