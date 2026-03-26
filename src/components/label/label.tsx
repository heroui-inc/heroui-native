import { forwardRef, useMemo } from 'react';
import { HeroText } from '../../helpers/internal/components';
import {
  AnimationSettingsProvider,
  useFormField,
} from '../../helpers/internal/contexts';
import type { PressableRef, TextRef } from '../../helpers/internal/types';
import { childrenToString, createContext } from '../../helpers/internal/utils';
import * as LabelPrimitives from '../../primitives/label';
import { useControlField } from '../control-field/control-field.context';
import { useRadioGroupItem } from '../radio-group/radio-group.context';
import { useLabelRootAnimation } from './label.animation';
import { DISPLAY_NAME } from './label.constants';
import { labelClassNames } from './label.styles';
import type {
  LabelContextValue,
  LabelProps,
  LabelTextProps,
} from './label.types';

const [LabelProvider, useLabel] = createContext<LabelContextValue>({
  name: 'LabelContext',
});

// --------------------------------------------------

const Label = forwardRef<PressableRef, LabelProps>((props, ref) => {
  const {
    children,
    isDisabled: localIsDisabled,
    isRequired: localIsRequired,
    isInvalid: localIsInvalid,
    className,
    animation,
    ...restProps
  } = props;

  const formField = useFormField();
  const controlFieldContext = useControlField();
  const radioGroupItemContext = useRadioGroupItem();

  const isInsideField = formField?.hasFieldPadding ?? false;
  const isInsideControlField =
    Boolean(controlFieldContext) || Boolean(radioGroupItemContext);

  // Merge form field state with local props (local takes precedence)
  const isDisabled =
    localIsDisabled !== undefined
      ? localIsDisabled
      : (formField?.isDisabled ?? false);
  const isRequired =
    localIsRequired !== undefined
      ? localIsRequired
      : (formField?.isRequired ?? false);
  const isInvalid =
    localIsInvalid !== undefined
      ? localIsInvalid
      : (formField?.isInvalid ?? false);

  const stringifiedChildren = childrenToString(children);

  const { isAllAnimationsDisabled } = useLabelRootAnimation({
    animation,
  });

  const animationSettingsContextValue = useMemo(
    () => ({
      isAllAnimationsDisabled,
    }),
    [isAllAnimationsDisabled]
  );

  const contextValue = useMemo(
    () => ({
      isDisabled,
      isRequired,
      isInvalid,
    }),
    [isDisabled, isRequired, isInvalid]
  );

  const rootClassName = labelClassNames.root({
    isDisabled,
    isInsideField,
    isInsideControlField,
    className,
  });

  return (
    <AnimationSettingsProvider value={animationSettingsContextValue}>
      <LabelProvider value={contextValue}>
        <LabelPrimitives.Root
          ref={ref}
          isDisabled={isDisabled}
          className={rootClassName}
          {...restProps}
        >
          {stringifiedChildren ? (
            <LabelText>{stringifiedChildren}</LabelText>
          ) : (
            children
          )}
        </LabelPrimitives.Root>
      </LabelProvider>
    </AnimationSettingsProvider>
  );
});

// --------------------------------------------------

const LabelText = forwardRef<TextRef, LabelTextProps>((props, ref) => {
  const { children, className, classNames, styles, style, ...restProps } =
    props;

  const { isDisabled, isRequired, isInvalid } = useLabel();

  const { text, asterisk } = labelClassNames.label({
    isDisabled,
    isInvalid,
  });

  const textClassName = text({
    className: [className, classNames?.text],
  });

  const asteriskClassName = asterisk({
    className: classNames?.asterisk,
  });

  return (
    <HeroText
      ref={ref}
      className={textClassName}
      style={[style, styles?.text]}
      {...restProps}
    >
      {children}
      {isRequired && (
        <HeroText className={asteriskClassName} style={styles?.asterisk}>
          {' '}
          *
        </HeroText>
      )}
    </HeroText>
  );
});

// --------------------------------------------------

Label.displayName = DISPLAY_NAME.LABEL_ROOT;
LabelText.displayName = DISPLAY_NAME.LABEL_TEXT;

/**
 * Compound Label component with sub-components
 *
 * @component Label - Main container that displays a label. Renders with
 * string children as Label.Text or accepts compound components for custom layouts.
 *
 * @component Label.Text - Text content of the label. When string is provided,
 * it renders as Text. Otherwise renders children as-is. Shows asterisk when required.
 *
 * Props flow from Label to sub-components via context (isDisabled, isRequired, isInvalid).
 *
 * @see Full documentation: https://heroui.com/docs/native/components/label
 */
const CompoundLabel = Object.assign(Label, {
  /** Label text - renders text or custom content with optional asterisk */
  Text: LabelText,
});

export { useLabel };
export default CompoundLabel;
