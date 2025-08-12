import { colorScheme, vars } from 'nativewind';
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

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  isDark: false,
  colors: defaultColors.light,
  toggleTheme: () => {},
  setTheme: () => {},
});

export const ThemeProvider = ({
  children,
  defaultTheme = 'light',
  theme: customTheme,
}: ThemeProviderProps) => {
  const [currentTheme, setCurrentTheme] = useState<ColorScheme>('light');

  // Merge and process custom theme colors with defaults
  const mergedColors = useMemo(() => {
    const result = { ...defaultColors };

    if (customTheme) {
      if (customTheme.light?.colors) {
        // Process custom colors to HSL format for runtime usage
        const processedColors: Partial<ColorConstants> = {};

        for (const [key, value] of Object.entries(customTheme.light.colors)) {
          // Get the default color for this key to use as fallback
          const defaultColorValue =
            defaultColors.light[key as keyof ColorConstants];
          // First unwrap the default color to get CSS var format
          const defaultCSSVar = formatHSL(defaultColorValue, false);
          // Process the custom color
          const hslValue = processColorValue(value, key, defaultCSSVar);
          // Wrap HSL values for runtime usage
          processedColors[key as keyof ColorConstants] = formatHSL(
            hslValue,
            true
          );
        }

        result.light = deepMerge(defaultColors.light, processedColors);
      }
      if (customTheme.dark?.colors) {
        // Process custom colors to HSL format for runtime usage
        const processedColors: Partial<ColorConstants> = {};
        for (const [key, value] of Object.entries(customTheme.dark.colors)) {
          // Get the default color for this key to use as fallback
          const defaultColorValue =
            defaultColors.dark[key as keyof ColorConstants];
          // First unwrap the default color to get CSS var format
          const defaultCSSVar = formatHSL(defaultColorValue, false);
          // Process the custom color
          const hslValue = processColorValue(value, key, defaultCSSVar);
          // Wrap HSL values for runtime usage
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

  const [colors, setColors] = useState<ColorConstants>(mergedColors.light);

  // Build theme CSS variables with custom overrides
  const themes = useMemo(() => {
    if (!customTheme) {
      return defaultThemes;
    }

    const result: Record<ColorScheme, Record<string, string>> = {} as any;

    // Process light theme
    // Start with default theme variables (includes non-color vars)
    const lightVars: ThemeVariables = {
      ...themeVariables.light,
      // Override with processed colors
      ...colorsToCSSVars(mergedColors.light),
    };

    if (customTheme.light) {
      // Add non-color overrides
      Object.assign(lightVars, extensionToCSSVars(customTheme.light));
    }
    result.light = vars<ThemeVariables>(lightVars);

    // Process dark theme
    // Start with default theme variables (includes non-color vars)
    const darkVars: ThemeVariables = {
      ...themeVariables.dark,
      // Override with processed colors
      ...colorsToCSSVars(mergedColors.dark),
    };

    if (customTheme.dark) {
      // Add non-color overrides
      Object.assign(darkVars, extensionToCSSVars(customTheme.dark));
    }
    result.dark = vars<ThemeVariables>(darkVars);

    return result;
  }, [customTheme, mergedColors]);

  const setTheme = useCallback(
    (theme: ColorScheme) => {
      setCurrentTheme(theme);
      colorScheme.set(theme);
      setColors(mergedColors[theme]);
    },
    [mergedColors]
  );

  useEffect(() => {
    if (defaultTheme === 'system') {
      const systemScheme = colorScheme.get() === 'dark' ? 'dark' : 'light';
      setTheme(systemScheme);
    } else {
      setTheme(defaultTheme);
    }
  }, [defaultTheme, setTheme]);

  const toggleTheme = useCallback(() => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  }, [currentTheme, setTheme]);

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

  return (
    <ThemeContext.Provider value={value}>
      <View style={themes[currentTheme]} className="flex-1">
        {children}
      </View>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
