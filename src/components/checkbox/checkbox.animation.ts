import type { ViewStyle } from 'react-native';
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { createContext } from '../../helpers/utils';
import {
  getAnimationState,
  getAnimationValueMergedConfig,
  getAnimationValueProperty,
  getRootAnimationState,
  getStyleProperties,
  getStyleTransform,
} from '../../helpers/utils/animation';
import { useFormField } from '../form-field';
import type {
  CheckboxAnimationContextValue,
  CheckboxIndicatorAnimation,
  CheckboxRootAnimation,
} from './checkbox.types';

const [CheckboxAnimationProvider, useCheckboxAnimation] =
  createContext<CheckboxAnimationContextValue>({
    name: 'CheckboxAnimationContext',
  });

export { CheckboxAnimationProvider, useCheckboxAnimation };

// --------------------------------------------------

export function useCheckboxRootAnimation(options: {
  animation: CheckboxRootAnimation | undefined;
  style: ViewStyle | undefined;
}) {
  const { animation, style } = options;

  const isCheckboxPressed = useSharedValue(false);
  const formFieldContext = useFormField();

  const { animationConfig, isAnimationDisabled, isAllAnimationsDisabled } =
    getRootAnimationState(animation);

  const scaleValue = getAnimationValueProperty({
    animationValue: animationConfig?.scale,
    property: 'value',
    defaultValue: [1, 0.96] as [number, number],
  });

  const scaleTimingConfig = getAnimationValueMergedConfig({
    animationValue: animationConfig?.scale,
    property: 'timingConfig',
    defaultValue: { duration: 150 },
  });

  const styleTransform = getStyleTransform(style);

  const rContainerStyle = useAnimatedStyle(() => {
    if (isAnimationDisabled) {
      return {};
    }

    const pressed =
      isCheckboxPressed.get() || (formFieldContext?.isPressed.get() ?? false);

    return {
      transform: [
        {
          scale: withTiming(
            pressed ? scaleValue[1] : scaleValue[0],
            scaleTimingConfig
          ),
        },
        ...styleTransform,
      ],
    };
  });

  return {
    rContainerStyle,
    isCheckboxPressed,
    isAllAnimationsDisabled,
  };
}

// --------------------------------------------------

export function useCheckboxIndicatorAnimation(options: {
  animation: CheckboxIndicatorAnimation | undefined;
  isSelected: boolean | undefined;
  style: ViewStyle | undefined;
}) {
  const { animation, isSelected, style } = options;

  const { isAllAnimationsDisabled } = useCheckboxAnimation();

  const { animationConfig, isAnimationDisabled } = getAnimationState(animation);

  const isAnimationDisabledValue = animation
    ? false
    : isAnimationDisabled || isAllAnimationsDisabled;

  // Opacity animation
  const opacityValue = getAnimationValueProperty({
    animationValue: animationConfig?.opacity,
    property: 'value',
    defaultValue: [0, 1] as [number, number],
  });
  const opacityTimingConfig = getAnimationValueMergedConfig({
    animationValue: animationConfig?.opacity,
    property: 'timingConfig',
    defaultValue: { duration: 100 },
  });

  // BorderRadius animation
  const borderRadiusValue = getAnimationValueProperty({
    animationValue: animationConfig?.borderRadius,
    property: 'value',
    defaultValue: [8, 0] as [number, number],
  });
  const borderRadiusTimingConfig = getAnimationValueMergedConfig({
    animationValue: animationConfig?.borderRadius,
    property: 'timingConfig',
    defaultValue: { duration: 50 },
  });

  // TranslateX animation
  const translateXValue = getAnimationValueProperty({
    animationValue: animationConfig?.translateX,
    property: 'value',
    defaultValue: [-4, 0] as [number, number],
  });
  const translateXTimingConfig = getAnimationValueMergedConfig({
    animationValue: animationConfig?.translateX,
    property: 'timingConfig',
    defaultValue: { duration: 100 },
  });

  // Scale animation
  const scaleValue = getAnimationValueProperty({
    animationValue: animationConfig?.scale,
    property: 'value',
    defaultValue: [0.8, 1] as [number, number],
  });
  const scaleTimingConfig = getAnimationValueMergedConfig({
    animationValue: animationConfig?.scale,
    property: 'timingConfig',
    defaultValue: { duration: 100 },
  });

  const styleProps = getStyleProperties(style, ['opacity', 'borderRadius']);
  const styleTransform = getStyleTransform(style);

  const rContainerStyle = useAnimatedStyle(() => {
    if (isAnimationDisabledValue) {
      return {
        opacity: isSelected ? opacityValue[1] : opacityValue[0],
        borderRadius: isSelected ? borderRadiusValue[1] : borderRadiusValue[0],
        transform: [
          {
            translateX: isSelected ? translateXValue[1] : translateXValue[0],
          },
          {
            scale: isSelected ? scaleValue[1] : scaleValue[0],
          },
        ],
        ...styleProps,
      };
    }

    return {
      opacity: withTiming(
        isSelected ? opacityValue[1] : opacityValue[0],
        opacityTimingConfig
      ),
      borderRadius: withTiming(
        isSelected ? borderRadiusValue[1] : borderRadiusValue[0],
        borderRadiusTimingConfig
      ),
      transform: [
        {
          translateX: withTiming(
            isSelected ? translateXValue[1] : translateXValue[0],
            translateXTimingConfig
          ),
        },
        {
          scale: withTiming(
            isSelected ? scaleValue[1] : scaleValue[0],
            scaleTimingConfig
          ),
        },
        ...styleTransform,
      ],
      ...styleProps,
    };
  });

  return {
    rContainerStyle,
    isAnimationDisabled: isAnimationDisabled || isAllAnimationsDisabled,
  };
}
