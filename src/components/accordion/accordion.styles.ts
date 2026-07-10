import { StyleSheet } from 'react-native';
import { tv } from '../../helpers/external/utils/cn';
import { combineStyles } from '../../helpers/internal/utils';

const root = tv({
  slots: {
    container: 'accordion__root-container',
    separator: 'accordion__root-separator',
  },
  variants: {
    variant: {
      default: {
        container: '',
        separator: '',
      },
      surface: {
        container: 'accordion__root-container--variant-surface',
        separator: 'accordion__root-separator--variant-surface',
      },
    },
  },
  defaultVariants: {
    variant: 'default',
  },
});

const item = tv({
  base: 'accordion__item',
});

const trigger = tv({
  base: 'accordion__trigger',
  variants: {
    variant: {
      default: '',
      surface: 'accordion__trigger--variant-surface',
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
  base: 'accordion__indicator',
});

const content = tv({
  base: 'accordion__content',
  variants: {
    variant: {
      default: '',
      surface: 'accordion__content--variant-surface',
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
