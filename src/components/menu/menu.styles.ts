import { StyleSheet } from 'react-native';
import { tv } from '../../helpers/external/utils/cn';
import { combineStyles } from '../../helpers/internal/utils';

const portal = tv({
  base: 'menu__portal',
});

/**
 * Overlay style definition
 *
 * @note ANIMATED PROPERTIES (cannot be set via className):
 * - `opacity` - Animated for overlay show/hide transitions (idle: 0, open: 1, close: 0)
 */
const overlay = tv({
  base: 'menu__overlay',
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
  base: 'menu__content',
  variants: {
    isSubMenuOpen: {
      true: 'menu__content--is-sub-menu-open',
      false: 'menu__content--is-sub-menu-open-false',
    },
  },
});

const contentBottomSheet = tv({
  base: 'menu__content-bottom-sheet',
});

/**
 * @note When Menu.Content uses `presentation="bottom-sheet"`, it uses `bottomSheetClassNames`
 * from `../bottom-sheet/bottom-sheet.styles` instead of `menuClassNames.content`.
 */

const close = tv({
  base: '',
});

const label = tv({
  base: 'menu__label',
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
  base: 'menu__item',
  variants: {
    isDisabled: {
      true: 'disabled:element-disabled',
    },
    isOutsideSubMenuOnOpen: {
      true: 'menu__item--is-outside-sub-menu-on-open',
    },
  },
});

const itemTitle = tv({
  base: 'menu__item-title',
  variants: {
    variant: {
      default: 'menu__item-title--variant-default',
      danger: 'menu__item-title--variant-danger',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const itemDescription = tv({
  base: 'menu__item-description',
});

const itemIndicator = tv({
  base: 'menu__item-indicator',
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
