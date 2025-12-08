import type { ViewStyle } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';
import {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import type { PopoverContentPopoverAnimation } from '../../components/popover/popover.types';
import { useAnimationSettings } from '../contexts/animation-settings-context';
import {
  getAnimationState,
  getAnimationValueProperty,
  getIsAnimationDisabledValue,
  getStyleProperties,
  getStyleTransform,
} from '../utils/animation';

/**
 * Placement options for popover/select content
 */
export type PopoverContentPlacement = 'top' | 'bottom' | 'left' | 'right';

/**
 * Props for usePopoverContentAnimation hook
 */
export interface UsePopoverContentAnimationProps {
  /**
   * Animation progress shared value (0=idle, 1=open, 2=close)
   */
  progress: SharedValue<number>;
  /**
   * Placement of the popover/select content
   */
  placement: PopoverContentPlacement;
  /**
   * Animation configuration for content
   */
  animation?: PopoverContentPopoverAnimation;
  /**
   * Style prop for handling style overrides
   */
  style?: ViewStyle;
}

/**
 * Animation hook for popover/select content components
 * Handles placement-based animations (opacity, scale, translate) based on popup progress state
 */
export function usePopoverContentAnimation({
  progress,
  placement,
  animation,
  style,
}: UsePopoverContentAnimationProps) {
  // Read from global animation context (always available in compound parts)
  const { isAllAnimationsDisabled } = useAnimationSettings();

  const { animationConfig, isAnimationDisabled } = getAnimationState(animation);

  const isAnimationDisabledValue = getIsAnimationDisabledValue({
    animation,
    isAnimationDisabled,
    isAllAnimationsDisabled,
  });

  // Calculate default transform values based on placement
  let defaultTransformOrigin = 'top';
  let defaultTranslateX: [number, number, number] = [0, 0, 0];
  let defaultTranslateY: [number, number, number] = [0, 0, 0];

  if (placement === 'top') {
    defaultTransformOrigin = 'bottom';
    defaultTranslateY = [4, 0, 4];
  } else if (placement === 'bottom') {
    defaultTransformOrigin = 'top';
    defaultTranslateY = [-4, 0, -4];
  } else if (placement === 'left') {
    defaultTransformOrigin = 'right';
    defaultTranslateX = [4, 0, 4];
  } else if (placement === 'right') {
    defaultTransformOrigin = 'left';
    defaultTranslateX = [-4, 0, -4];
  }

  // Get animation values with defaults
  const opacityValue = getAnimationValueProperty({
    animationValue: animationConfig?.opacity,
    property: 'value',
    defaultValue: [0, 1, 0] as [number, number, number],
  });

  const scaleValue = getAnimationValueProperty({
    animationValue: animationConfig?.scale,
    property: 'value',
    defaultValue: [0.95, 1, 0.95] as [number, number, number],
  });

  const translateXValue = getAnimationValueProperty({
    animationValue: animationConfig?.translateX,
    property: 'value',
    defaultValue: defaultTranslateX,
  });

  const translateYValue = getAnimationValueProperty({
    animationValue: animationConfig?.translateY,
    property: 'value',
    defaultValue: defaultTranslateY,
  });

  const transformOriginValue = getAnimationValueProperty({
    animationValue: animationConfig?.transformOrigin,
    property: 'value',
    defaultValue: defaultTransformOrigin,
  });

  // Extract style overrides OUTSIDE useAnimatedStyle
  const styleProps = getStyleProperties(style, ['opacity', 'transformOrigin']);
  const styleTransform = getStyleTransform(style);

  const rContainerStyle = useAnimatedStyle(() => {
    // Handle disabled state first
    if (isAnimationDisabledValue) {
      return {
        opacity: progress.get() > 0 ? 1 : 0,
        ...styleProps,
      };
    }

    return {
      opacity: interpolate(
        progress.get(),
        [0, 1, 2],
        opacityValue,
        Extrapolation.CLAMP
      ),
      transformOrigin: transformOriginValue,
      transform: [
        {
          translateX: interpolate(
            progress.get(),
            [0, 1, 2],
            translateXValue,
            Extrapolation.CLAMP
          ),
        },
        {
          translateY: interpolate(
            progress.get(),
            [0, 1, 2],
            translateYValue,
            Extrapolation.CLAMP
          ),
        },
        {
          scale: interpolate(
            progress.get(),
            [0, 1, 2],
            scaleValue,
            Extrapolation.CLAMP
          ),
        },
        ...styleTransform,
      ],
      ...styleProps,
    };
  });

  return {
    rContainerStyle,
  };
}
