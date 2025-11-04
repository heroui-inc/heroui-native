import { isLiquidGlassAvailable } from 'expo-glass-effect';
import { Stack } from 'expo-router';
import { useThemeColor } from 'heroui-native';
import { useCallback } from 'react';
import { Image, Platform, StyleSheet } from 'react-native';
import LogoDark from '../../../assets/logo-dark.png';
import LogoLight from '../../../assets/logo-light.png';
import { ThemeToggle } from '../../components/theme-toggle';
import { useAppTheme } from '../../contexts/app-theme-context';

export default function Layout() {
  const { isDark } = useAppTheme();
  const themeColorForeground = useThemeColor('foreground');
  const themeColorBackground = useThemeColor('background');

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
        headerTitleAlign: 'center',
        headerTransparent: true,
        headerBlurEffect: isDark ? 'dark' : 'light',
        headerTintColor: themeColorForeground,
        headerStyle: {
          backgroundColor: Platform.select({
            ios: undefined,
            android: themeColorBackground,
          }),
        },
        headerTitleStyle: {
          fontFamily: 'Inter_600SemiBold',
        },
        headerRight: _renderThemeToggle,
        headerBackButtonDisplayMode: 'generic',
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        fullScreenGestureEnabled: isLiquidGlassAvailable() ? false : true,
        contentStyle: {
          backgroundColor: themeColorBackground,
        },
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          headerTitle: _renderTitle,
        }}
      />
      <Stack.Screen
        name="components/index"
        options={{ headerTitle: 'Components' }}
      />
      <Stack.Screen
        name="components/accordion"
        options={{ title: 'Accordion' }}
      />
      <Stack.Screen name="components/avatar" options={{ title: 'Avatar' }} />
      <Stack.Screen name="components/button" options={{ title: 'Button' }} />
      <Stack.Screen name="components/card" options={{ title: 'Card' }} />
      <Stack.Screen
        name="components/checkbox"
        options={{ title: 'Checkbox' }}
      />
      <Stack.Screen name="components/chip" options={{ title: 'Chip' }} />
      <Stack.Screen name="components/dialog" options={{ title: 'Dialog' }} />
      <Stack.Screen
        name="components/dialog-native-modal"
        options={{ title: 'Dialog Native Modal', presentation: 'formSheet' }}
      />
      <Stack.Screen name="components/divider" options={{ title: 'Divider' }} />
      <Stack.Screen
        name="components/error-view"
        options={{ title: 'Error View' }}
      />
      <Stack.Screen
        name="components/form-field"
        options={{ title: 'Form Field' }}
      />
      <Stack.Screen name="components/popover" options={{ title: 'Popover' }} />
      <Stack.Screen
        name="components/popover-native-modal"
        options={{ title: 'Popover Native Modal', presentation: 'formSheet' }}
      />
      <Stack.Screen
        name="components/radio-group"
        options={{ title: 'Radio Group' }}
      />
      <Stack.Screen
        name="components/scroll-shadow"
        options={{ title: 'Scroll Shadow' }}
      />
      <Stack.Screen
        name="components/select-native-modal"
        options={{ title: 'Select Native Modal', presentation: 'formSheet' }}
      />
      <Stack.Screen name="components/select" options={{ title: 'Select' }} />
      <Stack.Screen
        name="components/skeleton"
        options={{ title: 'Skeleton' }}
      />
      <Stack.Screen name="components/spinner" options={{ title: 'Spinner' }} />
      <Stack.Screen name="components/surface" options={{ title: 'Surface' }} />
      <Stack.Screen name="components/switch" options={{ title: 'Switch' }} />
      <Stack.Screen name="components/tabs" options={{ title: 'Tabs' }} />
      <Stack.Screen
        name="components/text-field"
        options={{ title: 'TextField' }}
      />
      <Stack.Screen name="themes/index" options={{ headerTitle: 'Themes' }} />
      <Stack.Screen
        name="showcases"
        options={{
          headerShown: false,
          animation: 'slide_from_bottom',
          animationDuration: 300,
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 80,
    height: 24,
  },
});
