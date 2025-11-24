import type {
  BaseAnimationBuilder,
  EntryExitAnimationFunction,
  WithTimingConfig,
} from 'react-native-reanimated';
import type { ViewRef } from '../../helpers/types';
import type { Animation, AnimationValue } from '../../helpers/types/animation';
import type * as ToastPrimitive from '../../primitives/toast';
import type { ToastComponentProps } from '../../providers/toast';
import type { ButtonRootProps } from '../button';

/**
 * Toast variant types
 */
export type ToastVariant =
  | 'default'
  | 'accent'
  | 'success'
  | 'warning'
  | 'danger';

/**
 * Toast placement types
 */
export type ToastPlacement = 'top' | 'bottom';

/**
 * Type for entering/exiting animation configurations
 */
export type ToastEnteringExitingAnimation =
  | BaseAnimationBuilder
  | typeof BaseAnimationBuilder
  | EntryExitAnimationFunction;

/**
 * Animation configuration for toast root component
 */
export type ToastRootAnimation = Animation<{
  opacity?: AnimationValue<{
    /**
     * Opacity values [visible, hidden]
     * @default [1, 0]
     */
    value?: [number, number];
    /**
     * Animation timing configuration
     * @default { duration: 300 }
     */
    timingConfig?: WithTimingConfig;
  }>;
  translateY?: AnimationValue<{
    /**
     * Translate Y offset values [current, offset]
     * @default [0, 10] (multiplied by placement sign)
     */
    value?: [number, number];
    /**
     * Animation timing configuration
     * @default { duration: 300 }
     */
    timingConfig?: WithTimingConfig;
  }>;
  scale?: AnimationValue<{
    /**
     * Scale values [normal, scaled]
     * @default [1, 0.97]
     */
    value?: [number, number];
    /**
     * Animation timing configuration
     * @default { duration: 300 }
     */
    timingConfig?: WithTimingConfig;
  }>;
  entering?: AnimationValue<{
    /**
     * Custom entering animation for top placement
     * @default FadeInUp.springify().withInitialValues({ opacity: 1, transform: [{ translateY: -100 }] }).mass(3)
     */
    top?: ToastEnteringExitingAnimation;
    /**
     * Custom entering animation for bottom placement
     * @default FadeInDown.springify().withInitialValues({ opacity: 1, transform: [{ translateY: 100 }] }).mass(3)
     */
    bottom?: ToastEnteringExitingAnimation;
  }>;
  exiting?: AnimationValue<{
    /**
     * Custom exiting animation for top placement
     * @default Keyframe animation with translateY: -100, scale: 0.97, opacity: 0.5
     */
    top?: ToastEnteringExitingAnimation;
    /**
     * Custom exiting animation for bottom placement
     * @default Keyframe animation with translateY: 100, scale: 0.97, opacity: 0.5
     */
    bottom?: ToastEnteringExitingAnimation;
  }>;
}>;

/**
 * Props for the Toast.Root component
 */
export interface ToastRootProps
  extends Omit<ToastPrimitive.RootProps, 'id'>,
    ToastComponentProps {
  /**
   * Visual variant of the toast
   * @default 'default'
   */
  variant?: ToastVariant;
  /**
   * Placement of the toast
   * @default 'top'
   */
  placement?: ToastPlacement;
  /**
   * Additional CSS class for the toast container
   */
  className?: string;
  /**
   * Animation configuration for toast
   * - `false` or `"disabled"`: Disable only root animations
   * - `"disable-all"`: Disable all animations including children
   * - `true` or `undefined`: Use default animations
   * - `object`: Custom animation configuration
   */
  animation?: ToastRootAnimation;
}

/**
 * Props for the Toast.Label component
 */
export interface ToastLabelProps extends ToastPrimitive.LabelProps {
  /**
   * Content to be rendered as label
   */
  children?: React.ReactNode;
  /**
   * Additional CSS class for the label
   */
  className?: string;
}

/**
 * Props for the Toast.Description component
 */
export interface ToastDescriptionProps extends ToastPrimitive.DescriptionProps {
  /**
   * Content to be rendered as description
   */
  children?: React.ReactNode;
  /**
   * Additional CSS class for the description
   */
  className?: string;
}

/**
 * Props for the Toast.Action component
 */
export type ToastActionProps = ButtonRootProps;

/**
 * Props for the Toast.Close component
 */
export type ToastCloseProps = ButtonRootProps & {
  /**
   * Custom icon props for the close button icon
   */
  iconProps?: {
    size?: number;
    color?: string;
  };
};

/**
 * Context values shared between Toast components
 */
export interface ToastContextValue {
  /**
   * Visual variant of the toast
   */
  variant: ToastVariant;
}

/**
 * Ref type for the Toast.Root component
 */
export type ToastRootRef = ViewRef;
