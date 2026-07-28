import { StyleSheet } from 'react-native';
import { tv } from '../../helpers/external/utils/cn';
import { combineStyles } from '../../helpers/internal/utils';

const trigger = tv({
  base: '',
  variants: {
    variant: {
      default: 'select__trigger--variant-default',
      unstyled: '',
    },
    isDisabled: {
      true: 'select__trigger--is-disabled',
      false: '',
    },
  },
});

/**
 * Trigger background style definition — absolute-fill container behind the
 * default variant's trigger surface, hosting theme-specific layers (e.g.
 * glass blur) or custom content (gradients, images).
 */
const triggerBackground = tv({
  base: 'select__trigger-background',
});

const value = tv({
  base: 'select__value',
  variants: {
    isSelected: {
      true: 'select__value--is-selected',
      false: 'select__value--is-selected-false',
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
  base: 'select__trigger-indicator',
});

const portal = tv({
  base: 'select__portal',
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
  base: 'select__overlay',
});

/**
 * Popover content style definition
 */
const content = tv({
  base: 'select__content',
});

/**
 * Content background style definition — absolute-fill container behind the
 * select content (shared by popover and dialog presentations), hosting
 * theme-specific layers (e.g. glass blur) or custom content (gradients,
 * images).
 */
const contentBackground = tv({
  base: 'select__content-background',
});

/**
 * Dialog content style definition
 */
const dialogContent = tv({
  slots: {
    wrapper: 'select__dialog-content-wrapper',
    content: 'select__dialog-content',
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
  base: 'select__list-label',
});

const item = tv({
  base: 'select__item',
});

const itemLabel = tv({
  base: 'select__item-label',
});

const itemDescription = tv({
  base: 'select__item-description',
});

const itemIndicator = tv({
  base: 'select__item-indicator',
});

export const selectClassNames = combineStyles({
  trigger,
  triggerBackground,
  portal,
  overlay,
  content,
  contentBackground,
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
