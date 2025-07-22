import { tv } from 'tailwind-variants';

const groupRoot = tv({
  base: 'gap-1.5',
});

const radioRoot = tv({
  base: 'flex-row items-center',
  variants: {
    size: {
      sm: 'gap-2.5',
      md: 'gap-3',
      lg: 'gap-3.5',
    },
    isDisabled: {
      true: 'opacity-disabled pointer-events-none',
    },
    isReadOnly: {
      true: 'pointer-events-none',
    },
  },
  defaultVariants: {
    size: 'md',
    isDisabled: false,
    isReadOnly: false,
  },
});

const indicator = tv({
  base: 'rounded-full border items-center justify-center',
  variants: {
    size: {
      sm: 'h-4 w-4',
      md: 'h-5 w-5',
      lg: 'h-6 w-6',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const background = tv({
  base: 'absolute inset-0 rounded-full',
});

const thumb = tv({
  base: 'rounded-full',
  variants: {
    size: {
      sm: 'h-1.5 w-1.5',
      md: 'h-2 w-2',
      lg: 'h-2.5 w-2.5',
    },
  },
  compoundVariants: [
    {
      size: 'sm',
      isDark: true,
      className: 'h-2 w-2',
    },
    {
      size: 'md',
      isDark: true,
      className: 'h-2.5 w-2.5',
    },
    {
      size: 'lg',
      isDark: true,
      className: 'h-3 w-3',
    },
  ],
  defaultVariants: {
    size: 'md',
  },
});

const content = tv({
  base: 'flex-1',
});

const label = tv({
  base: 'text-foreground font-medium',
  variants: {
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const description = tv({
  base: 'text-muted-foreground',
  variants: {
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const radioStyles = Object.assign({
  groupRoot,
  radioRoot,
  indicator,
  background,
  thumb,
  content,
  label,
  description,
});

export default radioStyles;
