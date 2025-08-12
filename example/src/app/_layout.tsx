import { Slot } from 'expo-router';
import { ThemeProvider } from 'heroui-native';
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from 'react-native-reanimated';
import '../../global.css';
import { AppThemeProvider, useAppTheme } from '../contexts/app-theme-context';

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});

function ThemedLayout() {
  const { currentTheme } = useAppTheme();

  return (
    <ThemeProvider colorScheme="system" theme={currentTheme}>
      <Slot />
    </ThemeProvider>
  );
}

export default function Layout() {
  return (
    <AppThemeProvider>
      <ThemedLayout />
    </AppThemeProvider>
  );
}
