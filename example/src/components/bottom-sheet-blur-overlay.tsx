import { BottomSheet, useBottomSheetAnimation } from 'heroui-native';
import { StyleSheet } from 'react-native';
import { interpolate, useDerivedValue } from 'react-native-reanimated';
import { useAppTheme } from '../contexts/app-theme-context';
import { AnimatedBlurView } from './animated-blur-view';

export const BottomSheetBlurOverlay = () => {
  const { isDark } = useAppTheme();
  const { progress } = useBottomSheetAnimation();

  const blurIntensity = useDerivedValue(() => {
    return interpolate(progress.get(), [0, 1, 2], [0, 40, 0]);
  });

  return (
    <BottomSheet.Close style={StyleSheet.absoluteFill}>
      <AnimatedBlurView
        blurIntensity={blurIntensity}
        tint={isDark ? 'dark' : 'systemUltraThinMaterialDark'}
        style={StyleSheet.absoluteFill}
      />
    </BottomSheet.Close>
  );
};
