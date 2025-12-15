import { useEffect } from 'react';
import type { SharedValue } from 'react-native-reanimated';
import {
  interpolate,
  useAnimatedReaction,
  useSharedValue,
} from 'react-native-reanimated';
import { useAnimationSettings } from '../contexts/animation-settings-context';
import { getIsAnimationDisabledValue } from '../utils';

/**
 * Component state type for popup-like components
 */
type ComponentState = 'idle' | 'open' | 'close';

/**
 * Props for usePopupBottomSheetContentAnimation hook
 */
export interface UsePopupBottomSheetContentAnimationProps {
  /**
   * Animation progress shared value (0=idle, 1=open, 2=close)
   */
  progress: SharedValue<number>;
  /**
   * Current component state
   */
  componentState: ComponentState;
}

/**
 * Animation hook for popup bottom sheet content components (Popover, Select bottom sheet presentation)
 * Handles synchronization between BottomSheet animatedIndex and popup progress state
 */
export function usePopupBottomSheetContentAnimation({
  progress,
  componentState,
}: UsePopupBottomSheetContentAnimationProps) {
  const { isAllAnimationsDisabled } = useAnimationSettings();

  const animatedIndex = useSharedValue(0);

  const isAnimationDisabledValue = getIsAnimationDisabledValue({
    isAnimationDisabled: false,
    isAllAnimationsDisabled,
  });

  // Handle animation disabled state - set progress directly based on component state
  useEffect(() => {
    if (isAnimationDisabledValue) {
      if (componentState === 'open') {
        progress.set(1);
      } else if (componentState === 'close') {
        progress.set(2);
      } else {
        progress.set(0);
      }
    }
  }, [componentState, isAnimationDisabledValue, progress]);

  // Handle animation enabled state - sync animatedIndex with progress
  useAnimatedReaction(
    () => animatedIndex.get(),
    (value) => {
      if (
        !isAnimationDisabledValue &&
        componentState === 'open' &&
        value <= 0
      ) {
        progress.set(interpolate(animatedIndex.get(), [0, -1], [1, 2]));
      }
    }
  );

  return {
    animatedIndex,
  };
}
