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
      <Stack.Screen name="index" options={{ headerTitle: 'Components' }} />
      <Stack.Screen name="accordion" options={{ title: 'Accordion' }} />
      <Stack.Screen name="avatar" options={{ title: 'Avatar' }} />
      <Stack.Screen name="button" options={{ title: 'Button' }} />
      <Stack.Screen name="card" options={{ title: 'Card' }} />
      <Stack.Screen name="checkbox" options={{ title: 'Checkbox' }} />
      <Stack.Screen name="chip" options={{ title: 'Chip' }} />
      <Stack.Screen name="divider" options={{ title: 'Divider' }} />
      <Stack.Screen
        name="drop-shadow-view"
        options={{ title: 'Drop Shadow View' }}
      />
      <Stack.Screen name="error-view" options={{ title: 'Error View' }} />
      <Stack.Screen name="form-field" options={{ title: 'Form Field' }} />
      <Stack.Screen name="radio" options={{ title: 'Radio' }} />
      <Stack.Screen name="spinner" options={{ title: 'Spinner' }} />
      <Stack.Screen name="surface" options={{ title: 'Surface' }} />
      <Stack.Screen name="switch" options={{ title: 'Switch' }} />
      <Stack.Screen name="text-field" options={{ title: 'TextField' }} />
    </Stack>
  );
}
