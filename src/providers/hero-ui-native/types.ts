import type { ReactNode } from 'react';
import type { TextComponentContextValue } from '../text-component/types';

/**
 * Configuration object for HeroUINativeProvider
 *
 * @interface HeroUINativeConfig
 * @extends TextComponentContextValue
 *
 * @description
 * Contains configuration options for the HeroUI Native provider.
 * Additional configuration options can be added in future versions.
 */
export interface HeroUINativeConfig extends TextComponentContextValue {
  /**
   * Future configuration options can be added here
   * For now, it extends TextComponentContextValue (textProps)
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
 *   textProps: {
 *     allowFontScaling: false,
 *     maxFontSizeMultiplier: 1.5
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
   * Contains all configuration options including global text component configuration.
   *
   * @example
   * ```tsx
   * const config: HeroUINativeConfig = {
   *   textProps: {
   *     allowFontScaling: false,
   *     adjustsFontSizeToFit: false,
   *     maxFontSizeMultiplier: 1.5
   *   }
   * };
   * ```
   */
  config?: HeroUINativeConfig;
}
