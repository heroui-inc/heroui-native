import React from 'react';
import { SafeAreaListener } from 'react-native-safe-area-context';
import { Uniwind } from 'uniwind';
import { useDevInfo } from '../../helpers/internal/hooks';
import { GlobalAnimationSettingsProvider } from '../animation-settings';
import { TextComponentProvider } from '../text-component/provider';
import type { HeroUINativeProviderRawProps } from './types';

/**
 * HeroUINativeProviderRaw Component
 *
 * @description
 * Raw provider component for HeroUI Native that configures the application
 * with global settings but without ToastProvider and PortalHost.
 * Use this when you need to manage toast and portal functionality separately
 * (e.g. nested providers or custom setups).
 *
 * Currently provides:
 * - Global animation settings
 * - Global text component configuration
 *
 * @param {HeroUINativeProviderRawProps} props - Provider configuration props
 * @param {ReactNode} props.children - Child components to wrap
 * @param {HeroUINativeConfigRaw} [props.config] - Configuration object
 *
 */
const HeroUINativeProviderRaw: React.FC<HeroUINativeProviderRawProps> = ({
  children,
  config = {},
}) => {
  const { textProps, animation, devInfo } = config;

  useDevInfo(devInfo);

  return (
    <SafeAreaListener
      onChange={({ insets }) => {
        Uniwind.updateInsets(insets);
      }}
    >
      <GlobalAnimationSettingsProvider animation={animation}>
        <TextComponentProvider value={{ textProps }}>
          {children}
        </TextComponentProvider>
      </GlobalAnimationSettingsProvider>
    </SafeAreaListener>
  );
};

export default HeroUINativeProviderRaw;
