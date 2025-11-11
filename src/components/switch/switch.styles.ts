import { tv } from 'tailwind-variants';
import { combineStyles } from '../../helpers/theme/utils/combine-styles';

const root = tv({
  slots: {
    container: 'shadow-2xl rounded-full w-[48px] h-[24px]',
    contentPaddingContainer: 'flex-1 overflow-hidden px-[2.5px]',
    contentContainer: 'flex-1 justify-center',
  },
  variants: {
    isDisabled: {
      true: {
        container: 'opacity-disabled pointer-events-none',
      },
    },
  },
  defaultVariants: {
    isDisabled: false,
  },
});

const thumb = tv({
  base: 'absolute items-center justify-center w-[28px] h-[20px] rounded-full overflow-hidden',
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
