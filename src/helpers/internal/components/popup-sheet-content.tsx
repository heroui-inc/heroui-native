import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  type ReactNode,
} from 'react';
import {
  useAnimatedReaction,
  useSharedValue,
  type SharedValue,
} from 'react-native-reanimated';
import BottomSheet, {
  useBottomSheetAnimation,
} from '../../../components/bottom-sheet/bottom-sheet';
import type {
  BottomSheetProps,
  BottomSheetRef,
} from '../../../components/bottom-sheet/bottom-sheet.types';

/**
 * Props for the sheet behind `presentation="bottom-sheet"` content.
 */
export interface PopupSheetContentProps extends BottomSheetProps {
  /**
   * Whether the owning popup is open. Presents the sheet when it turns
   * `true` and dismisses it when it turns `false`.
   */
  isOpen: boolean;
  /**
   * Called with `false` when the sheet is dismissed natively (drag down,
   * dimmed area tap, Android back).
   */
  onOpenChange: (open: boolean) => void;
  /**
   * Root animation progress of the popup (0=idle, 1=open, 2=close), kept in
   * sync with the sheet position.
   */
  progress: SharedValue<number>;
}

/**
 * Writes the sheet position into the popup's `progress`: 0→1 while the
 * sheet presents, 1→2 while it dismisses, back to 0 once it is gone.
 */
const ProgressSync = ({
  isOpen,
  progress,
}: {
  isOpen: boolean;
  progress: SharedValue<number>;
}) => {
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

/**
 * `BottomSheet` driven by a popup's open state. Used by Popover, Select, and
 * Menu for `presentation="bottom-sheet"`.
 */
export const PopupSheetContent = forwardRef<
  BottomSheetRef,
  PopupSheetContentProps & { children?: ReactNode }
>(
  (
    { children, isOpen, onOpenChange, progress, onDidDismiss, ...props },
    ref
  ) => {
    const sheetRef = useRef<BottomSheetRef>(null);
    useImperativeHandle(ref, () => sheetRef.current as BottomSheetRef, []);

    const isPresentedRef = useRef(false);
    const isOpenRef = useRef(isOpen);
    isOpenRef.current = isOpen;

    useEffect(() => {
      if (isOpen && !isPresentedRef.current) {
        isPresentedRef.current = true;
        sheetRef.current?.present();
      } else if (!isOpen && isPresentedRef.current) {
        sheetRef.current?.dismiss();
      }
    }, [isOpen]);

    /**
     * TrueSheet binds lifecycle handlers once, so the latest `onDidDismiss`
     * and open state are read through refs.
     */
    const onDidDismissRef = useRef(onDidDismiss);
    onDidDismissRef.current = onDidDismiss;
    const onOpenChangeRef = useRef(onOpenChange);
    onOpenChangeRef.current = onOpenChange;

    const handleDidDismiss = useCallback<
      NonNullable<BottomSheetProps['onDidDismiss']>
    >((event) => {
      isPresentedRef.current = false;
      if (isOpenRef.current) {
        onOpenChangeRef.current(false);
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
