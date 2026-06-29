import { Platform, StyleSheet, type ViewProps } from 'react-native';
import ExpoBlur, { type ExpoBlurModule } from '../../optional/expo-blur';

const DEFAULT_GLASS_BLUR_INTENSITY = 80;

type GlassBackdropProps = ViewProps & {
  className?: string;
};

/**
 * Optional frosted backdrop for glass themes.
 * Renders only when expo-blur is installed and not on web.
 */
export function GlassBackdrop({
  className,
  style,
  pointerEvents = 'none',
  ...props
}: GlassBackdropProps) {
  const BlurView = resolveBlurView();

  if (BlurView === undefined) {
    return null;
  }

  return (
    <BlurView
      intensity={DEFAULT_GLASS_BLUR_INTENSITY}
      className={className}
      pointerEvents={pointerEvents}
      style={[StyleSheet.absoluteFill, style]}
      {...props}
    />
  );
}

function resolveBlurView(): ExpoBlurModule['BlurView'] | undefined {
  if (Platform.OS === 'web') {
    return undefined;
  }

  return ExpoBlur?.BlurView;
}
