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
 * Content sizing strategy
 * - 'content-fit': Auto-size to content width (default)
 * - 'trigger': Match trigger width exactly
 * - 'full': 100% width
 * - number: Fixed width in pixels
 */
type ContentSizing = 'trigger' | 'content-fit' | 'full' | number;

/**
 * Internal context interface for managing menu state and positioning
 */
interface IRootContext {
  /**
   * Whether the menu is currently open
   */
  isOpen: boolean;
  /**
   * Callback to change the open state of the menu
   */
  onOpenChange: (open: boolean) => void;
  /**
   * Whether the menu should be open by default (uncontrolled mode)
   */
  isDefaultOpen?: boolean;
  /**
   * Whether the menu is disabled
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
   * The layout measurements of the menu content
   */
  contentLayout: LayoutRectangle | null;
  /**
   * Updates the content layout measurements
   */
  setContentLayout: (contentLayout: LayoutRectangle | null) => void;
  /**
   * Unique identifier for the menu instance
   */
  nativeID: string;
  /**
   * Presentation mode for the menu content
   * - 'popover': Default floating popover with positioning
   * - 'bottom-sheet': Bottom sheet modal presentation
   * @default 'popover'
   */
  presentation: 'popover' | 'bottom-sheet';
  /**
   * Whether a child SubMenu is currently open (derived from `openSubMenuId`).
   * Used for coordinating animations and interactions between
   * Menu and SubMenu components.
   */
  isSubMenuOpen: boolean;
  /**
   * The `nativeID` of the currently open SubMenu, or `null` when none is open.
   * Enables single-open enforcement across sibling SubMenus.
   */
  openSubMenuId: string | null;
  /**
   * Registers the given SubMenu as the active (open) one.
   * Calling this with a new id implicitly deactivates any previously open SubMenu.
   * @param id - The `nativeID` of the SubMenu that is opening
   */
  openSubMenu: (id: string) => void;
  /**
   * Clears the active SubMenu **only** if it matches the given id.
   * Prevents a closing SubMenu from accidentally clearing another SubMenu's registration.
   * @param id - The `nativeID` of the SubMenu that is closing
   */
  closeSubMenu: (id: string) => void;
}

/**
 * Props for the Menu Root component
 */
type RootProps = SlottableViewProps & {
  /**
   * Presentation mode for the menu content
   * - 'popover': Default floating popover with positioning
   * - 'bottom-sheet': Bottom sheet modal presentation
   * @default 'popover'
   */
  presentation?: 'popover' | 'bottom-sheet';
  /**
   * The controlled open state of the menu
   */
  isOpen?: boolean;
  /**
   * The open state of the menu when initially rendered (uncontrolled)
   */
  isDefaultOpen?: boolean;
  /**
   * Whether the menu is disabled
   */
  isDisabled?: boolean;
  /**
   * Callback fired when the menu open state changes
   * @param open - Whether the menu is open or closed
   */
  onOpenChange?: (open: boolean) => void;
};
/**
 * Props for the Menu Portal component
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
 * Props for the Menu Overlay component
 */
type OverlayProps = ForceMountable &
  SlottablePressableProps & {
    /**
     * Whether to close the menu when the overlay is pressed
     * @default true
     */
    closeOnPress?: boolean;
  };

/**
 * Props for the Menu Trigger component
 */
type TriggerProps = Omit<SlottablePressableProps, 'disabled'> & {
  isDisabled?: boolean;
};

/**
 * Props for the Menu Content component
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
 * Props for the Menu Close component
 */
type CloseProps = SlottablePressableProps;

// --------------------------------------------------
// Menu Key
// --------------------------------------------------

/** Key type for identifying items within a Menu Group */
type MenuKey = string | number;

/** Selection mode for a Menu Group */
type GroupSelectionMode = 'none' | 'single' | 'multiple';

// --------------------------------------------------
// Group
// --------------------------------------------------

/**
 * Props for the Menu Group component.
 * Manages selection state and disabled keys for grouped menu items.
 *
 * @extends SlottableViewProps Inherits view props with asChild support
 */
type GroupProps = SlottableViewProps & {
  /** The type of selection allowed in the group @default "none" */
  selectionMode?: GroupSelectionMode;
  /** The currently selected keys (controlled) */
  selectedKeys?: Iterable<MenuKey>;
  /** The initial selected keys (uncontrolled) */
  defaultSelectedKeys?: Iterable<MenuKey>;
  /** Handler called when the selection changes */
  onSelectionChange?: (keys: Set<MenuKey>) => void;
  /** Keys of items that should be disabled */
  disabledKeys?: Iterable<MenuKey>;
  /** Whether the entire group is disabled */
  isDisabled?: boolean;
  /**
   * Whether selecting an item in this group should close the menu.
   * Applied to all child items unless overridden at the item level.
   * When `undefined`, falls back to the default behavior based on `selectionMode`
   * (`false` for `"multiple"`, `true` otherwise).
   */
  shouldCloseOnSelect?: boolean;
  /**
   * Whether to prevent deselecting the last selected item in `"single"` selection mode.
   * When `true`, pressing an already-selected item is a no-op (radio-group behavior).
   * Has no effect when `selectionMode` is `"multiple"` or `"none"`.
   * @default false
   */
  disallowEmptySelection?: boolean;
};

/**
 * Internal context value for a Menu Group.
 * Holds resolved selection state and callbacks.
 */
type GroupContextValue = Required<
  Pick<GroupProps, 'selectionMode' | 'isDisabled'>
