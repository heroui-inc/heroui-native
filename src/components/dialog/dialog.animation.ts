import type { ViewStyle } from 'react-native';
import { interpolate, useAnimatedStyle } from 'react-native-reanimated';
import { useAnimationSettings } from '../../helpers/contexts/animation-settings-context';
import { createContext } from '../../helpers/utils';
import {
  getAnimationState,
  getAnimationValueProperty,
  getIsAnimationDisabledValue,
  getStyleProperties,
} from '../../helpers/utils/animation';
import type {
  DialogAnimationContextValue,
  DialogOverlayAnimation,
} from './dialog.types';

const [DialogAnimationProvider, useDialogAnimation] =
  createContext<DialogAnimationContextValue>({
    name: 'DialogAnimationContext',
  });

export { DialogAnimationProvider, useDialogAnimation };

// --------------------------------------------------

/**
 * Animation hook for Dialog Overlay component
 * Handles opacity animation based on dialog progress state
 */
export function useDialogOverlayAnimation(options: {
  animation: DialogOverlayAnimation | undefined;
  style: ViewStyle | undefined;
}) {
  const { animation, style } = options;

  const { progress, isDragging, isGestureReleaseAnimationRunning } =
    useDialogAnimation();

  // Read from global animation context (always available in compound parts)
  const { isAllAnimationsDisabled } = useAnimationSettings();

  const { animationConfig, isAnimationDisabled } = getAnimationState(animation);

  const isAnimationDisabledValue = getIsAnimationDisabledValue({
    animation,
    isAnimationDisabled,
    isAllAnimationsDisabled,
  });

  // Opacity animation
  const opacityValue = getAnimationValueProperty({
    animationValue: animationConfig?.opacity,
    property: 'value',
    defaultValue: [0, 1, 0] as [number, number, number],
  });

  // Extract style overrides OUTSIDE useAnimatedStyle
  const styleProps = getStyleProperties(style, ['opacity']);

  const rContainerStyle = useAnimatedStyle(() => {
    // Handle disabled state first
    if (isAnimationDisabledValue) {
      return {
        opacity: progress.get() > 0 ? 1 : 0,
        ...styleProps,
      };
    }

    // Handle dragging state - when dragging and progress <= 1, opacity should be 1
    if (
      isDragging.get() ||
      (isGestureReleaseAnimationRunning.get() && progress.get() <= 1)
    ) {
      return {
        opacity: 1,
      };
    }

    return {
      opacity: interpolate(progress.get(), [0, 1, 2], opacityValue),
      ...styleProps,
    };
  });

  return {
    rContainerStyle,
  };
}
