import { Easing, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { useAnimationSettings } from '../../helpers/internal/contexts';
import { useCombinedAnimationDisabledState } from '../../helpers/internal/hooks';
import type { AnimationRootDisableAll } from '../../helpers/internal/types';
import {
  getAnimationState,
  getAnimationValueMergedConfig,
  getAnimationValueProperty,
  getIsAnimationDisabledValue,
} from '../../helpers/internal/utils';
import type { RadioIndicatorThumbAnimation } from './radio.types';

// --------------------------------------------------

/**
 * Animation hook for Radio root component.
 * Handles cascading animation disabled state to child components (Indicator, IndicatorThumb).
 */
export function useRadioRootAnimation(options: {
  animation: AnimationRootDisableAll | undefined;
}) {
  const { animation } = options;

  const isAllAnimationsDisabled = useCombinedAnimationDisabledState(animation);

  return {
    isAllAnimationsDisabled,
  };
}

// --------------------------------------------------

/**
 * Animation hook for Radio.IndicatorThumb component.
 * Handles scale animation based on selection state.
 */
export function useRadioIndicatorThumbAnimation(options: {
  animation: RadioIndicatorThumbAnimation | undefined;
  isSelected: boolean | undefined;
}) {
  const { animation, isSelected } = options;

  // Read from global animation context (always available in compound parts)
  const { isAllAnimationsDisabled } = useAnimationSettings();

  const { animationConfig, isAnimationDisabled } = getAnimationState(animation);

  const isAnimationDisabledValue = getIsAnimationDisabledValue({
    isAnimationDisabled,
    isAllAnimationsDisabled,
  });

  // Scale animation
  const scaleValue = getAnimationValueProperty({
    animationValue: animationConfig?.scale,
    property: 'value',
    defaultValue: [1.5, 1] as [number, number],
  });

  const scaleTimingConfig = getAnimationValueMergedConfig({
    animationValue: animationConfig?.scale,
    property: 'timingConfig',
    defaultValue: { duration: 300, easing: Easing.out(Easing.ease) },
  });

  const rContainerStyle = useAnimatedStyle(() => {
    if (isAnimationDisabledValue) {
      return {
        transform: [
          {
            scale: scaleValue[1],
          },
        ],
      };
    }

    return {
      transform: [
        {
          scale: withTiming(
            isSelected ? scaleValue[1] : scaleValue[0],
            scaleTimingConfig
          ),
        },
      ],
    };
  });

  return {
    rContainerStyle,
  };
}