> & {
  /** Resolved set of currently selected keys */
  selectedKeys: Set<MenuKey>;
  /** Resolved set of disabled keys */
  disabledKeys: Set<MenuKey>;
  /** Callback to update the selection */
  onSelectionChange: NonNullable<GroupProps['onSelectionChange']>;
  /**
   * Group-level close-on-select preference.
   * `undefined` means no group-level override (use default behavior).
   */
  shouldCloseOnSelect: boolean | undefined;
  /**
   * Whether deselecting the last item is prevented in single-selection mode.
   */
  disallowEmptySelection: boolean;
};

// --------------------------------------------------
// Item
// --------------------------------------------------

/**
 * Visual variant for a menu item.
 * - `'default'` – Standard menu item styling.
 * - `'danger'`  – Destructive-action styling (e.g. red text).
 */
type ItemVariant = 'default' | 'danger';

/**
 * Internal context value exposed to Menu Item children
 * (ItemTitle, ItemDescription, ItemIndicator).
 */
interface IItemContext {
  /** Item identifier (undefined for standalone items without id) */
  id: MenuKey | undefined;
  /** Whether the item is currently selected */
  isSelected: boolean;
  /** Whether the item is disabled */
  isDisabled: boolean;
  /**
   * Visual variant of the item.
   * @default 'default'
   */
  variant: ItemVariant;
}

/**
 * Props for the Menu Item component.
 * When used standalone, acts as a regular pressable with optional selection.
 * When used inside a Menu Group, participates in the group's selection logic.
 *
 * @extends SlottablePressableProps Inherits pressable props except 'disabled'
 */
type ItemProps = Omit<SlottablePressableProps, 'disabled'> & {
  /**
   * Unique identifier for this item. Required when inside a Menu Group.
   */
  id?: MenuKey;
  /** Whether this item is disabled */
  isDisabled?: boolean;
  /**
   * Whether pressing this item should close the menu.
   * Defaults to `true`. Forced to `false` when inside a Group with
   * `selectionMode="multiple"`.
   * @default true
   */
  shouldCloseOnSelect?: boolean;
  /**
   * Controlled selected state for standalone items.
   * Enables ItemIndicator support without a Group.
   * Ignored when inside a Group (selection is managed by Group).
   */
  isSelected?: boolean;
  /**
   * Callback fired when the standalone item's selected state changes.
   * Ignored when inside a Group (selection is managed by Group).
   * @param selected - The new selected state
   */
  onSelectedChange?: (selected: boolean) => void;
  /**
   * Visual variant of the menu item.
   * @default 'default'
   */
  variant?: ItemVariant;
};

// --------------------------------------------------
// Label
// --------------------------------------------------

/**
 * Props for the Menu Label component.
 * Renders a non-interactive text label within the menu (e.g. section heading).
 *
 * @extends SlottableTextProps Inherits text props with asChild support
 */
type LabelProps = SlottableTextProps;

// --------------------------------------------------
// Item sub-components
// --------------------------------------------------

/**
 * Props for the Menu ItemTitle component.
 * Renders the primary label text of a menu item.
 *
 * @extends SlottableTextProps Inherits text props with asChild support
 */
type ItemTitleProps = SlottableTextProps;

/**
 * Props for the Menu ItemDescription component.
 * Renders secondary description text of a menu item.
 *
 * @extends SlottableTextProps Inherits text props with asChild support
 */
type ItemDescriptionProps = SlottableTextProps;

/**
 * Props for the Menu ItemIndicator component.
 * Renders a visual selection indicator (e.g. checkmark) within a menu item.
 * Only visible when the parent item is selected unless `forceMount` is set.
 *
 * @extends SlottableViewProps Inherits view props with asChild support
 * @extends ForceMountable Supports forced mounting behavior
 */
type ItemIndicatorProps = SlottableViewProps & ForceMountable;

// --------------------------------------------------
// Ref types
// --------------------------------------------------

/** Ref type for the Menu Close component */
type CloseRef = PressableRef;

/** Ref type for the Menu Content component */
type ContentRef = ViewRef;

/** Ref type for the Menu Overlay component */
type OverlayRef = PressableRef;

/** Ref type for the Menu Root component */
type RootRef = ViewRef;

/** Ref type for the Menu Trigger component */
type TriggerRef = PressableRef & {
  /** Programmatically open the menu */
  open: () => void;
  /** Programmatically close the menu */
  close: () => void;
};

/** Ref type for the Menu Group component */
type GroupRef = ViewRef;

/** Ref type for the Menu Label component */
type LabelRef = TextRef;

/** Ref type for the Menu Item component */
type ItemRef = PressableRef;

/** Ref type for the Menu ItemTitle component */
type ItemTitleRef = TextRef;

/** Ref type for the Menu ItemDescription component */
type ItemDescriptionRef = TextRef;

/** Ref type for the Menu ItemIndicator component */
type ItemIndicatorRef = ViewRef;

export type {
  CloseProps,
  CloseRef,
  ContentProps,
  ContentRef,
  ContentSizing,
  GroupContextValue,
  GroupProps,
  GroupRef,
  GroupSelectionMode,
  IItemContext,
  IRootContext,
  ItemDescriptionProps,
  ItemDescriptionRef,
  ItemIndicatorProps,
  ItemIndicatorRef,
  ItemProps,
  ItemRef,
  ItemTitleProps,
  ItemTitleRef,
  ItemVariant,
  LabelProps,
  LabelRef,
  MenuKey,
  OverlayProps,
  OverlayRef,
  PortalProps,
  RootProps,
  RootRef,
  TriggerProps,
  TriggerRef,
};
