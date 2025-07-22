import { Stack } from 'expo-router';
import { useTheme } from 'heroui-native';
import { ThemeToggle } from '../../components/theme-toggle';

export default function Layout() {
  const { theme, colors } = useTheme();

  const _renderThemeToggle = () => <ThemeToggle />;

  return (
    <Stack
      screenOptions={{
        headerTitleAlign: 'center',
        headerTransparent: true,
        headerBlurEffect: theme === 'dark' ? 'dark' : 'light',
        headerTintColor: colors.foreground,
        headerBackButtonDisplayMode: 'minimal',
        headerRight: _renderThemeToggle,
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        fullScreenGestureEnabled: true,
      }}
    >
      <Stack.Screen name="index" options={{ title: 'HeroUI Native' }} />
      <Stack.Screen name="theme" options={{ title: 'Theme' }} />
      <Stack.Screen name="switch" options={{ title: 'Switch' }} />
      <Stack.Screen name="checkbox" options={{ title: 'Checkbox' }} />
      <Stack.Screen name="radio" options={{ title: 'Radio' }} />
      <Stack.Screen name="spinner" options={{ title: 'Spinner' }} />
    </Stack>
  );
}
