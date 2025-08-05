import { cloneElement, forwardRef, useMemo } from 'react';
import { Pressable, Text, View } from 'react-native';

import { createContext, getElementByDisplayName } from '@/helpers/utils';

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

const FormField = forwardRef<View, FormFieldProps>((props, ref) => {
  const {
    children,
    className,
    isSelected,
    onSelectedChange,
    orientation = 'horizontal',
    alignIndicator = 'end',
    isDisabled = false,
    isReadOnly = false,
    ...restProps
  } = props;

  const contentElement = useMemo(() => {
    return getElementByDisplayName(children, DISPLAY_NAME.FORM_FIELD_CONTENT);
  }, [children]);

  const indicatorElement = useMemo(() => {
    return getElementByDisplayName(children, DISPLAY_NAME.FORM_FIELD_INDICATOR);
  }, [children]);

  const tvStyles = formFieldStyles.root({
    orientation,
    alignIndicator,
    isDisabled,
    isReadOnly,
    className,
  });

  const contextValue = useMemo(
    () => ({
      isSelected,
      onSelectedChange,
      isDisabled,
      isReadOnly,
    }),
    [isSelected, onSelectedChange, isDisabled, isReadOnly]
  );

  const handlePress = () => {
    if (
      !isDisabled &&
      !isReadOnly &&
      onSelectedChange &&
      isSelected !== undefined
    ) {
      onSelectedChange(!isSelected);
    }
  };

  return (
    <FormFieldProvider value={contextValue}>
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
    </FormFieldProvider>
  );
});

// --------------------------------------------------

function FormFieldContent(props: FormFieldContentProps) {
  const { children, className, ...restProps } = props;

  const tvStyles = formFieldStyles.content({
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
    const { isSelected, onSelectedChange, isDisabled, isReadOnly } =
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
      });
    }, [children, isSelected, onSelectedChange, isDisabled, isReadOnly]);

    return (
      <Animated.View ref={ref} className={tvStyles} {...restProps}>
        {enhancedChildren}
      </Animated.View>
    );
  }
);

// --------------------------------------------------

FormField.displayName = DISPLAY_NAME.FORM_FIELD;
FormFieldContent.displayName = DISPLAY_NAME.FORM_FIELD_CONTENT;
FormFieldLabel.displayName = DISPLAY_NAME.FORM_FIELD_LABEL;
FormFieldDescription.displayName = DISPLAY_NAME.FORM_FIELD_DESCRIPTION;
FormFieldIndicator.displayName = DISPLAY_NAME.FORM_FIELD_INDICATOR;

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
});

export { useFormFieldContext };
export default CompoundFormField;
