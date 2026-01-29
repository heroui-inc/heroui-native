import React, {
  useCallback,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react';
import {
  StyleSheet,
  useWindowDimensions,
  type LayoutChangeEvent,
} from 'react-native';
import Animated, { useSharedValue } from 'react-native-reanimated';

import { AnimationSettingsProvider } from '../../helpers/internal/contexts';

import LinearGradientComponent from './linear-gradient';
import {
  SkeletonAnimationProvider,
  useSkeletonAnimation,
  useSkeletonPulseAnimation,
  useSkeletonRootAnimation,
  useSkeletonShimmerAnimation,
} from './skeleton.animation';
import { DISPLAY_NAME } from './skeleton.constants';
import { skeletonClassNames, skeletonStyleSheet } from './skeleton.styles';
import type { SkeletonProps } from './skeleton.types';

// --------------------------------------------------

const ShimmerAnimation: React.FC<{
  animation: SkeletonProps['animation'];
  isAnimatedStyleActive?: boolean;
}> = ({ animation, isAnimatedStyleActive = true }) => {
  const { rContainerStyle, gradientColors } = useSkeletonShimmerAnimation({
    animation,
  });

  const shimmerStyle = isAnimatedStyleActive
    ? [StyleSheet.absoluteFill, skeletonStyleSheet.borderCurve, rContainerStyle]
    : [StyleSheet.absoluteFill, skeletonStyleSheet.borderCurve];

  return (
    <Animated.View style={shimmerStyle}>
      <LinearGradientComponent colors={gradientColors} />
    </Animated.View>
  );
};

// --------------------------------------------------

const PulseAnimation: React.FC<
  PropsWithChildren<{
    animation: SkeletonProps['animation'];
    isAnimatedStyleActive?: boolean;
  }>
> = ({ children, animation, isAnimatedStyleActive = true }) => {
  const { variant } = useSkeletonAnimation();

  const { rContainerStyle } = useSkeletonPulseAnimation({
    animation,
  });

  if (variant === 'pulse') {
    const pulseStyle = isAnimatedStyleActive ? rContainerStyle : undefined;
    return <Animated.View style={pulseStyle}>{children}</Animated.View>;
  }

  return children;
};

// --------------------------------------------------

const Skeleton: React.FC<SkeletonProps> = (props) => {
  const {
    children,
    isLoading = true,
    variant = 'shimmer',
    animation,
    isAnimatedStyleActive = true,
    className,
    style,
    ...restProps
  } = props;

  const [componentWidth, setComponentWidth] = useState(0);
  const [offset, setOffset] = useState(0);

  const progress = useSharedValue(0);

  const { width: screenWidth } = useWindowDimensions();

  const { isAllAnimationsDisabled, entering, exiting } =
    useSkeletonRootAnimation({
      animation,
      isLoading,
      variant,
      progress,
    });

  const rootClassName = skeletonClassNames.root({ className });

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

  const animationContextValue = useMemo(
    () => ({
      isLoading,
      variant,
      progress,
      componentWidth,
      offset,
      screenWidth,
    }),
    [isLoading, variant, progress, componentWidth, offset, screenWidth]
  );

  const animationSettingsContextValue = useMemo(
    () => ({
      isAllAnimationsDisabled,
    }),
    [isAllAnimationsDisabled]
  );

  if (!isLoading) {
    return (
      <Animated.View key="content" entering={entering} exiting={exiting}>
        {children}
      </Animated.View>
    );
  }

  return (
    <AnimationSettingsProvider value={animationSettingsContextValue}>
      <SkeletonAnimationProvider value={animationContextValue}>
        <PulseAnimation
          animation={animation}
          isAnimatedStyleActive={isAnimatedStyleActive}
        >
          <Animated.View
            key="skeleton"
            entering={entering}
            exiting={exiting}
            onLayout={handleLayout}
            style={[skeletonStyleSheet.borderCurve, style]}
            className={rootClassName}
            {...restProps}
          >
            {variant === 'shimmer' && componentWidth > 0 && (
              <ShimmerAnimation
                animation={animation}
                isAnimatedStyleActive={isAnimatedStyleActive}
              />
            )}
          </Animated.View>
        </PulseAnimation>
      </SkeletonAnimationProvider>
    </AnimationSettingsProvider>
  );
};

// --------------------------------------------------

Skeleton.displayName = DISPLAY_NAME.SKELETON;

/**
 * Skeleton component for displaying loading placeholders
 *
 * @component Skeleton - Animated loading placeholder that can display shimmer or pulse effects.
 * Shows skeleton state when isLoading is true, otherwise displays children content.
 * Supports customizable animations through the animation prop with shimmer and pulse configurations.
 * Shape and size are controlled via className for maximum flexibility.
 *
 * @see Full documentation: https://v3.heroui.com/docs/native/components/skeleton
 */
export default Skeleton;
