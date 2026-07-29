import { Platform } from 'react-native';
import { GLASS_THEME_VALUE } from '../../../components/glass-view/glass-view.constants';
import ExpoBlur from '../../../optional/expo-blur';
import type { PopupOverlayVariant } from '../types/overlay';
import { useLibraryTheme } from './use-library-theme';

/**
 * The blur backdrop requires expo-blur and is only rendered on iOS.
 * On other platforms (or when expo-blur is not installed) the overlay
 * falls back to the `default` solid backdrop.
 */
const IS_BLUR_SUPPORTED = Platform.OS === 'ios' && Boolean(ExpoBlur);

/**
 * Resolves the effective overlay variant for the popup components whose
 * overlay paints a solid backdrop (Dialog, BottomSheet).
 *
 * When `variant` is omitted, the `glass` library theme defaults to `blur`;
 * every other theme defaults to `default`. A requested `blur` variant is
 * downgraded to `default` when blur is unsupported (non-iOS or expo-blur
 * missing).
 */
export function usePopupOverlayVariant(variant?: PopupOverlayVariant): {
  resolvedVariant: PopupOverlayVariant;
  isBlurVariant: boolean;
} {
  const theme = useLibraryTheme();

  const requestedVariant =
    variant ?? (theme === GLASS_THEME_VALUE ? 'blur' : 'default');

  const resolvedVariant: PopupOverlayVariant =
    requestedVariant === 'blur' && IS_BLUR_SUPPORTED ? 'blur' : 'default';

  return {
    resolvedVariant,
    isBlurVariant: resolvedVariant === 'blur',
  };
}
