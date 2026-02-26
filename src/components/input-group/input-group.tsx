import { forwardRef, useMemo } from 'react';
import { type TextInput as TextInputType, View } from 'react-native';
import { AnimationSettingsProvider } from '../../helpers/internal/contexts';
import type { ViewRef } from '../../helpers/internal/types';
import { Input } from '../input';
import { useInputGroupRootAnimation } from './input-group.animation';
import { DISPLAY_NAME } from './input-group.constants';
import { inputGroupClassNames } from './input-group.styles';
import type {
  InputGroupInputProps,
  InputGroupPrefixProps,
  InputGroupProps,
  InputGroupSuffixProps,
} from './input-group.types';

// --------------------------------------------------

const InputGroupRoot = forwardRef<ViewRef, InputGroupProps>((props, ref) => {
  const { children, animation, ...restProps } = props;

  const { isAllAnimationsDisabled } = useInputGroupRootAnimation({ animation });

  const animationSettingsContextValue = useMemo(
    () => ({ isAllAnimationsDisabled }),
    [isAllAnimationsDisabled]
  );

  return (
    <AnimationSettingsProvider value={animationSettingsContextValue}>
      <View ref={ref} {...restProps}>
        {children}
      </View>
    </AnimationSettingsProvider>
  );
});

// --------------------------------------------------

const InputGroupPrefix = forwardRef<ViewRef, InputGroupPrefixProps>(
  (props, ref) => {
    const { children, className, isDecorative = false, ...restProps } = props;

    const prefixClassName = inputGroupClassNames.prefix({ className });

    return (
      <View
        ref={ref}
        className={prefixClassName}
        pointerEvents={isDecorative ? 'none' : undefined}
        accessibilityElementsHidden={isDecorative || undefined}
        importantForAccessibility={
          isDecorative ? 'no-hide-descendants' : undefined
        }
        {...restProps}
      >
        {children}
      </View>
    );
  }
);

// --------------------------------------------------

const InputGroupSuffix = forwardRef<ViewRef, InputGroupSuffixProps>(
  (props, ref) => {
    const { children, className, isDecorative = false, ...restProps } = props;

    const suffixClassName = inputGroupClassNames.suffix({ className });

    return (
      <View
        ref={ref}
        className={suffixClassName}
        pointerEvents={isDecorative ? 'none' : undefined}
        accessibilityElementsHidden={isDecorative || undefined}
        importantForAccessibility={
          isDecorative ? 'no-hide-descendants' : undefined
        }
        {...restProps}
      >
        {children}
      </View>
    );
  }
);

// --------------------------------------------------

const InputGroupInput = forwardRef<TextInputType, InputGroupInputProps>(
  (props, ref) => {
    return <Input ref={ref} {...props} />;
  }
);

// --------------------------------------------------

InputGroupRoot.displayName = DISPLAY_NAME.INPUT_GROUP;
InputGroupPrefix.displayName = DISPLAY_NAME.INPUT_GROUP_PREFIX;
InputGroupSuffix.displayName = DISPLAY_NAME.INPUT_GROUP_SUFFIX;
InputGroupInput.displayName = DISPLAY_NAME.INPUT_GROUP_INPUT;

/**
 * Compound InputGroup component with sub-components.
 *
 * @component InputGroup - Layout container (`flex-row items-center`) that
 * wraps Prefix, Input, and Suffix. Provides animation settings to children.
 * Does not own any visual shell — the Input retains its own styles.
 *
 * @component InputGroup.Prefix - Absolutely positioned View anchored to
 * the left side of the Input. Use for leading content such as icons,
 * labels, or interactive controls. Set `isDecorative` to make touches
 * pass through to the Input and hide from accessibility.
 *
 * @component InputGroup.Suffix - Absolutely positioned View anchored to
 * the right side of the Input. Use for trailing content such as icons,
 * labels, or interactive controls. Set `isDecorative` to make touches
 * pass through to the Input and hide from accessibility.
 *
 * @component InputGroup.Input - Pass-through to the Input component.
 * Accepts all Input props directly (value, onChangeText, isDisabled, etc.).
 *
 * @see Full documentation: https://v3.heroui.com/docs/native/components/input-group
 */
const CompoundInputGroup = Object.assign(InputGroupRoot, {
  /** Absolutely positioned View for leading prefix content */
  Prefix: InputGroupPrefix,
  /** Absolutely positioned View for trailing suffix content */
  Suffix: InputGroupSuffix,
  /** Pass-through to Input — accepts all Input props directly */
  Input: InputGroupInput,
});

export default CompoundInputGroup;
