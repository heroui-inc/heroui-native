import type { SharedValue } from 'react-native-reanimated';
import {
  Extrapolation,
  interpolate,
  useAnimatedReaction,
  useSharedValue,
} from 'react-native-reanimated';

/**
 * Props for usePopupBottomSheetContentAnimation hook
 */
export interface UsePopupBottomSheetContentAnimationProps {
  /**
   * Animation progress shared value (0=idle, 1=open, 2=close)
   */
  progress: SharedValue<number>;
  /**
   * Dragging state shared value
   */
  isDragging: SharedValue<boolean>;
}

/**
 * Animation hook for popup bottom sheet content components (Popover, Select bottom sheet presentation)
 * Handles synchronization between BottomSheet animatedIndex and popup progress state
 */
export function usePopupBottomSheetContentAnimation({
  progress,
  isDragging,
}: UsePopupBottomSheetContentAnimationProps) {
  const animatedIndex = useSharedValue(-1);
  const isPanActivated = useSharedValue(false);
  const isClosingOnSwipe = useSharedValue(false);

  useAnimatedReaction(
    () => isDragging.get(),
    (current, previous) => {
      if (current && !previous) {
        isClosingOnSwipe.set(false);
      }
      if (!isPanActivated.get() && current) {
        isPanActivated.set(true);
      }
    }
  );

  useAnimatedReaction(
    () => animatedIndex.get(),
    (current) => {
      if (!isPanActivated.get()) {
        progress.set(
          interpolate(current, [-1, 0], [0, 1], Extrapolation.CLAMP)
        );
      } else {
        progress.set(
          interpolate(current, [0, -1], [1, 2], Extrapolation.CLAMP)
        );
      }
    }
  );

  return {
    animatedIndex,
    isPanActivated,
    isClosingOnSwipe,
  };
}
