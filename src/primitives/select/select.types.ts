import type { LayoutRectangle } from 'react-native';
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
 * Select option type for single selection
 */
type SelectOption =
  | {
      value: string;
      label: string;
    }
  | undefined;

/**
 * Select option type for multiple selection
 */
type MultiSelectOption = Array<{
  value: string;
  label: string;
}>;

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
   * Whether multiple selection is enabled
   */
  multi: boolean;
  /**
   * Whether the select is currently open
   */
  isOpen: boolean;
  /**
   * Callback to change the open state of the select
   */
  onOpenChange: (open: boolean) => void;
  /**
   * Whether the select is default open
   */
  isDefaultOpen?: boolean;
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
   * Delay in milliseconds before the select closes
   */
  closeDelay?: number;
  /**
   * The currently selected option(s)
   */
  value: SelectOption | MultiSelectOption;
  /**
   * Callback fired when the selected value changes
   */
  onValueChange: (option: SelectOption | MultiSelectOption) => void;
}

/**
 * Base props shared by single and multi select modes
 */
type BaseRootProps = SlottableViewProps & {
  /**
   * The controlled open state of the select
   */
  isOpen?: boolean;
  /**
   * The open state of the select when initially rendered (uncontrolled)
   */
  isDefaultOpen?: boolean;
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
 * Props for single-select mode (multi=false or undefined)
 */
type SingleSelectRootProps = BaseRootProps & {
  /**
   * Whether multiple selection is enabled
   * @default false
   */
  multi?: false;
  /**
   * The controlled selected value
   */
  value?: SelectOption;
  /**
   * The default selected value (uncontrolled)
   */
  defaultValue?: SelectOption;
  /**
   * Callback fired when the selected value changes
   */
  onValueChange?: (option: SelectOption) => void;
};

/**
 * Props for multi-select mode (multi=true)
 */
type MultiSelectRootProps = BaseRootProps & {
  /**
   * Enable multiple selection mode
   */
  multi: true;
  /**
   * The controlled selected values
   */
  value?: MultiSelectOption;
  /**
   * The default selected values (uncontrolled)
   */
  defaultValue?: MultiSelectOption;
  /**
   * Callback fired when the selected values change
   */
  onValueChange?: (option: MultiSelectOption) => void;
};

/**
 * Props for the Select Root component (discriminated union based on multi prop)
 */
type RootProps = SingleSelectRootProps | MultiSelectRootProps;
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
  /**
   * Custom render function for multiple selection display
   * @param selected - Array of selected options
   * @returns String to display
   */
  renderMultiple?: (selected: MultiSelectOption) => string;
  /**
   * Maximum number of labels to show before switching to count display
   * Only applies to multiple selection mode
   * @default 3
   */
  maxDisplayLabels?: number;
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
  BaseRootProps,
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
  MultiSelectOption,
  MultiSelectRootProps,
  OverlayProps,
  OverlayRef,
  PopoverContentProps,
  PortalProps,
  RootProps,
  RootRef,
  SelectOption,
  SelectState,
  SingleSelectRootProps,
  TriggerProps,
  TriggerRef,
  ValueProps,
  ValueRef,
};
