import {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useCombinedAnimationDisabledState } from '../../helpers/internal/hooks';
import {
  getAnimationValueProperty,
  getIsAnimationDisabledValue,
  getRootAnimationState,
} from '../../helpers/internal/utils';
import { SHADOW_EXIT_ANIMATION_DURATION } from './scroll-shadow.constants';
import type {
  ScrollShadowOrientation,
  ScrollShadowRootAnimation,
  ScrollShadowVisibility,
} from './scroll-shadow.types';

// --------------------------------------------------

/**
 * Animation hook for ScrollShadow root component
 * Handles cascading animation disabled state and all animation logic
 */
export function useScrollShadowRootAnimation(options: {
  animation: ScrollShadowRootAnimation | undefined;
  orientation: ScrollShadowOrientation;
  size: number;
  visibility: ScrollShadowVisibility;
  isEnabled: boolean;
}) {
  const { animation, orientation, size, visibility, isEnabled } = options;

  const { animationConfig, isAnimationDisabled } =
    getRootAnimationState(animation);

  const isAllAnimationsDisabled = useCombinedAnimationDisabledState(animation);

  const isAnimationDisabledValue = getIsAnimationDisabledValue({
    isAnimationDisabled,
    isAllAnimationsDisabled,
  });

  // Opacity animation values
  const topOpacityValue = getAnimationValueProperty({
    animationValue: animationConfig?.opacity,
    property: 'value',
    defaultValue: [0, 1] as [number, number],
  });

  // Reverse array for bottom shadow: [1, 0]
  const bottomOpacityValue: [number, number] = [
    topOpacityValue[1],
    topOpacityValue[0],
  ];

  const scrollOffset = useSharedValue(0);
  const contentSize = useSharedValue(0);
  const containerSize = useSharedValue(0);

  const localScrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      const offset =
        orientation === 'vertical'
          ? event.contentOffset.y
          : event.contentOffset.x;
      scrollOffset.set(offset);
    },
  });

  const topShadowOpacity = useDerivedValue(() => {
    if (isAnimationDisabledValue) {
      return 1;
    }

    if (!isEnabled)
      return withTiming(0, { duration: SHADOW_EXIT_ANIMATION_DURATION });
    if (visibility === 'none')
      return withTiming(0, { duration: SHADOW_EXIT_ANIMATION_DURATION });
    if (visibility === 'bottom' || visibility === 'right')
      return withTiming(0, { duration: SHADOW_EXIT_ANIMATION_DURATION });

    return interpolate(
      scrollOffset.get(),
      [0, size / 4],
      topOpacityValue,
      Extrapolation.CLAMP
    );
  });

  const bottomShadowOpacity = useDerivedValue(() => {
    if (isAnimationDisabledValue) {
      return 1;
    }

    if (!isEnabled)
      return withTiming(0, { duration: SHADOW_EXIT_ANIMATION_DURATION });
    if (visibility === 'none')
      return withTiming(0, { duration: SHADOW_EXIT_ANIMATION_DURATION });
    if (visibility === 'top' || visibility === 'left')
      return withTiming(0, { duration: SHADOW_EXIT_ANIMATION_DURATION });

    return interpolate(
      scrollOffset.get() + containerSize.get(),
      [contentSize.get() - size / 4, contentSize.get()],
      bottomOpacityValue,
      Extrapolation.CLAMP
    );
  });

  const topShadowStyle = useAnimatedStyle(() => ({
    opacity: topShadowOpacity.get(),
  }));

  const bottomShadowStyle = useAnimatedStyle(() => ({
    opacity: bottomShadowOpacity.get(),
  }));

  return {
    scrollOffset,
    contentSize,
    containerSize,
    localScrollHandler,
    topShadowStyle,
    bottomShadowStyle,
    isAllAnimationsDisabled,
  };
}
