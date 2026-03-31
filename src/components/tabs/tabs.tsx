import {
  Children,
  forwardRef,
  isValidElement,
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
import { AnimationSettingsProvider } from '../../helpers/internal/contexts';
import * as TabsPrimitives from '../../primitives/tabs';
import type * as TabsPrimitivesTypes from '../../primitives/tabs/tabs.types';
import {
  useTabsIndicatorAnimation,
  useTabsRootAnimation,
  useTabsSeparatorAnimation,
} from './tabs.animation';
import { DISPLAY_NAME } from './tabs.constants';
import { MeasurementsContext, useTabsMeasurements } from './tabs.context';
import { tabsClassNames, tabsStyleSheet } from './tabs.styles';
import type {
  ItemMeasurements,
  TabsContentProps,
  TabsIndicatorProps,
  TabsLabelProps,
  TabsListProps,
  TabsProps,
  TabsScrollViewProps,
  TabsSeparatorProps,
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
      variant = 'primary',
      animation,
      ...restProps
    } = props;

    const [measurements, setMeasurementsState] = useState<
      Record<string, ItemMeasurements>
    >({});
    const [isScrollView, setIsScrollView] = useState(false);

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

    const rootClassName = tabsClassNames.root({ className });

    return (
      <AnimationSettingsProvider value={animationSettingsContextValue}>
        <MeasurementsContext.Provider
          value={{
            measurements,
            setMeasurements,
            variant,
            isScrollView,
            setIsScrollView,
          }}
        >
          <TabsPrimitives.Root
            ref={ref}
            value={value}
            onValueChange={onValueChange}
            className={rootClassName}
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

    const { variant, setIsScrollView } = useTabsMeasurements();

    const handleLayout = useCallback(() => {
      const childrenArray = Children.toArray(children);
      const hasScrollView =
        childrenArray.length === 1 &&
        isValidElement(childrenArray[0]) &&
        (childrenArray[0].type as any)?.displayName ===
          DISPLAY_NAME.SCROLL_VIEW;
      setIsScrollView(hasScrollView);
    }, [children, setIsScrollView]);

    const listClassName = tabsClassNames.list({ variant, className });

    return (
      <TabsPrimitives.List
        ref={ref}
        className={listClassName}
        style={[tabsStyleSheet.listRoot, style]}
        onLayout={handleLayout}
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

    const scrollViewClassName = tabsClassNames.scrollView({
      variant,
      className,
    });
    const contentContainerClassNameValue =
      tabsClassNames.scrollViewContentContainer({
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
        className={scrollViewClassName}
        contentContainerClassName={contentContainerClassNameValue}
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

  const triggerClassName = tabsClassNames.trigger({ isDisabled, className });

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
      className={triggerClassName}
      style={[tabsStyleSheet.triggerRoot, style as ViewStyle]}
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
    const { isSelected } = useTabsTrigger();

    const labelClassName = tabsClassNames.label({ isSelected, className });

    return (
      <TabsPrimitives.Label ref={ref} className={labelClassName} {...restProps}>
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
  const {
    children,
    className,
    style,
    animation,
    isAnimatedStyleActive = true,
    ...restProps
  } = props;

  const { variant, isScrollView } = useTabsMeasurements();

  const { rContainerStyle } = useTabsIndicatorAnimation({
    animation,
  });

  const indicatorClassName = tabsClassNames.indicator({
    variant,
    isScrollView,
    className,
  });

  const indicatorStyle = isAnimatedStyleActive
    ? [rContainerStyle, style]
    : style;

  return (
    <AnimatedIndicator
      ref={ref}
      className={indicatorClassName}
      style={indicatorStyle}
      {...restProps}
    >
      {children}
    </AnimatedIndicator>
  );
});

// --------------------------------------------------

const TabsSeparator = forwardRef<Animated.View, TabsSeparatorProps>(
  (props, ref) => {
    const {
      betweenValues,
      isAlwaysVisible = false,
      animation,
      isAnimatedStyleActive = true,
      className,
      style,
      ...restProps
    } = props;

    const { rContainerStyle } = useTabsSeparatorAnimation({
      animation,
      betweenValues,
      isAlwaysVisible,
    });

    const separatorClassName = tabsClassNames.separator({ className });

    const separatorStyle = isAnimatedStyleActive
      ? [rContainerStyle, style]
      : style;

    return (
      <Animated.View
        ref={ref}
        className={separatorClassName}
        style={separatorStyle}
        {...restProps}
      />
    );
  }
);

// --------------------------------------------------

const TabsContent = forwardRef<
  TabsPrimitivesTypes.ContentRef,
  TabsContentProps
>((props, ref) => {
  const { children, value, className, ...restProps } = props;

  const contentClassName = tabsClassNames.content({ className });

  return (
    <TabsPrimitives.Content
      ref={ref}
      value={value}
      className={contentClassName}
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
TabsSeparator.displayName = DISPLAY_NAME.SEPARATOR;
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
 * @component Tabs.Separator - Visual separator between tabs
 *
 * @component Tabs.Content - Content panel for each tab
 *
 * Props flow from Tabs to sub-components via context.
 *
 * @see Full documentation: https://heroui.com/docs/native/components/tabs
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
  /** Visual separator between tabs */
  Separator: TabsSeparator,
  /** Content panel for each tab */
  Content: TabsContent,
});

export { useTabs, useTabsMeasurements, useTabsTrigger };
export default Tabs;
