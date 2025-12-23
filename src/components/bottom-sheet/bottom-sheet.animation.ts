import { createContext } from '../../helpers/utils';
import type { BottomSheetAnimationContextValue } from './bottom-sheet.types';

const [BottomSheetAnimationProvider, useBottomSheetAnimation] =
  createContext<BottomSheetAnimationContextValue>({
    name: 'BottomSheetAnimationContext',
  });

export { BottomSheetAnimationProvider, useBottomSheetAnimation };
