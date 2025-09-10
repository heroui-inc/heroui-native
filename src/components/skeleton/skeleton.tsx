import React, { useCallback, useEffect, useState } from 'react';
import {
  StyleSheet,
  useWindowDimensions,
  type LayoutChangeEvent,
} from 'react-native';
import Animated, {
  cancelAnimation,
  Easing,
  FadeIn,
  FadeOut,
  interpolate,
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
  type SharedValue,
} from 'react-native-reanimated';

import { colorKit, useTheme } from '../../providers/theme';

import LinearGradientComponent from './linear-gradient';
import {
  DEFAULT_EASING,
  DEFAULT_GRADIENT_END,
  DEFAULT_GRADIENT_START,
  DEFAULT_PULSE_DURATION,
  DEFAULT_PULSE_MAX_OPACITY,
  DEFAULT_PULSE_MIN_OPACITY,
  DEFAULT_SHIMMER_DURATION,
  DEFAULT_SPEED,
  DISPLAY_NAME,
} from './skeleton.constants';
import skeletonStyles, { nativeStyles } from './skeleton.styles';
import type {
  PulseConfig,
  ShimmerConfig,
  SkeletonProps,
} from './skeleton.types';

// --------------------------------------------------

interface ShimmerAnimationProps {
  isLoading: boolean;
  shimmerConfig?: ShimmerConfig;
  componentWidth: number;
  offset: number;
  progress: SharedValue<number>;
  screenWidth: number;
  isDark: boolean;
  colors: any;
}

const ShimmerAnimation: React.FC<ShimmerAnimationProps> = ({
  shimmerConfig,
  componentWidth,
  offset,
  progress,
  screenWidth,
  isDark,
  colors,
}) => {
  const highlightColor = isDark
    ? colorKit
        .setAlpha(colorKit.increaseBrightness(colors.background, 10).hex(), 0.5)
        .hex()
    : colorKit
        .setAlpha(colorKit.decreaseBrightness(colors.background, 5).hex(), 0.5)
        .hex();

  const gradientColors = shimmerConfig?.gradientConfig?.colors ?? [
    'transparent',
    highlightColor,
    'transparent',
  ];
  const gradientStart =
    shimmerConfig?.gradientConfig?.start ?? DEFAULT_GRADIENT_START;
  const gradientEnd =
    shimmerConfig?.gradientConfig?.end ?? DEFAULT_GRADIENT_END;

  const shimmerAnimatedStyle = useAnimatedStyle(() => {
    const translateX = interpolate(
      progress.get(),
      [0, 1],
      [-(componentWidth + offset), screenWidth]
    );

    return {
      opacity: 1,
      transform: [{ translateX }],
    };
  });

  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFill,
        nativeStyles.borderCurve,
        shimmerAnimatedStyle,
      ]}
    >
      <LinearGradientComponent
        colors={gradientColors}
        start={gradientStart}
        end={gradientEnd}
        style={StyleSheet.absoluteFill}
      />
    </Animated.View>
  );
};

// --------------------------------------------------

interface PulseAnimationProps {
  pulseConfig?: PulseConfig;
  progress: SharedValue<number>;
}

const usePulseAnimation = ({ pulseConfig, progress }: PulseAnimationProps) => {
  const pulseMinOpacity = pulseConfig?.minOpacity ?? DEFAULT_PULSE_MIN_OPACITY;
  const pulseMaxOpacity = pulseConfig?.maxOpacity ?? DEFAULT_PULSE_MAX_OPACITY;

  return useAnimatedStyle(() => {
    const opacity = interpolate(
      progress.get(),
      [0, 1],
      [pulseMinOpacity, pulseMaxOpacity]
    );

    return {
      opacity,
    };
  });
};

// --------------------------------------------------

const Skeleton: React.FC<SkeletonProps> = (props) => {
  const {
    children,
    entering = FadeIn,
    exiting = FadeOut,
    isLoading = true,
    animationType = 'shimmer',
    shimmerConfig,
    pulseConfig,
    className,
    style,
    ...restProps
  } = props;

  const [componentWidth, setComponentWidth] = useState(0);
  const [offset, setOffset] = useState(0);
  const progress = useSharedValue(0);

  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const { colors, isDark } = useTheme();

  const shimmerDuration = shimmerConfig?.duration ?? DEFAULT_SHIMMER_DURATION;
  const shimmerEasing = shimmerConfig?.easing ?? DEFAULT_EASING;
  const shimmerSpeed = shimmerConfig?.speed ?? DEFAULT_SPEED;

  const pulseDuration = pulseConfig?.duration ?? DEFAULT_PULSE_DURATION;
  const pulseEasing = pulseConfig?.easing ?? Easing.inOut(Easing.ease);

  const tvStyles = skeletonStyles.skeleton({ className });
  const pulseAnimatedStyle = usePulseAnimation({ pulseConfig, progress });

  useEffect(() => {
    if (isLoading && animationType !== 'none') {
      progress.set(0);

      if (animationType === 'shimmer') {
        progress.value = withRepeat(
          withTiming(1, {
            duration: shimmerDuration / shimmerSpeed,
            easing: shimmerEasing,
          }),
          -1,
          false,
          undefined,
          ReduceMotion.System
        );
      } else if (animationType === 'pulse') {
        progress.value = withRepeat(
          withTiming(1, {
            duration: pulseDuration,
            easing: pulseEasing,
          }),
          -1,
          true,
          undefined,
          ReduceMotion.System
        );
      }
    } else {
      cancelAnimation(progress);
      progress.set(0);
    }

    return () => {
      cancelAnimation(progress);
    };
  }, [
    isLoading,
    animationType,
    progress,
    shimmerDuration,
    shimmerEasing,
    shimmerSpeed,
    pulseDuration,
    pulseEasing,
  ]);

  const handleLayout = useCallback(
    (event: LayoutChangeEvent) => {
      if (componentWidth === 0) {
        const { width, x } = event.nativeEvent.layout;
        setComponentWidth(width);
        setOffset(x);
      }
    },
    [componentWidth]
  );

  if (!isLoading) {
    return (
      <Animated.View key="content" entering={entering} exiting={exiting}>
        {children}
      </Animated.View>
    );
  }

  return (
    <Animated.View
      key="skeleton"
      entering={entering}
      exiting={exiting}
      onLayout={handleLayout}
      style={[
        animationType === 'pulse' && pulseAnimatedStyle,
        nativeStyles.borderCurve,
        style,
      ]}
      className={tvStyles}
      {...restProps}
    >
      {animationType === 'shimmer' && componentWidth > 0 && (
        <ShimmerAnimation
          isLoading={isLoading}
          shimmerConfig={shimmerConfig}
          componentWidth={componentWidth}
          offset={offset}
          progress={progress}
          screenWidth={SCREEN_WIDTH}
          isDark={isDark}
          colors={colors}
        />
      )}
    </Animated.View>
  );
};

// --------------------------------------------------

Skeleton.displayName = DISPLAY_NAME.SKELETON;

/**
 * Skeleton component for displaying loading placeholders
 *
 * @component Skeleton - Animated loading placeholder that can display shimmer or pulse effects.
 * Shows skeleton state when isLoading is true, otherwise displays children content.
 * Supports customizable animations through shimmerConfig and pulseConfig props.
 * Shape and size are controlled via className for maximum flexibility.
 *
 * @see Full documentation: https://heroui.com/components/skeleton
 */
export default Skeleton;
