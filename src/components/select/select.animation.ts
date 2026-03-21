import { useEffect } from 'react';
import {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { useAnimationSettings } from '../../helpers/internal/contexts';
import {
  createContext,
  getAnimationState,
  getAnimationValueMergedConfig,
  getAnimationValueProperty,
  getIsAnimationDisabledValue,
} from '../../helpers/internal/utils';
import { INDICATOR_SPRING_CONFIG } from './select.constants';
import type {
  SelectAnimationContextValue,
  SelectTriggerIndicatorAnimation,
} from './select.types';

const [SelectAnimationProvider, useSelectAnimation] =
  createContext<SelectAnimationContextValue>({
    name: 'SelectAnimationContext',
  });

export { SelectAnimationProvider, useSelectAnimation };

// --------------------------------------------------

/**
 * Animation hook for Select Trigger Indicator component
 * Handles rotation animation for the chevron icon
 */
export function useSelectTriggerIndicatorAnimation(options: {
  animation: SelectTriggerIndicatorAnimation | undefined;
  isOpen: boolean;
}) {
  const { animation, isOpen } = options;

  // Read from global animation context (always available in compound parts)
  const { isAllAnimationsDisabled } = useAnimationSettings();

  const { animationConfig, isAnimationDisabled } = getAnimationState(animation);

  const isAnimationDisabledValue = getIsAnimationDisabledValue({
    isAnimationDisabled,
    isAllAnimationsDisabled,
  });

  // Rotation animation values
  const rotationValue = getAnimationValueProperty({
    animationValue: animationConfig?.rotation,
    property: 'value',
    defaultValue: [0, -180] as [number, number],
  });

  const rotationSpringConfig = getAnimationValueMergedConfig({
    animationValue: animationConfig?.rotation,
    property: 'springConfig',
    defaultValue: INDICATOR_SPRING_CONFIG,
  });

  const rotation = useSharedValue(0);

  useEffect(() => {
    if (isAnimationDisabledValue) {
      rotation.set(isOpen ? 1 : 0);
    } else {
      rotation.set(withSpring(isOpen ? 1 : 0, rotationSpringConfig));
    }
  }, [isOpen, isAnimationDisabledValue, rotation, rotationSpringConfig]);

  const rContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate:
            interpolate(
              rotation.get(),
              [0, 1],
              [rotationValue[0], rotationValue[1]]
            ) + 'deg',
        },
      ],
    };
  });

  return {
    rContainerStyle,
  };
}
