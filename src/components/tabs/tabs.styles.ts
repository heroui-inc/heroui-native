import { StyleSheet } from 'react-native';
import { tv } from '../../helpers/external/utils/cn';
import { combineStyles } from '../../helpers/internal/utils';

const root = tv({
  base: 'tabs__root',
});

const list = tv({
  base: 'tabs__list',
  variants: {
    variant: {
      primary: 'tabs__list--variant-primary',
      secondary: 'tabs__list--variant-secondary',
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
      primary: 'tabs__scroll-view--variant-primary',
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
      primary: 'tabs__scroll-view-content-container--variant-primary',
      secondary: '',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

const trigger = tv({
  base: 'tabs__trigger',
  variants: {
    isDisabled: {
      true: 'disabled:element-disabled',
      false: '',
    },
  },
  defaultVariants: {
    isDisabled: false,
  },
});

const label = tv({
  base: 'tabs__label',
  variants: {
    isSelected: {
      true: 'tabs__label--is-selected',
      false: 'tabs__label--is-selected-false',
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
/**
 * @note `shadow-sm shadow-surface/25` stays as Tailwind utilities because the
 * shadow-size + shadow-color-opacity combination has no direct CSS-class
 * equivalent in the uniwind CSS parser.
 */
const indicator = tv({
  base: 'tabs__indicator',
  variants: {
    variant: {
      primary: 'tabs__indicator--variant-primary shadow-sm shadow-surface/25',
      secondary: 'tabs__indicator--variant-secondary',
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
      className: 'tabs__indicator--variant-primary--is-scroll-view',
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
  base: 'tabs__separator',
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
