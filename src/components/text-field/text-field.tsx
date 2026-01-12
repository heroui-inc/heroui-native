import { forwardRef, useMemo } from 'react';
import {
  TextInput,
  View,
  type BlurEvent,
  type FocusEvent,
  type TextInput as TextInputType,
} from 'react-native';
import Animated from 'react-native-reanimated';
import { HeroText } from '../../helpers/components';
import { AnimationSettingsProvider } from '../../helpers/contexts/animation-settings-context';
import type { TextRef, ViewRef } from '../../helpers/types/primitives';
import { createContext } from '../../helpers/utils';
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
  TextFieldInputProps,
  TextFieldLabelProps,
  TextFieldRootProps,
} from './text-field.types';

const [TextFieldProvider, useTextField] = createContext<TextFieldContextValue>({
  name: 'TextFieldContext',
});

const AnimatedText = Animated.createAnimatedComponent(HeroText);
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

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
        {isRequired && <HeroText className={asteriskStyles}> *</HeroText>}
      </AnimatedText>
    );
  }
);

// --------------------------------------------------

const TextFieldInput = forwardRef<TextInputType, TextFieldInputProps>(
  (props, ref) => {
    const {
      isInvalid: localIsInvalid,
      className,
      style,
      animation,
      isAnimatedStyleActive = true,
      selectionColorClassName: selectionColorClassNameProp,
      placeholderColorClassName: placeholderColorClassNameProp,
      onFocus,
      onBlur,
      ...restProps
    } = props;

    const { isInvalid: contextIsInvalid } = useTextField();

    const isInvalid =
      localIsInvalid !== undefined ? localIsInvalid : contextIsInvalid;

    const inputClassName = textFieldStyles.input({
      className,
    });

    const placeholderColorClassName = textFieldStyles.placeholderTextColor({
      className: placeholderColorClassNameProp,
    });

    const selectionColorClassName = textFieldStyles.inputSelectionColor({
      isInvalid,
      className: selectionColorClassNameProp,
    });

    const {
      animatedContainerStyle,
      handleFocusAnimation,
      handleBlurAnimation,
    } = useTextFieldInputAnimation({
      animation,
      isInvalid,
    });

    const containerStyle = isAnimatedStyleActive
      ? [animatedContainerStyle, styleSheet.borderCurve, style]
      : [styleSheet.borderCurve, style];

    const handleFocus = (e: FocusEvent) => {
      handleFocusAnimation();
      onFocus?.(e);
    };

    const handleBlur = (e: BlurEvent) => {
      handleBlurAnimation();
      onBlur?.(e);
    };

    return (
      <AnimatedTextInput
        ref={ref}
        className={inputClassName}
        style={containerStyle}
        placeholderTextColor={placeholderColorClassName}
        selectionColorClassName={selectionColorClassName}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...restProps}
      />
    );
  }
);

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
TextFieldDescription.displayName = DISPLAY_NAME.DESCRIPTION;
TextFieldErrorMessage.displayName = DISPLAY_NAME.ERROR_MESSAGE;

/**
 * Compound TextField component with sub-components
 *
 * @component TextField - Main container that provides gap-1 spacing between children.
 * Handles disabled state and validation state for the entire field.
 *
 * @component TextField.Label - Label with optional asterisk for required fields.
 * Changes to danger color when field is invalid.
 *
 * @component TextField.Input - Animated input with focus state animations.
 * Border turns danger color when field is invalid.
 *
 * @component TextField.Description - Description text with muted styling.
 * Hidden when field is invalid and error message is shown.
 *
 * @component TextField.ErrorMessage - Error message with danger styling.
 * Shown with animation when field is invalid. Automatically populated from errorMessage prop.
 *
 * @see Full documentation: https://v3.heroui.com/docs/native/components/text-field
 */
const CompoundTextField = Object.assign(TextFieldRoot, {
  /** @optional Label with asterisk support */
  Label: TextFieldLabel,
  /** @required Animated input with focus animations */
  Input: TextFieldInput,
  /** @optional Description or helper text */
  Description: TextFieldDescription,
  /** @optional Error message displayed when field is invalid */
  ErrorMessage: TextFieldErrorMessage,
});

export default CompoundTextField;
export { useTextField };
