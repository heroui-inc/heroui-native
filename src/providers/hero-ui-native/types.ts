import type { ReactNode } from 'react';
import type { ThemeProviderProps } from '../../theme/types';
import type { TextComponentContextValue } from '../text-component/types';

/**
 * Configuration object for HeroUINativeProvider
 *
 * @interface HeroUINativeConfig
 * @extends Omit<ThemeProviderProps, 'children'>
 *
 * @description
 * Extends the theme provider configuration and will include
 * additional configuration options in future versions.
 */
export interface HeroUINativeConfig
  extends Omit<ThemeProviderProps, 'children'>,
    TextComponentContextValue {
  /**
   * Future configuration options can be added here
   * For now, it extends ThemeProviderProps (colorScheme, theme) and TextComponentContextValue (textProps)
   */
}

/**
 * Props for HeroUINativeProvider component
 *
 * @interface HeroUINativeProviderProps
 *
 * @description
 * Main provider component props that wraps the entire application
 * or a section of it to provide HeroUI Native functionality.
 *
 * @example
 * ```tsx
 * <HeroUINativeProvider config={{
 *   colorScheme: 'dark',
 *   theme: {
 *     light: {
 *       colors: {
 *         accent: '#007AFF'
 *       }
 *     }
 *   }
 * }}>
 *   <App />
 * </HeroUINativeProvider>
 * ```
 */
export interface HeroUINativeProviderProps {
  /**
   * Child components to render within the provider
   *
   * @description
   * All children will have access to HeroUI Native theme
   * and configuration through the provider.
   */
  children: ReactNode;

  /**
   * Configuration object for the provider
   *
   * @description
   * Contains all configuration options including theme settings,
   * color scheme preference, and future configuration options.
   *
   * @example
   * ```tsx
   * const config: HeroUINativeConfig = {
   *   colorScheme: 'system',
   *   theme: {
   *     light: {
   *       colors: {
   *         background: '#ffffff',
   *         foreground: '#000000',
   *         accent: 'hsl(220 90% 50%)',
   *         success: '#00C853'
   *       },
   *       borderRadius: {
   *         DEFAULT: '16px',
   *         panel: '12px'
   *       }
   *     },
   *     dark: {
   *       colors: {
   *         background: '#000000',
   *         foreground: '#ffffff',
   *         accent: 'hsl(220 90% 60%)'
   *       }
   *     }
   *   }
   * };
   * ```
   */
  config?: HeroUINativeConfig;
}
