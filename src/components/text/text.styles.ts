import { Platform, StyleSheet } from 'react-native';
import { tv } from 'tailwind-variants';
import { combineStyles } from '../../helpers/internal/utils';
import { CODE_FONT_FAMILY } from './text.constants';

const root = tv({
  base: 'font-normal',
  variants: {
    type: {
      'h1': 'text-4xl font-semibold tracking-tight',
      'h2': 'text-3xl font-semibold tracking-tight',
      'h3': 'text-2xl font-semibold tracking-tight',
      'h4': 'text-xl font-semibold tracking-tight',
      'h5': 'text-lg font-semibold tracking-tight',
      'h6': 'text-base font-semibold tracking-tight',
      'body': 'text-base leading-7',
      'body-sm': 'text-sm leading-6',
      'body-xs': 'text-xs leading-5',
      'code': 'self-start text-sm rounded-md bg-default px-1.5 py-0.5',
    },
    align: {
      start: 'text-left rtl:text-right',
      center: 'text-center',
      end: 'text-right rtl:text-left',
      justify: 'text-justify',
    },
    color: {
      default: 'text-foreground',
      muted: 'text-muted',
    },
    weight: {
      normal: 'font-normal',
      medium: 'font-medium',
      semibold: 'font-semibold',
      bold: 'font-bold',
    },
  },
  defaultVariants: {
    type: 'body',
    align: 'start',
    color: 'default',
  },
});

export const textClassNames = combineStyles({
  root,
});

export const styleSheet = StyleSheet.create({
  code: {
    fontFamily: Platform.select({
      ios: 'Menlo',
      android: CODE_FONT_FAMILY,
      default: CODE_FONT_FAMILY,
    }),
  },
});
