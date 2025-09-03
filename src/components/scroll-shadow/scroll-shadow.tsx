import { LinearGradient } from 'expo-linear-gradient';
import React, { forwardRef, useRef } from 'react';
import {
  StyleSheet,
  View,
  type LayoutChangeEvent,
  type NativeScrollEvent,
} from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from 'react-native-reanimated';
import { easeGradient } from '../../helpers/utils';
import { colorKit, useTheme } from '../../providers/theme';
import {
  DEFAULT_SCROLL_EVENT_THROTTLE,
  DEFAULT_SHADOW_SIZE,
  SCROLL_SHADOW_DISPLAY_NAME,
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
    ...restProps
  } = props;

  const theme = useTheme();
  const shadowColor = color || theme.colors.background;

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

  const userScrollHandler = useRef((children as any).props?.onScroll);
  userScrollHandler.current = (children as any).props?.onScroll;

  const containerStyles = scrollShadowStyles({ className });

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event: NativeScrollEvent) => {
      'worklet';
      const offset =
        orientation === 'vertical'
          ? event.contentOffset.y
          : event.contentOffset.x;
      scrollOffset.set(offset);

      // Chain user's handler if exists
      if (userScrollHandler.current) {
        const handler = userScrollHandler.current;

        // Check if it's a reanimated handler object with onScroll method
        if (
          typeof handler === 'object' &&
          handler !== null &&
          'onScroll' in handler
        ) {
          if (typeof handler.onScroll === 'function') {
            handler.onScroll(event);
          }
        } else if (typeof handler === 'function') {
          // It's a regular function or worklet
          if (handler.__workletHash || handler._isReanimatedHandler) {
            // It's a worklet, call it directly
            handler(event);
          } else {
            // Regular JS function
            runOnJS(handler)(event);
          }
        }
      }
    },
    onBeginDrag: userScrollHandler.current?.onBeginDrag,
    onEndDrag: userScrollHandler.current?.onEndDrag,
    onMomentumBegin: userScrollHandler.current?.onMomentumBegin,
    onMomentumEnd: userScrollHandler.current?.onMomentumEnd,
  });

  const topShadowOpacity = useDerivedValue(() => {
    if (!isEnabled) return 0;

    if (visibility === 'none') return 0;
    if (visibility === 'bottom' || visibility === 'right') return 0;

    return interpolate(
      scrollOffset.get(),
      [0, size / 4],
      [0, 1],
      Extrapolation.CLAMP
    );
  });

  const bottomShadowOpacity = useDerivedValue(() => {
    if (!isEnabled) return 0;

    if (visibility === 'none') return 0;
    if (visibility === 'top' || visibility === 'left') return 0;

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

  const handleContentSizeChange = (w: number, h: number) => {
    const contentDimension = orientation === 'vertical' ? h : w;
    contentSize.value = contentDimension;
    (children as any).props?.onContentSizeChange?.(w, h);
  };

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width, height } = event.nativeEvent.layout;
    const containerDimension = orientation === 'vertical' ? height : width;
    containerSize.value = containerDimension;
    (children as any).props?.onLayout?.(event);
  };

  // Check if the child is already an Animated component
  const isAnimatedComponent =
    (children.type as any)?.displayName?.includes('AnimatedComponent') ||
    (children.type as any)?.__isAnimatedComponent;

  // Create animated version if needed
  const ChildComponent = isAnimatedComponent
    ? children.type
    : Animated.createAnimatedComponent(children.type as any);

  // Create enhanced child with the animated component
  const enhancedChild = React.createElement(ChildComponent, {
    ...(children as any).props,
    onScroll: scrollHandler,
    onContentSizeChange: handleContentSizeChange,
    onLayout: handleLayout,
    scrollEventThrottle:
      (children as any).props?.scrollEventThrottle ||
      DEFAULT_SCROLL_EVENT_THROTTLE,
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
          <LinearGradient
            colors={topLeftColors}
            locations={topLeftLocations}
            style={StyleSheet.absoluteFill}
          />
        </Animated.View>
      ) : (
        <Animated.View
          style={[nativeStyles.leftShadow, { width: size }, topShadowStyle]}
        >
          <LinearGradient
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
          <LinearGradient
            colors={bottomRightColors}
            locations={bottomRightLocations}
            style={StyleSheet.absoluteFill}
          />
        </Animated.View>
      ) : (
        <Animated.View
          style={[nativeStyles.rightShadow, { width: size }, bottomShadowStyle]}
        >
          <LinearGradient
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
