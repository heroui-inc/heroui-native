import { StyleSheet } from 'react-native';
import { tv } from 'tailwind-variants';
import { combineStyles } from '../../helpers/internal/utils';

const root = tv({
  slots: {
    container: 'flex-col overflow-hidden',
    separator: 'h-hairline bg-separator',
  },
  variants: {
    variant: {
      default: {
        container: '',
        separator: '',
      },
      surface: {
        container:
          'bg-surface rounded-3xl border border-surface shadow-surface',
        separator: 'mx-3',
      },
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const item = tv({
  base: 'flex-col overflow-hidden',
});

const trigger = tv({
  base: 'flex-row items-center justify-between py-4 px-3 gap-4 bg-transparent z-10',
  variants: {
    variant: {
      default: '',
      surface: 'px-5',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

/**
 * Indicator style definition
 *
 * @note ANIMATED PROPERTIES (cannot be set via className):
 * The following property is animated and cannot be overridden using Tailwind classes:
 * - `transform` (specifically `rotate`) - Animated for expand/collapse rotation transitions
 *
 * To customize this property, use the `animation` prop on `Accordion.Indicator`:
 * ```tsx
 * <Accordion.Indicator
 *   animation={{
 *     rotation: { value: [0, -180], springConfig: { damping: 140, stiffness: 1000, mass: 4 } }
 *   }}
 * />
 * ```
 *
 * To completely disable animated styles and apply your own via className or style prop,
 * set `isAnimatedStyleActive={false}` on `Accordion.Indicator`.
 */
const indicator = tv({
  base: 'items-center justify-center',
});

const content = tv({
  base: 'px-3 pb-4 bg-transparent',
  variants: {
    variant: {
      default: '',
      surface: 'px-5',
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

export const accordionClassNames = combineStyles({
  root,
  item,
  trigger,
  indicator,
  content,
});

export const accordionStyleSheet = StyleSheet.create({
  root: {
    borderCurve: 'continuous',
  },
});

export type RootSlots = keyof ReturnType<typeof root>;
