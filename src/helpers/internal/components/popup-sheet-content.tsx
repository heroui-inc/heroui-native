import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import BottomSheet from '../../../components/bottom-sheet/bottom-sheet';
import type {
  BottomSheetProps,
  BottomSheetRef,
} from '../../../components/bottom-sheet/bottom-sheet.types';
import type { PopupSheetContentProps } from '../types/bottom-sheet';

/*
 * Not re-exported from the internal components barrel: this file imports
 * `BottomSheet`, which imports that barrel, so Popover, Select, and Menu
 * import it by path to avoid the cycle.
 */

/**
 * `BottomSheet` driven by a popup's open state. Used by Popover, Select, and
 * Menu for `presentation="bottom-sheet"`.
 */
export const PopupSheetContent = forwardRef<
  BottomSheetRef,
  PopupSheetContentProps
>(
  (
    {
      children,
      isOpen,
      onOpenChange,
      contentContainerClassName,
      onDidDismiss,
      ...props
    },
    ref
  ) => {
    const sheetRef = useRef<BottomSheetRef>(null);
    useImperativeHandle(ref, () => sheetRef.current as BottomSheetRef, []);

    /**
     * Skips `dismiss()` while nothing is presented: on mount, and after the
     * sheet closed natively, when TrueSheet would warn that it is already
     * dismissed.
     */
    const isPresentedRef = useRef(false);

    useEffect(() => {
      if (isOpen) {
        isPresentedRef.current = true;
        sheetRef.current?.present();
      } else if (isPresentedRef.current) {
        sheetRef.current?.dismiss();
      }
    }, [isOpen]);

    /**
     * TrueSheet reads this handler when the sheet dismisses, so `isOpen` is
     * current. Still open means the sheet closed natively (drag down, dimmed
     * area tap, Android back) and the popup has to follow.
     */
    const handleDidDismiss: BottomSheetProps['onDidDismiss'] = (event) => {
      isPresentedRef.current = false;

      if (isOpen) {
        onOpenChange(false);
      }

      onDidDismiss?.(event);
    };

    return (
      <BottomSheet ref={sheetRef} onDidDismiss={handleDidDismiss} {...props}>
        <BottomSheet.Content className={contentContainerClassName}>
          {children}
        </BottomSheet.Content>
      </BottomSheet>
    );
  }
);

PopupSheetContent.displayName = 'HeroUINative.PopupSheetContent';
