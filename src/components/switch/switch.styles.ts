import { combineStyles } from '@/theme/utils';
import { tv } from 'tailwind-variants';

const root = tv({
  slots: {
    container: 'shadow-2xl border-[0.5px] rounded-full',
    contentPaddingContainer: 'flex-1  overflow-hidden',
    contentContainer: 'flex-1 justify-center',
  },
  variants: {
    size: {
      sm: {
        container: 'w-[32px] h-[20px]',
        contentPaddingContainer: 'px-[3px]',
      },
      md: {
        container: 'w-[40px] h-[25px]',
        contentPaddingContainer: 'px-[3.5px]',
      },
      lg: {
        container: 'w-[48px] h-[30px]',
        contentPaddingContainer: 'px-[4.5px]',
      },
    },
    isDisabled: {
      true: {
        container: 'opacity-disabled pointer-events-none',
      },
    },
    isReadOnly: {
      true: {
        container: 'pointer-events-none',
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

const switchStyles = combineStyles({
  root,
  thumb,
  startContent,
  endContent,
});

export type RootSlots = keyof ReturnType<typeof root>;
export default switchStyles;
