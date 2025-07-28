import { createContext } from '@/helpers/utils';
import { getElementWithDefault } from '@/helpers/utils/get-element-with-default';
import * as Slot from '@/primitives/slot';
import { useTheme } from '@/theme';
import { forwardRef, useCallback, useMemo } from 'react';
import {
  Pressable,
  Text,
  View,
  type GestureResponderEvent,
} from 'react-native';
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  ANIMATION_DURATION,
  ANIMATION_EASING,
  DEFAULT_LABEL_TEXT,
  DISPLAY_NAME,
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
import { getHighlightColor } from './button.utils';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const [ButtonProvider, useButtonContext] = createContext<ButtonContextValue>({
  name: 'ButtonContext',
});

// --------------------------------------------------

const ButtonRoot = forwardRef<View, ButtonRootProps>((props, ref) => {
  const {
    children,
    asChild,
    variant = 'primary',
    size = 'md',
    fullWidth = true,
    onlyIcon = false,
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
    () =>
      getElementWithDefault(
        children,
        DISPLAY_NAME.LABEL,
        <ButtonLabel>{DEFAULT_LABEL_TEXT}</ButtonLabel>
      ),
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
    fullWidth,
    onlyIcon,
    isDisabled,
    className,
  });

  const scale = useSharedValue(0);
  const highlight = useSharedValue(0);
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

  const highlightValue = useMemo(
    () =>
      animationConfig?.highlight?.color ??
      getHighlightColor(variant, colors, isDark),
    [animationConfig, variant, colors, isDark]
  );
  const highlightConfig = useMemo(
    () =>
      animationConfig?.highlight?.config ?? {
        duration: ANIMATION_DURATION,
        easing: ANIMATION_EASING,
      },
    [animationConfig]
  );

  const animatedBackgroundStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        highlight.get(),
        [0, 1],
        ['transparent', highlightValue]
      ),
    };
  });

  const handlePressIn = useCallback(
    (e: GestureResponderEvent) => {
      if (!disableAnimation.scale) {
        scale.set(withTiming(1, scaleConfig));
      }
      if (!disableAnimation.highlight) {
        highlight.set(withTiming(1, highlightConfig));
      }
      onPressIn?.(e);
    },
    [
      scale,
      scaleConfig,
      onPressIn,
      disableAnimation,
      highlight,
      highlightConfig,
    ]
  );

  const handlePressOut = useCallback(
    (e: GestureResponderEvent) => {
      if (!disableAnimation.scale) {
        scale.set(withTiming(0, scaleConfig));
      }
      if (!disableAnimation.highlight) {
        highlight.set(withTiming(0, highlightConfig));
      }
      onPressOut?.(e);
    },
    [
      scale,
      scaleConfig,
      onPressOut,
      disableAnimation,
      highlight,
      highlightConfig,
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

  const Component = asChild ? Slot.Pressable : AnimatedPressable;

  const handleLayout = useCallback(
    (event: { nativeEvent: { layout: { width: number } } }) => {
      btnWidth.set(event.nativeEvent.layout.width);
    },
    [btnWidth]
  );

  return (
    <ButtonProvider value={contextValue}>
      <Component
        ref={ref}
        className={tvStyles}
        style={[nativeStyles.buttonRoot, animatedContainerStyle, style]}
        disabled={isDisabled}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onLayout={handleLayout}
        {...restProps}
      >
        {backgroundElement}
        <ButtonBackground style={animatedBackgroundStyle} />
        {startContentElement}
        {labelElement}
        {endContentElement}
      </Component>
    </ButtonProvider>
  );
});

// --------------------------------------------------

function ButtonStartContent(props: ButtonStartContentProps) {
  const { children, className, ...restProps } = props;

  const tvStyles = buttonStyles.startContent({
    className,
  });

  return (
    <View className={tvStyles} {...restProps}>
      {children}
    </View>
  );
}

// --------------------------------------------------

function ButtonLabel(props: ButtonLabelProps) {
  const { children, className, classNames, ...restProps } = props;

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
      <View className={tvContainerStyles} {...restProps}>
        <Text className={tvTextStyles}>{children}</Text>
      </View>
    );
  }

  return (
    <View className={tvContainerStyles} {...restProps}>
      {children}
    </View>
  );
}

// --------------------------------------------------

function ButtonEndContent(props: ButtonEndContentProps) {
  const { children, className, ...restProps } = props;

  const tvStyles = buttonStyles.endContent({
    className,
  });

  return (
    <View className={tvStyles} {...restProps}>
      {children}
    </View>
  );
}

// --------------------------------------------------

function ButtonBackground(props: ButtonBackgroundProps) {
  const { children, className, style, ...restProps } = props;

  const { size } = useButtonContext();

  const tvStyles = buttonStyles.background({
    size,
    className,
  });

  return (
    <Animated.View
      className={tvStyles}
      style={[nativeStyles.background, style]}
      {...restProps}
    >
      {children}
    </Animated.View>
  );
}

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
const Button = Object.assign(ButtonRoot, {
  /** @optional Content displayed at the start of the button */
  StartContent: ButtonStartContent,
  /** @optional Button label - renders text or custom content */
  Label: ButtonLabel,
  /** @optional Content displayed at the end of the button */
  EndContent: ButtonEndContent,
  /** @optional Background element - absolute positioned beneath content */
  Background: ButtonBackground,
});

export default Button;
export { useButtonContext };
