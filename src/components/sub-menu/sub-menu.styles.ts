import { StyleSheet } from 'react-native';
import { tv } from '../../helpers/external/utils/cn';
import { combineStyles } from '../../helpers/internal/utils';

const root = tv({
  base: 'sub-menu__root',
  variants: {
    isOpen: {
      true: 'sub-menu__root--is-open',
    },
  },
  defaultVariants: {
    isOpen: false,
  },
});

/**
 * Background style definition — absolute-fill container behind the open
 * sub-menu surface, hosting theme-specific layers (e.g. glass blur) or
 * custom content (gradients, images).
 */
const background = tv({
  base: 'sub-menu__background',
});

/** Trigger styled as a menu item row. */
const trigger = tv({
  base: 'sub-menu__trigger',
  variants: {
    isDisabled: {
      true: 'sub-menu__trigger--is-disabled',
    },
    isOtherSubMenuOpen: {
      true: 'sub-menu__trigger--is-other-sub-menu-open',
    },
  },
});

/**
 * Trigger indicator style definition.
 *
 * @note ANIMATED PROPERTIES (cannot be set via className):
 * - `transform` (specifically `rotate`) - Animated for open/close rotation transitions
 */
const triggerIndicator = tv({
  base: 'sub-menu__trigger-indicator',
});

/** SubMenu content positioned absolutely below the trigger. */
const content = tv({
  base: 'sub-menu__content',
});

export const subMenuClassNames = combineStyles({
  root,
  background,
  trigger,
  triggerIndicator,
  content,
});

export const subMenuStyleSheet = StyleSheet.create({
  borderCurve: {
    borderCurve: 'continuous',
  },
});
