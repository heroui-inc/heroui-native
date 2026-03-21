import { StyleSheet } from 'react-native';
import { tv } from 'tailwind-variants';
import { combineStyles } from '../../helpers/internal/utils';

/**
 * Toast root styles
 *
 * @note ANIMATED PROPERTIES (cannot be set via className):
 * The following properties are animated and cannot be overridden using Tailwind classes:
 * - `opacity` - Animated for visibility transitions when toasts are pushed beyond visible stack limits
 * - `transform` (translateY) - Animated for vertical position transitions when toasts are stacked, and for swipe-to-dismiss gestures
 * - `transform` (scale) - Animated for size scaling transitions when toasts are stacked (toasts behind active one are scaled down)
 * - `height` - Animated for height transitions when toast content changes
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
  base: 'bg-surface rounded-3xl p-4 shadow-overlay overflow-hidden',
});

const label = tv({
  base: 'text-base font-medium',
  variants: {
    variant: {
      default: 'text-foreground',
      accent: 'text-foreground',
      success: 'text-success',
      warning: 'text-warning',
      danger: 'text-danger',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const description = tv({
  base: 'text-sm text-muted',
});

const action = tv({
  base: '',
  variants: {
    variant: {
      default: '',
      accent: '',
      success: 'bg-success',
      warning: 'bg-warning',
      danger: '',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export const toastClassNames = combineStyles({
  root,
  label,
  description,
  action,
});

export const toastStyleSheet = StyleSheet.create({
  root: {
    borderCurve: 'continuous',
  },
});
