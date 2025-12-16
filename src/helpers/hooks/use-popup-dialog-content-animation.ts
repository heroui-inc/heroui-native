import { useMemo } from 'react';
import type { ViewStyle } from 'react-native';
import { Keyboard, useWindowDimensions } from 'react-native';
import { Gesture } from 'react-native-gesture-handler';
import type { SharedValue } from 'react-native-reanimated';
import {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { scheduleOnRN } from 'react-native-worklets';
import { useAnimationSettings } from '../contexts/animation-settings-context';
import type { PopupDialogContentAnimation } from '../types/animation';
import {
  getAnimationState,
  getAnimationValueProperty,
  getIsAnimationDisabledValue,
  getStyleProperties,
  getStyleTransform,
} from '../utils/animation';
import { useKeyboardStatus } from './use-keyboard-status';

export interface UsePopupDialogContentAnimationProps {
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
   * Current dialog state
   */
  dialogState: 'idle' | 'open' | 'close';
  /**
   * Callback when dialog open state changes
   */
  onOpenChange: (open: boolean) => void;
  /**
   * Animation configuration for content
   */
  animation?: PopupDialogContentAnimation;
  /**
   * Style prop for handling style overrides
   */
  style?: ViewStyle;
  /**
   * Whether the dialog content can be swiped to dismiss
   * @default true
   */
  isSwipeable?: boolean;
}

export const usePopupDialogContentAnimation = ({
  progress,
  isDragging,
  isGestureReleaseAnimationRunning,
  dialogState,
  onOpenChange,
  animation,
  style,
  isSwipeable = true,
}: UsePopupDialogContentAnimationProps) => {
  const { height: screenHeight } = useWindowDimensions();
  const isKeyboardOpen = useKeyboardStatus();

  const { isAllAnimationsDisabled } = useAnimationSettings();

  const { animationConfig, isAnimationDisabled } = getAnimationState(animation);

  const isAnimationDisabledValue = getIsAnimationDisabledValue({
    isAnimationDisabled,
    isAllAnimationsDisabled,
  });

  const contentY = useSharedValue(0);
  const contentHeight = useSharedValue(0);
  const progressAnchor = useSharedValue(1);
  const contentTranslateYAnchor = useSharedValue(0);
  const contentScaleAnchor = useSharedValue(1);

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const contentTranslateY = useDerivedValue(() => {
    const maxDragDistance = screenHeight - contentY.get();

    return interpolate(
      progress.get(),
      [0, 1, 2],
      [-maxDragDistance * 0.1, 0, maxDragDistance],
      Extrapolation.CLAMP
    );
  });

  const contentScale = useDerivedValue(() => {
    return interpolate(progress.get(), [1, 2], [1, 0.95], Extrapolation.CLAMP);
  });

  const panGesture = useMemo(
    () =>
      Gesture.Pan()
        .enabled(
          isSwipeable && dialogState === 'open' && !isAnimationDisabledValue
        )
        .onStart(() => isDragging.set(true))
        .onUpdate((event) => {
          if (!isDragging.get()) return;

          const maxDragDistance = screenHeight - contentY.get();

          if (event.translationY > 0) {
            const progressValue = 1 + event.translationY / maxDragDistance;
            progress.set(progressValue);
          } else if (event.translationY < 0 && !isKeyboardOpen) {
            const progressValue =
              1 - Math.abs(event.translationY) / contentY.get();
            progress.set(progressValue);
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
              scheduleOnRN(onOpenChange, false);
            }, 300);
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
      dialogState,
      isDragging,
      isKeyboardOpen,
      isGestureReleaseAnimationRunning,
      isSwipeable,
      onOpenChange,
      progress,
      progressAnchor,
      screenHeight,
      isAnimationDisabledValue,
    ]
  );

  const rDragContainerStyle = useAnimatedStyle(() => {
    if (!isDragging.get() && !isGestureReleaseAnimationRunning.get()) {
      return {};
    }

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

  // Opacity animation
  const opacityValue = getAnimationValueProperty({
    animationValue: animationConfig?.opacity,
    property: 'value',
    defaultValue: [0, 1, 0] as [number, number, number],
  });

  // Scale animation
  const scaleValue = getAnimationValueProperty({
    animationValue: animationConfig?.scale,
    property: 'value',
    defaultValue: [0.97, 1, 0.97] as [number, number, number],
  });

  // Extract style overrides OUTSIDE useAnimatedStyle
  const styleProps = getStyleProperties(style, ['opacity']);
  const styleTransform = getStyleTransform(style);

  const rContainerStyle = useAnimatedStyle(() => {
    // Handle disabled state first
    if (isAnimationDisabledValue) {
      return {
        opacity: progress.get() > 0 ? 1 : 0,
        ...styleProps,
      };
    }

    // Handle dragging state - when dragging, opacity should be 1
    if (isDragging.get() || isGestureReleaseAnimationRunning.get()) {
      return {
        opacity: 1,
      };
    }

    // Animated state
    const currentProgress = progress.get();
    const targetOpacity = interpolate(currentProgress, [0, 1, 2], opacityValue);
    const targetScale = interpolate(currentProgress, [0, 1, 2], scaleValue);

    return {
      opacity: targetOpacity,
      transform: [{ scale: targetScale }, ...styleTransform],
      ...styleProps,
    };
  });

  return {
    contentY,
    contentHeight,
    panGesture,
    rDragContainerStyle,
    rContainerStyle,
  };
};
