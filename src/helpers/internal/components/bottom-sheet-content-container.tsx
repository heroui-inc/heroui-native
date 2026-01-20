import { BottomSheetView, useBottomSheet } from '@gorhom/bottom-sheet';
import { useEffect } from 'react';
import {
  useAnimatedReaction,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';
import type { BottomSheetContentContainerProps } from '../types/bottom-sheet';

/**
 * Reusable BottomSheetContentContainer component
 *
 * This component handles the content container for bottom sheets used across
 * BottomSheet, Popover, and Select components. It manages the expand/close
 * behavior based on the provided state and applies consistent styling.
 *
 * @example
 * ```tsx
 * <BottomSheetContentContainer
 *   state={bottomSheetState}
 *   contentContainerClassName="custom-class"
 * >
 *   {children}
 * </BottomSheetContentContainer>
 * ```
 */
export function BottomSheetContentContainer({
  children,
  state,
  progress,
  isDragging,
  isClosingOnSwipe,
  initialIndex,
  contentContainerClassName,
  contentContainerProps,
  onOpenChange,
}: BottomSheetContentContainerProps) {
  const { forceClose, snapToIndex } = useBottomSheet();

  const isCloseBottomSheetEnabled = useDerivedValue(() => {
    if (progress.get() > 1.75 && !isDragging.get()) {
      return true;
    }
    return false;
  });

  const closeBottomSheet = () => {
    progress.set(withTiming(2, { duration: 100 }));
    forceClose();
    onOpenChange(false);
  };

  useAnimatedReaction(
    () => isCloseBottomSheetEnabled.get(),
    (value) => {
      if (value) {
        if (isClosingOnSwipe.get()) {
          return;
        }
        isClosingOnSwipe.set(true);
        scheduleOnRN(closeBottomSheet);
      }
    }
  );

  useEffect(() => {
    if (state === 'open') {
      setTimeout(() => {
        snapToIndex(initialIndex);
      }, 50);
      return;
    }
  }, [state, snapToIndex, initialIndex]);

  return (
    <BottomSheetView
      className={contentContainerClassName}
      {...contentContainerProps}
    >
      {children}
    </BottomSheetView>
  );
}
