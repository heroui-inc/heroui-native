import { Slot } from 'expo-router';
import { ThemeProvider, type ThemeConfig } from 'heroui-native';
import {
  configureReanimatedLogger,
  ReanimatedLogLevel,
} from 'react-native-reanimated';
import '../../global.css';

configureReanimatedLogger({
  level: ReanimatedLogLevel.warn,
  strict: false,
});

const customTheme: ThemeConfig = {
  light: {
    colors: {
      // Base Colors
      background: 'hsl(60 9% 98%)', // Warm off-white
      foreground: 'hsl(24 10% 10%)', // Warm black
      panel: 'hsl(60 5% 96%)', // Slightly darker warm white

      muted: 'hsl(24 5% 45%)',
      mutedForeground: 'hsl(24 5% 64%)',

      surface: 'hsl(60 5% 95%)',
      surfaceForeground: 'hsl(24 10% 10%)',

      default: 'hsl(0 0% 100%)',
      defaultForeground: 'hsl(24 5% 32%)',

      accent: 'hsl(262 83% 58%)', // Purple
      accentForeground: 'hsl(0 0% 100%)',

      accentSoft: 'hsl(262 30% 90%)',
      accentSoftForeground: 'hsl(262 50% 30%)',

      // Status Colors
      success: 'hsl(160 84% 39%)', // Teal
      successForeground: 'hsl(0 0% 100%)',

      warning: 'hsl(43 96% 56%)', // Gold
      warningForeground: 'hsl(24 10% 10%)',

      danger: 'hsl(0 72% 51%)', // Red
      dangerForeground: 'hsl(0 0% 100%)',

      // Surface Colors
      surface1: 'hsl(60 9% 98%)',
      surface2: 'hsl(60 5% 96%)',
      surface3: 'hsl(60 5% 93%)',

      // Misc Colors
      border: 'hsl(262 30% 86%)', // Purple tinted border
      divider: 'hsl(262 20% 80%)', // Purple tinted divider
      link: 'hsl(262 83% 58%)', // Purple links
    },
    borderRadius: {
      'DEFAULT': '16px',
      'panel': '12px',
      'panel-inner': '8px',
    },
    opacity: {
      disabled: 0.4,
    },
  },
  dark: {
    colors: {
      // Base Colors
      background: 'hsl(222 47% 11%)', // Deep blue-black
      foreground: 'hsl(213 31% 91%)', // Blue-white
      panel: 'hsl(223 47% 13%)', // Slightly lighter blue-black

      muted: 'hsl(215 20% 35%)',
      mutedForeground: 'hsl(215 15% 55%)',

      surface: 'hsl(217 33% 17%)',
      surfaceForeground: 'hsl(213 31% 91%)',

      default: 'hsl(224 47% 16%)',
      defaultForeground: 'hsl(213 27% 84%)',

      accent: 'hsl(263 70% 65%)', // Bright purple
      accentForeground: 'hsl(0 0% 100%)',

      accentSoft: 'hsl(263 30% 25%)',
      accentSoftForeground: 'hsl(263 60% 80%)',

      // Status Colors
      success: 'hsl(158 64% 52%)', // Bright teal
      successForeground: 'hsl(222 47% 11%)',

      warning: 'hsl(43 100% 66%)', // Bright gold
      warningForeground: 'hsl(222 47% 11%)',

      danger: 'hsl(0 63% 61%)', // Bright red
      dangerForeground: 'hsl(0 0% 100%)',

      // Surface Colors
      surface1: 'hsl(222 47% 11%)',
      surface2: 'hsl(223 47% 13%)',
      surface3: 'hsl(224 47% 16%)',

      // Misc Colors
      border: 'hsl(263 30% 25%)', // Purple tinted border
      divider: 'hsl(263 20% 30%)', // Purple tinted divider
      link: 'hsl(263 70% 65%)', // Purple links
    },
    borderRadius: {
      'DEFAULT': '16px',
      'panel': '12px',
      'panel-inner': '8px',
    },
    opacity: {
      disabled: 0.3,
    },
  },
};

export default function Layout() {
  return (
    <ThemeProvider defaultTheme="system" theme={customTheme}>
      <Slot />
    </ThemeProvider>
  );
}
