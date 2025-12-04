import type { ScrollViewProps } from 'react-native';
import type {
  WithSpringConfig,
  WithTimingConfig,
} from 'react-native-reanimated';
import type {
  Animation,
  AnimationRootDisableAll,
  AnimationValue,
} from '../../helpers/types/animation';
import type * as TabsPrimitivesTypes from '../../primitives/tabs/tabs.types';

/**
 * Props for the Tabs root component
 */
export interface TabsProps extends TabsPrimitivesTypes.RootProps {
  /**
   * Additional CSS classes for the root element
   */
  className?: string;
  /**
   * React children elements
   */
  children?: React.ReactNode;
  /**
   * Visual variant of the tabs
   * @default 'pill'
   */
  variant?: 'pill' | 'line';
  /**
   * Animation configuration for tabs
   * - `"disable-all"`: Disable all animations including children (cascades down to all child components)
   * - `undefined`: Use default animations
   */
  animation?: AnimationRootDisableAll;
}

/**
 * Props for the TabsList component
 */
export interface TabsListProps extends TabsPrimitivesTypes.ListProps {
  /**
   * Additional CSS classes for the list element
   */
  className?: string;
  /**
   * React children elements
   */
  children?: React.ReactNode;
}

/**
 * Props for the TabsScrollView component
 */
export interface TabsScrollViewProps extends ScrollViewProps {
  /**
   * Additional CSS classes for the scroll view
   */
  className?: string;
  /**
   * Additional CSS classes for the content container
   */
  contentContainerClassName?: string;
  /**
   * React children elements
   */
  children?: React.ReactNode;
  /**
   * Scroll alignment variant for the selected item
   * @default 'center'
   */
  scrollAlign?: 'start' | 'center' | 'end' | 'none';
}

/**
 * Props for the TabsTrigger component
 */
export interface TabsTriggerProps extends TabsPrimitivesTypes.TriggerProps {
  /**
   * The unique value identifying this tab
   */
  value: string;
  /**
   * Whether the trigger is disabled
   * @default false
   */
  isDisabled?: boolean;
  /**
   * Additional CSS classes for the trigger element
   */
  className?: string;
  /**
   * React children elements
   */
  children?: React.ReactNode;
}

/**
 * Props for the TabsLabel component
 */
export interface TabsLabelProps extends TabsPrimitivesTypes.LabelProps {
  /**
   * Additional CSS classes for the label element
   */
  className?: string;
  /**
   * React children elements
   */
  children?: React.ReactNode;
}

/**
 * Spring animation value for tabs indicator properties
 */
type TabsIndicatorSpringAnimationValue = AnimationValue<{
  /**
   * Animation type
   */
  type: 'spring';
  /**
   * Spring animation configuration
   * @default { stiffness: 1200, damping: 120 }
   */
  config?: WithSpringConfig;
}>;

/**
 * Timing animation value for tabs indicator properties
 */
type TabsIndicatorTimingAnimationValue = AnimationValue<{
  /**
   * Animation type
   */
  type: 'timing';
  /**
   * Timing animation configuration
   * @default { duration: 200 }
   */
  config?: WithTimingConfig;
}>;

/**
 * Animation value for tabs indicator properties (width, height, left)
 */
type TabsIndicatorPropertyAnimationValue =
  | TabsIndicatorSpringAnimationValue
  | TabsIndicatorTimingAnimationValue;

/**
 * Animation configuration for tabs indicator component
 */
export type TabsIndicatorAnimation = Animation<{
  /**
   * Width animation configuration
   */
  width?: TabsIndicatorPropertyAnimationValue;
  /**
   * Height animation configuration
   */
  height?: TabsIndicatorPropertyAnimationValue;
  /**
   * Left position animation configuration
   */
  left?: TabsIndicatorPropertyAnimationValue;
}>;

/**
 * Props for the TabsIndicator component
 */
export interface TabsIndicatorProps extends TabsPrimitivesTypes.IndicatorProps {
  /**
   * Additional CSS classes for the indicator element
   */
  className?: string;
  /**
   * React children elements
   */
  children?: React.ReactNode;
  /**
   * Animation configuration for indicator
   * - `false` or `"disabled"`: Disable all animations
   * - `true` or `undefined`: Use default animations
   * - `object`: Custom animation configuration
   */
  animation?: TabsIndicatorAnimation;
}

/**
 * Props for the TabsContent component
 */
export interface TabsContentProps extends TabsPrimitivesTypes.ContentProps {
  /**
   * The value of the tab this content belongs to
   */
  value: string;
  /**
   * Additional CSS classes for the content element
   */
  className?: string;
  /**
   * React children elements
   */
  children?: React.ReactNode;
}

/**
 * Measurements for a tab item
 */
export type ItemMeasurements = {
  width: number;
  height: number;
  x: number;
};

/**
 * Context value for tab measurements
 */
export type MeasurementsContextValue = {
  measurements: Record<string, ItemMeasurements>;
  setMeasurements: (key: string, measurements: ItemMeasurements) => void;
  variant: 'pill' | 'line';
};
