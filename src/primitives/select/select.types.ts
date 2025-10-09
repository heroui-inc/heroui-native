import type { LayoutRectangle } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';
import type { LayoutPosition } from '../../helpers/hooks';
import type {
  ForceMountable,
  PositionedContentProps,
  PressableRef,
  SlottablePressableProps,
  SlottableViewProps,
  ViewRef,
} from '../../helpers/types';

/**
 * Select internal state
 */
type SelectState = 'idle' | 'open' | 'close';

/**
 * Internal context interface for managing select state and positioning
 */
interface IRootContext {
  /**
   * Whether the select is currently open
   */
  isOpen: boolean;
  /**
   * Callback to change the open state of the select
   */
  onOpenChange: (open: boolean) => void;
  /**
   * Extended internal state for additional control (useful for coordinating animations)
   */
  selectState: SelectState;
  /**
   * Whether the select is disabled
   */
  isDisabled?: boolean;
  /**
   * The position of the trigger element relative to the viewport
   */
  triggerPosition: LayoutPosition | null;
  /**
   * Updates the trigger element's position
   */
  setTriggerPosition: (triggerPosition: LayoutPosition | null) => void;
  /**
   * The layout measurements of the select content
   */
  contentLayout: LayoutRectangle | null;
  /**
   * Updates the content layout measurements
   */
  setContentLayout: (contentLayout: LayoutRectangle | null) => void;
  /**
   * Unique identifier for the select instance
   */
  nativeID: string;
  /**
   * Progress value for the select animation
   */
  progress: SharedValue<number>;
  /**
   * Delay in milliseconds before the select closes
   */
  closeDelay?: number;
}

/**
 * Props for the Select Root component
 */
type RootProps = SlottableViewProps & {
  /**
   * Callback fired when the select open state changes
   * @param open - Whether the select is open or closed
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * Delay in milliseconds before the select closes (for exit animations)
   * @default 300
   */
  closeDelay?: number;
  /**
   * Whether the select is disabled
   */
  isDisabled?: boolean;
};
/**
 * Props for the Select Portal component
 */
interface PortalProps extends ForceMountable {
  /**
   * The content to render within the portal
   */
  children: React.ReactNode;
  /**
   * Optional name of the host element for the portal
   */
  hostName?: string;
}

/**
 * Props for the Select Overlay component
 */
type OverlayProps = ForceMountable &
  SlottablePressableProps & {
    /**
     * Whether to close the select when the overlay is pressed
     * @default true
     */
    closeOnPress?: boolean;
  };

/**
 * Props for the Select Trigger component
 */
type TriggerProps = Omit<SlottablePressableProps, 'disabled'> & {
  isDisabled?: boolean;
};

/**
 * Props for the Select Content component
 */
type ContentProps = SlottableViewProps & PositionedContentProps;

/**
 * Props for the Select Close component
 */
type CloseProps = SlottablePressableProps;

/**
 * Ref type for the Select Close component
 */
type CloseRef = PressableRef;

/**
 * Ref type for the Select Content component
 */
type ContentRef = ViewRef;

/**
 * Ref type for the Select Overlay component
 */
type OverlayRef = PressableRef;

/**
 * Ref type for the Select Root component
 */
type RootRef = ViewRef;

/**
 * Ref type for the Select Trigger component
 */
type TriggerRef = PressableRef & {
  /**
   * Programmatically open the select
   */
  open: () => void;
  /**
   * Programmatically close the select
   */
  close: () => void;
};

export type {
  CloseProps,
  CloseRef,
  ContentProps,
  ContentRef,
  IRootContext,
  OverlayProps,
  OverlayRef,
  PortalProps,
  RootProps,
  RootRef,
  SelectState,
  TriggerProps,
  TriggerRef,
};
