import React, { cloneElement, forwardRef, useCallback, useMemo } from 'react';
import {
  Pressable,
  Text as RNText,
  View,
  type GestureResponderEvent,
} from 'react-native';
import { hasProp } from '../../helpers/utils';

import { useSharedValue } from 'react-native-reanimated';
import { HeroText } from '../../helpers/components/hero-text';
import { AnimationSettingsProvider } from '../../helpers/contexts/animation-settings-context';
import type { PressableRef } from '../../helpers/types';
import type { ViewRef } from '../../helpers/types/primitives';
import { Checkbox } from '../checkbox';
import { ErrorView } from '../error-view';
import type { ErrorViewRootProps } from '../error-view/error-view.types';
import { Switch } from '../switch';
import { useFormFieldRootAnimation } from './form-field.animation';
import { DISPLAY_NAME } from './form-field.constants';
import { FormFieldProvider, useFormField } from './form-field.context';
import formFieldStyles from './form-field.styles';
import type {
  FormFieldContextValue,
  FormFieldDescriptionProps,
  FormFieldIndicatorProps,
  FormFieldLabelProps,
  FormFieldProps,
  FormFieldRenderProps,
} from './form-field.types';

// --------------------------------------------------

const FormField = forwardRef<PressableRef, FormFieldProps>((props, ref) => {
  const {
    children,
    className,
    isSelected,
    onSelectedChange,
    isDisabled = false,
    isInvalid = false,
    onPressIn,
    onPressOut,
    animation,
    ...restProps
  } = props;

  const renderProps: FormFieldRenderProps = useMemo(
    () => ({
      isSelected,
      isDisabled: isDisabled ?? false,
      isInvalid: isInvalid ?? false,
    }),
    [isSelected, isDisabled, isInvalid]
  );

  const content =
    typeof children === 'function' ? children(renderProps) : children;

  const tvStyles = formFieldStyles.root({
    isDisabled,
    className,
  });

  const { isAllAnimationsDisabled } = useFormFieldRootAnimation({
    animation,
  });

  const animationSettingsContextValue = useMemo(
    () => ({
      isAllAnimationsDisabled,
    }),
    [isAllAnimationsDisabled]
  );

  const isPressed = useSharedValue<boolean>(false);

  const handlePress = (e: GestureResponderEvent) => {
    if (!isDisabled && onSelectedChange && isSelected !== undefined) {
      onSelectedChange(!isSelected);

      if (props.onPress && typeof props.onPress === 'function') {
        props.onPress(e);
      }
    }
  };

  const handlePressIn = useCallback(
    (e: GestureResponderEvent) => {
      isPressed.set(true);
      if (onPressIn && typeof onPressIn === 'function') {
        onPressIn(e);
      }
    },
    [isPressed, onPressIn]
  );

  const handlePressOut = useCallback(
    (e: GestureResponderEvent) => {
      isPressed.set(false);
      if (onPressOut && typeof onPressOut === 'function') {
        onPressOut(e);
      }
    },
    [isPressed, onPressOut]
  );

  const contextValue: FormFieldContextValue = useMemo(
    () => ({
      isSelected,
      onSelectedChange,
      isDisabled,
      isInvalid,
      isPressed,
    }),
    [isSelected, onSelectedChange, isDisabled, isInvalid, isPressed]
  );

  return (
    <AnimationSettingsProvider value={animationSettingsContextValue}>
      <FormFieldProvider value={contextValue}>
        <Pressable
          ref={ref}
          className={tvStyles}
          onPress={handlePress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          disabled={isDisabled}
          {...restProps}
        >
          {content}
        </Pressable>
      </FormFieldProvider>
    </AnimationSettingsProvider>
  );
});

// --------------------------------------------------

const FormFieldLabel = forwardRef<RNText, FormFieldLabelProps>((props, ref) => {
  const { children, className, ...restProps } = props;

  const tvStyles = formFieldStyles.label({
    className,
  });

  return (
    <HeroText ref={ref} className={tvStyles} {...restProps}>
      {children}
    </HeroText>
  );
});

// --------------------------------------------------

const FormFieldDescription = forwardRef<RNText, FormFieldDescriptionProps>(
  (props, ref) => {
    const { children, className, ...restProps } = props;

    const tvStyles = formFieldStyles.description({
      className,
    });

    return (
      <HeroText ref={ref} className={tvStyles} {...restProps}>
        {children}
      </HeroText>
    );
  }
);

// --------------------------------------------------

const FormFieldIndicator = forwardRef<View, FormFieldIndicatorProps>(
  (props, ref) => {
    const { children, className, variant = 'switch', ...restProps } = props;
    const { isSelected, onSelectedChange, isDisabled, isInvalid } =
      useFormField();

    const tvStyles = formFieldStyles.indicator({
      className,
    });

    const enhancedChildren = useMemo(() => {
      if (children) {
        if (typeof children !== 'object') return children;

        const child = children as React.ReactElement;

        return cloneElement(child, {
          // Only pass props from context if child doesn't already have them
          ...(isSelected !== undefined &&
            !hasProp(child, 'isSelected') && { isSelected }),
          ...(onSelectedChange &&
            !hasProp(child, 'onSelectedChange') && { onSelectedChange }),
          ...(isDisabled !== undefined &&
            !hasProp(child, 'isDisabled') && { isDisabled }),
          ...(isInvalid !== undefined &&
            !hasProp(child, 'isInvalid') && { isInvalid }),
        });
      }

      // Render default component based on variant when no children provided
      if (variant === 'checkbox') {
        return (
          <Checkbox
            isSelected={isSelected}
            onSelectedChange={onSelectedChange}
            isDisabled={isDisabled}
            isInvalid={isInvalid}
          />
        );
      }

      return (
        <Switch
          isSelected={isSelected}
          onSelectedChange={onSelectedChange}
          isDisabled={isDisabled}
        />
      );
    }, [
      children,
      variant,
      isSelected,
      onSelectedChange,
      isDisabled,
      isInvalid,
    ]);

    return (
      <View ref={ref} className={tvStyles} {...restProps}>
        {enhancedChildren}
      </View>
    );
  }
);

// --------------------------------------------------

const FormFieldErrorMessage = forwardRef<ViewRef, ErrorViewRootProps>(
  (props, ref) => {
    const { isInvalid } = useFormField();
    const { className, ...restProps } = props;

    const tvStyles = formFieldStyles.errorMessage({
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

FormField.displayName = DISPLAY_NAME.FORM_FIELD;
FormFieldLabel.displayName = DISPLAY_NAME.FORM_FIELD_LABEL;
FormFieldDescription.displayName = DISPLAY_NAME.FORM_FIELD_DESCRIPTION;
FormFieldIndicator.displayName = DISPLAY_NAME.FORM_FIELD_INDICATOR;
FormFieldErrorMessage.displayName = DISPLAY_NAME.FORM_FIELD_ERROR_MESSAGE;

/**
 * Compound FormField component with sub-components
 *
 * @component FormField - Wrapper that provides consistent layout and interaction for form controls.
 * Handles press events to toggle selection state and manages disabled states.
 *
 * @component FormField.Label - Primary text label for the form control. Renders as
 * Text component when children is a string.
 *
 * @component FormField.Description - Secondary descriptive text. Renders as Text
 * component when children is a string.
 *
 * @component FormField.Indicator - Container for the control component (Switch, Checkbox).
 * Automatically passes down isSelected, onSelectedChange, isDisabled, and isInvalid props.
 *
 * @component FormField.ErrorMessage - Error message displayed when field is invalid.
 * Shown with animation below the form field content.
 *
 * Props flow from FormField to sub-components via context.
 */
const CompoundFormField = Object.assign(FormField, {
  /** @optional Primary text label */
  Label: FormFieldLabel,
  /** @optional Secondary descriptive text */
  Description: FormFieldDescription,
  /** @optional Container for control component */
  Indicator: FormFieldIndicator,
  /** @optional Error message displayed when field is invalid */
  ErrorMessage: FormFieldErrorMessage,
});

export { useFormField } from './form-field.context';
export default CompoundFormField;
