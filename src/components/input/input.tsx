import { forwardRef } from 'react';
import { TextInput, type TextInput as TextInputType } from 'react-native';
import { useIsOnSurface } from '../../helpers/external/hooks';
import { useFormItemState } from '../../helpers/internal/contexts';
import { DISPLAY_NAME } from './input.constants';
import inputStyles, { styleSheet } from './input.styles';
import type { InputProps } from './input.types';

// --------------------------------------------------

const InputRoot = forwardRef<TextInputType, InputProps>((props, ref) => {
  const {
    isInvalid: localIsInvalid,
    isDisabled: localIsDisabled,
    variant,
    className,
    style,
    selectionColorClassName: selectionColorClassNameProp,
    placeholderColorClassName: placeholderColorClassNameProp,
    ...restProps
  } = props;
  const formItemState = useFormItemState();

  const isInvalid =
    localIsInvalid !== undefined
      ? localIsInvalid
      : (formItemState?.isInvalid ?? false);

  const isDisabled =
    localIsDisabled !== undefined
      ? localIsDisabled
      : (formItemState?.isDisabled ?? false);

  const isOnSurfaceAutoDetected = useIsOnSurface();
  const finalVariant =
    variant !== undefined
      ? variant
      : isOnSurfaceAutoDetected
        ? 'secondary'
        : 'primary';

  const inputClassName = inputStyles.input({
    variant: finalVariant,
    isInvalid,
    isDisabled,
    className,
  });

  const placeholderColorClassName = inputStyles.placeholderTextColor({
    className: placeholderColorClassNameProp,
  });

  const selectionColorClassName = inputStyles.inputSelectionColor({
    isInvalid,
    className: selectionColorClassNameProp,
  });

  return (
    <TextInput
      ref={ref}
      className={inputClassName}
      style={[styleSheet.borderCurve, style]}
      placeholderTextColorClassName={placeholderColorClassName}
      selectionColorClassName={selectionColorClassName}
      editable={!isDisabled}
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
