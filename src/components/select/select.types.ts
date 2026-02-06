import type BottomSheet from '@gorhom/bottom-sheet';
import type { ReactNode } from 'react';
import type { TextProps, ViewStyle } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';
import type {
  AnimationRootDisableAll,
  BaseBottomSheetContentProps,
  ElementSlots,
  PopupDialogContentAnimation,
  PopupOverlayAnimation,
  PopupPopoverContentAnimation,
} from '../../helpers/internal/types';
import type * as SelectPrimitivesTypes from '../../primitives/select/select.types';
import type { CloseButtonProps } from '../close-button/close-button.types';
import type { DialogContentFallbackSlots } from './select.styles';

/**
 * Select internal state for animation coordination
 */
export type SelectState = 'idle' | 'open' | 'close';

/**
 * Context value for select animation state
 */
export interface SelectAnimationContextValue {
  /** Animation progress shared value (0=idle, 1=open, 2=close) */
  progress: SharedValue<number>;
  /** Dragging state shared value */
  isDragging: SharedValue<boolean>;
  /** Gesture release animation running state shared value */
  isGestureReleaseAnimationRunning: SharedValue<boolean>;
}

/**
 * Ref type for the Select Trigger component
 */
export type SelectTriggerRef = SelectPrimitivesTypes.TriggerRef;

/**
 * Select placement options
 */
export type SelectPlacement = 'top' | 'bottom' | 'left' | 'right';

/**
 * Select alignment options
 */
export type SelectAlign = 'start' | 'center' | 'end';

/**
 * Select Root component props
 */
export interface SelectRootProps extends SelectPrimitivesTypes.RootProps {
  /**
   * The content of the select
   */
  children?: ReactNode;
  /**
   * The controlled open state of the select
   */
  isOpen?: boolean;
  /**
   * The open state of the select when initially rendered (uncontrolled)
   */
  isDefaultOpen?: boolean;
  /**
   * Animation configuration for select root
   * - `"disable-all"`: Disable all animations including children
   * - `false` or `"disabled"`: Disable only root animations
   * - `true` or `undefined`: Use default animations
   */
  animation?: AnimationRootDisableAll;
}

/**
 * Select Trigger component props
 */
