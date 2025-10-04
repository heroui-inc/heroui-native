import { Platform } from 'react-native';
import type {
    HighlightAnimationConfig,
  PressableFeedbackLayoutInfo,
  PressableFeedbackPlatformDefaults,
  PressableFeedbackVariant,
  RippleAnimationConfig,
} from './pressable-feedback.types';

/**
 * Gets the default variant based on the current platform
 * @param platformDefaults - Platform-specific default variants
 * @returns The default variant for the current platform
 */
export function getDefaultVariant(
  platformDefaults: PressableFeedbackPlatformDefaults = {
    ios: 'highlight',
    android: 'ripple',
  }
): PressableFeedbackVariant {
  return platformDefaults[
    Platform.OS as keyof PressableFeedbackPlatformDefaults
  ];
}

/**
 * Calculates the maximum ripple radius from a touch point within a container
 * @param layout - Layout information of the container
 * @param centerX - X coordinate of the touch point
 * @param centerY - Y coordinate of the touch point
 * @returns The calculated ripple radius
 */
export function calculateRippleRadius(
  layout: PressableFeedbackLayoutInfo,
  centerX: number,
  centerY: number
): number {
  const { width, height } = layout;
  const maxX = Math.max(centerX, width - centerX);
  const maxY = Math.max(centerY, height - centerY);
  return Math.sqrt(maxX * maxX + maxY * maxY);
}


/**
 * Validates ripple configuration and applies defaults
 * @param config - Partial ripple configuration
 * @returns Validated ripple configuration with defaults applied
 */
export function validateRippleConfig(
  config?: Partial<RippleAnimationConfig>
): RippleAnimationConfig {
  return {
    color: config?.color ?? 'rgba(0, 0, 0, 0.2)',
    duration: config?.duration ?? 400,
    easing: config?.easing ?? undefined,
    disabled: config?.disabled ?? false,
  };
}

/**
 * Type guard to check if configuration is for ripple variant
 * @param config - Configuration object to check
 * @returns True if configuration is for ripple variant
 */
export function isRippleConfig(
  config: any
): config is { variant: 'ripple' } & RippleAnimationConfig {
  return config?.variant === 'ripple';
}

/**
 * Type guard to check if configuration is for highlight variant
 * @param config - Configuration object to check
 * @returns True if configuration is for highlight variant
 */
export function isHighlightConfig(
  config: any
): config is { variant: 'highlight' } & HighlightAnimationConfig {
  return config?.variant === 'highlight';
}
