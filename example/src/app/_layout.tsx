import { Slot } from 'expo-router';
import { HeroUINativeProvider } from 'heroui-native';
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
    <HeroUINativeProvider
      config={{ colorScheme: 'system', theme: currentTheme }}
    >
      <Slot />
    </HeroUINativeProvider>
  );
}

export default function Layout() {
  return (
    <AppThemeProvider>
      <ThemedLayout />
    </AppThemeProvider>
  );
}
