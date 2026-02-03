import {
  Easing,
  Keyframe,
  type EntryOrExitLayoutType,
} from 'react-native-reanimated';
import { useAnimationSettings } from '../contexts/animation-settings-context';
import type { PopupPopoverContentAnimation } from '../types/animation';
import {
  getAnimationState,
  getIsAnimationDisabledValue,
} from '../utils/animation';

/**
 * Placement options for popover/select content
 */
export type PopoverContentPlacement = 'top' | 'bottom' | 'left' | 'right';

/**
 * Props for usePopupPopoverContentAnimation hook
 */
export interface UsePopupPopoverContentAnimationProps {
  /**
   * Placement of the popover/select content
   */
  placement: PopoverContentPlacement;
  /**
   * Alignment offset for the popover content
   */
  offset: number;
  /**
   * Animation configuration for content
   */
  animation?: PopupPopoverContentAnimation;
}
/**
 * Get default entering animation based on placement
 * Uses Keyframes with translateY/translateX, scale, and opacity transitions
 */
function getDefaultEnteringAnimation(
  placement: PopoverContentPlacement,
  offset: number
): EntryOrExitLayoutType {
  const translateDistance = Math.min(offset, 12);

  switch (placement) {
    case 'top':
      // Content comes from below (translateY: translateDistance -> 0)
      return new Keyframe({
        0: {
          transform: [{ translateY: translateDistance }, { scale: 0.97 }],
          opacity: 0.25,
        },
        100: {
          transform: [{ translateY: 0 }, { scale: 1 }],
          opacity: 1,
          easing: Easing.out(Easing.ease),
        },
      }).duration(200);
    case 'bottom':
      // Content comes from above (translateY: -translateDistance -> 0)
      return new Keyframe({
        0: {
          transform: [{ translateY: -translateDistance }, { scale: 0.97 }],
          opacity: 0.25,
        },
        100: {
          transform: [{ translateY: 0 }, { scale: 1 }],
          opacity: 1,
          easing: Easing.out(Easing.ease),
        },
      }).duration(200);
    case 'left':
      // Content comes from right (translateX: translateDistance -> 0)
      return new Keyframe({
        0: {
          transform: [{ translateX: translateDistance }, { scale: 0.97 }],
          opacity: 0.25,
        },
        100: {
          transform: [{ translateX: 0 }, { scale: 1 }],
          opacity: 1,
          easing: Easing.out(Easing.ease),
        },
      }).duration(200);
    case 'right':
      // Content comes from left (translateX: -translateDistance -> 0)
      return new Keyframe({
        0: {
          transform: [{ translateX: -translateDistance }, { scale: 0.97 }],
          opacity: 0.25,
        },
        100: {
          transform: [{ translateX: 0 }, { scale: 1 }],
          opacity: 1,
          easing: Easing.out(Easing.ease),
        },
      }).duration(200);
  }
}

/**
 * Get default exiting animation based on placement
 * Mirrors the entering animation for each placement
 */
function getDefaultExitingAnimation(
  placement: PopoverContentPlacement,
  offset: number
): EntryOrExitLayoutType {
  const translateDistance = Math.min(offset, 12);

  switch (placement) {
    case 'top':
      // Content exits downward (translateY: 0 -> translateDistance)
      return new Keyframe({
        0: {
          transform: [{ translateY: 0 }, { scale: 1 }],
          opacity: 1,
        },
        100: {
          transform: [{ translateY: translateDistance }, { scale: 0.97 }],
          opacity: 0,
          easing: Easing.out(Easing.ease),
        },
      }).duration(150);
    case 'bottom':
      // Content exits upward (translateY: 0 -> -translateDistance)
      return new Keyframe({
        0: {
          transform: [{ translateY: 0 }, { scale: 1 }],
          opacity: 1,
        },
        100: {
          transform: [{ translateY: -translateDistance }, { scale: 0.97 }],
          opacity: 0,
          easing: Easing.out(Easing.ease),
        },
      }).duration(150);
    case 'left':
      // Content exits rightward (translateX: 0 -> translateDistance)
      return new Keyframe({
        0: {
          transform: [{ translateX: 0 }, { scale: 1 }],
          opacity: 1,
        },
        100: {
          transform: [{ translateX: translateDistance }, { scale: 0.97 }],
          opacity: 0,
          easing: Easing.out(Easing.ease),
        },
      }).duration(150);
    case 'right':
      // Content exits leftward (translateX: 0 -> -translateDistance)
      return new Keyframe({
        0: {
          transform: [{ translateX: 0 }, { scale: 1 }],
          opacity: 1,
        },
        100: {
          transform: [{ translateX: -translateDistance }, { scale: 0.97 }],
          opacity: 0,
          easing: Easing.out(Easing.ease),
        },
      }).duration(150);
  }
}

/**
 * Animation hook for popover/select content components
 * Returns entering and exiting animations based on configuration and placement
 */
export function usePopupPopoverContentAnimation({
  placement,
  offset,
  animation,
}: UsePopupPopoverContentAnimationProps) {
  const { isAllAnimationsDisabled } = useAnimationSettings();

  const { animationConfig, isAnimationDisabled } = getAnimationState(animation);

  const isAnimationDisabledValue = getIsAnimationDisabledValue({
    isAnimationDisabled,
    isAllAnimationsDisabled,
  });

  // Get entering animation value with default based on placement
  const enteringValue =
    animationConfig?.entering ?? getDefaultEnteringAnimation(placement, offset);

  // Get exiting animation value with default based on placement
  const exitingValue =
    animationConfig?.exiting ?? getDefaultExitingAnimation(placement, offset);

  // Return entering and exiting animations
  // If animations are disabled, return undefined to disable animations
  return {
    entering: isAnimationDisabledValue ? undefined : enteringValue,
    exiting: isAnimationDisabledValue ? undefined : exitingValue,
  };
}
