import { Children, forwardRef, useEffect, useMemo } from 'react';
import { StyleSheet, View, type GestureResponderEvent } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import type { ViewRef } from '../../helpers/types';
import { createContext } from '../../helpers/utils';
import * as AccordionPrimitive from '../../primitives/accordion';
import { useTheme } from '../../providers/theme';
import {
  ACCORDION_LAYOUT_TRANSITION,
  DEFAULT_CONTENT_ENTERING,
  DEFAULT_CONTENT_EXITING,
  DEFAULT_ICON_SIZE,
  DISPLAY_NAME,
  HIGHLIGHT_CONFIG,
  INDICATOR_SPRING_CONFIG,
} from './accordion.constants';
import accordionStyles from './accordion.styles';
import type {
  AccordionContentProps,
  AccordionContextValue,
  AccordionIndicatorProps,
  AccordionItemProps,
  AccordionRootProps,
  AccordionTriggerProps,
} from './accordion.types';
import { ChevronDownIcon } from './chevron-down-icon';

const AnimatedRootView = Animated.createAnimatedComponent(
  AccordionPrimitive.Root
);

const AnimatedItemView = Animated.createAnimatedComponent(
  AccordionPrimitive.Item
);

const AnimatedIndicator = Animated.createAnimatedComponent(
  AccordionPrimitive.Indicator
);

// ------------------------------------------------------------------------------

const [AccordionProvider, useAccordionContext] =
  createContext<AccordionContextValue>({
    name: 'AccordionContext',
  });

const useAccordionItemContext = AccordionPrimitive.useItemContext;

// ------------------------------------------------------------------------------

const Root = forwardRef<View, AccordionRootProps>((props, ref) => {
  const {
    children,
    variant = 'default',
    isDividerVisible = true,
    className,
    classNames,
    layout = ACCORDION_LAYOUT_TRANSITION,
    ...restProps
  } = props;

  const { container, divider } = accordionStyles.root({ variant });

  const containerStyles = container({
    className: [className, classNames?.container],
  });

  const dividerStyles = divider({ className: classNames?.divider });

  const contextValue: AccordionContextValue = useMemo(
    () => ({
      variant,
      isDividerVisible,
      layoutTransition: layout,
    }),
    [variant, isDividerVisible, layout]
  );

  return (
    <AccordionProvider value={contextValue}>
      <AnimatedRootView
        ref={ref}
        className={containerStyles}
        style={
          variant === 'border'
            ? accordionStyles.nativeStyles.borderContainer
            : undefined
        }
        layout={layout}
        {...restProps}
      >
        {Children.map(children, (child, index) => (
          <>
            {child}
            {isDividerVisible && index < Children.count(children) - 1 && (
              <Animated.View className={dividerStyles} layout={layout} />
            )}
          </>
        ))}
      </AnimatedRootView>
    </AccordionProvider>
  );
});

// ------------------------------------------------------------------------------

const Item = forwardRef<View, AccordionItemProps>((props, ref) => {
  const { children, layout: layoutProp, className, ...restProps } = props;

  const { layoutTransition } = useAccordionContext();

  const tvStyles = accordionStyles.item({ className });

  return (
    <AnimatedItemView
      ref={ref}
      className={tvStyles}
      layout={layoutProp || layoutTransition}
      {...restProps}
    >
      {children}
    </AnimatedItemView>
  );
});

// ------------------------------------------------------------------------------

