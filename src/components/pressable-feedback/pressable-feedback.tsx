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
  type GestureResponderEvent,
  View,
} from 'react-native';

import Animated, {
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import type { PressableRef } from '../../helpers/types';
import {
  type PressableFeedbackProps,
  type PressableFeedbackState,
  type HighlightComponentProps,
  type RippleComponentProps,
} from './pressable-feedback.types';
import {
  DISPLAY_NAME,
  DEFAULT_PRESSABLE_FEEDBACK_PLATFORM,
  DEFAULT_PRESSABLE_FEEDBACK_RIPPLE,
  DEFAULT_PRESSABLE_FEEDBACK_HIGHLIGHT,
  DEFAULT_PRESSABLE_FEEDBACK_COLORS,
} from './pressable-feedback.constants';
import pressableFeedbackStyles from './pressable-feedback.styles';
import {
  getDefaultVariant,
  calculateRippleRadius,
  isRippleConfig,
  isHighlightConfig,
} from './pressable-feedback.utils';
import { useRipplePool } from './pressable-feedback.hooks';
import { useTheme } from '../../providers/theme';

const AnimatedView = Animated.createAnimatedComponent(View);

// --------------------------------------------------

const HighlightComponent: FC<HighlightComponentProps> = ({
  pressed,
  color,
  opacity,
  duration,
  easing
}) => {

  const style = useAnimatedStyle(() => ({
    backgroundColor: color,
    opacity: withTiming(
      pressed.value ? opacity : 0,
      { duration, easing }
    ),
  }));

  const tvStyle = pressableFeedbackStyles.highlight();

  return (
    <AnimatedView
      pointerEvents="none"
      style={style}
      className={tvStyle}
    />
  );
};

// --------------------------------------------------

const RippleComponent: FC<RippleComponentProps> = ({
  ripple,
  color
}) => {
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
    <AnimatedView
      pointerEvents="none"
      style={style}
      className={tvStyle}
    />
  );
};

// --------------------------------------------------

const PressableFeedback = forwardRef<PressableRef, PressableFeedbackProps>(
  (props, ref) => {
    const {
      color,
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
    
    const { isDark } = useTheme();

    const hovered = useSharedValue(false);
    const pressed = useSharedValue(false);

    const [hoveredState, setHoveredState] = useState(hovered.value);
    const [pressedState, setPressedState] = useState(pressed.value);

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

    const activeVariant = useMemo(() =>
      variant || getDefaultVariant(DEFAULT_PRESSABLE_FEEDBACK_PLATFORM),
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

    const handlePressIn = useCallback((event: GestureResponderEvent) => {
      if (isDisabled) return;
      pressed.value = true;
      setPressedState(true);
      onPressIn?.(event);
      
      if (isRippleConfig(activeConfig) && !activeConfig.disabled) {
        const { pageX, pageY } = event.nativeEvent;

        internalRef.current?.measure((_, __, width, height, px, py) => {
          const locationX = pageX - px;
          const locationY = pageY - py;

          const radius = calculateRippleRadius({ width, height, x: px, y: py }, locationX, locationY);
          const ripple = getAvailableRipple();
          
          if (ripple) {
            cancelAnimation(ripple.scale);
            cancelAnimation(ripple.opacity);
            
            ripple.locationX.value = locationX;
            ripple.locationY.value = locationY;
            ripple.radius.value = radius;
            ripple.active.value = 1;
            ripple.scale.value = 0;

            const rippleDuration = activeConfig.duration ?? DEFAULT_PRESSABLE_FEEDBACK_RIPPLE.duration;
            const rippleEasing = activeConfig.easing ?? DEFAULT_PRESSABLE_FEEDBACK_RIPPLE.easing;
            const rippleOpacity = activeConfig.opacity ?? DEFAULT_PRESSABLE_FEEDBACK_RIPPLE.opacity;

            ripple.opacity.value = rippleOpacity;
            ripple.scale.value = withTiming(
              1,
              { duration: rippleDuration, easing: rippleEasing },
              (finished) => {
                if (finished && !pressed.value) {
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
    }, [isDisabled, pressed, onPressIn, activeConfig, ripplePool, getAvailableRipple, internalRef]);

    const handlePressOut = useCallback((event: GestureResponderEvent) => {
      if (isDisabled) return;

      pressed.value = false;
      setPressedState(false);
      onPressOut?.(event);

      if (isRippleConfig(activeConfig) && !activeConfig.disabled) {
        ripplePool.forEach((ripple) => {
          if (ripple.active.value === 1 && ripple.scale.value === 1) {
            const rippleDuration = activeConfig.duration ?? DEFAULT_PRESSABLE_FEEDBACK_RIPPLE.duration;
            const rippleEasing = activeConfig.easing ?? DEFAULT_PRESSABLE_FEEDBACK_RIPPLE.easing;

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
    }, [isDisabled, pressed, onPressOut, activeConfig, ripplePool]);

    const handleHoverIn = useCallback((event: any) => {
      if (isDisabled) return;
      hovered.value = true;
      setHoveredState(true);
      onHoverIn?.(event);
    }, [isDisabled, hovered, onHoverIn, setHoveredState]);

    const handleHoverOut = useCallback((event: any) => {
      if (isDisabled) return;
      hovered.value = false;
      setHoveredState(false);
      onHoverOut?.(event);
    }, [isDisabled, hovered, onHoverOut, setHoveredState]);

    const tvStyles = pressableFeedbackStyles.root({ className });

    const renderChildren = useMemo(() => {
      const state: PressableFeedbackState = {
        hovered: hoveredState,
        pressed: pressedState,
      };
      return typeof children === 'function' ? children(state) : children;
    }, [children, hoveredState, pressedState]);

    const showRipple = isRippleConfig(activeConfig) &&
      !activeConfig.disabled &&
      !isDisabled;

    const showHighlight = isHighlightConfig(activeConfig) &&
      !activeConfig.disabled &&
      !isDisabled;

    const activeColor = useMemo(() => {
      return color ?? DEFAULT_PRESSABLE_FEEDBACK_COLORS[isDark ? 'DARK' : 'LIGHT'];
    }, [color, isDark]);

    return (
      <Pressable
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
        {renderChildren}

        {showRipple && ripplePool.map((ripple, index) => (
          <RippleComponent
            key={index}
            ripple={ripple}
            color={activeColor}
          />
        ))}

        {showHighlight && (
          <HighlightComponent
            pressed={pressed}
            color={activeColor}
            opacity={activeConfig.opacity ?? DEFAULT_PRESSABLE_FEEDBACK_HIGHLIGHT.opacity}
            duration={activeConfig.duration ?? DEFAULT_PRESSABLE_FEEDBACK_HIGHLIGHT.duration}
            easing={activeConfig.easing ?? DEFAULT_PRESSABLE_FEEDBACK_HIGHLIGHT.easing}
          />
        )}
      </Pressable>
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