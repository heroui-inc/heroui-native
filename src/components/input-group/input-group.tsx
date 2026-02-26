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
import { useInputGroupRootAnimation } from './input-group.animation';
import { DISPLAY_NAME } from './input-group.constants';
import {
  inputGroupClassNames,
  inputGroupStyleSheet,
} from './input-group.styles';
import type {
  InputGroupAddonProps,
  InputGroupContextType,
  InputGroupInputProps,
  InputGroupProps,
} from './input-group.types';

const [InputGroupProvider, useInputGroup] =
  createContext<InputGroupContextType>({
    name: 'InputGroupContext',
    strict: false,
  });

// --------------------------------------------------

const InputGroupRoot = forwardRef<ViewRef, InputGroupProps>((props, ref) => {
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

  const { isAllAnimationsDisabled } = useInputGroupRootAnimation({ animation });

  const rootClassName = inputGroupClassNames.root({
    variant,
    isFocused,
    isInvalid,
    isDisabled,
    className,
  });

  const inputGroupContextValue = useMemo<InputGroupContextType>(
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
    <InputGroupProvider value={inputGroupContextValue}>
      <AnimationSettingsProvider value={animationSettingsContextValue}>
        <FormFieldProvider value={formFieldContextValue}>
          <View
            ref={ref}
            className={rootClassName}
            style={[inputGroupStyleSheet.borderCurve, style]}
            {...restProps}
          >
            {children}
          </View>
        </FormFieldProvider>
      </AnimationSettingsProvider>
    </InputGroupProvider>
  );
});

// --------------------------------------------------

const InputGroupAddon = forwardRef<ViewRef, InputGroupAddonProps>(
  (props, ref) => {
    const { children, className, ...restProps } = props;

    const addonClassName = inputGroupClassNames.addon({ className });

    return (
      <View ref={ref} className={addonClassName} {...restProps}>
        {children}
      </View>
    );
  }
);

// --------------------------------------------------

const InputGroupInput = forwardRef<TextInputType, InputGroupInputProps>(
  (props, ref) => {
    const {
      isDisabled: localIsDisabled,
      className,
      onFocus: onFocusProp,
      onBlur: onBlurProp,
      ...restProps
    } = props;

    const inputGroup = useInputGroup();

    const isDisabled = localIsDisabled ?? inputGroup?.isDisabled ?? false;

    const onFocus = useCallback(
      (e: Parameters<NonNullable<InputGroupInputProps['onFocus']>>[0]) => {
        inputGroup?.setIsFocused(true);
        onFocusProp?.(e);
      },
      [inputGroup, onFocusProp]
    );

    const onBlur = useCallback(
      (e: Parameters<NonNullable<InputGroupInputProps['onBlur']>>[0]) => {
        inputGroup?.setIsFocused(false);
        onBlurProp?.(e);
      },
      [inputGroup, onBlurProp]
    );

    const inputClassName = inputGroupClassNames.input({ className });

    return (
      <Input
        ref={ref}
        {...restProps}
        className={inputClassName}
        value={inputGroup?.value}
        onChangeText={inputGroup?.onChange}
        isDisabled={false}
        editable={!isDisabled}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    );
  }
);

// --------------------------------------------------

InputGroupRoot.displayName = DISPLAY_NAME.INPUT_GROUP;
InputGroupAddon.displayName = DISPLAY_NAME.INPUT_GROUP_ADDON;
InputGroupInput.displayName = DISPLAY_NAME.INPUT_GROUP_INPUT;

/**
 * Compound InputGroup component with sub-components.
 *
 * @component InputGroup - Root container that accepts `value`, `onChange`,
 * `isDisabled`, `isInvalid`, and `isRequired`, providing them to children via
 * context. Owns the visual shell (border, background, rounded corners) and
 * tracks focus state for the focus border. Also provides FormFieldProvider
 * and animation settings.
 *
 * @component InputGroup.Addon - Plain flex View for leading or trailing
 * content (icons, labels, buttons). Naturally sized as a flex sibling — no
 * absolute positioning required.
 *
 * @component InputGroup.Input - Wraps the Input component with shell-stripping
 * overrides so the root owns the visual shell. Reads `value` and `onChangeText`
 * from InputGroupContext automatically. Reports focus/blur state back to the
 * root to drive the focus border.
 *
 * @see Full documentation: https://v3.heroui.com/docs/native/components/input-group
 */
const CompoundInputGroup = Object.assign(InputGroupRoot, {
  /** Plain flex View for leading or trailing addon content */
  Addon: InputGroupAddon,
  /** Text input that reads value/onChange from context */
  Input: InputGroupInput,
});

export { useInputGroup };
export default CompoundInputGroup;
