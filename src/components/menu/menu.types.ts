import type BottomSheet from '@gorhom/bottom-sheet';
import type { ReactNode } from 'react';
import type { TextProps } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';
import type {
  AnimationRootDisableAll,
  BaseBottomSheetContentProps,
  PopupOverlayAnimation,
  PopupPopoverContentAnimation,
} from '../../helpers/internal/types';
import type * as MenuPrimitivesTypes from '../../primitives/menu/menu.types';
import type { CloseButtonProps } from '../close-button/close-button.types';

/**
 * Context value for menu animation state
 */
export interface MenuAnimationContextValue {
  /** Animation progress shared value (0=idle, 1=open, 2=close) */
  progress: SharedValue<number>;
  /** Dragging state shared value */
  isDragging: SharedValue<boolean>;
}

/**
 * Ref type for the Menu Trigger component
 */
export type MenuTriggerRef = MenuPrimitivesTypes.TriggerRef;

/**
 * Presentation mode for the menu content
 */
export type MenuPresentation = 'popover' | 'bottom-sheet';

/**
 * Menu placement options
 */
export type MenuPlacement = 'top' | 'bottom' | 'left' | 'right';

/**
 * Menu alignment options
 */
export type MenuAlign = 'start' | 'center' | 'end';

/**
 * Menu context value with presentation and placement
 */
export interface MenuContentContextValue {
  /**
   * Current placement of the menu
   */
  placement?: MenuPlacement;
}

/**
 * Menu Root component props
 */
export interface MenuRootProps extends MenuPrimitivesTypes.RootProps {
  /**
   * The content of the menu
   */
  children?: ReactNode;
  /**
   * Animation configuration for menu root
   * - `"disable-all"`: Disable all animations including children
   * - `false` or `"disabled"`: Disable only root animations
   * - `true` or `undefined`: Use default animations
   */
  animation?: AnimationRootDisableAll;
}

/**
 * Menu Trigger component props
 */
export interface MenuTriggerProps extends MenuPrimitivesTypes.TriggerProps {
  /**
   * The trigger element content
   */
  children?: ReactNode;
  /**
   * Additional CSS class for the trigger
   */
  className?: string;
}

/**
 * Menu Portal component props
 */
export interface MenuPortalProps extends MenuPrimitivesTypes.PortalProps {
  /**
   * When true, uses a regular View instead of FullWindowOverlay on iOS.
   * Enables React Native element inspector but overlay won't appear above native modals.
   * @default false
   */
  disableFullWindowOverlay?: boolean;
  /**
   * Additional CSS class for the portal container
   */
  className?: string;
  /**
   * The portal content
   */
  children: ReactNode;
}

/**
 * Menu Overlay component props
 */
export interface MenuOverlayProps extends MenuPrimitivesTypes.OverlayProps {
  /**
   * Additional CSS class for the overlay
   */
  className?: string;
  /**
   * Animation configuration for overlay
   * - `false` or `"disabled"`: Disable all animations
   * - `true` or `undefined`: Use default animations
   * - `object`: Custom animation configuration
   */
  animation?: PopupOverlayAnimation;
  /**
   * Whether animated styles (react-native-reanimated) are active
   * When `false`, the animated style is removed and you can implement custom logic
   * @default true
   */
  isAnimatedStyleActive?: boolean;
}

/**
 * Menu Content props for 'popover' presentation
 */
export interface MenuContentPopoverProps
  extends MenuPrimitivesTypes.ContentProps {
  /**
   * Presentation mode for the menu content
   */
  presentation: 'popover';
  /**
   * Additional CSS class for the content container
   */
  className?: string;
  /**
   * The menu content
   */
  children?: ReactNode;
  /**
   * Animation configuration for content
   * - `false` or `"disabled"`: Disable all animations
   * - `true` or `undefined`: Use default animations
   * - `object`: Custom animation configuration
   */
  animation?: PopupPopoverContentAnimation;
}

/**
 * Menu Content props for 'bottom-sheet' presentation
 */
export interface MenuContentBottomSheetProps
  extends Partial<React.ComponentProps<typeof BottomSheet>>,
    BaseBottomSheetContentProps {
  /**
   * Presentation mode for the menu
   */
  presentation: 'bottom-sheet';
}

/**
 * Menu Content component props
 */
export type MenuContentProps =
  | MenuContentPopoverProps
  | MenuContentBottomSheetProps;

/**
 * Menu Close component props
 *
 * Extends CloseButtonProps, allowing full override of all close button props.
 * Automatically handles menu close functionality when pressed.
 */
export type MenuCloseProps = CloseButtonProps;

// --------------------------------------------------
// Group
// --------------------------------------------------

/**
 * Menu Group component props
 */
export interface MenuGroupProps
  extends Omit<MenuPrimitivesTypes.GroupProps, 'asChild'> {
  /**
   * Additional CSS class for the group container
   */
  className?: string;
  /**
   * The group content (Menu.Item elements)
   */
  children?: ReactNode;
}

// --------------------------------------------------
// Item
// --------------------------------------------------

/**
 * Render function props for MenuItem children
 */
export interface MenuItemRenderProps {
  /** Whether this item is currently selected */
  isSelected: boolean;
  /** Whether the item is disabled */
  isDisabled: boolean;
  /** Visual variant of the item */
  variant: MenuPrimitivesTypes.ItemVariant;
}

/**
 * Menu Item component props
 */
export interface MenuItemProps
  extends Omit<MenuPrimitivesTypes.ItemProps, 'children'> {
  /**
   * Additional CSS class for the item
   */
  className?: string;
  /**
   * Child elements to render inside the item, or a render function
   */
  children?: ReactNode | ((props: MenuItemRenderProps) => ReactNode);
}

/**
 * Menu ItemTitle component props
 */
export interface MenuItemTitleProps extends TextProps {
  /**
   * Additional CSS class for the item title
   */
  className?: string;
}

/**
 * Menu ItemDescription component props
 */
export interface MenuItemDescriptionProps extends TextProps {
  /**
   * Additional CSS class for the item description
   */
  className?: string;
}

/**
 * Menu Item Indicator Icon props
 */
export interface MenuItemIndicatorIconProps {
  /**
   * Size of the check icon
   * @default 16
   */
  size?: number;
  /**
   * Color of the check icon
   */
  color?: string;
}

/**
 * Menu ItemIndicator component props
 */
export interface MenuItemIndicatorProps
  extends MenuPrimitivesTypes.ItemIndicatorProps {
  /**
   * Additional CSS class for the item indicator
   */
  className?: string;
  /**
   * Check icon props
   */
  iconProps?: MenuItemIndicatorIconProps;
}

// --------------------------------------------------
// Hook return types
// --------------------------------------------------

/**
 * Return type for the useMenu hook
 */
export type UseMenuReturn = MenuPrimitivesTypes.IRootContext;

/**
 * Return type for the useMenuAnimation hook
 */
export interface UseMenuAnimationReturn {
  /** Animation progress shared value (0=idle, 1=open, 2=close) */
  progress: SharedValue<number>;
  /** Dragging state shared value */
  isDragging: SharedValue<boolean>;
}

// --------------------------------------------------
// Re-export primitive types used by consumers
// --------------------------------------------------

export type {
  GroupSelectionMode as MenuGroupSelectionMode,
  ItemVariant as MenuItemVariant,
  MenuKey,
} from '../../primitives/menu/menu.types';
