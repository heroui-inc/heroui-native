import { I18nManager } from 'react-native';
import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  type WithSpringConfig,
  type WithTimingConfig,
} from 'react-native-reanimated';
import { useAnimationSettings } from '../../helpers/internal/contexts';
import { useCombinedAnimationDisabledState } from '../../helpers/internal/hooks';
import type { AnimationRootDisableAll } from '../../helpers/internal/types';
import {
  getAnimationState,
  getAnimationValueMergedConfig,
  getAnimationValueProperty,
  getIsAnimationDisabledValue,
} from '../../helpers/internal/utils';
import * as TabsPrimitives from '../../primitives/tabs';
import { DEFAULT_INDICATOR_SPRING_CONFIG } from './tabs.constants';
import { useTabsMeasurements } from './tabs.context';
import type {
  TabsIndicatorAnimation,
  TabsSeparatorAnimation,
} from './tabs.types';

// --------------------------------------------------

/**
 * Animation hook for Tabs root component
 * Handles cascading animation disabled state to child components
 */
export function useTabsRootAnimation(options: {
  animation: AnimationRootDisableAll | undefined;
}) {
  const { animation } = options;

  const isAllAnimationsDisabled = useCombinedAnimationDisabledState(animation);

  return {
    isAllAnimationsDisabled,
  };
}

// --------------------------------------------------

/**
 * Animation hook for Tabs Indicator component
 * Handles width, height, translateX position, and opacity animations
 */
export function useTabsIndicatorAnimation(options: {
  animation: TabsIndicatorAnimation | undefined;
}) {
  const { animation } = options;

  // Get active measurements from tabs context
  const { value } = TabsPrimitives.useRootContext();
  const { listWidth, measurements } = useTabsMeasurements();
  const activeMeasurements = measurements[value];

  // The indicator is absolutely positioned with a physical `left: 0`, which
  // React Native re-anchors to the right edge only under app-wide RTL
  // (`I18nManager.forceRTL`). A soft direction — `HeroUINativeProvider`
  // `config.isRTL` or a `direction` style — leaves the anchor on the left while
  // still laying the triggers out right-to-left, and `onLayout` reports `x`
  // from the left edge in both cases. So the re-basing below must key off the
  // anchor swap, not off the direction the tabs are rendered in.
  const isAnchorMirrored =
    I18nManager.isRTL && I18nManager.doLeftAndRightSwapInRTL;

  // Read from global animation context (always available in compound parts)
  const { isAllAnimationsDisabled } = useAnimationSettings();

  const { animationConfig, isAnimationDisabled } = getAnimationState(animation);

  // IMPORTANT: Use getIsAnimationDisabledValue to respect both own and parent states
  const isAnimationDisabledValue = getIsAnimationDisabledValue({
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
  const translateXConfig = getPropertyConfig(animationConfig?.translateX);

  const rContainerStyle = useAnimatedStyle(() => {
    if (!activeMeasurements) {
      return {
        width: 0,
        height: 0,
        transform: [{ translateX: 0 }],
        opacity: 0,
      };
    }

    const translateX = getIndicatorTranslateX({
      isAnchorMirrored,
      listWidth,
      tabWidth: activeMeasurements.width,
      tabX: activeMeasurements.x,
    });

    if (!hasMeasured.value) {
      if (isAnchorMirrored && listWidth === 0) {
        return {
          width: 0,
          height: 0,
          transform: [{ translateX: 0 }],
          opacity: 0,
        };
      }

      hasMeasured.value = true;
      return {
        width: activeMeasurements.width,
        height: activeMeasurements.height,
        transform: [{ translateX }],
        opacity: 1,
      };
    }

    // Handle disabled state
    if (isAnimationDisabledValue) {
      return {
        width: activeMeasurements.width,
        height: activeMeasurements.height,
        transform: [{ translateX }],
        opacity: 1,
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

    const translateXAnimation =
      translateXConfig.type === 'timing'
        ? withTiming(translateX, translateXConfig.timingConfig)
        : withSpring(translateX, translateXConfig.springConfig);

    return {
      width: widthAnimation,
      height: heightAnimation,
      transform: [{ translateX: translateXAnimation }],
      opacity: 1,
    };
  }, [
    activeMeasurements,
    isAnimationDisabledValue,
    isAnchorMirrored,
    listWidth,
    widthConfig,
    heightConfig,
    translateXConfig,
  ]);

  return {
    rContainerStyle,
  };
}

/**
 * Converts a trigger's measured left-origin `x` into the indicator's
 * `translateX`.
 *
 * @param {object} options - Measurement inputs
 * @param {boolean} options.isAnchorMirrored - Whether the indicator's `left: 0`
 *   has been re-anchored to the right edge by app-wide RTL
 * @param {number} options.listWidth - Measured width of the tab strip
 * @param {number} options.tabWidth - Measured width of the active trigger
 * @param {number} options.tabX - Measured left-origin offset of the active
 *   trigger within the tab strip
 * @returns {number} Offset to apply to the indicator
 */
function getIndicatorTranslateX({
  isAnchorMirrored,
  listWidth,
  tabWidth,
  tabX,
}: {
  isAnchorMirrored: boolean;
  listWidth: number;
  tabWidth: number;
  tabX: number;
}) {
  'worklet';
  if (!(isAnchorMirrored && listWidth > 0)) {
    return tabX;
  }

  // Re-base the left-origin offset against the right-anchored starting point.
  return tabX - (listWidth - tabWidth);
}

// --------------------------------------------------

/**
 * Animation hook for Tabs Separator component
 * Handles opacity animation based on whether current tab value is between specified values
 */
export function useTabsSeparatorAnimation(options: {
  animation: TabsSeparatorAnimation | undefined;
  betweenValues: string[];
  isAlwaysVisible: boolean;
}) {
  const { animation, betweenValues, isAlwaysVisible } = options;

  // Get current tab value from tabs context
  const { value } = TabsPrimitives.useRootContext();

  // Read from global animation context (always available in compound parts)
  const { isAllAnimationsDisabled } = useAnimationSettings();

  const { animationConfig, isAnimationDisabled } = getAnimationState(animation);

  // IMPORTANT: Use getIsAnimationDisabledValue to respect both own and parent states
  const isAnimationDisabledValue = getIsAnimationDisabledValue({
    isAnimationDisabled,
    isAllAnimationsDisabled,
  });

  // Opacity animation configuration
  const opacityValue = getAnimationValueProperty({
    animationValue: animationConfig?.opacity,
    property: 'value',
    defaultValue: [0, 1] as [number, number],
  });
  const opacityTimingConfig = getAnimationValueMergedConfig({
    animationValue: animationConfig?.opacity,
    property: 'timingConfig',
    defaultValue: { duration: 200 },
  });

  const rContainerStyle = useAnimatedStyle(() => {
    // If always visible, return opacity 1
    if (isAlwaysVisible) {
      return {
        opacity: 1,
      };
    }

    // Check if current value is between the specified values
    const isVisible = !betweenValues.includes(value);
    const targetOpacity = isVisible ? opacityValue[1] : opacityValue[0];

    if (isAnimationDisabledValue) {
      return {
        opacity: targetOpacity,
      };
    }

    return {
      opacity: withTiming(targetOpacity, opacityTimingConfig),
    };
  }, [
    value,
    betweenValues,
    isAlwaysVisible,
    isAnimationDisabledValue,
    opacityValue,
    opacityTimingConfig,
  ]);

  return {
    rContainerStyle,
  };
}
