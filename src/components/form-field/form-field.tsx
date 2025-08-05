import { cloneElement, forwardRef, useMemo } from 'react';
import {
  Pressable,
  Text,
  View,
  type GestureResponderEvent,
} from 'react-native';

import { cn, createContext, getElementByDisplayName } from '@/helpers/utils';

import ErrorField from '@/components/error-field';
import type { ErrorFieldRootProps } from '@/components/error-field/error-field.types';
import type { PressableRef } from '@/helpers/types';
import type { TextRef } from '@/helpers/types/primitives';
import Animated from 'react-native-reanimated';
import { DISPLAY_NAME } from './form-field.constants';
import formFieldStyles from './form-field.styles';
import type {
  FormFieldContentProps,
  FormFieldContextValue,
  FormFieldDescriptionProps,
  FormFieldIndicatorProps,
  FormFieldLabelProps,
  FormFieldProps,
} from './form-field.types';

const [FormFieldProvider, useFormFieldContext] =
  createContext<FormFieldContextValue>({
    name: 'FormFieldContext',
  });

// --------------------------------------------------

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const FormField = forwardRef<PressableRef, FormFieldProps>((props, ref) => {
  const {
    children,
    className,
    isSelected,
    onSelectedChange,
    orientation = 'horizontal',
    alignIndicator = 'end',
    isDisabled = false,
    isReadOnly = false,
    isInline = false,
    isValid = true,
    ...restProps
  } = props;

  const contentElement = useMemo(() => {
    return getElementByDisplayName(children, DISPLAY_NAME.FORM_FIELD_CONTENT);
  }, [children]);

  const indicatorElement = useMemo(() => {
    return getElementByDisplayName(children, DISPLAY_NAME.FORM_FIELD_INDICATOR);
  }, [children]);

  const errorMessageElement = useMemo(() => {
    return getElementByDisplayName(
      children,
      DISPLAY_NAME.FORM_FIELD_ERROR_MESSAGE
    );
  }, [children]);

  const tvStyles = formFieldStyles.root({
    orientation,
    alignIndicator,
    isDisabled,
    isReadOnly,
    className,
  });

  const handlePress = (e: GestureResponderEvent) => {
    if (
      !isDisabled &&
      !isReadOnly &&
      onSelectedChange &&
      isSelected !== undefined
    ) {
      onSelectedChange(!isSelected);
      props.onPress?.(e);
    }
  };

  const contextValue: FormFieldContextValue = useMemo(
    () => ({
      isSelected,
      onSelectedChange,
      isDisabled,
      isReadOnly,
      isInline,
      isValid,
    }),
    [isSelected, onSelectedChange, isDisabled, isReadOnly, isInline, isValid]
  );

  return (
    <FormFieldProvider value={contextValue}>
      <View>
        <AnimatedPressable
          ref={ref}
          className={tvStyles}
          onPress={handlePress}
          disabled={isDisabled || isReadOnly}
          {...restProps}
        >
          {orientation === 'horizontal' ? (
            <>
              {contentElement}
              {indicatorElement}
            </>
          ) : (
            <>
              {indicatorElement}
              {contentElement}
            </>
          )}
        </AnimatedPressable>
        {errorMessageElement}
      </View>
    </FormFieldProvider>
  );
});

// --------------------------------------------------

function FormFieldContent(props: FormFieldContentProps) {
  const { children, className, ...restProps } = props;

  const { isInline } = useFormFieldContext();

  const tvStyles = formFieldStyles.content({
    isInline,
    className,
  });

  return (
    <Animated.View className={tvStyles} {...restProps}>
      {children}
    </Animated.View>
  );
}

// --------------------------------------------------

function FormFieldLabel(props: FormFieldLabelProps) {
  const { children, className, classNames, ...restProps } = props;

  const { container, text } = formFieldStyles.label();

  const containerStyles = container({
    className: [className, classNames?.container],
  });
  const textStyles = text({ className: classNames?.text });

  return (
    <Animated.View className={containerStyles} {...restProps}>
      {typeof children === 'string' ? (
        <Text className={textStyles}>{children}</Text>
      ) : (
        children
      )}
    </Animated.View>
  );
}

