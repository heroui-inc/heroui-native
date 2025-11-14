import { forwardRef, useCallback, useMemo, type FC } from 'react';
import { Pressable, StyleSheet, type LayoutChangeEvent } from 'react-native';

import Animated from 'react-native-reanimated';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';

import { GestureDetector } from 'react-native-gesture-handler';
import { useThemeColor } from '../../helpers/theme';
import type { PressableRef } from '../../helpers/types';
import {
  PressableFeedbackAnimationProvider,
  usePressableFeedbackHighlightAnimation,
  usePressableFeedbackRippleAnimation,
  usePressableFeedbackRootAnimation,
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
      onLayout,
      ...restProps
    } = props;

    const tvStyles = pressableFeedbackStyles({ className });

    const {
      isPressed,
      pressedCenterX,
      pressedCenterY,
      containerWidth,
      containerHeight,
      rippleProgress,
      gesture,
    } = usePressableFeedbackRootAnimation();

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
        <GestureDetector gesture={gesture}>
          <AnimatedPressable
            ref={ref}
            disabled={isDisabled}
            className={tvStyles}
            onLayout={handleLayout}
            {...restProps}
          >
            {/* <PressableFeedbackHighlight animation={animation} /> */}
            <PressableFeedbackRipple />
            {children}
          </AnimatedPressable>
        </GestureDetector>
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
  const { rContainerStyle } = usePressableFeedbackRippleAnimation();

  const themeColorSurfaceSecondary = useThemeColor('on-surface-hover');

  return (
    <Animated.View
      pointerEvents="none"
      className="absolute top-0 left-0"
      style={rContainerStyle}
    >
      <Svg width="100%" height="100%">
        <Defs>
          <RadialGradient id="rippleGradient" cx="50%" cy="50%" r="50%">
            <Stop
              offset="0%"
              stopOpacity="1"
              stopColor={themeColorSurfaceSecondary}
            />
            <Stop
              offset="80%"
              stopOpacity="0.8"
              stopColor={themeColorSurfaceSecondary}
            />
            <Stop
              offset="100%"
              stopOpacity="0"
              stopColor={themeColorSurfaceSecondary}
            />
          </RadialGradient>
        </Defs>
        <Rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="url(#rippleGradient)"
        />
      </Svg>
    </Animated.View>
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
