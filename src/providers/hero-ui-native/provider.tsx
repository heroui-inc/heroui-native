import React from 'react';
import { PortalHost } from '../../primitives/portal';
import { TextComponentProvider } from '../text-component/provider';
import type { HeroUINativeProviderProps } from './types';

/**
 * HeroUINativeProvider Component
 *
 * @description
 * Main provider component for HeroUI Native that configures the application
 * with global settings. This component should wrap your entire application
 * or the section where you want to use HeroUI Native components.
 *
 * Currently provides:
 * - Global text component configuration
 * - Portal management for overlays
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
 * With text component configuration:
 * ```tsx
 * <HeroUINativeProvider
 *   config={{
 *     textProps: {
 *       allowFontScaling: false,
 *       adjustsFontSizeToFit: false,
 *       maxFontSizeMultiplier: 1.5
 *     }
 *   }}
 * >
 *   <YourApp />
 * </HeroUINativeProvider>
 * ```
 *
 * @see {@link HeroUINativeConfig} - Configuration options
 */
export const HeroUINativeProvider: React.FC<HeroUINativeProviderProps> = ({
  children,
  config = {},
}) => {
  const { textProps } = config;

  return (
    <TextComponentProvider value={{ textProps }}>
      {children}
      <PortalHost />
    </TextComponentProvider>
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
