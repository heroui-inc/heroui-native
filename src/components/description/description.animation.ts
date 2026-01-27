import { useCombinedAnimationDisabledState } from '../../helpers/internal/hooks';
import {
  getAnimationValueProperty,
  getIsAnimationDisabledValue,
  getRootAnimationState,
} from '../../helpers/internal/utils';
import {
  ENTERING_ANIMATION_CONFIG,
  EXITING_ANIMATION_CONFIG,
} from './description.constants';
import type { DescriptionAnimation } from './description.types';

// --------------------------------------------------

/**
 * Animation hook for Description component
 * Handles entering and exiting animations for the description text
 */
export function useDescriptionAnimation(options: {
  animation: DescriptionAnimation | undefined;
  hideOnInvalid: boolean;
}) {
  const { animation, hideOnInvalid } = options;

  const { animationConfig, isAnimationDisabled } =
    getRootAnimationState(animation);

  const isAllAnimationsDisabled = useCombinedAnimationDisabledState(animation);

  const isAnimationDisabledValue = getIsAnimationDisabledValue({
    isAnimationDisabled,
    isAllAnimationsDisabled,
  });

  const enteringValue = getAnimationValueProperty({
    animationValue: animationConfig?.entering,
    property: 'value',
    defaultValue: ENTERING_ANIMATION_CONFIG,
  });

  const exitingValue = getAnimationValueProperty({
    animationValue: animationConfig?.exiting,
    property: 'value',
    defaultValue: EXITING_ANIMATION_CONFIG,
  });

  return {
    entering:
      isAnimationDisabledValue || !hideOnInvalid ? undefined : enteringValue,
    exiting:
      isAnimationDisabledValue || !hideOnInvalid ? undefined : exitingValue,
  };
}
