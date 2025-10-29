import { StyleSheet } from 'react-native';
import { tv } from 'tailwind-variants';
import { combineStyles } from '../../helpers/theme/utils/combine-styles';

const root = tv({
  base: 'flex-row items-center justify-center overflow-hidden',
  variants: {
    variant: {
      primary: 'bg-accent',
      secondary: 'bg-accent-soft',
      tertiary: 'bg-default border border-border',
      ghost: 'bg-transparent',
      danger: 'bg-danger',
    },
    size: {
      sm: 'h-[36px] px-3 gap-1.5 rounded-md',
      md: 'h-[48px] px-4 gap-2 rounded-lg',
      lg: 'h-[56px] px-5 gap-2.5 rounded-lg',
    },
    isIconOnly: {
      true: 'p-0 aspect-square',
    },
    isDisabled: {
      true: 'opacity-disabled pointer-events-none',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
    isIconOnly: false,
    isDisabled: false,
  },
});

const label = tv({
  base: 'font-medium',
  variants: {
    variant: {
      primary: 'text-accent-foreground',
      secondary: 'text-accent-soft-foreground',
      tertiary: 'text-default-foreground',
      ghost: 'text-default-foreground',
      danger: 'text-danger-foreground',
    },
    size: {
      sm: 'text-base',
      md: 'text-base',
      lg: 'text-lg',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

export const styleSheet = StyleSheet.create({
  buttonRoot: {
    borderCurve: 'continuous',
  },
});

const buttonStyles = combineStyles({
  root,
  label,
});

export default buttonStyles;
