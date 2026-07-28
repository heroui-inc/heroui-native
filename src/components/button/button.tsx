import { forwardRef, useMemo } from 'react';
import type { PressableStateCallbackType } from 'react-native';
import { useThemeColor } from '../../helpers/external/hooks';
import { colorKit } from '../../helpers/external/utils';
import {
  HeroText,
  ThemeBackground,
  useHasDefaultThemeBackground,
} from '../../helpers/internal/components';
import type {
  PressableRef,
  TextRef,
  ViewRef,
} from '../../helpers/internal/types';
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
  ButtonBackgroundProps,
  ButtonContextValue,
  ButtonLabelProps,
  ButtonRootProps,
} from './button.types';
import { isAnimationDisabled, resolveAnimationObject } from './button.utils';

const [ButtonProvider, useButton] = createContext<ButtonContextValue>({
  name: 'ButtonContext',
});

// --------------------------------------------------

/**
 * Generic absolute-fill background container rendered behind the secondary /
 * tertiary variant's button surface. With no `children`, the active library
 * theme decides the default content: `glass` renders a `GlassView` blur
 * layer; other themes render nothing. Pass `children` to host arbitrary
 * content (gradients, images) with the container's positioning and clipping
 * applied.
 */
const ButtonBackground = forwardRef<ViewRef, ButtonBackgroundProps>(
  ({ className, ...props }, ref) => {
    const { size } = useButton();

    const backgroundClassName = buttonClassNames.background({
      size,
      className,
    });

    return (
      <ThemeBackground
        ref={ref}
        className={backgroundClassName}
        fallbackColor="default"
        {...props}
      />
    );
  }
);

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
    background,
    accessibilityRole = 'button',
    ...restProps
  } = props;

  const hasDefaultThemeBackground = useHasDefaultThemeBackground();

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
      // Themes with default background content (e.g. glass) render a
      // translucent surface, so the hover overlay uses a subtler alpha to
      // avoid washing out the blur layer underneath.
      case 'secondary':
        return hasDefaultThemeBackground
          ? colorKit.setAlpha(themeColorDefaultHover, 0.2).hex()
          : themeColorDefaultHover;
      case 'tertiary':
        return hasDefaultThemeBackground
          ? colorKit.setAlpha(themeColorDefaultHover, 0.2).hex()
          : themeColorDefaultHover;
      case 'outline':
        return colorKit
          .setAlpha(
            themeColorDefaultHover,
            hasDefaultThemeBackground ? 0.05 : 0.3
          )
          .hex();
      case 'ghost':
        return colorKit
          .setAlpha(
            themeColorDefaultHover,
            hasDefaultThemeBackground ? 0.05 : 0.3
          )
          .hex();
      case 'danger':
        return themeColorDangerHover;
      case 'danger-soft':
        return themeColorDangerSoftHover;
    }
  }, [
    variant,
    hasDefaultThemeBackground,
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

  /**
   * Background layer rendered behind the button surface.
   * - `undefined`: theme-aware default for the secondary / tertiary variants
   *   when the active theme registers default background content
   * - custom node: replaces the default layer
   * - `null`: removes the layer
   */
  const backgroundElement =
    background !== undefined ? (
      background
    ) : hasDefaultThemeBackground &&
      (variant === 'secondary' || variant === 'tertiary') ? (
      <ButtonBackground />
    ) : null;

  return (
    <ButtonProvider value={contextValue}>
      <PressableFeedback
        ref={ref}
        isDisabled={isDisabled}
        className={rootClassName}
        style={
          typeof style === 'function'
            ? (state: PressableStateCallbackType) => [
                buttonStyleSheet.buttonRoot,
                style(state),
              ]
            : [buttonStyleSheet.buttonRoot, style]
        }
        accessibilityRole={accessibilityRole}
        accessibilityState={{ disabled: isDisabled }}
        animation={rootAnimation}
        {...restProps}
      >
        {backgroundElement}
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
ButtonBackground.displayName = DISPLAY_NAME.BUTTON_BACKGROUND;

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
 * @component Button.Background - Absolute-fill background container behind the
 * secondary / tertiary variant's button surface. With no children, the active
 * library theme decides the default content (e.g. a glass blur layer);
 * pass children to host custom content with the same positioning and clipping.
 *
 * Props flow from Button to sub-components via context (size, variant, isDisabled).
 *
 * @see Full documentation: https://heroui.com/docs/native/components/button
 */
const CompoundButton = Object.assign(ButtonRoot, {
  /** Button label - renders text or custom content */
  Label: ButtonLabel,
  /** Button background - absolute-fill container behind the button surface */
  Background: ButtonBackground,
});

export { useButton };
export default CompoundButton;
