import { Ionicons } from '@expo/vector-icons';
import { useTheme } from 'heroui-native';
import { type FC } from 'react';
import { Pressable } from 'react-native';
import Animated, { FadeOut, ZoomIn } from 'react-native-reanimated';
import { withUniwind } from 'uniwind';

const StyledIonicons = withUniwind(Ionicons);

export const ThemeToggle: FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <Pressable onPress={toggleTheme} className="px-2.5">
      {theme === 'light' ? (
        <Animated.View key="moon" entering={ZoomIn} exiting={FadeOut}>
          <StyledIonicons name="moon" size={20} className="text-black" />
        </Animated.View>
      ) : (
        <Animated.View key="sun" entering={ZoomIn} exiting={FadeOut}>
          <StyledIonicons name="sunny" size={20} className="text-white" />
        </Animated.View>
      )}
    </Pressable>
  );
};
