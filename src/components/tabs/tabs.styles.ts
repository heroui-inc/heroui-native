import { StyleSheet } from 'react-native';
import { tv } from 'tailwind-variants';
import { combineStyles } from '../../providers/theme/helpers';

const root = tv({
  base: 'flex-col gap-2',
});

const list = tv({
  base: 'flex-row items-center justify-center rounded-[12px] bg-surface-2 p-[3px] gap-1 mr-auto',
});

const trigger = tv({
  base: 'flex-row items-center justify-center px-3 py-1.5 gap-1.5 rounded-[10px] border-[0.5px] border-transparent shadow-sm dark:shadow-none shadow-black/[0.08]',
  variants: {
    isSelected: {
      true: 'bg-background border-border',
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

const label = tv({
  base: 'text-base font-medium text-foreground',
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
  content,
  styleSheet,
});

export type RootSlots = keyof ReturnType<typeof root>;

export default tabsStyles;
