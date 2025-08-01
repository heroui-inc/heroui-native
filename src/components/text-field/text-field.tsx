import type { TextRef, ViewRef } from '@/helpers/types/primitives';
import { createContext, getElementByDisplayName } from '@/helpers/utils';
import { Text as SlotText, View as SlotView } from '@/primitives/slot';
import { useTheme } from '@/theme';
import { forwardRef, useEffect, useMemo } from 'react';
import {
  Text,
  TextInput,
  View,
  type NativeSyntheticEvent,
  type TextInputFocusEventData,
  type TextInput as TextInputType,
} from 'react-native';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  ANIMATION_DURATION,
  ANIMATION_EASING,
  DISPLAY_NAME,
  ENTERING_ANIMATION_CONFIG,
  EXITING_ANIMATION_CONFIG,
} from './text-field.constants';
import textFieldStyles from './text-field.styles';
import type {
  TextFieldContextValue,
  TextFieldDescriptionProps,
  TextFieldInputEndContentProps,
  TextFieldInputProps,
  TextFieldInputStartContentProps,
  TextFieldLabelProps,
  TextFieldRootProps,
} from './text-field.types';

const [TextFieldProvider, useTextFieldContext] =
  createContext<TextFieldContextValue>({
    name: 'TextFieldContext',
  });

// --------------------------------------------------

const TextFieldRoot = forwardRef<ViewRef, TextFieldRootProps>((props, ref) => {
  const {
    children,
    className,
    isDisabled = false,
    isValid = true,
    errorMessage,
    isRequired = false,
    asChild,
    ...restProps
  } = props;

  const tvStyles = textFieldStyles.root({ isDisabled, className });

  const Component = asChild ? SlotView : View;

  const contextValue = useMemo(
    () => ({ isDisabled, isValid, errorMessage, isRequired }),
    [isDisabled, isValid, errorMessage, isRequired]
  );

  return (
    <TextFieldProvider value={contextValue}>
      <Component ref={ref} className={tvStyles} {...restProps}>
        {children}
      </Component>
    </TextFieldProvider>
  );
});

// --------------------------------------------------

const TextFieldLabel = forwardRef<TextRef, TextFieldLabelProps>(
  (props, ref) => {
    const { children, className, classNames, ...restProps } = props;

    const { isDisabled, isValid, isRequired } = useTextFieldContext();

    const tvStyles = textFieldStyles.label({ isDisabled, isValid });

    const textStyles = tvStyles.text({
      className: [className, classNames?.text],
    });

    const asteriskStyles = tvStyles.asterisk({
      className: classNames?.asterisk,
    });

    return (
      <Animated.View
        key={isValid ? 'label-valid' : 'label-invalid'}
        ref={ref}
        entering={restProps.entering || ENTERING_ANIMATION_CONFIG}
        exiting={restProps.exiting || EXITING_ANIMATION_CONFIG}
        className={textStyles}
        {...restProps}
      >
        {children}
        {isRequired && <Text className={asteriskStyles}> *</Text>}
      </Animated.View>
    );
  }
);

// --------------------------------------------------

const TextFieldInput = forwardRef<TextInputType, TextFieldInputProps>(
  (props, ref) => {
    const {
      children,
      className,
      classNames,
      placeholderTextColor,
      colors: customColors,
      animationConfig,
      ...restProps
    } = props;

    const { isValid } = useTextFieldContext();

    const startContent = getElementByDisplayName(
      children,
      DISPLAY_NAME.INPUT_START_CONTENT
    );
    const endContent = getElementByDisplayName(
      children,
      DISPLAY_NAME.INPUT_END_CONTENT
    );

    const { colors } = useTheme();

    const tvStyles = textFieldStyles.input({
      isMultiline: Boolean(restProps.multiline),
    });

    const containerStyles = tvStyles.container({
      className: [className, classNames?.container],
    });

    const inputStyles = tvStyles.input({ className: classNames?.input });

    const blurBackground = customColors?.blurBackground || colors.default;
    const focusBackground = customColors?.focusBackground || colors.background;
    const errorBackground = customColors?.errorBackground;
    const blurBorder = customColors?.blurBorder || colors.border;
    const focusBorder = customColors?.focusBorder || colors.mutedForeground;
    const errorBorder = customColors?.errorBorder || colors.danger;

    const isFocused = useSharedValue(0);
    const isError = useSharedValue(0);
    const currentBgColor = useSharedValue(blurBackground);
    const currentBorderColor = useSharedValue(blurBorder);

    const timingConfig = useMemo(
      () => ({
        duration: animationConfig?.duration || ANIMATION_DURATION,
        easing: animationConfig?.easing || ANIMATION_EASING,
      }),
      [animationConfig?.duration, animationConfig?.easing]
    );

    useEffect(() => {
      if (!isValid) {
        isError.set(withTiming(1, timingConfig));
      } else {
        isError.set(withTiming(0, timingConfig));
      }
    }, [isValid, isError, timingConfig]);

    const animatedContainerStyle = useAnimatedStyle(() => {
      if (!isValid) {
        return {
          backgroundColor: interpolateColor(
            isError.get(),
            [0, 1],
            [currentBgColor.get(), errorBackground || currentBgColor.get()]
          ),
          borderColor: interpolateColor(
            isError.get(),
            [0, 1],
            [currentBorderColor.get(), errorBorder]
          ),
        };
      }

      return {
        backgroundColor: interpolateColor(
          isFocused.get(),
          [0, 1],
          [blurBackground, focusBackground]
        ),
        borderColor: interpolateColor(
          isFocused.get(),
          [0, 1],
          [blurBorder, focusBorder]
        ),
      };
    });

    const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      isFocused.set(withTiming(1, timingConfig));
      currentBgColor.set(focusBackground);
      currentBorderColor.set(focusBorder);
      restProps.onFocus?.(e);
    };

    const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      isFocused.set(withTiming(0, timingConfig));
      currentBgColor.set(blurBackground);
      currentBorderColor.set(blurBorder);
      restProps.onBlur?.(e);
    };

    return (
      <Animated.View className={containerStyles} style={animatedContainerStyle}>
        {startContent}
        <TextInput
          ref={ref}
          className={inputStyles}
          placeholderTextColor={placeholderTextColor || colors.mutedForeground}
          selectionColor={
            props.colors?.focusBackground || colors.mutedForeground
          }
          selectionHandleColor={
            props.colors?.focusBackground || colors.mutedForeground
          }
          onFocus={handleFocus}
          onBlur={handleBlur}
          textAlignVertical={restProps.multiline ? 'top' : 'center'}
          {...restProps}
        />
        {endContent}
      </Animated.View>
    );
  }
);

