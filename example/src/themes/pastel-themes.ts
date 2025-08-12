import type { ThemeConfig } from 'heroui-native';

// Lavender Dream Theme - Soft purples and lilacs
export const lavenderDreamTheme: ThemeConfig = {
  light: {
    colors: {
      // Base Colors
      background: 'hsl(280 25% 98%)', // Very soft lavender white
      foreground: 'hsl(280 30% 15%)', // Deep purple-gray
      panel: 'hsl(280 20% 96%)', // Soft lavender panel

      muted: 'hsl(280 15% 45%)',
      mutedForeground: 'hsl(280 10% 55%)',

      surface: 'hsl(280 18% 94%)',
      surfaceForeground: 'hsl(280 30% 20%)',

      default: 'hsl(280 15% 97%)',
      defaultForeground: 'hsl(280 20% 35%)',

      accent: 'hsl(270 50% 75%)', // Soft purple
      accentForeground: 'hsl(280 30% 15%)',

      accentSoft: 'hsl(270 30% 90%)',
      accentSoftForeground: 'hsl(270 40% 40%)',

      // Status Colors - Pastel versions
      success: 'hsl(160 40% 70%)', // Soft mint green
      successForeground: 'hsl(160 50% 15%)',

      warning: 'hsl(45 55% 75%)', // Soft golden yellow
      warningForeground: 'hsl(45 60% 20%)',

      danger: 'hsl(350 50% 75%)', // Soft rose
      dangerForeground: 'hsl(350 40% 20%)',

      // Surface Colors
      surface1: 'hsl(280 25% 98%)',
      surface2: 'hsl(280 20% 95%)',
      surface3: 'hsl(280 18% 92%)',

      // Misc Colors
      border: 'hsl(270 20% 88%)',
      divider: 'hsl(270 15% 82%)',
      link: 'hsl(270 50% 65%)',
    },
    borderRadius: {
      'DEFAULT': '18px',
      'panel': '16px',
      'panel-inner': '12px',
    },
    opacity: {
      disabled: 0.5,
    },
  },
  dark: {
    colors: {
      background: 'hsl(280 20% 12%)',
      foreground: 'hsl(280 10% 92%)',
      panel: 'hsl(280 18% 15%)',

      muted: 'hsl(280 10% 40%)',
      mutedForeground: 'hsl(280 8% 60%)',

      surface: 'hsl(280 15% 18%)',
      surfaceForeground: 'hsl(280 10% 85%)',

      default: 'hsl(280 15% 20%)',
      defaultForeground: 'hsl(280 10% 80%)',

      accent: 'hsl(270 45% 70%)',
      accentForeground: 'hsl(280 10% 10%)',

      accentSoft: 'hsl(270 25% 30%)',
      accentSoftForeground: 'hsl(270 35% 75%)',

      success: 'hsl(160 35% 55%)',
      successForeground: 'hsl(160 10% 90%)',

      warning: 'hsl(45 50% 60%)',
      warningForeground: 'hsl(45 10% 10%)',

      danger: 'hsl(350 45% 60%)',
      dangerForeground: 'hsl(350 10% 90%)',

      surface1: 'hsl(280 20% 12%)',
      surface2: 'hsl(280 18% 15%)',
      surface3: 'hsl(280 16% 18%)',

      border: 'hsl(270 15% 25%)',
      divider: 'hsl(270 12% 30%)',
      link: 'hsl(270 45% 70%)',
    },
    borderRadius: {
      'DEFAULT': '18px',
      'panel': '16px',
      'panel-inner': '12px',
    },
    opacity: {
      disabled: 0.5,
    },
  },
};

// Mint Garden Theme - Fresh greens and teals
export const mintGardenTheme: ThemeConfig = {
  light: {
    colors: {
      background: 'hsl(160 30% 98%)', // Very soft mint white
      foreground: 'hsl(160 35% 12%)', // Deep forest green
      panel: 'hsl(160 25% 96%)', // Soft mint panel

      muted: 'hsl(160 15% 45%)',
      mutedForeground: 'hsl(160 12% 55%)',

      surface: 'hsl(160 22% 94%)',
      surfaceForeground: 'hsl(160 35% 18%)',

      default: 'hsl(160 18% 97%)',
      defaultForeground: 'hsl(160 25% 32%)',

      accent: 'hsl(165 45% 70%)', // Soft teal
      accentForeground: 'hsl(165 40% 15%)',

      accentSoft: 'hsl(165 30% 90%)',
      accentSoftForeground: 'hsl(165 40% 35%)',

      success: 'hsl(145 50% 68%)', // Emerald green
      successForeground: 'hsl(145 45% 15%)',

      warning: 'hsl(55 60% 75%)', // Soft lime
      warningForeground: 'hsl(55 50% 20%)',

      danger: 'hsl(10 55% 75%)', // Soft coral
      dangerForeground: 'hsl(10 45% 20%)',

      surface1: 'hsl(160 30% 98%)',
      surface2: 'hsl(160 25% 95%)',
      surface3: 'hsl(160 22% 92%)',

      border: 'hsl(165 20% 88%)',
      divider: 'hsl(165 15% 82%)',
      link: 'hsl(165 45% 60%)',
    },
    borderRadius: {
      'DEFAULT': '18px',
      'panel': '14px',
      'panel-inner': '10px',
    },
    opacity: {
      disabled: 0.45,
    },
  },
  dark: {
    colors: {
      background: 'hsl(160 20% 10%)',
      foreground: 'hsl(160 10% 92%)',
      panel: 'hsl(160 18% 13%)',

      muted: 'hsl(160 10% 38%)',
      mutedForeground: 'hsl(160 8% 58%)',

      surface: 'hsl(160 15% 16%)',
      surfaceForeground: 'hsl(160 10% 85%)',

      default: 'hsl(160 15% 18%)',
      defaultForeground: 'hsl(160 10% 80%)',

      accent: 'hsl(165 40% 60%)',
      accentForeground: 'hsl(165 10% 10%)',

      accentSoft: 'hsl(165 25% 28%)',
      accentSoftForeground: 'hsl(165 35% 70%)',

      success: 'hsl(145 40% 50%)',
      successForeground: 'hsl(145 10% 90%)',

      warning: 'hsl(55 50% 60%)',
      warningForeground: 'hsl(55 10% 10%)',

      danger: 'hsl(10 45% 60%)',
      dangerForeground: 'hsl(10 10% 90%)',

      surface1: 'hsl(160 20% 10%)',
      surface2: 'hsl(160 18% 13%)',
      surface3: 'hsl(160 16% 16%)',

      border: 'hsl(165 15% 22%)',
      divider: 'hsl(165 12% 28%)',
      link: 'hsl(165 40% 65%)',
    },
    borderRadius: {
      'DEFAULT': '18px',
      'panel': '14px',
      'panel-inner': '10px',
    },
    opacity: {
      disabled: 0.45,
    },
  },
};

