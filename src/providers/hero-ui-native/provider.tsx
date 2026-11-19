import React, { useMemo } from 'react';
import { I18nManager } from 'react-native';
import { SafeAreaListener } from 'react-native-safe-area-context';
import { Uniwind } from 'uniwind';
import { LayoutDirectionProvider } from '../../helpers/internal/contexts';
import { useDevInfo } from '../../helpers/internal/hooks';
import TrueSheetPackage from '../../optional/true-sheet';
import { PortalHost } from '../../primitives/portal';
import { GlobalAnimationSettingsProvider } from '../animation-settings';
import { TextComponentProvider } from '../text-component/provider';
import { TextInputComponentProvider } from '../text-input-component/provider';
import { ToastProvider } from '../toast/provider';
import type { HeroUINativeProviderProps } from './types';

const TrueSheetProvider = TrueSheetPackage?.TrueSheetProvider;

/**
 * Wraps the tree in TrueSheet's provider when the optional package is
 * installed. It passes through on native; on web it hosts the sheet
 * registry and portal that `BottomSheet` needs.
 */
function SheetProvider({ children }: { children: React.ReactNode }) {
  if (!TrueSheetProvider) {
    return <>{children}</>;
  }

  return <TrueSheetProvider>{children}</TrueSheetProvider>;
}

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
 * - Global text input component configuration
 * - Toast notification system
 * - Portal management for overlays
 * - TrueSheet provider for `BottomSheet` (when the package is installed)
 *
 * @param {HeroUINativeProviderProps} props - Provider configuration props
 * @param {ReactNode} props.children - Child components to wrap
 * @param {HeroUINativeConfig} [props.config] - Configuration object
 *
 */
const HeroUINativeProvider: React.FC<HeroUINativeProviderProps> = ({
  children,
  config = {},
}) => {
  const { textProps, textInputProps, toast, animation, devInfo, isRTL } =
    config;

  useDevInfo(devInfo);

  // Determine if toast should be enabled and get props
  const isToastEnabled = toast !== false && toast !== 'disabled';
  const toastProps = typeof toast === 'object' ? toast : {};

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
      <SheetProvider>
        <LayoutDirectionProvider value={layoutDirectionValue}>
          <GlobalAnimationSettingsProvider animation={animation}>
            <TextComponentProvider value={{ textProps }}>
              <TextInputComponentProvider value={{ textInputProps }}>
                {isToastEnabled ? (
                  <ToastProvider {...toastProps}>
                    {children}
                    <PortalHost />
                  </ToastProvider>
                ) : (
                  <>
                    {children}
                    <PortalHost />
                  </>
                )}
              </TextInputComponentProvider>
            </TextComponentProvider>
          </GlobalAnimationSettingsProvider>
        </LayoutDirectionProvider>
      </SheetProvider>
    </SafeAreaListener>
  );
};

export default HeroUINativeProvider;
