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
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { useUniwind } from 'uniwind';
import { colorKit, useThemeColor } from '../../helpers/theme';
import type { PressableRef } from '../../helpers/types';
import {
  DEFAULT_PRESSABLE_FEEDBACK_HIGHLIGHT,
  DEFAULT_PRESSABLE_FEEDBACK_PLATFORM,
  DEFAULT_PRESSABLE_FEEDBACK_RIPPLE,
  DISPLAY_NAME,
} from './pressable-feedback.constants';
import { useRipplePool } from './pressable-feedback.hooks';
import pressableFeedbackStyles from './pressable-feedback.styles';
import {
  type HighlightComponentProps,
  type PressableFeedbackProps,
  type PressableFeedbackState,
  type RippleComponentProps,
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
  const { theme } = useUniwind();
  const themeColorBackground = useThemeColor('background');

  const defaultColor =
    theme === 'dark'
      ? colorKit.brighten(themeColorBackground, 0.05).hex()
      : colorKit.darken(themeColorBackground, 0.05).hex();

  const rContainerStyle = useAnimatedStyle(() => {
    const backgroundColor = animationConfig?.color ?? defaultColor;
    const opacity =
      animationConfig?.opacity ?? DEFAULT_PRESSABLE_FEEDBACK_HIGHLIGHT.opacity;
    const duration =
      animationConfig?.config?.duration ??
      DEFAULT_PRESSABLE_FEEDBACK_HIGHLIGHT.duration;
    const easing =
      animationConfig?.config?.easing ??
      DEFAULT_PRESSABLE_FEEDBACK_HIGHLIGHT.easing;

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

const RippleComponent: FC<RippleComponentProps> = ({ ripple, color }) => {
  const style = useAnimatedStyle(() => {
    const diameter = ripple.radius.value * 2;
    return {
      top: ripple.locationY.value - ripple.radius.value,
      left: ripple.locationX.value - ripple.radius.value,
      width: diameter,
      height: diameter,
      borderRadius: ripple.radius.value,
      backgroundColor: color,
      transform: [{ scale: ripple.scale.value }],
      opacity: ripple.opacity.value,
    };
  });

  const tvStyle = pressableFeedbackStyles.ripple();

  return (
    <Animated.View pointerEvents="none" style={style} className={tvStyle} />
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

    const ripplePool = useRipplePool();

    useEffect(() => {
      return () => {
        ripplePool.forEach((ripple) => {
          cancelAnimation(ripple.scale);
          cancelAnimation(ripple.opacity);
          ripple.scale.value = 0;
          ripple.opacity.value = 0;
          ripple.active.value = 0;
        });
      };
    }, [ripplePool]);

    const activeVariant = useMemo(
      () => variant || getDefaultVariant(DEFAULT_PRESSABLE_FEEDBACK_PLATFORM),
      [variant]
    );

    const activeConfig = useMemo(() => {
      const baseConfig =
        activeVariant === 'ripple'
          ? DEFAULT_PRESSABLE_FEEDBACK_RIPPLE
          : DEFAULT_PRESSABLE_FEEDBACK_HIGHLIGHT;
      return {
        variant: activeVariant,
        ...baseConfig,
        ...animationConfig,
      };
    }, [animationConfig, activeVariant]);

    const getAvailableRipple = useCallback(() => {
      const inactiveRipple = ripplePool.find((r) => r.active.value === 0);
      if (inactiveRipple) return inactiveRipple;
      return null;
    }, [ripplePool]);

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
            const ripple = getAvailableRipple();

            if (ripple) {
              cancelAnimation(ripple.scale);
              cancelAnimation(ripple.opacity);

              ripple.locationX.value = locationX;
              ripple.locationY.value = locationY;
              ripple.radius.value = radius;
              ripple.active.value = 1;
              ripple.scale.value = 0;

              const rippleDuration =
                activeConfig.duration ??
                DEFAULT_PRESSABLE_FEEDBACK_RIPPLE.duration;
              const rippleEasing =
                activeConfig.easing ?? DEFAULT_PRESSABLE_FEEDBACK_RIPPLE.easing;
              const rippleOpacity =
                activeConfig.opacity ??
                DEFAULT_PRESSABLE_FEEDBACK_RIPPLE.opacity;

              ripple.opacity.value = rippleOpacity;
              ripple.scale.value = withTiming(
                1,
                { duration: rippleDuration, easing: rippleEasing },
                (finished) => {
                  if (finished && !isPressed.value) {
                    ripple.opacity.value = withTiming(
                      0,
                      { duration: rippleDuration, easing: rippleEasing },
                      (done) => {
                        if (done) {
                          ripple.scale.value = 0;
                          ripple.active.value = 0;
                        }
                      }
                    );
                  }
                }
              );
            }
          });
        }
      },
      [
        isDisabled,
        isPressed,
        onPressIn,
        activeConfig,
        getAvailableRipple,
        internalRef,
      ]
    );

    const handlePressOut = useCallback(
      (event: GestureResponderEvent) => {
        if (isDisabled) return;

        isPressed.value = false;
        setPressedState(false);
        // @ts-ignore
        onPressOut?.(event);

        if (isRippleConfig(activeConfig) && !activeConfig.isDisabled) {
          ripplePool.forEach((ripple) => {
            if (ripple.active.value === 1 && ripple.scale.value === 1) {
              const rippleDuration =
                activeConfig.duration ??
                DEFAULT_PRESSABLE_FEEDBACK_RIPPLE.duration;
              const rippleEasing =
                activeConfig.easing ?? DEFAULT_PRESSABLE_FEEDBACK_RIPPLE.easing;

              ripple.opacity.value = withTiming(
                0,
                { duration: rippleDuration, easing: rippleEasing },
                (done) => {
                  if (done) {
                    ripple.scale.value = 0;
                    ripple.active.value = 0;
                  }
                }
              );
            }
          });
        }
      },
      [isDisabled, isPressed, onPressOut, activeConfig, ripplePool]
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
    //   isRippleConfig(activeConfig) && !activeConfig.disabled && !isDisabled;

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
          ripplePool.map((ripple, index) => (
            <RippleComponent
              key={index}
              ripple={ripple}
              color={activeConfig.color ?? 'black'}
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
