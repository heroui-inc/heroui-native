import React, { useEffect } from 'react';
import { SafeAreaListener } from 'react-native-safe-area-context';
import { Uniwind } from 'uniwind';
import { PortalHost } from '../../primitives/portal';
import { GlobalAnimationSettingsProvider } from '../animation-settings';
import { TextComponentProvider } from '../text-component/provider';
import { ToastProvider } from '../toast/provider';
import type { HeroUINativeProviderProps } from './types';

const LOG_COLOR = {
  BLUE: '\x1b[34m',
  RESET: '\x1b[0m',
};

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

  useEffect(() => {
    if (__DEV__) {
      console.info(
        `${LOG_COLOR.BLUE}HeroUI Native Styling Principles${LOG_COLOR.RESET}\n` +
          `• className: this is your go-to styling solution. Use Tailwind CSS classes via className prop on all components.\n` +
          `• StyleSheet precedence: The style prop (StyleSheet API) has precedence over className when both are provided. This allows you to override Tailwind classes when needed.\n` +
          `• Animated styles: Some style properties are animated using react-native-reanimated and have precedence over className. To identify which styles are animated:\n` +
          `  - Hover over className in your IDE - TypeScript definitions show which properties are occupied by animated styles\n` +
          `  - Check component documentation - Each component page includes a link to the component's style source\n` +
          `• If styles are occupied by animation, modify them via the animation prop on components that support it.\n` +
          `• To deactivate animated style completely and apply your own styles, use isAnimatedStyleActive prop.`
      );
    }
  }, []);

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
 * Re-export PortalHost for advanced use cases.
 *
 * @description
 * Allows consumers to manually mount a portal host in custom layouts
 * (e.g. for BottomSheet, Modal, or any overlay components).
 */
export { PortalHost };

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
