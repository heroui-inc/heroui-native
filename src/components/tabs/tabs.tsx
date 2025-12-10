import {
  forwardRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  ScrollView,
  useWindowDimensions,
  type LayoutChangeEvent,
  type ViewStyle,
} from 'react-native';
import Animated from 'react-native-reanimated';
import { AnimationSettingsProvider } from '../../helpers/contexts/animation-settings-context';
import * as TabsPrimitives from '../../primitives/tabs';
import type * as TabsPrimitivesTypes from '../../primitives/tabs/tabs.types';
import {
  useTabsIndicatorAnimation,
  useTabsRootAnimation,
} from './tabs.animation';
import { DISPLAY_NAME } from './tabs.constants';
import { MeasurementsContext, useTabsMeasurements } from './tabs.context';
import tabsStyles from './tabs.styles';
import type {
  ItemMeasurements,
  TabsContentProps,
  TabsIndicatorProps,
  TabsLabelProps,
  TabsListProps,
  TabsProps,
  TabsScrollViewProps,
  TabsTriggerProps,
  TabsTriggerRenderProps,
} from './tabs.types';

const AnimatedIndicator = Animated.createAnimatedComponent(
  TabsPrimitives.Indicator
);

const useTabs = TabsPrimitives.useRootContext;
const useTabsTrigger = TabsPrimitives.useTriggerContext;

// --------------------------------------------------

const TabsRoot = forwardRef<TabsPrimitivesTypes.RootRef, TabsProps>(
  (props, ref) => {
    const {
      children,
      value,
      onValueChange,
      className,
      variant = 'pill',
      animation,
      ...restProps
    } = props;

    const [measurements, setMeasurementsState] = useState<
      Record<string, ItemMeasurements>
    >({});

    const setMeasurements = useCallback(
      (key: string, newMeasurements: ItemMeasurements) => {
        setMeasurementsState((prev) => ({
          ...prev,
          [key]: newMeasurements,
        }));
      },
      []
    );

    const { isAllAnimationsDisabled } = useTabsRootAnimation({ animation });

    const animationSettingsContextValue = useMemo(
      () => ({
        isAllAnimationsDisabled,
      }),
      [isAllAnimationsDisabled]
    );

    const tvStyles = tabsStyles.root({ className });

    return (
      <AnimationSettingsProvider value={animationSettingsContextValue}>
        <MeasurementsContext.Provider
          value={{ measurements, setMeasurements, variant }}
        >
          <TabsPrimitives.Root
            ref={ref}
            value={value}
            onValueChange={onValueChange}
            className={tvStyles}
            {...restProps}
          >
            {children}
          </TabsPrimitives.Root>
        </MeasurementsContext.Provider>
      </AnimationSettingsProvider>
    );
  }
);

// --------------------------------------------------

