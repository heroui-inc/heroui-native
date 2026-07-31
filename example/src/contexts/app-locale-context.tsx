import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { activateLocale } from '../i18n/i18n';
import { DEFAULT_LOCALE, isRtlLocale, type AppLocale } from '../i18n/locales';

interface AppLocaleContextType {
  /** Active locale the app is rendered in */
  locale: AppLocale;
  /** Choose which locale to render the app in */
  setLocale: (locale: AppLocale) => void;
  /** Whether the active locale is rendered right-to-left */
  isRTL: boolean;
}

const AppLocaleContext = createContext<AppLocaleContextType | undefined>(
  undefined
);

/**
 * Provides the demo-level locale state and the layout direction it implies.
 *
 * The selected locale is the single source of truth: `isRTL` is derived from it
 * rather than being toggled independently, so picking Arabic or Hebrew also
 * flips the layout, and picking English restores left-to-right.
 *
 * `isRTL` drives both Uniwind's `LayoutDirection` wrapper (Yoga direction and
 * `rtl:` variants) and the `isRTL` flag passed to `HeroUINativeProvider`.
 */
export const AppLocaleProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [locale, setLocale] = useState<AppLocale>(DEFAULT_LOCALE);

  const isRTL = isRtlLocale(locale);

  useEffect(() => {
    activateLocale(locale);
  }, [locale]);

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      isRTL,
    }),
    [locale, isRTL]
  );

  return (
    <AppLocaleContext.Provider value={value}>
      {children}
    </AppLocaleContext.Provider>
  );
};

export const useAppLocale = () => {
  const context = useContext(AppLocaleContext);
  if (!context) {
    throw new Error('useAppLocale must be used within AppLocaleProvider');
  }
  return context;
};
