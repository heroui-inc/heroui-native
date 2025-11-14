import { Easing, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useUniwind } from 'uniwind';
import { colorKit, useThemeColor } from '../../helpers/theme';
import { createContext } from '../../helpers/utils';
import {
  getAnimationState,
  getAnimationValueMergedConfig,
  getAnimationValueProperty,
} from '../../helpers/utils/animation';
import type {
  PressableFeedbackAnimationContextValue,
  PressableFeedbackHighlightAnimation,
} from './pressable-feedback.types';

const [PressableFeedbackAnimationProvider, usePressableFeedbackAnimation] =
  createContext<PressableFeedbackAnimationContextValue>({
    name: 'PressableFeedbackAnimationContext',
  });

export { PressableFeedbackAnimationProvider, usePressableFeedbackAnimation };

// --------------------------------------------------

/**
 * Animation hook for PressableFeedback highlight overlay
 * Handles opacity and background color animations for the highlight effect
 */
export function usePressableFeedbackHighlightAnimation(options: {
  animation: PressableFeedbackHighlightAnimation | undefined;
}) {
  const { animation } = options;

  const { theme } = useUniwind();
  const themeColorBackground = useThemeColor('background');

  const { isPressed } = usePressableFeedbackAnimation();

  const { animationConfig, isAnimationDisabled } = getAnimationState(animation);

  // Opacity animation
  const opacityValue = getAnimationValueProperty({
    animationValue: animationConfig?.opacity,
    property: 'value',
    defaultValue: [0, 0.1] as [number, number],
  });

  const opacityTimingConfig = getAnimationValueMergedConfig({
    animationValue: animationConfig?.opacity,
    property: 'timingConfig',
    defaultValue: { duration: 200, easing: Easing.inOut(Easing.quad) },
  });

  // Background color
  const defaultColor =
    theme === 'dark'
      ? colorKit.brighten(themeColorBackground, 0.05).hex()
      : colorKit.darken(themeColorBackground, 0.05).hex();

  const backgroundColor = getAnimationValueProperty({
    animationValue: animationConfig?.backgroundColor,
    property: 'value',
    defaultValue: defaultColor,
  });

  const rContainerStyle = useAnimatedStyle(() => {
    if (isAnimationDisabled) {
      return {
        backgroundColor,
        opacity: isPressed.get() ? opacityValue[1] : opacityValue[0],
      };
    }

    return {
      backgroundColor,
      opacity: withTiming(
        isPressed.get() ? opacityValue[1] : opacityValue[0],
        opacityTimingConfig
      ),
    };
  });

  return {
    rContainerStyle,
    isPressed,
  };
}
