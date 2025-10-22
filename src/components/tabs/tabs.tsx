import { forwardRef } from 'react';
import * as TabsPrimitives from '../../primitives/tabs';
import type * as TabsPrimitivesTypes from '../../primitives/tabs/tabs.types';
import { DISPLAY_NAME } from './tabs.constants';
import tabsStyles from './tabs.styles';
import type {
  TabsContentProps,
  TabsListProps,
  TabsProps,
  TabsTriggerProps,
} from './tabs.types';

// --------------------------------------------------

const TabsRoot = forwardRef<TabsPrimitivesTypes.RootRef, TabsProps>(
  (props, ref) => {
    const { children, value, onValueChange, className, ...restProps } = props;

    const tvStyles = tabsStyles.root({ className });

    return (
      <TabsPrimitives.Root
        ref={ref}
        value={value}
        onValueChange={onValueChange}
        className={tvStyles}
        {...restProps}
      >
        {children}
      </TabsPrimitives.Root>
    );
  }
);

// --------------------------------------------------

const TabsList = forwardRef<TabsPrimitivesTypes.ListRef, TabsListProps>(
  (props, ref) => {
    const { children, className, style, ...restProps } = props;

    const tvStyles = tabsStyles.list({ className });

    return (
      <TabsPrimitives.List
        ref={ref}
        className={tvStyles}
        style={[tabsStyles.styleSheet.listRoot, style]}
        {...restProps}
      >
        {children}
      </TabsPrimitives.List>
    );
  }
);

// --------------------------------------------------

const TabsTrigger = forwardRef<
  TabsPrimitivesTypes.TriggerRef,
  TabsTriggerProps
>((props, ref) => {
  const {
    children,
    value,
    isDisabled = false,
    className,
    style,
    ...restProps
  } = props;
  const { value: selectedValue } = TabsPrimitives.useRootContext();

  const isSelected = selectedValue === value;
  const tvStyles = tabsStyles.trigger({ isSelected, isDisabled, className });

  return (
    <TabsPrimitives.Trigger
      ref={ref}
      value={value}
      disabled={isDisabled}
      className={tvStyles}
      style={[tabsStyles.styleSheet.triggerRoot, style]}
      {...restProps}
    >
      {children}
    </TabsPrimitives.Trigger>
  );
});

// --------------------------------------------------

const TabsContent = forwardRef<
  TabsPrimitivesTypes.ContentRef,
  TabsContentProps
>((props, ref) => {
  const { children, value, className, ...restProps } = props;

  const tvStyles = tabsStyles.content({ className });

  return (
    <TabsPrimitives.Content
      ref={ref}
      value={value}
      className={tvStyles}
      {...restProps}
    >
      {children}
    </TabsPrimitives.Content>
  );
});

// --------------------------------------------------

TabsRoot.displayName = DISPLAY_NAME.ROOT;
TabsList.displayName = DISPLAY_NAME.LIST;
TabsTrigger.displayName = DISPLAY_NAME.TRIGGER;
TabsContent.displayName = DISPLAY_NAME.CONTENT;

/**
 * Compound Tabs component with sub-components
 *
 * @component Tabs - Main container for the tabs system
 *
 * @component Tabs.List - Container for tab triggers
 *
 * @component Tabs.Trigger - Individual tab button
 *
 * @component Tabs.Content - Content panel for each tab
 *
 * Props flow from Tabs to sub-components via context.
 *
 * @see Full documentation: https://heroui.com/components/tabs
 */
const Tabs = Object.assign(TabsRoot, {
  /** Container for tab triggers */
  List: TabsList,
  /** Individual tab button */
  Trigger: TabsTrigger,
  /** Content panel for each tab */
  Content: TabsContent,
});

export default Tabs;
