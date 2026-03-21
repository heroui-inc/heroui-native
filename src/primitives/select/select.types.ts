import type { LayoutRectangle } from 'react-native';
import type { LayoutPosition } from '../../helpers/internal/hooks';
import type {
  ForceMountable,
  PositionedContentProps,
  PressableRef,
  SlottablePressableProps,
  SlottableTextProps,
  SlottableViewProps,
  TextRef,
  ViewRef,
} from '../../helpers/internal/types';

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
 * Selection mode for the select component.
 * - 'single': Only one option can be selected at a time (default)
 * - 'multiple': Multiple options can be selected simultaneously
 */
type SelectionMode = 'single' | 'multiple';

/**
 * Resolves the value type based on selection mode.
 * - `'single'`  → `SelectOption`
 * - `'multiple'` → `SelectOption[]`
 */
type SelectValueType<M extends SelectionMode> = M extends 'single'
  ? SelectOption
  : SelectOption[];

/**
 * Internal wide union used by context (covers both modes).
 */
type SelectValue = SelectOption | SelectOption[];

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
   * The currently selected value.
   * - Single mode: `SelectOption`
   * - Multiple mode: `SelectOption[]`
   */
  value: SelectValue;
  /**
   * Callback fired when the selected value changes.
   * Internally uses the wide `SelectValue` union to handle both modes.
   */
  onValueChange: (value: SelectValue) => void;
  /**
   * The selection mode of the select
   * - 'single': Only one option can be selected at a time
   * - 'multiple': Multiple options can be selected simultaneously
   * @default 'single'
   */
  selectionMode: SelectionMode;
  /**
   * Presentation mode for the select content
   * - 'popover': Default floating popover with positioning
   * - 'bottom-sheet': Bottom sheet modal presentation
   * - 'dialog': Modal dialog presentation
   * @default 'popover'
   */
  presentation: 'popover' | 'bottom-sheet' | 'dialog';
}

/**
 * Props for the Select Root component.
 *
 * Generic on `M extends SelectionMode` (defaults to `'single'`).
 * TypeScript resolves `value` / `onValueChange` types via the conditional
 * `SelectValueType<M>`.
 *
 * @example
 * ```tsx
 * // Single mode — value is SelectOption
 * <Root value={option} onValueChange={setOption} />
 *
 * // Multiple mode — value is SelectOption[]
 * <Root selectionMode="multiple" value={options} onValueChange={setOptions} />
 * ```
 */
type RootProps<M extends SelectionMode = 'single'> = SlottableViewProps & {
  /**
   * Whether single or multiple selection is enabled.
   * @default 'single'
   */
  selectionMode?: M;
  /**
   * The controlled selected value of the select.
   * - Single mode: `SelectOption`
   * - Multiple mode: `SelectOption[]`
   */
  value?: SelectValueType<M>;
  /**
   * The default selected value (uncontrolled).
   * - Single mode: `SelectOption`
   * - Multiple mode: `SelectOption[]`
   */
  defaultValue?: SelectValueType<M>;
  /**
   * Callback fired when the selected value changes.
   * - Single mode: receives `SelectOption`
   * - Multiple mode: receives `SelectOption[]`
   */
  onValueChange?: (value: SelectValueType<M>) => void;
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
   * Whether the select is disabled
   */
  isDisabled?: boolean;
  /**
   * Presentation mode for the select content
   * - 'popover': Default floating popover with positioning
   * - 'bottom-sheet': Bottom sheet modal presentation
   * - 'dialog': Modal dialog presentation
   * @default 'popover'
   */
  presentation?: 'popover' | 'bottom-sheet' | 'dialog';
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
 * Props for the Select Trigger Indicator component
 */
type TriggerIndicatorProps = SlottableViewProps;

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
 * Ref type for the Select Trigger Indicator component
 */
type TriggerIndicatorRef = ViewRef;

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
  SelectionMode,
  SelectOption,
  SelectState,
  SelectValue,
  SelectValueType,
  TriggerIndicatorProps,
  TriggerIndicatorRef,
  TriggerProps,
  TriggerRef,
  ValueProps,
  ValueRef,
};
