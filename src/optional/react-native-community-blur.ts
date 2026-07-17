import type { ComponentType, RefAttributes } from 'react';
import type { View, ViewProps } from 'react-native';

/**
 * Mirrors @react-native-community/blur's `blurType` union. Kept in sync
 * manually because the package is an optional peer dependency and cannot be
 * imported statically.
 */
export type CommunityBlurType =
  | 'dark'
  | 'light'
  | 'xlight'
  | 'prominent'
  | 'regular'
  | 'extraDark'
  | 'chromeMaterial'
  | 'material'
  | 'thickMaterial'
  | 'thinMaterial'
  | 'ultraThinMaterial'
  | 'chromeMaterialDark'
  | 'materialDark'
  | 'thickMaterialDark'
  | 'thinMaterialDark'
  | 'ultraThinMaterialDark'
  | 'chromeMaterialLight'
  | 'materialLight'
  | 'thickMaterialLight'
  | 'thinMaterialLight'
  | 'ultraThinMaterialLight';

export type CommunityBlurViewProps = ViewProps & {
  blurType?: CommunityBlurType;
  /** Blur intensity (0-100). */
  blurAmount?: number;
  /** iOS: fallback color when "Reduce Transparency" is enabled. */
  reducedTransparencyFallbackColor?: string;
  /** Android only. */
  blurRadius?: number;
  /** Android only. */
  downsampleFactor?: number;
  /** Android only. */
  overlayColor?: string;
  className?: string;
};

export type CommunityBlurModule = {
  BlurView: ComponentType<CommunityBlurViewProps & RefAttributes<View>>;
};

let CommunityBlurPackage: CommunityBlurModule | undefined;

try {
  CommunityBlurPackage = require('@react-native-community/blur');
} catch (_error) {
  /* @react-native-community/blur is an optional peer dependency */
}

export default CommunityBlurPackage;
