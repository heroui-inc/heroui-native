import { colorScheme as colorSchemeNativeWind, vars } from 'nativewind';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { View } from 'react-native';
import { colors as defaultColors } from './colors';
import { deepMerge } from './helpers';
import {
  colorsToCSSVars,
  extensionToCSSVars,
  formatHSL,
  processColorValue,
} from './provider.helpers';
import { themes as defaultThemes, themeVariables } from './themes';
import type {
  ColorConstants,
  ColorScheme,
  ThemeContextType,
  ThemeProviderProps,
  ThemeVariables,
} from './types';

/**
 * Theme Context
 * Provides theme state and utilities to all child components
 *
 * @property {ColorScheme} theme - Current theme name ('light' | 'dark')
 * @property {boolean} isDark - Boolean flag for dark mode
 * @property {ColorConstants} colors - Current theme's color constants (for runtime usage)
 * @property {Function} toggleTheme - Function to switch between light and dark
 * @property {Function} setTheme - Function to set a specific theme
 */
export const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  isDark: false,
  colors: defaultColors.light,
  toggleTheme: () => {},
  setTheme: () => {},
});

/**
 * ThemeProvider Component
 *
 * MAIN RESPONSIBILITIES:
 * 1. Manages theme state (light/dark mode)
 * 2. Merges custom theme with defaults
 * 3. Processes colors from any format to HSL
 * 4. Provides CSS variables to NativeWind
 * 5. Exposes theme context to children
 *
 * THEME PROCESSING FLOW:
 * 1. User provides custom theme → mergedColors (useMemo)
 * 2. mergedColors + custom extensions → themes CSS variables (useMemo)
 * 3. themes[currentTheme] → Applied to View wrapper
 * 4. colors state → Exposed via context for runtime usage
 *
 * @param {ReactNode} children - Child components to wrap
 * @param {'light' | 'dark' | 'system'} colorScheme - Initial theme (defaults to 'light')
 * @param {ThemeConfig} theme - Custom theme configuration to merge with defaults
 */
