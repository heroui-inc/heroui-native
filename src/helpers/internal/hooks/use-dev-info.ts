import { useEffect } from 'react';
import type { DevInfoConfig } from '../../../providers/hero-ui-native/types';

const LOG_COLOR = {
  BLUE: '\x1b[34m',
  YELLOW: '\x1b[33m',
  RESET: '\x1b[0m',
};

/**
 * Hook that displays developer information messages in the console.
 *
 * @description
 * Logs helpful styling principles and best practices during development.
 * Messages are only shown in __DEV__ mode and can be disabled via the
 * devInfo configuration.
 *
 * @param {DevInfoConfig} [devInfo] - Developer information configuration
 */
export function useDevInfo(devInfo?: DevInfoConfig): void {
  const { stylingPrinciples = true } = devInfo || {};

  useEffect(() => {
    if (__DEV__ && stylingPrinciples) {
      console.info(
        `${LOG_COLOR.BLUE}HeroUI Native Styling Principles${LOG_COLOR.RESET}\n` +
          `• className: this is your go-to styling solution. Use Tailwind CSS classes via className prop on all components.\n` +
          `• StyleSheet precedence: The style prop (StyleSheet API) has precedence over className when both are provided. This allows you to override Tailwind classes when needed.\n` +
          `• Animated styles: Some style properties are animated using react-native-reanimated and have precedence over className. To identify which styles are animated:\n` +
          `  - Hover over className in your IDE - TypeScript definitions show which properties are occupied by animated styles\n` +
          `  - Check component documentation - Each component page includes a link to the component's style source\n` +
          `• If styles are occupied by animation, modify them via the animation prop on components that support it.\n` +
          `• To deactivate animated style completely and apply your own styles, use isAnimatedStyleActive prop.\n` +
          `${LOG_COLOR.YELLOW}💡 To disable this message, set config.devInfo.stylingPrinciples to false${LOG_COLOR.RESET}`
      );
    }
  }, [stylingPrinciples]);
}
