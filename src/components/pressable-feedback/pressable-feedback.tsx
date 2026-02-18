import { forwardRef, useCallback, useMemo } from 'react';
import {
  Pressable,
  View,
  type GestureResponderEvent,
  type LayoutChangeEvent,
} from 'react-native';

import Animated from 'react-native-reanimated';
import { AnimationSettingsProvider } from '../../helpers/internal/contexts';
import type { PressableRef, ViewRef } from '../../helpers/internal/types';
import * as Slot from '../../primitives/slot';
import {
  PressableFeedbackRootAnimationProvider,
  usePressableFeedbackHighlightAnimation,
  usePressableFeedbackRippleAnimation,
  usePressableFeedbackRootAnimation,
  usePressableFeedbackScaleAnimation,
} from './pressable-feedback.animation';
import { DISPLAY_NAME } from './pressable-feedback.constants';
import {
  pressableFeedbackClassNames,
  pressableFeedbackStyleSheet,
} from './pressable-feedback.styles';
import type {
  PressableFeedbackHighlightProps,
  PressableFeedbackProps,
  PressableFeedbackRippleProps,
  PressableFeedbackScaleProps,
} from './pressable-feedback.types';

// --------------------------------------------------

const PressableFeedback = forwardRef<PressableRef, PressableFeedbackProps>(
  (props, ref) => {
    const {
      isDisabled = false,
      asChild = false,
      className,
      style,
      animation,
      children,
      onLayout,
      onPressIn,
      onPressOut,
      ...restProps
    } = props;

    const {
      isPressed,
      containerWidth,
      containerHeight,
      isAllAnimationsDisabled,
      animationOnPressIn,
      animationOnPressOut,
    } = usePressableFeedbackRootAnimation({
      animation,
    });

    const rootClassName = pressableFeedbackClassNames.root({ className });

    const handleLayout = useCallback(
      (event: LayoutChangeEvent) => {
        containerWidth.set(event.nativeEvent.layout.width);
        containerHeight.set(event.nativeEvent.layout.height);
        onLayout?.(event);
      },
      [containerWidth, containerHeight, onLayout]
    );

    const handlePressIn = useCallback(
      (event: GestureResponderEvent) => {
        animationOnPressIn();
        onPressIn?.(event);
      },
      [animationOnPressIn, onPressIn]
    );

    const handlePressOut = useCallback(
      (event: GestureResponderEvent) => {
        animationOnPressOut();
        onPressOut?.(event);
      },
      [animationOnPressOut, onPressOut]
    );

    const animationContextValue = useMemo(
      () => ({
        isPressed,
        containerWidth,
        containerHeight,
      }),
      [isPressed, containerWidth, containerHeight]
    );

    const animationSettingsContextValue = useMemo(
      () => ({
        isAllAnimationsDisabled,
      }),
      [isAllAnimationsDisabled]
    );

    const Component = asChild ? Slot.Pressable : Pressable;

    return (
      <AnimationSettingsProvider value={animationSettingsContextValue}>
        <PressableFeedbackRootAnimationProvider value={animationContextValue}>
          <Component
            ref={ref}
            disabled={isDisabled}
            className={rootClassName}
            style={
              typeof style === 'function'
                ? (state) => [pressableFeedbackStyleSheet.root, style(state)]
                : [pressableFeedbackStyleSheet.root, style]
            }
            onLayout={handleLayout}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            {...restProps}
          >
            {children}
          </Component>
        </PressableFeedbackRootAnimationProvider>
      </AnimationSettingsProvider>
    );
  }
);

// --------------------------------------------------

/**
 * Scale component for PressableFeedback that provides animated scale feedback on press.
 * Must be used within PressableFeedback component. Reads root's isPressed state from context.
 */
const PressableFeedbackScale = forwardRef<ViewRef, PressableFeedbackScaleProps>(
  (props, ref) => {
    const {
      animation,
      isAnimatedStyleActive = true,
      style,
      children,
      ...restProps
    } = props;

    const { rContainerStyle } = usePressableFeedbackScaleAnimation({
      animation,
    });

    const scaleStyle = isAnimatedStyleActive ? [rContainerStyle, style] : style;

    return (
      <Animated.View ref={ref} style={scaleStyle} {...restProps}>
        {children}
      </Animated.View>
    );
  }
);

// --------------------------------------------------

/**
 * Highlight component for PressableFeedback that renders highlight feedback effect
 * Must be used within PressableFeedback component
 */
const PressableFeedbackHighlight = forwardRef<
  ViewRef,
  PressableFeedbackHighlightProps
