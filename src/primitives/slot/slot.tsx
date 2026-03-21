import {
  cloneElement,
  forwardRef,
  isValidElement,
  type ComponentPropsWithoutRef,
  type ComponentRef,
} from 'react';
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

// --------------------------------------------------

const Pressable = forwardRef<
  React.ComponentRef<typeof RNPressable>,
  RNPressableProps
>((props, forwardedRef) => {
  const { children, ...pressableSlotProps } = props;

  if (!isValidElement(children)) {
    console.log('Slot.Pressable - Invalid asChild element', children);
    return null;
  }

  return cloneElement<
    React.ComponentPropsWithoutRef<typeof RNPressable>,
    React.ComponentRef<typeof RNPressable>
  >(isTextChildren(children) ? <></> : children, {
    ...mergeProps(pressableSlotProps, children.props as AnyProps),
    ref: forwardedRef
      ? composeRefs(forwardedRef, (children as any).ref)
      : (children as any).ref,
  });
});

Pressable.displayName = 'HeroUINative.Primitive.Slot.Pressable';

// --------------------------------------------------

const View = forwardRef<React.ComponentRef<typeof RNView>, RNViewProps>(
  (props, forwardedRef) => {
    const { children, ...viewSlotProps } = props;

    if (!isValidElement(children)) {
      console.log('Slot.View - Invalid asChild element', children);
      return null;
    }

    return cloneElement<
      ComponentPropsWithoutRef<typeof RNView>,
      ComponentRef<typeof RNView>
    >(isTextChildren(children) ? <></> : children, {
      ...mergeProps(viewSlotProps, children.props as AnyProps),
      ref: forwardedRef
        ? composeRefs(forwardedRef, (children as any).ref)
        : (children as any).ref,
    });
  }
);

View.displayName = 'HeroUINative.Primitive.Slot.View';

// --------------------------------------------------

const Text = forwardRef<ComponentRef<typeof RNText>, RNTextProps>(
  (props, forwardedRef) => {
    const { children, ...textSlotProps } = props;

    if (!isValidElement(children)) {
      console.log('Slot.Text - Invalid asChild element', children);
      return null;
    }

    return cloneElement<
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

Text.displayName = 'HeroUINative.Primitive.Slot.Text';

// --------------------------------------------------

const Image = forwardRef<ComponentRef<typeof RNImage>, ImageSlotProps>(
  (props, forwardedRef) => {
    const { children, ...imageSlotProps } = props;

    if (!isValidElement(children)) {
      console.log('Slot.Image - Invalid asChild element', children);
      return null;
    }

    return cloneElement<
      ComponentPropsWithoutRef<typeof RNImage>,
      ComponentRef<typeof RNImage>
    >(isTextChildren(children) ? <></> : children, {
      ...mergeProps(imageSlotProps, children.props as AnyProps),
      ref: forwardedRef
        ? composeRefs(forwardedRef, (children as any).ref)
        : (children as any).ref,
    });
  }
);

Image.displayName = 'HeroUINative.Primitive.Slot.Image';

export { Image, Pressable, Text, View };
