import { tv } from 'tailwind-variants';

const root = tv({
  slots: {
    base: 'shadow-2xl border-[0.5px] rounded-full',
    contentPaddingContainer: 'flex-1  overflow-hidden',
    contentContainer: 'flex-1 justify-center',
  },
  variants: {
    size: {
      sm: {
        base: 'w-[32px] h-[20px]',
        contentPaddingContainer: 'px-[3px]',
      },
      md: {
        base: 'w-[40px] h-[25px]',
        contentPaddingContainer: 'px-[3.5px]',
      },
      lg: {
        base: 'w-[48px] h-[30px]',
        contentPaddingContainer: 'px-[4.5px]',
      },
    },
    isDisabled: {
      true: {
        base: 'opacity-disabled pointer-events-none',
      },
    },
    isReadOnly: {
      true: {
        base: 'pointer-events-none',
      },
    },
  },
  defaultVariants: {
    size: 'md',
    isDisabled: false,
    isReadOnly: false,
  },
});

const thumb = tv({
  base: 'absolute items-center justify-center rounded-full overflow-hidden',
});

const startContent = tv({
  base: 'absolute left-0',
});

const endContent = tv({
  base: 'absolute right-0',
});

const switchStyles = Object.assign({
  root,
  thumb,
  startContent,
  endContent,
});

export default switchStyles;