const Trigger = forwardRef<View, AccordionTriggerProps>((props, ref) => {
  const {
    children,
    className,
    highlightColor,
    highlightOpacity: highlightOpacityProp = 0.03,
    highlightTimingConfig,
    isHighlightVisible = true,
    ...restProps
  } = props;

  const { variant } = useAccordionContext();

  const { colors } = useTheme();

  const tvStyles = accordionStyles.trigger({
    variant,
    className,
  });

  const highlightOpacity = useSharedValue(0);

  const handlePressIn = (event: GestureResponderEvent) => {
    if (isHighlightVisible) {
      highlightOpacity.set(
        withTiming(
          1,
          highlightTimingConfig || {
            duration: HIGHLIGHT_CONFIG.duration,
            easing: HIGHLIGHT_CONFIG.easing,
          }
        )
      );
    }
    restProps.onPressIn?.(event);
  };

  const handlePressOut = (event: GestureResponderEvent) => {
    if (isHighlightVisible) {
      highlightOpacity.set(
        withTiming(
          0,
          highlightTimingConfig || {
            duration: HIGHLIGHT_CONFIG.duration,
            easing: HIGHLIGHT_CONFIG.easing,
          }
        )
      );
    }
    restProps.onPressOut?.(event);
  };

  const animatedHighlightStyle = useAnimatedStyle(() => ({
    opacity: highlightOpacity.get() * highlightOpacityProp,
    backgroundColor: highlightColor || colors.foreground,
  }));

  return (
    <AccordionPrimitive.Header>
      <AccordionPrimitive.Trigger
        ref={ref}
        className={tvStyles}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        {...restProps}
      >
        {isHighlightVisible && (
          <Animated.View
            style={[StyleSheet.absoluteFill, animatedHighlightStyle]}
          />
        )}
        {children}
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
});

// ------------------------------------------------------------------------------

const Indicator = forwardRef<ViewRef, AccordionIndicatorProps>((props, ref) => {
  const { children, className, iconProps, springConfig, ...restProps } = props;

  const { isExpanded } = useAccordionItemContext();

  const { colors } = useTheme();

  const tvStyles = accordionStyles.indicator({ className });

  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.set(
      withSpring(isExpanded ? 1 : 0, springConfig || INDICATOR_SPRING_CONFIG)
    );
  }, [isExpanded, rotation, springConfig]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate: interpolate(rotation.get(), [0, 1], [0, 180]) + 'deg',
        },
      ],
    };
  });

  if (children) {
    return (
      <AnimatedIndicator ref={ref} className={tvStyles} {...restProps}>
        {children}
      </AnimatedIndicator>
    );
  }

  return (
    <AnimatedIndicator
      ref={ref}
      className={tvStyles}
      style={animatedStyle}
      {...restProps}
    >
      <ChevronDownIcon
        size={iconProps?.size ?? DEFAULT_ICON_SIZE}
        color={iconProps?.color ?? colors.foreground}
      />
    </AnimatedIndicator>
  );
});

// ------------------------------------------------------------------------------

const Content = forwardRef<View, AccordionContentProps>((props, ref) => {
  const { children, className, entering, exiting, ...restProps } = props;

  const { variant } = useAccordionContext();

  const { isExpanded } = useAccordionItemContext();

  const tvStyles = accordionStyles.content({ variant, className });

  if (!isExpanded) {
    return null;
  }

  return (
    <Animated.View
      entering={entering || DEFAULT_CONTENT_ENTERING}
      exiting={exiting || DEFAULT_CONTENT_EXITING}
    >
      <AccordionPrimitive.Content ref={ref} className={tvStyles} {...restProps}>
        {children}
      </AccordionPrimitive.Content>
    </Animated.View>
  );
});

// ------------------------------------------------------------------------------

Root.displayName = DISPLAY_NAME.ROOT;
Item.displayName = DISPLAY_NAME.ITEM;
Trigger.displayName = DISPLAY_NAME.TRIGGER;
Indicator.displayName = DISPLAY_NAME.INDICATOR;
Content.displayName = DISPLAY_NAME.CONTENT;

/**
 * Compound Accordion component with sub-components
 *
 * @component Accordion - Main container that manages the accordion state and behavior.
 * Controls expansion/collapse of items, supports single or multiple selection modes,
 * and provides variant styling (default or border).
 *
 * @component Accordion.Item - Container for individual accordion items.
 * Wraps the trigger and content, managing the expanded state for each item.
 *
 * @component Accordion.Trigger - Interactive element that toggles item expansion.
 * Built on Header and Trigger primitives, includes press feedback animation.
 *
 * @component Accordion.Indicator - Optional visual indicator showing expansion state.
 * Defaults to an animated chevron icon that rotates based on item state.
 *
 * @component Accordion.Content - Container for expandable content.
 * Animated with layout transitions for smooth expand/collapse effects.
 *
 * Props flow from Accordion to sub-components via context (variant, isDividerVisible).
 * Item expansion state is managed by the primitive accordion context.
 *
 * @see Full documentation: https://heroui.com/components/accordion
 */
const CompoundAccordion = Object.assign(Root, {
  /** @required Container for individual accordion items */
  Item,
  /** @required Interactive trigger element with press feedback */
  Trigger,
  /** @optional Visual indicator showing expansion state (defaults to chevron) */
  Indicator,
  /** @required Container for expandable content with animations */
  Content,
});

export default CompoundAccordion;
export { useAccordionContext, useAccordionItemContext };
