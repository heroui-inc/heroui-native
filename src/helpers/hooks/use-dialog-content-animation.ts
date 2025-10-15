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
import { useKeyboardStatus } from './use-keyboard-status';

export interface UseDialogContentAnimationProps {
  /**
   * Progress shared value (0 = closed, 1 = open, 2 = closing)
   */
  progress: SharedValue<number>;
  /**
   * Whether user is currently dragging
   */
  isDragging: SharedValue<boolean>;
  /**
   * Current dialog state
   */
  dialogState: 'idle' | 'open' | 'close';
  /**
   * Callback when dialog open state changes
   */
  onOpenChange: (open: boolean) => void;
  /**
   * Whether to disable default animations
   * @default false
   */
  isDefaultAnimationDisabled?: boolean;
}

export const useDialogContentAnimation = ({
  progress,
  isDragging,
  dialogState,
  onOpenChange,
  isDefaultAnimationDisabled = false,
}: UseDialogContentAnimationProps) => {
  const { height: screenHeight } = useWindowDimensions();
  const isKeyboardOpen = useKeyboardStatus();

  const contentY = useSharedValue(0);
  const contentHeight = useSharedValue(0);
  const isOnEndAnimationRunning = useSharedValue(false);
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

  const panGesture = Gesture.Pan()
    .enabled(dialogState === 'open')
    .onStart(() => {
      if (isOnEndAnimationRunning.get()) return;
      isDragging.set(true);
    })
    .onUpdate((event) => {
      if (!isDragging.get()) return;

      const maxDragDistance = screenHeight - contentY.get();

      if (event.translationY > 0) {
        const progressValue = 1 + event.translationY / maxDragDistance;
        progress.set(progressValue);
      } else if (event.translationY < 0 && !isKeyboardOpen) {
        const progressValue = 1 - Math.abs(event.translationY) / contentY.get();
        progress.set(progressValue);
      }
    })
    .onEnd(() => {
      progressAnchor.set(progress.get());
      contentTranslateYAnchor.set(contentTranslateY.get());
      contentScaleAnchor.set(contentScale.get());

      if (progress.get() > 1.1) {
        isOnEndAnimationRunning.set(true);
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
              isOnEndAnimationRunning.set(false);
              isDragging.set(false);
            }
          )
        );
        setTimeout(() => {
          scheduleOnRN(onOpenChange, false);
        }, 300);
      } else {
        progress.set(
          withSpring(1, {}, () => {
            isDragging.set(false);
          })
        );
      }
    });

  const rDragContainerStyle = useAnimatedStyle(() => {
    if (!isDragging.get()) {
      return {};
    }

    if (isOnEndAnimationRunning.get()) {
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
              [1, progressAnchor.get(), progressAnchor.get() + 0.1, 2],
              [
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
              [1, progressAnchor.get(), 2],
              [1, contentScaleAnchor.get(), 0.75]
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

  const rContainerStyle = useAnimatedStyle(() => {
    if (isDragging.get()) {
      return { opacity: 1 };
    }

    if (isDefaultAnimationDisabled) {
      return {};
    }

    return {
      opacity: interpolate(progress.get(), [0, 1, 2], [0, 1, 0]),
      transform: [
        {
          scale: interpolate(progress.get(), [0, 1, 2], [0.97, 1, 0.97]),
        },
      ],
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
