import { Slot } from 'expo-router';
import { ThemeProvider } from 'heroui-native';
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from 'react-native-reanimated';
import '../../global.css';

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});

export default function Layout() {
  return (
    <ThemeProvider defaultTheme="system">
      <Slot />
    </ThemeProvider>
  );
}
