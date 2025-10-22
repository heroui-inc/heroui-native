import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  type FC,
} from 'react';
import {
  Pressable,
  StyleSheet,
  type GestureResponderEvent,
} from 'react-native';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  withDelay,
} from 'react-native-reanimated';

import type { PressableRef } from '../../helpers/types';
import { colorKit, useTheme } from '../../providers/theme';
import {
  DEFAULT_PRESSABLE_FEEDBACK_HIGHLIGHT,
  DEFAULT_PRESSABLE_FEEDBACK_HIGHLIGHT_TIMING_CONFIG,
  DEFAULT_PRESSABLE_FEEDBACK_PLATFORM,
  DEFAULT_PRESSABLE_FEEDBACK_RIPPLE,
  DEFAULT_PRESSABLE_FEEDBACK_RIPPLE_TIMING_CONFIG,
  DISPLAY_NAME,
} from './pressable-feedback.constants';
import pressableFeedbackStyles from './pressable-feedback.styles';
import {
  type HighlightAnimationConfig,
  type HighlightComponentProps,
  type PressableFeedbackProps,
  type PressableFeedbackState,
  type RippleAnimationConfig,
  type RippleComponentProps,
  type RippleItem,
} from './pressable-feedback.types';
import {
  calculateRippleRadius,
  getDefaultVariant,
  isHighlightConfig,
  isRippleConfig,
} from './pressable-feedback.utils';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

// --------------------------------------------------

const HighlightComponent: FC<HighlightComponentProps> = ({
  animationConfig,
  isPressed,
}) => {
  const { colors, isDark } = useTheme();

  const defaultColor = isDark
    ? colorKit.brighten(colors.background, 0.05).hex()
    : colorKit.darken(colors.background, 0.05).hex();

  const rContainerStyle = useAnimatedStyle(() => {
    const backgroundColor = animationConfig?.color ?? defaultColor;
    const opacity =
      animationConfig?.opacity ?? DEFAULT_PRESSABLE_FEEDBACK_HIGHLIGHT.opacity;
    const duration =
      animationConfig?.config?.duration ??
      DEFAULT_PRESSABLE_FEEDBACK_HIGHLIGHT_TIMING_CONFIG.duration;
    const easing =
      animationConfig?.config?.easing ??
      DEFAULT_PRESSABLE_FEEDBACK_HIGHLIGHT_TIMING_CONFIG.easing;

    return {
      backgroundColor,
      opacity: withTiming(isPressed.get() ? opacity : 0, { duration, easing }),
    };
  });

  return (
    <Animated.View
      pointerEvents="none"
      style={[StyleSheet.absoluteFill, rContainerStyle]}
    />
  );
};

// --------------------------------------------------

const RippleComponent: FC<RippleComponentProps> = ({ animationConfig, ripple, onRippleEnd }) => {

  const rippleDuration = useMemo(() => animationConfig?.config?.duration ?? DEFAULT_PRESSABLE_FEEDBACK_RIPPLE_TIMING_CONFIG.duration, [animationConfig]);
  const rippleEasing = useMemo(() => animationConfig?.config?.easing ?? DEFAULT_PRESSABLE_FEEDBACK_RIPPLE_TIMING_CONFIG.easing, [animationConfig]);

  const rippleScale = useSharedValue(0);
  const rippleOpacity = useSharedValue(animationConfig?.opacity ?? DEFAULT_PRESSABLE_FEEDBACK_RIPPLE.opacity);
  const rippleColor = useMemo(() => animationConfig?.color ?? 'black', [animationConfig]);

  useEffect(() => {
    rippleScale.value = withTiming(1, {
      duration: rippleDuration,
      easing: rippleEasing,
    });

    rippleOpacity.value = withDelay(
      rippleDuration / 2,
      withTiming(0, { duration: rippleDuration, easing: rippleEasing })
    );

    const timer = setTimeout(onRippleEnd, rippleDuration);
    return () => clearTimeout(timer);
  }, []);

  const rippleAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: rippleScale.value }],
    opacity: rippleOpacity.value,
    backgroundColor: rippleColor,
  }));

  const tvStyle = pressableFeedbackStyles.ripple();

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        {
          width: ripple.size,
          height: ripple.size,
          left: ripple.x - ripple.size / 2,
          top: ripple.y - ripple.size / 2,
        },
        rippleAnimatedStyle,
      ]}
      className={tvStyle}
    />
  );
};

