import type { ReactNode } from 'react';
import type { AnimationRootDisableAll } from '../../helpers/internal/types';
import type { TextComponentContextValue } from '../text-component/types';
import type { ToastProviderProps } from '../toast/types';

/**
 * Developer information messages configuration
 *
 * @interface DevInfoConfig
 *
 * @description
 * Controls developer-facing informational messages displayed in the console.
 * These messages provide important guidance and best practices.
 */
export interface DevInfoConfig {
  /**
   * Show styling principles information message
   *
   * @description
   * When set to `false`, disables the styling principles information message
   * that appears in the console during development.
   *
   * @default true
   */
  stylingPrinciples?: boolean;
}

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
   * Global animation configuration
   *
   * @description
   * When set to 'disable-all', all animations across the application will be disabled.
   */
  animation?: AnimationRootDisableAll;
  /**
   * Toast configuration
   *
   * @description
   * Configure the global toast system including insets and wrapper components.
   * Set to `false` or `'disabled'` to disable the toast provider entirely.
   * Provide a `ToastProviderProps` object for custom configuration.
   */
  toast?: boolean | 'disabled' | ToastProviderProps;
  /**
   * Developer information messages configuration
   *
   * @description
   * Controls developer-facing informational messages displayed in the console.
   * Use this to disable specific informational messages during development.
   */
  devInfo?: DevInfoConfig;
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
