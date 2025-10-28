import type { LayoutRectangle } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';
import type { LayoutPosition } from '../../helpers/hooks';
import type {
  ForceMountable,
  PositionedContentProps,
  PressableRef,
  SlottablePressableProps,
  SlottableTextProps,
  SlottableViewProps,
  TextRef,
  ViewRef,
} from '../../helpers/types';

/**
 * Select internal state
 */
type SelectState = 'idle' | 'open' | 'close';

/**
 * Select option type
 */
type SelectOption =
  | {
      value: string;
      label: string;
    }
  | undefined;

/**
 * Content sizing strategy
 * - 'content-fit': Auto-size to content width (default)
 * - 'trigger': Match trigger width exactly
 * - 'full': 100% width
 * - number: Fixed width in pixels
 */
type ContentSizing = 'trigger' | 'content-fit' | 'full' | number;

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
   * Whether the select content (dialog) is currently dragging
   */
  isDragging: SharedValue<boolean>;
  /**
   * Delay in milliseconds before the select closes
   */
  closeDelay?: number;
  /**
   * The currently selected option
   */
  value: SelectOption;
  /**
   * Callback fired when the selected value changes
   */
  onValueChange: (option: SelectOption) => void;
  /**
   * Whether to dismiss the keyboard when the select closes
   */
  isDismissKeyboardOnClose?: boolean;
}

/**
 * Props for the Select Root component
 */
type RootProps = SlottableViewProps & {
  /**
   * The controlled selected value of the select
   */
  value?: SelectOption;
  /**
   * The default selected value (uncontrolled)
   */
  defaultValue?: SelectOption;
  /**
   * Callback fired when the selected value changes
   * @param option - The newly selected option
   */
  onValueChange?: (option: SelectOption) => void;
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
  /**
   * Whether to dismiss the keyboard when the select closes
   */
  isDismissKeyboardOnClose?: boolean;
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
type PopoverContentProps = SlottableViewProps &
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
 * Props for the dialog content component
 */
type DialogContentProps = ForceMountable & SlottableViewProps;

/**
 * Props for the Select Close component
 */
type CloseProps = SlottablePressableProps;

/**
 * Props for the Select Value component
 */
type ValueProps = SlottableTextProps & {
  /**
   * Placeholder text to show when no value is selected
   */
  placeholder: string;
};

/**
 * Props for the Select Item component
 */
type ItemProps = SlottablePressableProps & {
  /**
   * The value of this item
   */
  value: string;
  /**
   * The label to display for this item
   */
  label: string;
  /**
   * Whether to close the select when this item is pressed
   * @default true
   */
  closeOnPress?: boolean;
};

/**
 * Props for the Select Item Label component
 */
type ItemLabelProps = Omit<SlottableTextProps, 'children'>;

/**
 * Props for the Select Item Indicator component
 */
type ItemIndicatorProps = SlottableViewProps & ForceMountable;

/**
 * Props for the Select Group component
 */
type GroupProps = SlottableViewProps;

/**
 * Props for the Select Group Label component
 */
type GroupLabelProps = SlottableTextProps;

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

/**
 * Ref type for the Select Value component
 */
type ValueRef = TextRef;

/**
 * Ref type for the Select Item component
 */
type ItemRef = PressableRef;

/**
 * Ref type for the Select Item Label component
 */
type ItemLabelRef = TextRef;

/**
 * Ref type for the Select Item Indicator component
 */
type ItemIndicatorRef = ViewRef;

/**
 * Ref type for the Select Group component
 */
type GroupRef = ViewRef;

/**
 * Ref type for the Select Group Label component
 */
type GroupLabelRef = TextRef;

export type {
  CloseProps,
  CloseRef,
  ContentRef,
  ContentSizing,
  DialogContentProps,
  GroupLabelProps,
  GroupLabelRef,
  GroupProps,
  GroupRef,
  IRootContext,
  ItemIndicatorProps,
  ItemIndicatorRef,
  ItemLabelProps,
  ItemLabelRef,
  ItemProps,
  ItemRef,
  OverlayProps,
  OverlayRef,
  PopoverContentProps,
  PortalProps,
  RootProps,
  RootRef,
  SelectOption,
  SelectState,
  TriggerProps,
  TriggerRef,
  ValueProps,
  ValueRef,
};
