import { useGlobalAnimationSettings } from '../../../providers/animation-settings';
import { useAnimationSettings } from '../contexts/animation-settings-context';
import type { AnimationRoot } from '../types/animation';
import {
  getCombinedAnimationDisabledState,
  getRootAnimationState,
} from '../utils/animation';

/**
 * Hook to combine global, parent, and own animation disabled states
 *
 * @description
 * This hook combines three sources of animation disabled state:
 * 1. Global state from GlobalAnimationSettingsProvider
 * 2. Parent state from AnimationSettingsContext (component tree cascading)
 * 3. Own state from the component's animation prop
 *
 * Priority: Global > Parent > Own (global wins if enabled)
 *
 * @param animation - Root animation configuration for the component
 * @returns Combined isAllAnimationsDisabled value
 *
 * @example
 * ```tsx
 * const isAllAnimationsDisabled = useCombinedAnimationDisabledState(animation);
 * ```
 */
export function useCombinedAnimationDisabledState<
  TConfig extends Record<string, any>,
>(animation: AnimationRoot<TConfig> | undefined): boolean {
  // Get global animation disabled state
  const { globalIsAllAnimationsDisabled } = useGlobalAnimationSettings();

  // Read parent animation disabled state from global context
  const parentAnimationSettingsContext = useAnimationSettings();
  const parentIsAllAnimationsDisabled =
    parentAnimationSettingsContext?.isAllAnimationsDisabled;

  // Get own animation disabled state
  const { isAllAnimationsDisabled: ownIsAllAnimationsDisabled } =
    getRootAnimationState(animation);

  // Combine global, parent, and own disable-all states (global > parent > own)
  return getCombinedAnimationDisabledState({
    globalIsAllAnimationsDisabled,
    parentIsAllAnimationsDisabled,
    ownIsAllAnimationsDisabled,
  });
}
