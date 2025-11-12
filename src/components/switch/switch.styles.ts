import { StyleSheet } from 'react-native';
import { tv } from 'tailwind-variants';
import { combineStyles } from '../../helpers/theme/utils/combine-styles';

const root = tv({
  base: 'w-[48px] h-[24px] rounded-full justify-center overflow-hidden',
  variants: {
    isDisabled: {
      true: 'opacity-disabled pointer-events-none',
      false: '',
    },
  },
  defaultVariants: {
    isDisabled: false,
  },
});

const thumb = tv({
  base: 'absolute left-[2px] items-center justify-center w-[28px] h-[20px] rounded-full shadow-sm shadow-black/5 overflow-hidden',
});

const startContent = tv({
  base: 'absolute left-[2px]',
});

const endContent = tv({
  base: 'absolute right-[2px]',
});

const switchStyles = combineStyles({
  root,
  thumb,
  startContent,
  endContent,
});

export const styleSheet = StyleSheet.create({
  borderCurve: {
    borderCurve: 'continuous',
  },
});

export default switchStyles;
