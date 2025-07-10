import type { Pressable, Text, View } from 'react-native';

type ComponentPropsWithAsChild<T extends React.ElementType<any>> =
  React.ComponentPropsWithoutRef<T> & { asChild?: boolean };

type ViewRef = React.ComponentRef<typeof View>;
type PressableRef = React.ComponentRef<typeof Pressable>;
type TextRef = React.ComponentRef<typeof Text>;

type SlottableViewProps = ComponentPropsWithAsChild<typeof View>;
type SlottablePressableProps = ComponentPropsWithAsChild<typeof Pressable>;
type SlottableTextProps = ComponentPropsWithAsChild<typeof Text>;

export type {
  ComponentPropsWithAsChild,
  PressableRef,
  SlottablePressableProps,
  SlottableTextProps,
  SlottableViewProps,
  TextRef,
  ViewRef,
};
