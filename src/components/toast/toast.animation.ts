import { useWindowDimensions } from 'react-native';
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
import { useCombinedAnimationDisabledState } from '../../helpers/internal/hooks';
import {
  getAnimationValueMergedConfig,
  getAnimationValueProperty,
  getIsAnimationDisabledValue,
  getRootAnimationState,
} from '../../helpers/internal/utils';
import type { UseToastRootAnimationOptions } from './toast.types';

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
    easing: Easing.bezier(0.4, 0, 1, 1),
  },
}).duration(150);

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
    easing: Easing.bezier(0.4, 0, 1, 1),
  },
}).duration(150);

// --------------------------------------------------

/**
 * Animation hook for Toast root component
 * Handles opacity, translateY, and scale animations based on toast index and placement
 * Also handles gesture-based swipe to dismiss and rubber-band drag effects
 */
export function useToastRootAnimation(options: UseToastRootAnimationOptions) {
  const {
    animation,
    index,
    total,
    heights,
    placement,
    hide,
    id,
    isSwipeable = true,
    maxVisibleToasts = 3,
  } = options;

  const { height: screenHeight } = useWindowDimensions();

  const { animationConfig, isAnimationDisabled } =
    getRootAnimationState(animation);

  const isAllAnimationsDisabled = useCombinedAnimationDisabledState(animation);

  const isAnimationDisabledValue = getIsAnimationDisabledValue({
    isAnimationDisabled,
    isAllAnimationsDisabled,
  });

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

  // Gesture state shared values
  const isDragging = useSharedValue(false);
  const gestureTranslateY = useSharedValue(0);
  const gestureScale = useSharedValue(1);

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
    .enabled(!isAnimationDisabledValue && isSwipeable)
    .onBegin(() => {
      isDragging.set(true);
      gestureTranslateY.set(0);
      gestureScale.set(0.995);
    })
    .onChange((event) => {
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
    .onFinalize((event) => {
      gestureScale.set(1);

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
        if (shouldDismiss && translationY < 0 && id) {
          // Use withDecay to continue motion with velocity
          gestureTranslateY.set(
            withDecay(
              {
                velocity: velocityY * 1.5,
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
          gestureTranslateY.set(withSpring(0));
          isDragging.set(false);
        }
      } else {
        // Bottom placement: dismiss if swiped down (positive Y)
        if (shouldDismiss && translationY > 0 && id) {
          // Use withDecay to continue motion with velocity
          gestureTranslateY.set(
            withDecay(
              {
                velocity: velocityY * 1.5,
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
          gestureTranslateY.set(withSpring(0));
          isDragging.set(false);
        }
      }
    });

  const rContainerStyle = useAnimatedStyle(() => {
    const lastToastId = Object.keys(heights.get())[
      Object.keys(heights.get()).length - 1
    ];
    const lastToastHeight = lastToastId
      ? heights.get()[lastToastId]
      : undefined;

    const sign = placement === 'top' ? 1 : -1;

    const totalValue = total.get();

    const inputRange = [totalValue - 1, totalValue - 2];
    const opacityInputRange = [
      totalValue - maxVisibleToasts,
      totalValue - maxVisibleToasts - 1,
    ];

    const opacity = interpolate(index, opacityInputRange, opacityValue);

    // Handle translateY based on dragging state
    let translateY: number;
    let scale: number;
    if (isDragging.get()) {
      // During gesture: use gesture-based translateY
      translateY = gestureTranslateY.get();
      scale = gestureScale.get();
    } else {
      // Normal state: use stack-based interpolation
      translateY = interpolate(
        index,
        inputRange,
        [translateYValue[0], translateYValue[1] * sign],
        {
          extrapolateLeft: Extrapolation.CLAMP,
        }
      );
      scale = interpolate(index, inputRange, scaleValue, {
        extrapolateLeft: Extrapolation.CLAMP,
      });
    }

    if (isAnimationDisabledValue) {
      return {
        height: lastToastHeight,
        pointerEvents: opacity === 0 ? 'none' : 'auto',
        opacity,
        transform: [
          {
            translateY,
          },
          {
            scale,
          },
        ],
      };
    }

    return {
      height: lastToastHeight
        ? withSpring(lastToastHeight, {
            damping: 100,
            stiffness: 1200,
            mass: 3,
          })
        : undefined,
      pointerEvents: opacity === 0 ? 'none' : 'auto',
      opacity: withTiming(opacity, opacityTimingConfig),
      transform: [
        {
          translateY: isDragging.get()
            ? translateY
            : withTiming(translateY, translateYTimingConfig),
        },
        {
          scale: isDragging.get()
            ? withSpring(scale)
            : withTiming(scale, scaleTimingConfig),
        },
      ],
    };
  });

  // Determine entering and exiting animations based on placement
  const enteringAnimation =
    placement === 'top' ? enteringTopValue : enteringBottomValue;
  const exitingAnimation =
    placement === 'top' ? exitingTopValue : exitingBottomValue;

  return {
    rContainerStyle,
    isAllAnimationsDisabled,
    entering: isAnimationDisabledValue ? undefined : enteringAnimation,
    exiting: isAnimationDisabledValue ? undefined : exitingAnimation,
    panGesture,
  };
}
