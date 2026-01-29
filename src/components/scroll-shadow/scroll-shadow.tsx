import {
  cloneElement,
  createElement,
  forwardRef,
  isValidElement,
  type ComponentType,
} from 'react';
import { StyleSheet, View, type LayoutChangeEvent } from 'react-native';
import Animated, { useComposedEventHandler } from 'react-native-reanimated';
import { useThemeColor } from '../../helpers/external/hooks';
import { colorKit } from '../../helpers/external/utils';
import { easeGradient } from '../../helpers/internal/utils';
import { useScrollShadowRootAnimation } from './scroll-shadow.animation';
import {
  DEFAULT_SCROLL_EVENT_THROTTLE,
  DEFAULT_SHADOW_SIZE,
  SCROLL_SHADOW_DISPLAY_NAME,
} from './scroll-shadow.constants';
import {
  scrollShadowClassNames,
  scrollShadowStyleSheet,
} from './scroll-shadow.styles';
import type { ScrollShadowProps } from './scroll-shadow.types';

/**
 * Cache for animated components to prevent remounting on every render.
 * Using WeakMap ensures components are garbage collected when no longer referenced.
 */
const animatedComponentCache = new WeakMap<
  ComponentType<any>,
  ComponentType<any>
>();

/**
 * Gets or creates a cached animated component for the given component type.
 * This prevents creating new component types on every render, which would cause
 * React to treat them as different components and trigger unmount/remount cycles.
 *
 * @param ComponentType - The original component type to create an animated version of
 * @returns The cached animated component type
 */
function getAnimatedComponent(
  ComponentType: ComponentType<any>
): ComponentType<any> {
  let cached = animatedComponentCache.get(ComponentType);
  if (!cached) {
    try {
      cached = Animated.createAnimatedComponent(ComponentType);
      animatedComponentCache.set(ComponentType, cached);
    } catch (error) {
      throw new Error(
        `ScrollShadow: Failed to create animated component: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  }
  return cached;
}

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
    animation,
    ...restProps
  } = props;

  const themeColorBackground = useThemeColor('background');
  const shadowColor = color || themeColorBackground;

  const rootClassName = scrollShadowClassNames.root({ className });

  const childHorizontal =
    children?.props &&
    typeof children?.props === 'object' &&
    'horizontal' in children.props
      ? children.props.horizontal
      : false;
  const orientation =
    orientationProp || (childHorizontal ? 'horizontal' : 'vertical');

  // Get all animation logic from root hook
  const {
    contentSize,
    containerSize,
    localScrollHandler,
    topShadowStyle,
    bottomShadowStyle,
  } = useScrollShadowRootAnimation({
    animation,
    orientation,
    size,
    visibility,
    isEnabled,
  });

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
    : createElement(getAnimatedComponent(children.type as any), {
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
    <View ref={ref} className={rootClassName} style={style} {...restProps}>
      {enhancedChild}

      {/* Top/Left Shadow */}
      {orientation === 'vertical' ? (
        <Animated.View
          style={[
            scrollShadowStyleSheet.topShadow,
            { height: size },
            topShadowStyle,
          ]}
        >
          <LinearGradientComponent
            colors={topLeftColors}
            locations={topLeftLocations}
            style={StyleSheet.absoluteFill}
          />
        </Animated.View>
      ) : (
        <Animated.View
          style={[
            scrollShadowStyleSheet.leftShadow,
            { width: size },
            topShadowStyle,
          ]}
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
            scrollShadowStyleSheet.bottomShadow,
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
          style={[
            scrollShadowStyleSheet.rightShadow,
            { width: size },
            bottomShadowStyle,
          ]}
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
 * @see Full documentation: https://v3.heroui.com/docs/native/components/scroll-shadow
 */

export default ScrollShadowRoot;
