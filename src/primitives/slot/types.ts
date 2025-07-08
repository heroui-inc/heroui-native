import * as React from 'react';
import {
  type ImageProps as RNImageProps,
  type ImageStyle as RNImageStyle,
  type PressableProps as RNPressableProps,
  type StyleProp,
} from 'react-native';

type AnyProps = Record<string, any>;

type ImageSlotProps = RNImageProps & {
  children?: React.ReactNode;
};

type PressableStyle = RNPressableProps['style'];
type ImageStyle = StyleProp<RNImageStyle>;
type Style = PressableStyle | ImageStyle;

export type { AnyProps, ImageSlotProps, ImageStyle, PressableStyle, Style };
