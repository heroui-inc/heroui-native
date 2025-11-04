import { useSelect } from 'heroui-native';
import { StyleSheet } from 'react-native';
import { interpolate, useDerivedValue } from 'react-native-reanimated';
import { useAppTheme } from '../../contexts/app-theme-context';
import { AnimatedBlurView } from '../animated-blur-view';

type Props = {
  maxIntensity?: number;
};

export const SelectBlurBackdrop = ({ maxIntensity }: Props) => {
  const { isDark } = useAppTheme();
  const { progress, isDragging } = useSelect();

  const blurIntensity = useDerivedValue(() => {
    const defaultMaxIntensityValue = isDark ? 75 : 50;
    const computedMaxIntensityValue = maxIntensity ?? defaultMaxIntensityValue;

    if (isDragging.get() && progress.get() <= 1) {
      return computedMaxIntensityValue;
    }

    return interpolate(
      progress.get(),
      [0, 1, 2],
      [0, computedMaxIntensityValue, 0]
    );
  });

  return (
    <AnimatedBlurView
      blurIntensity={blurIntensity}
      tint={isDark ? 'dark' : 'systemUltraThinMaterialLight'}
      style={StyleSheet.absoluteFill}
    />
  );
};
