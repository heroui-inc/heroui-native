import { useAnimationSettings } from '../../helpers/internal/contexts';
import type { AnimationDisabled } from '../../helpers/internal/types';
import {
  createContext,
  getAnimationState,
  getIsAnimationDisabledValue,
} from '../../helpers/internal/utils';
import type { BottomSheetAnimationContextValue } from './bottom-sheet.types';

const [BottomSheetAnimationProvider, useBottomSheetAnimation] =
  createContext<BottomSheetAnimationContextValue>({
    name: 'BottomSheetAnimationContext',
  });

export { BottomSheetAnimationProvider, useBottomSheetAnimation };

// --------------------------------------------------

/**
 * Animation hook for BottomSheet Content component
 * Handles animation disabled state based on local and global animation settings
 */
export function useBottomSheetContentAnimation(options: {
  /** Animation configuration for bottom sheet content */
  animation: AnimationDisabled | undefined;
}) {
  const { animation } = options;

  // Read from global animation context (always available in compound parts)
  const { isAllAnimationsDisabled } = useAnimationSettings();

  const { isAnimationDisabled } = getAnimationState(animation);

  const isAnimationDisabledValue = getIsAnimationDisabledValue({
    isAnimationDisabled,
    isAllAnimationsDisabled,
  });

  return {
    isAnimationDisabledValue,
  };
}
