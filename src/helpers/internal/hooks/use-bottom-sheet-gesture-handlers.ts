import type {
  GestureEventHandlerCallbackType,
  GestureEventsHandlersHookType,
} from '@gorhom/bottom-sheet';
import GorhomBottomSheetPackage from '../../../optional/gorhom-bottom-sheet';
import { useBottomSheetIsDragging } from '../contexts/bottom-sheet-is-dragging-context';

export const useBottomSheetGestureHandlers: GestureEventsHandlersHookType =
  () => {
    const { isDragging } = useBottomSheetIsDragging();

    const defaultHandlers =
      GorhomBottomSheetPackage.useGestureEventsHandlersDefault();

    const handleOnStart: GestureEventHandlerCallbackType = (
      source,
      payload
    ) => {
      'worklet';
      isDragging.set(true);
      defaultHandlers.handleOnStart(source, payload);
    };

    const handleOnChange: GestureEventHandlerCallbackType = (
      source,
      payload
    ) => {
      'worklet';
      defaultHandlers.handleOnChange(source, payload);
    };

    const handleOnEnd: GestureEventHandlerCallbackType = (source, payload) => {
      'worklet';
      isDragging.set(false);
      defaultHandlers.handleOnEnd(source, payload);
    };

    const handleOnFinalize: GestureEventHandlerCallbackType = (
      source,
      payload
    ) => {
      'worklet';
      isDragging.set(false);
      defaultHandlers.handleOnFinalize(source, payload);
    };

    return {
      handleOnStart,
      handleOnChange,
      handleOnEnd,
      handleOnFinalize,
    };
  };
