import { StyleSheet } from 'react-native';
import { tv } from 'tailwind-variants';
import { combineStyles } from '../../helpers/theme/utils/combine-styles';

const root = tv({
  slots: {
    container: 'flex-col overflow-hidden',
    divider: 'h-hairline bg-divider',
  },
  variants: {
    variant: {
      default: {
        container: '',
        divider: '',
      },
      surface: {
        container: 'bg-surface border border-surface rounded-3xl',
        divider: 'mx-3 bg-divider/75',
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
  base: 'flex-row items-center justify-between py-4 px-3 gap-4 bg-transparent z-10 overflow-hidden',
  variants: {
    variant: {
      default: '',
      surface: 'px-5',
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
  base: 'px-3 pb-4 bg-transparent',
  variants: {
    variant: {
      default: '',
      surface: 'px-5',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export const styleSheet = StyleSheet.create({
  root: {
    borderCurve: 'continuous',
  },
});

const accordionStyles = combineStyles({
  root,
  item,
  trigger,
  indicator,
  content,
});

export type RootSlots = keyof ReturnType<typeof root>;
export default accordionStyles;
