import type { Pressable, Text, View, ViewStyle } from 'react-native';

// Base utility types

/**
 * Component props with optional asChild prop for polymorphic components
 * Allows components to render as different elements when asChild is true
 */
type ComponentPropsWithAsChild<T extends React.ElementType<any>> =
  React.ComponentPropsWithoutRef<T> & { asChild?: boolean };

// Ref types

/**
 * Reference type for React Native View component
 * Used for forwarding refs to View elements
 */
type ViewRef = React.ComponentRef<typeof View>;

/**
 * Reference type for React Native Pressable component
 * Used for forwarding refs to Pressable elements
 */
type PressableRef = React.ComponentRef<typeof Pressable>;

/**
 * Reference type for React Native Text component
 * Used for forwarding refs to Text elements
 */
type TextRef = React.ComponentRef<typeof Text>;

// Slottable component props

/**
 * View component props with asChild support for slot composition
 * Enables View components to be used with the Slot pattern
 */
type SlottableViewProps = ComponentPropsWithAsChild<typeof View>;

/**
 * Pressable component props with asChild support for slot composition
 * Enables Pressable components to be used with the Slot pattern
 */
type SlottablePressableProps = ComponentPropsWithAsChild<typeof Pressable>;

/**
 * Text component props with asChild support for slot composition
 * Enables Text components to be used with the Slot pattern
 */
type SlottableTextProps = ComponentPropsWithAsChild<typeof Text>;

/**
 * Interface for components that can be force mounted even when normally hidden
 */
interface ForceMountable {
  /**
   * Whether to force mount the component in the DOM
   * Useful for animation purposes when component needs to be present but hidden
   */
  forceMount?: true | undefined;
}

/**
 * Interface for defining spacing/padding from screen edges
 */
interface Insets {
  /**
   * Distance from the top edge in pixels
   */
  top?: number;
  /**
   * Distance from the bottom edge in pixels
   */
  bottom?: number;
  /**
   * Distance from the left edge in pixels
   */
  left?: number;
  /**
   * Distance from the right edge in pixels
   */
  right?: number;
}

/**
 * Props for components that need to be positioned relative to a trigger element
 * Certain props are only available on the native version of the component.
 * @docs For the web version, see the Radix documentation https://www.radix-ui.com/primitives
 */
interface PositionedContentProps {
  /**
   * Whether to force mount the component in the DOM
   */
  forceMount?: true | undefined;
  /**
   * Custom styles to apply to the positioned content
   */
  style?: ViewStyle;
  /**
   * Offset along the alignment axis in pixels
   */
  alignOffset?: number;
  /**
   * Screen edge insets to respect when positioning
   */
  insets?: Insets;
  /**
   * Whether to automatically adjust position to avoid screen edges
   * @default true
   */
  avoidCollisions?: boolean;
  /**
   * Alignment relative to the trigger element
   * @default 'start'
   */
  align?: 'start' | 'center' | 'end';
  /**
   * Preferred placement of the trigger element to position against
   * @default 'bottom'
   */
  placement?: 'top' | 'bottom' | 'left' | 'right';
  /**
   * Offset from the trigger element in pixels
   * @default 0
   */
  offset?: number;
  /**
   * Whether to disable the automatic positioning styles
   * Useful when you want to handle positioning manually
   * @default false
   */
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
