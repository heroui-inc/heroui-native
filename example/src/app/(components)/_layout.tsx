import { Stack } from 'expo-router';
import { useTheme } from 'heroui-native';
import { Image, Platform, StyleSheet } from 'react-native';
import { ThemeToggle } from '../../components/theme-toggle';

export default function Layout() {
  const { theme, colors } = useTheme();

  const _renderTitle = () => {
    return (
      <Image
        source={{
          uri: 'https://raw.githubusercontent.com/heroui-inc/heroui/main/apps/docs/public/isotipo.png',
        }}
        style={styles.logo}
      />
    );
  };

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
      <Stack.Screen name="index" options={{ headerTitle: _renderTitle }} />
      <Stack.Screen name="accordion" options={{ title: 'Accordion' }} />
      <Stack.Screen name="button" options={{ title: 'Button' }} />
      <Stack.Screen name="card" options={{ title: 'Card' }} />
      <Stack.Screen name="checkbox" options={{ title: 'Checkbox' }} />
      <Stack.Screen name="chip" options={{ title: 'Chip' }} />
      <Stack.Screen name="divider" options={{ title: 'Divider' }} />
      <Stack.Screen
        name="drop-shadow-view"
        options={{ title: 'Drop Shadow View' }}
      />
      <Stack.Screen name="form-field" options={{ title: 'Form Field' }} />
      <Stack.Screen name="radio" options={{ title: 'Radio' }} />
      <Stack.Screen name="spinner" options={{ title: 'Spinner' }} />
      <Stack.Screen name="surface" options={{ title: 'Surface' }} />
      <Stack.Screen name="switch" options={{ title: 'Switch' }} />
      <Stack.Screen name="text-field" options={{ title: 'TextField' }} />
      <Stack.Screen name="error-field" options={{ title: 'Error Field' }} />
      <Stack.Screen
        name="theme-showcase"
        options={{ title: 'Theme Showcase' }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 24,
    height: 24,
  },
});
