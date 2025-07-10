import * as React from 'react';
import { Pressable, View, type GestureResponderEvent } from 'react-native';
import * as Slot from '../slot';
import type { RootProps, RootRef, ThumbProps, ThumbRef } from './switch.types';

const Root = React.forwardRef<RootRef, RootProps>(
  (
    {
      asChild,
      checked,
      onCheckedChange,
      disabled,
      'onPress': onPressProp,
      'aria-valuetext': ariaValueText,
      ...props
    },
    ref
  ) => {
    function onPress(ev: GestureResponderEvent) {
      if (disabled) return;
      onCheckedChange(!checked);
      onPressProp?.(ev);
    }

    const Component = asChild ? Slot.Pressable : Pressable;

    return (
      <Component
        ref={ref}
        aria-disabled={disabled}
        role="switch"
        aria-checked={checked}
        aria-valuetext={(ariaValueText ?? checked) ? 'on' : 'off'}
        onPress={onPress}
        accessibilityState={{
          checked,
          disabled,
        }}
        disabled={disabled}
        {...props}
      />
    );
  }
);

Root.displayName = 'HeroUI.Primitives.Switch.Root';

const Thumb = React.forwardRef<ThumbRef, ThumbProps>(
  ({ asChild, ...props }, ref) => {
    const Component = asChild ? Slot.View : View;

    return <Component ref={ref} role="presentation" {...props} />;
  }
);

Thumb.displayName = 'HeroUI.Primitives.Switch.Thumb';

export { Root, Thumb };
