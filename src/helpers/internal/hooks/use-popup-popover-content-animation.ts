import { useEffect } from 'react';
import {
  Easing,
  Keyframe,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
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
 * Duration (ms) of the shared-value driven entering transition.
 * Mirrors the default entering Keyframe duration.
 */
const DRIVEN_ENTERING_DURATION = 200;

/**
 * Maximum translate distance (px) applied during the entering transition.
 * Mirrors the clamp used by the default entering/exiting Keyframes.
 */
const MAX_TRANSLATE_DISTANCE = 12;

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
  /**
   * Whether the content has been measured and positioned on screen.
   * The driven entering transition only plays once this becomes `true`,
   * which allows the content subtree to be mounted a single time while
   * still animating in at the correct position.
   * @default false
   */
  isReady?: boolean;
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
 * Get the signed translate axis/distance for the driven entering transition.
 * `top`/`left` start at `+distance`, `bottom`/`right` start at `-distance`,
 * mirroring the default exiting Keyframe's direction per placement.
 */
function getEnteringTranslate(
  placement: PopoverContentPlacement,
  offset: number
): { axis: 'x' | 'y'; distance: number } {
  const distance = Math.min(offset, MAX_TRANSLATE_DISTANCE);

  switch (placement) {
    case 'top':
      return { axis: 'y', distance };
    case 'bottom':
      return { axis: 'y', distance: -distance };
    case 'left':
      return { axis: 'x', distance };
    case 'right':
      return { axis: 'x', distance: -distance };
  }
}

/**
 * Animation hook for popover/select content components.
 *
 * Returns a shared-value driven entering style (`rEnteringStyle`) plus the
 * exiting Keyframe. The driven entering style lets the content subtree mount a
 * single time (for measurement) while the enter animation is deferred until the
 * content is positioned on screen (`isReady`). When a custom `entering` Keyframe
 * is supplied, `isDrivenEntering` is `false` and the consumer should fall back
 * to the legacy Keyframe entering path.
 */
export function usePopupPopoverContentAnimation({
  placement,
  offset,
  animation,
  isReady = false,
}: UsePopupPopoverContentAnimationProps) {
  const { isAllAnimationsDisabled } = useAnimationSettings();

  const { animationConfig, isAnimationDisabled } = getAnimationState(animation);

  const isAnimationDisabledValue = getIsAnimationDisabledValue({
    isAnimationDisabled,
    isAllAnimationsDisabled,
  });

  const customEntering = animationConfig?.entering;

  // The entering transition is driven via a shared value whenever no custom
  // entering Keyframe is supplied. This keeps the content mounted once while
  // still animating in at the resolved position.
  const isDrivenEntering = !customEntering;

  // Get exiting animation value with default based on placement
  const exitingValue =
    animationConfig?.exiting ?? getDefaultExitingAnimation(placement, offset);

  const { axis, distance } = getEnteringTranslate(placement, offset);

  const progress = useSharedValue(0);

  useEffect(() => {
    if (!isReady) {
      progress.set(0);
      return;
    }

    if (isAnimationDisabledValue) {
      progress.set(1);
      return;
    }

    progress.set(
      withTiming(1, {
        duration: DRIVEN_ENTERING_DURATION,
        easing: Easing.out(Easing.ease),
      })
    );
  }, [isReady, isAnimationDisabledValue, progress]);

  const rEnteringStyle = useAnimatedStyle(() => {
    const opacity = interpolate(progress.get(), [0, 1], [0, 1]);
    const scale = interpolate(progress.get(), [0, 1], [0.97, 1]);
    const translate = interpolate(progress.get(), [0, 1], [distance, 0]);

    return {
      opacity,
      transform:
        axis === 'y'
          ? [{ translateY: translate }, { scale }]
          : [{ translateX: translate }, { scale }],
    };
  });

  // Return entering/exiting animations plus the driven entering style.
  // If animations are disabled, Keyframe animations are undefined; the driven
  // style still resolves to the fully-shown state once `isReady` is `true`.
  return {
    isDrivenEntering,
    rEnteringStyle,
    entering:
      isDrivenEntering || isAnimationDisabledValue ? undefined : customEntering,
    exiting: isAnimationDisabledValue ? undefined : exitingValue,
  };
}
