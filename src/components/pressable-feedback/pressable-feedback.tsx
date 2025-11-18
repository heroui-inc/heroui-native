import {
  forwardRef,
  memo,
  useCallback,
  useMemo,
  useState,
  type FC,
} from 'react';
import {
  Pressable,
  StyleSheet,
  type LayoutChangeEvent,
  type ViewStyle,
} from 'react-native';

import Animated from 'react-native-reanimated';
import Svg, { Defs, RadialGradient, Rect, Stop } from 'react-native-svg';

import { GestureDetector } from 'react-native-gesture-handler';
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
      rContainerStyle,
      isAllAnimationsDisabled,
    } = usePressableFeedbackRootAnimation({
      variant: feedbackVariant,
      animation,
      style: style as ViewStyle | undefined,
    });

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
        isAllAnimationsDisabled,
      }),
      [
        isPressed,
        pressedCenterX,
        pressedCenterY,
        containerWidth,
        containerHeight,
        rippleProgress,
        isAllAnimationsDisabled,
      ]
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
      <PressableFeedbackAnimationProvider value={animationContextValue}>
        <GestureDetector gesture={gesture}>
          <AnimatedPressable
            ref={ref}
            disabled={isDisabled}
            className={tvStyles}
            style={[rContainerStyle, styleSheet.root, style]}
            onLayout={handleLayout}
            {...restProps}
          >
            {feedbackPosition === 'behind' && feedbackElement}
            {children}
            {feedbackPosition === 'top' && feedbackElement}
          </AnimatedPressable>
        </GestureDetector>
      </PressableFeedbackAnimationProvider>
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

const MemoizedRadialGradient = memo(
  ({ backgroundColor, width }: { backgroundColor: string; width: number }) => {
    return (
      <Svg key={width} width={width} height={width}>
        <Defs>
          <RadialGradient id="rippleGradient" cx="50%" cy="50%" r="50%">
            <Stop offset="0%" stopOpacity="1" stopColor={backgroundColor} />
            <Stop offset="80%" stopOpacity="0.8" stopColor={backgroundColor} />
            <Stop offset="100%" stopOpacity="0" stopColor={backgroundColor} />
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
    );
  }
);

const PressableFeedbackRipple: FC<{
  animation: PressableFeedbackRippleRootAnimation | undefined;
}> = ({ animation }) => {
  const [width, setWidth] = useState<number>(0);

  const { rContainerStyle, backgroundColor } =
    usePressableFeedbackRippleAnimation({ animation });

  return (
    <Animated.View
      pointerEvents="none"
      className="absolute top-0 left-0 rounded-full"
      style={rContainerStyle}
      onLayout={(event) => setWidth(event.nativeEvent.layout.width)}
    >
      <MemoizedRadialGradient backgroundColor={backgroundColor} width={width} />
    </Animated.View>
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
