import { forwardRef, useCallback, useMemo, useState } from 'react';
import { type TextInput as TextInputType, View } from 'react-native';
import { useIsOnSurface } from '../../helpers/external/hooks';
import {
  AnimationSettingsProvider,
  FormFieldProvider,
} from '../../helpers/internal/contexts';
import type { ViewRef } from '../../helpers/internal/types';
import { createContext } from '../../helpers/internal/utils';
import { Input } from '../input';
import { useInputFieldRootAnimation } from './input-field.animation';
import { DISPLAY_NAME } from './input-field.constants';
import {
  inputFieldClassNames,
  inputFieldStyleSheet,
} from './input-field.styles';
import type {
  InputFieldAddonProps,
  InputFieldContextType,
  InputFieldInputProps,
  InputFieldProps,
} from './input-field.types';

const [InputFieldProvider, useInputField] =
  createContext<InputFieldContextType>({
    name: 'InputFieldContext',
    strict: false,
  });

// --------------------------------------------------

const InputFieldRoot = forwardRef<ViewRef, InputFieldProps>((props, ref) => {
  const {
    children,
    className,
    value,
    onChange,
    isDisabled = false,
    isInvalid = false,
    isRequired = false,
    animation,
    style,
    ...restProps
  } = props;

  const [isFocused, setIsFocused] = useState(false);

  const isOnSurface = useIsOnSurface();
  const variant = isOnSurface ? 'secondary' : 'primary';

  const { isAllAnimationsDisabled } = useInputFieldRootAnimation({ animation });

  const rootClassName = inputFieldClassNames.root({
    variant,
    isFocused,
    isInvalid,
    isDisabled,
    className,
  });

  const inputFieldContextValue = useMemo<InputFieldContextType>(
    () => ({
      value,
      onChange,
      isFocused,
      setIsFocused,
      isDisabled,
      isInvalid,
      isRequired,
    }),
    [value, onChange, isFocused, isDisabled, isInvalid, isRequired]
  );

  const formFieldContextValue = useMemo(
    () => ({ isDisabled, isInvalid, isRequired, hasFieldPadding: true }),
    [isDisabled, isInvalid, isRequired]
  );

  const animationSettingsContextValue = useMemo(
    () => ({ isAllAnimationsDisabled }),
    [isAllAnimationsDisabled]
  );

  return (
    <InputFieldProvider value={inputFieldContextValue}>
      <AnimationSettingsProvider value={animationSettingsContextValue}>
        <FormFieldProvider value={formFieldContextValue}>
          <View
            ref={ref}
            className={rootClassName}
            style={[inputFieldStyleSheet.borderCurve, style]}
            {...restProps}
          >
            {children}
          </View>
        </FormFieldProvider>
      </AnimationSettingsProvider>
    </InputFieldProvider>
  );
});

// --------------------------------------------------

const InputFieldAddon = forwardRef<ViewRef, InputFieldAddonProps>(
  (props, ref) => {
    const { children, className, ...restProps } = props;

    const addonClassName = inputFieldClassNames.addon({ className });

    return (
      <View ref={ref} className={addonClassName} {...restProps}>
        {children}
      </View>
    );
  }
);

// --------------------------------------------------

const InputFieldInput = forwardRef<TextInputType, InputFieldInputProps>(
  (props, ref) => {
    const {
      isDisabled: localIsDisabled,
      className,
      onFocus: onFocusProp,
      onBlur: onBlurProp,
      ...restProps
    } = props;

    const inputField = useInputField();

    const isDisabled = localIsDisabled ?? inputField?.isDisabled ?? false;

    const onFocus = useCallback(
      (e: Parameters<NonNullable<InputFieldInputProps['onFocus']>>[0]) => {
        inputField?.setIsFocused(true);
        onFocusProp?.(e);
      },
      [inputField, onFocusProp]
    );

    const onBlur = useCallback(
      (e: Parameters<NonNullable<InputFieldInputProps['onBlur']>>[0]) => {
        inputField?.setIsFocused(false);
        onBlurProp?.(e);
      },
      [inputField, onBlurProp]
    );

    const inputClassName = inputFieldClassNames.input({ className });

    return (
      <Input
        ref={ref}
        {...restProps}
        className={inputClassName}
        value={inputField?.value}
        onChangeText={inputField?.onChange}
        isDisabled={false}
        editable={!isDisabled}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    );
  }
);

// --------------------------------------------------

InputFieldRoot.displayName = DISPLAY_NAME.INPUT_FIELD;
InputFieldAddon.displayName = DISPLAY_NAME.INPUT_FIELD_ADDON;
InputFieldInput.displayName = DISPLAY_NAME.INPUT_FIELD_INPUT;

/**
 * Compound InputField component with sub-components.
 *
 * @component InputField - Root container that accepts `value`, `onChange`,
 * `isDisabled`, `isInvalid`, and `isRequired`, providing them to children via
 * context. Owns the visual shell (border, background, rounded corners) and
 * tracks focus state for the focus border. Also provides FormFieldProvider
 * and animation settings.
 *
 * @component InputField.Addon - Plain flex View for leading or trailing
 * content (icons, labels, buttons). Naturally sized as a flex sibling — no
 * absolute positioning required.
 *
 * @component InputField.Input - Wraps the Input component with shell-stripping
 * overrides so the root owns the visual shell. Reads `value` and `onChangeText`
 * from InputFieldContext automatically. Reports focus/blur state back to the
 * root to drive the focus border.
 *
 * @see Full documentation: https://v3.heroui.com/docs/native/components/input-field
 */
const CompoundInputField = Object.assign(InputFieldRoot, {
  /** Plain flex View for leading or trailing addon content */
  Addon: InputFieldAddon,
  /** Text input that reads value/onChange from context */
  Input: InputFieldInput,
});

export { useInputField };
export default CompoundInputField;
