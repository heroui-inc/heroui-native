import type {
  PressableRef,
  SlottablePressableProps,
  SlottableTextProps,
  SlottableViewProps,
  TextRef,
  ViewRef,
} from '../../helpers/internal/types';

/**
 * Context for the bottom sheet root component
 */
type RootContext = {
  /** Whether the bottom sheet is currently open */
  isOpen: boolean;
  /** Callback fired when the open state changes */
  onOpenChange: (value: boolean) => void;
};

/**
 * Props for the bottom sheet root component
 */
type RootProps = SlottableViewProps & {
  /** The controlled open state of the bottom sheet */
  isOpen?: boolean;
  /** The open state of the bottom sheet when initially rendered (uncontrolled) */
  isDefaultOpen?: boolean;
  /** Event handler called when the open state changes */
  onOpenChange?: (value: boolean) => void;
};

/**
 * Props for the bottom sheet portal component
 */
interface PortalProps {
  /** The content to be rendered in the portal */
  children: React.ReactNode;
  /** Optional portal host name to render into a specific portal container */
  hostName?: string;
}

/**
 * Props for the bottom sheet overlay component
 */
type OverlayProps = SlottablePressableProps & {
  /** Whether clicking the overlay should close the bottom sheet */
  isCloseOnPress?: boolean;
};

/**
 * Props for the bottom sheet content component
 */
type ContentProps = SlottableViewProps;

/**
 * Props for the bottom sheet trigger component
 */
type TriggerProps = SlottablePressableProps;

/**
 * Props for the bottom sheet close button component
 */
type CloseProps = SlottablePressableProps;

/**
 * Props for the bottom sheet title component
 */
type TitleProps = SlottableTextProps;

/**
 * Props for the bottom sheet description component
 */
type DescriptionProps = SlottableTextProps;

/**
 * Ref type for the bottom sheet close button
 */
type CloseRef = PressableRef;

/**
 * Ref type for the bottom sheet content
 */
type ContentRef = ViewRef;

/**
 * Ref type for the bottom sheet description
 */
type DescriptionRef = TextRef;

/**
 * Ref type for the bottom sheet overlay
 */
type OverlayRef = PressableRef;

/**
 * Ref type for the bottom sheet root
 */
type RootRef = ViewRef;

/**
 * Ref type for the bottom sheet title
 */
type TitleRef = TextRef;

/**
 * Ref type for the bottom sheet trigger
 */
type TriggerRef = PressableRef;

export type {
  CloseProps,
  CloseRef,
  ContentProps,
  ContentRef,
  DescriptionProps,
  DescriptionRef,
  OverlayProps,
  OverlayRef,
  PortalProps,
  RootContext,
  RootProps,
  RootRef,
  TitleProps,
  TitleRef,
  TriggerProps,
  TriggerRef,
};
