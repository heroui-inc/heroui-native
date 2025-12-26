import { useEffect } from 'react';
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
}) {
  const { animation, isInvalid } = options;

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

  // Border color animation
  const borderColorValue = {
    blur:
      animationConfig?.borderColor?.value?.blur ?? themeColorFieldBlurBorder,
    focus:
      animationConfig?.borderColor?.value?.focus ?? themeColorFieldFocusBorder,
    error: animationConfig?.borderColor?.value?.error ?? themeColorDanger,
  };

  // Focus/blur animation timing configuration
  const focusTimingConfig = getAnimationValueMergedConfig({
    animationValue: animationConfig?.focus,
    property: 'timingConfig',
    defaultValue: {
      duration: ANIMATION_DURATION,
      easing: ANIMATION_EASING,
    },
  });

  // Error state animation timing configuration
  const errorTimingConfig = getAnimationValueMergedConfig({
    animationValue: animationConfig?.error,
    property: 'timingConfig',
    defaultValue: {
      duration: ANIMATION_DURATION,
      easing: ANIMATION_EASING,
    },
  });

  const focusProgress = useSharedValue(0);
  const errorProgress = useSharedValue(0);
  const currentBgColor = useSharedValue(backgroundColorValue.blur);
  const currentBorderColor = useSharedValue(borderColorValue.blur);

  // Update error state when isInvalid changes
  useEffect(() => {
    if (isInvalid) {
      errorProgress.set(
        withTiming(1, isAnimationDisabledValue ? {} : errorTimingConfig)
      );
    } else {
      errorProgress.set(
        withTiming(0, isAnimationDisabledValue ? {} : errorTimingConfig)
      );
    }
  }, [isInvalid, errorProgress, isAnimationDisabledValue, errorTimingConfig]);

  const animatedContainerStyle = useAnimatedStyle(() => {
    if (isInvalid) {
      const errorBgColor = backgroundColorValue.error || currentBgColor.get();
      const errorBorderColor = borderColorValue.error;

      if (isAnimationDisabledValue) {
        return {
          backgroundColor: errorBgColor,
          borderColor: errorBorderColor,
        };
      }

      return {
        backgroundColor: interpolateColor(
          errorProgress.get(),
          [0, 1],
          [currentBgColor.get(), errorBgColor]
        ),
        borderColor: interpolateColor(
          errorProgress.get(),
          [0, 1],
          [currentBorderColor.get(), errorBorderColor]
        ),
      };
    }

    if (isAnimationDisabledValue) {
      return {
        backgroundColor: focusProgress.get()
          ? backgroundColorValue.focus
          : backgroundColorValue.blur,
        borderColor: focusProgress.get()
          ? borderColorValue.focus
          : borderColorValue.blur,
      };
    }

    return {
      backgroundColor: interpolateColor(
        focusProgress.get(),
        [0, 1],
        [backgroundColorValue.blur, backgroundColorValue.focus]
      ),
      borderColor: interpolateColor(
        focusProgress.get(),
        [0, 1],
        [borderColorValue.blur, borderColorValue.focus]
      ),
    };
  });

  const handleFocusAnimation = () => {
    if (!isAnimationDisabledValue) {
      focusProgress.set(withTiming(1, focusTimingConfig));
    } else {
      focusProgress.set(1);
    }
    currentBgColor.set(backgroundColorValue.focus);
    currentBorderColor.set(borderColorValue.focus);
  };

  const handleBlurAnimation = () => {
    if (!isAnimationDisabledValue) {
      focusProgress.set(withTiming(0, focusTimingConfig));
    } else {
      focusProgress.set(0);
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
