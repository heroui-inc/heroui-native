import type { ExpoBlurTint } from '../../optional/expo-blur';
import type { CommunityBlurType } from '../../optional/react-native-community-blur';

/**
 * Maps expo-blur tint names (GlassView's public `tint` prop) to
 * @react-native-community/blur `blurType` names, used when GlassView falls
 * back to the community package. The community package drops the `system`
 * prefix from the material names and calls `extraLight` `xlight`.
 */
const TINT_TO_COMMUNITY_BLUR_TYPE: Record<ExpoBlurTint, CommunityBlurType> = {
  light: 'light',
  dark: 'dark',
  default: 'regular',
  extraLight: 'xlight',
  regular: 'regular',
  prominent: 'prominent',
  systemUltraThinMaterial: 'ultraThinMaterial',
  systemThinMaterial: 'thinMaterial',
  systemMaterial: 'material',
  systemThickMaterial: 'thickMaterial',
  systemChromeMaterial: 'chromeMaterial',
  systemUltraThinMaterialLight: 'ultraThinMaterialLight',
  systemThinMaterialLight: 'thinMaterialLight',
  systemMaterialLight: 'materialLight',
  systemThickMaterialLight: 'thickMaterialLight',
  systemChromeMaterialLight: 'chromeMaterialLight',
  systemUltraThinMaterialDark: 'ultraThinMaterialDark',
  systemThinMaterialDark: 'thinMaterialDark',
  systemMaterialDark: 'materialDark',
  systemThickMaterialDark: 'thickMaterialDark',
  systemChromeMaterialDark: 'chromeMaterialDark',
};

/**
 * Resolves a GlassView tint to the equivalent community blur type.
 */
export const mapTintToCommunityBlurType = (
  tint: ExpoBlurTint
): CommunityBlurType => TINT_TO_COMMUNITY_BLUR_TYPE[tint];