export const ThemeProvider = ({
  children,
  colorScheme = 'light',
  theme: customTheme,
}: ThemeProviderProps) => {
  // Current active theme state
  const [currentTheme, setCurrentTheme] = useState<ColorScheme>('light');

  /**
   * STEP 1: COLOR MERGING & PROCESSING
   * ===================================
   * Merges custom theme colors with defaults and processes them to HSL format
   *
   * Process flow for each custom color:
   * 1. Extract custom color value from theme config
   * 2. Get corresponding default color as fallback
   * 3. Validate and convert color to HSL via processColorValue()
   * 4. Wrap with hsl() for runtime usage via formatHSL()
   * 5. Deep merge with defaults
   *
   * @returns {Object} Merged color constants for both light and dark themes
   */
  const mergedColors = useMemo(() => {
    const result = { ...defaultColors };

    if (customTheme) {
      // Process light theme colors
      if (customTheme.light?.colors) {
        const processedColors: Partial<ColorConstants> = {};

        for (const [key, value] of Object.entries(customTheme.light.colors)) {
          // Get the default color for this key to use as fallback
          const defaultColorValue =
            defaultColors.light[key as keyof ColorConstants];
          // Unwrap default: 'hsl(0 100% 50%)' → '0 100% 50%'
          const defaultCSSVar = formatHSL(defaultColorValue, false);
          // Validate & convert: '#ff0000' → '0 100% 50%'
          const hslValue = processColorValue(value, key, defaultCSSVar);
          // Wrap for runtime: '0 100% 50%' → 'hsl(0 100% 50%)'
          processedColors[key as keyof ColorConstants] = formatHSL(
            hslValue,
            true
          );
        }

        result.light = deepMerge(defaultColors.light, processedColors);
      }
      // Process dark theme colors
      if (customTheme.dark?.colors) {
        const processedColors: Partial<ColorConstants> = {};
        for (const [key, value] of Object.entries(customTheme.dark.colors)) {
          // Get the default color for this key to use as fallback
          const defaultColorValue =
            defaultColors.dark[key as keyof ColorConstants];
          // Unwrap default: 'hsl(0 100% 50%)' → '0 100% 50%'
          const defaultCSSVar = formatHSL(defaultColorValue, false);
          // Validate & convert: '#ff0000' → '0 100% 50%'
          const hslValue = processColorValue(value, key, defaultCSSVar);
          // Wrap for runtime: '0 100% 50%' → 'hsl(0 100% 50%)'
          processedColors[key as keyof ColorConstants] = formatHSL(
            hslValue,
            true
          );
        }
        result.dark = deepMerge(defaultColors.dark, processedColors);
      }
    }

    return result;
  }, [customTheme]);

  // Runtime color constants for the current theme
  const [colors, setColors] = useState<ColorConstants>(mergedColors.light);

  /**
   * STEP 2: CSS VARIABLES GENERATION
   * =================================
   * Builds CSS variables for NativeWind from merged colors
   *
   * Transformations:
   * 1. Start with default theme variables (colors + non-colors)
   * 2. Convert merged colors to CSS vars:
   *    - Unwrap hsl(): 'hsl(0 100% 50%)' → '0 100% 50%'
   *    - Rename keys: 'primaryForeground' → '--primary-foreground'
   * 3. Add custom non-color variables (radius, opacity, etc.)
   * 4. Wrap with vars() for NativeWind
   *
   * @returns {Object} CSS variables for light and dark themes
   */
  const themes = useMemo(() => {
    if (!customTheme) {
      return defaultThemes;
    }

    const result: Record<ColorScheme, Record<string, string>> = {} as any;

    // Process light theme
    const lightVars: ThemeVariables = {
      // Start with defaults (includes --radius, --opacity-disabled, etc.)
      ...themeVariables.light,
      // Override with processed custom colors as CSS vars
      ...colorsToCSSVars(mergedColors.light),
    };

    if (customTheme.light) {
      // Add custom non-color variables (borderRadius, opacity)
      Object.assign(lightVars, extensionToCSSVars(customTheme.light));
    }
    // Wrap with vars() for NativeWind consumption
    result.light = vars<ThemeVariables>(lightVars);

    // Process dark theme
    const darkVars: ThemeVariables = {
      // Start with defaults (includes --radius, --opacity-disabled, etc.)
      ...themeVariables.dark,
      // Override with processed custom colors as CSS vars
      ...colorsToCSSVars(mergedColors.dark),
    };

    if (customTheme.dark) {
      // Add custom non-color variables (borderRadius, opacity)
      Object.assign(darkVars, extensionToCSSVars(customTheme.dark));
    }
    // Wrap with vars() for NativeWind consumption
    result.dark = vars<ThemeVariables>(darkVars);

    return result;
  }, [customTheme, mergedColors]);

  /**
   * STEP 3: THEME SWITCHING
   * ========================
   * Sets the active theme and updates all related state
   *
   * Actions performed:
   * 1. Update local theme state
   * 2. Update NativeWind's color scheme (for system integration)
   * 3. Update runtime color constants for the new theme
   *
   * @param {ColorScheme} theme - Theme to switch to ('light' | 'dark')
   */
  const setTheme = useCallback(
    (theme: ColorScheme) => {
      setCurrentTheme(theme);
      colorSchemeNativeWind.set(theme); // NativeWind system integration
      setColors(mergedColors[theme]); // Update runtime colors
    },
    [mergedColors]
  );

  /**
   * STEP 4: INITIAL THEME SETUP
   * ============================
   * Sets the initial theme based on colorScheme prop
   *
   * Logic:
   * - If 'system': Read system preference via colorScheme.get()
   * - Otherwise: Use the specified default theme
   */
  useEffect(() => {
    if (colorScheme === 'system') {
      const systemScheme =
        colorSchemeNativeWind.get() === 'dark' ? 'dark' : 'light';
      setTheme(systemScheme);
    } else {
      setTheme(colorScheme);
    }
  }, [colorScheme, setTheme]);

  /**
   * Utility to toggle between light and dark themes
   */
  const toggleTheme = useCallback(() => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  }, [currentTheme, setTheme]);

  /**
   * Context value provided to children
   */
  const value = useMemo(
    () => ({
      theme: currentTheme,
      isDark: currentTheme === 'dark',
      colors,
      toggleTheme,
      setTheme,
    }),
    [currentTheme, colors, toggleTheme, setTheme]
  );

  /**
   * STEP 5: RENDER WITH CSS VARIABLES
   * ==================================
   *
   * Render structure:
   * 1. ThemeContext.Provider - Exposes theme state/utilities
   * 2. View with style={themes[currentTheme]} - Applies CSS variables
   * 3. className="flex-1" - Ensures full height
   *
   * The CSS variables from themes[currentTheme] are injected into
   * the View's style, making them available to all NativeWind classes
   * within the tree (e.g., 'bg-primary', 'text-muted-foreground')
   */
  return (
    <ThemeContext.Provider value={value}>
      <View style={themes[currentTheme]} className="flex-1">
        {children}
      </View>
    </ThemeContext.Provider>
  );
};

/**
 * useTheme Hook
 *
 * Provides access to the theme context
 *
 * @returns {ThemeContextType} Theme state and utilities
 * @throws {Error} If used outside of ThemeProvider
 *
 * @example
 * const { theme, isDark, colors, toggleTheme } = useTheme();
 */
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
