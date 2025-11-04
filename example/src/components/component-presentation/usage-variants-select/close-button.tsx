import * as Haptics from 'expo-haptics';
import { Button, useSelect, useThemeColor } from 'heroui-native';
import { Platform } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Ionicons from '@expo/vector-icons/Ionicons';

const AnimatedButton = Animated.createAnimatedComponent(Button);

export const CloseButton = () => {
  const insets = useSafeAreaInsets();
  const themeColorAccentForeground = useThemeColor('accent-foreground');
  const { progress, onOpenChange } = useSelect();

  const buttonAnimatedStyle = useAnimatedStyle(() => {
    const scale = interpolate(progress.get(), [0, 1, 2], [0, 1, 1]);

    return {
      transform: [{ scale }],
    };
  });

  const listIconAnimatedStyle = useAnimatedStyle(() => {
    const rotate = interpolate(
      progress.get(),
      [0, 1, 2],
      [0, 360],
      Extrapolation.CLAMP
    );
    const opacity = interpolate(
      progress.get(),
      [0, 1, 2],
      [1, 0],
      Extrapolation.CLAMP
    );

    return {
      opacity,
      transform: [{ rotate: `${rotate}deg` }],
    };
  });

  const closeIconAnimatedStyle = useAnimatedStyle(() => {
    const rotate = interpolate(
      progress.get(),
      [0, 1, 2],
      [0, -360],
      Extrapolation.CLAMP
    );
    const opacity = interpolate(progress.get(), [0, 1, 2], [0, 1, 0]);

    return {
      opacity,
      transform: [{ rotate: `${rotate}deg` }],
    };
  });

  return (
    <AnimatedButton
      className="absolute right-6"
      style={[{ bottom: insets.bottom + 24 }, buttonAnimatedStyle]}
      size="lg"
      isIconOnly
      onPress={() => {
        if (Platform.OS === 'ios') {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        onOpenChange(false);
      }}
    >
      <Animated.View
        className="absolute items-center justify-center"
        style={listIconAnimatedStyle}
      >
        <FontAwesome6
          name="list-ul"
          size={20}
          color={themeColorAccentForeground}
        />
      </Animated.View>
      <Animated.View
        className="absolute items-center justify-center"
        style={closeIconAnimatedStyle}
      >
        <Ionicons name="close" size={24} color={themeColorAccentForeground} />
      </Animated.View>
    </AnimatedButton>
  );
};
