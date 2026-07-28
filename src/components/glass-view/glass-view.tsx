import { forwardRef } from 'react';
import { Platform, View } from 'react-native';
import { useUniwind, withUniwind } from 'uniwind';
import { useThemeColor } from '../../helpers/external/hooks';
import { useLibraryTheme } from '../../helpers/internal/hooks';
import ExpoBlur from '../../optional/expo-blur';
import {
  DEFAULT_FALLBACK_COLOR,
  DEFAULT_INTENSITY,
  DISPLAY_NAME,
  GLASS_THEME_VALUE,
} from './glass-view.constants';
import { glassViewClassNames } from './glass-view.styles';
import type { GlassViewProps } from './glass-view.types';
import { flattenColorOverBackground } from './glass-view.utils';

const StyledExpoBlurView = ExpoBlur
  ? withUniwind(ExpoBlur.BlurView)
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
 * On iOS the layer is rendered with expo-blur's `BlurView` (`intensity` and
 * `tint` forwarded). On Android / web — where no reliable backdrop blur
 * exists — and whenever expo-blur is not installed, it falls back to a plain
 * `View` painted with an opaque color: the `fallbackColor` theme token
 * flattened over `--background` via alpha compositing. That approximates the
 * iOS frosted look without translucency. Set `forceFallbackColor` to render
 * the opaque fallback on every platform (including iOS), skipping the blur.
 *
 * @see Doc & examples: glass-view.md
 */
const GlassView = forwardRef<View, GlassViewProps>((props, ref) => {
  const {
    intensity = DEFAULT_INTENSITY,
    tint,
    fallbackColor = DEFAULT_FALLBACK_COLOR,
    forceFallbackColor = false,
    className,
    children,
    style,
    ...restProps
  } = props;

  const { theme } = useUniwind();
  const [tokenColor, backgroundColor] = useThemeColor([
    fallbackColor,
    'background',
  ]);

  const rootClassName = glassViewClassNames.root({ className });

  if (Platform.OS === 'ios' && StyledExpoBlurView && !forceFallbackColor) {
    const resolvedTint = tint ?? (theme.endsWith('dark') ? 'dark' : 'light');

    return (
      <StyledExpoBlurView
        ref={ref}
        className={rootClassName}
        intensity={intensity}
        tint={resolvedTint}
        style={style}
        {...restProps}
      >
        {children}
      </StyledExpoBlurView>
    );
  }

  const flattenedBackgroundColor = flattenColorOverBackground(
    tokenColor,
    backgroundColor
  );

  return (
    <View
      ref={ref}
      className={rootClassName}
      style={[{ backgroundColor: flattenedBackgroundColor }, style]}
      {...restProps}
    >
      {children}
    </View>
  );
});

GlassView.displayName = DISPLAY_NAME.ROOT;

export default GlassView;
