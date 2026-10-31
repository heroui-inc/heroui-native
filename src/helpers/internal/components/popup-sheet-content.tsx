import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import { useAnimatedReaction, useSharedValue } from 'react-native-reanimated';
import BottomSheet, {
  useBottomSheetAnimation,
} from '../../../components/bottom-sheet/bottom-sheet';
import type {
  BottomSheetProps,
  BottomSheetRef,
} from '../../../components/bottom-sheet/bottom-sheet.types';
import type {
  PopupSheetContentProps,
  PopupSheetProgressSyncProps,
} from '../types/bottom-sheet';

/*
 * Not re-exported from the internal components barrel: this file imports
 * `BottomSheet`, which imports that barrel, so Popover, Select, and Menu
 * import it by path to avoid the cycle.
 */

/**
 * Writes the sheet position into the popup's `progress`: 0→1 while the
 * sheet presents, 1→2 while it dismisses, back to 0 once it is gone.
 */
const ProgressSync = ({ isOpen, progress }: PopupSheetProgressSyncProps) => {
  const { progress: sheetProgress } = useBottomSheetAnimation();
  const isOpenValue = useSharedValue(isOpen);

  useEffect(() => {
    isOpenValue.set(isOpen);
  }, [isOpen, isOpenValue]);

  useAnimatedReaction(
    () => sheetProgress.get(),
    (value) => {
      if (isOpenValue.get()) {
        progress.set(value);
      } else {
        progress.set(value > 0 ? 2 - value : 0);
      }
    }
  );

  return null;
};

// --------------------------------------------------

/**
 * `BottomSheet` driven by a popup's open state. Used by Popover, Select, and
 * Menu for `presentation="bottom-sheet"`.
 */
export const PopupSheetContent = forwardRef<
  BottomSheetRef,
  PopupSheetContentProps
>(
  (
    { children, isOpen, onOpenChange, progress, onDidDismiss, ...props },
    ref
  ) => {
    const sheetRef = useRef<BottomSheetRef>(null);
    useImperativeHandle(ref, () => sheetRef.current as BottomSheetRef, []);

    const isPresentedRef = useRef(false);
    /** Whether the in-flight dismiss was started here rather than natively */
    const isClosingRef = useRef(false);

    const isOpenRef = useRef(isOpen);
    isOpenRef.current = isOpen;
    const onOpenChangeRef = useRef(onOpenChange);
    onOpenChangeRef.current = onOpenChange;
    const onDidDismissRef = useRef(onDidDismiss);
    onDidDismissRef.current = onDidDismiss;

    useEffect(() => {
      if (isOpen && !isPresentedRef.current) {
        isPresentedRef.current = true;
        sheetRef.current?.present();
      } else if (!isOpen && isPresentedRef.current && !isClosingRef.current) {
        isClosingRef.current = true;
        sheetRef.current?.dismiss();
      }
    }, [isOpen]);

    /**
     * Reads the open state through refs so the callback stays stable. A
     * dismiss started here that the popup reopened during re-presents the
     * sheet; a native dismiss (drag, dimmed area, back) closes the popup.
     */
    const handleDidDismiss = useCallback<
      NonNullable<BottomSheetProps['onDidDismiss']>
    >((event) => {
      const wasClosingHere = isClosingRef.current;
      isClosingRef.current = false;
      isPresentedRef.current = false;

      if (isOpenRef.current) {
        if (wasClosingHere) {
          isPresentedRef.current = true;
          sheetRef.current?.present();
        } else {
          onOpenChangeRef.current(false);
        }
      }

      onDidDismissRef.current?.(event);
    }, []);

    return (
      <BottomSheet ref={sheetRef} onDidDismiss={handleDidDismiss} {...props}>
        <ProgressSync isOpen={isOpen} progress={progress} />
        {children}
      </BottomSheet>
    );
  }
);

PopupSheetContent.displayName = 'HeroUINative.PopupSheetContent';
