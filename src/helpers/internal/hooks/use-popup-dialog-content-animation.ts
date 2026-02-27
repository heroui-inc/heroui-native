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
   * Dismiss direction shared value (0 = none, 1 = down, -1 = up)
   */
  dismissDirection?: SharedValue<number>;
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
  dismissDirection,
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

  useEffect(() => {
    if (isOpen) {
      progress.set(1);
    }
  }, [isOpen, progress]);

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const contentTranslateY = useDerivedValue(() => {
    if (progress.get() >= 1) {
      const maxDownDistance = screenHeight - contentY.get();
      return interpolate(
        progress.get(),
        [1, 2],
        [0, maxDownDistance],
        Extrapolation.CLAMP
      );
    }

    const maxUpDistance = contentY.get() + contentHeight.get();
    return interpolate(
      progress.get(),
      [0, 1],
      [-maxUpDistance, 0],
      Extrapolation.CLAMP
    );
  });

  const contentScale = useDerivedValue(() => {
    if (progress.get() >= 1) {
      return interpolate(
        progress.get(),
        [1, 2],
        [1, 0.95],
        Extrapolation.CLAMP
      );
    }
    return interpolate(progress.get(), [0, 1], [0.95, 1], Extrapolation.CLAMP);
  });

  const panGesture = useMemo(
    () =>
      Gesture.Pan()
        .enabled(isSwipeable && isOpen && !isAnimationDisabledValue)
        .onStart(() => isDragging.set(true))
        .onUpdate((event) => {
          if (!isDragging.get()) return;

          const maxDragDistance = screenHeight - contentY.get();

          if (event.translationY > 0) {
            const progressValue = 1 + event.translationY / maxDragDistance;
            progress.set(Math.max(1, Math.min(progressValue, 2)));
          } else if (event.translationY < 0) {
            const maxUpDragDistance = contentY.get() + contentHeight.get();
            const progressValue =
              1 - Math.abs(event.translationY) / maxUpDragDistance;
            progress.set(Math.max(0, Math.min(progressValue, 1)));
          }
        })
        .onFinalize(() => {
          progressAnchor.set(progress.get());
          contentTranslateYAnchor.set(contentTranslateY.get());
          contentScaleAnchor.set(contentScale.get());

          if (progress.get() > 1.1) {
            dismissDirection?.set(1);
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
              dismissDirection?.set(0);
            }, 350);
          } else if (progress.get() < 0.9) {
            dismissDirection?.set(-1);
            isGestureReleaseAnimationRunning.set(true);
            scheduleOnRN(dismissKeyboard);
            progress.set(
              withSpring(
                0,
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
              progress.set(0);
              scheduleOnRN(onOpenChange, false);
            }, 300);
            setTimeout(() => {
              progress.set(0);
              dismissDirection?.set(0);
            }, 350);
          } else {
            dismissDirection?.set(0);
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
      contentHeight,
      dismissDirection,
      isSwipeable,
      onOpenChange,
      progress,
      progressAnchor,
      screenHeight,
      isAnimationDisabledValue,
    ]
  );

  const rDragContainerStyle = useAnimatedStyle(() => {
    if (isGestureReleaseAnimationRunning.get()) {
      const anchor = progressAnchor.get();
      const tyAnchor = contentTranslateYAnchor.get();
      const sAnchor = contentScaleAnchor.get();

      if (anchor < 1) {
        return {
          opacity: interpolate(
            progress.get(),
            [0.25, 0.5, anchor, 1],
            [0, 1, 1, 1]
          ),
          transform: [
            {
              translateY: interpolate(
                progress.get(),
                [0, anchor - 0.1, anchor, 1, anchor],
                [tyAnchor + 150, tyAnchor - 50, tyAnchor, 0, tyAnchor]
              ),
            },
            {
              scale: interpolate(
                progress.get(),
                [0, anchor, 1, anchor],
                [0.75, sAnchor, 1, sAnchor]
              ),
            },
          ],
        };
      }

      return {
        opacity: interpolate(
          progress.get(),
          [1, anchor, 1.5, 1.75],
          [1, 1, 1, 0]
        ),
        transform: [
          {
            translateY: interpolate(
              progress.get(),
              [anchor, 1, anchor, anchor + 0.1, 2],
              [tyAnchor, 0, tyAnchor, tyAnchor + 50, tyAnchor - 150]
            ),
          },
          {
            scale: interpolate(
              progress.get(),
              [anchor, 1, anchor, 2],
              [sAnchor, 1, sAnchor, 0.75]
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
