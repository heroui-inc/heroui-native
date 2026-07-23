import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

interface AppDirectionContextType {
  /** Whether the app is currently rendered right-to-left */
  isRTL: boolean;
  /** Set the layout direction explicitly */
  setIsRTL: (isRTL: boolean) => void;
  /** Toggle between left-to-right and right-to-left */
  toggleDirection: () => void;
}

const AppDirectionContext = createContext<AppDirectionContextType | undefined>(
  undefined
);

/**
 * Provides a demo-level layout direction state. The value drives both
 * Uniwind's `LayoutDirection` wrapper (Yoga direction + `rtl:` variants)
 * and the `isRTL` flag passed to `HeroUINativeProvider`.
 */
export const AppDirectionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isRTL, setIsRTL] = useState(false);

  const toggleDirection = useCallback(() => {
    setIsRTL((prev) => !prev);
  }, []);

  const value = useMemo(
    () => ({
      isRTL,
      setIsRTL,
      toggleDirection,
    }),
    [isRTL, toggleDirection]
  );

  return (
    <AppDirectionContext.Provider value={value}>
      {children}
    </AppDirectionContext.Provider>
  );
};

export const useAppDirection = () => {
  const context = useContext(AppDirectionContext);
  if (!context) {
    throw new Error('useAppDirection must be used within AppDirectionProvider');
  }
  return context;
};
