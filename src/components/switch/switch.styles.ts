import { tv } from 'tailwind-variants';
import { combineStyles } from '../../theme/helpers';

const root = tv({
  slots: {
    container: 'shadow-2xl border-[0.5px] rounded-full w-[40px] h-[25px]',
    contentPaddingContainer: 'flex-1  overflow-hidden px-[3.5px]',
    contentContainer: 'flex-1 justify-center',
  },
  variants: {
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
