import { tv } from 'tailwind-variants';

const description = tv({
  base: 'px-1.5 text-sm text-muted',
  variants: {
    isInvalid: {
      true: 'text-danger',
    },
  },
});

export default description;
