// Toast component styles
import { tv } from 'tailwind-variants';

export const toastStyles = tv({
  base: 'bg-background rounded-lg p-4 shadow-lg flex-row items-center gap-3',
  defaultVariants: {
    variant: 'default',
  },
});

export const toastIconStyles = tv({
  base: 'w-6 h-6 rounded-full border-2 border-dashed',
  variants: {
    variant: {
      default: 'border-gray-400',
      success: 'border-green-600',
      danger: 'border-red-600',
      warning: 'border-orange-500',
      info: 'border-blue-600',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export const toastContentStyles = tv({
  base: 'flex-1',
});

export const toastTitleStyles = tv({
  base: 'text-foreground font-semibold text-lg',
  variants: {
    variant: {
      default: 'text-foreground',
      success: 'text-success',
      danger: 'text-danger',
      warning: 'text-warning',
      info: 'text-info',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export const toastDescriptionStyles = tv({
  base: 'text-muted-foreground text-md',
  defaultVariants: {
    variant: 'default',
  },
});

export const toastActionButtonStyles = tv({
  base: 'px-3 py-1.5 rounded-md text-md font-medium',
  variants: {
    variant: {
      default: 'bg-gray-200',
      success: 'bg-green-600',
      danger: 'bg-red-600',
      warning: 'bg-orange-500',
      info: 'bg-blue-600',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export const toastActionButtonTextStyles = tv({
  base: 'text-sm font-medium',
  variants: {
    variant: {
      default: 'text-gray-700',
      success: 'text-white',
      danger: 'text-white',
      warning: 'text-white',
      info: 'text-white',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export const toastCloseButtonStyles = tv({
  base: '',
  variants: {
    variant: {
      success: 'bg-success',
      danger: 'bg-danger',
      warning: 'bg-warning',
      default: 'bg-default',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export const elevationStyle = {
  shadowOpacity: 0.0015 * 4 + 0.1,
  shadowRadius: 3 * 4,
  shadowOffset: {
    height: 4,
    width: 0,
  },
  elevation: 4,
};
