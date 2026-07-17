import { forwardRef } from 'react';
import { Platform, View } from 'react-native';
import { useUniwind, withUniwind } from 'uniwind';
import { useLibraryTheme } from '../../helpers/internal/hooks';
import ExpoBlur from '../../optional/expo-blur';
import CommunityBlur from '../../optional/react-native-community-blur';
import {
  DEFAULT_ANDROID_BLUR_METHOD,
  DEFAULT_BLUR_PACKAGE,
  DEFAULT_INTENSITY,
  DISPLAY_NAME,
  GLASS_THEME_VALUE,
} from './glass-view.constants';
import { glassViewClassNames } from './glass-view.styles';
import type { GlassViewProps } from './glass-view.types';
import { mapTintToCommunityBlurType } from './glass-view.utils';

const StyledExpoBlurView = ExpoBlur
  ? withUniwind(ExpoBlur.BlurView)
  : undefined;

const StyledCommunityBlurView = CommunityBlur
  ? withUniwind(CommunityBlur.BlurView)
  : undefined;

/**
 * Returns `true` when the active library theme (the `--theme` CSS variable)
 * is `glass`.
 */
export const useIsGlassTheme = (): boolean => {
  const theme = useLibraryTheme();
  return theme === GLASS_THEME_VALUE;
};

/**
 * GlassView — absolute-fill frosted-glass layer.
 *
 * Rendered via the optional blur package selected by `blurPackage`
 * (`expo-blur` by default, `community-blur` for @react-native-community/blur
 * with `tint`/`intensity` mapped to `blurType`/`blurAmount`). Falls back to
 * the other installed package, then to a plain `View` with no background.
 *
 * @see Doc & examples: glass-view.md
 */
const GlassView = forwardRef<View, GlassViewProps>((props, ref) => {
  const {
    blurPackage = DEFAULT_BLUR_PACKAGE,
    intensity = DEFAULT_INTENSITY,
    tint,
    experimentalBlurMethod,
    className,
    children,
    ...restProps
  } = props;

  const { theme } = useUniwind();

  const rootClassName = glassViewClassNames.root({ className });
  const resolvedTint = tint ?? (theme.endsWith('dark') ? 'dark' : 'light');

  const useCommunityBlur = Boolean(
    StyledCommunityBlurView &&
      (blurPackage === 'community-blur' || !StyledExpoBlurView)
  );

  if (StyledExpoBlurView && !useCommunityBlur) {
    const resolvedBlurMethod =
      experimentalBlurMethod ??
      (Platform.OS === 'android' ? DEFAULT_ANDROID_BLUR_METHOD : undefined);

    return (
      <StyledExpoBlurView
        ref={ref}
        className={rootClassName}
        intensity={intensity}
        tint={resolvedTint}
        experimentalBlurMethod={resolvedBlurMethod}
        {...restProps}
      >
        {children}
      </StyledExpoBlurView>
    );
  }

  if (useCommunityBlur && StyledCommunityBlurView) {
    return (
      <StyledCommunityBlurView
        ref={ref}
        className={rootClassName}
        blurType={mapTintToCommunityBlurType(resolvedTint)}
        blurAmount={intensity}
        {...restProps}
      >
        {children}
      </StyledCommunityBlurView>
    );
  }

  return (
    <View ref={ref} className={rootClassName} {...restProps}>
      {children}
    </View>
  );
});

GlassView.displayName = DISPLAY_NAME.ROOT;

export default GlassView;