// --------------------------------------------------
const PressableFeedback = forwardRef<PressableRef, PressableFeedbackProps>(
  (props, ref) => {
    const {
      variant,
      animationConfig,
      isDisabled = false,
      className,
      children,
      onPress,
      onPressIn,
      onPressOut,
      onHoverIn,
      onHoverOut,
      ...restProps
    } = props;

    const internalRef = useRef<PressableRef>(null);
    useImperativeHandle(ref, () => internalRef.current as PressableRef);

    const isHovered = useSharedValue(false);
    const isPressed = useSharedValue(false);

    const [hoveredState, setHoveredState] = useState(isHovered.value);
    const [pressedState, setPressedState] = useState(isPressed.value);
    // @ts-ignore
    const [ripples, setRipples] = useState<RippleItem[]>([]);

    const activeVariant = useMemo(
      () => variant || getDefaultVariant(DEFAULT_PRESSABLE_FEEDBACK_PLATFORM),
      [variant]
    );

    const activeConfig = useMemo<HighlightAnimationConfig | RippleAnimationConfig>(() => {

      const baseConfig = activeVariant === 'ripple'
          ? {
            ...DEFAULT_PRESSABLE_FEEDBACK_RIPPLE,
            config: DEFAULT_PRESSABLE_FEEDBACK_RIPPLE_TIMING_CONFIG,
          }
          : {
            ...DEFAULT_PRESSABLE_FEEDBACK_HIGHLIGHT,
            config: DEFAULT_PRESSABLE_FEEDBACK_HIGHLIGHT_TIMING_CONFIG,
          };

      return {
        variant: activeVariant,
        ...baseConfig,
        ...animationConfig,
      };
    }, [animationConfig, activeVariant]);

    // const removeRipple = useCallback((key: number) => {
    //   setRipples((prev) => prev.filter((r) => r.key !== key));
    // }, []);

    const handlePressIn = useCallback(
      (event: GestureResponderEvent) => {
        if (isDisabled) return;
        isPressed.value = true;
        setPressedState(true);
        // @ts-ignore
        onPressIn?.(event);

        if (isRippleConfig(activeConfig) && !activeConfig.isDisabled) {
          const { pageX, pageY } = event.nativeEvent;

          internalRef.current?.measure((_, __, width, height, px, py) => {
            const locationX = pageX - px;
            const locationY = pageY - py;

            const radius = calculateRippleRadius(
              { width, height, x: px, y: py },
              locationX,
              locationY
            );
            const rippleSize = radius * 2;

            const rippleKey = Date.now() + Math.random();

            setRipples((prev) => [
              ...prev,
              { key: rippleKey, x: locationX, y: locationY, size: rippleSize },
            ]);
          });
        }
      },
      [isDisabled, isPressed, onPressIn, activeConfig, internalRef]
    );

    const handlePressOut = useCallback(
      (event: GestureResponderEvent) => {
        if (isDisabled) return;

        isPressed.value = false;
        setPressedState(false);
        // @ts-ignore
        onPressOut?.(event);
      },
      [isDisabled, isPressed, onPressOut]
    );

    const handleHoverIn = useCallback(
      (event: any) => {
        if (isDisabled) return;
        isHovered.value = true;
        setHoveredState(true);
        // @ts-ignore
        onHoverIn?.(event);
      },
      [isDisabled, isHovered, onHoverIn, setHoveredState]
    );

    const handleHoverOut = useCallback(
      (event: any) => {
        if (isDisabled) return;
        isHovered.value = false;
        setHoveredState(false);
        // @ts-ignore
        onHoverOut?.(event);
      },
      [isDisabled, isHovered, onHoverOut, setHoveredState]
    );

    const tvStyles = pressableFeedbackStyles.root({ className });

    const renderChildren = useMemo(() => {
      const state: PressableFeedbackState = {
        isHovered: hoveredState,
        isPressed: pressedState,
      };
      return typeof children === 'function' ? children(state) : children;
    }, [children, hoveredState, pressedState]);

    // const showRipple =
    //   isRippleConfig(activeConfig) && !activeConfig.isDisabled && !isDisabled;

    const showHighlight =
      isHighlightConfig(activeConfig) &&
      !activeConfig.isDisabled &&
      !isDisabled;

    return (
      <AnimatedPressable
        ref={internalRef}
        disabled={isDisabled}
        className={tvStyles}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onHoverIn={handleHoverIn}
        onHoverOut={handleHoverOut}
        {...restProps}
      >
        {/* {showRipple &&
          ripples.map((ripple) => (
            <RippleComponent
              key={ripple.key}
              ripple={ripple}
              onRippleEnd={() => removeRipple(ripple.key)}
              animationConfig={activeConfig}
            />
          ))} */}
        {showHighlight && (
          <HighlightComponent
            isPressed={isPressed}
            animationConfig={activeConfig}
          />
        )}
        {renderChildren}
      </AnimatedPressable>
    );
  }
);

// --------------------------------------------------

HighlightComponent.displayName = DISPLAY_NAME.HIGHLIGHT;
RippleComponent.displayName = DISPLAY_NAME.RIPPLE;
PressableFeedback.displayName = DISPLAY_NAME.ROOT;

/**
 * PressableFeedback component
 *
 * @component PressableFeedback - Container component that provides visual feedback
 * for user interactions. Shows a ripple effect on Android and a highlight effect on iOS.
 * Can be used standalone or as part of other components like Button, Card, or Accordion
 * for consistent interaction feedback.
 */
export default PressableFeedback;
