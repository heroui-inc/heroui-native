import type { ExpoBlurBlurViewProps } from '../../../optional/expo-blur';

/**
 * Visual variant of a popup overlay (backdrop layer).
 * - `default`: solid backdrop driven by the `--color-backdrop` token
 * - `blur`: iOS-only blur backdrop rendered with expo-blur
 */
export type PopupOverlayVariant = 'default' | 'blur';

/**
 * Props forwarded to the internal BlurView rendered by the `blur` overlay
 * variant. `intensity` is treated as the maximum (animated) blur intensity.
 */
export type PopupOverlayBlurViewProps = Omit<ExpoBlurBlurViewProps, 'children'>;
