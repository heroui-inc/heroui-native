import { useCombinedAnimationDisabledState } from '../../helpers/internal/hooks';
import type { AnimationRootDisableAll } from '../../helpers/internal/types';

/**
 * Animation hook for Label root component
 * Handles root-level animation configuration and provides context for child components
 */
export function useLabelRootAnimation(options: {
  animation: AnimationRootDisableAll | undefined;
}) {
  const { animation } = options;

  const isAllAnimationsDisabled = useCombinedAnimationDisabledState(animation);

  return {
    isAllAnimationsDisabled,
  };
}
