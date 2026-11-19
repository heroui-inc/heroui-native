import { StyleSheet } from 'react-native';
import { tv } from '../../helpers/external/utils/cn';
import { combineStyles } from '../../helpers/internal/utils';

/**
 * Toast root styles
 *
 * @note ANIMATED PROPERTIES (cannot be set via className):
 * The following properties are animated and cannot be overridden using Tailwind classes:
 * - `opacity` - Animated for visibility transitions when toasts are pushed beyond visible stack limits
 * - `transform` (translateY) - Animated for vertical position transitions when toasts are stacked, and for swipe-to-dismiss gestures
 * - `transform` (scale) - Animated for size scaling transitions when toasts are stacked (toasts behind active one are scaled down)
 * - `height` - Animated to the front toast's height while the toast is stacked behind it
 *
 * `opacity` and `transform` are animated on a wrapper view around the root, so
 * an `opacity` or `transform` set on the root combines with the animation
 * instead of replacing it. `height` is animated on the root itself.
 *
 * To customize these properties, use the `animation` prop on `Toast.Root`:
 * ```tsx
 * <Toast.Root
 *   animation={{
 *     opacity: {
 *       value: [1, 0],
 *       timingConfig: { duration: 300 }
 *     },
 *     translateY: {
 *       value: [0, 10],
 *       timingConfig: { duration: 300 }
 *     },
 *     scale: {
 *       value: [1, 0.97],
 *       timingConfig: { duration: 300 }
 *     }
 *   }}
 * />
 * ```
 *
 * To completely disable animated styles and apply your own via className or style prop,
 * set `isAnimatedStyleActive={false}` on `Toast.Root`.
 */
const root = tv({
  base: 'toast__root',
});

/**
 * Background style definition — absolute-fill container behind the toast
 * surface, hosting theme-specific layers (e.g. glass blur) or custom
 * content (gradients, images).
 */
const background = tv({
  base: 'toast__background',
});

/**
 * Cover style definition — hides the content of toasts stacked behind the
 * front toast, except while the front toast is dragged (opacity is animated
 * on the UI thread).
 */
const cover = tv({
  base: 'toast__cover',
});

/**
 * Cover edge style definition — hides the cut-off bottom edge of toasts
 * stacked behind the front toast, also while the front toast is dragged.
 */
const coverEdge = tv({
  base: 'toast__cover-edge',
});

const label = tv({
  base: 'toast__label',
  variants: {
    variant: {
      default: 'toast__label--variant-default',
      accent: 'toast__label--variant-accent',
      success: 'toast__label--variant-success',
      warning: 'toast__label--variant-warning',
      danger: 'toast__label--variant-danger',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const description = tv({
  base: 'toast__description',
});

const action = tv({
  base: '',
  variants: {
    variant: {
      default: '',
      accent: '',
      success: 'toast__action--variant-success',
      warning: 'toast__action--variant-warning',
      danger: '',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export const toastClassNames = combineStyles({
  root,
  background,
  cover,
  coverEdge,
  label,
  description,
  action,
});

export const toastStyleSheet = StyleSheet.create({
  root: {
    borderCurve: 'continuous',
  },
});
