import type { TextRef, ViewRef } from '@/helpers/types/primitives';
import { Text as SlotText, View as SlotView } from '@/primitives/slot';
import { useTheme } from '@/theme';
import React, { forwardRef, useState } from 'react';
import {
  Pressable,
  Text,
  TextInput,
  View,
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
} from './text-field.constants';
import textFieldStyles from './text-field.styles';
import type {
  TextFieldDescriptionProps,
  TextFieldInputEndContentProps,
  TextFieldInputProps,
  TextFieldInputStartContentProps,
  TextFieldLabelProps,
  TextFieldRootProps,
} from './text-field.types';

// --------------------------------------------------

const TextFieldRoot = forwardRef<ViewRef, TextFieldRootProps>((props, ref) => {
  const { children, className, isDisabled, asChild, ...restProps } = props;

  const tvStyles = textFieldStyles.root({ isDisabled, className });

  const Component = asChild ? SlotView : View;

  return (
    <Component ref={ref} className={tvStyles} {...restProps}>
      {children}
    </Component>
  );
});

// --------------------------------------------------

const TextFieldLabel = forwardRef<ViewRef, TextFieldLabelProps>(
  (props, ref) => {
    const {
      children,
      className,
      classNames,
      hideAsterisk,
      asChild,
      ...restProps
    } = props;

    const tvStyles = textFieldStyles.label();
    const containerStyles = tvStyles.container({
      className: [className, classNames?.container],
    });
    const textStyles = tvStyles.text({ className: classNames?.text });
    const asteriskStyles = tvStyles.asterisk({
      className: classNames?.asterisk,
    });

    const Component = asChild ? SlotView : View;

    return (
      <Component ref={ref} className={containerStyles} {...restProps}>
        <Text className={textStyles}>{children}</Text>
        {!hideAsterisk && <Text className={asteriskStyles}>*</Text>}
      </Component>
    );
  }
);

// --------------------------------------------------

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const TextFieldInput = forwardRef<TextInputType, TextFieldInputProps>(
  (props, ref) => {
    const {
      children,
      className,
      classNames,
      placeholderTextColor,
      ...restProps
    } = props;

    const [isFocused, setIsFocused] = useState(false);
    const { colors } = useTheme();

    const borderWidth = useSharedValue(1);
    const backgroundColor = useSharedValue(0);

    const tvStyles = textFieldStyles.input({ isFocused });
    const containerStyles = tvStyles.container({
      className: [className, classNames?.container],
    });
    const inputStyles = tvStyles.input({ className: classNames?.input });

    // Extract start and end content from children
    const startContent = React.Children.toArray(children).find(
      (child) =>
        React.isValidElement(child) && child.type === TextFieldInputStartContent
    );
    const endContent = React.Children.toArray(children).find(
      (child) =>
        React.isValidElement(child) && child.type === TextFieldInputEndContent
    );

    const animatedContainerStyle = useAnimatedStyle(() => {
      return {
        borderWidth: withTiming(borderWidth.value, {
          duration: ANIMATION_DURATION,
          easing: ANIMATION_EASING,
        }),
        backgroundColor: withTiming(
          interpolateColor(
            backgroundColor.value,
            [0, 1],
            [colors.surface2, 'transparent']
          ),
          {
            duration: ANIMATION_DURATION,
            easing: ANIMATION_EASING,
          }
        ),
      };
    });

    const handleFocus = () => {
      setIsFocused(true);
      borderWidth.value = 3;
      backgroundColor.value = 1;
    };

    const handleBlur = () => {
      setIsFocused(false);
      borderWidth.value = 1;
      backgroundColor.value = 0;
    };

    const handlePressIn = () => {};

    return (
      <AnimatedPressable
        onPressIn={handlePressIn}
        className={containerStyles}
        style={animatedContainerStyle}
      >
        {startContent}
        <TextInput
          ref={ref}
          className={inputStyles}
          placeholderTextColor={placeholderTextColor || colors.mutedForeground}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...restProps}
        />
        {endContent}
      </AnimatedPressable>
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

    const tvStyles = textFieldStyles.description({ className });

    const Component = asChild ? SlotText : Text;

    return (
      <Component ref={ref} className={tvStyles} {...restProps}>
        {children}
      </Component>
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

/**
 * Compound TextField component with sub-components
 *
 * @component TextField - Main container that provides gap-2 spacing between children.
 * Handles disabled state for the entire field.
 *
 * @component TextField.Label - Label with optional asterisk for required fields.
 * Wraps text in a View to support flex-row layout with gap.
 *
 * @component TextField.Input - Input container with animated border and background.
 * Supports start/end content slots and handles focus state animations.
 *
 * @component TextField.InputStartContent - Optional content at the start of the input.
 * Use for icons or prefixes.
 *
 * @component TextField.InputEndContent - Optional content at the end of the input.
 * Use for icons, suffixes, or action buttons.
 *
 * @component TextField.Description - Description text with muted styling.
 * Use for helper text or error messages.
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
});

export default CompoundTextField;
