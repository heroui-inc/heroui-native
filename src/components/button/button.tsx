import { forwardRef, useCallback, useMemo } from 'react';
import {
  Pressable,
  Text,
  View,
  type GestureResponderEvent,
} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import type { PressableRef } from '../../helpers/types';
import { createContext } from '../../helpers/utils';
import { getElementWithDefault } from '../../helpers/utils/get-element-with-default';
import { useTheme } from '../../theme';
import {
  ANIMATION_DURATION,
  ANIMATION_EASING,
  DEFAULT_LAYOUT_TRANSITION,
  DISPLAY_NAME,
  HIGHLIGHT_CONFIG,
  OPACITY_ALPHA_MAP,
  VARIANT_TO_COLOR_MAP,
} from './button.constants';
import buttonStyles, { nativeStyles } from './button.styles';
import type {
  ButtonBackgroundProps,
  ButtonContextValue,
  ButtonEndContentProps,
  ButtonLabelProps,
  ButtonRootProps,
  ButtonStartContentProps,
} from './button.types';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const [ButtonProvider, useButtonContext] = createContext<ButtonContextValue>({
  name: 'ButtonContext',
});

// --------------------------------------------------

const ButtonRoot = forwardRef<PressableRef, ButtonRootProps>((props, ref) => {
  const {
    children,
    layout = DEFAULT_LAYOUT_TRANSITION,
    variant = 'primary',
    size = 'md',
    isFullWidth = true,
    isIconOnly = false,
    isDisabled = false,
    className,
    style,
    disableAnimation = {
      scale: false,
      highlight: false,
    },
    animationConfig,
    onPressIn,
    onPressOut,
    accessibilityRole = 'button',
    ...restProps
  } = props;

  const startContentElement = useMemo(
    () =>
      getElementWithDefault(
        children,
        DISPLAY_NAME.START_CONTENT,
        <ButtonStartContent />
      ),
    [children]
  );

  const labelElement = useMemo(
    () => getElementWithDefault(children, DISPLAY_NAME.LABEL, <ButtonLabel />),
    [children]
  );

  const endContentElement = useMemo(
    () =>
      getElementWithDefault(
        children,
        DISPLAY_NAME.END_CONTENT,
        <ButtonEndContent />
      ),
    [children]
  );

  const backgroundElement = useMemo(
    () =>
      getElementWithDefault(
        children,
        DISPLAY_NAME.BACKGROUND,
        <ButtonBackground />
      ),
    [children]
  );

  const { isDark, colors } = useTheme();

  const tvStyles = buttonStyles.root({
    variant,
    size,
    isFullWidth,
    isIconOnly,
    isDisabled,
    className,
  });

  const scale = useSharedValue(0);
  const highlightOpacityValue = useSharedValue(0);
  const btnWidth = useSharedValue(0);

  const scaleValue = useMemo(
    () => animationConfig?.scale?.value ?? 0.995,
    [animationConfig]
  );
  const scaleConfig = useMemo(
    () =>
      animationConfig?.scale?.config ?? {
        duration: ANIMATION_DURATION,
        easing: ANIMATION_EASING,
      },
    [animationConfig]
  );

  const animatedContainerStyle = useAnimatedStyle(() => {
    const baseWidth = 300;
    const coefficient = btnWidth.get() > 0 ? baseWidth / btnWidth.get() : 1;
    const adjustedScaleValue = 1 - (1 - scaleValue) * coefficient;

    return {
      transform: [
        {
          scale: interpolate(scale.get(), [0, 1], [1, adjustedScaleValue]),
        },
      ],
    };
  });

  const defaultOpacity = useMemo(() => {
    return OPACITY_ALPHA_MAP[isDark ? 'dark' : 'light'][variant];
  }, [variant, isDark]);

  const finalHighlightOpacity =
    animationConfig?.highlight?.opacity ?? defaultOpacity;

  const highlightColorValue = useMemo(() => {
    if (animationConfig?.highlight?.color)
      return animationConfig?.highlight?.color;
    const colorKey = VARIANT_TO_COLOR_MAP[variant];
    return colors[colorKey];
  }, [animationConfig?.highlight?.color, variant, colors]);

  const animatedBackgroundStyle = useAnimatedStyle(() => {
    return {
      opacity: highlightOpacityValue.get() * finalHighlightOpacity,
      backgroundColor: highlightColorValue,
    };
  });

  const handlePressIn = useCallback(
    (e: GestureResponderEvent) => {
      if (!disableAnimation.scale) {
        scale.set(withTiming(1, scaleConfig));
      }
      if (!disableAnimation.highlight) {
        highlightOpacityValue.set(
          withTiming(
            1,
            animationConfig?.highlight?.config || {
              duration: HIGHLIGHT_CONFIG.duration,
              easing: HIGHLIGHT_CONFIG.easing,
            }
          )
        );
      }
      if (onPressIn && typeof onPressIn === 'function') {
        onPressIn(e);
      }
    },
    [
      scale,
      scaleConfig,
      onPressIn,
      disableAnimation,
      animationConfig,
      highlightOpacityValue,
    ]
  );

  const handlePressOut = useCallback(
    (e: GestureResponderEvent) => {
      if (!disableAnimation.scale) {
        scale.set(withTiming(0, scaleConfig));
      }
      if (!disableAnimation.highlight) {
        highlightOpacityValue.set(
          withTiming(
            0,
            animationConfig?.highlight?.config || {
              duration: HIGHLIGHT_CONFIG.duration,
              easing: HIGHLIGHT_CONFIG.easing,
            }
          )
        );
      }
      if (onPressOut && typeof onPressOut === 'function') {
        onPressOut(e);
      }
    },
    [
      scale,
      scaleConfig,
      onPressOut,
      disableAnimation,
      animationConfig,
      highlightOpacityValue,
    ]
  );

  const contextValue = useMemo(
    () => ({
      size,
      variant,
      isDisabled,
    }),
    [size, variant, isDisabled]
  );

  const handleLayout = useCallback(
    (event: { nativeEvent: { layout: { width: number } } }) => {
      btnWidth.set(event.nativeEvent.layout.width);
    },
    [btnWidth]
  );

  return (
    <ButtonProvider value={contextValue}>
      <AnimatedPressable
        ref={ref}
        layout={layout}
        className={tvStyles}
        style={[nativeStyles.buttonRoot, animatedContainerStyle, style]}
        disabled={isDisabled}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onLayout={handleLayout}
        accessibilityRole={accessibilityRole}
        accessibilityState={{ disabled: isDisabled }}
        {...restProps}
      >
        {backgroundElement}
        <ButtonBackground style={animatedBackgroundStyle} />
        {startContentElement}
        {typeof children === 'string' ? (
          <ButtonLabel>{children}</ButtonLabel>
        ) : (
          labelElement
        )}
        {endContentElement}
      </AnimatedPressable>
    </ButtonProvider>
  );
});

