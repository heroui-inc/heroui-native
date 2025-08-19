import React from 'react';
import { ThemeProvider } from '../../theme/provider';
import { TextComponentProvider } from '../text-component/provider';
import type { HeroUINativeProviderProps } from './types';

/**
 * HeroUINativeProvider Component
 *
 * @description
 * Main provider component for HeroUI Native that configures the application
 * with theme settings and other global configurations. This component should
 * wrap your entire application or the section where you want to use HeroUI
 * Native components.
 *
 * Currently provides:
 * - Theme management (light/dark mode)
 * - Custom theme configuration
 * - Color scheme preferences
 * - Global text component configuration
 *
 * @param {HeroUINativeProviderProps} props - Provider configuration props
 * @param {ReactNode} props.children - Child components to wrap
 * @param {HeroUINativeConfig} [props.config] - Configuration object
 *
 * @example
 * Basic usage with default settings:
 * ```tsx
 * import { HeroUINativeProvider } from '@heroui/native';
 *
 * function App() {
 *   return (
 *     <HeroUINativeProvider>
 *       <YourApp />
 *     </HeroUINativeProvider>
 *   );
 * }
 * ```
 *
 * @example
 * With dark mode enabled:
 * ```tsx
 * <HeroUINativeProvider config={{ colorScheme: 'dark' }}>
 *   <YourApp />
 * </HeroUINativeProvider>
 * ```
 *
 * @example
 * With custom theme configuration:
 * ```tsx
 * <HeroUINativeProvider
 *   config={{
 *     colorScheme: 'system',
 *     theme: {
 *       light: {
 *         colors: {
 *           accent: '#007AFF',
 *           success: '#34C759',
 *           warning: '#FF9500',
 *           danger: '#FF3B30'
 *         },
 *         borderRadius: {
 *           DEFAULT: '16px',
 *           panel: '12px',
 *           'panel-inner': '6px'
 *         },
 *         opacity: {
 *           disabled: 0.4
 *         }
 *       },
 *       dark: {
 *         colors: {
 *           background: '#000000',
 *           foreground: '#FFFFFF',
 *           accent: '#0A84FF'
 *         }
 *       }
 *     },
 *     textProps: {
 *       allowFontScaling: false,
 *       style: { fontFamily: 'Inter' }
 *     }
 *   }}
 * >
 *   <YourApp />
 * </HeroUINativeProvider>
 * ```
 *
 * @example
 * Accessing theme in child components:
 * ```tsx
 * import { useTheme } from '@heroui/native';
 *
 * function MyComponent() {
 *   const { theme, isDark, toggleTheme, colors } = useTheme();
 *
 *   return (
 *     <View>
 *       <Text>Current theme: {theme}</Text>
 *       <Button onPress={toggleTheme}>
 *         Toggle Theme
 *       </Button>
 *     </View>
 *   );
 * }
 * ```
 *
 * @see {@link ThemeProvider} - The underlying theme provider
 * @see {@link useTheme} - Hook to access theme context
 * @see {@link HeroUINativeConfig} - Configuration options
 */
export const HeroUINativeProvider: React.FC<HeroUINativeProviderProps> = ({
  children,
  config = {},
}) => {
  const { colorScheme, theme, textProps } = config;

  return (
    <ThemeProvider colorScheme={colorScheme} theme={theme}>
      <TextComponentProvider value={{ textProps }}>
        {children}
      </TextComponentProvider>
    </ThemeProvider>
  );
};

/**
 * Default export for convenience
 *
 * @description
 * Allows importing the provider without destructuring:
 * ```tsx
 * import HeroUINativeProvider from '@heroui/native/provider';
 * ```
 */
export default HeroUINativeProvider;
