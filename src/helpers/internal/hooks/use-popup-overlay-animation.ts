import type { SharedValue } from 'react-native-reanimated';
import { interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { useAnimationSettings } from '../contexts/animation-settings-context';
import type { PopupOverlayAnimation } from '../types/animation';
import {
  getAnimationState,
  getAnimationValueProperty,
  getIsAnimationDisabledValue,
} from '../utils/animation';

/**
 * Animation hook for popup overlay components (Dialog, Select, etc.)
 * Handles opacity animation based on popup progress state
 */
export function usePopupOverlayAnimation(options: {
  /** Animation progress shared value (0=idle, 1=open, 2=close) */
  progress: SharedValue<number>;
  /** Dragging state shared value */
  isDragging: SharedValue<boolean>;
  /** Gesture release animation running state shared value (optional, for components with swipe gestures) */
  isGestureReleaseAnimationRunning?: SharedValue<boolean>;
  /** Animation configuration for overlay */
  animation?: PopupOverlayAnimation;
}) {
  const { progress, isDragging, isGestureReleaseAnimationRunning, animation } =
    options;

  const { isAllAnimationsDisabled } = useAnimationSettings();

  const { animationConfig, isAnimationDisabled } = getAnimationState(animation);

  const isAnimationDisabledValue = getIsAnimationDisabledValue({
    isAnimationDisabled,
    isAllAnimationsDisabled,
  });

  // Opacity animation
  const opacityValue = getAnimationValueProperty({
    animationValue: animationConfig?.opacity,
    property: 'value',
    defaultValue: [0, 1, 0] as [number, number, number],
  });

  const rContainerStyle = useAnimatedStyle(() => {
    // Handle disabled state first
    if (isAnimationDisabledValue) {
      return {
        opacity: progress.get() > 0 ? 1 : 0,
      };
    }

    // Handle dragging state - when dragging and progress <= 1, opacity should be 1
    if (
      isDragging.get() ||
      (isGestureReleaseAnimationRunning?.get() && progress.get() <= 1)
    ) {
      return {
        opacity: 1,
      };
    }

    return {
      opacity: interpolate(progress.get(), [0, 1, 2], opacityValue),
    };
  });

  return {
    rContainerStyle,
  };
}
