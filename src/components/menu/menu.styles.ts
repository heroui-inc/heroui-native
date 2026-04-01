import { StyleSheet } from 'react-native';
import { tv } from 'tailwind-variants';
import { combineStyles } from '../../helpers/internal/utils';

const portal = tv({
  base: 'absolute inset-0',
});

/**
 * Overlay style definition
 *
 * @note ANIMATED PROPERTIES (cannot be set via className):
 * - `opacity` - Animated for overlay show/hide transitions (idle: 0, open: 1, close: 0)
 */
const overlay = tv({
  base: 'absolute inset-0',
});

/**
 * Menu content style definition
 *
 * @note ANIMATED PROPERTIES (cannot be set via className):
 * - `opacity` - Animated for content show/hide transitions
 * - `transform` (scale, translateX, translateY) - Animated for content show/hide transitions
 * - `transformOrigin` - Animated based on placement
 */
const content = tv({
  base: 'absolute bg-overlay px-1.5 py-3 rounded-3xl',
  variants: {
    isSubMenuOpen: {
      true: 'shadow-none',
      false: 'shadow-overlay',
    },
  },
});

const contentBottomSheet = tv({
  base: 'px-3',
});

/**
 * @note When Menu.Content uses `presentation="bottom-sheet"`, it uses `bottomSheetClassNames`
 * from `../bottom-sheet/bottom-sheet.styles` instead of `menuClassNames.content`.
 */

const close = tv({
  base: '',
});

const label = tv({
  base: 'text-sm font-medium text-muted ml-3',
});

const group = tv({
  base: '',
});

/**
 * Menu item style definition
 *
 * @note ANIMATED PROPERTIES (cannot be set via className):
 * - `backgroundColor` - Animated for press feedback (transparent → default on press)
 * - `transform` (scale) - Animated for press feedback (1 → 0.98 on press)
 */
const item = tv({
  base: 'flex-row items-center gap-2.5 px-2.5 py-2 rounded-2xl',
  variants: {
    isDisabled: {
      true: 'disabled:opacity-disabled disabled:pointer-events-none',
    },
    isOutsideSubMenuOnOpen: {
      true: 'opacity-40 pointer-events-none',
    },
  },
});

const itemTitle = tv({
  base: 'flex-1 text-base font-medium',
  variants: {
    variant: {
      default: 'text-foreground',
      danger: 'text-danger',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const itemDescription = tv({
  base: 'text-sm/snug text-muted',
});

const itemIndicator = tv({
  base: 'size-5 items-center justify-center',
});

export const menuClassNames = combineStyles({
  portal,
  overlay,
  content,
  contentBottomSheet,
  close,
  label,
  group,
  item,
  itemTitle,
  itemDescription,
  itemIndicator,
});

export const menuStyleSheet = StyleSheet.create({
  borderCurve: {
    borderCurve: 'continuous',
  },
});
