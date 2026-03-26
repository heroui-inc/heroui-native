import { StyleSheet } from 'react-native';
import { tv } from 'tailwind-variants';
import { combineStyles } from '../../helpers/internal/utils';

const root = tv({
  base: 'flex-col gap-2',
});

const list = tv({
  base: 'self-start flex-row items-center gap-1',
  variants: {
    variant: {
      primary: 'p-[3px] rounded-3xl bg-default',
      secondary: 'p-0 border-b border-border',
    },
  },
  defaultVariants: {
    variant: 'primary',
    isScrollView: false,
  },
});

const scrollView = tv({
  base: '',
  variants: {
    variant: {
      primary: '-my-[3px] rounded-3xl',
      secondary: '',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

const scrollViewContentContainer = tv({
  base: '',
  variants: {
    variant: {
      primary: 'py-[3px] px-px',
      secondary: '',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

const trigger = tv({
  base: 'flex-row items-center justify-center px-3 py-1.5 gap-1.5',
  variants: {
    isDisabled: {
      true: 'disabled:opacity-disabled disabled:pointer-events-none',
      false: '',
    },
  },
  defaultVariants: {
    isDisabled: false,
  },
});

const label = tv({
  base: 'text-base font-medium',
  variants: {
    isSelected: {
      true: 'text-segment-foreground',
      false: 'text-muted',
    },
  },
});

/**
 * Indicator style definition
 *
 * @note ANIMATED PROPERTIES (cannot be set via className):
 * The following properties are animated and cannot be overridden using Tailwind classes:
 * - `width` - Animated for indicator width transitions when switching tabs
 * - `height` - Animated for indicator height transitions when switching tabs
 * - `translateX` - Animated for indicator position transitions when switching tabs (uses translateX for GPU-accelerated performance)
 * - `opacity` - Animated for indicator visibility transitions (0 when no active tab, 1 when active tab is selected)
 *
 * To customize these properties, use the `animation` prop on `Tabs.Indicator`:
 * ```tsx
 * <Tabs.Indicator
 *   animation={{
 *     width: { type: 'spring', config: { stiffness: 1200, damping: 120 } },
 *     height: { type: 'spring', config: { stiffness: 1200, damping: 120 } },
 *     translateX: { type: 'timing', config: { duration: 200 } }
 *   }}
 * />
 * ```
 *
 * To completely disable animated styles and apply your own via className or style prop,
 * set `isAnimatedStyleActive={false}` on `Tabs.Indicator`.
 */
const indicator = tv({
  base: 'absolute left-0',
  variants: {
    variant: {
      primary: 'rounded-3xl shadow-sm shadow-surface/25 bg-segment',
      secondary: 'bottom-0 border-b-2 border-accent',
    },
    isScrollView: {
      true: '',
      false: '',
    },
  },
  compoundVariants: [
    {
      variant: 'primary',
      isScrollView: true,
      className: 'top-[3px]',
    },
  ],
  defaultVariants: {
    variant: 'primary',
    isScrollView: false,
  },
});

/**
 * Separator style definition
 *
 * @note ANIMATED PROPERTIES (cannot be set via className):
 * The following properties are animated and cannot be overridden using Tailwind classes:
 * - `opacity` - Animated for separator visibility transitions (0 when not between values, 1 when between values)
 *
 * To customize these properties, use the `animation` prop on `Tabs.Separator`:
 * ```tsx
 * <Tabs.Separator
 *   betweenValues={["tab1", "tab2"]}
 *   animation={{
 *     opacity: { value: [0, 1], timingConfig: { duration: 200 } }
 *   }}
 * />
 * ```
 *
 * To completely disable animated styles and apply your own via className or style prop,
 * set `isAnimatedStyleActive={false}` on `Tabs.Separator`.
 */
const separator = tv({
  base: 'w-px h-3/5 bg-separator/30 self-center',
});

const content = tv({
  base: '',
});

export const tabsClassNames = combineStyles({
  root,
  list,
  scrollView,
  scrollViewContentContainer,
  trigger,
  label,
  indicator,
  separator,
  content,
});

export const tabsStyleSheet = StyleSheet.create({
  listRoot: {
    borderCurve: 'continuous',
  },
  triggerRoot: {
    borderCurve: 'continuous',
  },
});
