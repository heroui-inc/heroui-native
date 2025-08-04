import type { ViewRef } from '@/helpers/types/primitives';
import { forwardRef } from 'react';
import { View } from 'react-native';
import { DISPLAY_NAME } from './surface.constants';
import surfaceStyles, { nativeStyles } from './surface.styles';
import type { SurfaceRootProps } from './surface.types';

const Surface = forwardRef<ViewRef, SurfaceRootProps>(
  ({ children, variant, className, style, ...props }, ref) => {
    const tvStyles = surfaceStyles({ variant, className });

    return (
      <View
        ref={ref}
        className={tvStyles}
        style={[nativeStyles.surfaceRoot, style]}
        {...props}
      >
        {children}
      </View>
    );
  }
);

Surface.displayName = DISPLAY_NAME.ROOT;

export default Surface;
