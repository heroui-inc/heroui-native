import type {
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
  ViewStyle,
} from 'react-native';

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
interface ViewRef extends React.ComponentRef<typeof View> {}

/**
 * Reference type for React Native Pressable component
 * Used for forwarding refs to Pressable elements
 */
interface PressableRef extends React.ComponentRef<typeof Pressable> {}

/**
 * Reference type for React Native Image component
 * Used for forwarding refs to Image elements
 */
interface ImageRef extends React.ComponentRef<typeof Image> {}

/**
 * Reference type for React Native ScrollView component
 * Used for forwarding refs to ScrollView elements
 */
interface ScrollViewRef extends React.ComponentRef<typeof ScrollView> {}

/**
 * Reference type for React Native Text component
 * Used for forwarding refs to Text elements
 */
interface TextRef extends React.ComponentRef<typeof Text> {}

/**
 * Reference type for React Native TextInput component.
 * Used for forwarding refs to text input elements.
 *
 * Resolved via `React.ComponentRef` so it matches the native input instance
 * on both the legacy class-based types and the Strict TypeScript API
 * (`TextInputInstance` from React Native 0.87+). Using `typeof TextInput`
 * as a ref type is incompatible with the Strict API, where `TextInput` is
 * the component function rather than the instance.
 */
interface TextInputRef extends React.ComponentRef<typeof TextInput> {}

/** Preserve the native ref alias when component declarations are generated. */
type TextInputComponent<Props> = React.ForwardRefExoticComponent<
  React.PropsWithoutRef<Props> & React.RefAttributes<TextInputRef>
>;

// Slottable component props

/**
 * View component props with asChild support for slot composition
 * Enables View components to be used with the Slot pattern
 */
interface SlottableViewProps extends ComponentPropsWithAsChild<typeof View> {}

/**
 * Pressable component props with asChild support for slot composition
 * Enables Pressable components to be used with the Slot pattern
 */
interface SlottablePressableProps
  extends ComponentPropsWithAsChild<typeof Pressable> {}

/**
 * Text component props with asChild support for slot composition
 * Enables Text components to be used with the Slot pattern
 */
interface SlottableTextProps extends ComponentPropsWithAsChild<typeof Text> {}

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
  ImageRef,
  Insets,
  PositionedContentProps,
  PressableRef,
  ScrollViewRef,
  SlottablePressableProps,
  SlottableTextProps,
  SlottableViewProps,
  TextInputComponent,
  TextInputRef,
  TextRef,
  ViewRef,
};
