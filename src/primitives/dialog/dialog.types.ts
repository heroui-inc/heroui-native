import type { SharedValue } from 'react-native-reanimated';
import type {
  ForceMountable,
  PressableRef,
  SlottablePressableProps,
  SlottableTextProps,
  SlottableViewProps,
  TextRef,
  ViewRef,
} from '../../helpers/types';

/**
 * Dialog internal state
 */
type DialogState = 'idle' | 'open' | 'close';

/**
 * Context for the dialog root component
 */
type RootContext = {
  /** Whether the dialog is currently open */
  isOpen: boolean;
  /** Callback fired when the open state changes */
  onOpenChange: (value: boolean) => void;
  /** Extended internal state for additional control (useful for coordinating animations) */
  dialogState: DialogState;
  /** Animation progress shared value (0=idle, 1=open, 2=close) */
  progress: SharedValue<number>;
  /** Dragging state shared value */
  isDragging: SharedValue<boolean>;
  /** Delay in milliseconds before the dialog closes */
  closeDelay?: number;
  /** Whether to dismiss the keyboard when the dialog closes */
  isDismissKeyboardOnClose?: boolean;
};

/**
 * Props for the dialog root component
 */
type RootProps = SlottableViewProps & {
  /** The controlled open state of the dialog */
  isOpen?: boolean;
  /** The open state of the dialog when initially rendered (uncontrolled) */
  isDefaultOpen?: boolean;
  /** Event handler called when the open state changes */
  onOpenChange?: (value: boolean) => void;
  /** Delay in milliseconds before the dialog closes (for exit animations) */
  closeDelay?: number;
  /** Whether to dismiss the keyboard when the dialog closes */
  isDismissKeyboardOnClose?: boolean;
};

/**
 * Props for the dialog portal component
 */
interface PortalProps extends ForceMountable {
  /** The content to be rendered in the portal */
  children: React.ReactNode;
  /** Optional portal host name to render into a specific portal container */
  hostName?: string;
}

/**
 * Props for the dialog overlay component
 */
type OverlayProps = ForceMountable &
  SlottablePressableProps & {
    /** Whether clicking the overlay should close the dialog */
    isCloseOnPress?: boolean;
  };

/**
 * Props for the dialog content component
 */
type ContentProps = ForceMountable & SlottableViewProps;

/**
 * Props for the dialog trigger component
 */
type TriggerProps = SlottablePressableProps;

/**
 * Props for the dialog close button component
 */
type CloseProps = SlottablePressableProps;

/**
 * Props for the dialog title component
 */
type TitleProps = SlottableTextProps;

/**
 * Props for the dialog description component
 */
type DescriptionProps = SlottableTextProps;

/**
 * Ref type for the dialog close button
 */
type CloseRef = PressableRef;

/**
 * Ref type for the dialog content
 */
type ContentRef = ViewRef;

/**
 * Ref type for the dialog description
 */
type DescriptionRef = TextRef;

/**
 * Ref type for the dialog overlay
 */
type OverlayRef = PressableRef;

/**
 * Ref type for the dialog root
 */
type RootRef = ViewRef;

/**
 * Ref type for the dialog title
 */
type TitleRef = TextRef;

/**
 * Ref type for the dialog trigger
 */
type TriggerRef = PressableRef;

export type {
  CloseProps,
  CloseRef,
  ContentProps,
  ContentRef,
  DescriptionProps,
  DescriptionRef,
  DialogState,
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
