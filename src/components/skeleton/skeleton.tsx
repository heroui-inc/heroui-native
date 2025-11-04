import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react';
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
} from 'react-native-reanimated';

import { useUniwind } from 'uniwind';
import { colorKit, useThemeColor } from '../../helpers/theme';
import { createContext } from '../../helpers/utils';

import LinearGradientComponent from './linear-gradient';
import {
  DEFAULT_EASING,
  DEFAULT_PULSE_DURATION,
  DEFAULT_PULSE_MAX_OPACITY,
  DEFAULT_PULSE_MIN_OPACITY,
  DEFAULT_SHIMMER_DURATION,
  DEFAULT_SPEED,
  DISPLAY_NAME,
} from './skeleton.constants';
import styleSheet, { nativeStyles } from './skeleton.styles';
import type { SkeletonContextValue, SkeletonProps } from './skeleton.types';

const [SkeletonProvider, useSkeletonContext] =
  createContext<SkeletonContextValue>({
    name: 'SkeletonContext',
  });

// --------------------------------------------------

const ShimmerAnimation: React.FC = () => {
  const { shimmerConfig, componentWidth, offset, progress, screenWidth } =
    useSkeletonContext();

  const { theme } = useUniwind();
  const themeColorBackground = useThemeColor('background');

  const defaultHighlightColor =
    theme === 'dark'
      ? colorKit
          .setAlpha(
            colorKit.increaseBrightness(themeColorBackground, 10).hex(),
            0.5
          )
          .hex()
      : colorKit
          .setAlpha(
            colorKit.decreaseBrightness(themeColorBackground, 5).hex(),
            0.5
          )
          .hex();

  const highlightColor = shimmerConfig?.highlightColor ?? defaultHighlightColor;

  const gradientColors = ['transparent', highlightColor, 'transparent'];

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
      <LinearGradientComponent colors={gradientColors} />
    </Animated.View>
  );
};

// --------------------------------------------------

const PulseAnimation: React.FC<PropsWithChildren> = ({ children }) => {
  const { animationType, pulseConfig, progress } = useSkeletonContext();

  const pulseMinOpacity = pulseConfig?.minOpacity ?? DEFAULT_PULSE_MIN_OPACITY;
  const pulseMaxOpacity = pulseConfig?.maxOpacity ?? DEFAULT_PULSE_MAX_OPACITY;

  const pulseAnimatedStyle = useAnimatedStyle(() => {
    if (animationType !== 'pulse') {
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

  if (animationType === 'pulse') {
    return <Animated.View style={pulseAnimatedStyle}>{children}</Animated.View>;
  }

  return children;
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

  const { width: screenWidth } = useWindowDimensions();

  const shimmerDuration = shimmerConfig?.duration ?? DEFAULT_SHIMMER_DURATION;
  const shimmerEasing = shimmerConfig?.easing ?? DEFAULT_EASING;
  const shimmerSpeed = shimmerConfig?.speed ?? DEFAULT_SPEED;

  const pulseDuration = pulseConfig?.duration ?? DEFAULT_PULSE_DURATION;
  const pulseEasing = pulseConfig?.easing ?? Easing.inOut(Easing.ease);

  const tvStyles = styleSheet.skeleton({ className });

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

  const contextValue = useMemo<SkeletonContextValue>(
    () => ({
      isLoading,
      animationType,
      shimmerConfig,
      pulseConfig,
      progress,
      componentWidth,
      offset,
      screenWidth,
    }),
    [
      isLoading,
      animationType,
      shimmerConfig,
      pulseConfig,
      progress,
      componentWidth,
      offset,
      screenWidth,
    ]
  );

  if (!isLoading) {
    return (
      <Animated.View key="content" entering={entering} exiting={exiting}>
        {children}
      </Animated.View>
    );
  }

  return (
    <SkeletonProvider value={contextValue}>
      <PulseAnimation>
        <Animated.View
          key="skeleton"
          entering={entering}
          exiting={exiting}
          onLayout={handleLayout}
          style={[nativeStyles.borderCurve, style]}
          className={tvStyles}
          {...restProps}
        >
          {animationType === 'shimmer' && componentWidth > 0 && (
            <ShimmerAnimation />
          )}
        </Animated.View>
      </PulseAnimation>
    </SkeletonProvider>
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
export { useSkeletonContext };
