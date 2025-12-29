import { forwardRef, useCallback, useMemo, type FC } from 'react';
import { Pressable, StyleSheet, type LayoutChangeEvent } from 'react-native';

import Animated from 'react-native-reanimated';

import { GestureDetector } from 'react-native-gesture-handler';
import { AnimationSettingsProvider } from '../../helpers/contexts/animation-settings-context';
import type { PressableRef } from '../../helpers/types';
import {
  PressableFeedbackAnimationProvider,
  usePressableFeedbackHighlightAnimation,
  usePressableFeedbackRippleAnimation,
  usePressableFeedbackRootAnimation,
} from './pressable-feedback.animation';
import { DISPLAY_NAME } from './pressable-feedback.constants';
import pressableFeedbackStyles, {
  styleSheet,
} from './pressable-feedback.styles';
import type {
  PressableFeedbackHighlightRootAnimation,
  PressableFeedbackProps,
  PressableFeedbackRippleRootAnimation,
} from './pressable-feedback.types';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

// --------------------------------------------------

const PressableFeedback = forwardRef<PressableRef, PressableFeedbackProps>(
  (props, ref) => {
    const {
      feedbackVariant = 'highlight',
      feedbackPosition = 'top',
      isDisabled = false,
      className,
      style,
      animation,
      isAnimatedStyleActive = true,
      children,
      onLayout,
      ...restProps
    } = props;

    const rootClassName = pressableFeedbackStyles({ className });

    const {
      isPressed,
      pressedCenterX,
      pressedCenterY,
      containerWidth,
      containerHeight,
      rippleProgress,
      gesture,
      rContainerStyle,
      isAllAnimationsDisabled,
    } = usePressableFeedbackRootAnimation({
      variant: feedbackVariant,
      animation,
    });

    const rootStyle = isAnimatedStyleActive
      ? [rContainerStyle, styleSheet.root, style]
      : [styleSheet.root, style];

    const handleLayout = useCallback(
      (event: LayoutChangeEvent) => {
        containerWidth.set(event.nativeEvent.layout.width);
        containerHeight.set(event.nativeEvent.layout.height);
        // @ts-ignore
        onLayout?.(event);
      },
      [containerWidth, containerHeight, onLayout]
    );

    const animationContextValue = useMemo(
      () => ({
        isPressed,
        pressedCenterX,
        pressedCenterY,
        containerWidth,
        containerHeight,
        rippleProgress,
      }),
      [
        isPressed,
        pressedCenterX,
        pressedCenterY,
        containerWidth,
        containerHeight,
        rippleProgress,
      ]
    );

    const animationSettingsContextValue = useMemo(
      () => ({
        isAllAnimationsDisabled,
      }),
      [isAllAnimationsDisabled]
    );

    const feedbackElement = (
      <>
        {feedbackVariant === 'highlight' && (
          <PressableFeedbackHighlight
            animation={
              animation as PressableFeedbackHighlightRootAnimation | undefined
            }
          />
        )}
        {feedbackVariant === 'ripple' && (
          <PressableFeedbackRipple
            animation={
              animation as PressableFeedbackRippleRootAnimation | undefined
            }
          />
        )}
      </>
    );

    return (
      <AnimationSettingsProvider value={animationSettingsContextValue}>
        <PressableFeedbackAnimationProvider value={animationContextValue}>
          <GestureDetector gesture={gesture}>
            <AnimatedPressable
              ref={ref}
              disabled={isDisabled}
              className={rootClassName}
              style={rootStyle}
              onLayout={handleLayout}
              {...restProps}
            >
              {feedbackPosition === 'behind' && feedbackElement}
              {children}
              {feedbackPosition === 'top' && feedbackElement}
            </AnimatedPressable>
          </GestureDetector>
        </PressableFeedbackAnimationProvider>
      </AnimationSettingsProvider>
    );
  }
);

// --------------------------------------------------

const PressableFeedbackHighlight: FC<{
  animation: PressableFeedbackHighlightRootAnimation | undefined;
}> = ({ animation }) => {
  const { rContainerStyle } = usePressableFeedbackHighlightAnimation({
    animation,
  });

  return (
    <Animated.View
      pointerEvents="none"
      style={[StyleSheet.absoluteFill, rContainerStyle]}
    />
  );
};

// --------------------------------------------------

const PressableFeedbackRipple: FC<{
  animation: PressableFeedbackRippleRootAnimation | undefined;
}> = ({ animation }) => {
  const { rContainerStyle, backgroundColor } =
    usePressableFeedbackRippleAnimation({ animation });

  return (
    <Animated.View
      pointerEvents="none"
      className="absolute top-0 left-0 rounded-full"
      style={[
        rContainerStyle,
        {
          experimental_backgroundImage: `radial-gradient(circle at center, ${backgroundColor} 30%, transparent 70%)`,
        },
      ]}
    />
  );
};

// --------------------------------------------------

PressableFeedbackHighlight.displayName = DISPLAY_NAME.HIGHLIGHT;
PressableFeedback.displayName = DISPLAY_NAME.ROOT;

/**
 * Container component that provides visual feedback for press interactions with automatic scale animation.
 *
 * @component PressableFeedback
 * @description Wraps content to provide consistent press feedback across the app. Features platform-aware
 * feedback with highlight effect (iOS-style) or ripple effect (Android-style) that emanates from press point.
 * Includes intelligent scale animation that automatically adjusts based on container size for consistent feel.
 * @features
 * - Two feedback variants: 'highlight' (default) and 'ripple'
 * - Automatic scale animation with smart size adjustment
 * - Customizable animations for opacity, color, duration, and scale
 * - Flexible z-index positioning (above or below content)
 * - Full gesture handling with press, long press, and disabled states
 * - Used as foundation for interactive components like Button, Card, and Accordion
 */
export default PressableFeedback;
