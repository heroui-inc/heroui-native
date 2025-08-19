import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
  useFonts,
} from '@expo-google-fonts/inter';
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
      config={{
        colorScheme: 'system',
        theme: currentTheme,
        // textProps: {
        //   className: 'font-medium',
        // },
      }}
    >
      <Slot />
    </HeroUINativeProvider>
  );
}

export default function Layout() {
  useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  return (
    <AppThemeProvider>
      <ThemedLayout />
    </AppThemeProvider>
  );
}
