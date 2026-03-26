import { Children, forwardRef, useMemo } from 'react';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';
import { useThemeColor } from '../../helpers/external/hooks';
import { ChevronDownIcon } from '../../helpers/internal/components';
import { AnimationSettingsProvider } from '../../helpers/internal/contexts';
import type { ViewRef } from '../../helpers/internal/types';
import { createContext } from '../../helpers/internal/utils';
import * as AccordionPrimitive from '../../primitives/accordion';
import {
  AccordionAnimationProvider,
  useAccordionAnimation,
  useAccordionContentAnimation,
  useAccordionIndicatorAnimation,
  useAccordionRootAnimation,
} from './accordion.animation';
import { DEFAULT_ICON_SIZE, DISPLAY_NAME } from './accordion.constants';
import { accordionClassNames, accordionStyleSheet } from './accordion.styles';
import type {
  AccordionContentProps,
  AccordionContextValue,
  AccordionIndicatorProps,
  AccordionItemProps,
  AccordionItemRenderProps,
  AccordionRootProps,
  AccordionTriggerProps,
} from './accordion.types';

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

const [AccordionInnerProvider, useAccordionInnerContext] =
  createContext<AccordionContextValue>({
    name: 'AccordionInnerContext',
  });

const useAccordion = AccordionPrimitive.useRootContext;
const useAccordionItem = AccordionPrimitive.useItemContext;

// ------------------------------------------------------------------------------

const Root = forwardRef<View, AccordionRootProps>((props, ref) => {
  const {
    children,
    variant = 'default',
    hideSeparator = false,
    className,
    classNames,
    styles,
    style,
    animation,
    ...restProps
  } = props;

  const { container, separator } = accordionClassNames.root({ variant });

  const containerClassName = container({
    className: [className, classNames?.container],
  });

  const separatorClassName = separator({ className: classNames?.separator });

  const { layoutTransition, isAllAnimationsDisabled } =
    useAccordionRootAnimation({
      animation,
    });

  const contextValue: AccordionContextValue = useMemo(
    () => ({
      variant,
    }),
    [variant]
  );

  const animationSettingsContextValue = useMemo(
    () => ({
      isAllAnimationsDisabled,
    }),
    [isAllAnimationsDisabled]
  );

  const animationContextValue = useMemo(
    () => ({
      layoutTransition,
    }),
    [layoutTransition]
  );

  return (
    <AnimationSettingsProvider value={animationSettingsContextValue}>
      <AccordionAnimationProvider value={animationContextValue}>
        <AccordionInnerProvider value={contextValue}>
          <AnimatedRootView
            ref={ref}
            className={containerClassName}
            style={[accordionStyleSheet.root, style, styles?.container]}
            layout={layoutTransition}
            {...restProps}
          >
            {Children.map(children, (child, index) => (
              <>
                {child}
                {!hideSeparator && index < Children.count(children) - 1 && (
                  <Animated.View
                    className={separatorClassName}
                    style={styles?.separator}
                    layout={layoutTransition}
                  />
                )}
              </>
            ))}
          </AnimatedRootView>
        </AccordionInnerProvider>
      </AccordionAnimationProvider>
    </AnimationSettingsProvider>
  );
});

// ------------------------------------------------------------------------------

const Item = forwardRef<View, AccordionItemProps>((props, ref) => {
  const {
    children,
    value,
    layout: layoutProp,
    className,
    isDisabled: isDisabledProp,
    ...restProps
  } = props;

  const itemClassName = accordionClassNames.item({ className });

  const { layoutTransition } = useAccordionAnimation();
  const { value: rootValue } = useAccordion();

  const itemValue = value as string;

  const isExpanded = Array.isArray(rootValue)
    ? rootValue.includes(itemValue)
    : rootValue === itemValue;

  const renderProps: AccordionItemRenderProps = useMemo(
    () => ({
      isExpanded,
      value: itemValue,
    }),
    [isExpanded, itemValue]
  );

  const content =
    typeof children === 'function' ? children(renderProps) : children;

  return (
    <AnimatedItemView
      ref={ref}
      layout={layoutProp || layoutTransition}
      value={value}
      className={itemClassName}
      isDisabled={isDisabledProp}
      {...restProps}
    >
      {content}
    </AnimatedItemView>
  );
});

