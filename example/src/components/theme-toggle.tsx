import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'heroui-native';
import { type FC } from 'react';
import { Pressable } from 'react-native';
import Animated, { FadeOut, ZoomIn } from 'react-native-reanimated';

export const ThemeToggle: FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Pressable onPress={toggleTheme} className="px-2">
      {theme === 'light' ? (
        <Animated.View key="moon" entering={ZoomIn} exiting={FadeOut}>
          <Ionicons name="moon" color="black" size={20} />
        </Animated.View>
      ) : (
        <Animated.View key="sun" entering={ZoomIn} exiting={FadeOut}>
          <Ionicons name="sunny" color="white" size={20} />
        </Animated.View>
      )}
    </Pressable>
  );
};
