import React, { useCallback, useEffect, useState } from 'react';
import {
  StyleSheet,
  useWindowDimensions,
  type LayoutChangeEvent,
} from 'react-native';
import Animated, {
  cancelAnimation,
  Easing,
  interpolate,
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
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
import skeletonStyles from './skeleton.styles';
import type { SkeletonProps } from './skeleton.types';

const Skeleton: React.FC<SkeletonProps> = (props) => {
  const {
    children,
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

  // Pulse configuration
  const pulseDuration = pulseConfig?.duration ?? DEFAULT_PULSE_DURATION;
  const pulseEasing = pulseConfig?.easing ?? Easing.inOut(Easing.ease);
  const pulseMinOpacity = pulseConfig?.minOpacity ?? DEFAULT_PULSE_MIN_OPACITY;
  const pulseMaxOpacity = pulseConfig?.maxOpacity ?? DEFAULT_PULSE_MAX_OPACITY;

  // 5. Styles
  const tvStyles = skeletonStyles.skeleton({ className });

  // 6. Effects
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

  // 7. Animation styles
  const shimmerAnimatedStyle = useAnimatedStyle(() => {
    if (animationType !== 'shimmer' || !isLoading) {
      return {
        opacity: 0,
        transform: [{ translateX: 0 }],
      };
    }

    const translateX = interpolate(
      progress.get(),
      [0, 1],
      [-(componentWidth + offset), SCREEN_WIDTH]
    );

    return {
      opacity: 1,
      transform: [{ translateX }],
    };
  });

  const pulseAnimatedStyle = useAnimatedStyle(() => {
    if (animationType !== 'pulse' || !isLoading) {
      return {
        opacity: 1,
      };
    }

    const opacity = interpolate(
      progress.get(),
      [0, 1],
      [pulseMinOpacity, pulseMaxOpacity]
    );

    return {
      opacity,
    };
  });

  // 8. Callbacks
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

  // 9. Render
  if (!isLoading) {
    return <>{children}</>;
  }

  return (
    <Animated.View
      onLayout={handleLayout}
      style={[animationType === 'pulse' && pulseAnimatedStyle, style]}
      className={tvStyles}
      {...restProps}
    >
      {animationType === 'shimmer' && componentWidth > 0 && (
        <Animated.View style={[StyleSheet.absoluteFill, shimmerAnimatedStyle]}>
          <LinearGradientComponent
            colors={gradientColors}
            start={gradientStart}
            end={gradientEnd}
            style={StyleSheet.absoluteFill}
          />
        </Animated.View>
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
