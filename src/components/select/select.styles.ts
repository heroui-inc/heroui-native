import { StyleSheet } from 'react-native';
import { tv } from 'tailwind-variants';

const trigger = tv({
  base: '',
  variants: {
    isDisabled: {
      true: 'opacity-disabled',
    },
  },
});

const value = tv({
  base: 'text-base text-foreground',
});

const portal = tv({
  base: 'absolute inset-0',
});

/**
 * Overlay style definition
 *
 * @note ANIMATED PROPERTIES (cannot be set via className):
 * The following property is animated and cannot be overridden using Tailwind classes:
 * - `opacity` - Animated for overlay show/hide transitions (idle: 0, open: 1, close: 0)
 *
 * To customize this property, use the `animation` prop on `Select.Overlay`:
 * ```tsx
 * <Select.Overlay
 *   animation={{
 *     opacity: { value: [0, 1, 0] }
 *   }}
 * />
 * ```
 *
 * To completely disable animated styles and apply your own via className or style prop,
 * set `isAnimatedStyleActive={false}` on `Select.Overlay`.
 */
const overlay = tv({
  base: 'absolute inset-0',
});

/**
 * Popover content style definition
 *
 * @note ANIMATED PROPERTIES (cannot be set via className):
 * The following properties are animated and cannot be overridden using Tailwind classes:
 * - `opacity` - Animated for content show/hide transitions (idle: 0, open: 1, close: 0)
 * - `transform` (specifically `scale`, `translateX`, `translateY`) - Animated for content show/hide transitions (scale: idle: 0.95, open: 1, close: 0.95; translateX/translateY: based on placement)
 * - `transformOrigin` - Animated for content show/hide transitions (based on placement: 'top', 'bottom', 'left', 'right')
 *
 * To customize these properties, use the `animation` prop on `Select.Content` (popover presentation):
 * ```tsx
 * <Select.Content
 *   presentation="popover"
 *   animation={{
 *     opacity: { value: [0, 1, 0] },
 *     scale: { value: [0.95, 1, 0.95] },
 *     translateX: { value: [4, 0, 4] },
 *     translateY: { value: [4, 0, 4] },
 *     transformOrigin: { value: 'top' }
 *   }}
 * />
 * ```
 *
 * To completely disable animated styles and apply your own via className or style prop,
 * set `isAnimatedStyleActive={false}` on `Select.Content`.
 */
const popoverContent = tv({
  base: 'bg-overlay rounded-3xl border border-border p-3 px-4 shadow-lg shadow-black/5 dark:shadow-none',
});

/**
 * Dialog content style definition
 *
 * @note ANIMATED PROPERTIES (cannot be set via className):
 * The `content` slot has the following animated properties that cannot be overridden using Tailwind classes:
 * - `opacity` - Animated for content show/hide transitions (idle: 0, open: 1, close: 0)
 * - `transform` (specifically `scale`) - Animated for content show/hide transitions (idle: 0.97, open: 1, close: 0.97)
 *
 * To customize these properties, use the `animation` prop on `Select.Content` (dialog presentation):
 * ```tsx
 * <Select.Content
 *   presentation="dialog"
 *   classNames={{
 *     content: "custom-class", // opacity and scale cannot be overridden here
 *     wrapper: "custom-wrapper-class"
 *   }}
 *   animation={{
 *     opacity: { value: [0, 1, 0] },
 *     scale: { value: [0.97, 1, 0.97] }
 *   }}
 * />
 * ```
 *
 * To completely disable animated styles and apply your own via className or style prop,
 * set `isAnimatedStyleActive={false}` on `Select.Content`.
 */
const dialogContent = tv({
  slots: {
    wrapper: 'absolute inset-0 justify-center p-5',
    content: 'bg-overlay rounded-lg border border-border p-5',
  },
});

const close = tv({
  base: '',
});

const listLabel = tv({
  base: 'text-sm text-muted font-medium px-2 py-1.5',
});

const item = tv({
  base: 'flex-row items-center gap-2 px-2 py-3',
});

const itemLabel = tv({
  base: 'flex-1 text-base text-foreground font-medium',
});

const itemDescription = tv({
  base: 'text-sm/snug text-muted',
});

const itemIndicator = tv({
  base: 'size-5 items-center justify-center',
});

const selectStyles = {
  trigger,
  portal,
  overlay,
  popoverContent,
  dialogContent,
  close,
  value,
  item,
  itemLabel,
  itemDescription,
  itemIndicator,
  listLabel,
};

export type DialogContentFallbackSlots = keyof ReturnType<typeof dialogContent>;

export const styleSheet = StyleSheet.create({
  contentContainer: {
    borderCurve: 'continuous',
  },
});

export default selectStyles;
