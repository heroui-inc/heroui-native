import { forwardRef, useMemo } from 'react';
import { View } from 'react-native';
import { AnimationSettingsProvider } from '../../helpers/internal/contexts';
import type { ViewRef } from '../../helpers/internal/types';
import { createContext } from '../../helpers/internal/utils';
import * as Slot from '../../primitives/slot';
import { useSurfaceRootAnimation } from './surface.animation';
import { DISPLAY_NAME } from './surface.constants';
import { surfaceClassNames, surfaceStyleSheet } from './surface.styles';
import type { SurfaceContextValue, SurfaceRootProps } from './surface.types';

const [SurfaceProvider, useSurface] = createContext<SurfaceContextValue>({
  name: 'SurfaceContext',
  strict: false,
});

const Surface = forwardRef<ViewRef, SurfaceRootProps>(
  (
    {
      children,
      variant = 'default',
      className,
      style,
      animation,
      asChild = false,
      ...props
    },
    ref
  ) => {
    const RootComponent = asChild ? Slot.View : View;

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

    return (
      <AnimationSettingsProvider value={animationSettingsContextValue}>
        <SurfaceProvider value={contextValue}>
          <RootComponent
            ref={ref}
            className={rootClassName}
            style={[surfaceStyleSheet.root, style]}
            {...props}
          >
            {children}
          </RootComponent>
        </SurfaceProvider>
      </AnimationSettingsProvider>
    );
  }
);

Surface.displayName = DISPLAY_NAME.ROOT;

/**
 * Surface component
 *
 * @component Surface - Container component that provides elevation and background styling.
 * Used as a base for other components like Card. Supports different visual variants
 * for various elevation levels and styling needs.
 * - Polymorphic via `asChild` prop (Slot.View merges surface styling onto the child)
 *
 * @see Full documentation: https://heroui.com/docs/native/components/surface
 */
export default Surface;

export { useSurface };
