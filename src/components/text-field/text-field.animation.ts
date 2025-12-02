import { useAnimationSettings } from '../../helpers/contexts/animation-settings-context';
import {
  getAnimationState,
  getAnimationValueProperty,
  getIsAnimationDisabledValue,
} from '../../helpers/utils/animation';
import {
  ENTERING_ANIMATION_CONFIG,
  EXITING_ANIMATION_CONFIG,
} from './text-field.constants';
import type {
  TextFieldDescriptionAnimation,
  TextFieldLabelAnimation,
} from './text-field.types';

// --------------------------------------------------

/**
 * Animation hook for TextField Label component
 * Handles entering and exiting animations for the label
 */
export function useTextFieldLabelAnimation(options: {
  animation: TextFieldLabelAnimation | undefined;
}) {
  const { animation } = options;

  // Read from global animation context (can be undefined)
  const { isAllAnimationsDisabled } = useAnimationSettings();

  const { animationConfig, isAnimationDisabled } = getAnimationState(animation);

  const isAnimationDisabledValue = getIsAnimationDisabledValue({
    animation,
    isAnimationDisabled,
    isAllAnimationsDisabled,
  });

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

// --------------------------------------------------

/**
 * Animation hook for TextField Description component
 * Handles entering and exiting animations for the description text
 */
export function useTextFieldDescriptionAnimation(options: {
  animation: TextFieldDescriptionAnimation | undefined;
}) {
  const { animation } = options;

  // Read from global animation context (can be undefined)
  const { isAllAnimationsDisabled } = useAnimationSettings();

  const { animationConfig, isAnimationDisabled } = getAnimationState(animation);

  const isAnimationDisabledValue = getIsAnimationDisabledValue({
    animation,
    isAnimationDisabled,
    isAllAnimationsDisabled,
  });

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
