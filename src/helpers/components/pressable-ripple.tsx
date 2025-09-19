import {
  type ComponentProps,
  type FC,
  useCallback,
  useMemo,
  useRef,
} from 'react';
import {
  type ColorValue,
  type EasingFunction,
  type GestureResponderEvent,
  type LayoutChangeEvent,
  Pressable,
  type PressableStateCallbackType,
  View,
  type ViewStyle,
} from 'react-native';

import Animated, {
  cancelAnimation,
  Easing,
  type EasingFunctionFactory,
  type SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const AnimatedView = Animated.createAnimatedComponent(View);

interface RippleValue {
  scale: SharedValue<number>;
  opacity: SharedValue<number>;
  centerX: SharedValue<number>;
  centerY: SharedValue<number>;
  radius: SharedValue<number>;
  active: SharedValue<number>;
}

export interface RippleProps {
  rippleOverflow?: boolean;
  rippleCenter?: boolean;
  rippleColor?: ColorValue;
  rippleDuration?: number;
  rippleEasing?: EasingFunction | EasingFunctionFactory;
  disableRipple?: boolean;
}

export interface PressableRippleProps extends ComponentProps<typeof Pressable>, RippleProps {}

function useRippleValue(): RippleValue {
  const scale = useSharedValue(0);
  const opacity = useSharedValue(0);
  const centerX = useSharedValue(0);
  const centerY = useSharedValue(0);
  const radius = useSharedValue(0);
  const active = useSharedValue(0);

  return {
    scale,
    opacity,
    centerX,
    centerY,
    radius,
    active,
  };
}

const PressableRipple: FC<PressableRippleProps> = ({
  rippleOverflow = false,
  rippleCenter = false,
  rippleColor = 'rgba(0,0,0,0.2)',
  rippleDuration = 400,
  rippleEasing = Easing.bezier(0.25, 0.1, 0.25, 1),
  disableRipple = false,
  className,
  style,
  children,
  disabled,
  onPress,
  onHoverIn,
  onHoverOut,
  onLayout,
  ...restProps
}) => {
  const hovered = useSharedValue(false);
  const pressed = useSharedValue(false);
  const layoutRef = useRef({ width: 0, height: 0, x: 0, y: 0 });
  const ripplePool: RippleValue[] = [
    useRippleValue(),
    useRippleValue(),
    useRippleValue(),
  ];

  const findInactiveRipple = useCallback(() => {
    return ripplePool.find((r) => r.active.value === 0) || null;
  }, [ripplePool]);

  const handlePress = (e: GestureResponderEvent) => {
    if (disabled) return;
    pressed.value = true;

    if (!disableRipple) {
      const { width, height } = layoutRef.current;
      const locationX = e.nativeEvent.locationX;
      const locationY = e.nativeEvent.locationY;
      const cx = rippleCenter ? width / 2 : locationX;
      const cy = rippleCenter ? height / 2 : locationY;
      const maxX = Math.max(cx, width - cx);
      const maxY = Math.max(cy, height - cy);
      const r = Math.sqrt(maxX * maxX + maxY * maxY);

      const ripple = findInactiveRipple();
      if (ripple) {
        cancelAnimation(ripple.scale);
        cancelAnimation(ripple.opacity);

        ripple.centerX.value = cx;
        ripple.centerY.value = cy;
        ripple.radius.value = r;
        ripple.active.value = 1;
        ripple.scale.value = 0;
        ripple.opacity.value = 1;

        // Start scale animation
        ripple.scale.value = withTiming(
          1,
          { duration: rippleDuration, easing: rippleEasing },
          (finished) => {
            if (finished) {
              // Fade out after expansion
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
    }

    onPress?.(e);
  };

  const handleHoverIn = (e: any) => {
    if (disabled) return;
    hovered.value = true;
    onHoverIn?.(e);
  };

  const handleHoverOut = (e: any) => {
    if (disabled) return;
    hovered.value = false;
    onHoverOut?.(e);
  };

  const handleLayout = (e: LayoutChangeEvent) => {
    layoutRef.current = {
      width: e.nativeEvent.layout.width,
      height: e.nativeEvent.layout.height,
      x: e.nativeEvent.layout.x,
      y: e.nativeEvent.layout.y,
    };
    onLayout?.(e);
  };

  const containerStyle = useMemo<ViewStyle>(
    () => ({
      position: 'relative',
      overflow: rippleOverflow ? 'visible' : 'hidden',
    }),
    [rippleOverflow]
  );

  return (
    <Pressable
      {...restProps}
      disabled={disabled}
      style={[containerStyle, style as ViewStyle]}
      className={className}
      onPress={handlePress}
      onHoverIn={handleHoverIn}
      onHoverOut={handleHoverOut}
      onLayout={handleLayout}
    >
      {typeof children === 'function'
        ? children({
            hovered: hovered.value,
            pressed: pressed.value,
          } as PressableStateCallbackType)
        : children}
      {!disableRipple &&
        !disabled &&
        ripplePool.map((ripple, index) => (
          <RippleComponent
            key={index}
            ripple={ripple}
            rippleColor={rippleColor}
          />
        ))}
    </Pressable>
  );
};

const RippleComponent: FC<{
  ripple: RippleValue;
  rippleColor: ColorValue;
}> = ({ ripple, rippleColor }) => {
  const rippleStyle = useAnimatedStyle(() => {
    const diameter = ripple.radius.value * 2;

    return {
      zIndex: -1,
      position: 'absolute',
      top: ripple.centerY.value - ripple.radius.value,
      left: ripple.centerX.value - ripple.radius.value,
      width: diameter,
      height: diameter,
      borderRadius: ripple.radius.value,
      backgroundColor: rippleColor,
      transform: [{ scale: ripple.scale.value }],
      opacity: ripple.opacity.value,
    };
  });

  return <AnimatedView pointerEvents="none" style={rippleStyle} />;
};

export { PressableRipple };