>((props, ref) => {
  const {
    animation,
    className,
    isAnimatedStyleActive = true,
    style,
    ...restProps
  } = props;

  const { rContainerStyle } = usePressableFeedbackHighlightAnimation({
    animation,
  });

  const highlightClassName = pressableFeedbackClassNames.highlight({
    className,
  });

  const highlightStyle = isAnimatedStyleActive
    ? [rContainerStyle, style]
    : style;

  return (
    <Animated.View
      ref={ref}
      pointerEvents="none"
      className={highlightClassName}
      style={highlightStyle}
      {...restProps}
    />
  );
});

// --------------------------------------------------

/**
 * Ripple component for PressableFeedback that renders ripple feedback effect
 * Must be used within PressableFeedback component
 */
const PressableFeedbackRipple = forwardRef<
  ViewRef,
  PressableFeedbackRippleProps
>((props, ref) => {
  const {
    animation,
    className,
    classNames,
    style,
    styles,
    isAnimatedStyleActive = true,
    onTouchStart,
    onTouchEnd,
    onTouchCancel,
    ...restProps
  } = props;

  const {
    rContainerStyle,
    backgroundColor,
    animationOnTouchEnd,
    animationOnTouchStart,
  } = usePressableFeedbackRippleAnimation({ animation });

  const { container, ripple } = pressableFeedbackClassNames.ripple();

  const containerClassName = container({
    className: [className, classNames?.container],
  });
  const rippleClassName = ripple({ className: classNames?.ripple });

  const rippleStyle = isAnimatedStyleActive
    ? [rContainerStyle, styles?.ripple]
    : styles?.ripple;

  const handleTouchStart = useCallback(
    (event: GestureResponderEvent) => {
      animationOnTouchStart(event);
      onTouchStart?.(event);
    },
    [animationOnTouchStart, onTouchStart]
  );

  const handleTouchEnd = useCallback(
    (event: GestureResponderEvent) => {
      animationOnTouchEnd();
      onTouchEnd?.(event);
    },
    [animationOnTouchEnd, onTouchEnd]
  );

  const handleTouchCancel = useCallback(
    (event: GestureResponderEvent) => {
      animationOnTouchEnd();
      onTouchCancel?.(event);
    },
    [animationOnTouchEnd, onTouchCancel]
  );
  return (
    <View
      ref={ref}
      className={containerClassName}
      style={[style, styles?.container]}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchCancel}
      {...restProps}
    >
      <Animated.View
        pointerEvents="none"
        className={rippleClassName}
        style={[
          rippleStyle,
          {
            experimental_backgroundImage: `radial-gradient(circle at center, ${backgroundColor} 30%, transparent 70%)`,
          },
        ]}
      />
    </View>
  );
});

// --------------------------------------------------

PressableFeedback.displayName = DISPLAY_NAME.ROOT;
PressableFeedbackScale.displayName = DISPLAY_NAME.SCALE;
PressableFeedbackHighlight.displayName = DISPLAY_NAME.HIGHLIGHT;
PressableFeedbackRipple.displayName = DISPLAY_NAME.RIPPLE;

/**
 * Container component that provides visual feedback for press interactions.
 *
 * @component PressableFeedback
 * @description Wraps content to provide consistent press feedback across the app. Manages press state
 * and container dimensions, providing them to child compound parts via context. Supports `asChild`
 * for rendering as a Slot (polymorphic). Use `animation="disable-all"` to cascade-disable all
 * child animations.
 * @features
 * - Composable compound parts: Scale, Highlight, Ripple
 * - Full gesture handling with press, long press, and disabled states
 * - Polymorphic via `asChild` prop (Slot pattern)
 * - Used as foundation for interactive components like Button, Card, and Accordion
 *
 * @component PressableFeedback.Scale
 * @description Scale animation component that shrinks content on press. Must be used within
 * PressableFeedback. Reads isPressed and container dimensions from root context. Scale value
 * is automatically adjusted based on container width for consistent feel across sizes.
 *
 * @component PressableFeedback.Highlight
 * @description Highlight component that renders highlight feedback effect (iOS-style).
 * Must be used within PressableFeedback component. Uses root's isPressed state from context.
 *
 * @component PressableFeedback.Ripple
 * @description Ripple component that renders ripple feedback effect (Android-style).
 * Must be used within PressableFeedback component. Handles touch events to track position.
 */
const PressableFeedbackCompound = Object.assign(PressableFeedback, {
  /** Scale animation component that provides press scale feedback */
  Scale: PressableFeedbackScale,
  /** Highlight component that renders highlight feedback effect */
  Highlight: PressableFeedbackHighlight,
  /** Ripple component that renders ripple feedback effect */
  Ripple: PressableFeedbackRipple,
});

export default PressableFeedbackCompound;
