import type { ReanimatedTrueSheetContextValue } from '@lodev09/react-native-true-sheet/reanimated';
import {
  Extrapolation,
  interpolate,
  useDerivedValue,
} from 'react-native-reanimated';
import TrueSheetReanimatedPackage from '../../optional/true-sheet-reanimated';
import type { UseNativeBottomSheetAnimationReturn } from './native-bottom-sheet.types';

export const MISSING_PACKAGE_ERROR =
  'NativeBottomSheet requires @lodev09/react-native-true-sheet. Install it, or use BottomSheet instead.';

function useTrueSheetValues(): ReanimatedTrueSheetContextValue {
  const useReanimatedTrueSheet =
    TrueSheetReanimatedPackage?.useReanimatedTrueSheet;

  if (!useReanimatedTrueSheet) {
    throw new Error(MISSING_PACKAGE_ERROR);
  }

  return useReanimatedTrueSheet();
}

/**
 * Returns the live animation values of the enclosing `NativeBottomSheet`.
 * Must be called inside `NativeBottomSheet`, which owns the sheet's values.
 *
 * @example
 * ```tsx
 * const { animatedPosition } = useNativeBottomSheetAnimation();
 * const style = useAnimatedStyle(() => ({
 *   transform: [{ translateY: animatedPosition.get() - 40 }],
 * }));
 * ```
 */
export function useNativeBottomSheetAnimation(): UseNativeBottomSheetAnimationReturn {
  const trueSheetValues = useTrueSheetValues();
  const { animatedIndex } = trueSheetValues;

  const progress = useDerivedValue(() =>
    interpolate(animatedIndex.get(), [-1, 0], [0, 1], Extrapolation.CLAMP)
  );

  return { ...trueSheetValues, progress };
}
