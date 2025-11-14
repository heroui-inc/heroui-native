import { forwardRef, useCallback, useMemo, type FC } from 'react';
import {
  Pressable,
  StyleSheet,
  type GestureResponderEvent,
  type LayoutChangeEvent,
} from 'react-native';

import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { useThemeColor } from '../../helpers/theme';
import type { PressableRef } from '../../helpers/types';
import {
  PressableFeedbackAnimationProvider,
  usePressableFeedbackAnimation,
  usePressableFeedbackHighlightAnimation,
} from './pressable-feedback.animation';
import { DISPLAY_NAME } from './pressable-feedback.constants';
import pressableFeedbackStyles from './pressable-feedback.styles';
import type { PressableFeedbackProps } from './pressable-feedback.types';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

// --------------------------------------------------

const PressableFeedback = forwardRef<PressableRef, PressableFeedbackProps>(
  (props, ref) => {
    const {
      isDisabled = false,
      className,
      children,
      onPress,
      onPressIn,
      onPressOut,
      onLayout,
      ...restProps
    } = props;

    const tvStyles = pressableFeedbackStyles({ className });

    const isPressed = useSharedValue(false);
    const pressedCenterX = useSharedValue(0);
    const pressedCenterY = useSharedValue(0);
    const containerWidth = useSharedValue(0);
    const containerHeight = useSharedValue(0);
    const rippleProgress = useSharedValue(0);

    const handlePressIn = useCallback(
      (event: GestureResponderEvent) => {
        rippleProgress.set(0);
        isPressed.set(true);
        pressedCenterX.set(event.nativeEvent.locationX);
        pressedCenterY.set(event.nativeEvent.locationY);
        rippleProgress.set(withTiming(1, { duration: 200 }));
        // @ts-ignore
        onPressIn?.(event);
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [isPressed, onPressIn]
    );

    const handlePressOut = useCallback(
      (event: GestureResponderEvent) => {
        rippleProgress.set(withTiming(2, { duration: 400 }));
        isPressed.set(false);
        // @ts-ignore
        onPressOut?.(event);
      },
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [isPressed, onPressOut]
    );

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

    return (
      <PressableFeedbackAnimationProvider value={animationContextValue}>
        <AnimatedPressable
          ref={ref}
          disabled={isDisabled}
          className={tvStyles}
          onPress={onPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onLayout={handleLayout}
          {...restProps}
        >
          {/* <PressableFeedbackHighlight animation={animation} /> */}
          <PressableFeedbackRipple />
          {children}
        </AnimatedPressable>
      </PressableFeedbackAnimationProvider>
    );
  }
);

// --------------------------------------------------

const PressableFeedbackHighlight: FC<{
  animation: PressableFeedbackProps['animation'];
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

const PressableFeedbackRipple: FC<{}> = () => {
  const {
    pressedCenterX,
    pressedCenterY,
    containerWidth,
    containerHeight,
    rippleProgress,
  } = usePressableFeedbackAnimation();

  const themeColorSurfaceSecondary = useThemeColor('on-surface-hover');

  const rContainerStyle = useAnimatedStyle(() => {
    const circleRadius = Math.sqrt(
      containerWidth.get() ** 2 + containerHeight.get() ** 2
    );

    const translateX = pressedCenterX.get() - circleRadius;
    const translateY = pressedCenterY.get() - circleRadius;

    return {
      width: circleRadius * 2,
      height: circleRadius * 2,
      borderRadius: circleRadius,
      opacity: withTiming(
        interpolate(rippleProgress.get(), [0, 1, 2], [0, 1, 0]),
        { duration: 50 }
      ),
      backgroundColor: themeColorSurfaceSecondary,
      transform: [
        {
          translateX,
        },
        {
          translateY,
        },
        {
          scale: withTiming(
            interpolate(rippleProgress.get(), [0, 1, 2], [0, 1, 1]),
            { duration: 50 }
          ),
        },
      ],
    };
  });

  return (
    <Animated.View
      pointerEvents="none"
      className="absolute top-0 left-0"
      style={rContainerStyle}
    />
  );
};

// --------------------------------------------------

PressableFeedbackHighlight.displayName = DISPLAY_NAME.HIGHLIGHT;
PressableFeedback.displayName = DISPLAY_NAME.ROOT;

/**
 * PressableFeedback component
 *
 * @component PressableFeedback - Container component that provides visual feedback
 * for user interactions. Shows a ripple effect on Android and a highlight effect on iOS.
 * Can be used standalone or as part of other components like Button, Card, or Accordion
 * for consistent interaction feedback.
 */
export default PressableFeedback;
