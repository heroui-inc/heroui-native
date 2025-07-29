import { createContext, getElementWithDefault } from '@/helpers/utils';
import * as AccordionPrimitive from '@/primitives/accordion';
import * as Slot from '@/primitives/slot';
import { useTheme } from '@/theme';
import React, { forwardRef, useEffect, useMemo } from 'react';
import { Pressable, View, type GestureResponderEvent } from 'react-native';
import Animated, {
  Easing,
  FadeIn,
  FadeOut,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {
  ACCORDION_LAYOUT_TRANSITION,
  DEFAULT_ICON_SIZE,
  DEFAULT_ICON_STROKE_WIDTH,
  DISPLAY_NAME,
  HIGHLIGHT_CONFIG,
  INDICATOR_SPRING_CONFIG,
} from './accordion.constants';
import accordionStyles from './accordion.styles';
import type {
  AccordionContentProps,
  AccordionContextValue,
  AccordionIndicatorProps,
  AccordionIndicatorRef,
  AccordionItemProps,
  AccordionRootProps,
  AccordionTriggerProps,
} from './accordion.types';
import { ChevronDownIcon } from './chevron-down-icon';

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
    showDivider = true,
    className,
    classNames,
    ...restProps
  } = props;

  const { container, divider } = accordionStyles.root({ variant });
  const containerStyles = container({
    className: [className, classNames?.container],
  });
  const dividerStyles = divider({ className: classNames?.divider });

  return (
    <AccordionProvider value={{ variant, showDivider }}>
      <AccordionPrimitive.Root {...restProps} asChild>
        <Animated.View
          ref={ref}
          className={containerStyles}
          style={
            variant === 'border'
              ? accordionStyles.styles.borderContainer
              : undefined
          }
          layout={ACCORDION_LAYOUT_TRANSITION}
        >
          {React.Children.map(children, (child, index) => (
            <>
              {child}
              {showDivider && index < React.Children.count(children) - 1 && (
                <Animated.View
                  className={dividerStyles}
                  layout={ACCORDION_LAYOUT_TRANSITION}
                />
              )}
            </>
          ))}
        </Animated.View>
      </AccordionPrimitive.Root>
    </AccordionProvider>
  );
});

// ------------------------------------------------------------------------------

const Item = forwardRef<View, AccordionItemProps>((props, ref) => {
  const { children, className, ...primitiveProps } = props;
  const tvStyles = accordionStyles.item({ className });

  return (
    <AccordionPrimitive.Item {...primitiveProps} asChild>
      <Animated.View
        ref={ref}
        className={tvStyles}
        layout={ACCORDION_LAYOUT_TRANSITION}
      >
        {children}
      </Animated.View>
    </AccordionPrimitive.Item>
  );
});

// ------------------------------------------------------------------------------

const Trigger = forwardRef<View, AccordionTriggerProps>((props, ref) => {
  const { children, className, ...primitiveProps } = props;
  const { variant } = useAccordionContext();

  const { colors } = useTheme();

  const indicatorElement = useMemo(
    () =>
      getElementWithDefault(children, DISPLAY_NAME.INDICATOR, <Indicator />),
    [children]
  );

  const highlightOpacity = useSharedValue(0);

  const handlePressIn = () => {
    highlightOpacity.value = withTiming(1, {
      duration: HIGHLIGHT_CONFIG.duration,
      easing: HIGHLIGHT_CONFIG.easing,
    });
  };

  const handlePressOut = () => {
    highlightOpacity.value = withTiming(0, {
      duration: HIGHLIGHT_CONFIG.duration,
      easing: HIGHLIGHT_CONFIG.easing,
    });
  };

  const handlePress = (event: GestureResponderEvent) => {
    primitiveProps.onPress?.(event);
  };

  const animatedHighlightStyle = useAnimatedStyle(() => ({
    opacity: highlightOpacity.value * 0.03,
    backgroundColor: colors.foreground,
  }));

  const { base, highlight } = accordionStyles.trigger({
    variant,
    isDisabled: primitiveProps.isDisabled,
  });
  const tvBaseStyles = base({ className });
  const tvHighlightStyles = highlight();

  return (
    <AccordionPrimitive.Header asChild>
      <AccordionPrimitive.Trigger
        {...primitiveProps}
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        asChild
      >
        <Pressable ref={ref}>
          <View className={tvBaseStyles}>
            <Animated.View
              className={tvHighlightStyles}
              style={animatedHighlightStyle}
            />
            {children}
            {indicatorElement}
          </View>
        </Pressable>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
});

// ------------------------------------------------------------------------------

const Indicator = forwardRef<AccordionIndicatorRef, AccordionIndicatorProps>(
  (props, ref) => {
    const { children, className, iconProps, asChild, ...viewProps } = props;

    const { colors } = useTheme();
    const rotation = useSharedValue(0);

    const { isExpanded } = useAccordionItemContext();

    useEffect(() => {
      rotation.value = withSpring(isExpanded ? 1 : 0, INDICATOR_SPRING_CONFIG);
    }, [isExpanded, rotation]);

    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [
          {
            rotate: interpolate(rotation.value, [0, 1], [0, 180]) + 'deg',
          },
        ],
      };
    });

    const tvStyles = accordionStyles.indicator({ className });
    const Component = asChild ? Slot.View : View;

    if (children) {
      return (
        <Component ref={ref} className={tvStyles} {...viewProps}>
          {children}
        </Component>
      );
    }

    return (
      <Animated.View
        ref={ref}
        className={tvStyles}
        style={animatedStyle}
        {...viewProps}
      >
        <ChevronDownIcon
          size={iconProps?.size ?? DEFAULT_ICON_SIZE}
          strokeWidth={iconProps?.strokeWidth ?? DEFAULT_ICON_STROKE_WIDTH}
          color={iconProps?.color ?? colors.foreground}
        />
      </Animated.View>
    );
  }
);

// ------------------------------------------------------------------------------

const Content = forwardRef<View, AccordionContentProps>((props, ref) => {
  const { children, className, ...primitiveProps } = props;
  const { variant } = useAccordionContext();
  const tvStyles = accordionStyles.content({ variant, className });

  return (
    <AccordionPrimitive.Content {...primitiveProps} asChild>
      <Animated.View
        ref={ref}
        className={tvStyles}
        // VS -----------
        entering={FadeIn.duration(200).easing(Easing.out(Easing.ease))}
        exiting={FadeOut.duration(200).easing(Easing.in(Easing.ease))}
      >
        {children}
      </Animated.View>
    </AccordionPrimitive.Content>
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
 * Props flow from Accordion to sub-components via context (variant, showDivider).
 * Item expansion state is managed by the primitive accordion context.
 *
 * @see Full documentation: https://heroui.com/components/accordion
 */
const Accordion = Object.assign(Root, {
  /** @required Container for individual accordion items */
  Item,
  /** @required Interactive trigger element with press feedback */
  Trigger,
  /** @optional Visual indicator showing expansion state (defaults to chevron) */
  Indicator,
  /** @required Container for expandable content with animations */
  Content,
});

export default Accordion;
export { useAccordionContext, useAccordionItemContext };
