import type { ReanimatedTrueSheetContextValue } from '@lodev09/react-native-true-sheet/reanimated';
import {
  Extrapolation,
  interpolate,
  useDerivedValue,
} from 'react-native-reanimated';
import { useCombinedAnimationDisabledState } from '../../helpers/internal/hooks';
import type { AnimationRootDisableAll } from '../../helpers/internal/types';
import TrueSheetReanimatedPackage from '../../optional/true-sheet-reanimated';
import { MISSING_PACKAGE_ERROR } from './bottom-sheet.constants';
import type { UseBottomSheetAnimationReturn } from './bottom-sheet.types';

/**
 * Animation hook for BottomSheet root component. Resolves the `disable-all`
 * cascade for the sheet's animated descendants.
 */
export function useBottomSheetRootAnimation(options: {
  animation: AnimationRootDisableAll | undefined;
}) {
  const { animation } = options;

  const isAllAnimationsDisabled = useCombinedAnimationDisabledState(animation);

  return {
    isAllAnimationsDisabled,
  };
}

// --------------------------------------------------

function useTrueSheetValues(): ReanimatedTrueSheetContextValue {
  const useReanimatedTrueSheet =
    TrueSheetReanimatedPackage?.useReanimatedTrueSheet;

  if (!useReanimatedTrueSheet) {
    throw new Error(MISSING_PACKAGE_ERROR);
  }

  return useReanimatedTrueSheet();
}

// --------------------------------------------------

/**
 * Returns the live animation values of the enclosing `BottomSheet`.
 * Must be called inside `BottomSheet`, which owns the sheet's values.
 *
 * @example
 * ```tsx
 * const { animatedPosition } = useBottomSheetAnimation();
 * const style = useAnimatedStyle(() => ({
 *   transform: [{ translateY: animatedPosition.get() - 40 }],
 * }));
 * ```
 */
export function useBottomSheetAnimation(): UseBottomSheetAnimationReturn {
  const trueSheetValues = useTrueSheetValues();
  const { animatedIndex } = trueSheetValues;

  const progress = useDerivedValue(() =>
    interpolate(animatedIndex.get(), [-1, 0], [0, 1], Extrapolation.CLAMP)
  );

  return { ...trueSheetValues, progress };
}
