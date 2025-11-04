import type BottomSheet from '@gorhom/bottom-sheet';
import type { BottomSheetViewProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetView/types';
import type { ReactNode } from 'react';
import type { TextProps } from 'react-native';
import type {
  WithSpringConfig,
  WithTimingConfig,
} from 'react-native-reanimated';
import type { ElementSlots } from '../../helpers/theme/types';
import type * as SelectPrimitivesTypes from '../../primitives/select/select.types';
import type { DialogContentFallbackSlots } from './select.styles';

/**
 * Ref type for the Select Trigger component
 */
export type SelectTriggerRef = SelectPrimitivesTypes.TriggerRef;

/**
 * Presentation mode for the select content
 */
export type SelectPresentation = 'popover' | 'bottom-sheet' | 'dialog';

/**
 * Select placement options
 */
export type SelectPlacement = 'top' | 'bottom' | 'left' | 'right';

/**
 * Select alignment options
 */
export type SelectAlign = 'start' | 'center' | 'end';

/**
 * Spring animation configuration
 */
interface SpringAnimationConfig {
  animationType: 'spring';
  animationConfig?: WithSpringConfig;
}

/**
 * Timing animation configuration
 */
interface TimingAnimationConfig {
  animationType: 'timing';
  animationConfig?: WithTimingConfig;
}

/**
 * Progress animation configuration for select transitions
 */
export interface SelectProgressAnimationConfigs {
  /**
   * Animation configuration for opening
   */
  onOpen?: SpringAnimationConfig | TimingAnimationConfig;
  /**
   * Animation configuration for closing
   */
  onClose?: SpringAnimationConfig | TimingAnimationConfig;
}

/**
 * Select Root component props
 */
export interface SelectRootProps extends SelectPrimitivesTypes.RootProps {
  /**
   * The content of the select
   */
  children?: ReactNode;
  /**
   * Whether the select is open
   */
  isOpen?: boolean;
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
  /**
   * Animation configurations for open/close progress animations
   */
  progressAnimationConfigs?: SelectProgressAnimationConfigs;
}

/**
 * Select Overlay component props
 */
export interface SelectOverlayProps extends SelectPrimitivesTypes.OverlayProps {
  /**
   * Additional CSS class for the overlay
   */
  className?: string;
  /**
   * Whether to disable the default opacity animation
   * Use this when you want to animate opacity using your own Reanimated useAnimatedStyle
   * @default false
   */
  isDefaultAnimationDisabled?: boolean;
}

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
  presentation?: 'popover';
  /**
   * Whether to disable the default animations (opacity, scale, translate)
   * Use this when you want to animate these properties using your own Reanimated useAnimatedStyle
   * @default false
   */
  isDefaultAnimationDisabled?: boolean;
}

/**
 * Select Content props for 'bottom-sheet' presentation
 */
export interface SelectContentBottomSheetProps
  extends Partial<React.ComponentProps<typeof BottomSheet>> {
  /**
   * Presentation mode for the select
   */
  presentation: 'bottom-sheet';
  /**
   * Additional CSS class for the bottom sheet view
   */
  bottomSheetViewClassName?: string;
  /**
   * Props for the bottom sheet view
   */
  bottomSheetViewProps?: Omit<BottomSheetViewProps, 'children'>;
}

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
   * The select content
   */
  children?: ReactNode;
  /**
   * Presentation mode for the select
   */
  presentation: 'dialog';
  /**
   * Whether to disable the default animations (opacity, scale, translate)
   * Use this when you want to animate these properties using your own Reanimated useAnimatedStyle
   * @default false
   */
  isDefaultAnimationDisabled?: boolean;
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
 */
export interface SelectCloseProps extends SelectPrimitivesTypes.CloseProps {
  /**
   * Additional CSS class for the close button
   */
  className?: string;
  /**
   * The close button content
   */
  children?: ReactNode;
  /**
   * Close icon props
   */
  iconProps?: SelectCloseIconProps;
}

/**
 * Close icon props
 */
export interface SelectCloseIconProps {
  /**
   * Size of the close icon
   * @default 18
   */
  size?: number;
  /**
   * Color of the close icon
   * @default --colors-foreground
   */
  color?: string;
}

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
 * Select Item component props
 */
export interface SelectItemProps extends SelectPrimitivesTypes.ItemProps {
  /**
   * Additional CSS class for the item
   */
  className?: string;
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
