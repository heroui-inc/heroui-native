import type {
  ForceMountable,
  PressableRef,
  SlottablePressableProps,
  SlottableViewProps,
  ViewRef,
} from '../../helpers/internal/types';

/**
 * Internal context interface for managing sub-menu state.
 * Provides open state, toggle callback, and a unique identifier
 * to associate trigger and content elements.
 */
interface ISubMenuContext {
  /**
   * Whether the sub-menu is currently open
   */
  isOpen: boolean;
  /**
   * Callback to change the open state of the sub-menu
   */
  onOpenChange: (open: boolean) => void;
  /**
   * Whether the sub-menu is disabled
   */
  isDisabled: boolean;
  /**
   * Unique identifier linking trigger and content via aria attributes
   */
  nativeID: string;
}

/**
 * Props for the SubMenu Root component.
 * Wraps trigger and content, providing shared open-state context.
 *
 * @extends SlottableViewProps Inherits view props with asChild support
 */
type RootProps = SlottableViewProps & {
  /**
   * The controlled open state of the sub-menu
   */
  isOpen?: boolean;
  /**
   * The open state of the sub-menu when initially rendered (uncontrolled)
   */
  isDefaultOpen?: boolean;
  /**
   * Whether the sub-menu is disabled.
   * When `true`, the trigger will not respond to presses.
   * @default false
   */
  isDisabled?: boolean;
  /**
   * Callback fired when the sub-menu open state changes
   * @param open - Whether the sub-menu is open or closed
   */
  onOpenChange?: (open: boolean) => void;
};

/**
 * Props for the SubMenu Trigger component.
 * Renders a pressable element that toggles the sub-menu content.
 *
 * @extends SlottablePressableProps Inherits pressable props except 'disabled'
 */
type TriggerProps = Omit<SlottablePressableProps, 'disabled'> & {
  /**
   * Accessible text value describing the sub-menu trigger.
   * Announced by screen readers when the element receives focus.
   */
  textValue?: string;
  /**
   * Whether this trigger is disabled, independent of root.
   * When `true`, press events are ignored and aria-disabled is set.
   * @default false
   */
  isDisabled?: boolean;
};

/**
 * Props for the SubMenu Content component.
 * Conditionally renders the sub-menu body when the parent sub-menu is open.
 *
 * @extends SlottablePressableProps Inherits pressable props with asChild support
 * @extends ForceMountable Supports forced mounting for animation purposes
 */
type ContentProps = SlottablePressableProps & ForceMountable;

/** Ref type for the SubMenu Root component */
type RootRef = ViewRef;

/** Ref type for the SubMenu Trigger component */
type TriggerRef = PressableRef;

/** Ref type for the SubMenu Content component */
type ContentRef = PressableRef;

export type {
  ContentProps,
  ContentRef,
  ISubMenuContext,
  RootProps,
  RootRef,
  TriggerProps,
  TriggerRef,
};
