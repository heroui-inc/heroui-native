import type BottomSheet from '@gorhom/bottom-sheet';
import type { BottomSheetViewProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetView/types';
import type { ReactNode } from 'react';
import type { TextProps } from 'react-native';
import type {
  WithSpringConfig,
  WithTimingConfig,
} from 'react-native-reanimated';
import type * as SelectPrimitivesTypes from '../../primitives/select/select.types';

/**
 * Ref type for the Select Trigger component
 */
export type SelectTriggerRef = SelectPrimitivesTypes.TriggerRef;

/**
 * Presentation mode for the select content
 */
export type SelectPresentation = 'popover' | 'bottom-sheet';

/**
 * Select placement options
 */
export type SelectPlacement = 'top' | 'bottom' | 'left' | 'right';

/**
 * Select alignment options
 */
export type SelectAlign = 'start' | 'center' | 'end';

/**
 * Select context value with presentation and placement
 */
export interface SelectContentContextValue {
  /**
   * Current placement of the select
   */
  placement?: SelectPlacement;
}

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
  extends SelectPrimitivesTypes.ContentProps {
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
  bottomSheetViewProps?: BottomSheetViewProps;
}

/**
 * Select Content component props
 */
export type SelectContentProps =
  | SelectContentPopoverProps
  | SelectContentBottomSheetProps;

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
   * @default theme.colors.foreground
   */
  color?: string;
}

/**
 * Select Title component props
 */
export interface SelectTitleProps extends TextProps {
  /**
   * Additional CSS class for the title
   */
  className?: string;
}

/**
 * Select Description component props
 */
export interface SelectDescriptionProps extends TextProps {
  /**
   * Additional CSS class for the description
   */
  className?: string;
}
