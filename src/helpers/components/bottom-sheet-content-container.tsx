import { BottomSheetView, useBottomSheet } from '@gorhom/bottom-sheet';
import { useEffect } from 'react';
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
  contentContainerClassName,
  contentContainerProps,
  state,
}: BottomSheetContentContainerProps) {
  const { expand, close } = useBottomSheet();

  useEffect(() => {
    if (state === 'open') {
      expand();
    } else if (state === 'close') {
      setTimeout(() => {
        close();
      }, 100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <BottomSheetView
      className={contentContainerClassName}
      {...contentContainerProps}
    >
      {children}
    </BottomSheetView>
  );
}
