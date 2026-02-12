import { useBottomSheetInternal } from '@gorhom/bottom-sheet';
import { useCallback } from 'react';
import {
  findNodeHandle,
  TextInput,
  type BlurEvent,
  type FocusEvent,
} from 'react-native';

/**
 * Parameters for the bottom-sheet-aware handlers hook
 */
interface UseBottomSheetAwareHandlersParams {
  /** User-provided onFocus handler to preserve */
  onFocus?: ((e: FocusEvent) => void) | undefined;
  /** User-provided onBlur handler to preserve */
  onBlur?: ((e: BlurEvent) => void) | undefined;
  /** Whether automatic bottom sheet keyboard handling is enabled */
  isBottomSheetAware?: boolean;
}

/**
 * Internal hook that automatically manages bottom sheet keyboard state
 * when the component is rendered inside a BottomSheet context.
 *
 * Uses `useBottomSheetInternal(true)` (unsafe mode) so it returns `null`
 * instead of throwing when called outside a BottomSheet. When inside a
 * BottomSheet and `isBottomSheetAware` is true, it wraps the provided
 * `onFocus`/`onBlur` handlers with the keyboard state management logic
 * required by `@gorhom/bottom-sheet`.
 *
 * @param params - The handler parameters
 * @returns Merged onFocus and onBlur handlers
 */
export function useBottomSheetAwareHandlers({
  onFocus: onFocusProp,
  onBlur: onBlurProp,
  isBottomSheetAware = true,
}: UseBottomSheetAwareHandlersParams) {
  const bottomSheetContext = useBottomSheetInternal(true);

  /** Whether the bottom sheet keyboard handling should be active */
  const isActive = isBottomSheetAware && bottomSheetContext !== null;

  /**
   * Handles focus event: notifies the bottom sheet about the keyboard target,
   * then delegates to the user-provided onFocus handler.
   */
  const onFocus = useCallback(
    (e: FocusEvent) => {
      if (isActive && bottomSheetContext) {
        bottomSheetContext.animatedKeyboardState.set((state) => ({
          ...state,
          target: e.nativeEvent.target,
        }));
      }

      onFocusProp?.(e);
    },
    [isActive, bottomSheetContext, onFocusProp]
  );

  /**
   * Handles blur event: conditionally clears the keyboard target in the
   * bottom sheet state, then delegates to the user-provided onBlur handler.
   */
  const onBlur = useCallback(
    (e: BlurEvent) => {
      if (isActive && bottomSheetContext) {
        const keyboardState = bottomSheetContext.animatedKeyboardState.get();
        const currentFocusedInput = findNodeHandle(
          TextInput.State.currentlyFocusedInput() as TextInput | null
        );
        const shouldRemoveCurrentTarget =
          keyboardState.target === e.nativeEvent.target;
        const shouldIgnoreBlurEvent =
          currentFocusedInput &&
          bottomSheetContext.textInputNodesRef.current.has(currentFocusedInput);

        if (shouldRemoveCurrentTarget && !shouldIgnoreBlurEvent) {
          bottomSheetContext.animatedKeyboardState.set((state) => ({
            ...state,
            target: undefined,
          }));
        }
      }

      onBlurProp?.(e);
    },
    [isActive, bottomSheetContext, onBlurProp]
  );

  return { onFocus, onBlur };
}
