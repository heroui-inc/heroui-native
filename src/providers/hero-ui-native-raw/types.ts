import type { ReactNode } from 'react';
import type { HeroUINativeConfig } from '../hero-ui-native/types';

/**
 * Configuration object for HeroUINativeProviderRaw
 *
 * @description
 * A subset of {@link HeroUINativeConfig} containing only the configuration
 * options supported by the raw provider.
 */
export type HeroUINativeConfigRaw = Pick<
  HeroUINativeConfig,
  'textProps' | 'animation' | 'devInfo'
>;

/**
 * Props for HeroUINativeProviderRaw component
 *
 * @interface HeroUINativeProviderRawProps
 *
 * @description
 * Props for the raw variant of the provider that includes only
 * a subset of functionality from {@link HeroUINativeProviderProps}.
 */
export interface HeroUINativeProviderRawProps {
  /**
   * Child components to render within the raw provider
   */
  children: ReactNode;

  /**
   * Configuration object for the raw provider
   *
   * @description
   * A subset of configuration options supported by the raw provider.
   * See {@link HeroUINativeConfigRaw} for available options.
   */
  config?: HeroUINativeConfigRaw;
}
