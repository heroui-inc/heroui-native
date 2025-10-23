import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useState,
} from 'react';
import type { LayoutChangeEvent, ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import * as TabsPrimitives from '../../primitives/tabs';
import type * as TabsPrimitivesTypes from '../../primitives/tabs/tabs.types';
import {
  DEFAULT_INDICATOR_SPRING_CONFIG,
  DISPLAY_NAME,
} from './tabs.constants';
import tabsStyles from './tabs.styles';
import type {
  TabsContentProps,
  TabsIndicatorProps,
  TabsLabelProps,
  TabsListProps,
  TabsProps,
  TabsTriggerProps,
} from './tabs.types';

// --------------------------------------------------

type ItemMeasurements = {
  width: number;
  height: number;
  x: number;
};

type MeasurementsContextValue = {
  measurements: Record<string, ItemMeasurements>;
  setMeasurements: (key: string, measurements: ItemMeasurements) => void;
  variant: 'pill' | 'line';
};

const MeasurementsContext = createContext<MeasurementsContextValue | null>(
  null
);

function useMeasurementsContext() {
  const context = useContext(MeasurementsContext);
  if (!context) {
    throw new Error(
      'Tabs measurement components must be used within Tabs component'
    );
  }
  return context;
}

const AnimatedIndicator = Animated.createAnimatedComponent(
  TabsPrimitives.Indicator
);

// --------------------------------------------------

const TabsRoot = forwardRef<TabsPrimitivesTypes.RootRef, TabsProps>(
  (props, ref) => {
    const {
      children,
      value,
      onValueChange,
      className,
      variant = 'pill',
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

    const tvStyles = tabsStyles.root({ className });

    return (
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
    );
  }
);

// --------------------------------------------------

const TabsList = forwardRef<TabsPrimitivesTypes.ListRef, TabsListProps>(
  (props, ref) => {
    const { children, className, style, ...restProps } = props;
    const { variant } = useMeasurementsContext();

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
  const { setMeasurements } = useMeasurementsContext();

  const tvStyles = tabsStyles.trigger({ isDisabled, className });

  const handleLayout = useCallback(
    (event: LayoutChangeEvent) => {
      const { width, height, x } = event.nativeEvent.layout;
      setMeasurements(value, { width, height, x });
    },
    [value, setMeasurements]
  );

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
      {children}
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
  const {
    children,
    className,
    style,
    animationConfig = {
      type: 'spring',
      config: DEFAULT_INDICATOR_SPRING_CONFIG,
    },
    ...restProps
  } = props;

  const { value } = TabsPrimitives.useRootContext();
  const { measurements, variant } = useMeasurementsContext();

  const activeMeasurements = measurements[value];
  const hasMeasured = useSharedValue(false);

  const reanimatedConfig = animationConfig?.config;

  const animatedStyle = useAnimatedStyle(() => {
    if (!activeMeasurements) {
      return {
        width: 0,
        height: 0,
        left: 0,
        opacity: 0,
      };
    }

    if (!hasMeasured.value) {
      hasMeasured.value = true;
      return {
        width: activeMeasurements.width,
        height: activeMeasurements.height,
        left: activeMeasurements.x,
        opacity: 1,
      };
    }

    return {
      width:
        animationConfig?.type === 'timing'
          ? withTiming(activeMeasurements.width, reanimatedConfig)
          : withSpring(activeMeasurements.width, reanimatedConfig),
      height:
        animationConfig?.type === 'timing'
          ? withTiming(activeMeasurements.height, reanimatedConfig)
          : withSpring(activeMeasurements.height, reanimatedConfig),
      left:
        animationConfig?.type === 'timing'
          ? withTiming(activeMeasurements.x, reanimatedConfig)
          : withSpring(activeMeasurements.x, reanimatedConfig),
      opacity: 1,
    };
  }, [activeMeasurements]);

  const tvStyles = tabsStyles.indicator({ variant, className });

  return (
    <AnimatedIndicator
      ref={ref}
      className={tvStyles}
      style={[animatedStyle, style as ViewStyle]}
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
  /** Individual tab button */
  Trigger: TabsTrigger,
  /** Label text for tab triggers */
  Label: TabsLabel,
  /** Visual indicator for active tab */
  Indicator: TabsIndicator,
  /** Content panel for each tab */
  Content: TabsContent,
});

export default Tabs;
