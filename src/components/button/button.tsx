import { forwardRef, useMemo } from 'react';
import { View } from 'react-native';
import { Text } from '../../helpers/components';
import { colorKit, useThemeColor } from '../../helpers/theme';
import type { PressableRef } from '../../helpers/types';
import { childrenToString, createContext } from '../../helpers/utils';
import { PressableFeedback } from '../pressable-feedback';
import { DISPLAY_NAME } from './button.constants';
import buttonStyles, { styleSheet } from './button.styles';
import type {
  ButtonContextValue,
  ButtonLabelProps,
  ButtonRootProps,
} from './button.types';

const [ButtonProvider, useButtonContext] = createContext<ButtonContextValue>({
  name: 'ButtonContext',
});

// --------------------------------------------------

const ButtonRoot = forwardRef<PressableRef, ButtonRootProps>((props, ref) => {
  const {
    children,
    variant = 'primary',
    feedbackVariant = 'highlight',
    feedbackPosition = 'behind',
    size = 'md',
    isIconOnly = false,
    isDisabled = false,
    className,
    style,
    animation,
    accessibilityRole = 'button',
    ...restProps
  } = props;

  const themeColorAccentHover = useThemeColor('accent-hover');
  const themeColorDefaultHover = useThemeColor('default-hover');
  const themeColorDangerHover = useThemeColor('danger-hover');

  const stringifiedChildren = childrenToString(children);

  const tvStyles = buttonStyles.root({
    variant,
    size,
    isIconOnly,
    isDisabled,
    className,
  });

  const highlightColorMap = useMemo(() => {
    switch (variant) {
      case 'primary':
        return themeColorAccentHover;
      case 'secondary':
        return themeColorDefaultHover;
      case 'tertiary':
        return themeColorDefaultHover;
      case 'ghost':
        return colorKit.setAlpha(themeColorDefaultHover, 0.3).hex();
      case 'destructive':
        return themeColorDangerHover;
      case 'destructive-soft':
        return themeColorDefaultHover;
    }
  }, [
    variant,
    themeColorAccentHover,
    themeColorDefaultHover,
    themeColorDangerHover,
  ]);

  const animationConfig = useMemo(() => {
    // If animation is explicitly provided, use it
    if (animation !== undefined) {
      return animation;
    }

    // Default animation configuration for highlight variant
    if (feedbackVariant === 'highlight') {
      return {
        highlight: {
          backgroundColor: {
            value: highlightColorMap,
          },
          opacity: {
            value: [0, 1] as [number, number],
          },
        },
      };
    }

    // Default animation configuration for ripple variant
    if (feedbackVariant === 'ripple') {
      return {
        ripple: {
          backgroundColor: { value: highlightColorMap },
        },
      };
    }

    return undefined;
  }, [animation, feedbackVariant, highlightColorMap]);

  const contextValue = useMemo(
    () => ({
      size,
      variant,
      isDisabled,
    }),
    [size, variant, isDisabled]
  );

  return (
    <ButtonProvider value={contextValue}>
      <PressableFeedback
        ref={ref}
        feedbackVariant={feedbackVariant}
        feedbackPosition={feedbackPosition}
        className={tvStyles}
        style={[styleSheet.buttonRoot, style]}
        isDisabled={isDisabled}
        accessibilityRole={accessibilityRole}
        accessibilityState={{ disabled: isDisabled }}
        animation={animationConfig}
        {...restProps}
      >
        {stringifiedChildren ? (
          <ButtonLabel>{stringifiedChildren}</ButtonLabel>
        ) : (
          children
        )}
      </PressableFeedback>
    </ButtonProvider>
  );
});

// --------------------------------------------------

const ButtonLabel = forwardRef<View, ButtonLabelProps>((props, ref) => {
  const { children, className, ...restProps } = props;

  const { size, variant } = useButtonContext();

  const tvStyles = buttonStyles.label({
    size,
    variant,
    className,
  });

  return (
    <Text ref={ref} className={tvStyles} {...restProps}>
      {children}
    </Text>
  );
});

// --------------------------------------------------

ButtonRoot.displayName = DISPLAY_NAME.BUTTON_ROOT;
ButtonLabel.displayName = DISPLAY_NAME.BUTTON_LABEL;

/**
 * Compound Button component with sub-components
 *
 * @component Button - Main button container that handles press interactions, animations, and variants.
 * Renders with string children as label or accepts compound components for custom layouts.
 *
 * @component Button.Label - Text content of the button. When string is provided,
 * it renders as Text. Otherwise renders children as-is.
 *
 * Props flow from Button to sub-components via context (size, variant, isDisabled).
 * All components use animated views with layout transitions for smooth animations.
 *
 * @see Full documentation: https://heroui.com/components/button
 */
const CompoundButton = Object.assign(ButtonRoot, {
  /** Button label - renders text or custom content */
  Label: ButtonLabel,
});

export { useButtonContext };
export default CompoundButton;