// --------------------------------------------------

function FormFieldDescription(props: FormFieldDescriptionProps) {
  const { children, className, classNames, ...restProps } = props;

  const { container, text } = formFieldStyles.description();

  const containerStyles = container({
    className: [className, classNames?.container],
  });
  const textStyles = text({ className: classNames?.text });

  return (
    <Animated.View className={containerStyles} {...restProps}>
      {typeof children === 'string' ? (
        <Text className={textStyles}>{children}</Text>
      ) : (
        children
      )}
    </Animated.View>
  );
}

// --------------------------------------------------

const FormFieldIndicator = forwardRef<View, FormFieldIndicatorProps>(
  (props, ref) => {
    const { children, className, ...restProps } = props;
    const { isSelected, onSelectedChange, isDisabled, isReadOnly, isValid } =
      useFormFieldContext();

    const tvStyles = formFieldStyles.indicator({
      className,
    });

    const enhancedChildren = useMemo(() => {
      if (!children || typeof children !== 'object') return children;

      const child = children as React.ReactElement;

      return cloneElement(child, {
        ...(isSelected !== undefined && { isSelected }),
        ...(onSelectedChange && { onSelectedChange }),
        ...(isDisabled && { isDisabled }),
        ...(isReadOnly && { isReadOnly }),
        ...(isValid !== undefined && { isValid }),
      });
    }, [
      children,
      isSelected,
      onSelectedChange,
      isDisabled,
      isReadOnly,
      isValid,
    ]);

    return (
      <Animated.View ref={ref} className={tvStyles} {...restProps}>
        {enhancedChildren}
      </Animated.View>
    );
  }
);

// --------------------------------------------------

const FormFieldErrorMessage = forwardRef<TextRef, ErrorFieldRootProps>(
  (props, ref) => {
    const { isValid } = useFormFieldContext();

    return (
      <ErrorField
        ref={ref}
        isValid={isValid}
        className={cn('mt-1', props.className)}
        {...props}
      />
    );
  }
);

// --------------------------------------------------

FormField.displayName = DISPLAY_NAME.FORM_FIELD;
FormFieldContent.displayName = DISPLAY_NAME.FORM_FIELD_CONTENT;
FormFieldLabel.displayName = DISPLAY_NAME.FORM_FIELD_LABEL;
FormFieldDescription.displayName = DISPLAY_NAME.FORM_FIELD_DESCRIPTION;
FormFieldIndicator.displayName = DISPLAY_NAME.FORM_FIELD_INDICATOR;
FormFieldErrorMessage.displayName = DISPLAY_NAME.FORM_FIELD_ERROR_MESSAGE;

/**
 * Compound FormField component with sub-components
 *
 * @component FormField - Wrapper that provides consistent layout and interaction for form controls.
 * Handles press events to toggle selection state and manages disabled/readonly states.
 *
 * @component FormField.Content - Container for label and description text. Provides
 * consistent spacing and layout for textual content.
 *
 * @component FormField.Label - Primary text label for the form control. Renders as
 * Text component when children is a string, otherwise as a View.
 *
 * @component FormField.Description - Secondary descriptive text. Renders as Text
 * component when children is a string, otherwise as a View.
 *
 * @component FormField.Indicator - Container for the control component (Switch, Checkbox).
 * Automatically passes down isSelected, onSelectedChange, isDisabled, and isReadOnly props.
 *
 * @component FormField.ErrorMessage - Error message displayed when field is invalid.
 * Shown with animation below the form field content.
 *
 * Props flow from FormField to sub-components via context.
 * The component supports both horizontal and vertical orientations.
 */
const CompoundFormField = Object.assign(FormField, {
  /** @optional Container for label and description */
  Content: FormFieldContent,
  /** @optional Primary text label */
  Label: FormFieldLabel,
  /** @optional Secondary descriptive text */
  Description: FormFieldDescription,
  /** @optional Container for control component */
  Indicator: FormFieldIndicator,
  /** @optional Error message displayed when field is invalid */
  ErrorMessage: FormFieldErrorMessage,
});

export { useFormFieldContext };
export default CompoundFormField;
