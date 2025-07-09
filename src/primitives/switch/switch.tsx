import * as React from 'react';
import { Pressable, View, type GestureResponderEvent } from 'react-native';
import * as Slot from '../slot';
import type { RootProps, RootRef, ThumbProps, ThumbRef } from './switch.types';

const Root = React.forwardRef<RootRef, RootProps>(
  (
    {
      asChild,
      isSelected,
      onSelectedChange,
      disabled,
      'onPress': onPressProp,
      'aria-valuetext': ariaValueText,
      ...props
    },
    ref
  ) => {
    function onPress(ev: GestureResponderEvent) {
      if (disabled) return;
      onSelectedChange(!isSelected);
      onPressProp?.(ev);
    }

    const Component = asChild ? Slot.Pressable : Pressable;

    return (
      <Component
        ref={ref}
        aria-disabled={disabled}
        role="switch"
        aria-checked={isSelected}
        aria-valuetext={(ariaValueText ?? isSelected) ? 'on' : 'off'}
        onPress={onPress}
        accessibilityState={{
          checked: isSelected,
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
