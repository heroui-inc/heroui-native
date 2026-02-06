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
import {
  PressableFeedbackRootAnimationProvider,
  usePressableFeedbackHighlightAnimation,
  usePressableFeedbackRippleAnimation,
  usePressableFeedbackRootAnimation,
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
} from './pressable-feedback.types';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

// --------------------------------------------------

const PressableFeedback = forwardRef<PressableRef, PressableFeedbackProps>(
  (props, ref) => {
    const {
      isDisabled = false,
      className,
      style,
      animation,
      isAnimatedStyleActive = true,
      children,
      onLayout,
      onPressIn,
      onPressOut,
      ...restProps
    } = props;

    const rootClassName = pressableFeedbackClassNames.root({ className });

    const {
      isPressed,
      containerWidth,
      containerHeight,
      rContainerStyle,
      isAllAnimationsDisabled,
      animationOnPressIn,
      animationOnPressOut,
    } = usePressableFeedbackRootAnimation({
      animation,
    });

    const rootStyle = isAnimatedStyleActive
      ? [rContainerStyle, pressableFeedbackStyleSheet.root, style]
      : [pressableFeedbackStyleSheet.root, style];

    const handleLayout = useCallback(
      (event: LayoutChangeEvent) => {
        containerWidth.set(event.nativeEvent.layout.width);
        containerHeight.set(event.nativeEvent.layout.height);
        // @ts-ignore
        onLayout?.(event);
      },
      [containerWidth, containerHeight, onLayout]
    );

    const handlePressIn = useCallback(
      (event: GestureResponderEvent) => {
        animationOnPressIn();
        // @ts-ignore
        onPressIn?.(event);
      },
      [animationOnPressIn, onPressIn]
    );

    const handlePressOut = useCallback(
      (event: GestureResponderEvent) => {
        animationOnPressOut();
        // @ts-ignore
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

    return (
      <AnimationSettingsProvider value={animationSettingsContextValue}>
        <PressableFeedbackRootAnimationProvider value={animationContextValue}>
          <AnimatedPressable
            ref={ref}
            disabled={isDisabled}
            className={rootClassName}
            style={rootStyle}
            onLayout={handleLayout}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            {...restProps}
          >
            {children}
          </AnimatedPressable>
        </PressableFeedbackRootAnimationProvider>
      </AnimationSettingsProvider>
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
PressableFeedbackHighlight.displayName = DISPLAY_NAME.HIGHLIGHT;
PressableFeedbackRipple.displayName = DISPLAY_NAME.RIPPLE;

/**
 * Container component that provides visual feedback for press interactions with automatic scale animation.
 *
 * @component PressableFeedback
 * @description Wraps content to provide consistent press feedback across the app. Features platform-aware
 * feedback with highlight effect (iOS-style) or ripple effect (Android-style) that emanates from press point.
 * Includes intelligent scale animation that automatically adjusts based on container size for consistent feel.
 * @features
 * - Automatic scale animation with smart size adjustment
 * - Customizable animations for opacity, color, duration, and scale
 * - Full gesture handling with press, long press, and disabled states
 * - Used as foundation for interactive components like Button, Card, and Accordion
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
  /** Highlight component that renders highlight feedback effect */
  Highlight: PressableFeedbackHighlight,
  /** Ripple component that renders ripple feedback effect */
  Ripple: PressableFeedbackRipple,
});

export default PressableFeedbackCompound;