export interface SelectTriggerProps extends SelectPrimitivesTypes.TriggerProps {
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
 * Select Portal component props
 */
export interface SelectPortalProps extends SelectPrimitivesTypes.PortalProps {
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
 * Animation configuration for Select Overlay component
 */
export type SelectOverlayAnimation = PopupOverlayAnimation;

/**
 * Select Overlay component props
 */
export interface SelectOverlayProps extends SelectPrimitivesTypes.OverlayProps {
  /**
   * Additional CSS class for the overlay
   */
  className?: string;
  /**
   * Animation configuration for overlay
   * - `false` or `"disabled"`: Disable all animations
   * - `true` or `undefined`: Use default animations (progress-based opacity for bottom-sheet/dialog, Keyframe animations for popover)
   * - `object`: Custom animation configuration
   *   - For bottom-sheet/dialog: `opacity` with progress-based values
   *   - For popover: `entering` and/or `exiting` Keyframe animations
   */
  animation?: SelectOverlayAnimation;
  /**
   * Whether animated styles (react-native-reanimated) are active
   * When `false`, the animated style is removed and you can implement custom logic
   * This prop should only be used when you want to write custom styling logic instead of the default animated styles
   * @default true
   */
  isAnimatedStyleActive?: boolean;
}

/**
 * Animation configuration for Select Content Popover component
 * Reuses PopupPopoverContentAnimation since they share the same animation behavior
 */
export type SelectContentPopoverAnimation = PopupPopoverContentAnimation;

/**
 * Select Content props for 'popover' presentation
 */
export interface SelectContentPopoverProps
  extends SelectPrimitivesTypes.PopoverContentProps {
  /**
   * Additional CSS class for the content container
   */
  className?: string;
  /**
   * The select content
   */
  children?: ReactNode;
  /**
   * Presentation mode for the select
   */
  presentation: 'popover';
  /**
   * Animation configuration for content
   * - `false` or `"disabled"`: Disable all animations
   * - `true` or `undefined`: Use default Keyframe animations (translateY/translateX, scale, opacity based on placement)
   * - `object`: Custom animation configuration with `entering` and/or `exiting` Keyframe animations
   */
  animation?: SelectContentPopoverAnimation;
}

/**
 * Select Content props for 'bottom-sheet' presentation
 */
export interface SelectContentBottomSheetProps
  extends Partial<React.ComponentProps<typeof BottomSheet>>,
    BaseBottomSheetContentProps {
  /**
   * Presentation mode for the select
   */
  presentation: 'bottom-sheet';
}

/**
 * Animation configuration for Select Content component (dialog presentation)
 * Reuses PopupDialogContentAnimation since they share the same animation behavior
 */
export type SelectContentAnimation = PopupDialogContentAnimation;

/**
 * Select Content props for 'dialog' presentation
 */
export interface SelectContentDialogProps
  extends SelectPrimitivesTypes.DialogContentProps {
  /**
   * Additional CSS classes for the content container
   */
  classNames?: ElementSlots<DialogContentFallbackSlots>;
  /**
   * Styles for different parts of the dialog content
   */
  styles?: Partial<Record<DialogContentFallbackSlots, ViewStyle>>;
  /**
   * The select content
   */
  children?: ReactNode;
  /**
   * Presentation mode for the select
   */
  presentation: 'dialog';
  /**
   * Animation configuration for content
   * - `false` or `"disabled"`: Disable all animations
   * - `true` or `undefined`: Use default Keyframe animations (scale and opacity transitions)
   * - `object`: Custom animation configuration with `entering` and/or `exiting` Keyframe animations
   */
  animation?: SelectContentAnimation;
  /**
   * Whether the dialog content can be swiped to dismiss
   * @default true
   */
  isSwipeable?: boolean;
}

/**
 * Select Content component props
 */
export type SelectContentProps =
  | SelectContentPopoverProps
  | SelectContentBottomSheetProps
  | SelectContentDialogProps;

/**
 * Select Close component props
 *
 * Extends CloseButtonProps, allowing full override of all close button props.
 * Automatically handles select close functionality when pressed.
 */
export interface SelectCloseProps extends CloseButtonProps {}

/**
 * Select Value component props
 */
export interface SelectValueProps extends SelectPrimitivesTypes.ValueProps {
  /**
   * Additional CSS class for the value
   */
  className?: string;
}

/**
 * Select List Label component props
 */
export interface SelectListLabelProps extends TextProps {
  /**
   * Additional CSS class for the list label
   */
  className?: string;
}

/**
 * Render function props for SelectItem children
 */
export interface SelectItemRenderProps {
  /** Whether this item is currently selected */
  isSelected: boolean;
  /** The value of the item */
  value: string;
  /** Whether the item is disabled */
  isDisabled: boolean;
}

/**
 * Select Item component props
 */
export interface SelectItemProps
  extends Omit<SelectPrimitivesTypes.ItemProps, 'children'> {
  /**
   * Additional CSS class for the item
   */
  className?: string;
  /**
   * Child elements to render inside the item, or a render function
   */
  children?: ReactNode | ((props: SelectItemRenderProps) => ReactNode);
}

/**
 * Select Item Label component props
 */
export interface SelectItemLabelProps extends Omit<TextProps, 'children'> {
  /**
   * Additional CSS class for the item label
   */
  className?: string;
}

/**
 * Select Item Description component props
 */
export interface SelectItemDescriptionProps extends TextProps {
  /**
   * Additional CSS class for the item description
   */
  className?: string;
}

/**
 * Select Item Indicator Icon props
 */
export interface SelectItemIndicatorIconProps {
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
 * Select Item Indicator component props
 */
export interface SelectItemIndicatorProps
  extends SelectPrimitivesTypes.ItemIndicatorProps {
  /**
   * Additional CSS class for the item indicator
   */
  className?: string;
  /**
   * Check icon props
   */
  iconProps?: SelectItemIndicatorIconProps;
}
