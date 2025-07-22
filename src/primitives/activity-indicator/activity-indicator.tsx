import * as React from 'react';
import { View } from 'react-native';
import * as Slot from '../slot';
import type {
  IndicatorProps,
  IndicatorRef,
  RootProps,
  RootRef,
} from './activity-indicator.types';

// --------------------------------------------------

const Root = React.forwardRef<RootRef, RootProps>(
  ({ asChild, loading = true, ...props }, ref) => {
    const Component = asChild ? Slot.View : View;

    return (
      <Component
        ref={ref}
        accessible
        accessibilityRole="progressbar"
        accessibilityState={{ busy: loading }}
        {...props}
      />
    );
  }
);

Root.displayName = 'HeroUINative.Primitive.ActivityIndicator.Root';

// --------------------------------------------------

const Indicator = React.forwardRef<IndicatorRef, IndicatorProps>(
  ({ asChild, ...props }, ref) => {
    const Component = asChild ? Slot.View : View;

    return (
      <Component
        ref={ref}
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        {...props}
      />
    );
  }
);

Indicator.displayName = 'HeroUINative.Primitive.ActivityIndicator.Indicator';

export { Indicator, Root };
