import {
  cloneElement,
  createElement,
  forwardRef,
  isValidElement,
  type ComponentType,
} from 'react';
import {
  StyleSheet,
  View,
  type LayoutChangeEvent,
  type ViewStyle,
} from 'react-native';
import Animated, { useComposedEventHandler } from 'react-native-reanimated';
import { useThemeColor } from '../../helpers/external/hooks';
import { colorKit } from '../../helpers/external/utils';
import type { ViewRef } from '../../helpers/internal/types';
import { easeGradient } from '../../helpers/internal/utils';
import { useScrollShadowRootAnimation } from './scroll-shadow.animation';
import {
  BACKGROUND_IMAGE_STYLE_KEY,
  DEFAULT_SCROLL_EVENT_THROTTLE,
  DEFAULT_SHADOW_SIZE,
  SCROLL_SHADOW_DISPLAY_NAME,
} from './scroll-shadow.constants';
import {
  scrollShadowClassNames,
  scrollShadowStyleSheet,
} from './scroll-shadow.styles';
import type {
  ScrollShadowOrientation,
  ScrollShadowProps,
} from './scroll-shadow.types';

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

type GradientDirection = 'to bottom' | 'to top' | 'to right' | 'to left';

/**
 * Builds a `linear-gradient` background image style from eased color stops.
 * Uses `backgroundImage` on React Native 0.87+ and
 * `experimental_backgroundImage` on older versions.
 *
 * @param direction - CSS gradient direction (from the opaque edge outward)
 * @param colors - Gradient colors
 * @param locations - Gradient stop locations in the 0-1 range
 * @returns A view style that draws the gradient
 * @see https://reactnative.dev/docs/view-style-props#backgroundimage
 */
function createGradientStyle(
  direction: GradientDirection,
  colors: readonly string[],
  locations: readonly number[]
): ViewStyle {
  const colorStops = colors.map((stopColor, index) => ({
    color: stopColor,
    positions: [`${(locations[index] ?? 0) * 100}%`],
  }));

  return {
    [BACKGROUND_IMAGE_STYLE_KEY]: [
      { type: 'linear-gradient', direction, colorStops },
    ],
  } as ViewStyle;
}

/**
 * Returns the gradient directions for the top/left and bottom/right shadows.
 * Both shadows start opaque at the outer edge and fade toward the content.
 *
 * @param orientation - Scroll orientation
 */
function getGradientDirections(orientation: ScrollShadowOrientation): {
  topLeft: GradientDirection;
  bottomRight: GradientDirection;
} {
  return orientation === 'vertical'
    ? { topLeft: 'to bottom', bottomRight: 'to top' }
    : { topLeft: 'to right', bottomRight: 'to left' };
}

const ScrollShadowRoot = forwardRef<ViewRef, ScrollShadowProps>(
  (props, ref) => {
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

    const inverted =
      children?.props &&
      typeof children?.props === 'object' &&
      'inverted' in children.props
        ? children.props.inverted
        : false;

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

    // When inverted, swap which animated style drives each visual edge so that
    // shadows appear at the correct edge from the user's perspective.
    const topEdgeShadowStyle = inverted ? bottomShadowStyle : topShadowStyle;
    const bottomEdgeShadowStyle = inverted ? topShadowStyle : bottomShadowStyle;

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

    const { colors: topLeftColors, locations: topLeftLocations } = easeGradient(
      {
        colorStops: {
          0: {
            color: colorKit.setAlpha(shadowColor, 1).hex(),
          },
          1: {
            color: colorKit.setAlpha(shadowColor, 0).hex(),
          },
        },
      }
    );

    // Native gradients reuse the top/left stops (opaque at the outer edge) and
    // flip direction for the bottom/right edge.
    const directions = getGradientDirections(orientation);
    const topLeftGradientStyle = createGradientStyle(
      directions.topLeft,
      topLeftColors,
      topLeftLocations
    );
    const bottomRightGradientStyle = createGradientStyle(
      directions.bottomRight,
      topLeftColors,
      topLeftLocations
    );

    const isVertical = orientation === 'vertical';

    const topLeftShadowStyle = isVertical
      ? [scrollShadowStyleSheet.topShadow, { height: size }]
      : [scrollShadowStyleSheet.leftShadow, { width: size }];

    const bottomRightShadowStyle = isVertical
      ? [scrollShadowStyleSheet.bottomShadow, { height: size }]
      : [scrollShadowStyleSheet.rightShadow, { width: size }];

    // Legacy gradient direction for the deprecated `LinearGradientComponent`
    const legacyGradientDirection = isVertical
      ? undefined
      : { start: { x: 0, y: 0 }, end: { x: 1, y: 0 } };

    return (
      <View ref={ref} className={rootClassName} style={style} {...restProps}>
        {enhancedChild}

        {/* Top/Left Shadow */}
        {LinearGradientComponent ? (
          <Animated.View style={[topLeftShadowStyle, topEdgeShadowStyle]}>
            <LinearGradientComponent
              colors={topLeftColors}
              locations={topLeftLocations}
              {...legacyGradientDirection}
              style={StyleSheet.absoluteFill}
            />
          </Animated.View>
        ) : (
          <Animated.View
            style={[
              topLeftShadowStyle,
              topLeftGradientStyle,
              topEdgeShadowStyle,
            ]}
          />
        )}

        {/* Bottom/Right Shadow */}
        {LinearGradientComponent ? (
          <Animated.View
            style={[bottomRightShadowStyle, bottomEdgeShadowStyle]}
          >
            <LinearGradientComponent
              colors={[...topLeftColors].reverse()}
              locations={topLeftLocations
                .map((location) => 1 - location)
                .reverse()}
              {...legacyGradientDirection}
              style={StyleSheet.absoluteFill}
            />
          </Animated.View>
        ) : (
          <Animated.View
            style={[
              bottomRightShadowStyle,
              bottomRightGradientStyle,
              bottomEdgeShadowStyle,
            ]}
          />
        )}
      </View>
    );
  }
);

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
 * Shadows are drawn with the native `backgroundImage` style (`linear-gradient`),
 * so no gradient library is required. Passing the deprecated
 * `LinearGradientComponent` prop still renders that component instead.
 *
 * @see Full documentation: https://heroui.com/docs/native/components/scroll-shadow
 */

export default ScrollShadowRoot;
