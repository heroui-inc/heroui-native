import { forwardRef, useMemo } from 'react';
import {
  TextInput,
  View,
  type NativeSyntheticEvent,
  type TextInputFocusEventData,
  type TextInput as TextInputType,
  type ViewStyle,
} from 'react-native';
import Animated from 'react-native-reanimated';
import { Text } from '../../helpers/components';
import { AnimationSettingsProvider } from '../../helpers/contexts/animation-settings-context';
import { useThemeColor } from '../../helpers/theme';
import type { TextRef, ViewRef } from '../../helpers/types/primitives';
import { createContext, getElementByDisplayName } from '../../helpers/utils';
import { ErrorView } from '../error-view';
import {
  useTextFieldDescriptionAnimation,
  useTextFieldInputAnimation,
  useTextFieldLabelAnimation,
  useTextFieldRootAnimation,
} from './text-field.animation';
import { DISPLAY_NAME } from './text-field.constants';
import textFieldStyles, { styleSheet } from './text-field.styles';
import type {
  TextFieldContextValue,
  TextFieldDescriptionProps,
  TextFieldErrorMessageProps,
  TextFieldInputEndContentProps,
  TextFieldInputProps,
  TextFieldInputStartContentProps,
  TextFieldLabelProps,
  TextFieldRootProps,
} from './text-field.types';

const [TextFieldProvider, useTextField] = createContext<TextFieldContextValue>({
  name: 'TextFieldContext',
});

const AnimatedText = Animated.createAnimatedComponent(Text);

// --------------------------------------------------

const TextFieldRoot = forwardRef<ViewRef, TextFieldRootProps>((props, ref) => {
  const {
    children,
    className,
    isDisabled = false,
    isInvalid = false,
    isRequired = false,
    animation,
    ...restProps
  } = props;

  const tvStyles = textFieldStyles.root({ isDisabled, className });

  const { isAllAnimationsDisabled } = useTextFieldRootAnimation({ animation });

  const contextValue = useMemo(
    () => ({ isDisabled, isInvalid, isRequired }),
    [isDisabled, isInvalid, isRequired]
  );

  const animationSettingsContextValue = useMemo(
    () => ({
      isAllAnimationsDisabled,
    }),
    [isAllAnimationsDisabled]
  );

  return (
    <AnimationSettingsProvider value={animationSettingsContextValue}>
      <TextFieldProvider value={contextValue}>
        <View ref={ref} className={tvStyles} {...restProps}>
          {children}
        </View>
      </TextFieldProvider>
    </AnimationSettingsProvider>
  );
});

// --------------------------------------------------

const TextFieldLabel = forwardRef<TextRef, TextFieldLabelProps>(
  (props, ref) => {
    const {
      children,
      className,
      classNames,
      isInvalid: localIsInvalid,
      animation,
      ...restProps
    } = props;

    const {
      isDisabled,
      isInvalid: contextIsInvalid,
      isRequired,
    } = useTextField();

    const isInvalid =
      localIsInvalid !== undefined ? localIsInvalid : contextIsInvalid;

    const tvStyles = textFieldStyles.label({ isDisabled, isInvalid });

    const textStyles = tvStyles.text({
      className: [className, classNames?.text],
    });

    const asteriskStyles = tvStyles.asterisk({
      className: classNames?.asterisk,
    });

    const { entering, exiting } = useTextFieldLabelAnimation({ animation });

    return (
      <AnimatedText
        key={isInvalid ? 'label-invalid' : 'label-valid'}
        ref={ref}
        entering={entering}
        exiting={exiting}
        className={textStyles}
        {...restProps}
      >
        {children}
        {isRequired && <Text className={asteriskStyles}> *</Text>}
      </AnimatedText>
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
      style,
      animation,
      isInvalid: localIsInvalid,
      onFocus,
      onBlur,
      ...restProps
    } = props;

    const { isInvalid: contextIsInvalid } = useTextField();

    const isInvalid =
      localIsInvalid !== undefined ? localIsInvalid : contextIsInvalid;

    const startContent = getElementByDisplayName(
      children,
      DISPLAY_NAME.INPUT_START_CONTENT
    );
    const endContent = getElementByDisplayName(
      children,
      DISPLAY_NAME.INPUT_END_CONTENT
    );

    const themeColorFieldPlaceholder = useThemeColor('field-placeholder');
    const themeColorMuted = useThemeColor('muted');

    const tvStyles = textFieldStyles.input({
      isMultiline: Boolean(restProps.multiline),
    });

    const containerStyles = tvStyles.container({
      className: [className, classNames?.container],
    });

    const inputStyles = tvStyles.input({ className: classNames?.input });

    const {
      animatedContainerStyle,
      handleFocusAnimation,
      handleBlurAnimation,
    } = useTextFieldInputAnimation({
      animation,
      isInvalid,
      style: style as ViewStyle | undefined,
    });

    const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      handleFocusAnimation();
      onFocus?.(e);
    };

    const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      handleBlurAnimation();
      onBlur?.(e);
    };

    return (
      <Animated.View
        className={containerStyles}
        style={[animatedContainerStyle, styleSheet.borderCurve]}
      >
        {startContent}
        <TextInput
          ref={ref}
          className={inputStyles}
          style={[styleSheet.borderCurve, style]}
          placeholderTextColor={themeColorFieldPlaceholder}
          selectionColor={themeColorMuted}
          selectionHandleColor={themeColorMuted}
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
  const { children, className, ...restProps } = props;

  const tvStyles = textFieldStyles.inputStartContent({ className });

  return (
    <View ref={ref} className={tvStyles} {...restProps}>
      {children}
    </View>
  );
});

// --------------------------------------------------

const TextFieldInputEndContent = forwardRef<
  ViewRef,
  TextFieldInputEndContentProps
>((props, ref) => {
  const { children, className, ...restProps } = props;

  const tvStyles = textFieldStyles.inputEndContent({ className });

  return (
    <View ref={ref} className={tvStyles} {...restProps}>
      {children}
    </View>
  );
});

// --------------------------------------------------

const TextFieldDescription = forwardRef<TextRef, TextFieldDescriptionProps>(
  (props, ref) => {
    const {
      isInvalid: localIsInvalid,
      children,
      className,
      animation,
      ...restProps
    } = props;

    const { isInvalid: contextIsInvalid } = useTextField();

    const isInvalid =
      localIsInvalid !== undefined ? localIsInvalid : contextIsInvalid;

    const tvStyles = textFieldStyles.description({
      className,
    });

    const { entering, exiting } = useTextFieldDescriptionAnimation({
      animation,
    });

    if (isInvalid) return null;

    return (
      <AnimatedText
        ref={ref}
        entering={entering}
        exiting={exiting}
        className={tvStyles}
        {...restProps}
      >
        {children}
      </AnimatedText>
    );
  }
);

// --------------------------------------------------

const TextFieldErrorMessage = forwardRef<TextRef, TextFieldErrorMessageProps>(
  (props, ref) => {
    const { isInvalid: contextIsInvalid } = useTextField();
    const { className, isInvalid: localIsInvalid, ...restProps } = props;

    const isInvalid =
      localIsInvalid !== undefined ? localIsInvalid : contextIsInvalid;

    const tvStyles = textFieldStyles.errorMessage({
      className,
    });

    return (
      <ErrorView
        ref={ref}
        isInvalid={isInvalid}
        className={tvStyles}
        {...restProps}
      />
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
export { useTextField };
