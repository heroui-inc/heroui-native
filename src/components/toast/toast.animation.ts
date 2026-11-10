import { useCallback, useMemo } from 'react';
import { useWindowDimensions, type LayoutChangeEvent } from 'react-native';
import { Gesture } from 'react-native-gesture-handler';
import {
  Easing,
  Extrapolation,
  FadeInDown,
  FadeInUp,
  interpolate,
  Keyframe,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withDecay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { isRNRuntime, scheduleOnRN } from 'react-native-worklets';
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

/**
 * Spring used when a toast takes the height of the front toast
 */
const HEIGHT_SPRING_CONFIG = {
  damping: 100,
  stiffness: 1200,
  mass: 3,
};

/**
 * Scale of a toast while it is dragged
 */
const DRAG_SCALE = 0.995;

/**
 * Fade of the covers when a toast moves behind the front toast or back to the
 * front, and when the front toast starts being dragged
 */
const COVER_TIMING_CONFIG = { duration: 150 };

// --------------------------------------------------

/**
 * Animation hook for Toast root component.
 *
 * Everything here runs on the UI thread from shared values, so a toast does
 * not re-render when the toasts around it change:
 * - Stack position: opacity, translateY and scale from the toast's live index
 *   in the stack (`stack` from the provider, `index` / `total` outside it).
 * - Height: the front toast keeps its natural height, the toasts behind it
 *   spring to the front toast's height.
 * - Covers: the content of toasts behind the front one is hidden, and shown
 *   again while the front toast is dragged away.
 * - Swipe to dismiss with a rubber-band effect against the dismiss direction.
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
    stack,
    getStack,
    frontDrag,
    timers,
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

  /**
   * Height handling. The front toast lays out at its natural height
   * (`isHeightFree`); every toast behind it springs an explicit height to the
   * front toast's natural height, so a smaller toast in front hides the
   * taller ones behind it. Natural heights are recorded in `heights`. All of
   * this runs on the UI thread from `useAnimatedReaction`, without React
   * re-renders.
   */
  const isHeightFree = useSharedValue(true);
  const animatedHeight = useSharedValue(0);

  /**
   * Whether the toast is stacked behind the front toast (`1`) or is the front
   * toast (`0`). Drives the opacity of both covers; the full cover also
   * clears while the front toast is dragged (`frontDrag`).
   */
  const isCovered = useSharedValue(0);

  useAnimatedReaction(
    () => {
      const heightsValue = heights.get();
      let isFront: boolean;
      let frontId: string | undefined;
      if (stack) {
        const stackValue = stack.get();
        frontId = stackValue.frontId;
        isFront = id !== undefined && stackValue.frontId === id;
      } else {
        // Rendered outside the provider: the newest measured toast is in front
        const heightIds = Object.keys(heightsValue);
        frontId = heightIds[heightIds.length - 1];
        isFront = index === total.get() - 1;
      }
      return {
        isFront,
        front: frontId !== undefined ? heightsValue[frontId] : undefined,
        own: id !== undefined ? heightsValue[id] : undefined,
      };
    },
    (current) => {
      isCovered.set(current.isFront ? 0 : 1);

      if (current.isFront) {
        if (isHeightFree.get()) return;

        // Coming back to the front: spring to its own natural height, then
        // release the explicit height so content changes can resize it.
        if (current.own === undefined || isAnimationDisabledValue) {
          isHeightFree.set(true);
          return;
        }
        animatedHeight.set(
          withSpring(current.own, HEIGHT_SPRING_CONFIG, (finished) => {
            if (finished) isHeightFree.set(true);
          })
        );
        return;
      }

      const target = current.front;
      if (target === undefined) return;

      if (isHeightFree.get()) {
        // Pin the current natural height first so switching from `auto` to
        // an explicit height does not jump.
        animatedHeight.set(current.own ?? target);
        isHeightFree.set(false);
      }

      animatedHeight.set(
        isAnimationDisabledValue
          ? target
          : withSpring(target, HEIGHT_SPRING_CONFIG)
      );
    }
    // No dependency array: on native, Reanimated re-registers the reaction
    // whenever the captured closure changes.
  );

  /**
   * Writes the natural height of this toast to `heights` on the UI thread.
   * An unchanged height does not notify the animated styles that read it.
   * With `onlyWhenFree`, heights measured under an explicit (stacked) height
   * are ignored.
   */
  const recordHeight = useCallback(
    (measuredHeight: number, onlyWhenFree: boolean) => {
      if (id === undefined) return;
      heights.modify((value) => {
        'worklet';
        if (
          (onlyWhenFree && !isHeightFree.get()) ||
          value[id] === measuredHeight
        ) {
          return value;
        }
        return { ...value, [id]: measuredHeight };
      }, false);
    },
    [heights, id, isHeightFree]
  );

  /**
   * Records the height measured synchronously at mount. Every toast mounts
   * at its natural height, so the value is valid even for a toast that
   * mounts behind the stack.
   */
  const recordMountHeight = useCallback(
    (measuredHeight: number) => recordHeight(measuredHeight, false),
    [recordHeight]
  );

  /**
   * Keeps the natural height up to date when the content of the front toast
   * changes size after mount.
   */
  const onLayout = useCallback(
    (event: LayoutChangeEvent) =>
      recordHeight(event.nativeEvent.layout.height, true),
    [recordHeight]
  );

  /**
   * Gesture objects are memoized: a new `Gesture.Pan()` on every render makes
   * `GestureDetector` reattach its native handler.
   */
  const panGesture = useMemo(() => {
    // Delays the hide call based on velocity so the decay animation can play
    const delayedHide = (toastId: string, velocity: number) => {
      const velocityBasedTimeout = Math.min(200, Math.abs(velocity));
      setTimeout(() => {
        hide?.(toastId);
      }, velocityBasedTimeout);
    };

    return Gesture.Pan()
      .enabled(!isAnimationDisabledValue && isSwipeable)
      .onBegin(() => {
        isDragging.set(true);
        gestureTranslateY.set(0);
        // Keep the toast on screen while the user holds it
        if (id && timers) scheduleOnRN(timers.pause, id);
      })
      .onStart(() => {
        // The drag has started (not just a touch): let the toasts behind the
        // front toast show their content while it is moved away
        if (frontDrag && stack && stack.get().frontId === id) {
          frontDrag.set(1);
        }
      })
      .onChange((event) => {
        if (!isDragging.get()) return;

        const translationY = event.translationY;
        const maxDragDistance = screenHeight;
        const rubberEffectDistance = 40;

        if (placement === 'top') {
          // Top placement: swipe up (negative Y) to dismiss, drag down (positive Y) with rubber effect
          if (translationY < 0) {
            gestureTranslateY.set(translationY);
          } else if (translationY > 0) {
            gestureTranslateY.set(
              interpolate(
                translationY,
                [0, maxDragDistance],
                [0, rubberEffectDistance],
                Extrapolation.CLAMP
              )
            );
          }
        } else {
          // Bottom placement: swipe down (positive Y) to dismiss, drag up (negative Y) with rubber effect
          if (translationY > 0) {
            gestureTranslateY.set(translationY);
          } else if (translationY < 0) {
            gestureTranslateY.set(
              -interpolate(
                Math.abs(translationY),
                [0, maxDragDistance],
                [0, rubberEffectDistance],
                Extrapolation.CLAMP
              )
            );
          }
        }
      })
      .onFinalize((event) => {
        const translationY = event.translationY;
        const velocityY = event.velocityY;
        const dismissThreshold = 50;
        const velocityThreshold = 500;

        // Dismiss when the distance is over 50px or the velocity is over 500
        const shouldDismiss =
          Math.abs(translationY) > dismissThreshold ||
          Math.abs(velocityY) > velocityThreshold;

        const isDismissDirection =
          placement === 'top' ? translationY < 0 : translationY > 0;

        if (shouldDismiss && isDismissDirection && id) {
          // Continue the motion with the release velocity
          gestureTranslateY.set(
            withDecay(
              {
                velocity: velocityY * 1.5,
                clamp:
                  placement === 'top'
                    ? [Number.NEGATIVE_INFINITY, 0]
                    : [0, Number.POSITIVE_INFINITY],
              },
              () => {
                isDragging.set(false);
              }
            )
          );
          // Delay the hide call so the decay animation can play
          scheduleOnRN(delayedHide, id, velocityY);
        } else {
          // Animate back to 0
          gestureTranslateY.set(withSpring(0));
          isDragging.set(false);
          // Not dismissed: cover the toasts behind it again
          frontDrag?.set(0);
          if (id && timers) scheduleOnRN(timers.resume, id);
        }
      });
  }, [
    gestureTranslateY,
    hide,
    id,
    isAnimationDisabledValue,
    isDragging,
    isSwipeable,
    placement,
    screenHeight,
    stack,
    frontDrag,
    timers,
  ]);

  const rContainerStyle = useAnimatedStyle(() => {
    const sign = placement === 'top' ? 1 : -1;

    // Live stack position; falls back to the props outside the provider.
    // The first run happens on the JS thread at mount: read the plain store
    // snapshot there, since `stack.get()` on the JS thread blocks on a
    // synchronous call to the UI thread after every stack change.
    const stackValue = isRNRuntime() && getStack ? getStack() : stack?.get();
    const totalValue = stackValue ? stackValue.total : total.get();
    const currentIndex =
      (id !== undefined ? stackValue?.positions[id] : undefined) ?? index;

    const inputRange = [totalValue - 1, totalValue - 2];
    const opacityInputRange = [
      totalValue - maxVisibleToasts,
      totalValue - maxVisibleToasts - 1,
    ];

    const opacity = interpolate(currentIndex, opacityInputRange, opacityValue);

    const pointerEvents = opacity <= 0 ? 'none' : 'auto';

    // During a drag the gesture drives translateY and scale
    if (isDragging.get()) {
      return {
        pointerEvents,
        opacity: isAnimationDisabledValue
          ? opacity
          : withTiming(opacity, opacityTimingConfig),
        transform: [
          { translateY: gestureTranslateY.get() },
          {
            // Slight press-in while the toast is held
            scale: isAnimationDisabledValue
              ? DRAG_SCALE
              : withSpring(DRAG_SCALE),
          },
        ],
      };
    }

    // Stack position: toasts behind the front one move away and shrink
    const translateY = interpolate(
      currentIndex,
      inputRange,
      [translateYValue[0], translateYValue[1] * sign],
      {
        extrapolateLeft: Extrapolation.CLAMP,
      }
    );
    const scale = interpolate(currentIndex, inputRange, scaleValue, {
      extrapolateLeft: Extrapolation.CLAMP,
    });

    if (isAnimationDisabledValue) {
      return {
        pointerEvents,
        opacity,
        transform: [{ translateY }, { scale }],
      };
    }

    return {
      pointerEvents,
      opacity: withTiming(opacity, opacityTimingConfig),
      transform: [
        { translateY: withTiming(translateY, translateYTimingConfig) },
        { scale: withTiming(scale, scaleTimingConfig) },
      ],
    };
  });

  /**
   * Height of the toast root. Kept on the root (which clips its content)
   * while the stack transform lives on a wrapper view: Android clips a scaled
   * view against its unscaled bounds, so scaling the clipping view itself
   * lets a strip of overflowing content show at its bottom edge.
   */
  const rRootStyle = useAnimatedStyle(() => ({
    // `auto` lets the front toast lay out (and be measured) at its natural height
    height: isHeightFree.get() ? 'auto' : animatedHeight.get(),
  }));

  /**
   * Full cover: hides all content of a stacked toast, except while the front
   * toast is dragged, so the next toast is readable as the front one is
   * swiped away.
   */
  const rCoverStyle = useAnimatedStyle(() => {
    const coverOpacity = frontDrag?.get() === 1 ? 0 : isCovered.get();
    return {
      opacity: isAnimationDisabledValue
        ? coverOpacity
        : withTiming(coverOpacity, COVER_TIMING_CONFIG),
    };
  });

  /**
   * Edge cover: hides the cut-off bottom line of content in the visible strip
   * of a stacked toast. Unlike the full cover it stays while the front toast
   * is dragged.
   */
  const rCoverEdgeStyle = useAnimatedStyle(() => {
    const edgeOpacity = isCovered.get();
    return {
      opacity: isAnimationDisabledValue
        ? edgeOpacity
        : withTiming(edgeOpacity, COVER_TIMING_CONFIG),
    };
  });

  // Determine entering and exiting animations based on placement
  const enteringAnimation =
    placement === 'top' ? enteringTopValue : enteringBottomValue;
  const exitingAnimation =
    placement === 'top' ? exitingTopValue : exitingBottomValue;

  return {
    rContainerStyle,
    rRootStyle,
    rCoverStyle,
    rCoverEdgeStyle,
    onLayout,
    recordMountHeight,
    isAllAnimationsDisabled,
    entering: isAnimationDisabledValue ? undefined : enteringAnimation,
    exiting: isAnimationDisabledValue ? undefined : exitingAnimation,
    panGesture,
  };
}
