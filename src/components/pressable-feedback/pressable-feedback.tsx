import {
  forwardRef,
  useCallback,
  useMemo,
  useRef,
  type FC,
} from 'react';
import {
  Pressable,
  type LayoutChangeEvent,
  type GestureResponderEvent,
  View,
} from 'react-native';

import Animated, {
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import type { PressableRef } from '../../helpers/types';
import {
  type PressableFeedbackProps,
  type PressableFeedbackState,
  type PressableFeedbackLayoutInfo,
  type HighlightComponentProps,
  type RippleComponentProps,
} from './pressable-feedback.types';
import {
  DISPLAY_NAME,
  DEFAULT_PRESSABLE_FEEDBACK_PLATFORM,
  DEFAULT_PRESSABLE_FEEDBACK_RIPPLE,
  DEFAULT_PRESSABLE_FEEDBACK_HIGHLIGHT,
} from './pressable-feedback.constants';
import pressableFeedbackStyles from './pressable-feedback.styles';
import {
  getDefaultVariant,
  calculateRippleRadius,
  isRippleConfig,
  isHighlightConfig,
} from './pressable-feedback.utils';
import { useRippleValue } from './pressable-feedback.hooks';

const AnimatedView = Animated.createAnimatedComponent(View);

// --------------------------------------------------

const HighlightComponent: FC<HighlightComponentProps> = ({ pressed, config }) => {
  const highlightStyle = useAnimatedStyle(() => {
    const isActive = pressed.value;

    return {
      ...pressableFeedbackStyles.highlightLayer,
      backgroundColor: config.color ?? DEFAULT_PRESSABLE_FEEDBACK_HIGHLIGHT.color,
      opacity: withTiming(
        isActive ? (config.opacity ?? DEFAULT_PRESSABLE_FEEDBACK_HIGHLIGHT.opacity) : 0,
        {
          duration: config.duration ?? DEFAULT_PRESSABLE_FEEDBACK_HIGHLIGHT.duration,
          easing: config.easing ?? DEFAULT_PRESSABLE_FEEDBACK_HIGHLIGHT.easing,
        }
      ),
    };
  });

  return <AnimatedView pointerEvents="none" style={highlightStyle} />;
};

// --------------------------------------------------

const RippleComponent: FC<RippleComponentProps> = ({ ripple, config }) => {
  const rippleStyle = useAnimatedStyle(() => {
    const diameter = ripple.radius.value * 2;

    return {
      ...pressableFeedbackStyles.rippleLayer,
      top: ripple.centerY.value - ripple.radius.value,
      left: ripple.centerX.value - ripple.radius.value,
      width: diameter,
      height: diameter,
      borderRadius: ripple.radius.value,
      backgroundColor: config.color ?? DEFAULT_PRESSABLE_FEEDBACK_RIPPLE.color,
      transform: [{ scale: ripple.scale.value }],
      opacity: ripple.opacity.value,
    };
  });

  return <AnimatedView pointerEvents="none" style={rippleStyle} />;
};

// --------------------------------------------------

const PressableFeedback = forwardRef<PressableRef, PressableFeedbackProps>(
  (props, ref) => {
    const {
      // Feedback props
      variant,
      animationConfig,
      isDisabled = false,

      // Pressable props
      className,
      children,
      onPress,
      onPressIn,
      onPressOut,
      onHoverIn,
      onHoverOut,
      onLayout,
      ...restProps
    } = props;

    // State management
    const hovered = useSharedValue(false);
    const pressed = useSharedValue(false);
    const layoutRef = useRef<PressableFeedbackLayoutInfo>({ width: 0, height: 0, x: 0, y: 0 });

    // Ripple management
    const ripplePool = useMemo(
      () => [useRippleValue(), useRippleValue(), useRippleValue()],
      []
    );

    // Determine active variant and config
    const activeVariant = useMemo(() => {
      return variant || getDefaultVariant(DEFAULT_PRESSABLE_FEEDBACK_PLATFORM);
    }, [variant]);

    const activeConfig = useMemo(() => {
      if (animationConfig) {
        return animationConfig;
      }

      return activeVariant === 'ripple'
        ? { variant: 'ripple' as const, ...DEFAULT_PRESSABLE_FEEDBACK_RIPPLE }
        : { variant: 'highlight' as const, ...DEFAULT_PRESSABLE_FEEDBACK_HIGHLIGHT };
    }, [animationConfig, activeVariant]);

    // Event handlers
    const handlePressIn = useCallback((event: GestureResponderEvent) => {
      if (isDisabled) return;

      pressed.value = true;
      onPressIn?.(event);

      // Handle ripple effect
      if (isRippleConfig(activeConfig) && !activeConfig.disabled) {
        const locationX = event.nativeEvent.locationX;
        const locationY = event.nativeEvent.locationY;

        const radius = calculateRippleRadius(layoutRef.current, locationX, locationY);
        const inactiveRipple = ripplePool.find((r) => r.active.value === 0);

        if (inactiveRipple) {
          cancelAnimation(inactiveRipple.scale);
          cancelAnimation(inactiveRipple.opacity);

          inactiveRipple.centerX.value = locationX;
          inactiveRipple.centerY.value = locationY;
          inactiveRipple.radius.value = radius;
          inactiveRipple.active.value = 1;
          inactiveRipple.scale.value = 0;
          inactiveRipple.opacity.value = 1;

          // Start scale animation
          inactiveRipple.scale.value = withTiming(
            1,
            {
              duration: activeConfig.duration ?? DEFAULT_PRESSABLE_FEEDBACK_RIPPLE.duration,
              easing: activeConfig.easing ?? DEFAULT_PRESSABLE_FEEDBACK_RIPPLE.easing,
            },
            (finished) => {
              if (finished) {
                // Fade out after expansion
                inactiveRipple.opacity.value = withTiming(
                  0,
                  {
                    duration: activeConfig.duration ?? DEFAULT_PRESSABLE_FEEDBACK_RIPPLE.duration,
                    easing: activeConfig.easing ?? DEFAULT_PRESSABLE_FEEDBACK_RIPPLE.easing,
                  },
                  (done) => {
                    if (done) {
                      inactiveRipple.scale.value = 0;
                      inactiveRipple.active.value = 0;
                    }
                  }
                );
              }
            }
          );
        }
      }
    }, [isDisabled, pressed, onPressIn, activeConfig, ripplePool]);

    const handlePressOut = useCallback((event: GestureResponderEvent) => {
      if (isDisabled) return;

      pressed.value = false;
      onPressOut?.(event);
    }, [isDisabled, pressed, onPressOut]);

    const handleHoverIn = useCallback((event: any) => {
      if (isDisabled) return;
      hovered.value = true;
      onHoverIn?.(event);
    }, [isDisabled, hovered, onHoverIn]);

    const handleHoverOut = useCallback((event: any) => {
      if (isDisabled) return;
      hovered.value = false;
      onHoverOut?.(event);
    }, [isDisabled, hovered, onHoverOut]);

    const handleLayout = useCallback((event: LayoutChangeEvent) => {
      layoutRef.current = {
        width: event.nativeEvent.layout.width,
        height: event.nativeEvent.layout.height,
        x: event.nativeEvent.layout.x,
        y: event.nativeEvent.layout.y,
      };
      onLayout?.(event);
    }, [onLayout]);

    // Container styles
    const tvStyles = pressableFeedbackStyles.root({
      className,
    })

    // Render children with state
    const renderChildren = useCallback(() => {
      const state: PressableFeedbackState = {
        hovered: hovered.value,
        pressed: pressed.value,
      };

      return typeof children === 'function'
        ? children(state)
        : children;
    }, [children, hovered.value, pressed.value]);

    return (
      <Pressable
        ref={ref}
        disabled={isDisabled}
        className={tvStyles}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onHoverIn={handleHoverIn}
        onHoverOut={handleHoverOut}
        onLayout={handleLayout}
        {...restProps}
      >
        {renderChildren()}

        {/* Feedback layers */}
        {isRippleConfig(activeConfig) && !activeConfig.disabled && !isDisabled && (
          <>
            {ripplePool.map((ripple, index) => (
              <RippleComponent
                key={index}
                ripple={ripple}
                config={activeConfig}
              />
            ))}
          </>
        )}

        {isHighlightConfig(activeConfig) && !activeConfig.disabled && !isDisabled && (
          <HighlightComponent
            pressed={pressed}
            config={activeConfig}
          />
        )}
      </Pressable>
    );
  }
);

// --------------------------------------------------

HighlightComponent.displayName = DISPLAY_NAME.HIGHLIGHT;
RippleComponent.displayName = DISPLAY_NAME.RIPPLE;
PressableFeedback.displayName = DISPLAY_NAME.ROOT;

/**
 * PressableFeedback component with visual feedback for user interactions.
 * Supports both ripple and highlight variants with platform-specific defaults.
 * 
 * @component PressableFeedback - Main pressable container that handles visual feedback
 * for user interactions. Provides ripple effect on Android and highlight effect on iOS by default.
 * 
 * The component can be used as a standalone pressable area or integrated into other components
 * like Button, Card, or Accordion for consistent feedback behavior.
 * 
 * @example
 * ```tsx
 * // Basic usage with platform defaults
 * <PressableFeedback>
 *   <Text>Press me!</Text>
 * </PressableFeedback>
 * 
 * // Custom configuration
 * <PressableFeedback
 *   variant="ripple"
 *   isDisabled={true}
 *   animationConfig={{
 *     variant: 'ripple',
 *     color: 'rgba(255, 0, 0, 0.3)',
 *     duration: 500,
 *   }}
 * >
 *   <Text>Custom Ripple</Text>
 * </PressableFeedback>
 * ```
 * 
 * @see Full documentation: https://heroui.com/components/pressable-feedback
 */
export default PressableFeedback;