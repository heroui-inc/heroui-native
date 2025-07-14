import { colorScheme } from 'nativewind';
import { createContext, useContext, useEffect, useState } from 'react';
import { View } from 'react-native';
import { colors as colorConstants } from './colors';
import { themes } from './themes';
import type {
  ColorScheme,
  ColorVariables,
  ThemeContextType,
  ThemeProviderProps,
} from './types';

export const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  colors: colorConstants.light,
  toggleTheme: () => {},
  setTheme: () => {},
});

export const ThemeProvider = ({
  children,
  defaultTheme = 'light',
}: ThemeProviderProps) => {
  const [currentTheme, setCurrentTheme] = useState<ColorScheme>('light');
  const [colors, setColors] = useState<ColorVariables>(colorConstants.light);

  const setTheme = (theme: ColorScheme) => {
    setCurrentTheme(theme);
    colorScheme.set(theme);
    setColors(colorConstants[theme]);
  };

  useEffect(() => {
    if (defaultTheme === 'system') {
      const systemScheme = colorScheme.get() === 'dark' ? 'dark' : 'light';
      setTheme(systemScheme);
    } else {
      setTheme(defaultTheme);
    }
  }, [defaultTheme]);

  const toggleTheme = () => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider
      value={{ theme: currentTheme, colors, toggleTheme, setTheme }}
    >
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
