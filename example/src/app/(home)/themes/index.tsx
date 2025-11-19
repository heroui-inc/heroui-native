/* eslint-disable react-native/no-inline-styles */
import { useHeaderHeight } from '@react-navigation/elements';
import { useThemeColor } from 'heroui-native';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { CardContent } from '../../../components/themes-content/card-content';
import { CheckboxContent } from '../../../components/themes-content/checkbox-content';
import { RadioGroupContent } from '../../../components/themes-content/radio-group-content';
import { SwitchContent } from '../../../components/themes-content/switch-content';
import { TextInputContent } from '../../../components/themes-content/text-input-content';
import { useAppTheme } from '../../../contexts/app-theme-context';

type ThemeOption = {
  id: string;
  name: string;
  lightVariant: string;
  darkVariant: string;
  colors: { primary: string; secondary: string; tertiary: string };
};

const availableThemes: ThemeOption[] = [
  {
    id: 'default',
    name: 'Default',
    lightVariant: 'light',
    darkVariant: 'dark',
    colors: {
      primary: '#006FEE',
      secondary: '#17C964',
      tertiary: '#F5A524',
    },
  },
  {
    id: 'lavender',
    name: 'Lavender',
    lightVariant: 'lavender-light',
    darkVariant: 'lavender-dark',
    colors: {
      primary: 'hsl(270 50% 75%)',
      secondary: 'hsl(160 40% 70%)',
      tertiary: 'hsl(45 55% 75%)',
    },
  },
  {
    id: 'mint',
    name: 'Mint',
    lightVariant: 'mint-light',
    darkVariant: 'mint-dark',
    colors: {
      primary: 'hsl(165 45% 70%)',
      secondary: 'hsl(145 50% 68%)',
      tertiary: 'hsl(55 60% 75%)',
    },
  },
  {
    id: 'sky',
    name: 'Sky',
    lightVariant: 'sky-light',
    darkVariant: 'sky-dark',
    colors: {
      primary: 'hsl(200 50% 72%)',
      secondary: 'hsl(175 45% 70%)',
      tertiary: 'hsl(48 58% 75%)',
    },
  },
];

const ThemeCircle: React.FC<{
  theme: ThemeOption;
  isActive: boolean;
  onPress: () => void;
}> = ({ theme, isActive, onPress }) => {
  const themeColorAccent = useThemeColor('accent');

  return (
    <Pressable onPress={onPress} className="items-center">
      <View style={{ position: 'relative', padding: 4 }}>
        {/* Active ring */}
        {isActive && (
          <View
            style={{
              position: 'absolute',
              width: 68,
              height: 68,
              borderRadius: 34,
              borderWidth: 2,
              borderColor: themeColorAccent,
              top: 0,
              left: 0,
            }}
          />
        )}
        {/* Theme circle */}
        <View
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          {/* First section - 50% */}
          <View
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              backgroundColor: theme.colors.primary,
            }}
          />

          {/* Second section - 25% */}
          <View
            style={{
              position: 'absolute',
              width: '100%',
              height: '50%',
              backgroundColor: theme.colors.secondary,
              bottom: 0,
            }}
          />

          {/* Third section - 25% */}
          <View
            style={{
              position: 'absolute',
              width: '50%',
              height: '50%',
              backgroundColor: theme.colors.tertiary,
              bottom: 0,
              right: 0,
            }}
          />
        </View>
      </View>
      <Text className="text-xs mt-2 text-foreground font-medium">
        {theme.name}
      </Text>
    </Pressable>
  );
};

export default function Themes() {
  const { currentTheme, setTheme, isLight } = useAppTheme();
  const headerHeight = useHeaderHeight();

  const getCurrentThemeId = () => {
    if (currentTheme === 'light' || currentTheme === 'dark') return 'default';
    if (currentTheme.startsWith('lavender')) return 'lavender';
    if (currentTheme.startsWith('mint')) return 'mint';
    if (currentTheme.startsWith('sky')) return 'sky';
    return 'default';
  };

  const handleThemeSelect = (theme: ThemeOption) => {
    const variant = isLight ? theme.lightVariant : theme.darkVariant;
    setTheme(variant as any);
  };

  return (
    <KeyboardAwareScrollView
      contentContainerClassName="gap-12 px-5"
      contentContainerStyle={{
        paddingTop: headerHeight,
      }}
      bottomOffset={60}
    >
      <View className="flex-row justify-around pt-6">
        {availableThemes.map((theme) => (
          <ThemeCircle
            key={theme.id}
            theme={theme}
            isActive={getCurrentThemeId() === theme.id}
            onPress={() => handleThemeSelect(theme)}
          />
        ))}
      </View>
      <CardContent />
      <SwitchContent />
      <CheckboxContent />
      <RadioGroupContent />
      <TextInputContent />
    </KeyboardAwareScrollView>
  );
}
