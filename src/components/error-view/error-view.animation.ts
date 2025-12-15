import { useAnimationSettings } from '../../helpers/contexts/animation-settings-context';
import {
  getAnimationValueProperty,
  getCombinedAnimationDisabledState,
  getRootAnimationState,
} from '../../helpers/utils/animation';
import { useGlobalAnimationSettings } from '../../providers/animation-settings';
import {
  ENTERING_ANIMATION_CONFIG,
  EXITING_ANIMATION_CONFIG,
} from './error-view.constants';
import type { ErrorViewRootAnimation } from './error-view.types';

// --------------------------------------------------

/**
 * Animation hook for ErrorView root component
 * Handles entering and exiting animations for error messages
 */
export function useErrorViewRootAnimation(options: {
  animation: ErrorViewRootAnimation | undefined;
}) {
  const { animation } = options;

  // Get global animation disabled state
  const { globalIsAllAnimationsDisabled } = useGlobalAnimationSettings();

  // Read from global animation context (can be undefined)
  const parentAnimationSettingsContext = useAnimationSettings();
  const parentIsAllAnimationsDisabled =
    parentAnimationSettingsContext?.isAllAnimationsDisabled;

  const {
    animationConfig,
    isAnimationDisabled,
    isAllAnimationsDisabled: ownIsAllAnimationsDisabled,
  } = getRootAnimationState(animation);

  // Combine global, parent, and own disable-all states (global > parent > own)
  const isAllAnimationsDisabled = getCombinedAnimationDisabledState({
    globalIsAllAnimationsDisabled,
    parentIsAllAnimationsDisabled,
    ownIsAllAnimationsDisabled,
  });

  const isAnimationDisabledValue =
    isAnimationDisabled || isAllAnimationsDisabled;

  // Entering animation
  const enteringValue = getAnimationValueProperty({
    animationValue: animationConfig?.entering,
    property: 'value',
    defaultValue: ENTERING_ANIMATION_CONFIG,
  });

  // Exiting animation
  const exitingValue = getAnimationValueProperty({
    animationValue: animationConfig?.exiting,
    property: 'value',
    defaultValue: EXITING_ANIMATION_CONFIG,
  });

  return {
    entering: isAnimationDisabledValue ? undefined : enteringValue,
    exiting: isAnimationDisabledValue ? undefined : exitingValue,
  };
}
