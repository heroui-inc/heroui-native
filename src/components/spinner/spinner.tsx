import { forwardRef, useEffect, useMemo } from 'react';
import { View, type ViewStyle } from 'react-native';
import Animated, {
  cancelAnimation,
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSequence,
  withTiming,
  type SharedValue,
} from 'react-native-reanimated';
import { createContext, getElementWithDefault } from '../../helpers/utils';
import * as ActivityIndicatorPrimitives from '../../primitives/activity-indicator';
import { useTheme } from '../../providers/theme';
import { SpinnerIcon } from './spinner-icon';
import {
  DEFAULT_ANIMATION_CONFIG,
  DEFAULT_ROTATION_DURATION,
  DEFAULT_SPINNER_INDICATOR_ENTERING,
  DEFAULT_SPINNER_INDICATOR_EXITING,
  DISPLAY_NAME,
  SPINNER_SIZE_MAP,
} from './spinner.constants';
import spinnerStyles from './spinner.styles';
import type {
  SpinnerContextValue,
  SpinnerIndicatorProps,
  SpinnerProps,
} from './spinner.types';

const AnimatedRoot = Animated.createAnimatedComponent(
  ActivityIndicatorPrimitives.Root
);

const AnimatedIndicator = Animated.createAnimatedComponent(
  ActivityIndicatorPrimitives.Indicator
);

const [SpinnerProvider, useSpinnerContext] = createContext<SpinnerContextValue>(
  {
    name: 'SpinnerContext',
  }
);

const SpinnerRoot = forwardRef<View, SpinnerProps>((props, ref) => {
  const {
    children,
    entering = DEFAULT_SPINNER_INDICATOR_ENTERING,
    exiting = DEFAULT_SPINNER_INDICATOR_EXITING,
    size = 'md',
    color = 'default',
    variant = 'rotate',
    isLoading = true,
    className,
    style,
    ...restProps
  } = props;

  const tvStyles = spinnerStyles.root({
    size,
    className,
  });

  const indicatorElement = useMemo(
    () =>
      getElementWithDefault(
        children,
        DISPLAY_NAME.INDICATOR,
        <SpinnerIndicator />
      ),
    [children]
  );

  const contextValue = useMemo(
    () => ({
      size,
      color,
      variant,
      isLoading,
    }),
    [size, color, variant, isLoading]
  );

  return (
    <SpinnerProvider value={contextValue}>
      <AnimatedRoot
        ref={ref}
        entering={entering}
        exiting={exiting}
        isLoading={isLoading}
        className={tvStyles}
        style={style}
        {...restProps}
      >
        {children || indicatorElement}
      </AnimatedRoot>
    </SpinnerProvider>
  );
});

// --------------------------------------------------

const SpinnerRotationIndicator = forwardRef<View, SpinnerIndicatorProps>(
  (props, ref) => {
    const {
      children,
      className,
      style,
      speed = 1.1,
      animationEasing,
      iconProps,
      ...restProps
    } = props;

    const { size, color, isLoading } = useSpinnerContext();

    const { colors: themeColors } = useTheme();

    const tvStyles = spinnerStyles.indicator({
      className,
    });

    const iconSize = SPINNER_SIZE_MAP[size];

    const colorMap: Record<string, string> = {
      default: themeColors.foreground,
      success: themeColors.success,
      warning: themeColors.warning,
      danger: themeColors.danger,
    };

    const iconColor = colorMap[color] || color;

    const rotation = useSharedValue(0);

    useEffect(() => {
      if (isLoading) {
        rotation.set(
          withRepeat(
            withSequence(
              withTiming(360, {
                duration: DEFAULT_ROTATION_DURATION / speed,
                easing: animationEasing || Easing.linear,
              })
            ),
            -1,
            false
          )
        );
      } else {
        rotation.set(withTiming(0, { duration: 300 }));
      }

      return () => {
        cancelAnimation(rotation);
      };
    }, [isLoading, speed, animationEasing, rotation]);

    const animatedStyle = useAnimatedStyle(() => {
      return {
        transform: [{ rotate: `${rotation.get()}deg` }],
      };
    });

    if (!isLoading) {
      return null;
    }

    return (
      <AnimatedIndicator
        ref={ref}
        className={tvStyles}
        style={[animatedStyle, style]}
        {...restProps}
      >
        {children || (
          <SpinnerIcon
            width={iconProps?.width ?? iconSize}
            height={iconProps?.height ?? iconSize}
            color={iconProps?.color ?? iconColor}
          />
        )}
      </AnimatedIndicator>
    );
  }
);

