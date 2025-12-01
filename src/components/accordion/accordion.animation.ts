import { useEffect } from 'react';
import type { ViewStyle } from 'react-native';
import type {
  BaseAnimationBuilder,
  LayoutAnimationFunction,
} from 'react-native-reanimated';
import {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { createContext } from '../../helpers/utils';
import {
  getAnimationState,
  getAnimationValueMergedConfig,
  getAnimationValueProperty,
  getRootAnimationState,
  getStyleTransform,
} from '../../helpers/utils/animation';
import {
  ACCORDION_LAYOUT_TRANSITION,
  DEFAULT_CONTENT_ENTERING,
  DEFAULT_CONTENT_EXITING,
  INDICATOR_SPRING_CONFIG,
} from './accordion.constants';
import type {
  AccordionAnimationContextValue,
  AccordionContentAnimation,
  AccordionIndicatorAnimation,
  AccordionRootAnimation,
} from './accordion.types';

const [AccordionAnimationProvider, useAccordionAnimation] =
  createContext<AccordionAnimationContextValue>({
    name: 'AccordionAnimationContext',
  });

export { AccordionAnimationProvider, useAccordionAnimation };

// --------------------------------------------------

/**
 * Animation hook for Accordion root component
 * Handles layout transition configuration and provides context for child components
 */
export function useAccordionRootAnimation(options: {
  animation: AccordionRootAnimation | undefined;
  layout?:
    | BaseAnimationBuilder
    | LayoutAnimationFunction
    | typeof BaseAnimationBuilder;
}) {
  const { animation, layout } = options;

  const { animationConfig, isAnimationDisabled, isAllAnimationsDisabled } =
    getRootAnimationState(animation);

  const isAnimationDisabledValue =
    isAnimationDisabled || isAllAnimationsDisabled;

  // Layout transition animation
  const layoutTransitionValue = getAnimationValueProperty({
    animationValue: animationConfig?.layout,
    property: 'value',
    defaultValue: layout || ACCORDION_LAYOUT_TRANSITION,
  });

  return {
    layoutTransition: isAnimationDisabledValue
      ? undefined
      : layoutTransitionValue,
    isAllAnimationsDisabled,
  };
}

// --------------------------------------------------

/**
 * Animation hook for Accordion Indicator component
 * Handles rotation animation for the chevron icon
 */
export function useAccordionIndicatorAnimation(options: {
  animation: AccordionIndicatorAnimation | undefined;
  style: ViewStyle | undefined;
  isExpanded: boolean;
}) {
  const { animation, style, isExpanded } = options;

  const { isAllAnimationsDisabled } = useAccordionAnimation();

  const { animationConfig, isAnimationDisabled } = getAnimationState(animation);

  const isAnimationDisabledValue = animation
    ? false
    : isAnimationDisabled || isAllAnimationsDisabled;

  // Rotation animation values
  const rotationValue = getAnimationValueProperty({
    animationValue: animationConfig?.rotation,
    property: 'value',
    defaultValue: [0, -180] as [number, number],
  });

  const rotationSpringConfig = getAnimationValueMergedConfig({
    animationValue: animationConfig?.rotation,
    property: 'springConfig',
    defaultValue: INDICATOR_SPRING_CONFIG,
  });

  const rotation = useSharedValue(0);

  useEffect(() => {
    if (isAnimationDisabledValue) {
      rotation.set(isExpanded ? 1 : 0);
    } else {
      rotation.set(withSpring(isExpanded ? 1 : 0, rotationSpringConfig));
    }
  }, [isExpanded, isAnimationDisabledValue, rotation, rotationSpringConfig]);

  const styleTransform = getStyleTransform(style);

  const rContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          rotate:
            interpolate(
              rotation.get(),
              [0, 1],
              [rotationValue[0], rotationValue[1]]
            ) + 'deg',
        },
        ...styleTransform,
      ],
    };
  });

  return {
    rContainerStyle,
  };
}

// --------------------------------------------------

/**
 * Animation hook for Accordion Content component
 * Handles entering and exiting animations
 */
export function useAccordionContentAnimation(options: {
  animation: AccordionContentAnimation | undefined;
  isDisabled?: boolean;
}) {
  const { animation, isDisabled } = options;

  const { isAllAnimationsDisabled } = useAccordionAnimation();

  const { animationConfig, isAnimationDisabled } = getAnimationState(animation);

  const isAnimationDisabledValue = animation
    ? false
    : isAnimationDisabled || isAllAnimationsDisabled || isDisabled;

  // Entering animation
  const enteringValue = getAnimationValueProperty({
    animationValue: animationConfig?.entering,
    property: 'value',
    defaultValue: DEFAULT_CONTENT_ENTERING,
  });

  // Exiting animation
  const exitingValue = getAnimationValueProperty({
    animationValue: animationConfig?.exiting,
    property: 'value',
    defaultValue: DEFAULT_CONTENT_EXITING,
  });

  return {
    entering: isAnimationDisabledValue ? undefined : enteringValue,
    exiting: isAnimationDisabledValue ? undefined : exitingValue,
  };
}
