import { forwardRef } from 'react';
import { TextInput, type TextInput as TextInputType } from 'react-native';
import { useIsOnSurface } from '../../helpers/external/hooks';
import { useFormField } from '../../helpers/internal/contexts';
import { useBottomSheetAwareHandlers } from '../../helpers/internal/hooks';
import { DISPLAY_NAME } from './input.constants';
import { inputClassNames, inputStyleSheet } from './input.styles';
import type { InputProps } from './input.types';

// --------------------------------------------------

const InputRoot = forwardRef<TextInputType, InputProps>((props, ref) => {
  const {
    isInvalid: localIsInvalid,
    isDisabled: localIsDisabled,
    isBottomSheetAware,
    variant,
    className,
    style,
    selectionColorClassName: selectionColorClassNameProp,
    placeholderColorClassName: placeholderColorClassNameProp,
    onFocus: onFocusProp,
    onBlur: onBlurProp,
    ...restProps
  } = props;
  const formField = useFormField();

  const isInvalid =
    localIsInvalid !== undefined
      ? localIsInvalid
      : (formField?.isInvalid ?? false);

  const isDisabled =
    localIsDisabled !== undefined
      ? localIsDisabled
      : (formField?.isDisabled ?? false);

  const isOnSurfaceAutoDetected = useIsOnSurface();
  const finalVariant =
    variant !== undefined
      ? variant
      : isOnSurfaceAutoDetected
        ? 'secondary'
        : 'primary';

  /** Merge user-provided onFocus/onBlur with bottom sheet keyboard handlers */
  const { onFocus, onBlur } = useBottomSheetAwareHandlers({
    onFocus: onFocusProp,
    onBlur: onBlurProp,
    isBottomSheetAware,
  });

  const inputClassName = inputClassNames.input({
    variant: finalVariant,
    isInvalid,
    isDisabled,
    className,
  });

  const placeholderColorClassName = inputClassNames.placeholderTextColor({
    className: placeholderColorClassNameProp,
  });

  const selectionColorClassName = inputClassNames.inputSelectionColor({
    isInvalid,
    className: selectionColorClassNameProp,
  });

  return (
    <TextInput
      ref={ref}
      className={inputClassName}
      style={[inputStyleSheet.borderCurve, style]}
      placeholderTextColorClassName={placeholderColorClassName}
      selectionColorClassName={selectionColorClassName}
      editable={!isDisabled}
      onFocus={onFocus}
      onBlur={onBlur}
      {...restProps}
    />
  );
});

// --------------------------------------------------

InputRoot.displayName = DISPLAY_NAME.INPUT;

/**
 * Input component - A text input component with styled border and background for collecting user input.
 * Supports primary and secondary variants, and integrates with form item state context.
 *
 * @see Full documentation: https://v3.heroui.com/docs/native/components/input
 */
const Input = InputRoot;

export default Input;