// Sky Dream Theme - Soft blues and cyans
export const skyDreamTheme: ThemeConfig = {
  light: {
    colors: {
      background: 'hsl(210 40% 98%)', // Very soft sky white
      foreground: 'hsl(210 35% 12%)', // Deep sky blue
      panel: 'hsl(210 30% 96%)', // Soft sky panel

      muted: 'hsl(210 18% 45%)',
      mutedForeground: 'hsl(210 15% 55%)',

      surface: 'hsl(210 28% 94%)',
      surfaceForeground: 'hsl(210 35% 18%)',

      default: 'hsl(210 22% 97%)',
      defaultForeground: 'hsl(210 28% 32%)',

      accent: 'hsl(200 50% 72%)', // Soft cyan
      accentForeground: 'hsl(200 40% 15%)',

      accentSoft: 'hsl(200 32% 90%)',
      accentSoftForeground: 'hsl(200 42% 35%)',

      success: 'hsl(175 45% 70%)', // Soft aqua
      successForeground: 'hsl(175 40% 18%)',

      warning: 'hsl(48 58% 75%)', // Soft butter yellow
      warningForeground: 'hsl(48 48% 20%)',

      danger: 'hsl(340 52% 75%)', // Soft pink
      dangerForeground: 'hsl(340 42% 20%)',

      surface1: 'hsl(210 40% 98%)',
      surface2: 'hsl(210 30% 95%)',
      surface3: 'hsl(210 28% 92%)',

      border: 'hsl(200 22% 88%)',
      divider: 'hsl(200 18% 82%)',
      link: 'hsl(200 50% 62%)',
    },
    borderRadius: {
      'DEFAULT': '14px',
      'panel': '12px',
      'panel-inner': '8px',
    },
    opacity: {
      disabled: 0.46,
    },
  },
  dark: {
    colors: {
      background: 'hsl(210 25% 10%)',
      foreground: 'hsl(210 10% 92%)',
      panel: 'hsl(210 22% 13%)',

      muted: 'hsl(210 12% 38%)',
      mutedForeground: 'hsl(210 10% 58%)',

      surface: 'hsl(210 18% 16%)',
      surfaceForeground: 'hsl(210 10% 85%)',

      default: 'hsl(210 18% 18%)',
      defaultForeground: 'hsl(210 10% 80%)',

      accent: 'hsl(200 42% 62%)',
      accentForeground: 'hsl(200 10% 10%)',

      accentSoft: 'hsl(200 26% 28%)',
      accentSoftForeground: 'hsl(200 36% 70%)',

      success: 'hsl(175 38% 55%)',
      successForeground: 'hsl(175 10% 90%)',

      warning: 'hsl(48 48% 60%)',
      warningForeground: 'hsl(48 10% 10%)',

      danger: 'hsl(340 42% 60%)',
      dangerForeground: 'hsl(340 10% 90%)',

      surface1: 'hsl(210 25% 10%)',
      surface2: 'hsl(210 22% 13%)',
      surface3: 'hsl(210 20% 16%)',

      border: 'hsl(200 16% 22%)',
      divider: 'hsl(200 14% 28%)',
      link: 'hsl(200 42% 65%)',
    },
    borderRadius: {
      'DEFAULT': '14px',
      'panel': '12px',
      'panel-inner': '8px',
    },
    opacity: {
      disabled: 0.46,
    },
  },
};

// Export all themes in an array for easy access
export const pastelThemes = [
  { name: 'Default', config: undefined, id: 'default' },
  { name: 'Lavender Dream', config: lavenderDreamTheme, id: 'lavender' },
  { name: 'Mint Garden', config: mintGardenTheme, id: 'mint' },
  { name: 'Sky Dream', config: skyDreamTheme, id: 'sky' },
] as const;

export type ThemeId = (typeof pastelThemes)[number]['id'];
