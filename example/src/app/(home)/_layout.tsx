import { Stack, usePathname } from 'expo-router';
import { useTheme } from 'heroui-native';
import { useCallback } from 'react';
import { Image, Platform, StyleSheet } from 'react-native';
import LogoDark from '../../../assets/logo-dark.png';
import LogoLight from '../../../assets/logo-light.png';
import { ThemeToggle } from '../../components/theme-toggle';

export default function Layout() {
  const { theme, colors, isDark } = useTheme();

  const pathname = usePathname();

  const _renderTitle = () => {
    return (
      <Image
        source={isDark ? LogoLight : LogoDark}
        style={styles.logo}
        resizeMode="contain"
      />
    );
  };

  const _renderThemeToggle = useCallback(() => <ThemeToggle />, []);

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerTitleAlign: 'center',
        headerTransparent: Platform.select({
          ios: true,
          android: false,
        }),
        headerBlurEffect: theme === 'dark' ? 'dark' : 'light',
        headerTintColor: colors.foreground,
        headerStyle: {
          backgroundColor: Platform.select({
            ios: undefined,
            android: colors.background,
          }),
        },
        headerTitleStyle: {
          fontFamily: 'Inter_600SemiBold',
        },
        headerRight: _renderThemeToggle,
        headerBackButtonDisplayMode: 'minimal',
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        fullScreenGestureEnabled: true,
      }}
    >
      <Stack.Screen
        name="index"
        options={{ headerShown: true, headerTitle: _renderTitle }}
      />
      <Stack.Screen name="components" />
      <Stack.Screen
        name="themes/index"
        options={{ headerShown: true, headerTitle: 'Themes' }}
      />
      <Stack.Screen
        name="showcases"
        options={{
          headerShown:
            Platform.OS === 'ios' ? pathname === '/showcases' : false,
          headerTitle: 'Showcases',
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  logo: {
    height: 24,
  },
});
