import React from 'react';
import { PortalHost } from '../../primitives/portal';
import { TextComponentProvider } from '../text-component/provider';
import { Toaster } from '../toast/provider';
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
 * - Toast notification system
 * - Portal management for overlays
 *
 * @param {HeroUINativeProviderProps} props - Provider configuration props
 * @param {ReactNode} props.children - Child components to wrap
 * @param {HeroUINativeConfig} [props.config] - Configuration object
 *
 */
export const HeroUINativeProvider: React.FC<HeroUINativeProviderProps> = ({
  children,
  config = {},
}) => {
  const { textProps, toast } = config;
  const { isDisabled: isToastDisabled = false, ...toastProps } = toast || {};

  return (
    <TextComponentProvider value={{ textProps }}>
      <Toaster {...toastProps}>{children}</Toaster>
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
