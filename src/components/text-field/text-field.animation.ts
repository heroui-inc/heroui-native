import { useEffect } from 'react';
import { type ViewStyle } from 'react-native';
import {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useAnimationSettings } from '../../helpers/contexts';
import { useCombinedAnimationDisabledState } from '../../helpers/hooks';
import { useThemeColor } from '../../helpers/theme';
import type { AnimationRootDisableAll } from '../../helpers/types/animation';
import {
  getAnimationState,
  getAnimationValueMergedConfig,
  getAnimationValueProperty,
  getIsAnimationDisabledValue,
  getStyleProperties,
} from '../../helpers/utils/animation';
import {
  ANIMATION_DURATION,
  ANIMATION_EASING,
  ENTERING_ANIMATION_CONFIG,
  EXITING_ANIMATION_CONFIG,
} from './text-field.constants';
import type {
  TextFieldDescriptionAnimation,
  TextFieldInputAnimation,
  TextFieldLabelAnimation,
} from './text-field.types';

// --------------------------------------------------

/**
 * Animation hook for TextField Root component
 * Handles root-level animation configuration and provides context for child components
 */
export function useTextFieldRootAnimation(options: {
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
 * Animation hook for TextField Label component
 * Handles entering and exiting animations for the label
 */
export function useTextFieldLabelAnimation(options: {
  animation: TextFieldLabelAnimation | undefined;
}) {
  const { animation } = options;

  const { isAllAnimationsDisabled } = useAnimationSettings();

  const { animationConfig, isAnimationDisabled } = getAnimationState(animation);

  const isAnimationDisabledValue = getIsAnimationDisabledValue({
    isAnimationDisabled,
    isAllAnimationsDisabled,
  });

  // Entering animation
  const enteringValue = getAnimationValueProperty({
    animationValue: animationConfig?.entering,
    property: 'value',
    defaultValue: ENTERING_ANIMATION_CONFIG,
  });

  // Exiting animation
  const exitingValue = getAnimationValueProperty({
    animationValue: animationConfig?.exiting,
    property: 'value',
    defaultValue: EXITING_ANIMATION_CONFIG,
  });

  return {
    entering: isAnimationDisabledValue ? undefined : enteringValue,
    exiting: isAnimationDisabledValue ? undefined : exitingValue,
  };
}

// --------------------------------------------------

/**
 * Animation hook for TextField Description component
 * Handles entering and exiting animations for the description text
 */
export function useTextFieldDescriptionAnimation(options: {
  animation: TextFieldDescriptionAnimation | undefined;
}) {
  const { animation } = options;

  const { isAllAnimationsDisabled } = useAnimationSettings();

  const { animationConfig, isAnimationDisabled } = getAnimationState(animation);

  const isAnimationDisabledValue = getIsAnimationDisabledValue({
    isAnimationDisabled,
    isAllAnimationsDisabled,
  });

  // Entering animation
  const enteringValue = getAnimationValueProperty({
    animationValue: animationConfig?.entering,
    property: 'value',
    defaultValue: ENTERING_ANIMATION_CONFIG,
  });

  // Exiting animation
  const exitingValue = getAnimationValueProperty({
    animationValue: animationConfig?.exiting,
    property: 'value',
    defaultValue: EXITING_ANIMATION_CONFIG,
  });

  return {
    entering: isAnimationDisabledValue ? undefined : enteringValue,
    exiting: isAnimationDisabledValue ? undefined : exitingValue,
  };
}

// --------------------------------------------------

/**
 * Animation hook for TextField Input component
 * Handles background color and border color animations for focus/blur and error states
 */
export function useTextFieldInputAnimation(options: {
  animation: TextFieldInputAnimation | undefined;
  isInvalid: boolean;
  style: ViewStyle | undefined;
}) {
  const { animation, isInvalid, style } = options;

  const [
    themeColorFieldBackground,
    themeColorFieldFocusBackground,
    themeColorFieldBlurBorder,
    themeColorFieldFocusBorder,
    themeColorDanger,
  ] = useThemeColor([
    'field',
    'field-focus',
    'field-border',
    'accent',
    'danger',
  ]);

  const { isAllAnimationsDisabled } = useAnimationSettings();

  const { animationConfig, isAnimationDisabled } = getAnimationState(animation);

  const isAnimationDisabledValue = getIsAnimationDisabledValue({
    isAnimationDisabled,
    isAllAnimationsDisabled,
  });

  // Background color animation
  const backgroundColorValue = {
    blur:
      animationConfig?.backgroundColor?.value?.blur ??
      themeColorFieldBackground,
    focus:
      animationConfig?.backgroundColor?.value?.focus ??
      themeColorFieldFocusBackground,
    error:
      animationConfig?.backgroundColor?.value?.error ??
      themeColorFieldBackground,
  };

  const backgroundColorTimingConfig = getAnimationValueMergedConfig({
    animationValue: animationConfig?.backgroundColor,
    property: 'timingConfig',
    defaultValue: {
      duration: ANIMATION_DURATION,
      easing: ANIMATION_EASING,
    },
  });

  // Border color animation
  const borderColorValue = {
    blur:
      animationConfig?.borderColor?.value?.blur ?? themeColorFieldBlurBorder,
    focus:
      animationConfig?.borderColor?.value?.focus ?? themeColorFieldFocusBorder,
    error: animationConfig?.borderColor?.value?.error ?? themeColorDanger,
  };

  const borderColorTimingConfig = getAnimationValueMergedConfig({
    animationValue: animationConfig?.borderColor,
    property: 'timingConfig',
    defaultValue: {
      duration: ANIMATION_DURATION,
      easing: ANIMATION_EASING,
    },
  });

  const styleProps = getStyleProperties(style, [
    'backgroundColor',
    'borderColor',
  ]);

  const isFocused = useSharedValue(0);
  const isError = useSharedValue(0);
  const currentBgColor = useSharedValue(backgroundColorValue.blur);
  const currentBorderColor = useSharedValue(borderColorValue.blur);

  // Update error state when isInvalid changes
  useEffect(() => {
    if (isInvalid) {
      isError.set(
        withTiming(1, isAnimationDisabledValue ? {} : borderColorTimingConfig)
      );
    } else {
      isError.set(
        withTiming(0, isAnimationDisabledValue ? {} : borderColorTimingConfig)
      );
    }
  }, [isInvalid, isError, isAnimationDisabledValue, borderColorTimingConfig]);

  const animatedContainerStyle = useAnimatedStyle(() => {
    if (isInvalid) {
      const errorBgColor = backgroundColorValue.error || currentBgColor.get();
      const errorBorderColor = borderColorValue.error;

      if (isAnimationDisabledValue) {
        return {
          backgroundColor: errorBgColor,
          borderColor: errorBorderColor,
          ...styleProps,
        };
      }

      return {
        backgroundColor: interpolateColor(
          isError.get(),
          [0, 1],
          [currentBgColor.get(), errorBgColor]
        ),
        borderColor: interpolateColor(
          isError.get(),
          [0, 1],
          [currentBorderColor.get(), errorBorderColor]
        ),
        ...styleProps,
      };
    }

    if (isAnimationDisabledValue) {
      return {
        backgroundColor: isFocused.get()
          ? backgroundColorValue.focus
          : backgroundColorValue.blur,
        borderColor: isFocused.get()
          ? borderColorValue.focus
          : borderColorValue.blur,
        ...styleProps,
      };
    }

    return {
      backgroundColor: interpolateColor(
        isFocused.get(),
        [0, 1],
        [backgroundColorValue.blur, backgroundColorValue.focus]
      ),
      borderColor: interpolateColor(
        isFocused.get(),
        [0, 1],
        [borderColorValue.blur, borderColorValue.focus]
      ),
      ...styleProps,
    };
  });

  const handleFocusAnimation = () => {
    if (!isAnimationDisabledValue) {
      isFocused.set(withTiming(1, backgroundColorTimingConfig));
    } else {
      isFocused.set(1);
    }
    currentBgColor.set(backgroundColorValue.focus);
    currentBorderColor.set(borderColorValue.focus);
  };

  const handleBlurAnimation = () => {
    if (!isAnimationDisabledValue) {
      isFocused.set(withTiming(0, backgroundColorTimingConfig));
    } else {
      isFocused.set(0);
    }
    currentBgColor.set(backgroundColorValue.blur);
    currentBorderColor.set(borderColorValue.blur);
  };

  return {
    animatedContainerStyle,
    handleFocusAnimation,
    handleBlurAnimation,
  };
}
