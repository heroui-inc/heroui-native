import { useAnimationSettings } from '../../helpers/contexts/animation-settings-context';
import type { AnimationRootDisableAll } from '../../helpers/types/animation';
import {
  getCombinedAnimationDisabledState,
  getRootAnimationState,
} from '../../helpers/utils/animation';

/**
 * Animation hook for Chip root component
 * Handles root-level animation configuration and provides context for child components
 */
export function useChipRootAnimation(options: {
  animation: AnimationRootDisableAll | undefined;
}) {
  const { animation } = options;

  // Read parent animation disabled state from global context
  const parentAnimationSettingsContext = useAnimationSettings();
  const parentIsAllAnimationsDisabled =
    parentAnimationSettingsContext?.isAllAnimationsDisabled;

  const { isAllAnimationsDisabled: ownIsAllAnimationsDisabled } =
    getRootAnimationState(animation);

  // Combine parent and own disable-all states (parent wins)
  const isAllAnimationsDisabled = getCombinedAnimationDisabledState({
    parentIsAllAnimationsDisabled,
    ownIsAllAnimationsDisabled,
  });

  return {
    isAllAnimationsDisabled,
  };
}
