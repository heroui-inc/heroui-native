import { StyleSheet } from 'react-native';
import { tv } from 'tailwind-variants';
import { combineStyles } from '../../providers/theme/helpers';

const root = tv({
  base: 'flex-col gap-2',
});

const list = tv({
  base: 'flex-row items-center justify-center rounded-lg bg-muted p-[3px] mr-auto',
});

const trigger = tv({
  base: 'flex-row items-center justify-center gap-1.5 rounded-md border border-transparent px-2 py-1',
  variants: {
    isSelected: {
      true: 'bg-background border-foreground/10',
      false: '',
    },
    isDisabled: {
      true: 'opacity-disabled pointer-events-none',
      false: '',
    },
  },
  defaultVariants: {
    isSelected: false,
    isDisabled: false,
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
  content,
  styleSheet,
});

export type RootSlots = keyof ReturnType<typeof root>;

export default tabsStyles;