const TabsList = forwardRef<TabsPrimitivesTypes.ListRef, TabsListProps>(
  (props, ref) => {
    const { children, className, style, ...restProps } = props;

    const { variant } = useTabsMeasurements();

    const tvStyles = tabsStyles.list({ variant, className });

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

const TabsScrollView = forwardRef<ScrollView, TabsScrollViewProps>(
  (props, ref) => {
    const {
      children,
      className,
      contentContainerClassName,
      showsHorizontalScrollIndicator = false,
      scrollAlign = 'center',
      ...restProps
    } = props;

    const { value } = useTabs();
    const { measurements, variant } = useTabsMeasurements();
    const { width: screenWidth } = useWindowDimensions();

    const scrollViewStyles = tabsStyles.scrollView({ variant, className });
    const contentContainerStyles = tabsStyles.scrollViewContentContainer({
      variant,
      className: contentContainerClassName,
    });

    const scrollRef = useRef<ScrollView>(null);

    useEffect(() => {
      if (scrollAlign === 'none' || !measurements[value]) return;

      const itemMeasurement = measurements[value];
      let scrollToX = 0;

      if (scrollAlign === 'start') {
        scrollToX = itemMeasurement.x;
      } else if (scrollAlign === 'center') {
        const itemCenter = itemMeasurement.x + itemMeasurement.width / 2;
        scrollToX = itemCenter - screenWidth / 2;
      } else if (scrollAlign === 'end') {
        scrollToX = itemMeasurement.x + itemMeasurement.width - screenWidth;
      }

      scrollRef.current?.scrollTo({
        x: Math.max(0, scrollToX),
        animated: true,
      });
    }, [value, measurements, scrollAlign, screenWidth]);

    return (
      <ScrollView
        ref={(instance) => {
          scrollRef.current = instance;
          if (typeof ref === 'function') {
            ref(instance);
          } else if (ref) {
            ref.current = instance;
          }
        }}
        horizontal
        showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
        className={scrollViewStyles}
        contentContainerClassName={contentContainerStyles}
        {...restProps}
      >
        {children}
      </ScrollView>
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
  const { setMeasurements } = useTabsMeasurements();
  const { value: rootValue } = useTabs();

  const isSelected = rootValue === value;

  const tvStyles = tabsStyles.trigger({ isDisabled, className });

  const handleLayout = useCallback(
    (event: LayoutChangeEvent) => {
      const { width, height, x } = event.nativeEvent.layout;
      setMeasurements(value, { width, height, x });
    },
    [value, setMeasurements]
  );

  const renderProps: TabsTriggerRenderProps = {
    isSelected,
    value,
    isDisabled,
  };

  const content =
    typeof children === 'function' ? children(renderProps) : children;

  return (
    <TabsPrimitives.Trigger
      ref={ref}
      value={value}
      disabled={isDisabled}
      className={tvStyles}
      style={[tabsStyles.styleSheet.triggerRoot, style as ViewStyle]}
      onLayout={handleLayout}
      {...restProps}
    >
      {content}
    </TabsPrimitives.Trigger>
  );
});

// --------------------------------------------------

const TabsLabel = forwardRef<TabsPrimitivesTypes.LabelRef, TabsLabelProps>(
  (props, ref) => {
    const { children, className, ...restProps } = props;

    const tvStyles = tabsStyles.label({ className });

    return (
      <TabsPrimitives.Label ref={ref} className={tvStyles} {...restProps}>
        {children}
      </TabsPrimitives.Label>
    );
  }
);

// --------------------------------------------------

const TabsIndicator = forwardRef<
  TabsPrimitivesTypes.IndicatorRef,
  TabsIndicatorProps
>((props, ref) => {
  const { children, className, style, animation, ...restProps } = props;

  const { variant } = useTabsMeasurements();

  const { rContainerStyle } = useTabsIndicatorAnimation({
    animation,
    style: style as ViewStyle | undefined,
  });

  const tvStyles = tabsStyles.indicator({ variant, className });

  return (
    <AnimatedIndicator
      ref={ref}
      className={tvStyles}
      style={[rContainerStyle, style]}
      {...restProps}
    >
      {children}
    </AnimatedIndicator>
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
TabsScrollView.displayName = DISPLAY_NAME.SCROLL_VIEW;
TabsTrigger.displayName = DISPLAY_NAME.TRIGGER;
TabsLabel.displayName = DISPLAY_NAME.LABEL;
TabsIndicator.displayName = DISPLAY_NAME.INDICATOR;
TabsContent.displayName = DISPLAY_NAME.CONTENT;

/**
 * Compound Tabs component with sub-components
 *
 * @component Tabs - Main container for the tabs system
 *
 * @component Tabs.List - Container for tab triggers
 *
 * @component Tabs.ScrollView - Scrollable wrapper for tab triggers
 *
 * @component Tabs.Trigger - Individual tab button
 *
 * @component Tabs.Label - Label text for tab triggers
 *
 * @component Tabs.Indicator - Visual indicator for active tab
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
  /** Scrollable wrapper for tab triggers */
  ScrollView: TabsScrollView,
  /** Individual tab button */
  Trigger: TabsTrigger,
  /** Label text for tab triggers */
  Label: TabsLabel,
  /** Visual indicator for active tab */
  Indicator: TabsIndicator,
  /** Content panel for each tab */
  Content: TabsContent,
});

export { useTabs, useTabsMeasurements, useTabsTrigger };
export default Tabs;
