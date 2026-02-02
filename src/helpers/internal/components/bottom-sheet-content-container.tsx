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

  const isCloseBottomSheetEnabled = useDerivedValue(() => {
    console.log('🔴 progress 🔴', progress.get()); // VS remove
    if (progress.get() > 1.75 && !isDragging.get()) {
      return true;
    }
    return false;
  });

  const closeBottomSheet = () => {
    progress.set(withTiming(2, { duration: 100 }));
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
