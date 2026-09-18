import { useCallback, useEffect, useRef } from 'react';
import { BackHandler } from 'react-native';
import { useAnimatedReaction } from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';
import GorhomBottomSheetPackage from '../../../optional/gorhom-bottom-sheet';
import type { BottomSheetContentContainerProps } from '../types/bottom-sheet';

const BottomSheetView = GorhomBottomSheetPackage?.BottomSheetView;
const useBottomSheet = GorhomBottomSheetPackage?.useBottomSheet;
const useBottomSheetInternal = GorhomBottomSheetPackage?.useBottomSheetInternal;

/**
 * `ANIMATION_STATUS.RUNNING` read eagerly: worklets can capture the plain
 * value, but not the enum object behind the optional package import.
 */
const ANIMATION_STATUS_RUNNING: number =
  GorhomBottomSheetPackage?.ANIMATION_STATUS?.RUNNING ?? 1;

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
  enablePanDownToClose,
}: BottomSheetContentContainerProps) {
  const { close, snapToIndex } = useBottomSheet();
  const { animatedAnimationState, animatedDetentsState, animatedPosition } =
    useBottomSheetInternal();
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
    if (!isOpen || !enablePanDownToClose) return;

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
  }, [isOpen, enablePanDownToClose]);

  /**
   * Retargets a close that is still animating when the container is resized.
   * The zero duration keeps the sheet in step with the resize instead of
   * sliding away afterwards.
   */
  const realignDismissedSheet = useCallback(() => {
    close({ duration: 0 });
  }, [close]);

  /**
   * A dismissed sheet rests at the offset it was closed at, and that offset is
   * only recalculated while the sheet sits at a snap point. Once the container
   * is resized — device rotation, iPad split view — the stale offset can land
   * inside the new container, so the sheet shows up again even though `isOpen`
   * is still `false`, which leaves it unreachable through the overlay.
   *
   * An idle sheet is moved on the spot, in the same frame the resize lands, so
   * the stale offset is never painted. Hopping to the JS thread to close it
   * instead costs a couple of frames, which is long enough to flash the sheet
   * on screen. A close that is still animating owns the position, so that one
   * is retargeted through the public method rather than overwritten.
   */
  useAnimatedReaction(
    () => animatedDetentsState.get().closedDetentPosition,
    (closedPosition, previousClosedPosition) => {
      if (
        isOpen ||
        closedPosition === undefined ||
        previousClosedPosition === undefined ||
        closedPosition === previousClosedPosition
      ) {
        return;
      }

      if (animatedAnimationState.get().status === ANIMATION_STATUS_RUNNING) {
        scheduleOnRN(realignDismissedSheet);
        return;
      }

      animatedPosition.set(closedPosition);
    },
    [
      isOpen,
      animatedAnimationState,
      animatedDetentsState,
      animatedPosition,
      realignDismissedSheet,
    ]
  );

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
