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
import { colorsToCSSVars, deepMerge, extensionToCSSVars } from './helpers';
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

  // Merge custom theme with default colors
  const mergedColors = useMemo(() => {
    const result = { ...defaultColors };

    if (customTheme?.extend) {
      if (customTheme.extend.light?.colors) {
        result.light = deepMerge(
          defaultColors.light,
          customTheme.extend.light.colors
        );
      }
      if (customTheme.extend.dark?.colors) {
        result.dark = deepMerge(
          defaultColors.dark,
          customTheme.extend.dark.colors
        );
      }
    }

    return result;
  }, [customTheme]);

  const [colors, setColors] = useState<ColorConstants>(mergedColors.light);

  // Build theme CSS variables with custom overrides
  const themes = useMemo(() => {
    if (!customTheme?.extend) {
      return defaultThemes;
    }

    const result: Record<ColorScheme, Record<string, string>> = {} as any;

    // Process light theme
    const lightVars: ThemeVariables = { ...themeVariables.light };
    if (customTheme.extend.light) {
      // Add color overrides
      if (customTheme.extend.light.colors) {
        Object.assign(
          lightVars,
          colorsToCSSVars(customTheme.extend.light.colors)
        );
      }
      // Add non-color overrides
      Object.assign(lightVars, extensionToCSSVars(customTheme.extend.light));
    }
    result.light = vars<ThemeVariables>(lightVars);

    // Process dark theme
    const darkVars: ThemeVariables = { ...themeVariables.dark };
    if (customTheme.extend.dark) {
      // Add color overrides
      if (customTheme.extend.dark.colors) {
        Object.assign(
          darkVars,
          colorsToCSSVars(customTheme.extend.dark.colors)
        );
      }
      // Add non-color overrides
      Object.assign(darkVars, extensionToCSSVars(customTheme.extend.dark));
    }
    result.dark = vars<ThemeVariables>(darkVars);

    return result;
  }, [customTheme]);

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
