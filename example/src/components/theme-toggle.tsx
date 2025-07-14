import { useTheme } from 'heroui-native';
import { Moon, Sun } from 'lucide-react-native';
import { type FC } from 'react';
import { Pressable } from 'react-native';
import Animated, { FadeOut, ZoomIn } from 'react-native-reanimated';

export const ThemeToggle: FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Pressable onPress={toggleTheme}>
      {theme === 'light' ? (
        <Animated.View key="moon" entering={ZoomIn} exiting={FadeOut}>
          <Moon color="black" size={20} />
        </Animated.View>
      ) : (
        <Animated.View key="sun" entering={ZoomIn} exiting={FadeOut}>
          <Sun color="white" size={20} />
        </Animated.View>
      )}
    </Pressable>
  );
};
