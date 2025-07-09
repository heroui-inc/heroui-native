import * as React from 'react';
import {
  Image as RNImage,
  Pressable as RNPressable,
  Text as RNText,
  View as RNView,
  type PressableProps as RNPressableProps,
  type TextProps as RNTextProps,
  type ViewProps as RNViewProps,
} from 'react-native';
import type { AnyProps, ImageSlotProps } from './types';
import { composeRefs, isTextChildren, mergeProps } from './utils';

// --------------------------------------------------------------------------

const Pressable = React.forwardRef<
  React.ComponentRef<typeof RNPressable>,
  RNPressableProps
>((props, forwardedRef) => {
  const { children, ...pressableSlotProps } = props;

  if (!React.isValidElement(children)) {
    console.log('Slot.Pressable - Invalid asChild element', children);
    return null;
  }

  return React.cloneElement<
    React.ComponentPropsWithoutRef<typeof RNPressable>,
    React.ComponentRef<typeof RNPressable>
  >(isTextChildren(children) ? <></> : children, {
    ...mergeProps(pressableSlotProps, children.props as AnyProps),
    ref: forwardedRef
      ? composeRefs(forwardedRef, (children as any).ref)
      : (children as any).ref,
  });
});

Pressable.displayName = 'SlotPressable';

// --------------------------------------------------------------------------

const View = React.forwardRef<React.ComponentRef<typeof RNView>, RNViewProps>(
  (props, forwardedRef) => {
    const { children, ...viewSlotProps } = props;

    if (!React.isValidElement(children)) {
      console.log('Slot.View - Invalid asChild element', children);
      return null;
    }

    return React.cloneElement<
      React.ComponentPropsWithoutRef<typeof RNView>,
      React.ComponentRef<typeof RNView>
    >(isTextChildren(children) ? <></> : children, {
      ...mergeProps(viewSlotProps, children.props as AnyProps),
      ref: forwardedRef
        ? composeRefs(forwardedRef, (children as any).ref)
        : (children as any).ref,
    });
  }
);

View.displayName = 'SlotView';

// --------------------------------------------------------------------------

const Text = React.forwardRef<React.ComponentRef<typeof RNText>, RNTextProps>(
  (props, forwardedRef) => {
    const { children, ...textSlotProps } = props;

    if (!React.isValidElement(children)) {
      console.log('Slot.Text - Invalid asChild element', children);
      return null;
    }

    return React.cloneElement<
      React.ComponentPropsWithoutRef<typeof RNText>,
      React.ComponentRef<typeof RNText>
    >(isTextChildren(children) ? <></> : children, {
      ...mergeProps(textSlotProps, children.props as AnyProps),
      ref: forwardedRef
        ? composeRefs(forwardedRef, (children as any).ref)
        : (children as any).ref,
    });
  }
);

Text.displayName = 'SlotText';

// --------------------------------------------------------------------------

const Image = React.forwardRef<
  React.ComponentRef<typeof RNImage>,
  ImageSlotProps
>((props, forwardedRef) => {
  const { children, ...imageSlotProps } = props;

  if (!React.isValidElement(children)) {
    console.log('Slot.Image - Invalid asChild element', children);
    return null;
  }

  return React.cloneElement<
    React.ComponentPropsWithoutRef<typeof RNImage>,
    React.ComponentRef<typeof RNImage>
  >(isTextChildren(children) ? <></> : children, {
    ...mergeProps(imageSlotProps, children.props as AnyProps),
    ref: forwardedRef
      ? composeRefs(forwardedRef, (children as any).ref)
      : (children as any).ref,
  });
});

Image.displayName = 'SlotImage';

export { Image, Pressable, Text, View };
