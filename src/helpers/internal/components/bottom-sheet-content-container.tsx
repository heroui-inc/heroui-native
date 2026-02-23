import { BottomSheetView, useBottomSheet } from '@gorhom/bottom-sheet';
import { useEffect, useRef } from 'react';
import { BackHandler } from 'react-native';
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
  isPanActivated,
  isClosingOnSwipe,
  initialIndex,
  contentContainerClassName,
  contentContainerProps,
  onOpenChange,
}: BottomSheetContentContainerProps) {
  const { close, snapToIndex } = useBottomSheet();
  const prevIsOpenRef = useRef(isOpen);

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
      if (value === 2) {
        isPanActivated.set(false);
      }
    }
  );

  /**
   * Dismiss the bottom sheet when the Android hardware back button is pressed.
   * Only registers the listener while the sheet is open so that closed
   * instances (Popover, Select, other BottomSheets) don't consume the event.
   */
  useEffect(() => {
    if (!isOpen) return;

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        close();
        onOpenChange(false);
        return true;
      }
    );

    return () => {
      backHandler.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  useEffect(() => {
    const wasOpen = prevIsOpenRef.current;
    prevIsOpenRef.current = isOpen;

    if (isOpen && !wasOpen) {
      // Only snap to initial index when transitioning from closed to open
      isPanActivated.set(false);
      snapToIndex(initialIndex);
    } else if (!isOpen && wasOpen) {
      // Close when transitioning from open to closed
      close();
    }
    // Note: We intentionally don't include snapToIndex, close, or isPanActivated
    // in the dependency array to prevent re-snapping when content re-renders.
    // We only want to snap when isOpen or initialIndex changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, initialIndex]);

  return (
    <BottomSheetView
      className={contentContainerClassName}
      {...contentContainerProps}
    >
      {children}
    </BottomSheetView>
  );
}
