import { useCombinedAnimationDisabledState } from '../../helpers/hooks';
import type { AnimationRootDisableAll } from '../../helpers/types/animation';

/**
 * Animation hook for InputOTP root component
 * Handles root-level animation configuration and provides context for child components
 */
export function useInputOTPRootAnimation(options: {
  animation: AnimationRootDisableAll | undefined;
}) {
  const { animation } = options;

  const isAllAnimationsDisabled = useCombinedAnimationDisabledState(animation);

  return {
    isAllAnimationsDisabled,
  };
}
