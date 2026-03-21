import { useEffect, useMemo } from 'react';
import { Keyboard, useWindowDimensions } from 'react-native';
import { Gesture } from 'react-native-gesture-handler';
import type { SharedValue } from 'react-native-reanimated';
import {
  Easing,
  Extrapolation,
  interpolate,
  Keyframe,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  type EntryOrExitLayoutType,
} from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';
import { useAnimationSettings } from '../contexts/animation-settings-context';
import type { PopupDialogContentAnimation } from '../types/animation';
import {
  getAnimationState,
  getIsAnimationDisabledValue,
} from '../utils/animation';

export interface UsePopupDialogContentAnimationProps {
  /**
   * Whether the dialog is open
   */
  isOpen: boolean;
  /**
   * Progress shared value (0 = closed, 1 = open, 2 = closing)
   */
  progress: SharedValue<number>;
  /**
   * Whether user is currently dragging
   */
  isDragging: SharedValue<boolean>;
  /**
   * Gesture release animation running state shared value
   */
  isGestureReleaseAnimationRunning: SharedValue<boolean>;
  /**
   * Callback when dialog open state changes
   */
  onOpenChange: (open: boolean) => void;
  /**
   * Animation configuration for content
   */
  animation?: PopupDialogContentAnimation;
  /**
   * Whether the dialog content can be swiped to dismiss
   * @default true
   */
  isSwipeable?: boolean;
}

/**
 * Default entering animation for dialog content
 * Dialog content animates with scale and opacity transitions
 */
const DEFAULT_ENTERING_ANIMATION: EntryOrExitLayoutType = new Keyframe({
  0: {
    transform: [{ scale: 0.96 }],
    opacity: 0,
  },
  100: {
    transform: [{ scale: 1 }],
    opacity: 1,
    easing: Easing.out(Easing.ease),
  },
}).duration(200);

/**
 * Default exiting animation for dialog content
 * Mirrors the entering animation - content exits with fade out and scale down
 */
const DEFAULT_EXITING_ANIMATION: EntryOrExitLayoutType = new Keyframe({
  0: {
    transform: [{ scale: 1 }],
    opacity: 1,
  },
  100: {
    transform: [{ scale: 0.96 }],
    opacity: 0,
    easing: Easing.in(Easing.ease),
  },
}).duration(150);

