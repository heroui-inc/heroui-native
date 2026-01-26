import { tv } from 'tailwind-variants';

const description = tv({
  base: 'text-sm text-muted',
  variants: {
    isInsideTextField: {
      true: 'px-1.5',
    },
    isInvalid: {
      true: 'text-danger',
    },
  },
});

export default description;
