import { Slot } from 'expo-router';
import { ThemeProvider } from 'heroui-native';
import '../../global.css';

export default function Layout() {
  return (
    <ThemeProvider defaultTheme="system">
      <Slot />
    </ThemeProvider>
  );
}
