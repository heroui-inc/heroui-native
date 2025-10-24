import type { ScrollViewProps } from 'react-native';
import type {
  WithSpringConfig,
  WithTimingConfig,
} from 'react-native-reanimated';
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
 * Animation configuration for the Tabs indicator
 */
export type TabsIndicatorAnimationConfig =
  | {
      type: 'spring';
      config?: WithSpringConfig;
    }
  | {
      type: 'timing';
      config?: WithTimingConfig;
    };

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
   * Animation configuration for the indicator
   * @default { type: 'spring' }
   */
  animationConfig?: TabsIndicatorAnimationConfig;
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
 * Context value shared between Tabs compound components
 */
export interface TabsContextValue {
  /**
   * The currently selected tab value
   */
  value: string;
}
