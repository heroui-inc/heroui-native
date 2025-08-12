import type { ThemeConfig } from 'heroui-native';
import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { pastelThemes, type ThemeId } from '../themes/pastel-themes';

interface AppThemeContextType {
  currentThemeId: ThemeId;
  currentTheme: ThemeConfig | undefined;
  setThemeById: (id: ThemeId) => void;
  availableThemes: typeof pastelThemes;
}

const AppThemeContext = createContext<AppThemeContextType | undefined>(
  undefined
);
export const AppThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [currentThemeId, setCurrentThemeId] = useState<ThemeId>('default');

  const setThemeById = useCallback((id: ThemeId) => {
    setCurrentThemeId(id);
  }, []);

  const currentTheme = useMemo(() => {
    const theme = pastelThemes.find((t) => t.id === currentThemeId);
    return theme?.config;
  }, [currentThemeId]);

  const value = useMemo(
    () => ({
      currentThemeId,
      currentTheme,
      setThemeById,
      availableThemes: pastelThemes,
    }),
    [currentThemeId, currentTheme, setThemeById]
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
