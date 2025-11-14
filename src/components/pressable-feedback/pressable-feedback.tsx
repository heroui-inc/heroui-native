import { forwardRef, useCallback, useMemo, type FC } from 'react';
import {
  Pressable,
  StyleSheet,
  type GestureResponderEvent,
} from 'react-native';

import Animated, { useSharedValue } from 'react-native-reanimated';

import type { PressableRef } from '../../helpers/types';
import {
  PressableFeedbackAnimationProvider,
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
      animation,
      isDisabled = false,
      className,
      children,
      onPress,
      onPressIn,
      onPressOut,
      ...restProps
    } = props;

    const tvStyles = pressableFeedbackStyles({ className });

    const isPressed = useSharedValue(false);

    const handlePressIn = useCallback(
      (event: GestureResponderEvent) => {
        if (isDisabled) return;
        isPressed.set(true);
        // @ts-ignore
        onPressIn?.(event);
      },
      [isDisabled, isPressed, onPressIn]
    );

    const handlePressOut = useCallback(
      (event: GestureResponderEvent) => {
        if (isDisabled) return;

        isPressed.set(false);
        // @ts-ignore
        onPressOut?.(event);
      },
      [isDisabled, isPressed, onPressOut]
    );

    const animationContextValue = useMemo(
      () => ({
        isPressed,
      }),
      [isPressed]
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
          {...restProps}
        >
          <PressableFeedbackHighlight animation={animation} />
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
