import { useSharedValue } from 'react-native-reanimated';
import type {
  AnimationRoot,
  PopupRootAnimationConfig,
} from '../types/animation';
import { useCombinedAnimationDisabledState } from './use-combined-animation-disabled-state';

/**
 * Root animation hook for popup-like components (Dialog, Select, etc.)
 * Manages component state transitions and animation coordination
 */
export function usePopupRootAnimation(options: {
  /** Animation configuration for component root */
  animation?: AnimationRoot<PopupRootAnimationConfig>;
}) {
  const isAllAnimationsDisabled = useCombinedAnimationDisabledState(
    options.animation
  );

  const progress = useSharedValue(0);
  const bottomSheetCloseProgress = useSharedValue(0);
  const isDragging = useSharedValue(false);

  return {
    isAllAnimationsDisabled,
    progress,
    bottomSheetCloseProgress,
    isDragging,
  };
}
