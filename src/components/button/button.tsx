import { forwardRef, useMemo } from 'react';
import { View } from 'react-native';
import { useThemeColor } from '../../helpers/external/hooks';
import { colorKit } from '../../helpers/external/utils';
import { HeroText } from '../../helpers/internal/components';
import type { PressableRef } from '../../helpers/internal/types';
import { childrenToString, createContext } from '../../helpers/internal/utils';
import { PressableFeedback } from '../pressable-feedback';
import { DISPLAY_NAME } from './button.constants';
import { buttonClassNames, buttonStyleSheet } from './button.styles';
import type {
  ButtonContextValue,
  ButtonLabelProps,
  ButtonRootProps,
} from './button.types';

const [ButtonProvider, useButton] = createContext<ButtonContextValue>({
  name: 'ButtonContext',
});

// --------------------------------------------------

const ButtonRoot = forwardRef<PressableRef, ButtonRootProps>((props, ref) => {
  const {
    children,
    variant = 'primary',
    pressableFeedbackVariant = 'highlight',
    pressableFeedbackHighlightProps,
    pressableFeedbackRippleProps,
    size = 'md',
    isIconOnly = false,
    isDisabled = false,
    className,
    style,
    accessibilityRole = 'button',
    ...restProps
  } = props;

  const [
    themeColorAccentHover,
    themeColorDefaultHover,
    themeColorDangerHover,
    themeColorDangerSoftHover,
  ] = useThemeColor([
    'accent-hover',
    'default-hover',
    'danger-hover',
    'danger-soft-hover',
  ]);

  const stringifiedChildren = childrenToString(children);

  const rootClassName = buttonClassNames.root({
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
      case 'outline':
        return colorKit.setAlpha(themeColorDefaultHover, 0.3).hex();
      case 'ghost':
        return colorKit.setAlpha(themeColorDefaultHover, 0.3).hex();
      case 'danger':
        return themeColorDangerHover;
      case 'danger-soft':
        return themeColorDangerSoftHover;
    }
  }, [
    variant,
    themeColorAccentHover,
    themeColorDefaultHover,
    themeColorDangerHover,
    themeColorDangerSoftHover,
  ]);

  const highlightAnimationConfig = useMemo(() => {
    if (pressableFeedbackVariant !== 'highlight') {
      return undefined;
    }

    const defaultConfig = {
      backgroundColor: {
        value: highlightColorMap,
      },
      opacity: {
        value: [0, 1] as [number, number],
      },
    };

    // Merge with provided animation if available
    if (
      pressableFeedbackHighlightProps?.animation &&
      typeof pressableFeedbackHighlightProps.animation === 'object'
    ) {
      const providedAnimation = pressableFeedbackHighlightProps.animation;
      return {
        backgroundColor: {
          ...defaultConfig.backgroundColor,
          ...providedAnimation.backgroundColor,
        },
        opacity: {
          ...defaultConfig.opacity,
          ...providedAnimation.opacity,
        },
      };
    }

    return defaultConfig;
  }, [
    pressableFeedbackVariant,
    highlightColorMap,
    pressableFeedbackHighlightProps?.animation,
  ]);

  const rippleAnimationConfig = useMemo(() => {
    if (pressableFeedbackVariant !== 'ripple') {
      return undefined;
    }

    const defaultConfig = {
      backgroundColor: { value: highlightColorMap },
      opacity: { value: [0, 1, 0] as [number, number, number] },
    };

    // Merge with provided animation if available
    if (
      pressableFeedbackRippleProps?.animation &&
      typeof pressableFeedbackRippleProps.animation === 'object'
    ) {
      const providedAnimation = pressableFeedbackRippleProps.animation;
      return {
        backgroundColor: {
          ...defaultConfig.backgroundColor,
          ...providedAnimation.backgroundColor,
        },
        opacity: {
          ...defaultConfig.opacity,
          ...providedAnimation.opacity,
        },
        ...(providedAnimation.scale && { scale: providedAnimation.scale }),
        ...(providedAnimation.progress && {
          progress: providedAnimation.progress,
        }),
      };
    }

    return defaultConfig;
  }, [
    pressableFeedbackVariant,
    highlightColorMap,
    pressableFeedbackRippleProps?.animation,
  ]);

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
        className={rootClassName}
        style={[buttonStyleSheet.buttonRoot, style]}
        isDisabled={isDisabled}
        accessibilityRole={accessibilityRole}
        accessibilityState={{ disabled: isDisabled }}
        {...restProps}
      >
        {pressableFeedbackVariant === 'highlight' && (
          <PressableFeedback.Highlight
            {...pressableFeedbackHighlightProps}
            animation={highlightAnimationConfig}
          />
        )}
        {pressableFeedbackVariant === 'ripple' && (
          <PressableFeedback.Ripple
            {...pressableFeedbackRippleProps}
            animation={rippleAnimationConfig}
          />
        )}
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

  const { size, variant } = useButton();

  const labelClassName = buttonClassNames.label({
    size,
    variant,
    className,
  });

  return (
    <HeroText ref={ref} className={labelClassName} {...restProps}>
      {children}
    </HeroText>
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
 * @see Full documentation: https://v3.heroui.com/docs/native/components/button
 */
const CompoundButton = Object.assign(ButtonRoot, {
  /** Button label - renders text or custom content */
  Label: ButtonLabel,
});

export { useButton };
export default CompoundButton;
