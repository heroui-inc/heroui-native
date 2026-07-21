import { StyleSheet } from 'react-native';
import { tv } from '../../helpers/external/utils/cn';
import { combineStyles } from '../../helpers/internal/utils';

/**
 * Overlay style definition
 *
 * @note ANIMATED PROPERTIES (cannot be set via className):
 * The following property is animated and cannot be overridden using Tailwind classes:
 * - `opacity` - Animated for overlay show/hide transitions (idle: 0, open: 1, close: 0)
 *
 * To customize this property, use the `animation` prop on `BottomSheet.Overlay`:
 * ```tsx
 * <BottomSheet.Overlay
 *   animation={{
 *     opacity: { value: [0, 1, 0] }
 *   }}
 * />
 * ```
 *
 * To completely disable animated styles and apply your own via className or style prop,
 * set `isAnimatedStyleActive={false}` on `BottomSheet.Overlay`.
 */
const overlay = tv({
  base: 'bottom-sheet__overlay',
});

/**
 * @note `pb-safe-offset-3` stays as a Tailwind utility because the uniwind
 * CSS parser has no safe-area equivalent for custom CSS classes.
 */
const contentContainer = tv({
  base: 'bottom-sheet__content-container pb-safe-offset-3',
});

const contentBackground = tv({
  base: 'bottom-sheet__content-background',
});

const contentHandleIndicator = tv({
  base: 'bottom-sheet__content-handle-indicator',
});

const close = tv({
  base: '',
});

const label = tv({
  base: 'bottom-sheet__label',
});

const description = tv({
  base: 'bottom-sheet__description',
});

export const bottomSheetClassNames = combineStyles({
  overlay,
  contentContainer,
  contentBackground,
  contentHandleIndicator,
  close,
  label,
  description,
});

export const bottomSheetStyleSheet = StyleSheet.create({
  contentContainer: {
    borderCurve: 'continuous',
  },
});
