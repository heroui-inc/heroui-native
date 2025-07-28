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
  | '--border'
  | '--link';

/**
 * Type for color constants object for outside className usage
 * Example: 'background', 'foreground', 'mutedForeground', etc.
 */
type ColorVariables = {
  [K in ColorVariableKeys as KebabToCamelCase<RemovePrefix<K>>]: string;
};

/**
 * Type for CSS color variables for NativeWind vars() usage
 * Example: '--background', '--foreground', '--muted-foreground', etc.
 */
type ColorVariablesCSS = {
  [K in ColorVariableKeys]: string;
};

/**
 * Props for the ThemeProvider component
 */
interface ThemeProviderProps {
  /** React children components to be wrapped by the theme provider */
  children: React.ReactNode;
  /** Initial theme to use (defaults to 'system' if not specified) */
  defaultTheme?: ColorScheme | 'system';
}

/**
 * Theme context type providing theme state and control functions
 */
type ThemeContextType = {
  /** Current active theme ('light' or 'dark') */
  theme: ColorScheme;
  /** Whether the current theme is dark */
  isDark: boolean;
  /** Color variables object with camelCase keys for direct usage */
  colors: ColorVariables;
  /** Function to toggle between light and dark themes */
  toggleTheme: () => void;
  /** Function to set a specific theme */
  setTheme: (theme: ColorScheme) => void;
};

export type {
  ColorScheme,
  ColorVariables,
  ColorVariablesCSS,
  ThemeContextType,
  ThemeProviderProps,
};
