import { forwardRef, useMemo } from 'react';
import { View } from 'react-native';
import {
  AnimationSettingsProvider,
  FormFieldProvider,
} from '../../helpers/internal/contexts';
import type { ViewRef } from '../../helpers/internal/types';
import { createContext } from '../../helpers/internal/utils';
import { useTextFieldRootAnimation } from './text-field.animation';
import { DISPLAY_NAME } from './text-field.constants';
import { textFieldClassNames } from './text-field.styles';
import type {
  TextFieldContextValue,
  TextFieldRootProps,
} from './text-field.types';

const [TextFieldProvider, useTextField] = createContext<TextFieldContextValue>({
  name: 'TextFieldContext',
  strict: false,
});

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

  const rootClassName = textFieldClassNames.root({ className });

  const { isAllAnimationsDisabled } = useTextFieldRootAnimation({ animation });

  const contextValue = useMemo(
    () => ({ isDisabled, isInvalid, isRequired }),
    [isDisabled, isInvalid, isRequired]
  );

  const formFieldContextValue = useMemo(
    () => ({ isDisabled, isInvalid, isRequired, hasFieldPadding: true }),
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
      <FormFieldProvider value={formFieldContextValue}>
        <TextFieldProvider value={contextValue}>
          <View ref={ref} className={rootClassName} {...restProps}>
            {children}
          </View>
        </TextFieldProvider>
      </FormFieldProvider>
    </AnimationSettingsProvider>
  );
});

// --------------------------------------------------

TextFieldRoot.displayName = DISPLAY_NAME.ROOT;

/**
 * TextField component - Main container that provides gap-1 spacing between children.
 * Handles disabled state and validation state for the entire field.
 *
 * @see Full documentation: https://heroui.com/docs/native/components/text-field
 */
const TextField = TextFieldRoot;

export default TextField;
export { useTextField };
