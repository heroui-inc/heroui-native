import { forwardRef, useMemo } from 'react';
import { TextInput, View, type TextInput as TextInputType } from 'react-native';
import Animated from 'react-native-reanimated';
import { useIsOnSurface } from '../../helpers/external/hooks';
import {
  AnimationSettingsProvider,
  FormItemStateProvider,
} from '../../helpers/internal/contexts';
import type { ViewRef } from '../../helpers/internal/types';
import { createContext } from '../../helpers/internal/utils';
import { useTextFieldRootAnimation } from './text-field.animation';
import { DISPLAY_NAME } from './text-field.constants';
import textFieldStyles, { styleSheet } from './text-field.styles';
import type {
  TextFieldContextValue,
  TextFieldInputProps,
  TextFieldRootProps,
} from './text-field.types';

const [TextFieldProvider, useTextField] = createContext<TextFieldContextValue>({
  name: 'TextFieldContext',
  strict: false,
});

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

// --------------------------------------------------

const TextFieldRoot = forwardRef<ViewRef, TextFieldRootProps>((props, ref) => {
  const {
    children,
    className,
    isDisabled = false,
    isInvalid = false,
    isRequired = false,
    animation,
    ...restProps
  } = props;

  const tvStyles = textFieldStyles.root({ className });

  const { isAllAnimationsDisabled } = useTextFieldRootAnimation({ animation });

  const contextValue = useMemo(
    () => ({ isDisabled, isInvalid, isRequired }),
    [isDisabled, isInvalid, isRequired]
  );

  const formItemStateContextValue = useMemo(
    () => ({ isDisabled, isInvalid, isRequired }),
    [isDisabled, isInvalid, isRequired]
  );

  const animationSettingsContextValue = useMemo(
    () => ({
      isAllAnimationsDisabled,
    }),
    [isAllAnimationsDisabled]
  );

  return (
    <AnimationSettingsProvider value={animationSettingsContextValue}>
      <FormItemStateProvider value={formItemStateContextValue}>
        <TextFieldProvider value={contextValue}>
          <View ref={ref} className={tvStyles} {...restProps}>
            {children}
          </View>
        </TextFieldProvider>
      </FormItemStateProvider>
    </AnimationSettingsProvider>
  );
});

// --------------------------------------------------

const TextFieldInput = forwardRef<TextInputType, TextFieldInputProps>(
  (props, ref) => {
    const {
      isInvalid: localIsInvalid,
      variant,
      className,
      style,
      selectionColorClassName: selectionColorClassNameProp,
      placeholderColorClassName: placeholderColorClassNameProp,
      ...restProps
    } = props;
    const { isInvalid: contextIsInvalid } = useTextField();

    const isInvalid =
      localIsInvalid !== undefined ? localIsInvalid : contextIsInvalid;

    const isOnSurfaceAutoDetected = useIsOnSurface();
    const finalVariant =
      variant !== undefined
        ? variant
        : isOnSurfaceAutoDetected
          ? 'secondary'
          : 'primary';

    const inputClassName = textFieldStyles.input({
      variant: finalVariant,
      isInvalid,
      className,
    });

    const placeholderColorClassName = textFieldStyles.placeholderTextColor({
      className: placeholderColorClassNameProp,
    });

    const selectionColorClassName = textFieldStyles.inputSelectionColor({
      isInvalid,
      className: selectionColorClassNameProp,
    });

    return (
      <AnimatedTextInput
        ref={ref}
        className={inputClassName}
        style={[styleSheet.borderCurve, style]}
        placeholderTextColorClassName={placeholderColorClassName}
        selectionColorClassName={selectionColorClassName}
        {...restProps}
      />
    );
  }
);

// --------------------------------------------------

TextFieldRoot.displayName = DISPLAY_NAME.ROOT;
TextFieldInput.displayName = DISPLAY_NAME.INPUT;

/**
 * Compound TextField component with sub-components
 *
 * @component TextField - Main container that provides gap-1 spacing between children.
 * Handles disabled state and validation state for the entire field.
 *
 * @component TextField.Input - Animated input with focus state animations.
 * Border turns danger color when field is invalid.
 *
 * @see Full documentation: https://v3.heroui.com/docs/native/components/text-field
 */
const CompoundTextField = Object.assign(TextFieldRoot, {
  /** @required Animated input with focus animations */
  Input: TextFieldInput,
});

export default CompoundTextField;
export { useTextField };
