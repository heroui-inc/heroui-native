import { useSharedValue } from 'react-native-reanimated';
import type { AnimationRootDisableAll } from '../types/animation';
import { useCombinedAnimationDisabledState } from './use-combined-animation-disabled-state';

/**
 * Root animation hook for popup-like components (Dialog, Select, etc.)
 * Manages component state transitions and animation coordination
 */
export function usePopupRootAnimation(options: {
  animation?: AnimationRootDisableAll;
}) {
  const isAllAnimationsDisabled = useCombinedAnimationDisabledState(
    options.animation
  );

  const progress = useSharedValue(0);
  const isDragging = useSharedValue(false);
  const isGestureReleaseAnimationRunning = useSharedValue(false);

  return {
    isAllAnimationsDisabled,
    progress,
    isDragging,
    isGestureReleaseAnimationRunning,
  };
}
