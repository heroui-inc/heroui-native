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
 * HSL color format for CSS variables (without hsl wrapper)
 * @example '300 50% 100%' - WITHOUT 'hsl(' wrapper and WITHOUT alpha channel
 * Alpha should be applied via className (e.g., 'bg-foreground/10') or using colorKit.setAlpha utility
 */
type HSLValue = `${string} ${string}% ${string}%`;

/**
 * HSL color format for runtime constants (with hsl wrapper)
 * @example 'hsl(300 50% 100%)' - WITH 'hsl(' wrapper for runtime usage
 */
type HSLColor = `hsl(${HSLValue})`;

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
 * Values are in format: 'hsl(300 50% 100%)'
 */
type ColorConstants = {
  [K in ColorVariableKeys as KebabToCamelCase<RemovePrefix<K>>]: HSLColor;
};

/**
 * Type for CSS color variables for NativeWind vars() usage
 * Example: '--background', '--foreground', '--muted-foreground', etc.
 * Values are in format: '300 50% 100%' (without hsl wrapper)
 */
type ColorVariablesCSS = {
  [K in ColorVariableKeys]: HSLValue;
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
 *       background: 'hsl(0 0% 100%)',
 *       foreground: 'hsl(0 0% 0%)',
 *       primary: 'hsl(220 90% 50%)',
 *       // ... other colors in 'hsl(H S% L%)' format
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
 *       background: 'hsl(0 0% 10%)',
 *       foreground: 'hsl(0 0% 100%)',
 *       // ... other colors
 *     }
 *   }
 * }
 * ```
 * @note Colors MUST be in 'hsl(H S% L%)' format without alpha channel
 * @note Alpha should be applied via className (e.g., 'bg-foreground/10') or colorKit.setAlpha utility
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
  /** Initial theme to use (defaults to 'system' if not specified) */
  defaultTheme?: ColorScheme | 'system';
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
  HSLColor,
  HSLValue,
  NonColorVariables,
  NonColorVariablesCSS,
  ThemeConfig,
  ThemeContextType,
  ThemeExtension,
  ThemeProviderProps,
  ThemeVariables,
};
