import type { Pressable, Text, View, ViewStyle } from 'react-native';

// Base utility types

/** Component props with optional asChild prop for polymorphic components */
type ComponentPropsWithAsChild<T extends React.ElementType<any>> =
  React.ComponentPropsWithoutRef<T> & { asChild?: boolean };

// Ref types

/** Reference type for React Native View component */
type ViewRef = React.ComponentRef<typeof View>;

/** Reference type for React Native Pressable component */
type PressableRef = React.ComponentRef<typeof Pressable>;

/** Reference type for React Native Text component */
type TextRef = React.ComponentRef<typeof Text>;

// Slottable component props

/** View component props with asChild support for slot composition */
type SlottableViewProps = ComponentPropsWithAsChild<typeof View>;

/** Pressable component props with asChild support for slot composition */
type SlottablePressableProps = ComponentPropsWithAsChild<typeof Pressable>;

/** Text component props with asChild support for slot composition */
type SlottableTextProps = ComponentPropsWithAsChild<typeof Text>;

interface ForceMountable {
  forceMount?: true | undefined;
}

interface Insets {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
}

/**
 * Certain props are only available on the native version of the component.
 * @docs For the web version, see the Radix documentation https://www.radix-ui.com/primitives
 */
interface PositionedContentProps {
  forceMount?: true | undefined;
  style?: ViewStyle;
  alignOffset?: number;
  insets?: Insets;
  avoidCollisions?: boolean;
  align?: 'start' | 'center' | 'end';
  side?: 'top' | 'bottom';
  sideOffset?: number;
  disablePositioningStyle?: boolean;
}

export type {
  ComponentPropsWithAsChild,
  ForceMountable,
  Insets,
  PositionedContentProps,
  PressableRef,
  SlottablePressableProps,
  SlottableTextProps,
  SlottableViewProps,
  TextRef,
  ViewRef,
};
