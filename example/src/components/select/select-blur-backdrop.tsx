import { useSelect } from 'heroui-native';
import { StyleSheet } from 'react-native';
import { interpolate, useDerivedValue } from 'react-native-reanimated';
import { useUniwind } from 'uniwind';
import { AnimatedBlurView } from '../animated-blur-view';

export const SelectBlurBackdrop = () => {
  const { theme } = useUniwind();
  const { progress, isDragging } = useSelect();

  const blurIntensity = useDerivedValue(() => {
    const maxIntensity = theme === 'dark' ? 75 : 50;

    if (isDragging.get() && progress.get() <= 1) {
      return maxIntensity;
    }

    return interpolate(progress.get(), [0, 1, 2], [0, maxIntensity, 0]);
  });

  return (
    <AnimatedBlurView
      blurIntensity={blurIntensity}
      tint={theme === 'dark' ? 'dark' : 'systemUltraThinMaterialLight'}
      style={StyleSheet.absoluteFill}
    />
  );
};
