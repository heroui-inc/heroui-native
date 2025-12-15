import { useAnimationSettings } from '../../helpers/contexts/animation-settings-context';
import type { AnimationRootDisableAll } from '../../helpers/types/animation';
import {
  getCombinedAnimationDisabledState,
  getRootAnimationState,
} from '../../helpers/utils/animation';
import { useGlobalAnimationSettings } from '../../providers/animation-settings';

/**
 * Animation hook for FormField root component
 * Handles root-level animation configuration and provides context for child components
 */
export function useFormFieldRootAnimation(options: {
  animation: AnimationRootDisableAll | undefined;
}) {
  const { animation } = options;

  // Get global animation disabled state
  const { globalIsAllAnimationsDisabled } = useGlobalAnimationSettings();

  // Read parent animation disabled state from global context
  const parentAnimationSettingsContext = useAnimationSettings();
  const parentIsAllAnimationsDisabled =
    parentAnimationSettingsContext?.isAllAnimationsDisabled;

  const { isAllAnimationsDisabled: ownIsAllAnimationsDisabled } =
    getRootAnimationState(animation);

  // Combine global, parent, and own disable-all states (global > parent > own)
  const isAllAnimationsDisabled = getCombinedAnimationDisabledState({
    globalIsAllAnimationsDisabled,
    parentIsAllAnimationsDisabled,
    ownIsAllAnimationsDisabled,
  });

  return {
    isAllAnimationsDisabled,
  };
}
