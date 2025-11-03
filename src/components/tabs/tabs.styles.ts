import { StyleSheet } from 'react-native';
import { tv } from 'tailwind-variants';
import { combineStyles } from '../../helpers/theme/utils/combine-styles';

const root = tv({
  base: 'flex-col gap-2',
});

const list = tv({
  base: 'self-start flex-row items-center gap-1',
  variants: {
    variant: {
      pill: 'rounded-full bg-default p-1',
      line: 'border-b border-border',
    },
  },
  defaultVariants: {
    variant: 'pill',
  },
});

const scrollView = tv({
  base: '',
});

const scrollViewContentContainer = tv({
  base: '',
  variants: {
    variant: {
      pill: '',
      line: 'px-4',
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
  base: 'text-base font-medium text-segment-foreground',
});

const indicator = tv({
  base: 'absolute',
  variants: {
    variant: {
      pill: 'rounded-full shadow-sm dark:shadow-none shadow-black/5 bg-segment',
      line: 'border-b-2 border-accent bottom-0',
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
  scrollView,
  scrollViewContentContainer,
  trigger,
  label,
  indicator,
  content,
  styleSheet,
});

export default tabsStyles;
