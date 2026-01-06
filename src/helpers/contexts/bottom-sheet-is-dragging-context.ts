import type { SharedValue } from 'react-native-reanimated';
import { createContext } from '../utils';

const [BottomSheetIsDraggingProvider, useBottomSheetIsDragging] =
  createContext<{
    isDragging: SharedValue<boolean>;
  }>({
    name: 'BottomSheetIsDraggingContext',
  });

export { BottomSheetIsDraggingProvider, useBottomSheetIsDragging };
