import type { ViewStyle } from 'react-native';
import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  type WithSpringConfig,
  type WithTimingConfig,
} from 'react-native-reanimated';
import { useAnimationSettings } from '../../helpers/contexts/animation-settings-context';
import type { AnimationRootDisableAll } from '../../helpers/types/animation';
import {
  getAnimationState,
  getCombinedAnimationDisabledState,
  getIsAnimationDisabledValue,
  getRootAnimationState,
  getStyleProperties,
} from '../../helpers/utils/animation';
import { useTabs, useTabsMeasurements } from './tabs';
import { DEFAULT_INDICATOR_SPRING_CONFIG } from './tabs.constants';
import type { TabsIndicatorAnimation } from './tabs.types';

// --------------------------------------------------

/**
 * Animation hook for Tabs root component
 * Handles cascading animation disabled state to child components
 */
export function useTabsRootAnimation(options: {
  animation: AnimationRootDisableAll | undefined;
}) {
  const { animation } = options;

  // Read parent animation disabled state from global context
  const parentAnimationSettingsContext = useAnimationSettings();
  const parentIsAllAnimationsDisabled =
    parentAnimationSettingsContext?.isAllAnimationsDisabled;

  const { isAllAnimationsDisabled: ownIsAllAnimationsDisabled } =
    getRootAnimationState(animation);

  // Combine parent and own disable-all states (parent wins)
  const isAllAnimationsDisabled = getCombinedAnimationDisabledState({
    parentIsAllAnimationsDisabled,
    ownIsAllAnimationsDisabled,
  });

  return {
    isAllAnimationsDisabled,
  };
}

// --------------------------------------------------

/**
 * Animation hook for Tabs Indicator component
 * Handles width, height, left position, and opacity animations
 */
export function useTabsIndicatorAnimation(options: {
  animation: TabsIndicatorAnimation | undefined;
  style: ViewStyle | undefined;
}) {
  const { animation, style } = options;

  // Get active measurements from tabs context
  const { value } = useTabs();
  const { measurements } = useTabsMeasurements();
  const activeMeasurements = measurements[value];

  // Read from global animation context (always available in compound parts)
  const { isAllAnimationsDisabled } = useAnimationSettings();

  const { animationConfig, isAnimationDisabled } = getAnimationState(animation);

  // IMPORTANT: Use getIsAnimationDisabledValue to respect both own and parent states
  const isAnimationDisabledValue = getIsAnimationDisabledValue({
    animation,
    isAnimationDisabled,
    isAllAnimationsDisabled,
  });

  const hasMeasured = useSharedValue(false);

  // Helper function to get animation config for a property
  const getPropertyConfig = (
    propertyAnimation:
      | { type: 'spring'; config?: WithSpringConfig }
      | { type: 'timing'; config?: WithTimingConfig }
      | undefined
  ) => {
    if (!propertyAnimation) {
      return {
        type: 'spring' as const,
        springConfig: DEFAULT_INDICATOR_SPRING_CONFIG,
        timingConfig: { duration: 200 },
      };
    }

    if (propertyAnimation.type === 'spring') {
      return {
        type: 'spring' as const,
        springConfig:
          propertyAnimation.config ?? DEFAULT_INDICATOR_SPRING_CONFIG,
        timingConfig: { duration: 200 },
      };
    }

    return {
      type: 'timing' as const,
      springConfig: DEFAULT_INDICATOR_SPRING_CONFIG,
      timingConfig: propertyAnimation.config ?? { duration: 200 },
    };
  };

  // Get animation configs for each property
  const widthConfig = getPropertyConfig(animationConfig?.width);
  const heightConfig = getPropertyConfig(animationConfig?.height);
  const leftConfig = getPropertyConfig(animationConfig?.left);

  // Extract style overrides OUTSIDE useAnimatedStyle
  const styleProps = getStyleProperties(style, ['opacity']);

  const rContainerStyle = useAnimatedStyle(() => {
    if (!activeMeasurements) {
      return {
        width: 0,
        height: 0,
        left: 0,
        opacity: 0,
        ...styleProps,
      };
    }

    if (!hasMeasured.value) {
      hasMeasured.value = true;
      return {
        width: activeMeasurements.width,
        height: activeMeasurements.height,
        left: activeMeasurements.x,
        opacity: 1,
        ...styleProps,
      };
    }

    // Handle disabled state
    if (isAnimationDisabledValue) {
      return {
        width: activeMeasurements.width,
        height: activeMeasurements.height,
        left: activeMeasurements.x,
        opacity: 1,
        ...styleProps,
      };
    }

    // Animated state
    const widthAnimation =
      widthConfig.type === 'timing'
        ? withTiming(activeMeasurements.width, widthConfig.timingConfig)
        : withSpring(activeMeasurements.width, widthConfig.springConfig);

    const heightAnimation =
      heightConfig.type === 'timing'
        ? withTiming(activeMeasurements.height, heightConfig.timingConfig)
        : withSpring(activeMeasurements.height, heightConfig.springConfig);

    const leftAnimation =
      leftConfig.type === 'timing'
        ? withTiming(activeMeasurements.x, leftConfig.timingConfig)
        : withSpring(activeMeasurements.x, leftConfig.springConfig);

    return {
      width: widthAnimation,
      height: heightAnimation,
      left: leftAnimation,
      opacity: 1,
      ...styleProps,
    };
  }, [
    activeMeasurements,
    isAnimationDisabledValue,
    widthConfig,
    heightConfig,
    leftConfig,
    styleProps,
  ]);

  return {
    rContainerStyle,
  };
}
