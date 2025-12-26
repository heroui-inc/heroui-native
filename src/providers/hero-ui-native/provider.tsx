import React from 'react';
import { SafeAreaListener } from 'react-native-safe-area-context';
import { Uniwind } from 'uniwind';
import { PortalHost } from '../../primitives/portal';
import { GlobalAnimationSettingsProvider } from '../animation-settings';
import { TextComponentProvider } from '../text-component/provider';
import { ToastProvider } from '../toast/provider';
import type { HeroUINativeProviderProps } from './types';

export const Root = () => (
  <SafeAreaListener
    onChange={({ insets }) => {
      Uniwind.updateInsets(insets);
    }}
  >
    {/* app content */}
  </SafeAreaListener>
);

/**
 * HeroUINativeProvider Component
 *
 * @description
 * Main provider component for HeroUI Native that configures the application
 * with global settings. This component should wrap your entire application
 * or the section where you want to use HeroUI Native components.
 *
 * Currently provides:
 * - Global animation settings
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
  const { textProps, toast, animation } = config;
  const { ...toastProps } = toast || {};

  return (
    <SafeAreaListener
      onChange={({ insets }) => {
        Uniwind.updateInsets(insets);
      }}
    >
      <GlobalAnimationSettingsProvider animation={animation}>
        <TextComponentProvider value={{ textProps }}>
          <ToastProvider {...toastProps}>
            {children}
            <PortalHost />
          </ToastProvider>
        </TextComponentProvider>
      </GlobalAnimationSettingsProvider>
    </SafeAreaListener>
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