// ------------------------------------------------------------------------------

const Trigger = forwardRef<View, AccordionTriggerProps>((props, ref) => {
  const { children, className, ...restProps } = props;

  const { variant } = useAccordionInnerContext();

  const triggerClassName = accordionClassNames.trigger({
    variant,
    className,
  });

  return (
    <AccordionPrimitive.Header>
      <AccordionPrimitive.Trigger
        ref={ref}
        className={triggerClassName}
        {...restProps}
      >
        {children}
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
});

// ------------------------------------------------------------------------------

const Indicator = forwardRef<ViewRef, AccordionIndicatorProps>((props, ref) => {
  const {
    children,
    className,
    iconProps,
    animation,
    isAnimatedStyleActive = true,
    style,
    ...restProps
  } = props;

  const { isExpanded } = useAccordionItem();

  const themeColorForeground = useThemeColor('foreground');

  const indicatorClassName = accordionClassNames.indicator({ className });

  const { rContainerStyle } = useAccordionIndicatorAnimation({
    animation,
    isExpanded,
  });

  const indicatorStyle = isAnimatedStyleActive
    ? [rContainerStyle, style]
    : style;

  if (children) {
    return (
      <AnimatedIndicator
        ref={ref}
        className={indicatorClassName}
        style={style}
        {...restProps}
      >
        {children}
      </AnimatedIndicator>
    );
  }

  return (
    <AnimatedIndicator
      ref={ref}
      className={indicatorClassName}
      style={indicatorStyle}
      {...restProps}
    >
      <ChevronDownIcon
        size={iconProps?.size ?? DEFAULT_ICON_SIZE}
        color={iconProps?.color ?? themeColorForeground}
      />
    </AnimatedIndicator>
  );
});

// ------------------------------------------------------------------------------

const Content = forwardRef<View, AccordionContentProps>((props, ref) => {
  const { children, className, animation, ...restProps } = props;

  const { variant } = useAccordionInnerContext();

  const { isExpanded } = useAccordionItem();

  const contentClassName = accordionClassNames.content({ variant, className });

  const { entering: animatedEntering, exiting: animatedExiting } =
    useAccordionContentAnimation({
      animation,
    });

  if (!isExpanded) {
    return null;
  }

  return (
    <Animated.View entering={animatedEntering} exiting={animatedExiting}>
      <AccordionPrimitive.Content
        ref={ref}
        className={contentClassName}
        {...restProps}
      >
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
 * and provides variant styling (default or surface).
 *
 * @component Accordion.Item - Container for individual accordion items.
 * Wraps the trigger and content, managing the expanded state for each item.
 * Supports render function children that receive expansion state.
 *
 * @component Accordion.Trigger - Interactive element that toggles item expansion.
 * Built on Header and Trigger primitives.
 *
 * @component Accordion.Indicator - Optional visual indicator showing expansion state.
 * Defaults to an animated chevron icon that rotates based on item state.
 * Supports custom animation configuration.
 *
 * @component Accordion.Content - Container for expandable content.
 * Animated with layout transitions for smooth expand/collapse effects.
 * Supports custom entering and exiting animations.
 *
 * Props flow from Accordion to sub-components via context (variant).
 * Animation state flows via AccordionAnimationProvider.
 * Item expansion state is managed by the primitive accordion context.
 *
 * @see Full documentation: https://heroui.com/docs/native/components/accordion
 */
const CompoundAccordion = Object.assign(Root, {
  /** @required Container for individual accordion items */
  Item,
  /** @required Interactive trigger element */
  Trigger,
  /** @optional Visual indicator showing expansion state (defaults to chevron) */
  Indicator,
  /** @required Container for expandable content with animations */
  Content,
});

export default CompoundAccordion;
export { useAccordion, useAccordionItem };
