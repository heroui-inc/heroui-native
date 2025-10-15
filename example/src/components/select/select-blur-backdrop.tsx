import { useSelect, useTheme } from 'heroui-native';
import { StyleSheet } from 'react-native';
import { interpolate, useDerivedValue } from 'react-native-reanimated';
import { AnimatedBlurView } from '../animated-blur-view';

export const SelectBlurBackdrop = () => {
  const { isDark } = useTheme();
  const { progress, isDragging } = useSelect();

  const blurIntensity = useDerivedValue(() => {
    const maxIntensity = isDark ? 75 : 50;

    if (isDragging.get() && progress.get() <= 1) {
      return maxIntensity;
    }

    return interpolate(progress.get(), [0, 1, 2], [0, maxIntensity, 0]);
  });

  return (
    <AnimatedBlurView
      blurIntensity={blurIntensity}
      tint={isDark ? 'dark' : 'systemUltraThinMaterialDark'}
      style={StyleSheet.absoluteFill}
    />
  );
};
