import { StyleSheet } from 'react-native';
import { tv } from '../../helpers/external/utils/cn';
import { combineStyles } from '../../helpers/internal/utils';

const portal = tv({
  base: 'dialog__portal',
});

/**
 * Overlay style definition
 *
 * @note ANIMATED PROPERTIES (cannot be set via className):
 * The following property is animated and cannot be overridden using Tailwind classes:
 * - `opacity` - Animated for overlay show/hide transitions (idle: 0, open: 1, close: 0)
 *
 * To customize this property, use the `animation` prop on `Dialog.Overlay`:
 * ```tsx
 * <Dialog.Overlay
 *   animation={{
 *     opacity: { value: [0, 1, 0] }
 *   }}
 * />
 * ```
 *
 * To completely disable animated styles and apply your own via className or style prop,
 * set `isAnimatedStyleActive={false}` on `Dialog.Overlay`.
 */
const overlay = tv({
  base: 'dialog__overlay',
  variants: {
    variant: {
      default: '',
      blur: 'dialog__overlay--variant-blur',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

/**
 * Content style definition
 *
 * @note ANIMATED PROPERTIES (cannot be set via className):
 * The following properties are animated and cannot be overridden using Tailwind classes:
 * - `opacity` - Animated for content show/hide transitions (idle: 0, open: 1, close: 0)
 * - `transform` (specifically `scale`) - Animated for content show/hide transitions (idle: 0.97, open: 1, close: 0.97)
 *
 * To customize these properties, use the `animation` prop on `Dialog.Content`:
 * ```tsx
 * <Dialog.Content
 *   animation={{
 *     opacity: { value: [0, 1, 0] },
 *     scale: { value: [0.97, 1, 0.97] }
 *   }}
 * />
 * ```
 *
 * To completely disable animated styles and apply your own via className or style prop,
 * set `isAnimatedStyleActive={false}` on `Dialog.Content`.
 */
const content = tv({
  base: 'dialog__content',
});

/**
 * Content background style definition — absolute-fill container behind the
 * dialog content, hosting theme-specific layers (e.g. glass blur) or
 * custom content (gradients, images).
 */
const contentBackground = tv({
  base: 'dialog__content-background',
});

const label = tv({
  base: 'dialog__label',
});

const description = tv({
  base: 'dialog__description',
});

export const dialogClassNames = combineStyles({
  portal,
  overlay,
  content,
  contentBackground,
  label,
  description,
});

export const dialogStyleSheet = StyleSheet.create({
  contentContainer: {
    borderCurve: 'continuous',
  },
});
