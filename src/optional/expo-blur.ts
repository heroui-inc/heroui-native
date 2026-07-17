import type { ComponentType, RefAttributes } from 'react';
import type { View, ViewProps } from 'react-native';

/**
 * Mirrors expo-blur's `BlurTint` union. Kept in sync manually because
 * expo-blur is an optional peer dependency and cannot be imported statically.
 */
export type ExpoBlurTint =
  | 'light'
  | 'dark'
  | 'default'
  | 'extraLight'
  | 'regular'
  | 'prominent'
  | 'systemUltraThinMaterial'
  | 'systemThinMaterial'
  | 'systemMaterial'
  | 'systemThickMaterial'
  | 'systemChromeMaterial'
  | 'systemUltraThinMaterialLight'
  | 'systemThinMaterialLight'
  | 'systemMaterialLight'
  | 'systemThickMaterialLight'
  | 'systemChromeMaterialLight'
  | 'systemUltraThinMaterialDark'
  | 'systemThinMaterialDark'
  | 'systemMaterialDark'
  | 'systemThickMaterialDark'
  | 'systemChromeMaterialDark';

/**
 * Mirrors expo-blur's `ExperimentalBlurMethod` union. Android renders no blur
 * unless `dimezisBlurView` is set.
 */
export type ExpoBlurMethod = 'none' | 'dimezisBlurView';

export type ExpoBlurBlurViewProps = ViewProps & {
  intensity?: number;
  tint?: ExpoBlurTint;
  experimentalBlurMethod?: ExpoBlurMethod;
  className?: string;
};

export type ExpoBlurModule = {
  BlurView: ComponentType<ExpoBlurBlurViewProps & RefAttributes<View>>;
};

let ExpoBlurPackage: ExpoBlurModule | undefined;

try {
  ExpoBlurPackage = require('expo-blur');
} catch (_error) {
  /* expo-blur is an optional peer dependency */
}

export default ExpoBlurPackage;
