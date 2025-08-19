import { StyleSheet } from 'react-native';
import { tv } from 'tailwind-variants';
import { combineStyles } from '../../providers/theme/helpers';

const root = tv({
  base: 'flex-row items-center justify-center',
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
  slots: {
    container: 'items-center justify-center',
    text: 'font-medium',
  },
  variants: {
    variant: {
      primary: {
        text: 'text-accent-foreground',
      },
      secondary: {
        text: 'text-accent-soft-foreground',
      },
      tertiary: {
        text: 'text-default-foreground',
      },
      ghost: {
        text: 'text-default-foreground',
      },
      danger: {
        text: 'text-danger-foreground',
      },
    },
    size: {
      sm: {
        text: 'text-sm',
      },
      md: {
        text: 'text-base',
      },
      lg: {
        text: 'text-lg',
      },
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

const startContent = tv({
  base: 'items-center justify-center',
});

const endContent = tv({
  base: 'items-center justify-center',
});

const background = tv({
  base: 'absolute inset-0 overflow-hidden',
  variants: {
    size: {
      sm: 'rounded-md',
      md: 'rounded-lg',
      lg: 'rounded-lg',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export const nativeStyles = StyleSheet.create({
  buttonRoot: {
    borderCurve: 'continuous',
  },
  background: {
    borderCurve: 'continuous',
  },
});

const buttonStyles = combineStyles({
  root,
  label,
  startContent,
  endContent,
  background,
});

export type LabelSlots = keyof ReturnType<typeof label>;
export default buttonStyles;
