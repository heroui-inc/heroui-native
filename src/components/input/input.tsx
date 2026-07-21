import { forwardRef } from 'react';
import { View, type TextInput as TextInputType } from 'react-native';
import { useIsOnSurface } from '../../helpers/external/hooks';
import {
  HeroTextInput,
  ThemeBackground,
} from '../../helpers/internal/components';
import { useFormField } from '../../helpers/internal/contexts';
import { DISPLAY_NAME } from './input.constants';
import { inputClassNames, inputStyleSheet } from './input.styles';
import type { InputBackgroundProps, InputProps } from './input.types';

// --------------------------------------------------

/**
 * Generic absolute-fill background container rendered behind the text
 * input. With no `children`, the active library theme decides the default
 * content: `glass` renders a `GlassView` blur layer; other themes render
 * nothing. Pass `children` to host arbitrary content (gradients, images)
 * with the container's positioning and clipping applied.
 */
const InputBackground = forwardRef<View, InputBackgroundProps>(
  ({ className, ...props }, ref) => {
    const backgroundClassName = inputClassNames.background({ className });

    return (
      <ThemeBackground ref={ref} className={backgroundClassName} {...props} />
    );
  }
);

// --------------------------------------------------

const InputRoot = forwardRef<TextInputType, InputProps>((props, ref) => {
  const {
    isInvalid: localIsInvalid,
    isDisabled: localIsDisabled,
    variant,
    className,
    containerClassName: containerClassNameProp,
    background,
    style,
    selectionColorClassName: selectionColorClassNameProp,
    placeholderColorClassName: placeholderColorClassNameProp,
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

  const containerClassName = inputClassNames.container({
    className: containerClassNameProp,
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

  /**
   * Background layer rendered behind the text input. `undefined` falls back
   * to the theme-aware default (primary/field variant only — the secondary
   * variant sits on a surface and renders no layer); `null` removes it.
   */
  const backgroundElement =
    background === undefined
      ? finalVariant === 'primary' && <InputBackground />
      : background;

  return (
    <View className={containerClassName}>
      {backgroundElement}
      <HeroTextInput
        ref={ref}
        className={inputClassName}
        style={[inputStyleSheet.borderCurve, style]}
        placeholderTextColorClassName={placeholderColorClassName}
        selectionColorClassName={selectionColorClassName}
        editable={!isDisabled}
        {...restProps}
      />
    </View>
  );
});

// --------------------------------------------------

InputRoot.displayName = DISPLAY_NAME.INPUT;
InputBackground.displayName = DISPLAY_NAME.BACKGROUND;

/**
 * Input component - A text input component with styled border and background for collecting user input.
 * Supports primary and secondary variants, and integrates with form item state context.
 *
 * The text input is wrapped in a container that hosts a theme-aware
 * background layer behind it (e.g. a frosted-glass blur when the glass
 * theme is active). Replace or remove the layer via the `background` prop;
 * style the container via `containerClassName`.
 *
 * @component Input.Background - Absolute-fill background container behind the
 * text input. With no children, the active library theme decides the content
 * (glass theme renders a blur layer). Accepts children to host custom content
 * such as gradients with the container's positioning and clipping applied.
 *
 * @see Full documentation: https://heroui.com/docs/native/components/input
 */
const Input = Object.assign(InputRoot, {
  /** @optional Theme-aware background container behind the text input */
  Background: InputBackground,
});

export default Input;
