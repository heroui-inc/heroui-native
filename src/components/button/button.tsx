import { forwardRef, useCallback, useMemo } from 'react';
import { Pressable, View, type GestureResponderEvent } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import type { PressableRef } from '../../helpers/types';
import { childrenToString, createContext } from '../../helpers/utils';
import { getElementWithDefault } from '../../helpers/utils/get-element-with-default';
import { useTheme } from '../../providers/theme';
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
  ButtonLabelProps,
  ButtonRootProps,
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
    skipLayoutAnimation = false,
    variant = 'primary',
    size = 'md',
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

  const stringifiedChildren = childrenToString(children);

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
      layout,
    }),
    [size, variant, isDisabled, layout]
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
        layout={skipLayoutAnimation ? undefined : layout}
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
        {stringifiedChildren ? (
          <ButtonLabel>{stringifiedChildren}</ButtonLabel>
        ) : (
          children
        )}
      </AnimatedPressable>
    </ButtonProvider>
  );
});

// --------------------------------------------------

const ButtonLabel = forwardRef<View, ButtonLabelProps>((props, ref) => {
  const { children, layout: layoutProp, className, ...restProps } = props;

  const { size, variant, layout: contextLayout } = useButtonContext();

  const tvStyles = buttonStyles.label({
    size,
    variant,
    className,
  });

  return (
    <Animated.Text
      ref={ref}
      layout={layoutProp || contextLayout}
      className={tvStyles}
      {...restProps}
    >
      {children}
    </Animated.Text>
  );
});

// --------------------------------------------------

const ButtonBackground = forwardRef<View, ButtonBackgroundProps>(
  (props, ref) => {
    const { size, layout: contextLayout } = useButtonContext();

    const {
      children,
      layout: layoutProp,
      className,
      style,
      ...restProps
    } = props;

    const tvStyles = buttonStyles.background({
      size,
      className,
    });

    return (
      <Animated.View
        ref={ref}
        layout={layoutProp || contextLayout}
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

ButtonRoot.displayName = DISPLAY_NAME.BUTTON_ROOT;
ButtonLabel.displayName = DISPLAY_NAME.BUTTON_LABEL;
ButtonBackground.displayName = DISPLAY_NAME.BACKGROUND;

/**
 * Compound Button component with sub-components
 *
 * @component Button - Main button container that handles press interactions, animations, and variants.
 * Renders with string children as label or accepts compound components for custom layouts.
 *
 * @component Button.Label - Text content of the button. When string is provided,
 * it renders as Text. Otherwise renders children as-is.
 *
 * @component Button.Background - Optional background element with absolute positioning.
 * Rendered beneath all other content. Use for gradients or custom backgrounds.
 *
 * Props flow from Button to sub-components via context (size, variant, isDisabled).
 * All components use animated views with layout transitions for smooth animations.
 *
 * @see Full documentation: https://heroui.com/components/button
 */
const CompoundButton = Object.assign(ButtonRoot, {
  /** Button label - renders text or custom content */
  Label: ButtonLabel,
  /** @optional Background element - absolute positioned beneath content */
  Background: ButtonBackground,
});

export { useButtonContext };
export default CompoundButton;
