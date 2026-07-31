import type { ViewProps } from 'react-native';
import type { ViewRef } from '../../helpers/internal/types';
import type * as ToastPrimitive from '../../primitives/toast';
import type {
  ToastComponentProps,
  ToastShowOptions,
} from '../../providers/toast/types';
import type {
  ButtonRootProps,
  ButtonRootPropsScaleHighlight,
} from '../button/button.types';
import type { ToastBaseConfig, ToastVariant } from './toast.base-types';

export type * from './toast.base-types';

/**
 * Props for the Toast.Background sub-component.
 * Generic absolute-fill container behind the toast surface. When no
 * `children` are given, the active library theme decides the default
 * content (e.g. a frosted-glass blur layer when the theme is `glass`).
 */
export type ToastBackgroundProps = ViewProps & {
  /** Additional CSS classes */
  className?: string;
};

/**
 * Props for the Toast.Root component
 */
export interface ToastRootProps
  extends ToastPrimitive.RootProps,
    ToastBaseConfig,
    Omit<ToastComponentProps, 'id'> {
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
   * Background layer rendered behind the toast surface.
   * - `undefined` (default): renders `Toast.Background`, whose content is
   *   decided by the active library theme
   * - custom node: replaces the default layer entirely (wrap content in
   *   `Toast.Background` to keep the absolute-fill and clipping)
   * - `null`: removes the background layer
   */
  background?: React.ReactNode;
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
