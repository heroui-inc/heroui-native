import React, { createContext, useCallback, useContext, useMemo } from 'react';
import { Uniwind, useUniwind } from 'uniwind';

type ThemeName =
  | 'light'
  | 'dark'
  | 'lavender-light'
  | 'lavender-dark'
  | 'mint-light'
  | 'mint-dark'
  | 'sky-light'
  | 'sky-dark';

interface AppThemeContextType {
  currentTheme: string;
  isLight: boolean;
  isDark: boolean;
  setTheme: (theme: ThemeName) => void;
  toggleTheme: () => void;
}

const AppThemeContext = createContext<AppThemeContextType | undefined>(
  undefined
);

export const AppThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { theme } = useUniwind();

  const isLight = useMemo(() => {
    return theme === 'light' || theme.endsWith('-light');
  }, [theme]);

  const isDark = useMemo(() => {
    return theme === 'dark' || theme.endsWith('-dark');
  }, [theme]);

  const setTheme = useCallback((newTheme: ThemeName) => {
    Uniwind.setTheme(newTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    switch (theme) {
      case 'light':
        Uniwind.setTheme('dark');
        break;
      case 'dark':
        Uniwind.setTheme('light');
        break;
      case 'lavender-light':
        Uniwind.setTheme('lavender-dark');
        break;
      case 'lavender-dark':
        Uniwind.setTheme('lavender-light');
        break;
      case 'mint-light':
        Uniwind.setTheme('mint-dark');
        break;
      case 'mint-dark':
        Uniwind.setTheme('mint-light');
        break;
      case 'sky-light':
        Uniwind.setTheme('sky-dark');
        break;
      case 'sky-dark':
        Uniwind.setTheme('sky-light');
        break;
    }
  }, [theme]);

  const value = useMemo(
    () => ({
      currentTheme: theme,
      isLight,
      isDark,
      setTheme,
      toggleTheme,
    }),
    [theme, isLight, isDark, setTheme, toggleTheme]
  );

  return (
    <AppThemeContext.Provider value={value}>
      {children}
    </AppThemeContext.Provider>
  );
};

export const useAppTheme = () => {
  const context = useContext(AppThemeContext);
  if (!context) {
    throw new Error('useAppTheme must be used within AppThemeProvider');
  }
  return context;
};
