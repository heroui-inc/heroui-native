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

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

// --------------------------------------------------

const PressableFeedback = forwardRef<PressableRef, PressableFeedbackProps>(
  (props, ref) => {
    const {
      isDisabled = false,
      isAnimatedStyleActive = true,
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
      rScaleStyle,
    } = usePressableFeedbackRootAnimation({
      animation,
    });

    const rootClassName = pressableFeedbackClassNames.root({ className });

    const rootStyle = isAnimatedStyleActive
      ? [pressableFeedbackStyleSheet.root, rScaleStyle, style]
      : [pressableFeedbackStyleSheet.root, style];

    const handleLayout = useCallback(
      (event: LayoutChangeEvent) => {
        containerWidth.set(event.nativeEvent.layout.width);
        containerHeight.set(event.nativeEvent.layout.height);
        if (onLayout && typeof onLayout === 'function') {
          onLayout(event);
        }
      },
      [containerWidth, containerHeight, onLayout]
    );

    const handlePressIn = useCallback(
      (event: GestureResponderEvent) => {
        animationOnPressIn();
        if (onPressIn && typeof onPressIn === 'function') {
          onPressIn(event);
        }
      },
      [animationOnPressIn, onPressIn]
    );

    const handlePressOut = useCallback(
      (event: GestureResponderEvent) => {
        animationOnPressOut();
        if (onPressOut && typeof onPressOut === 'function') {
          onPressOut(event);
        }
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
 * Pressable container with built-in scale animation and composable feedback compound parts.
 *
 * @component PressableFeedback
 * @description Wraps content to provide consistent press feedback across the app. Provides built-in
 * scale animation by default. Manages press state and container dimensions, providing them to child
 * compound parts via context. Supports `asChild` for rendering as a Slot (polymorphic).
 * Use `animation={{ scale: ... }}` to customize the built-in scale, `animation={false}` to disable
 * it (when using PressableFeedback.Scale on a specific child instead), or `animation="disable-all"`
 * to cascade-disable all animations.
 * @features
 * - Built-in scale animation enabled by default
 * - Composable compound parts: Scale, Highlight, Ripple
 * - Full gesture handling with press, long press, and disabled states
 * - Polymorphic via `asChild` prop (Slot pattern)
 * - Used as foundation for interactive components like Button, Card, and Accordion
 *
 * @component PressableFeedback.Scale
 * @description Scale animation wrapper for applying scale to a specific child element. Use this
 * instead of the root's built-in scale when you need control over which element scales or need
 * to apply className/style to the scale wrapper. Set `animation={false}` on the root to disable
 * its built-in scale when using this component.
 *
 * @component PressableFeedback.Highlight
 * @description Highlight overlay for iOS-style press feedback. Renders an absolute-positioned
 * layer that fades in on press. Must be used within PressableFeedback.
 *
 * @component PressableFeedback.Ripple
 * @description Ripple overlay for Android-style press feedback. Renders a radial gradient circle
 * that expands from the touch point. Must be used within PressableFeedback.
 */
const PressableFeedbackCompound = Object.assign(PressableFeedback, {
  /** Scale animation wrapper for applying scale to a specific child element */
  Scale: PressableFeedbackScale,
  /** Highlight overlay for iOS-style press feedback */
  Highlight: PressableFeedbackHighlight,
  /** Ripple overlay for Android-style press feedback */
  Ripple: PressableFeedbackRipple,
});

export default PressableFeedbackCompound;
