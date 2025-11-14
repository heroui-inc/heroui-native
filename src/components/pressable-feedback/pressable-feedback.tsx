import { forwardRef, useCallback, type FC } from 'react';
import {
  Pressable,
  StyleSheet,
  type GestureResponderEvent,
} from 'react-native';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { useUniwind } from 'uniwind';
import { colorKit, useThemeColor } from '../../helpers/theme';
import type { PressableRef } from '../../helpers/types';
import {
  DEFAULT_PRESSABLE_FEEDBACK_HIGHLIGHT,
  DISPLAY_NAME,
} from './pressable-feedback.constants';
import pressableFeedbackStyles from './pressable-feedback.styles';
import {
  type HighlightComponentProps,
  type PressableFeedbackProps,
} from './pressable-feedback.types';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

// --------------------------------------------------

const HighlightComponent: FC<HighlightComponentProps> = ({
  animationConfig,
  isPressed,
}) => {
  const { theme } = useUniwind();
  const themeColorBackground = useThemeColor('background');

  const defaultColor =
    theme === 'dark'
      ? colorKit.brighten(themeColorBackground, 0.05).hex()
      : colorKit.darken(themeColorBackground, 0.05).hex();

  const rContainerStyle = useAnimatedStyle(() => {
    const backgroundColor = animationConfig?.color ?? defaultColor;
    const opacity =
      animationConfig?.opacity ?? DEFAULT_PRESSABLE_FEEDBACK_HIGHLIGHT.opacity;
    const duration =
      animationConfig?.config?.duration ??
      DEFAULT_PRESSABLE_FEEDBACK_HIGHLIGHT.duration;
    const easing =
      animationConfig?.config?.easing ??
      DEFAULT_PRESSABLE_FEEDBACK_HIGHLIGHT.easing;

    return {
      backgroundColor,
      opacity: withTiming(isPressed.get() ? opacity : 0, { duration, easing }),
    };
  });

  return (
    <Animated.View
      pointerEvents="none"
      style={[StyleSheet.absoluteFill, rContainerStyle]}
    />
  );
};

// --------------------------------------------------

const PressableFeedback = forwardRef<PressableRef, PressableFeedbackProps>(
  (props, ref) => {
    const {
      variant = 'highlight',
      animationConfig,
      isDisabled = false,
      className,
      children,
      onPress,
      onPressIn,
      onPressOut,
      ...restProps
    } = props;

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

    const tvStyles = pressableFeedbackStyles({ className });

    return (
      <AnimatedPressable
        ref={ref}
        disabled={isDisabled}
        className={tvStyles}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        {...restProps}
      >
        {variant === 'highlight' && (
          <HighlightComponent
            isPressed={isPressed}
            animationConfig={
              animationConfig ?? DEFAULT_PRESSABLE_FEEDBACK_HIGHLIGHT
            }
          />
        )}
        {children}
      </AnimatedPressable>
    );
  }
);

// --------------------------------------------------

HighlightComponent.displayName = DISPLAY_NAME.HIGHLIGHT;
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
