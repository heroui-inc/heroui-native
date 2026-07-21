import { forwardRef } from 'react';
import { Platform, View } from 'react-native';
import { useUniwind, withUniwind } from 'uniwind';
import { useLibraryTheme } from '../../helpers/internal/hooks';
import ExpoBlur from '../../optional/expo-blur';
import {
  DEFAULT_INTENSITY,
  DISPLAY_NAME,
  GLASS_THEME_VALUE,
} from './glass-view.constants';
import { glassViewClassNames } from './glass-view.styles';
import type { GlassViewProps } from './glass-view.types';

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
 * `tint` forwarded). On Android — where no reliable backdrop blur exists —
 * and whenever expo-blur is not installed, it falls back to a plain
 * transparent `View`; parents style it via `className`.
 *
 * @see Doc & examples: glass-view.md
 */
const GlassView = forwardRef<View, GlassViewProps>((props, ref) => {
  const {
    intensity = DEFAULT_INTENSITY,
    tint,
    className,
    children,
    ...restProps
  } = props;

  const { theme } = useUniwind();

  const rootClassName = glassViewClassNames.root({ className });

  if (Platform.OS === 'ios' && StyledExpoBlurView) {
    const resolvedTint = tint ?? (theme.endsWith('dark') ? 'dark' : 'light');

    return (
      <StyledExpoBlurView
        ref={ref}
        className={rootClassName}
        intensity={intensity}
        tint={resolvedTint}
        {...restProps}
      >
        {children}
      </StyledExpoBlurView>
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
