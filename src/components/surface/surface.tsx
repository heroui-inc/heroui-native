import { forwardRef, useMemo } from 'react';
import { View } from 'react-native';
import type { ThemeColor } from '../../helpers/external/hooks';
import {
  ThemeBackground,
  useHasDefaultThemeBackground,
} from '../../helpers/internal/components';
import { AnimationSettingsProvider } from '../../helpers/internal/contexts';
import type { ViewRef } from '../../helpers/internal/types';
import * as Slot from '../../primitives/slot';
import { useSurfaceRootAnimation } from './surface.animation';
import { DISPLAY_NAME } from './surface.constants';
import { SurfaceProvider, useSurface } from './surface.context';
import { surfaceClassNames, surfaceStyleSheet } from './surface.styles';
import type {
  SurfaceBackgroundProps,
  SurfaceRootProps,
  SurfaceVariant,
} from './surface.types';

/**
 * Android / web fallback token per surface variant — forwarded to the
 * theme background content so the opaque fallback matches the variant's
 * surface tint. The transparent variant renders no background layer.
 */
const SURFACE_FALLBACK_COLOR: Record<
  Exclude<SurfaceVariant, 'transparent'>,
  ThemeColor
> = {
  default: 'surface',
  secondary: 'surface-secondary',
  tertiary: 'surface-tertiary',
};

// --------------------------------------------------

/**
 * Generic absolute-fill background container rendered behind the surface
 * content. With no `children`, the active library theme decides the default
 * content: `glass` renders a `GlassView` blur layer; other themes render
 * nothing. Pass `children` to host arbitrary content (gradients, images)
 * with the container's positioning and clipping applied.
 */
const SurfaceBackground = forwardRef<View, SurfaceBackgroundProps>(
  ({ className, ...props }, ref) => {
    const surface = useSurface();
    const variant = surface?.variant ?? 'default';

    const backgroundClassName = surfaceClassNames.background({ className });

    const fallbackColor =
      variant === 'transparent'
        ? SURFACE_FALLBACK_COLOR.default
        : SURFACE_FALLBACK_COLOR[variant];

    return (
      <ThemeBackground
        ref={ref}
        className={backgroundClassName}
        fallbackColor={fallbackColor}
        {...props}
      />
    );
  }
);

// --------------------------------------------------

const SurfaceRoot = forwardRef<ViewRef, SurfaceRootProps>(
  (
    {
      children,
      variant = 'default',
      className,
      style,
      animation,
      asChild = false,
      background,
      ...props
    },
    ref
  ) => {
    const RootComponent = asChild ? Slot.View : View;
    const hasDefaultThemeBackground = useHasDefaultThemeBackground();

    const rootClassName = surfaceClassNames.root({ variant, className });

    const { isAllAnimationsDisabled } = useSurfaceRootAnimation({
      animation,
    });

    const animationSettingsContextValue = useMemo(
      () => ({
        isAllAnimationsDisabled,
      }),
      [isAllAnimationsDisabled]
    );

    const contextValue = useMemo(() => ({ variant }), [variant]);

    /**
     * Background layer rendered behind the surface content.
     * - `undefined`: theme-aware default for non-transparent variants when
     *   the active theme registers default background content
     * - custom node: replaces the default layer
     * - `null`: removes the layer
     * Skipped entirely when `asChild` is set — the Slot pattern requires a
     * single child element.
     */
    const backgroundElement = asChild ? null : background !== undefined ? (
      background
    ) : hasDefaultThemeBackground && variant !== 'transparent' ? (
      <SurfaceBackground />
    ) : null;

    return (
      <AnimationSettingsProvider value={animationSettingsContextValue}>
        <SurfaceProvider value={contextValue}>
          <RootComponent
            ref={ref}
            className={rootClassName}
            style={[surfaceStyleSheet.root, style]}
            {...props}
          >
            {backgroundElement == null ? (
              children
            ) : (
              <>
                {backgroundElement}
                {children}
              </>
            )}
          </RootComponent>
        </SurfaceProvider>
      </AnimationSettingsProvider>
    );
  }
);

SurfaceRoot.displayName = DISPLAY_NAME.ROOT;
SurfaceBackground.displayName = DISPLAY_NAME.BACKGROUND;

/**
 * Surface component
 *
 * @component Surface - Container component that provides elevation and background styling.
 * Used as a base for other components like Card. Supports different visual variants
 * for various elevation levels and styling needs.
 * - Polymorphic via `asChild` prop (Slot.View merges surface styling onto the child)
 *
 * @component Surface.Background - Absolute-fill background container behind the
 * surface content. With no children, the active library theme decides the content
 * (glass theme renders a blur layer whose Android / web fallback matches the
 * surface variant). Accepts children to host custom content such as gradients
 * with the container's positioning and clipping applied. Replaceable via the
 * `background` prop on Surface.
 *
 * @see Full documentation: https://heroui.com/docs/native/components/surface
 */
const Surface = Object.assign(SurfaceRoot, {
  /** @optional Theme-aware background container behind the surface content */
  Background: SurfaceBackground,
});

export default Surface;

export { useSurface };
