import { cloneElement, createElement, forwardRef, isValidElement } from 'react';
import { StyleSheet, View, type LayoutChangeEvent } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useComposedEventHandler,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { colorKit, useThemeColor } from '../../helpers/theme';
import { easeGradient } from '../../helpers/utils';
import {
  DEFAULT_SCROLL_EVENT_THROTTLE,
  DEFAULT_SHADOW_SIZE,
  SCROLL_SHADOW_DISPLAY_NAME,
  SHADOW_EXIT_ANIMATION_DURATION,
} from './scroll-shadow.constants';
import { nativeStyles, scrollShadowStyles } from './scroll-shadow.styles';
import type { ScrollShadowProps } from './scroll-shadow.types';

const ScrollShadowRoot = forwardRef<View, ScrollShadowProps>((props, ref) => {
  const {
    children,
    size = DEFAULT_SHADOW_SIZE,
    orientation: orientationProp,
    visibility = 'auto',
    color,
    isEnabled = true,
    className,
    style,
    LinearGradientComponent,
    ...restProps
  } = props;

  const themeColorBackground = useThemeColor('background');
  const shadowColor = color || themeColorBackground;

  const containerStyles = scrollShadowStyles({ className });

  const childHorizontal =
    children?.props &&
    typeof children?.props === 'object' &&
    'horizontal' in children.props
      ? children.props.horizontal
      : false;
  const orientation =
    orientationProp || (childHorizontal ? 'horizontal' : 'vertical');

  const scrollOffset = useSharedValue(0);
  const contentSize = useSharedValue(0);
  const containerSize = useSharedValue(0);

  const localScrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      const offset =
        orientation === 'vertical'
          ? event.contentOffset.y
          : event.contentOffset.x;
      scrollOffset.set(offset);
    },
  });

  const topShadowOpacity = useDerivedValue(() => {
    if (!isEnabled)
      return withTiming(0, { duration: SHADOW_EXIT_ANIMATION_DURATION });

    if (visibility === 'none')
      return withTiming(0, { duration: SHADOW_EXIT_ANIMATION_DURATION });
    if (visibility === 'bottom' || visibility === 'right')
      return withTiming(0, { duration: SHADOW_EXIT_ANIMATION_DURATION });

    return interpolate(
      scrollOffset.get(),
      [0, size / 4],
      [0, 1],
      Extrapolation.CLAMP
    );
  });

  const bottomShadowOpacity = useDerivedValue(() => {
    if (!isEnabled)
      return withTiming(0, { duration: SHADOW_EXIT_ANIMATION_DURATION });

    if (visibility === 'none')
      return withTiming(0, { duration: SHADOW_EXIT_ANIMATION_DURATION });
    if (visibility === 'top' || visibility === 'left')
      return withTiming(0, { duration: SHADOW_EXIT_ANIMATION_DURATION });

    return interpolate(
      scrollOffset.get() + containerSize.get(),
      [contentSize.get() - size / 4, contentSize.get()],
      [1, 0],
      Extrapolation.CLAMP
    );
  });

  const topShadowStyle = useAnimatedStyle(() => ({
    opacity: topShadowOpacity.get(),
  }));

  const bottomShadowStyle = useAnimatedStyle(() => ({
    opacity: bottomShadowOpacity.get(),
  }));

  const onContentSizeChange = (w: number, h: number) => {
    const contentDimension = orientation === 'vertical' ? h : w;
    contentSize.set(contentDimension);
    (children as any).props?.onContentSizeChange?.(w, h);
  };

  const onLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    const containerDimension = orientation === 'vertical' ? height : width;
    containerSize.set(containerDimension);
    (children as any).props?.onLayout?.(event);
  };

  const outerScrollHandler = (children as any).props?.onScroll;
  const handlers = outerScrollHandler
    ? [localScrollHandler, outerScrollHandler]
    : [localScrollHandler];

  const onScroll = useComposedEventHandler(handlers);

  const scrollEventThrottle =
    (children as any).props?.scrollEventThrottle ||
    DEFAULT_SCROLL_EVENT_THROTTLE;

  if (!isValidElement(children)) {
    return null;
  }

  const isAnimatedComponent =
    (children.type as any)?.displayName?.includes('AnimatedComponent') ||
    (children.type as any)?.__isAnimatedComponent;

  const enhancedChild = isAnimatedComponent
    ? cloneElement(children as any, {
        onContentSizeChange,
        onLayout,
        scrollEventThrottle,
        onScroll,
      })
    : createElement(Animated.createAnimatedComponent(children.type as any), {
        ...(children as any).props,
        onContentSizeChange,
        onLayout,
        scrollEventThrottle,
        onScroll,
      });

  const { colors: topLeftColors, locations: topLeftLocations } = easeGradient({
    colorStops: {
      0: {
        color: colorKit.setAlpha(shadowColor, 1).hex(),
      },
      1: {
        color: colorKit.setAlpha(shadowColor, 0).hex(),
      },
    },
  });

  const { colors: bottomRightColors, locations: bottomRightLocations } =
    easeGradient({
      colorStops: {
        0: {
          color: colorKit.setAlpha(shadowColor, 0).hex(),
        },
        1: {
          color: colorKit.setAlpha(shadowColor, 1).hex(),
        },
      },
    });

  return (
    <View ref={ref} className={containerStyles} style={style} {...restProps}>
      {enhancedChild}

      {/* Top/Left Shadow */}
      {orientation === 'vertical' ? (
        <Animated.View
          style={[nativeStyles.topShadow, { height: size }, topShadowStyle]}
        >
          <LinearGradientComponent
            colors={topLeftColors}
            locations={topLeftLocations}
            style={StyleSheet.absoluteFill}
          />
        </Animated.View>
      ) : (
        <Animated.View
          style={[nativeStyles.leftShadow, { width: size }, topShadowStyle]}
        >
          <LinearGradientComponent
            colors={topLeftColors}
            locations={topLeftLocations}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={StyleSheet.absoluteFill}
          />
        </Animated.View>
      )}

      {/* Bottom/Right Shadow */}
      {orientation === 'vertical' ? (
        <Animated.View
          style={[
            nativeStyles.bottomShadow,
            { height: size },
            bottomShadowStyle,
          ]}
        >
          <LinearGradientComponent
            colors={bottomRightColors}
            locations={bottomRightLocations}
            style={StyleSheet.absoluteFill}
          />
        </Animated.View>
      ) : (
        <Animated.View
          style={[nativeStyles.rightShadow, { width: size }, bottomShadowStyle]}
        >
          <LinearGradientComponent
            colors={bottomRightColors}
            locations={bottomRightLocations}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={StyleSheet.absoluteFill}
          />
        </Animated.View>
      )}
    </View>
  );
});

ScrollShadowRoot.displayName = SCROLL_SHADOW_DISPLAY_NAME.ROOT;

/**
 * Compound ScrollShadow component
 *
 * @component ScrollShadow - Main container that wraps any scrollable component and adds
 * dynamic gradient shadows at the edges. Automatically detects scroll position and content
 * overflow to show/hide shadows intelligently.
 *
 * The component intercepts scroll events from the child scrollable component and manages
 * shadow visibility based on scroll position and content size. Supports both vertical
 * and horizontal orientations.
 *
 * @see Full documentation: https://heroui.com/components/scroll-shadow
 */

export default ScrollShadowRoot;
