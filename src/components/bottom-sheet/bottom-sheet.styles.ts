import { StyleSheet } from 'react-native';
import { tv } from '../../helpers/external/utils/cn';
import { combineStyles } from '../../helpers/internal/utils';

/**
 * Content style definition — pads the sheet. The `grabber` top inset clears
 * the grabber Android draws over the content; a sticky header or footer takes
 * over the inset on its side (`none`).
 */
const content = tv({
  base: 'bottom-sheet__content',
  variants: {
    topInset: {
      default: '',
      grabber: 'bottom-sheet__content--top-inset-grabber',
      none: 'bottom-sheet__content--top-inset-none',
    },
    bottomInset: {
      default: '',
      none: 'bottom-sheet__content--bottom-inset-none',
    },
  },
  defaultVariants: {
    topInset: 'default',
    bottomInset: 'default',
  },
});

/**
 * Header style definition — a sticky header sits outside the content, so it
 * pads itself and clears the Android grabber.
 */
const header = tv({
  base: 'bottom-sheet__header',
  variants: {
    isSticky: {
      true: 'bottom-sheet__header--sticky',
    },
    topInset: {
      default: '',
      grabber: 'bottom-sheet__header--top-inset-grabber',
    },
  },
  defaultVariants: {
    isSticky: false,
    topInset: 'default',
  },
});

const body = tv({
  base: '',
});

/**
 * Footer style definition — a sticky footer sits outside the content, so it
 * pads itself.
 */
const footer = tv({
  base: 'bottom-sheet__footer',
  variants: {
    isSticky: {
      true: 'bottom-sheet__footer--sticky',
    },
  },
  defaultVariants: {
    isSticky: false,
  },
});

const label = tv({
  base: 'bottom-sheet__label',
});

const description = tv({
  base: 'bottom-sheet__description',
});

export const bottomSheetClassNames = combineStyles({
  content,
  header,
  body,
  footer,
  label,
  description,
});

export const bottomSheetStyleSheet = StyleSheet.create({
  /**
   * The sheet is presented outside the app's native root, so on Android
   * gesture-handler gestures (Slider, swipeable content) need their own root
   * inside it. `flexGrow`, not GH's default `flex: 1`: the content wraps its
   * natural height for the `auto` detent, and `flex: 1` would collapse it.
   */
  gestureRoot: {
    flexGrow: 1,
  },
});
