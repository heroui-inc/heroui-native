import { tv } from 'tailwind-variants';

const description = tv({
  base: 'text-sm text-muted',
  variants: {
    isInvalid: {
      true: 'text-danger',
    },
  },
});

export default description;
