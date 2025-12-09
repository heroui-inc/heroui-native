import { Toast, type ToastComponentProps } from 'heroui-native';
import { useCallback, useEffect } from 'react';
import { View } from 'react-native';
import Animated, {
  LinearTransition,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { withUniwind } from 'uniwind';
import { useSharedState } from './use-shared-state';

const StyleAnimatedView = withUniwind(Animated.View);

const PROGRESS_STATE_KEY = 'progress-toast-state';

/**
 * Hook to access and update shared progress state
 * Can be used in both parent component and toast component
 *
 * When setProgress is called, all components using this hook will re-render
 * with the new progress value, even if they're memoized or rendered separately
 *
 * @param initialProgress - Initial progress value (0-100)
 */
export const useProgressState = (initialProgress = 0) => {
  const {
    state: progress,
    setState: setProgressState,
    resetState,
  } = useSharedState<number>(PROGRESS_STATE_KEY, initialProgress);

  /**
   * Set progress state with clamping between 0 and 100
   *
   * @param newProgress - Progress value (0-100)
   */
  const setProgress = useCallback(
    (newProgress: number) => {
      /**
       * Clamp progress between 0 and 100
       */
      const clampedProgress = Math.max(0, Math.min(100, newProgress));
      setProgressState(clampedProgress);
    },
    [setProgressState]
  );

  /**
   * Reset progress to initial value (0)
   */
  const resetProgress = useCallback(() => {
    resetState();
  }, [resetState]);

  return { progress, setProgress, resetProgress };
};

/**
 * Progress toast component that shows a progress bar at the bottom
 * Progress value ranges from 0 to 100
 */
export const ProgressToast = (props: ToastComponentProps) => {
  const { id, hide } = props;
  const { progress } = useProgressState();

  /**
   * Animated progress value for smooth transitions
   */
  const animatedProgress = useSharedValue(progress);

  /**
   * Update animated value when progress changes
   */
  useEffect(() => {
    animatedProgress.value = withTiming(progress, {
      duration: 300,
    });
  }, [progress, animatedProgress]);

  /**
   * Auto-hide toast when progress reaches 100%
   */
  useEffect(() => {
    if (progress >= 100) {
      const timeoutId = setTimeout(() => {
        hide(id);
      }, 500);

      return () => {
        clearTimeout(timeoutId);
      };
    }
    return undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress, id]);

  /**
   * Animated style for progress bar
   */
  const progressBarStyle = useAnimatedStyle(() => {
    return {
      width: `${animatedProgress.value}%`,
    };
  });

  return (
    <Toast
      // @ts-ignore
      layout={LinearTransition.springify().mass(2)}
      isSwipeable={false}
      {...props}
    >
      <View className="flex-col gap-2 px-4 py-3">
        <Toast.Title className="text-sm mb-2">
          {progress < 100
            ? `Uploading... ${Math.round(progress)}%`
            : 'Upload complete!'}
        </Toast.Title>
        <View className="h-1 w-full overflow-hidden rounded-full bg-muted/20">
          <StyleAnimatedView
            className="h-full bg-accent rounded-full"
            style={progressBarStyle}
          />
        </View>
      </View>
    </Toast>
  );
};
