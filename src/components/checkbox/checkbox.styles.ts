import { tv } from 'tailwind-variants';

const root = tv({
  base: 'relative border items-center justify-center overflow-hidden',
  variants: {
    size: {
      sm: 'w-[17px] h-[17px] rounded-[5px]',
      md: 'w-[20px] h-[20px] rounded-[6px]',
      lg: 'w-[24px] h-[24px] rounded-[7px]',
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

const background = tv({
  base: 'absolute inset-0',
  variants: {
    size: {
      sm: 'rounded-[4px]',
      md: 'rounded-[5px]',
      lg: 'rounded-[6px]',
    },
  },
});

const indicator = tv({
  base: 'absolute inset-0 items-center justify-center',
});

const checkboxStyles = Object.assign({
  root,
  background,
  indicator,
});

export default checkboxStyles;
