import { StyleSheet } from 'react-native';
import { tv } from 'tailwind-variants';
import { combineStyles } from '../../helpers/internal/utils';

const root = tv({
  base: 'gap-2',
});

const list = tv({
  base: 'flex-row flex-wrap gap-2',
});

const tag = tv({
  base: 'p-1 px-2.5 gap-1 rounded-2xl flex-row items-center',
  variants: {
    variant: {
      default: 'bg-default',
      surface: 'bg-surface',
    },
    isSelected: {
      true: 'bg-accent-soft',
    },
    isDisabled: {
      true: 'opacity-disabled',
    },
  },
  defaultVariants: {
    variant: 'default',
    isSelected: false,
    isDisabled: false,
  },
});

const tagLabel = tv({
  base: 'text-sm font-medium text-field-foreground',
  variants: {
    isSelected: {
      true: 'text-accent-soft-foreground',
    },
  },
  defaultVariants: {
    isSelected: false,
  },
});

export const tagGroupClassNames = combineStyles({
  root,
  list,
  tag,
  tagLabel,
});

export const tagGroupStyleSheet = StyleSheet.create({
  tag: {
    borderCurve: 'continuous',
  },
});
