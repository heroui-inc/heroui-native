import React, { cloneElement, forwardRef, useCallback, useMemo } from 'react';
import { Pressable, View, type GestureResponderEvent } from 'react-native';
import { hasProp } from '../../helpers/internal/utils';

import { useSharedValue } from 'react-native-reanimated';
import {
  AnimationSettingsProvider,
  FormItemStateProvider,
} from '../../helpers/internal/contexts';
import type { PressableRef } from '../../helpers/internal/types';
import { Checkbox } from '../checkbox';
import { Switch } from '../switch';
import { useFormFieldRootAnimation } from './form-field.animation';
import { DISPLAY_NAME } from './form-field.constants';
import { FormFieldProvider, useFormField } from './form-field.context';
import formFieldStyles from './form-field.styles';
import type {
  FormFieldContextValue,
  FormFieldIndicatorProps,
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

  const formItemStateContextValue = useMemo(
    () => ({
      isDisabled: isDisabled ?? false,
      isInvalid: isInvalid ?? false,
      isRequired: false,
    }),
    [isDisabled, isInvalid]
  );

  return (
    <AnimationSettingsProvider value={animationSettingsContextValue}>
      <FormItemStateProvider value={formItemStateContextValue}>
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
      </FormItemStateProvider>
    </AnimationSettingsProvider>
  );
});

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

FormField.displayName = DISPLAY_NAME.FORM_FIELD;
FormFieldIndicator.displayName = DISPLAY_NAME.FORM_FIELD_INDICATOR;

/**
 * Compound FormField component with sub-components
 *
 * @component FormField - Wrapper that provides consistent layout and interaction for form controls.
 * Handles press events to toggle selection state and manages disabled states.
 *
 * @component FormField.Indicator - Container for the control component (Switch, Checkbox).
 * Automatically passes down isSelected, onSelectedChange, isDisabled, and isInvalid props.
 *
 * Props flow from FormField to sub-components via context.
 *
 * @example
 * ```tsx
 * import { Description, FieldError, FormField, Label } from 'heroui-native';
 *
 * <FormField isSelected={value} onSelectedChange={setValue}>
 *   <Label>Enable notifications</Label>
 *   <Description>Receive push notifications</Description>
 *   <FormField.Indicator />
 *   <FieldError>This field is required</FieldError>
 * </FormField>
 * ```
 */
const CompoundFormField = Object.assign(FormField, {
  /** @optional Container for control component */
  Indicator: FormFieldIndicator,
});

export { useFormField } from './form-field.context';
export default CompoundFormField;
