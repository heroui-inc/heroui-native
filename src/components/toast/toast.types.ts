import type {
  EntryOrExitLayoutType,
  WithTimingConfig,
} from 'react-native-reanimated';
import type {
  AnimationRoot,
  AnimationValue,
  ViewRef,
} from '../../helpers/internal/types';
import type * as ToastPrimitive from '../../primitives/toast';
import type {
  ToastComponentProps,
  ToastShowOptions,
} from '../../providers/toast';
import type { ButtonRootProps } from '../button';
import type { ButtonRootPropsScaleHighlight } from '../button/button.types';

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
 * Animation configuration for toast root component
 */
export type ToastRootAnimation = AnimationRoot<{
  opacity?: AnimationValue<{
    /**
     * Opacity interpolation values [start, end]
     * Controls how fast toast items fade out as they move beyond the visible stack limits.
     * When toasts are pushed out of view (beyond the last few visible items), their opacity
     * gradually decreases to create a smooth disappearing effect.
     * - First value: fully visible opacity (1) for items within visible stack
     * - Second value: hidden opacity (0) for items pushed out of view
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
     * Translate Y interpolation values [start, end]
     * Controls how much of a toast item is visible when it's positioned behind the last visible toast.
     * This creates a "peek" effect where stacked toasts are slightly offset vertically,
     * allowing users to see a portion of the toast behind the current one.
     * - First value: no offset (0) for the last/active toast
     * - Second value: vertical offset in pixels (10) for toasts behind the last one
     * Note: The offset direction is automatically adjusted based on placement (top/bottom)
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
     * Scale interpolation values [start, end]
     * Controls the size scaling of toast items in the stack.
     * Toasts behind the active one are slightly scaled down to create depth and visual hierarchy.
     * - First value: normal scale (1) for the active/last toast
     * - Second value: scaled down value (0.97) for toasts positioned behind
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
    top?: EntryOrExitLayoutType;
    /**
     * Custom entering animation for bottom placement
     * @default FadeInDown.springify().withInitialValues({ opacity: 1, transform: [{ translateY: 100 }] }).mass(3)
     */
    bottom?: EntryOrExitLayoutType;
  }>;
  exiting?: AnimationValue<{
    /**
     * Custom exiting animation for top placement
     * @default Keyframe animation with translateY: -100, scale: 0.97, opacity: 0.5
     */
    top?: EntryOrExitLayoutType;
    /**
     * Custom exiting animation for bottom placement
     * @default Keyframe animation with translateY: 100, scale: 0.97, opacity: 0.5
     */
    bottom?: EntryOrExitLayoutType;
  }>;
}>;

/**
 * Props for the Toast.Root component
 */
export interface ToastRootProps
  extends ToastPrimitive.RootProps,
    Omit<ToastComponentProps, 'id'> {
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
   *
   * @note The following style properties are occupied by animations and cannot be set via className:
   * - `opacity` - Animated for visibility transitions when toasts are pushed beyond visible stack limits
   * - `transform` (translateY) - Animated for vertical position transitions when toasts are stacked, and for swipe-to-dismiss gestures
   * - `transform` (scale) - Animated for size scaling transitions when toasts are stacked (toasts behind active one are scaled down)
   * - `height` - Animated for height transitions when toast content changes
   *
   * To customize these properties, use the `animation` prop:
   * ```tsx
   * <Toast.Root
   *   animation={{
   *     opacity: {
   *       value: [1, 0],
   *       timingConfig: { duration: 300 }
   *     },
   *     translateY: {
   *       value: [0, 10],
   *       timingConfig: { duration: 300 }
   *     },
   *     scale: {
   *       value: [1, 0.97],
   *       timingConfig: { duration: 300 }
   *     }
   *   }}
   * />
   * ```
   *
   * To completely disable animated styles and use your own via className or style prop, set `isAnimatedStyleActive={false}`.
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
  /**
   * Whether the toast can be swiped to dismiss and dragged with rubber effect
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
 * Props for the Toast.Title component
 */
export interface ToastTitleProps extends ToastPrimitive.TitleProps {
  /**
   * Content to be rendered as title
   */
  children?: React.ReactNode;
  /**
   * Additional CSS class for the title
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
export type ToastActionProps = Omit<
  ButtonRootPropsScaleHighlight,
  'feedbackVariant'
>;

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
  /**
   * Function to hide the toast
   */
  hide?: (ids?: string | string[] | 'all') => void;
  /**
   * ID of the toast
   */
  id?: string;
}

/**
 * Ref type for the Toast.Root component
 */
export type ToastRootRef = ViewRef;

/**
 * Props for useToastRootAnimation hook
 * Picks required properties from ToastRootProps and adds id from ToastComponentProps
 */
export type UseToastRootAnimationOptions = Pick<
  ToastRootProps,
  | 'animation'
  | 'index'
  | 'total'
  | 'heights'
  | 'placement'
  | 'hide'
  | 'isSwipeable'
  | 'maxVisibleToasts'
> &
  Pick<ToastComponentProps, 'id'>;

/**
 * Props for the DefaultToast component
 * Used internally when showing toasts with string or config object (without component)
 */
export interface DefaultToastProps extends ToastComponentProps {
  /**
   * Visual variant of the toast
   * @default 'default'
   */
  variant?: ToastRootProps['variant'];
  /**
   * Placement of the toast
   * @default 'top'
   */
  placement?: ToastRootProps['placement'];
  /**
   * Animation configuration for toast
   */
  animation?: ToastRootProps['animation'];
  /**
   * Whether the toast can be swiped to dismiss and dragged with rubber effect
   */
  isSwipeable?: ToastRootProps['isSwipeable'];
  /**
   * Label text for the toast
   */
  label?: string;
  /**
   * Description text for the toast
   */
  description?: string;
  /**
   * Action button label text
   */
  actionLabel?: string;
  /**
   * Callback function called when the action button is pressed
   * Receives show and hide functions for programmatic toast control
   */
  onActionPress?: (helpers: {
    show: (options: string | ToastShowOptions) => string;
    hide: (ids?: string | string[] | 'all') => void;
  }) => void;
  /**
   * Icon element to display in the toast
   */
  icon?: React.ReactNode;
}
