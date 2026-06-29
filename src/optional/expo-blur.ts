import type { ComponentType } from 'react';
import type { ViewProps } from 'react-native';

export type ExpoBlurBlurViewProps = ViewProps & {
  intensity?: number;
  className?: string;
};

export type ExpoBlurModule = {
  BlurView: ComponentType<ExpoBlurBlurViewProps>;
};

let ExpoBlurPackage: ExpoBlurModule | undefined;

try {
  ExpoBlurPackage = require('expo-blur');
} catch (_error) {
  /* expo-blur is an optional peer dependency */
}

export default ExpoBlurPackage;
