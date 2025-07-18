import { tv } from 'tailwind-variants';

const item = tv({
  base: 'flex-row items-center gap-2 relative',
  variants: {
    size: {
      sm: 'gap-2',
      md: 'gap-2.5',
      lg: 'gap-3',
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
  base: 'rounded-full border-2 items-center justify-center',
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
  defaultVariants: {
    size: 'md',
  },
});

const label = tv({
  base: 'text-foreground select-none',
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
  base: 'text-muted-foreground select-none',
  variants: {
    size: {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const radioStyles = Object.assign({
  item,
  indicator,
  background,
  thumb,
  label,
  description,
});

export default radioStyles;
