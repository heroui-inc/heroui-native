import { useBottomSheetInternal } from '@gorhom/bottom-sheet';
import { useCallback } from 'react';
import {
  findNodeHandle,
  TextInput,
  type BlurEvent,
  type FocusEvent,
} from 'react-native';

/**
 * Hook that provides keyboard handling functions for bottom sheet integration
 *
 * This hook manages focus and blur events to properly communicate with the
 * bottom sheet's internal keyboard state management. It should only be used
 * inside a BottomSheet.Content component from @gorhom/bottom-sheet.
 *
 * @returns Object containing onFocus and onBlur functions
 * @throws Error if called outside a BottomSheet.Content context
 *
 */
export function useBottomSheetInputHandlers() {
  const { animatedKeyboardState, textInputNodesRef } = useBottomSheetInternal();

  /**
   * Handles focus event to notify bottom sheet about keyboard target
   */
  const onFocus = useCallback(
    (e: FocusEvent) => {
      animatedKeyboardState.set((state) => ({
        ...state,
        target: e.nativeEvent.target,
      }));
    },
    [animatedKeyboardState]
  );

  /**
   * Handles blur event to clean up keyboard state when input loses focus
   */
  const onBlur = useCallback(
    (e: BlurEvent) => {
      const keyboardState = animatedKeyboardState.get();
      const currentFocusedInput = findNodeHandle(
        TextInput.State.currentlyFocusedInput() as TextInput | null
      );
      const shouldRemoveCurrentTarget =
        keyboardState.target === e.nativeEvent.target;
      const shouldIgnoreBlurEvent =
        currentFocusedInput &&
        textInputNodesRef.current.has(currentFocusedInput);

      if (shouldRemoveCurrentTarget && !shouldIgnoreBlurEvent) {
        animatedKeyboardState.set((state) => ({
          ...state,
          target: undefined,
        }));
      }
    },
    [animatedKeyboardState, textInputNodesRef]
  );

  return {
    onFocus,
    onBlur,
  };
}
