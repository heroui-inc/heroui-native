import { StyleSheet } from 'react-native';
import { tv } from '../../helpers/external/utils/cn';
import { combineStyles } from '../../helpers/internal/utils';

/**
 * Content container style definition — wraps the sheet children. The
 * `grabber` top inset clears the grabber Android draws over the content.
 */
const contentContainer = tv({
  base: 'bottom-sheet__content-container',
  variants: {
    topInset: {
      default: '',
      grabber: 'bottom-sheet__content-container--top-inset-grabber',
    },
  },
  defaultVariants: {
    topInset: 'default',
  },
});

const label = tv({
  base: 'bottom-sheet__label',
});

const description = tv({
  base: 'bottom-sheet__description',
});

export const bottomSheetClassNames = combineStyles({
  contentContainer,
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
