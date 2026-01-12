import { forwardRef, useMemo } from 'react';
import { HeroText } from '../../helpers/components';
import { AnimationSettingsProvider } from '../../helpers/contexts/animation-settings-context';
import type { PressableRef, TextRef } from '../../helpers/types/primitives';
import { childrenToString, createContext } from '../../helpers/utils';
import * as LabelPrimitives from '../../primitives/label';
import { useLabelRootAnimation } from './label.animation';
import { DISPLAY_NAME } from './label.constants';
import labelStyles from './label.styles';
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
    isDisabled = false,
    isRequired = false,
    isInvalid = false,
    className,
    animation,
    ...restProps
  } = props;

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

  const rootTvStyles = labelStyles.root({
    isDisabled,
    className,
  });

  return (
    <AnimationSettingsProvider value={animationSettingsContextValue}>
      <LabelProvider value={contextValue}>
        <LabelPrimitives.Root
          ref={ref}
          isDisabled={isDisabled}
          className={rootTvStyles}
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
  const { children, className, classNames, styles, ...restProps } = props;

  const { isDisabled, isRequired, isInvalid } = useLabel();

  const tvStyles = labelStyles.label({
    isDisabled,
    isInvalid,
  });

  const textStyles = tvStyles.text({
    className: [className, classNames?.text],
  });

  const asteriskStyles = tvStyles.asterisk({
    className: classNames?.asterisk,
  });

  return (
    <HeroText
      ref={ref}
      className={textStyles}
      style={styles?.text}
      {...restProps}
    >
      {children}
      {isRequired && (
        <HeroText className={asteriskStyles} style={styles?.asterisk}>
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
 * @see Full documentation: https://heroui.com/components/label
 */
const CompoundLabel = Object.assign(Label, {
  /** Label text - renders text or custom content with optional asterisk */
  Text: LabelText,
});

export { useLabel };
export default CompoundLabel;
