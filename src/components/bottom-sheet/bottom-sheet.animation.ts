import { useAnimationSettings } from '../../helpers/contexts';
import type { AnimationDisabled } from '../../helpers/types/animation';
import { createContext } from '../../helpers/utils';
import {
  getAnimationState,
  getIsAnimationDisabledValue,
} from '../../helpers/utils/animation';
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
