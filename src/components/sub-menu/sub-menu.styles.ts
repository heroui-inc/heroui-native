import { StyleSheet } from 'react-native';
import { tv } from 'tailwind-variants';
import { combineStyles } from '../../helpers/internal/utils';

const root = tv({
  base: 'absolute top-0 left-0 right-0 bg-overlay rounded-3xl overflow-hidden',
  variants: {
    isOpen: {
      true: 'outline outline-border/20 shadow-overlay',
    },
  },
  defaultVariants: {
    isOpen: false,
  },
});

/** Trigger styled as a menu item row. */
const trigger = tv({
  base: 'flex-row items-center gap-2.5 px-2.5 py-2',
  variants: {
    isDisabled: {
      true: 'opacity-disabled pointer-events-none',
    },
    isOtherSubMenuOpen: {
      true: 'opacity-40 pointer-events-none',
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
  base: 'items-center justify-center',
});

/** SubMenu content positioned absolutely below the trigger. */
const content = tv({
  base: 'absolute left-0 right-0 px-1.5 pb-3',
});

export const subMenuClassNames = combineStyles({
  root,
  trigger,
  triggerIndicator,
  content,
});

export const subMenuStyleSheet = StyleSheet.create({
  borderCurve: {
    borderCurve: 'continuous',
  },
});
