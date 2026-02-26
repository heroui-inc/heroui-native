import { useSelect } from 'heroui-native';
import { useEffect } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import {
  interpolate,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useAppTheme } from '../../../contexts/app-theme-context';
import { AnimatedBlurView } from '../../animated-blur-view';

type Props = {
  maxIntensity?: number;
};

export const BlurBackdrop = ({ maxIntensity }: Props) => {
  const { isDark } = useAppTheme();
  const { isOpen, onOpenChange } = useSelect();

  const progress = useSharedValue(0);

  useEffect(() => {
    progress.set(
      withTiming(isOpen ? 1 : 0, {
        duration: 200,
      })
    );
  }, [isOpen, progress]);

  const blurIntensity = useDerivedValue(() => {
    const defaultMaxIntensityValue = isDark ? 75 : 50;
    const computedMaxIntensityValue = maxIntensity ?? defaultMaxIntensityValue;

    return interpolate(progress.get(), [0, 1], [0, computedMaxIntensityValue]);
  });

  return (
    <Pressable
      style={StyleSheet.absoluteFill}
      onPress={() => onOpenChange(false)}
    >
      <AnimatedBlurView
        blurIntensity={blurIntensity}
        tint={isDark ? 'dark' : 'light'}
        style={StyleSheet.absoluteFill}
      />
    </Pressable>
  );
};
