import { useTheme } from 'heroui-native';
import React from 'react';
import { Pressable, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { useAppTheme } from '../contexts/app-theme-context';
import type { ThemeId } from '../themes/pastel-themes';

interface ThemeSelectorProps {
  themeId: ThemeId;
  themeName: string;
  colors: {
    primary: string;
    secondary: string;
    tertiary: string;
  };
  isActive: boolean;
  onPress: () => void;
}

const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  colors,
  isActive,
  onPress,
}) => {
  const { isDark } = useTheme();

  // Create pie chart paths
  const radius = 28;
  const centerX = 32;
  const centerY = 32;

  // Calculate pie slices
  // First color: 50% (180 degrees)
  // Second color: 25% (90 degrees)
  // Third color: 25% (90 degrees)

  const createPiePath = (startAngle: number, endAngle: number) => {
    const start = (startAngle * Math.PI) / 180;
    const end = (endAngle * Math.PI) / 180;

    const x1 = centerX + radius * Math.cos(start);
    const y1 = centerY + radius * Math.sin(start);
    const x2 = centerX + radius * Math.cos(end);
    const y2 = centerY + radius * Math.sin(end);

    const largeArc = endAngle - startAngle > 180 ? 1 : 0;

    return `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2} Z`;
  };

  return (
    <Pressable onPress={onPress} className="items-center">
      <View className="relative">
        <Svg width={64} height={64} viewBox="0 0 64 64">
          {/* First slice - 50% */}
          <Path d={createPiePath(-90, 90)} fill={colors.primary} />
          {/* Second slice - 25% */}
          <Path d={createPiePath(90, 180)} fill={colors.secondary} />
          {/* Third slice - 25% */}
          <Path d={createPiePath(180, 270)} fill={colors.tertiary} />

          {/* Active indicator ring */}
          {isActive && (
            <Circle
              cx={centerX}
              cy={centerY}
              r={radius + 4}
              fill="none"
              stroke={isDark ? '#ffffff' : '#000000'}
              strokeWidth={3}
              opacity={0.8}
            />
          )}
        </Svg>
      </View>
    </Pressable>
  );
};

export const ThemeSelectorBar: React.FC = () => {
  const { currentThemeId, setThemeById, availableThemes } = useAppTheme();

  // Define colors for each theme's pie chart
  const themeColors = {
    lavender: {
      primary: 'hsl(270 50% 75%)',
      secondary: 'hsl(160 40% 70%)',
      tertiary: 'hsl(45 55% 75%)',
    },
    mint: {
      primary: 'hsl(165 45% 70%)',
      secondary: 'hsl(145 50% 68%)',
      tertiary: 'hsl(55 60% 75%)',
    },
    peach: {
      primary: 'hsl(15 55% 75%)',
      secondary: 'hsl(95 45% 70%)',
      tertiary: 'hsl(35 60% 75%)',
    },
    sky: {
      primary: 'hsl(200 50% 72%)',
      secondary: 'hsl(175 45% 70%)',
      tertiary: 'hsl(48 58% 75%)',
    },
  };

  return (
    <View className="flex-row justify-around items-center py-4 px-6 bg-panel rounded-2xl mx-4 mb-6">
      {availableThemes.map((theme) => (
        <ThemeSelector
          key={theme.id}
          themeId={theme.id}
          themeName={theme.name}
          colors={themeColors[theme.id as keyof typeof themeColors]}
          isActive={currentThemeId === theme.id}
          onPress={() => setThemeById(theme.id)}
        />
      ))}
    </View>
  );
};
