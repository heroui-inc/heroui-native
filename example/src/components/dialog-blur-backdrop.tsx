import { useDialog, useDialogAnimation } from 'heroui-native';
import { Pressable, StyleSheet } from 'react-native';
import { interpolate, useDerivedValue } from 'react-native-reanimated';
import { useAppTheme } from '../contexts/app-theme-context';
import { AnimatedBlurView } from './animated-blur-view';

export const DialogBlurBackdrop = () => {
  const { isDark } = useAppTheme();
  const { onOpenChange } = useDialog();
  const { progress, isDragging, isGestureReleaseAnimationRunning } =
    useDialogAnimation();

  const blurIntensity = useDerivedValue(() => {
    const maxIntensity = isDark ? 75 : 50;

    if (
      (isDragging.get() || isGestureReleaseAnimationRunning.get()) &&
      progress.get() <= 1
    ) {
      return maxIntensity;
    }

    return interpolate(progress.get(), [0, 1, 2], [0, maxIntensity, 0]);
  });

  return (
    <Pressable
      style={StyleSheet.absoluteFill}
      onPress={() => onOpenChange(false)}
    >
      <AnimatedBlurView
        blurIntensity={blurIntensity}
        tint={isDark ? 'dark' : 'systemUltraThinMaterialDark'}
        style={StyleSheet.absoluteFill}
      />
    </Pressable>
  );
};
