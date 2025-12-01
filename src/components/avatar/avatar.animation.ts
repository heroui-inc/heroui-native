import type { AnimationRootDisableAll } from '../../helpers/types';
import {
  getAnimationState,
  getAnimationValueProperty,
  getRootAnimationState,
} from '../../helpers/utils/animation';
import { useAvatarContext } from './avatar';
import { DEFAULT_ENTERING_ANIMATION } from './avatar.constants';
import type {
  AvatarFallbackAnimation,
  AvatarImageAnimation,
} from './avatar.types';

/**
 * Animation hook for Avatar root component
 * Handles root-level animation configuration and provides context for child components
 */
export function useAvatarRootAnimation(options: {
  animation: AnimationRootDisableAll | undefined;
}) {
  const { animation } = options;

  const { isAnimationDisabled, isAllAnimationsDisabled } =
    getRootAnimationState(animation);

  const isAnimationDisabledValue =
    isAnimationDisabled || isAllAnimationsDisabled;

  return {
    isAllAnimationsDisabled: isAnimationDisabledValue,
  };
}

/**
 * Animation hook for Avatar Image component
 * Handles entering animation for the avatar image
 */
export function useAvatarImageAnimation(options: {
  animation: AvatarImageAnimation | undefined;
}) {
  const { animation } = options;

  const { isAllAnimationsDisabled } = useAvatarContext();

  const { animationConfig, isAnimationDisabled } = getAnimationState(animation);

  const isAnimationDisabledValue = animation
    ? false
    : isAnimationDisabled || (isAllAnimationsDisabled ?? false);

  // Entering animation
  const enteringValue = getAnimationValueProperty({
    animationValue: animationConfig?.entering,
    property: 'value',
    defaultValue: DEFAULT_ENTERING_ANIMATION,
  });

  return {
    entering: isAnimationDisabledValue ? undefined : enteringValue,
  };
}

/**
 * Animation hook for Avatar Fallback component
 * Handles entering animation for the avatar fallback
 */
export function useAvatarFallbackAnimation(options: {
  animation: AvatarFallbackAnimation | undefined;
}) {
  const { animation } = options;

  const { isAllAnimationsDisabled } = useAvatarContext();

  const { animationConfig, isAnimationDisabled } = getAnimationState(animation);

  const isAnimationDisabledValue = animation
    ? false
    : isAnimationDisabled || (isAllAnimationsDisabled ?? false);

  // Entering animation
  const enteringValue = getAnimationValueProperty({
    animationValue: animationConfig?.entering,
    property: 'value',
    defaultValue: DEFAULT_ENTERING_ANIMATION,
  });

  return {
    entering: isAnimationDisabledValue ? undefined : enteringValue,
  };
}
