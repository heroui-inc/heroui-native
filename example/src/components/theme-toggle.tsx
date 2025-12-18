import { Ionicons } from '@expo/vector-icons';

import { isLiquidGlassAvailable } from 'expo-glass-effect';
import * as Haptics from 'expo-haptics';
import { cn } from 'heroui-native';
import { type FC } from 'react';
import { Platform } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Animated, { FadeOut, ZoomIn } from 'react-native-reanimated';
import { withUniwind } from 'uniwind';
import { useAppTheme } from '../contexts/app-theme-context';

const StyledIonicons = withUniwind(Ionicons);
const StyledTouchableOpacity = withUniwind(TouchableOpacity);

export const ThemeToggle: FC = () => {
  const { toggleTheme, isLight } = useAppTheme();

  const isLGAvailable = isLiquidGlassAvailable();

  return (
    <StyledTouchableOpacity
      activeOpacity={1}
      onPress={() => {
        if (Platform.OS === 'ios') {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        }
        toggleTheme();
      }}
      className={cn('p-3', isLGAvailable && 'px-2.5 py-0')}
    >
      {isLight ? (
        <Animated.View key="moon" entering={ZoomIn} exiting={FadeOut}>
          <StyledIonicons name="moon" size={20} className="text-black" />
        </Animated.View>
      ) : (
        <Animated.View key="sun" entering={ZoomIn} exiting={FadeOut}>
          <StyledIonicons name="sunny" size={20} className="text-white" />
        </Animated.View>
      )}
    </StyledTouchableOpacity>
  );
};