const SpinnerSweepIndicator = forwardRef<View, SpinnerIndicatorProps>(
  (props, ref) => {
    const {
      children,
      className,
      style,
      speed = 0.8,
      animationEasing = DEFAULT_ANIMATION_CONFIG.easing,
      ...restProps
    } = props;

    const { size, color, isLoading } = useSpinnerContext();
    const { colors: themeColors } = useTheme();
    const progress = useSharedValue(0);
    const sweepSize = SPINNER_SIZE_MAP[size];

    const colorMap: Record<string, string> = {
      default: themeColors.foreground,
      success: themeColors.success,
      warning: themeColors.warning,
      danger: themeColors.danger,
    };

    const sweepColor = colorMap[color] || color;

    useEffect(() => {
      progress.value = withRepeat(
        withTiming(1, {
          duration: Math.round(
            DEFAULT_ROTATION_DURATION / Math.max(speed, 0.1)
          ),
          easing: animationEasing,
        }),
        -1,
        false
      );
    }, [speed, animationEasing]);

    const layerAnimatedStyle = useAnimatedStyle(() => {
      const rotate = interpolate(progress.value, [0, 1], [45, 765]);
      return {
        width: sweepSize,
        height: sweepSize,
        transform: [{ rotate: `${rotate}deg` }],
      };
    }, [sweepSize]);

    const viewportAnimatedStyle = useAnimatedStyle(() => {
      let animProgress = progress.value * 2;
      if (animProgress > 1) {
        animProgress = 2 - animProgress;
      }

      const rotation = -165;
      const direction = 1;

      const easingValue =
        typeof animationEasing === 'function'
          ? animationEasing(animProgress)
          : Easing.linear(animProgress);

      const rotate = direction * 150 * easingValue + rotation;

      return {
        width: sweepSize,
        height: sweepSize,
        transform: [{ rotate: `${rotate}deg` }],
      };
    }, [sweepSize, animationEasing]);

    const containerStyle = useMemo(() => {
      return {
        width: sweepSize,
        height: sweepSize / 2,
        overflow: 'hidden' as const,
      };
    }, [sweepSize]);

    const lineStyle = useMemo(() => {
      return {
        width: sweepSize,
        height: sweepSize,
        borderColor: sweepColor,
        borderWidth: sweepSize / (sweepSize / 3),
        borderRadius: sweepSize / 2,
      };
    }, [sweepSize, sweepColor]);

    if (!isLoading) {
      return null;
    }

    return (
      <AnimatedIndicator ref={ref} style={layerAnimatedStyle} {...restProps}>
        <View style={containerStyle}>
          <Animated.View style={viewportAnimatedStyle}>
            <View style={containerStyle}>
              <View style={lineStyle} />
            </View>
          </Animated.View>
        </View>
      </AnimatedIndicator>
    );
  }
);

const Dot = ({
  index,
  count,
  progress,
  color,
  size,
  pause,
}: {
  index: number;
  color: string;
  size: number;
  progress: SharedValue<number>;
  count: number;
  pause: number;
}) => {
  const dotStyle = useAnimatedStyle(() => {
    const step = 1 / count;
    const delay = index * step;

    const cycle = 1 + pause;
    const t = (progress.value - delay + cycle) % cycle;

    let opacity = 0.2;
    let scale = 1;

    if (t < 1) {
      opacity = interpolate(t, [0, 0.5, 1], [0.2, 1, 0.2], {
        extrapolateLeft: 'clamp',
        extrapolateRight: 'clamp',
      });
      scale = interpolate(t, [0, 0.5, 1], [1, 1.3, 1]);
    }

    return {
      opacity,
      transform: [{ scale }],
    };
  });

  return (
    <Animated.View
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
        },
        dotStyle,
      ]}
    />
  );
};

const SpinnerDotsIndicator = forwardRef<View, SpinnerIndicatorProps>(
  (
    {
      style,
      speed = 1.5,
      animationEasing = DEFAULT_ANIMATION_CONFIG.easing,
      ...restProps
    },
    ref
  ) => {
    const { color, size, isLoading } = useSpinnerContext();
    const { colors } = useTheme();

    const colorMap: Record<string, string> = {
      default: colors.foreground,
      success: colors.success,
      warning: colors.warning,
      danger: colors.danger,
    };

    const dotColor = colorMap[color] || color;
    const dotSize = SPINNER_SIZE_MAP[size]! / 4;
    const dotCount = 3;
    const pause = 0.9;

    const progress = useSharedValue(0);

    const containerStyle = useMemo<ViewStyle>(() => {
      return {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        columnGap: (dotSize / 2).toFixed(2),
      };
    }, [dotSize]);

    useEffect(() => {
      if (isLoading) {
        const cycle = 1 + pause;
        progress.value = withRepeat(
          withTiming(cycle, {
            duration:
              (DEFAULT_ROTATION_DURATION / Math.max(speed, 0.1)) * cycle,
            easing: animationEasing,
          }),
          -1,
          false
        );
      } else {
        progress.value = 0;
      }
    }, [isLoading, speed, animationEasing, pause]);

    if (!isLoading) return null;

    return (
      <AnimatedIndicator
        ref={ref}
        style={[containerStyle, style]}
        {...restProps}
      >
        {Array.from({ length: dotCount }).map((_, i) => (
          <Dot
            key={i}
            index={i}
            count={dotCount}
            progress={progress}
            color={dotColor}
            size={dotSize}
            pause={pause}
          />
        ))}
      </AnimatedIndicator>
    );
  }
);

