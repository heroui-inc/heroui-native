import type BottomSheet from '@gorhom/bottom-sheet';
import type { ReactNode } from 'react';
import type { TextProps } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';
import type {
  AnimationRoot,
  BaseBottomSheetContentProps,
  ElementSlots,
  PopupDialogContentAnimation,
  PopupOverlayAnimation,
  PopupPopoverContentAnimation,
  PopupRootAnimationConfig,
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
  /** Extended internal state for animation control */
  selectState: SelectState;
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
 * Animation configuration for Select root component
 */
export type SelectRootAnimation = AnimationRoot<PopupRootAnimationConfig>;

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
   * Whether to dismiss the keyboard when the select closes
   * @default true
   */
  isDismissKeyboardOnClose?: boolean;
  /**
   * Animation configuration for select root
   * - `"disable-all"`: Disable all animations including children
   * - `false` or `"disabled"`: Disable only root animations
   * - `true` or `undefined`: Use default animations
   * - `object`: Custom animation configuration
   */
  animation?: SelectRootAnimation;
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
   *
   * @note The following style properties are occupied by animations and cannot be set via className:
   * - `opacity` - Animated for overlay show/hide transitions (idle: 0, open: 1, close: 0)
   *
   * To customize this property, use the `animation` prop:
   * ```tsx
   * <Select.Overlay
   *   animation={{
   *     opacity: { value: [0, 1, 0] }
   *   }}
   * />
   * ```
   *
   * To completely disable animated styles and use your own via className or style prop, set `isAnimatedStyleActive={false}`.
   */
  className?: string;
  /**
   * Animation configuration for overlay
   * - `false` or `"disabled"`: Disable all animations
   * - `true` or `undefined`: Use default animations
   * - `object`: Custom animation configuration
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
   *
   * @note The following style properties are occupied by animations and cannot be set via className:
   * - `opacity` - Animated for content show/hide transitions (idle: 0, open: 1, close: 0)
   * - `transform` (specifically `scale`, `translateX`, `translateY`) - Animated for content show/hide transitions (scale: idle: 0.95, open: 1, close: 0.95; translateX/translateY: based on placement)
   * - `transformOrigin` - Animated for content show/hide transitions (based on placement: 'top', 'bottom', 'left', 'right')
   *
   * To customize these properties, use the `animation` prop:
   * ```tsx
   * <Select.Content
   *   presentation="popover"
   *   animation={{
   *     opacity: { value: [0, 1, 0] },
   *     scale: { value: [0.95, 1, 0.95] },
   *     translateX: { value: [4, 0, 4] },
   *     translateY: { value: [4, 0, 4] },
   *     transformOrigin: { value: 'top' }
   *   }}
   * />
   * ```
   *
   * To completely disable animated styles and use your own via className or style prop, set `isAnimatedStyleActive={false}`.
   */
  className?: string;
  /**
   * The select content
   */
  children?: ReactNode;
  /**
   * Presentation mode for the select
   */
  presentation?: 'popover';
  /**
   * Animation configuration for content
   * - `false` or `"disabled"`: Disable all animations
   * - `true` or `undefined`: Use default animations
   * - `object`: Custom animation configuration
   */
  animation?: SelectContentPopoverAnimation;
  /**
   * Whether animated styles (react-native-reanimated) are active
   * When `false`, the animated style is removed and you can implement custom logic
   * This prop should only be used when you want to write custom styling logic instead of the default animated styles
   * @default true
   */
  isAnimatedStyleActive?: boolean;
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
   *
   * @note The `content` slot has the following animated properties that cannot be set via className:
   * - `opacity` - Animated for content show/hide transitions (idle: 0, open: 1, close: 0)
   * - `transform` (specifically `scale`) - Animated for content show/hide transitions (idle: 0.97, open: 1, close: 0.97)
   *
   * To customize these properties, use the `animation` prop:
   * ```tsx
   * <Select.Content
   *   presentation="dialog"
   *   classNames={{
   *     content: "custom-class", // opacity and scale cannot be overridden here
   *     wrapper: "custom-wrapper-class"
   *   }}
   *   animation={{
   *     opacity: { value: [0, 1, 0] },
   *     scale: { value: [0.97, 1, 0.97] }
   *   }}
   * />
   * ```
   *
   * To completely disable animated styles and use your own via className or style prop, set `isAnimatedStyleActive={false}`.
   */
  classNames?: ElementSlots<DialogContentFallbackSlots>;
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
   * - `true` or `undefined`: Use default animations
   * - `object`: Custom animation configuration
   */
  animation?: SelectContentAnimation;
  /**
   * Whether the dialog content can be swiped to dismiss
   * @default true
   */
  isSwipeable?: boolean;
  /**
   * Whether animated styles (react-native-reanimated) are active
   * When `false`, the animated style is removed and you can implement custom logic
   * This prop should only be used when you want to write custom styling logic instead of the default animated styles
   * @default true
   */
  isAnimatedStyleActive?: boolean;
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
