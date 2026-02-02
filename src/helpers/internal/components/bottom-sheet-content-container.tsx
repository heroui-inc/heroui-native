import { BottomSheetView, useBottomSheet } from '@gorhom/bottom-sheet';
import { useEffect } from 'react';
import { useAnimatedReaction } from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';
import type { BottomSheetContentContainerProps } from '../types/bottom-sheet';

/**
 * Reusable BottomSheetContentContainer component
 *
 * This component handles the content container for bottom sheets used across
 * BottomSheet, Popover, and Select components. It manages the expand/close
 * behavior based on the provided state and applies consistent styling.
 *
 */
export function BottomSheetContentContainer({
  children,
  isOpen,
  progress,
  isDragging,
  isClosingOnSwipe,
  initialIndex,
  contentContainerClassName,
  contentContainerProps,
  onOpenChange,
}: BottomSheetContentContainerProps) {
  const { close, snapToIndex } = useBottomSheet();

  const closeBottomSheet = () => {
    onOpenChange(false);
  };

  useAnimatedReaction(
    () => progress.get(),
    (value) => {
      if (value > 1.5 && !isDragging.get() && !isClosingOnSwipe.get()) {
        isClosingOnSwipe.set(true);
        scheduleOnRN(closeBottomSheet);
      }
    }
  );

  useEffect(() => {
    if (isOpen) {
      snapToIndex(initialIndex);
    } else {
      close();
    }
  }, [isOpen, snapToIndex, initialIndex, close]);

  return (
    <BottomSheetView
      className={contentContainerClassName}
      {...contentContainerProps}
    >
      {children}
    </BottomSheetView>
  );
}
