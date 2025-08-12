import type { ClassValue } from 'tailwind-variants';

/**
 * This Typescript utility transform a list of slots into a list of {slot: classes}
 */
type ElementSlots<S extends string> = {
  [key in S]?: Exclude<ClassValue, 0n>;
};

/**
 * Type helper that preserves the exact type of combined style objects
 * This ensures that VariantProps inference works correctly for each style
 */
type CombinedStyles<T extends Record<string, any>> = {
  [K in keyof T]: T[K];
};

/**
 * Available color scheme variants
 */
type ColorScheme = 'light' | 'dark';

/**
 * Utility type to convert kebab-case CSS variable names to camelCase
 */
type KebabToCamelCase<S extends string> = S extends `${infer T}-${infer U}`
  ? `${T}${Capitalize<KebabToCamelCase<U>>}`
  : S;

/**
 * Utility type to remove -- prefix from CSS variable names
 */
type RemovePrefix<S extends string> = S extends `--${infer T}` ? T : S;

/**
 * Non-color theme variables (radius, opacity, etc.)
 */
type NonColorVariables = {
  radius: string;
  radiusPanel: string;
  radiusPanelInner: string;
  opacityDisabled: number;
};

/**
 * CSS variable format for non-color variables
 */
type NonColorVariablesCSS = {
  '--radius': string;
  '--radius-panel': string;
  '--radius-panel-inner': string;
  '--opacity-disabled': number;
};

/**
 * Color variable keys
 */
type ColorVariableKeys =
  | '--background'
  | '--foreground'
  | '--panel'
  | '--muted'
  | '--muted-foreground'
  | '--surface'
  | '--surface-foreground'
  | '--default'
  | '--default-foreground'
  | '--accent'
  | '--accent-foreground'
  | '--accent-soft'
  | '--accent-soft-foreground'
  | '--success'
  | '--success-foreground'
  | '--warning'
  | '--warning-foreground'
  | '--danger'
  | '--danger-foreground'
  | '--surface-1'
  | '--surface-2'
  | '--surface-3'
  | '--border'
  | '--divider'
  | '--link';

/**
 * Type for color constants object for runtime usage
 * Example: 'background', 'foreground', 'mutedForeground', etc.
 * Values are color strings in any format supported by color-kit
 */
type ColorConstants = {
  [K in ColorVariableKeys as KebabToCamelCase<RemovePrefix<K>>]: string;
};

/**
 * Type for CSS color variables for NativeWind vars() usage
 * Example: '--background', '--foreground', '--muted-foreground', etc.
 * Values are color strings formatted for CSS variables
 */
type ColorVariablesCSS = {
  [K in ColorVariableKeys]: string;
};

/**
 * Complete theme definition combining colors and non-color variables
 */
type ThemeVariables = ColorVariablesCSS & NonColorVariablesCSS;

/**
 * Theme extension configuration (Tailwind-style)
 */
type ThemeExtension = {
  colors?: Partial<ColorConstants>;
  borderRadius?: {
    'DEFAULT'?: string;
    'panel'?: string;
    'panel-inner'?: string;
  };
  opacity?: {
    disabled?: number;
  };
};

/**
 * Theme customization options
 * @example
 * ```tsx
 * const customTheme = {
 *   light: {
 *     colors: {
 *       background: '#ffffff',
 *       foreground: 'rgb(0, 0, 0)',
 *       primary: 'hsl(220 90% 50%)',
 *       // ... colors in any format supported by color-kit
 *     },
 *     borderRadius: {
 *       DEFAULT: '12px',
 *       panel: '8px',
 *     },
 *     opacity: {
 *       disabled: 0.5,
 *     }
 *   },
 *   dark: {
 *     colors: {
 *       background: '#1a1a1a',
 *       foreground: 'hsl(0 0% 100%)',
 *       // ... colors in any format
 *     }
 *   }
 * }
 * ```
 * @note Colors can be in any format supported by color-kit (hex, rgb, hsl, etc.)
 * @note Colors with alpha are supported (e.g., 'rgba(255, 0, 0, 0.5)')
 */
type ThemeConfig = {
  light?: ThemeExtension;
  dark?: ThemeExtension;
};

/**
 * Props for the ThemeProvider component
 */
interface ThemeProviderProps {
  /** React children components to be wrapped by the theme provider */
  children: React.ReactNode;
  /** Initial color scheme to use (defaults to 'system' if not specified) */
  colorScheme?: ColorScheme | 'system';
  /** Custom theme configuration using Tailwind's extend pattern */
  theme?: ThemeConfig;
}

/**
 * Theme context type providing theme state and control functions
 */
type ThemeContextType = {
  /** Current active theme ('light' or 'dark') */
  theme: ColorScheme;
  /** Whether the current theme is dark */
  isDark: boolean;
  /** Color constants object with camelCase keys for direct usage */
  colors: ColorConstants;
  /** Function to toggle between light and dark themes */
  toggleTheme: () => void;
  /** Function to set a specific theme */
  setTheme: (theme: ColorScheme) => void;
};

export type {
  ColorConstants,
  ColorScheme,
  ColorVariablesCSS,
  CombinedStyles,
  ElementSlots,
  NonColorVariables,
  NonColorVariablesCSS,
  ThemeConfig,
  ThemeContextType,
  ThemeExtension,
  ThemeProviderProps,
  ThemeVariables,
};
