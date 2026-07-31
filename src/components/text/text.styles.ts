import { Platform, StyleSheet } from 'react-native';
import { tv } from '../../helpers/external/utils/cn';
import { combineStyles } from '../../helpers/internal/utils';
import { CODE_FONT_FAMILY } from './text.constants';

/**
 * @note No `rtl:` overrides are needed for `align`. React Native (new
 * architecture) resolves `textAlign: left/right` against the node's layout
 * direction, so `left` already means "start" and `right` means "end" in RTL.
 */
const root = tv({
  base: 'text__root',
  variants: {
    type: {
      'h1': 'text__root--type-h1',
      'h2': 'text__root--type-h2',
      'h3': 'text__root--type-h3',
      'h4': 'text__root--type-h4',
      'h5': 'text__root--type-h5',
      'h6': 'text__root--type-h6',
      'body': 'text__root--type-body',
      'body-sm': 'text__root--type-body-sm',
      'body-xs': 'text__root--type-body-xs',
      'code': 'text__root--type-code',
    },
    align: {
      start: 'text__root--align-start',
      center: 'text__root--align-center',
      end: 'text__root--align-end',
      justify: 'text__root--align-justify',
    },
    color: {
      default: 'text__root--color-default',
      muted: 'text__root--color-muted',
    },
    weight: {
      normal: 'text__root--weight-normal',
      medium: 'text__root--weight-medium',
      semibold: 'text__root--weight-semibold',
      bold: 'text__root--weight-bold',
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
