import { useWindowDimensions, type ViewStyle } from 'react-native';
import { Gesture } from 'react-native-gesture-handler';
import {
  Easing,
  Extrapolation,
  FadeInDown,
  FadeInUp,
  interpolate,
  Keyframe,
  useAnimatedStyle,
  useSharedValue,
  withDecay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';
import {
  getAnimationState,
  getAnimationValueMergedConfig,
  getAnimationValueProperty,
  getStyleProperties,
  getStyleTransform,
} from '../../helpers/utils/animation';
import type { ToastPlacement, ToastRootAnimation } from './toast.types';

// --------------------------------------------------

export const enteringTop = FadeInUp.springify()
  .withInitialValues({
    opacity: 1,
    transform: [{ translateY: -100 }],
  })
  .mass(3);

export const exitingTop = new Keyframe({
  0: {
    opacity: 1,
    transform: [{ translateY: 0 }, { scale: 1 }],
  },
  100: {
    opacity: 0.5,
    transform: [{ translateY: -100 }, { scale: 0.97 }],
    easing: Easing.in(Easing.ease),
  },
}).duration(200);

export const enteringBottom = FadeInDown.springify()
  .withInitialValues({
    opacity: 1,
    transform: [{ translateY: 100 }],
  })
  .mass(3);

export const exitingBottom = new Keyframe({
  0: {
    opacity: 1,
    transform: [{ translateY: 0 }, { scale: 1 }],
  },
  100: {
    opacity: 0.5,
    transform: [{ translateY: 100 }, { scale: 0.97 }],
    easing: Easing.in(Easing.ease),
  },
}).duration(200);

// --------------------------------------------------

/**
 * Animation hook for Toast root component
 * Handles opacity, translateY, and scale animations based on toast index and placement
 * Also handles gesture-based swipe to dismiss and rubber-band drag effects
 */
export function useToastRootAnimation(options: {
  animation: ToastRootAnimation | undefined;
  style: ViewStyle | undefined;
  index: number;
  total: number;
  placement: ToastPlacement;
  hide?: ((ids?: string | string[]) => void) | undefined;
  id?: string | undefined;
  isSwipable?: boolean;
}) {
  const {
    animation,
    style,
    index,
    total,
    placement,
    hide,
    id,
    isSwipable = true,
  } = options;

  const { height: screenHeight } = useWindowDimensions();

  const { animationConfig, isAnimationDisabled } = getAnimationState(animation);

  // Entering animation
  const enteringTopValue = getAnimationValueProperty({
    animationValue: animationConfig?.entering,
    property: 'top',
    defaultValue: enteringTop,
  });

  const enteringBottomValue = getAnimationValueProperty({
    animationValue: animationConfig?.entering,
    property: 'bottom',
    defaultValue: enteringBottom,
  });

  // Exiting animation
  const exitingTopValue = getAnimationValueProperty({
    animationValue: animationConfig?.exiting,
    property: 'top',
    defaultValue: exitingTop,
  });

  const exitingBottomValue = getAnimationValueProperty({
    animationValue: animationConfig?.exiting,
    property: 'bottom',
    defaultValue: exitingBottom,
  });

  // Opacity animation
  const opacityValue = getAnimationValueProperty({
    animationValue: animationConfig?.opacity,
    property: 'value',
    defaultValue: [1, 0] as [number, number],
  });

  const opacityTimingConfig = getAnimationValueMergedConfig({
    animationValue: animationConfig?.opacity,
    property: 'timingConfig',
    defaultValue: { duration: 300 },
  });

  // TranslateY animation
  const translateYValue = getAnimationValueProperty({
    animationValue: animationConfig?.translateY,
    property: 'value',
    defaultValue: [0, 10] as [number, number],
  });

  const translateYTimingConfig = getAnimationValueMergedConfig({
    animationValue: animationConfig?.translateY,
    property: 'timingConfig',
    defaultValue: { duration: 300 },
  });

  // Scale animation
  const scaleValue = getAnimationValueProperty({
    animationValue: animationConfig?.scale,
    property: 'value',
    defaultValue: [1, 0.97] as [number, number],
  });

  const scaleTimingConfig = getAnimationValueMergedConfig({
    animationValue: animationConfig?.scale,
    property: 'timingConfig',
    defaultValue: { duration: 300 },
  });

  // Extract style overrides OUTSIDE useAnimatedStyle
  const styleProps = getStyleProperties(style, ['opacity']);
  const styleTransform = getStyleTransform(style);

  // Gesture state shared values
  const isDragging = useSharedValue(false);
  const gestureTranslateY = useSharedValue(0);

  // Helper function to delay hide call based on velocity
  const delayedHide = (toastId: string | undefined, velocity: number) => {
    const velocityBasedTimeout = Math.min(200, Math.abs(velocity));
    setTimeout(() => {
      if (hide && toastId) {
        hide(toastId);
      }
    }, velocityBasedTimeout);
  };

  // Create pan gesture handler
  const panGesture = Gesture.Pan()
    .enabled(!isAnimationDisabled && isSwipable)
    .onStart(() => {
      isDragging.set(true);
      gestureTranslateY.set(0);
    })
    .onUpdate((event) => {
      if (!isDragging.get()) return;

      const translationY = event.translationY;
      const maxDragDistance = screenHeight;
      const rubberEffectDistance = 40;

      if (placement === 'top') {
        // Top placement: swipe up (negative Y) to dismiss, drag down (positive Y) with rubber effect
        if (translationY < 0) {
          // Swiping up - direct translation for dismissal
          gestureTranslateY.set(translationY);
        } else if (translationY > 0) {
          // Dragging down - apply rubber effect
          const rubberTranslateY = interpolate(
            translationY,
            [0, maxDragDistance],
            [0, rubberEffectDistance],
            Extrapolation.CLAMP
          );
          gestureTranslateY.set(rubberTranslateY);
        }
      } else {
        // Bottom placement: swipe down (positive Y) to dismiss, drag up (negative Y) with rubber effect
        if (translationY > 0) {
          // Swiping down - direct translation for dismissal
          gestureTranslateY.set(translationY);
        } else if (translationY < 0) {
          // Dragging up - apply rubber effect
          const rubberTranslateY = interpolate(
            Math.abs(translationY),
            [0, maxDragDistance],
            [0, rubberEffectDistance],
            Extrapolation.CLAMP
          );
          gestureTranslateY.set(-rubberTranslateY);
        }
      }
    })
    .onEnd((event) => {
      const translationY = event.translationY;
      const velocityY = event.velocityY;
      const dismissThreshold = 50;
      const velocityThreshold = 500;

      // Check if dismissal threshold is met (distance > 50px OR velocity > 500)
      const shouldDismiss =
        Math.abs(translationY) > dismissThreshold ||
        Math.abs(velocityY) > velocityThreshold;

      if (placement === 'top') {
        // Top placement: dismiss if swiped up (negative Y)
        if (shouldDismiss && translationY < 0 && id && hide) {
          // Use withDecay to continue motion with velocity
          gestureTranslateY.set(
            withDecay(
              {
                velocity: velocityY,
                clamp: [Number.NEGATIVE_INFINITY, 0],
              },
              () => {
                isDragging.set(false);
              }
            )
          );
          // Delay hide call to allow decay animation to play
          scheduleOnRN(delayedHide, id, velocityY);
        } else {
          // Animate back to 0
          gestureTranslateY.set(
            withSpring(0, {}, () => {
              isDragging.set(false);
            })
          );
        }
      } else {
        // Bottom placement: dismiss if swiped down (positive Y)
        if (shouldDismiss && translationY > 0 && id && hide) {
          // Use withDecay to continue motion with velocity
          gestureTranslateY.set(
            withDecay(
              {
                velocity: velocityY,
                clamp: [0, Number.POSITIVE_INFINITY],
              },
              () => {
                isDragging.set(false);
              }
            )
          );
          // Delay hide call to allow decay animation to play
          scheduleOnRN(delayedHide, id, velocityY);
        } else {
          // Animate back to 0
          gestureTranslateY.set(
            withSpring(0, {}, () => {
              isDragging.set(false);
            })
          );
        }
      }
    });

  const rContainerStyle = useAnimatedStyle(() => {
    const sign = placement === 'top' ? 1 : -1;

    const inputRange = [total - 1, total - 2];
    const opacityInputRange = [total - 3, total - 4];

    const opacity = interpolate(index, opacityInputRange, opacityValue);
    const scale = interpolate(index, inputRange, scaleValue);

    // Handle translateY based on dragging state
    let translateY: number;
    if (isDragging.get()) {
      // During gesture: use gesture-based translateY
      translateY = gestureTranslateY.get();
    } else {
      // Normal state: use stack-based interpolation
      translateY = interpolate(index, inputRange, [
        translateYValue[0],
        translateYValue[1] * sign,
      ]);
    }

    if (isAnimationDisabled) {
      return {
        pointerEvents: opacity === 0 ? 'none' : 'auto',
        opacity,
        transform: [
          {
            translateY,
          },
          {
            scale,
          },
          ...styleTransform,
        ],
        ...styleProps,
      };
    }

    return {
      pointerEvents: opacity === 0 ? 'none' : 'auto',
      opacity: withTiming(opacity, opacityTimingConfig),
      transform: [
        {
          translateY: isDragging.get()
            ? translateY
            : withTiming(translateY, translateYTimingConfig),
        },
        {
          scale: withTiming(scale, scaleTimingConfig),
        },
        ...styleTransform,
      ],
      ...styleProps,
    };
  });

  // Determine entering and exiting animations based on placement
  const enteringAnimation =
    placement === 'top' ? enteringTopValue : enteringBottomValue;
  const exitingAnimation =
    placement === 'top' ? exitingTopValue : exitingBottomValue;

  return {
    rContainerStyle,
    isAnimationDisabled,
    entering: isAnimationDisabled ? undefined : enteringAnimation,
    exiting: isAnimationDisabled ? undefined : exitingAnimation,
    panGesture,
  };
}
