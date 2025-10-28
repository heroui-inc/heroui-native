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
 * Popover internal state
 */
type PopoverState = 'idle' | 'open' | 'close';

/**
 * Content sizing strategy
 * - 'content-fit': Auto-size to content width (default)
 * - 'trigger': Match trigger width exactly
 * - 'full': 100% width
 * - number: Fixed width in pixels
 */
type ContentSizing = 'trigger' | 'content-fit' | 'full' | number;

/**
 * Internal context interface for managing popover state and positioning
 */
interface IRootContext {
  /**
   * Whether the popover is currently open
   */
  isOpen: boolean;
  /**
   * Callback to change the open state of the popover
   */
  onOpenChange: (open: boolean) => void;
  /**
   * Extended internal state for additional control (useful for coordinating animations)
   */
  popoverState: PopoverState;
  /**
   * Whether the popover is disabled
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
   * The layout measurements of the popover content
   */
  contentLayout: LayoutRectangle | null;
  /**
   * Updates the content layout measurements
   */
  setContentLayout: (contentLayout: LayoutRectangle | null) => void;
  /**
   * Unique identifier for the popover instance
   */
  nativeID: string;
  /**
   * Progress value for the popover animation
   */
  progress: SharedValue<number>;
  /**
   * Delay in milliseconds before the popover closes
   */
  closeDelay?: number;
}

/**
 * Props for the Popover Root component
 */
type RootProps = SlottableViewProps & {
  /**
   * Callback fired when the popover open state changes
   * @param open - Whether the popover is open or closed
   */
  onOpenChange?: (open: boolean) => void;
  /**
   * Delay in milliseconds before the popover closes (for exit animations)
   * @default 300
   */
  closeDelay?: number;
  /**
   * Whether the popover is disabled
   */
  isDisabled?: boolean;
};
/**
 * Props for the Popover Portal component
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
 * Props for the Popover Overlay component
 */
type OverlayProps = ForceMountable &
  SlottablePressableProps & {
    /**
     * Whether to close the popover when the overlay is pressed
     * @default true
     */
    closeOnPress?: boolean;
  };

/**
 * Props for the Popover Trigger component
 */
type TriggerProps = Omit<SlottablePressableProps, 'disabled'> & {
  isDisabled?: boolean;
};

/**
 * Props for the Popover Content component
 */
type ContentProps = SlottableViewProps &
  PositionedContentProps & {
    /**
     * Content width sizing strategy
     * - 'content-fit': Auto-size to content width (default)
     * - 'trigger': Match trigger width exactly
     * - 'full': 100% width
     * - number: Fixed width in pixels
     * @default 'content-fit'
     */
    width?: ContentSizing;
  };

/**
 * Props for the Popover Close component
 */
type CloseProps = SlottablePressableProps;

/**
 * Ref type for the Popover Close component
 */
type CloseRef = PressableRef;

/**
 * Ref type for the Popover Content component
 */
type ContentRef = ViewRef;

/**
 * Ref type for the Popover Overlay component
 */
type OverlayRef = PressableRef;

/**
 * Ref type for the Popover Root component
 */
type RootRef = ViewRef;

/**
 * Ref type for the Popover Trigger component
 */
type TriggerRef = PressableRef & {
  /**
   * Programmatically open the popover
   */
  open: () => void;
  /**
   * Programmatically close the popover
   */
  close: () => void;
};

export type {
  CloseProps,
  CloseRef,
  ContentProps,
  ContentRef,
  ContentSizing,
  IRootContext,
  OverlayProps,
  OverlayRef,
  PopoverState,
  PortalProps,
  RootProps,
  RootRef,
  TriggerProps,
  TriggerRef,
};
