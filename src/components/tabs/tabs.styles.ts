import { StyleSheet } from 'react-native';
import { tv } from 'tailwind-variants';
import { combineStyles } from '../../helpers/theme/utils/combine-styles';

const root = tv({
  base: 'flex-col gap-2',
});

const list = tv({
  base: 'self-start flex-row items-center gap-1',
  variants: {
    variant: {
      pill: 'rounded-3xl bg-default p-[3px]',
      line: 'border-b border-border',
    },
  },
  defaultVariants: {
    variant: 'pill',
  },
});

const scrollView = tv({
  base: '',
  variants: {
    variant: {
      pill: 'rounded-3xl',
      line: '',
    },
  },
  defaultVariants: {
    variant: 'pill',
  },
});

const scrollViewContentContainer = tv({
  base: '',
  variants: {
    variant: {
      pill: '',
      line: 'px-4',
    },
  },
  defaultVariants: {
    variant: 'pill',
  },
});

const trigger = tv({
  base: 'flex-row items-center justify-center px-3 py-1.5 gap-1.5',
  variants: {
    isDisabled: {
      true: 'opacity-disabled pointer-events-none',
      false: '',
    },
  },
  defaultVariants: {
    isDisabled: false,
  },
});

const label = tv({
  base: 'text-base font-medium text-segment-foreground',
});

/**
 * Indicator style definition
 *
 * @note ANIMATED PROPERTIES (cannot be set via className):
 * The following properties are animated and cannot be overridden using Tailwind classes:
 * - `width` - Animated for indicator width transitions when switching tabs
 * - `height` - Animated for indicator height transitions when switching tabs
 * - `left` - Animated for indicator position transitions when switching tabs
 * - `opacity` - Animated for indicator visibility transitions (0 when no active tab, 1 when active tab is selected)
 *
 * To customize these properties, use the `animation` prop on `Tabs.Indicator`:
 * ```tsx
 * <Tabs.Indicator
 *   animation={{
 *     width: { type: 'spring', config: { stiffness: 1200, damping: 120 } },
 *     height: { type: 'spring', config: { stiffness: 1200, damping: 120 } },
 *     left: { type: 'timing', config: { duration: 200 } }
 *   }}
 * />
 * ```
 *
 * To completely disable animated styles and apply your own via className or style prop,
 * set `isAnimatedStyleActive={false}` on `Tabs.Indicator`.
 */
const indicator = tv({
  base: 'absolute',
  variants: {
    variant: {
      pill: 'rounded-3xl shadow-sm dark:shadow-none shadow-black/5 bg-segment',
      line: 'border-b-2 border-accent bottom-0',
    },
  },
  defaultVariants: {
    variant: 'pill',
  },
});

const content = tv({
  base: '',
});

export const styleSheet = StyleSheet.create({
  listRoot: {
    borderCurve: 'continuous',
  },
  triggerRoot: {
    borderCurve: 'continuous',
  },
});

const tabsStyles = combineStyles({
  root,
  list,
  scrollView,
  scrollViewContentContainer,
  trigger,
  label,
  indicator,
  content,
  styleSheet,
});

export default tabsStyles;
