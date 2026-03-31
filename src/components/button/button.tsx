import { forwardRef, useMemo } from 'react';
import { useThemeColor } from '../../helpers/external/hooks';
import { colorKit } from '../../helpers/external/utils';
import { HeroText } from '../../helpers/internal/components';
import type { PressableRef, TextRef } from '../../helpers/internal/types';
import { childrenToString, createContext } from '../../helpers/internal/utils';
import {
  PressableFeedback,
  type PressableFeedbackHighlightAnimation,
  type PressableFeedbackRippleAnimation,
  type PressableFeedbackScaleAnimation,
} from '../pressable-feedback';
import { DISPLAY_NAME } from './button.constants';
import { buttonClassNames, buttonStyleSheet } from './button.styles';
import type {
  ButtonContextValue,
  ButtonLabelProps,
  ButtonRootProps,
} from './button.types';
import { isAnimationDisabled, resolveAnimationObject } from './button.utils';

const [ButtonProvider, useButton] = createContext<ButtonContextValue>({
  name: 'ButtonContext',
});

// --------------------------------------------------

const ButtonRoot = forwardRef<PressableRef, ButtonRootProps>((props, ref) => {
  const {
    children,
    variant = 'primary',
    feedbackVariant = 'scale-highlight',
    animation,
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

  const resolvedAnimation = resolveAnimationObject(animation);
  const allAnimationsDisabled = isAnimationDisabled(animation);

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
    if (feedbackVariant !== 'scale-highlight') {
      return undefined;
    }

    const highlightAnimation = resolvedAnimation?.highlight as
      | PressableFeedbackHighlightAnimation
      | undefined;

    if (highlightAnimation === false || highlightAnimation === 'disabled') {
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

    if (typeof highlightAnimation === 'object' && highlightAnimation !== null) {
      return {
        backgroundColor: {
          ...defaultConfig.backgroundColor,
          ...(highlightAnimation.backgroundColor ?? {}),
        },
        opacity: {
          ...defaultConfig.opacity,
          ...(highlightAnimation.opacity ?? {}),
        },
      };
    }

    return defaultConfig;
  }, [feedbackVariant, highlightColorMap, resolvedAnimation?.highlight]);

  const rippleAnimationConfig = useMemo(() => {
    if (feedbackVariant !== 'scale-ripple') {
      return undefined;
    }

    const rippleAnimation = resolvedAnimation?.ripple as
      | PressableFeedbackRippleAnimation
      | undefined;

    if (rippleAnimation === false || rippleAnimation === 'disabled') {
      return undefined;
    }

    const defaultConfig = {
      backgroundColor: { value: highlightColorMap },
      opacity: { value: [0, 1, 0] as [number, number, number] },
    };

    if (typeof rippleAnimation === 'object' && rippleAnimation !== null) {
      return {
        backgroundColor: {
          ...defaultConfig.backgroundColor,
          ...(rippleAnimation.backgroundColor ?? {}),
        },
        opacity: {
          ...defaultConfig.opacity,
          ...(rippleAnimation.opacity ?? {}),
        },
        ...(rippleAnimation.scale !== undefined && {
          scale: rippleAnimation.scale,
        }),
        ...(rippleAnimation.progress !== undefined && {
          progress: rippleAnimation.progress,
        }),
      };
    }

    return defaultConfig;
  }, [feedbackVariant, highlightColorMap, resolvedAnimation?.ripple]);

  const scaleAnimation = resolvedAnimation?.scale as
    | PressableFeedbackScaleAnimation
    | undefined;

  const rootAnimation = useMemo(() => {
    if (allAnimationsDisabled) {
      return 'disable-all' as const;
    }
    if (feedbackVariant === 'none') {
      return false as const;
    }
    if (scaleAnimation === false || scaleAnimation === 'disabled') {
      return false as const;
    }
    if (typeof scaleAnimation === 'object' && scaleAnimation !== null) {
      return { scale: scaleAnimation };
    }
    return undefined;
  }, [allAnimationsDisabled, feedbackVariant, scaleAnimation]);

  const contextValue = useMemo(
    () => ({
      size,
      variant,
      isDisabled,
    }),
    [size, variant, isDisabled]
  );

  const content = stringifiedChildren ? (
    <ButtonLabel>{stringifiedChildren}</ButtonLabel>
  ) : (
    children
  );

  return (
    <ButtonProvider value={contextValue}>
      <PressableFeedback
        ref={ref}
        isDisabled={isDisabled}
        className={rootClassName}
        style={
          typeof style === 'function'
            ? (state) => [buttonStyleSheet.buttonRoot, style(state)]
            : [buttonStyleSheet.buttonRoot, style]
        }
        accessibilityRole={accessibilityRole}
        accessibilityState={{ disabled: isDisabled }}
        animation={rootAnimation}
        {...restProps}
      >
        {feedbackVariant === 'scale-highlight' &&
          highlightAnimationConfig !== undefined && (
            <PressableFeedback.Highlight animation={highlightAnimationConfig} />
          )}
        {feedbackVariant === 'scale-ripple' &&
          rippleAnimationConfig !== undefined && (
            <PressableFeedback.Ripple animation={rippleAnimationConfig} />
          )}
        {content}
      </PressableFeedback>
    </ButtonProvider>
  );
});

// --------------------------------------------------

const ButtonLabel = forwardRef<TextRef, ButtonLabelProps>((props, ref) => {
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
 * Compound Button component with sub-components.
 *
 * @component Button - Main button container wrapping `PressableFeedback`. Handles press
 * interactions, visual variants, and feedback animations. The `feedbackVariant` prop controls
 * which effects are rendered (`scale-highlight`, `scale-ripple`, `scale`, or `none`), while the
 * `animation` prop provides granular control over each sub-animation (scale, highlight, ripple).
 * String children are automatically rendered as a label.
 *
 * @component Button.Label - Text content of the button. Inherits size and variant styling
 * from the parent Button context.
 *
 * Props flow from Button to sub-components via context (size, variant, isDisabled).
 *
 * @see Full documentation: https://heroui.com/docs/native/components/button
 */
const CompoundButton = Object.assign(ButtonRoot, {
  /** Button label - renders text or custom content */
  Label: ButtonLabel,
});

export { useButton };
export default CompoundButton;
