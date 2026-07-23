import { I18nManager } from 'react-native';
import { useLayoutDirectionContext } from '../contexts';

/**
 * Hook that resolves the effective layout direction for JS-driven logic
 * (e.g. gesture deltas) that Yoga logical props cannot cover.
 *
 * @description
 * Reads the direction provided via `HeroUINativeProvider` config (`isRTL`).
 * Falls back to the global `I18nManager.isRTL` state when no provider value
 * is available, which matches the default React Native behavior.
 *
 * @returns `true` when the layout direction is right-to-left
 */
export function useIsRTL(): boolean {
  const context = useLayoutDirectionContext();

  return context?.isRTL ?? I18nManager.isRTL;
}