const WaveDot = ({
  index,
  count,
  progress,
  color,
  size,
}: {
  index: number;
  count: number;
  progress: SharedValue<number>;
  color: string;
  size: number;
}) => {
  const dotStyle = useAnimatedStyle(() => {
    const step = 1 / count;
    const delay = index * step;

    const t = (progress.value - delay + 1) % 1;

    const translateY = interpolate(t, [0, 0.5, 1], [0, -size, 0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });

    return {
      transform: [{ translateY }],
    };
  });

  return (
    <Animated.View
      style={[
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color
        },
        dotStyle,
      ]}
    />
  );
};

const SpinnerWaveIndicator = forwardRef<View, SpinnerIndicatorProps>(
  (
    {
      style,
      speed = 1.2,
      animationEasing = DEFAULT_ANIMATION_CONFIG.easing,
      ...restProps
    },
    ref
  ) => {
    const { color, size, isLoading } = useSpinnerContext();
    const { colors } = useTheme();

    const colorMap: Record<string, string> = {
      default: colors.foreground,
      success: colors.success,
      warning: colors.warning,
      danger: colors.danger,
    };

    const waveColor = colorMap[color] || color;
    const dotSize = SPINNER_SIZE_MAP[size]! / 4;
    const dotCount = 3;

    const progress = useSharedValue(0);

    const containerStyle = useMemo<ViewStyle>(() => {
      return {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        columnGap: (dotSize / 2).toFixed(2),
      };
    }, [dotSize]);

    useEffect(() => {
      if (isLoading) {
        progress.value = withRepeat(
          withTiming(1, {
            duration: Math.round(
              (DEFAULT_ROTATION_DURATION / Math.max(speed, 0.1)) * 0.75
            ),
            easing: animationEasing,
          }),
          -1,
          false
        );
      } else {
        progress.value = 0;
      }
    }, [isLoading, speed, animationEasing]);

    if (!isLoading) return null;

    return (
      <AnimatedIndicator
        ref={ref}
        style={[containerStyle, style]}
        {...restProps}
      >
        {Array.from({ length: dotCount }).map((_, i) => (
          <WaveDot
            key={i}
            index={i}
            count={dotCount}
            progress={progress}
            color={waveColor}
            size={dotSize}
          />
        ))}
      </AnimatedIndicator>
    );
  }
);

const SpinnerIndicator = forwardRef<View, SpinnerIndicatorProps>(
  (props, ref) => {
    const { variant } = useSpinnerContext();

    if (variant === 'sweep') {
      return <SpinnerSweepIndicator ref={ref} {...props} />;
    }

    if (variant === 'dots') {
      return <SpinnerDotsIndicator ref={ref} {...props} />;
    }

    if (variant === 'wave') {
      return <SpinnerWaveIndicator ref={ref} {...props} />;
    }

    return <SpinnerRotationIndicator ref={ref} {...props} />;
  }
);

// --------------------------------------------------

SpinnerRoot.displayName = DISPLAY_NAME.ROOT;
SpinnerIndicator.displayName = DISPLAY_NAME.INDICATOR;

/**
 * Compound Spinner component with sub-components
 *
 * @component Spinner - Main container that controls loading state, size, color and variant.
 * Renders a default animated indicator if no children provided.
 *
 * @component Spinner.Indicator - Optional sub-component for customizing animation speed,
 * easing, and icon appearance. Accepts custom children to replace the default icon.
 * When omitted, Spinner uses a default indicator with standard animation settings.
 *
 * Props flow from Spinner to Indicator via context (size, color, variant, isLoading).
 * The indicator only renders when isLoading is true.
 *
 * @see Full documentation: https://heroui.com/components/spinner
 */
const CompoundSpinner = Object.assign(SpinnerRoot, {
  /** @optional Customize animation speed, easing, and icon appearance */
  Indicator: SpinnerIndicator,
});

export { useSpinnerContext };
export default CompoundSpinner;
