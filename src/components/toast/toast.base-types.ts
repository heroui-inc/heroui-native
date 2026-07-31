import type {
  EntryOrExitLayoutType,
  WithTimingConfig,
} from 'react-native-reanimated';
import type {
  AnimationRoot,
  AnimationValue,
} from '../../helpers/internal/types';

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
 * Presentation options shared by `Toast.Root`, the provider's global
 * `defaultProps` and the `toast.show()` config.
 *
 * Declared in this leaf module so `providers/toast/types` can consume it
 * without importing `toast.types`, which itself depends on the provider types.
 */
export interface ToastBaseConfig {
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
   * Whether the toast can be swiped to dismiss and dragged with rubber effect
   * @default true
   */
  isSwipeable?: boolean;
  /**
   * Animation configuration for toast
   * - `false` or `"disabled"`: Disable only root animations
   * - `"disable-all"`: Disable all animations including children
   * - `true` or `undefined`: Use default animations
   * - `object`: Custom animation configuration
   */
  animation?: ToastRootAnimation;
}
