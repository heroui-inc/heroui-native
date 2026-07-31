import { useEffect } from 'react';
import {
  FadeOut,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { useAnimationSettings } from '../../helpers/internal/contexts';
import {
  useCombinedAnimationDisabledState,
  useIsRTL,
} from '../../helpers/internal/hooks';
import {
  createContext,
  getAnimationState,
  getAnimationValueMergedConfig,
  getAnimationValueProperty,
  getIsAnimationDisabledValue,
  getRootAnimationState,
} from '../../helpers/internal/utils';
import { useSubMenuContext as useSubMenu } from '../../primitives/sub-menu';
import {
  BACKGROUND_EXITING_DURATION,
  DEFAULT_ROOT_CONTENT_MARGIN,
  DEFAULT_ROOT_CONTENT_PADDING_HORIZONTAL,
  DEFAULT_ROOT_CONTENT_PADDING_TOP,
  INDICATOR_SPRING_CONFIG,
  ROOT_CONTENT_SPRING_CONFIG,
} from './sub-menu.constants';
import type {
  SubMenuAnimationContextValue,
  SubMenuRootAnimation,
  SubMenuTriggerIndicatorAnimation,
} from './sub-menu.types';

const [SubMenuAnimationProvider, useSubMenuAnimation] =
  createContext<SubMenuAnimationContextValue>({
    name: 'SubMenuAnimationContext',
  });

/**
 * Animation hook for SubMenu root component.
 * Handles root-level animation configuration and provides
 * the combined disabled state for child components.
 */
export function useSubMenuRootAnimation(options: {
  animation: SubMenuRootAnimation | undefined;
}) {
  const { animation } = options;

  const isAllAnimationsDisabled = useCombinedAnimationDisabledState(animation);

  const triggerHeight = useSharedValue(0);
  const contentHeight = useSharedValue(0);
  const contentPaddingTop = useSharedValue(0);

  return {
    isAllAnimationsDisabled,
    triggerHeight,
    contentHeight,
    contentPaddingTop,
  };
}

// --------------------------------------------------

/**
 * Hook providing animated styles for the SubMenu root content container.
 * Animates height, margins, and padding when the submenu opens/closes.
 * Uses getRootAnimationState to handle values and disabled state.
 *
 * @param options.animation - Root animation configuration
 * @returns Object with rOuterContainerStyle and rInnerContentStyle for the
 * root content container, plus the exit animation for the background layer
 */
export function useRootContentContainerAnimation(options: {
  animation: SubMenuRootAnimation | undefined;
}) {
  const { animation } = options;

  const { isOpen } = useSubMenu();
  const { triggerHeight, contentHeight, contentPaddingTop } =
    useSubMenuAnimation();

  const { isAllAnimationsDisabled } = useAnimationSettings();
  const { animationConfig, isAnimationDisabled } =
    getRootAnimationState(animation);

  const isAnimationDisabledValue = getIsAnimationDisabledValue({
    isAnimationDisabled,
    isAllAnimationsDisabled,
  });

  const rootContentConfig = animationConfig?.rootContent;

  const backgroundExitingValue = getAnimationValueProperty({
    animationValue: animationConfig?.background,
    property: 'exiting',
    defaultValue: FadeOut.duration(BACKGROUND_EXITING_DURATION),
  });

  const marginHorizontalValue = getAnimationValueProperty({
    animationValue: rootContentConfig,
    property: 'marginHorizontal',
    defaultValue: DEFAULT_ROOT_CONTENT_MARGIN,
  });

  const marginVerticalValue = getAnimationValueProperty({
    animationValue: rootContentConfig,
    property: 'marginVertical',
    defaultValue: DEFAULT_ROOT_CONTENT_MARGIN,
  });

  const paddingHorizontalValue = getAnimationValueProperty({
    animationValue: rootContentConfig,
    property: 'paddingHorizontal',
    defaultValue: DEFAULT_ROOT_CONTENT_PADDING_HORIZONTAL,
  });

  const paddingTopValue = getAnimationValueProperty({
    animationValue: rootContentConfig,
    property: 'paddingTop',
    defaultValue: DEFAULT_ROOT_CONTENT_PADDING_TOP,
  });

  const springConfig = getAnimationValueMergedConfig({
    animationValue: rootContentConfig,
    property: 'springConfig',
    defaultValue: ROOT_CONTENT_SPRING_CONFIG,
  });

  useEffect(() => {
    contentPaddingTop.set(paddingTopValue);
  }, [paddingTopValue, contentPaddingTop]);

  const rOuterContainerStyle = useAnimatedStyle(() => {
    return {
      height: triggerHeight.get() > 0 ? triggerHeight.get() : undefined,
    };
  });

  const rInnerContentStyle = useAnimatedStyle(() => {
    if (triggerHeight.get() === 0 || contentHeight.get() === 0) {
      return {
        height: undefined,
      };
    }

    const targetHeight = isOpen
      ? triggerHeight.get() + contentHeight.get() + paddingTopValue
      : triggerHeight.get();
    const targetMarginH = isOpen ? marginHorizontalValue : 0;
    const targetMarginV = isOpen ? marginVerticalValue : 0;
    const targetPaddingH = isOpen ? paddingHorizontalValue : 0;
    const targetPaddingTop = isOpen ? paddingTopValue : 0;

    if (isAnimationDisabledValue) {
      return {
        height: targetHeight,
        marginHorizontal: targetMarginH,
        marginVertical: targetMarginV,
        paddingHorizontal: targetPaddingH,
        paddingTop: targetPaddingTop,
      };
    }

    return {
      height: withSpring(targetHeight, springConfig),
      marginHorizontal: withSpring(targetMarginH, springConfig),
      marginVertical: withSpring(targetMarginV, springConfig),
      paddingHorizontal: withSpring(targetPaddingH, springConfig),
      paddingTop: withSpring(targetPaddingTop, springConfig),
    };
  });

  return {
    rOuterContainerStyle,
    rInnerContentStyle,
    /** Exit animation for the background layer (undefined when disabled) */
    backgroundExiting: isAnimationDisabledValue
      ? undefined
      : backgroundExitingValue,
  };
}

/**
 * Animation hook for the SubMenu trigger indicator.
 * Handles rotation animation when the submenu opens/closes.
 */
export function useSubMenuTriggerIndicatorAnimation(options: {
  animation: SubMenuTriggerIndicatorAnimation | undefined;
  isOpen: boolean;
}) {
  const { animation, isOpen } = options;

  const { isAllAnimationsDisabled } = useAnimationSettings();

  const { animationConfig, isAnimationDisabled } = getAnimationState(animation);

  const isAnimationDisabledValue = getIsAnimationDisabledValue({
    isAnimationDisabled,
    isAllAnimationsDisabled,
  });

  const rotationValue = getAnimationValueProperty({
    animationValue: animationConfig?.rotation,
    property: 'value',
    defaultValue: [0, 90] as [number, number],
  });

  const rotationSpringConfig = getAnimationValueMergedConfig({
    animationValue: animationConfig?.rotation,
    property: 'springConfig',
    defaultValue: INDICATOR_SPRING_CONFIG,
  });

  const rotation = useSharedValue(0);

  // Mirror the default chevron-right disclosure icon so it points toward the
  // reading direction in RTL. The flip lives here (not in a className) because
  // the animated `transform` array below fully controls the transform property
  // and would otherwise override any className-based scaleX.
  const isRTL = useIsRTL();

  useEffect(() => {
    if (isAnimationDisabledValue) {
      rotation.set(isOpen ? 1 : 0);
    } else {
      rotation.set(withSpring(isOpen ? 1 : 0, rotationSpringConfig));
    }
  }, [isOpen, isAnimationDisabledValue, rotation, rotationSpringConfig]);

  const rContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scaleX: isRTL ? -1 : 1 },
        {
          rotate:
            interpolate(
              rotation.get(),
              [0, 1],
              [rotationValue[0], rotationValue[1]]
            ) + 'deg',
        },
      ],
    };
  });

  return {
    rContainerStyle,
  };
}

export {
  SubMenuAnimationProvider,
  useSubMenuAnimation,
  type SubMenuAnimationContextValue,
};
