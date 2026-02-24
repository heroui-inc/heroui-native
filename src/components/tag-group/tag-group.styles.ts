import { StyleSheet } from 'react-native';
import { tv } from 'tailwind-variants';
import { combineStyles } from '../../helpers/internal/utils';

const root = tv({
  base: 'gap-3',
});

const list = tv({
  base: 'flex-row flex-wrap gap-2',
});

const tag = tv({
  base: 'gap-1 flex-row items-center',
  variants: {
    variant: {
      default: 'bg-default',
      surface: 'bg-surface',
    },
    size: {
      sm: 'p-0.5 px-2 gap-1 rounded-xl',
      md: 'p-1 px-2.5 gap-1 rounded-2xl',
      lg: 'p-1.5 px-3 gap-1.5 rounded-3xl',
    },
    isSelected: {
      true: 'bg-accent-soft',
    },
    isDisabled: {
      true: 'opacity-disabled pointer-events-none',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
    isSelected: false,
    isDisabled: false,
  },
});

const tagLabel = tv({
  base: 'font-medium text-field-foreground',
  variants: {
    size: {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
    },
    isSelected: {
      true: 'text-accent-soft-foreground',
    },
  },
  defaultVariants: {
    size: 'md',
    isSelected: false,
  },
});

const removeButton = tv({
  base: 'rounded-lg items-center justify-center',
});

export const tagGroupClassNames = combineStyles({
  root,
  list,
  tag,
  tagLabel,
  removeButton,
});

export const tagGroupStyleSheet = StyleSheet.create({
  tag: {
    borderCurve: 'continuous',
  },
});
