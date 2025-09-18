import { tv } from 'tailwind-variants';

/**
 * Main DropShadow component styles
 */
const root = tv({
  base: '',
  variants: {
    asChild: {
      true: '',
      false: 'bg-background',
    },
  },
  defaultVariants: {
    asChild: false,
  },
});

export default root;
