import React, { useMemo } from 'react';
import { I18nManager } from 'react-native';
import { SafeAreaListener } from 'react-native-safe-area-context';
import { Uniwind } from 'uniwind';
import { LayoutDirectionProvider } from '../../helpers/internal/contexts';
import { useDevInfo } from '../../helpers/internal/hooks';
import { GlobalAnimationSettingsProvider } from '../animation-settings';
import { TextComponentProvider } from '../text-component/provider';
import { TextInputComponentProvider } from '../text-input-component/provider';
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
 * - Global text input component configuration
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
  const { textProps, textInputProps, animation, devInfo, isRTL } = config;

  useDevInfo(devInfo);

  // Resolve the effective layout direction, falling back to the global RTL state
  const layoutDirectionValue = useMemo(
    () => ({ isRTL: isRTL ?? I18nManager.isRTL }),
    [isRTL]
  );

  return (
    <SafeAreaListener
      onChange={({ insets }) => {
        Uniwind.updateInsets(insets);
      }}
    >
      <LayoutDirectionProvider value={layoutDirectionValue}>
        <GlobalAnimationSettingsProvider animation={animation}>
          <TextComponentProvider value={{ textProps }}>
            <TextInputComponentProvider value={{ textInputProps }}>
              {children}
            </TextInputComponentProvider>
          </TextComponentProvider>
        </GlobalAnimationSettingsProvider>
      </LayoutDirectionProvider>
    </SafeAreaListener>
  );
};

export default HeroUINativeProviderRaw;
