import { StyleSheet } from 'react-native';
import { tv } from 'tailwind-variants';
import { combineStyles } from '../../helpers/internal/utils';

const trigger = tv({
  base: '',
  variants: {
    variant: {
      default:
        'flex-row items-center justify-between gap-3 py-3.5 px-4 rounded-2xl bg-surface shadow-surface',
      unstyled: '',
    },
    isDisabled: {
      true: 'opacity-disabled pointer-events-none',
      false: '',
    },
  },
});

const value = tv({
  base: 'flex-1 text-base',
  variants: {
    isSelected: {
      true: 'text-foreground',
      false: 'text-field-placeholder',
    },
  },
});

/**
 * Trigger Indicator style definition
 *
 * @note ANIMATED PROPERTIES (cannot be set via className):
 * The following property is animated and cannot be overridden using Tailwind classes:
 * - `transform` (specifically `rotate`) - Animated for open/close rotation transitions
 *
 * To customize this property, use the `animation` prop on `Select.TriggerIndicator`:
 * ```tsx
 * <Select.TriggerIndicator
 *   animation={{
 *     rotation: { value: [0, -180], springConfig: { damping: 140, stiffness: 1000, mass: 4 } }
 *   }}
 * />
 * ```
 *
 * To completely disable animated styles and apply your own via className or style prop,
 * set `isAnimatedStyleActive={false}` on `Select.TriggerIndicator`.
 */
const triggerIndicator = tv({
  base: 'items-center justify-center',
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
 */
const content = tv({
  base: 'bg-overlay p-3 rounded-3xl shadow-overlay',
});

/**
 * Dialog content style definition
 */
const dialogContent = tv({
  slots: {
    wrapper: 'absolute inset-0 justify-center p-5',
    content: 'bg-overlay p-5 rounded-3xl shadow-overlay',
  },
});

/**
 * @note When Select.Content uses `presentation="bottom-sheet"`, it uses `bottomSheetClassNames`
 * from `../bottom-sheet/bottom-sheet.styles` instead of `selectClassNames.content`.
 * See `select.tsx` SelectContentBottomSheet component for usage.
 */

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

export const selectClassNames = combineStyles({
  trigger,
  portal,
  overlay,
  content,
  dialogContent,
  close,
  value,
  item,
  itemLabel,
  itemDescription,
  itemIndicator,
  listLabel,
  triggerIndicator,
});

export const selectStyleSheet = StyleSheet.create({
  contentContainer: {
    borderCurve: 'continuous',
  },
});

export type DialogContentFallbackSlots = keyof ReturnType<typeof dialogContent>;
