import { forwardRef, useCallback, useMemo } from 'react';
import { View, type GestureResponderEvent } from 'react-native';
import {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Text } from '../../helpers/components';
import { colorKit, useThemeColor } from '../../helpers/theme';
import type { PressableRef } from '../../helpers/types';
import { childrenToString, createContext } from '../../helpers/utils';
import { PressableFeedback } from '../pressable-feedback';
import {
  ANIMATION_DURATION,
  ANIMATION_EASING,
  DISPLAY_NAME,
} from './button.constants';
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
    size = 'md',
    isIconOnly = false,
    isDisabled = false,
    className,
    style,
    animationConfig,
    onPressIn,
    onPressOut,
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

  const scale = useSharedValue(0);
  const btnWidth = useSharedValue(0);

  const isScaleAnimationDisabled = animationConfig?.scale?.isDisabled ?? false;

  const scaleValue = useMemo(
    () => animationConfig?.scale?.scale ?? 0.995,
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

  const handlePressIn = useCallback(
    (e: GestureResponderEvent) => {
      if (!isScaleAnimationDisabled) {
        scale.set(withTiming(1, scaleConfig));
      }
      if (onPressIn && typeof onPressIn === 'function') {
        onPressIn(e);
      }
    },
    [scale, scaleConfig, onPressIn, isScaleAnimationDisabled]
  );

  const handlePressOut = useCallback(
    (e: GestureResponderEvent) => {
      if (!isScaleAnimationDisabled) {
        scale.set(withTiming(0, scaleConfig));
      }
      if (onPressOut && typeof onPressOut === 'function') {
        onPressOut(e);
      }
    },
    [scale, scaleConfig, onPressOut, isScaleAnimationDisabled]
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
      <PressableFeedback
        ref={ref}
        className={tvStyles}
        style={[styleSheet.buttonRoot, animatedContainerStyle, style]}
        isDisabled={isDisabled}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onLayout={handleLayout}
        accessibilityRole={accessibilityRole}
        accessibilityState={{ disabled: isDisabled }}
        variant="highlight"
        animationConfig={{
          color: highlightColorMap,
          opacity: 1,
          ...animationConfig?.highlight,
        }}
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