// --------------------------------------------------

const ButtonStartContent = forwardRef<View, ButtonStartContentProps>(
  (props, ref) => {
    const {
      children,
      layout = DEFAULT_LAYOUT_TRANSITION,
      className,
      ...restProps
    } = props;

    const tvStyles = buttonStyles.startContent({
      className,
    });

    return (
      <Animated.View
        ref={ref}
        layout={layout}
        className={tvStyles}
        {...restProps}
      >
        {children}
      </Animated.View>
    );
  }
);

// --------------------------------------------------

const ButtonLabel = forwardRef<View, ButtonLabelProps>((props, ref) => {
  const {
    children,
    layout = DEFAULT_LAYOUT_TRANSITION,
    className,
    classNames,
    ...restProps
  } = props;

  const { size, variant } = useButtonContext();

  const { text, container } = buttonStyles.label({
    size,
    variant,
  });

  const tvContainerStyles = container({
    className: [className, classNames?.container],
  });

  const tvTextStyles = text({
    className: classNames?.text,
  });

  if (typeof children === 'string') {
    return (
      <Animated.View
        ref={ref}
        layout={layout}
        className={tvContainerStyles}
        {...restProps}
      >
        <Text className={tvTextStyles}>{children}</Text>
      </Animated.View>
    );
  }

  return (
    <Animated.View
      ref={ref}
      layout={layout}
      className={tvContainerStyles}
      {...restProps}
    >
      {children}
    </Animated.View>
  );
});

// --------------------------------------------------

const ButtonEndContent = forwardRef<View, ButtonEndContentProps>(
  (props, ref) => {
    const {
      children,
      layout = DEFAULT_LAYOUT_TRANSITION,
      className,
      ...restProps
    } = props;

    const tvStyles = buttonStyles.endContent({
      className,
    });

    return (
      <Animated.View
        ref={ref}
        layout={layout}
        className={tvStyles}
        {...restProps}
      >
        {children}
      </Animated.View>
    );
  }
);

// --------------------------------------------------

const ButtonBackground = forwardRef<View, ButtonBackgroundProps>(
  (props, ref) => {
    const {
      children,
      layout = DEFAULT_LAYOUT_TRANSITION,
      className,
      style,
      ...restProps
    } = props;

    const { size } = useButtonContext();

    const tvStyles = buttonStyles.background({
      size,
      className,
    });

    return (
      <Animated.View
        ref={ref}
        layout={layout}
        className={tvStyles}
        style={[nativeStyles.background, style]}
        {...restProps}
      >
        {children}
      </Animated.View>
    );
  }
);

// --------------------------------------------------

ButtonRoot.displayName = DISPLAY_NAME.ROOT;
ButtonStartContent.displayName = DISPLAY_NAME.START_CONTENT;
ButtonLabel.displayName = DISPLAY_NAME.LABEL;
ButtonEndContent.displayName = DISPLAY_NAME.END_CONTENT;
ButtonBackground.displayName = DISPLAY_NAME.BACKGROUND;

/**
 * Compound Button component with sub-components
 *
 * @component Button - Main button container that handles press interactions, animations, and variants.
 * Provides sensible defaults when sub-components are omitted.
 *
 * @component Button.StartContent - Optional content displayed at the start of the button.
 * Use for icons or other elements before the label.
 *
 * @component Button.Label - Button label that displays text or custom content.
 * When string is provided, it renders as Text. Otherwise renders children as-is.
 *
 * @component Button.EndContent - Optional content displayed at the end of the button.
 * Use for icons or other elements after the label.
 *
 * @component Button.Background - Optional background element with absolute positioning.
 * Rendered beneath all other content. Use for gradients or custom backgrounds.
 *
 * Props flow from Button to sub-components via context (size, variant, isDisabled, animationConfig).
 * The button scales down slightly when pressed for visual feedback.
 *
 * @see Full documentation: https://heroui.com/components/button
 */
const CompoundButton = Object.assign(ButtonRoot, {
  /** @optional Content displayed at the start of the button */
  StartContent: ButtonStartContent,
  /** @optional Button label - renders text or custom content */
  Label: ButtonLabel,
  /** @optional Content displayed at the end of the button */
  EndContent: ButtonEndContent,
  /** @optional Background element - absolute positioned beneath content */
  Background: ButtonBackground,
});

export default CompoundButton;
export { useButtonContext };
