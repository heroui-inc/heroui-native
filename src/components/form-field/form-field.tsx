import { cloneElement, forwardRef, useCallback, useMemo } from 'react';
import {
  Pressable,
  Text,
  View,
  type GestureResponderEvent,
} from 'react-native';
import {
  createContext,
  getElementByDisplayName,
  hasProp,
} from '../../helpers/utils';

import Animated, { useSharedValue } from 'react-native-reanimated';
import type { PressableRef } from '../../helpers/types';
import type { ViewRef } from '../../helpers/types/primitives';
import { ErrorView } from '../error-view';
import type { ErrorViewRootProps } from '../error-view/error-view.types';
import { DISPLAY_NAME } from './form-field.constants';
import formFieldStyles from './form-field.styles';
import type {
  FormFieldContentProps,
  FormFieldContextValue,
  FormFieldDescriptionProps,
  FormFieldIndicatorProps,
  FormFieldProps,
  FormFieldTitleProps,
} from './form-field.types';

const [FormFieldProvider, useFormField] = createContext<FormFieldContextValue>({
  name: 'FormFieldContext',
  strict: false,
});

// --------------------------------------------------

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const AnimatedText = Animated.createAnimatedComponent(Text);

const FormField = forwardRef<PressableRef, FormFieldProps>((props, ref) => {
  const {
    children,
    className,
    isSelected,
    onSelectedChange,
    orientation = 'horizontal',
    alignIndicator = 'end',
    isDisabled = false,
    isInline = false,
    isInvalid = false,
    onPressIn,
    onPressOut,
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
    className,
  });

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
      isInline,
      isInvalid,
      isPressed,
    }),
    [isSelected, onSelectedChange, isDisabled, isInline, isInvalid, isPressed]
  );

  return (
    <FormFieldProvider value={contextValue}>
      <View>
        <AnimatedPressable
          ref={ref}
          className={tvStyles}
          onPress={handlePress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          disabled={isDisabled}
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

const FormFieldContent = forwardRef<View, FormFieldContentProps>(
  (props, ref) => {
    const { children, className, ...restProps } = props;

    const { isInline } = useFormField();

    const tvStyles = formFieldStyles.content({
      isInline,
      className,
    });

    return (
      <Animated.View ref={ref} className={tvStyles} {...restProps}>
        {children}
      </Animated.View>
    );
  }
);

// --------------------------------------------------

const FormFieldTitle = forwardRef<Text, FormFieldTitleProps>((props, ref) => {
  const { children, className, ...restProps } = props;

  const tvStyles = formFieldStyles.title({
    className,
  });

  return (
    <AnimatedText ref={ref} className={tvStyles} {...restProps}>
      {children}
    </AnimatedText>
  );
});

// --------------------------------------------------

const FormFieldDescription = forwardRef<Text, FormFieldDescriptionProps>(
  (props, ref) => {
    const { children, className, ...restProps } = props;

    const tvStyles = formFieldStyles.description({
      className,
    });

    return (
      <AnimatedText ref={ref} className={tvStyles} {...restProps}>
        {children}
      </AnimatedText>
    );
  }
);

// --------------------------------------------------

const FormFieldIndicator = forwardRef<View, FormFieldIndicatorProps>(
  (props, ref) => {
    const { children, className, ...restProps } = props;
    const { isSelected, onSelectedChange, isDisabled, isInvalid } =
      useFormField();

    const tvStyles = formFieldStyles.indicator({
      className,
    });

    const enhancedChildren = useMemo(() => {
      if (!children || typeof children !== 'object') return children;

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
    }, [children, isSelected, onSelectedChange, isDisabled, isInvalid]);

    return (
      <Animated.View ref={ref} className={tvStyles} {...restProps}>
        {enhancedChildren}
      </Animated.View>
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
FormFieldContent.displayName = DISPLAY_NAME.FORM_FIELD_CONTENT;
FormFieldTitle.displayName = DISPLAY_NAME.FORM_FIELD_TITLE;
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
 * @component FormField.Title - Primary text title for the form control. Renders as
 * AnimatedText component when children is a string.
 *
 * @component FormField.Description - Secondary descriptive text. Renders as AnimatedText
 * component when children is a string.
 *
 * @component FormField.Indicator - Container for the control component (Switch, Checkbox).
 * Automatically passes down isSelected, onSelectedChange, and isDisabled props.
 *
 * @component FormField.ErrorMessage - Error message displayed when field is invalid.
 * Shown with animation below the form field content.
 *
 * Props flow from FormField to sub-components via context.
 * The component supports both horizontal and vertical orientations.
 */
const CompoundFormField = Object.assign(FormField, {
  /** @optional Container for title and description */
  Content: FormFieldContent,
  /** @optional Primary text title */
  Title: FormFieldTitle,
  /** @optional Secondary descriptive text */
  Description: FormFieldDescription,
  /** @optional Container for control component */
  Indicator: FormFieldIndicator,
  /** @optional Error message displayed when field is invalid */
  ErrorMessage: FormFieldErrorMessage,
});

export { useFormField };
export default CompoundFormField;