export const usePopupDialogContentAnimation = ({
  isOpen,
  progress,
  isDragging,
  isGestureReleaseAnimationRunning,
  onOpenChange,
  animation,
  isSwipeable = true,
}: UsePopupDialogContentAnimationProps) => {
  const { height: screenHeight } = useWindowDimensions();

  const { isAllAnimationsDisabled } = useAnimationSettings();

  const { animationConfig, isAnimationDisabled } = getAnimationState(animation);

  const isAnimationDisabledValue = getIsAnimationDisabledValue({
    isAnimationDisabled,
    isAllAnimationsDisabled,
  });

  // Get entering animation value with default Keyframe animation
  const enteringValue = animationConfig?.entering ?? DEFAULT_ENTERING_ANIMATION;

  // Get exiting animation value with default Keyframe animation
  const exitingValue = animationConfig?.exiting ?? DEFAULT_EXITING_ANIMATION;

  const contentY = useSharedValue(0);
  const contentHeight = useSharedValue(0);
  const progressAnchor = useSharedValue(1);
  const contentTranslateYAnchor = useSharedValue(0);
  const contentScaleAnchor = useSharedValue(1);
  const gestureTranslationY = useSharedValue(0);

  useEffect(() => {
    if (isOpen) {
      progress.set(1);
    }
  }, [isOpen, progress]);

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const contentTranslateY = useDerivedValue(() => {
    const maxDragDistance = screenHeight - contentY.get();

    if (progress.get() >= 1) {
      return interpolate(
        progress.get(),
        [1, 2],
        [0, maxDragDistance],
        Extrapolation.CLAMP
      );
    }

    const absoluteGestureTranslationY = Math.abs(gestureTranslationY.get());

    return interpolate(
      absoluteGestureTranslationY,
      [0, screenHeight],
      [0, -50],
      Extrapolation.CLAMP
    );
  });

  const contentScale = useDerivedValue(() => {
    return interpolate(progress.get(), [1, 2], [1, 0.95], Extrapolation.CLAMP);
  });

  const panGesture = useMemo(
    () =>
      Gesture.Pan()
        .enabled(isSwipeable && isOpen && !isAnimationDisabledValue)
        .onStart(() => isDragging.set(true))
        .onUpdate((event) => {
          if (!isDragging.get()) return;

          const maxDragDistance = screenHeight - contentY.get();

          gestureTranslationY.set(event.translationY);

          if (event.translationY > 0) {
            const progressValue = 1 + event.translationY / maxDragDistance;
            progress.set(Math.max(1, Math.min(progressValue, 2)));
          } else if (event.translationY < 0) {
            const progressValue =
              1 - Math.abs(event.translationY) / contentY.get();
            progress.set(Math.max(0, Math.min(progressValue, 1)));
          }
        })
        .onFinalize(() => {
          progressAnchor.set(progress.get());
          contentTranslateYAnchor.set(contentTranslateY.get());
          contentScaleAnchor.set(contentScale.get());

          if (progress.get() > 1.1) {
            isGestureReleaseAnimationRunning.set(true);
            scheduleOnRN(dismissKeyboard);
            progress.set(
              withSpring(
                2,
                {
                  mass: 4,
                  damping: 120,
                  stiffness: 900,
                  overshootClamping: false,
                },
                () => {
                  isGestureReleaseAnimationRunning.set(false);
                }
              )
            );
            isDragging.set(false);
            setTimeout(() => {
              progress.set(2);
              scheduleOnRN(onOpenChange, false);
            }, 300);
            setTimeout(() => {
              progress.set(0);
            }, 350);
          } else {
            isGestureReleaseAnimationRunning.set(true);
            progress.set(
              withSpring(1, {}, () => {
                isGestureReleaseAnimationRunning.set(false);
              })
            );
            isDragging.set(false);
          }
        }),
    [
      contentScale,
      contentScaleAnchor,
      contentTranslateY,
      contentTranslateYAnchor,
      contentY,
      isOpen,
      isDragging,
      isGestureReleaseAnimationRunning,
      isSwipeable,
      onOpenChange,
      progress,
      progressAnchor,
      screenHeight,
      isAnimationDisabledValue,
      gestureTranslationY,
    ]
  );

  const rDragContainerStyle = useAnimatedStyle(() => {
    if (isGestureReleaseAnimationRunning.get()) {
      return {
        opacity: interpolate(
          progress.get(),
          [1, progressAnchor.get(), 1.5, 1.75],
          [1, 1, 1, 0]
        ),
        transform: [
          {
            translateY: interpolate(
              progress.get(),
              [
                progressAnchor.get(),
                1,
                progressAnchor.get(),
                progressAnchor.get() + 0.1,
                2,
              ],
              [
                contentTranslateYAnchor.get(),
                0,
                contentTranslateYAnchor.get(),
                contentTranslateYAnchor.get() + 50,
                contentTranslateYAnchor.get() - 150,
              ]
            ),
          },
          {
            scale: interpolate(
              progress.get(),
              [progressAnchor.get(), 1, progressAnchor.get(), 2],
              [contentScaleAnchor.get(), 1, contentScaleAnchor.get(), 0.75]
            ),
          },
        ],
      };
    }

    return {
      transform: [
        {
          translateY: contentTranslateY.get(),
        },
        {
          scale: contentScale.get(),
        },
      ],
    };
  });

  return {
    contentY,
    contentHeight,
    panGesture,
    rDragContainerStyle,
    entering: isAnimationDisabledValue ? undefined : enteringValue,
    exiting: isAnimationDisabledValue ? undefined : exitingValue,
  };
};
