import * as React from 'react';
import { Pressable, Text as RNText } from 'react-native';
import * as Slot from '../slot';
import type { RootProps, RootRef, TextProps, TextRef } from './label.types';

const Root = React.forwardRef<RootRef, RootProps>(
  ({ asChild, ...props }, ref) => {
    const Component = asChild ? Slot.Pressable : Pressable;

    return <Component ref={ref} {...props} />;
  }
);

Root.displayName = 'RootNativeLabel';

const Text = React.forwardRef<TextRef, TextProps>(
  ({ asChild, ...props }, ref) => {
    const Component = asChild ? Slot.Text : RNText;

    return <Component ref={ref} {...props} />;
  }
);

Text.displayName = 'TextNativeLabel';

export { Root, Text };
