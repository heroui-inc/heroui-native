import { Stack } from 'expo-router';
import { useTheme } from 'heroui-native';
import { Platform } from 'react-native';
import { ThemeToggle } from '../../../components/theme-toggle';

export default function Layout() {
  const { theme, colors } = useTheme();

  const _renderThemeToggle = () => <ThemeToggle />;

  return (
    <Stack
      screenOptions={{
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
        headerBackButtonDisplayMode: 'minimal',
        headerRight: _renderThemeToggle,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        fullScreenGestureEnabled: true,
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="onboarding" options={{ headerShown: false }} />
    </Stack>
  );
}
