import { createContext } from '@/helpers/utils';
import { getElementWithDefault } from '@/helpers/utils/get-element-with-default';
import * as Slot from '@/primitives/slot';
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
import {
  ANIMATION_DURATION,
  ANIMATION_EASING,
  DEFAULT_LABEL_TEXT,
  DISPLAY_NAME,
} from './button.constants';
import buttonStyles, { nativeStyles } from './button.styles';
import type {
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

  const tvStyles = buttonStyles.root({
    variant,
    size,
    fullWidth,
    onlyIcon,
    isDisabled,
    className,
  });

  const timingConfig = useMemo(
    () =>
      animationConfig ?? {
        duration: ANIMATION_DURATION,
        easing: ANIMATION_EASING,
      },
    [animationConfig]
  );

  const pressed = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(pressed.value, [0, 1], [1, 0.99]),
        },
      ],
    };
  });

  const handlePressIn = useCallback(
    (e: GestureResponderEvent) => {
      pressed.set(withTiming(1, timingConfig));
      onPressIn?.(e);
    },
    [pressed, timingConfig, onPressIn]
  );

  const handlePressOut = useCallback(
    (e: GestureResponderEvent) => {
      pressed.set(withTiming(0, timingConfig));
      onPressOut?.(e);
    },
    [pressed, timingConfig, onPressOut]
  );

  const contextValue = useMemo(
    () => ({
      size,
      variant,
      isDisabled,
      animationConfig,
    }),
    [size, variant, isDisabled, animationConfig]
  );

  const Component = asChild ? Slot.Pressable : AnimatedPressable;

  return (
    <ButtonProvider value={contextValue}>
      <Component
        ref={ref}
        className={tvStyles}
        style={[nativeStyles.buttonRoot, animatedStyle, style]}
        disabled={isDisabled}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        {...restProps}
      >
        {startContentElement}
        {labelElement}
        {endContentElement}
      </Component>
    </ButtonProvider>
  );
});

// --------------------------------------------------

function ButtonStartContent(props: ButtonStartContentProps) {
  const { children, asChild, className, ...restProps } = props;

  const tvStyles = buttonStyles.startContent({
    className,
  });

  const Component = asChild ? Slot.View : View;

  return (
    <Component className={tvStyles} {...restProps}>
      {children}
    </Component>
  );
}

// --------------------------------------------------

function ButtonLabel(props: ButtonLabelProps) {
  const { children, asChild, className, classNames, ...restProps } = props;

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

  const Component = asChild ? Slot.View : View;

  if (typeof children === 'string') {
    return (
      <Component className={tvContainerStyles} {...restProps}>
        <Text className={tvTextStyles}>{children}</Text>
      </Component>
    );
  }

  return (
    <Component className={tvContainerStyles} {...restProps}>
      {children}
    </Component>
  );
}

// --------------------------------------------------

function ButtonEndContent(props: ButtonEndContentProps) {
  const { children, asChild, className, ...restProps } = props;

  const tvStyles = buttonStyles.endContent({
    className,
  });

  const Component = asChild ? Slot.View : View;

  return (
    <Component className={tvStyles} {...restProps}>
      {children}
    </Component>
  );
}

// --------------------------------------------------

ButtonRoot.displayName = DISPLAY_NAME.ROOT;
ButtonStartContent.displayName = DISPLAY_NAME.START_CONTENT;
ButtonLabel.displayName = DISPLAY_NAME.LABEL;
ButtonEndContent.displayName = DISPLAY_NAME.END_CONTENT;

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
});

export default Button;
export { useButtonContext };