// --------------------------------------------------

const TextFieldInputStartContent = forwardRef<
  ViewRef,
  TextFieldInputStartContentProps
>((props, ref) => {
  const { children, className, asChild, ...restProps } = props;

  const tvStyles = textFieldStyles.inputStartContent({ className });

  const Component = asChild ? SlotView : View;

  return (
    <Component ref={ref} className={tvStyles} {...restProps}>
      {children}
    </Component>
  );
});

// --------------------------------------------------

const TextFieldInputEndContent = forwardRef<
  ViewRef,
  TextFieldInputEndContentProps
>((props, ref) => {
  const { children, className, asChild, ...restProps } = props;

  const tvStyles = textFieldStyles.inputEndContent({ className });

  const Component = asChild ? SlotView : View;

  return (
    <Component ref={ref} className={tvStyles} {...restProps}>
      {children}
    </Component>
  );
});

// --------------------------------------------------

const TextFieldDescription = forwardRef<TextRef, TextFieldDescriptionProps>(
  (props, ref) => {
    const { children, className, asChild, ...restProps } = props;

    const { isValid } = useTextFieldContext();

    const tvStyles = textFieldStyles.description({ className });

    const Component = asChild ? SlotText : Text;

    if (!isValid) return null;

    return (
      <Animated.View
        entering={ENTERING_ANIMATION_CONFIG}
        exiting={EXITING_ANIMATION_CONFIG}
      >
        <Component ref={ref} className={tvStyles} {...restProps}>
          {children}
        </Component>
      </Animated.View>
    );
  }
);

// --------------------------------------------------

const TextFieldErrorMessage = forwardRef<TextRef, TextFieldDescriptionProps>(
  (props, ref) => {
    const { className, ...restProps } = props;

    const { errorMessage, isValid } = useTextFieldContext();

    const tvStyles = textFieldStyles.errorMessage({ className });

    if (isValid || !errorMessage) return null;

    return (
      <Animated.Text
        ref={ref}
        entering={ENTERING_ANIMATION_CONFIG}
        exiting={EXITING_ANIMATION_CONFIG}
        className={tvStyles}
        {...restProps}
      >
        {errorMessage}
      </Animated.Text>
    );
  }
);

// --------------------------------------------------

TextFieldRoot.displayName = DISPLAY_NAME.ROOT;
TextFieldLabel.displayName = DISPLAY_NAME.LABEL;
TextFieldInput.displayName = DISPLAY_NAME.INPUT;
TextFieldInputStartContent.displayName = DISPLAY_NAME.INPUT_START_CONTENT;
TextFieldInputEndContent.displayName = DISPLAY_NAME.INPUT_END_CONTENT;
TextFieldDescription.displayName = DISPLAY_NAME.DESCRIPTION;
TextFieldErrorMessage.displayName = DISPLAY_NAME.ERROR_MESSAGE;

/**
 * Compound TextField component with sub-components
 *
 * @component TextField - Main container that provides gap-2 spacing between children.
 * Handles disabled state and validation state for the entire field.
 *
 * @component TextField.Label - Label with optional asterisk for required fields.
 * Changes to danger color when field is invalid.
 *
 * @component TextField.Input - Input container with animated border and background.
 * Supports start/end content slots and handles focus state animations.
 * Border turns danger color when field is invalid.
 *
 * @component TextField.InputStartContent - Optional content at the start of the input.
 * Use for icons or prefixes.
 *
 * @component TextField.InputEndContent - Optional content at the end of the input.
 * Use for icons, suffixes, or action buttons.
 *
 * @component TextField.Description - Description text with muted styling.
 * Hidden when field is invalid and error message is shown.
 *
 * @component TextField.ErrorMessage - Error message with danger styling.
 * Shown with animation when field is invalid. Automatically populated from errorMessage prop.
 *
 * All sub-components support asChild pattern for custom element composition.
 *
 * @see Full documentation: https://heroui.com/components/text-field
 */
const CompoundTextField = Object.assign(TextFieldRoot, {
  /** @optional Label with asterisk support */
  Label: TextFieldLabel,
  /** @required Input container with focus animations */
  Input: TextFieldInput,
  /** @optional Start content for input */
  InputStartContent: TextFieldInputStartContent,
  /** @optional End content for input */
  InputEndContent: TextFieldInputEndContent,
  /** @optional Description or helper text */
  Description: TextFieldDescription,
  /** @optional Error message displayed when field is invalid */
  ErrorMessage: TextFieldErrorMessage,
});

export default CompoundTextField;
export { useTextFieldContext };
