import type { ViewRef } from '@/helpers/types/primitives';
import { View as SlotView } from '@/primitives/slot';
import { forwardRef } from 'react';
import { View } from 'react-native';
import { DISPLAY_NAME } from './surface.constants';
import surfaceStyles, { nativeStyles } from './surface.styles';
import type { SurfaceRootProps } from './surface.types';

const Surface = forwardRef<ViewRef, SurfaceRootProps>(
  ({ children, variant, className, asChild = false, style, ...props }, ref) => {
    const tvStyles = surfaceStyles({ variant, className });

    const Component = asChild ? SlotView : View;

    return (
      <Component
        ref={ref}
        className={tvStyles}
        style={[nativeStyles.surfaceRoot, style]}
        {...props}
      >
        {children}
      </Component>
    );
  }
);

Surface.displayName = DISPLAY_NAME.ROOT;

export { Surface };
