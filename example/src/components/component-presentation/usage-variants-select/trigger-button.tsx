import { useSelect, useThemeColor } from 'heroui-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export const TriggerButton = () => {
  const insets = useSafeAreaInsets();
  const themeColorAccentForeground = useThemeColor('accent-foreground');
  const { progress } = useSelect();

  const animatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(progress.get(), [0, 1, 1.5], [1, 0, 1]);

    return {
      opacity,
    };
  });

  return (
    <Animated.View
      className="absolute right-6 size-14 items-center justify-center rounded-full bg-accent"
      style={[{ bottom: insets.bottom + 24 }, animatedStyle]}
    >
      <FontAwesome6
        name="list-ul"
        size={20}
        color={themeColorAccentForeground}
      />
    </Animated.View>
  );
};
