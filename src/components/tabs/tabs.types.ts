import type * as TabsPrimitivesTypes from '../../primitives/tabs/tabs.types';

/**
 * Props for the Tabs root component
 */
export interface TabsProps extends TabsPrimitivesTypes.RootProps {
  /**
   * The currently selected tab value
   */
  value: string;
  /**
   * Callback when the selected tab changes
   */
  onValueChange: (value: string) => void;
  /**
   * Additional CSS classes for the root element
   */
  className?: string;
  /**
   * React children elements
   */
  children?: React.ReactNode;
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
