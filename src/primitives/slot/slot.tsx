import {
  cloneElement,
  forwardRef,
  isValidElement,
  type ComponentPropsWithoutRef,
  type RefAttributes,
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
import type {
  ImageRef,
  PressableRef,
  TextRef,
  ViewRef,
} from '../../helpers/internal/types';
import type { AnyProps, ImageSlotProps } from './types';
import { composeRefs, isTextChildren, mergeProps } from './utils';

// --------------------------------------------------

const Pressable = forwardRef<PressableRef, RNPressableProps>(
  (props, forwardedRef) => {
    const { children, ...pressableSlotProps } = props;

    if (!isValidElement(children)) {
      console.log('Slot.Pressable - Invalid asChild element', children);
      return null;
    }

    return cloneElement<
      ComponentPropsWithoutRef<typeof RNPressable> & RefAttributes<PressableRef>
    >(isTextChildren(children) ? <></> : children, {
      ...mergeProps(pressableSlotProps, children.props as AnyProps),
      ref: forwardedRef
        ? composeRefs(forwardedRef, (children as any).ref)
        : (children as any).ref,
    });
  }
);

Pressable.displayName = 'HeroUINative.Primitive.Slot.Pressable';

// --------------------------------------------------

const View = forwardRef<ViewRef, RNViewProps>((props, forwardedRef) => {
  const { children, ...viewSlotProps } = props;

  if (!isValidElement(children)) {
    console.log('Slot.View - Invalid asChild element', children);
    return null;
  }

  return cloneElement<
    ComponentPropsWithoutRef<typeof RNView> & RefAttributes<ViewRef>
  >(isTextChildren(children) ? <></> : children, {
    ...mergeProps(viewSlotProps, children.props as AnyProps),
    ref: forwardedRef
      ? composeRefs(forwardedRef, (children as any).ref)
      : (children as any).ref,
  });
});

View.displayName = 'HeroUINative.Primitive.Slot.View';

// --------------------------------------------------

const Text = forwardRef<TextRef, RNTextProps>((props, forwardedRef) => {
  const { children, ...textSlotProps } = props;

  if (!isValidElement(children)) {
    console.log('Slot.Text - Invalid asChild element', children);
    return null;
  }

  return cloneElement<
    ComponentPropsWithoutRef<typeof RNText> & RefAttributes<TextRef>
  >(isTextChildren(children) ? <></> : children, {
    ...mergeProps(textSlotProps, children.props as AnyProps),
    ref: forwardedRef
      ? composeRefs(forwardedRef, (children as any).ref)
      : (children as any).ref,
  });
});

Text.displayName = 'HeroUINative.Primitive.Slot.Text';

// --------------------------------------------------

const Image = forwardRef<ImageRef, ImageSlotProps>((props, forwardedRef) => {
  const { children, ...imageSlotProps } = props;

  if (!isValidElement(children)) {
    console.log('Slot.Image - Invalid asChild element', children);
    return null;
  }

  return cloneElement<
    ComponentPropsWithoutRef<typeof RNImage> & RefAttributes<ImageRef>
  >(isTextChildren(children) ? <></> : children, {
    ...mergeProps(imageSlotProps, children.props as AnyProps),
    ref: forwardedRef
      ? composeRefs(forwardedRef, (children as any).ref)
      : (children as any).ref,
  });
});

Image.displayName = 'HeroUINative.Primitive.Slot.Image';

export { Image, Pressable, Text, View };
