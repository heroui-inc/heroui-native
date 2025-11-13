import { forwardRef, useMemo } from 'react';
import { View } from 'react-native';
import type { ViewRef } from '../../helpers/types/primitives';
import { createContext } from '../../helpers/utils';
import { DISPLAY_NAME } from './surface.constants';
import surfaceStyles, { styleSheet } from './surface.styles';
import type { SurfaceContextValue, SurfaceRootProps } from './surface.types';

const [SurfaceProvider, useSurface] = createContext<SurfaceContextValue>({
  name: 'SurfaceContext',
  strict: false,
});

const Surface = forwardRef<ViewRef, SurfaceRootProps>(
  ({ children, variant = 'default', className, style, ...props }, ref) => {
    const tvStyles = surfaceStyles({ variant, className });

    const contextValue = useMemo(() => ({ variant }), [variant]);

    return (
      <SurfaceProvider value={contextValue}>
        <View
          ref={ref}
          className={tvStyles}
          style={[styleSheet.root, style]}
          {...props}
        >
          {children}
        </View>
      </SurfaceProvider>
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
 *
 * @see Full documentation: https://heroui.com/components/surface
 */
export default Surface;

export { useSurface };
