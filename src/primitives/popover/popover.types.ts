import type {
  ForceMountable,
  PositionedContentProps,
  PressableRef,
  SlottablePressableProps,
  SlottableViewProps,
  ViewRef,
} from '../../helpers/types';

/**
 * Props for the Popover Root component
 */
type RootProps = SlottableViewProps & {
  /**
   * Callback fired when the popover open state changes
   * @param open - Whether the popover is open or closed
   */
  onOpenChange?: (open: boolean) => void;
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
type TriggerProps = SlottablePressableProps;

/**
 * Props for the Popover Content component
 */
type ContentProps = SlottableViewProps & PositionedContentProps;

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
  OverlayProps,
  OverlayRef,
  PortalProps,
  RootProps,
  RootRef,
  TriggerProps,
  TriggerRef,
};
