import { useCombinedAnimationDisabledState } from '../../helpers/internal/hooks';
import type { AnimationRootDisableAll } from '../../helpers/internal/types';

/**
 * Animation hook for Slider root component.
 * Handles root-level animation configuration and provides
 * cascading disable-all state for child components.
 */
export function useSliderRootAnimation(options: {
  animation: AnimationRootDisableAll | undefined;
}) {
  const { animation } = options;

  const isAllAnimationsDisabled = useCombinedAnimationDisabledState(animation);

  return {
    isAllAnimationsDisabled,
  };
}
