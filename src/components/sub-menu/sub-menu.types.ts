import type { ReactNode } from 'react';
import type { ViewProps } from 'react-native';
import type { SharedValue, WithSpringConfig } from 'react-native-reanimated';
import type {
  Animation,
  AnimationRoot,
  AnimationValue,
} from '../../helpers/internal/types';
import type * as SubMenuPrimitivesTypes from '../../primitives/sub-menu/sub-menu.types';

/**
 * Animation configuration for SubMenu root content container.
 * Controls expand/collapse margins, padding, and spring.
 */
export type SubMenuRootAnimation = AnimationRoot<{
  rootContent?: AnimationValue<{
    /**
     * Margin horizontal when submenu is open (target value)
     * @default -16
     */
    marginHorizontal?: number;
    /**
     * Margin vertical when submenu is open (target value)
     * @default -16
     */
    marginVertical?: number;
    /**
     * Padding horizontal when submenu is open (target value)
     * @default 6
     */
    paddingHorizontal?: number;
    /**
     * Padding top when submenu is open (target value)
     * @default 12
     */
    paddingTop?: number;
    /**
     * Spring configuration for expand/collapse animation
     * @default { damping: 100, stiffness: 950, mass: 3 }
     */
    springConfig?: WithSpringConfig;
  }>;
}>;

/**
 * Props for the SubMenu Root component.
 * Wraps the primitive root with animation settings context.
 */
export interface SubMenuRootProps extends SubMenuPrimitivesTypes.RootProps {
  /** The sub-menu content (trigger, content, and other menu items) */
  children?: ReactNode;
  /** Additional CSS class for the root container */
  className?: string;
  /**
   * Animation configuration for the SubMenu.
   * - `false` or `"disabled"`: Disable only root animations
   * - `"disable-all"`: Disable all animations including children
   * - `true` or `undefined`: Use default animations
   * - `object`: Custom animation configuration
   */
  animation?: SubMenuRootAnimation;
}

/**
 * Props for the SubMenu Trigger component.
 * Renders as a styled menu item with a chevron indicator.
 */
export interface SubMenuTriggerProps
  extends SubMenuPrimitivesTypes.TriggerProps {
  /** Additional CSS class for the trigger */
  className?: string;
  /** The trigger content (title, icons, etc.) */
  children?: ReactNode;
}

/**
 * Icon configuration for the SubMenu trigger indicator
 */
export interface SubMenuTriggerIndicatorIconProps {
  /**
   * Size of the icon
   * @default 14
   */
  size?: number;
  /**
   * Color of the icon
   * @default muted
   */
  color?: string;
}

/**
 * Animation configuration for the SubMenu trigger indicator.
 * Controls rotation when the submenu opens/closes.
 *
 * - `true` or `undefined`: Use default animations
 * - `false` or `"disabled"`: Disable all animations
 * - `object`: Custom animation configuration
 */
export type SubMenuTriggerIndicatorAnimation = Animation<{
  rotation?: AnimationValue<{
    /**
     * Rotation values [collapsed, expanded] in degrees
     * @default [0, 90]
     */
    value?: [number, number];
    /**
     * Spring animation configuration for rotation
     * @default { damping: 140, stiffness: 1000, mass: 4 }
     */
    springConfig?: WithSpringConfig;
  }>;
}>;

/**
 * Props for the SubMenu.TriggerIndicator component.
 * Renders an animated indicator (default: chevron-right icon)
 * that rotates when the submenu opens/closes.
 */
export interface SubMenuTriggerIndicatorProps extends ViewProps {
  /**
   * Custom indicator content. When provided, replaces the default chevron icon.
   */
  children?: ReactNode;
  /**
   * Additional CSS classes
   *
   * @note The following style properties are occupied by animations and cannot be set via className:
   * - `transform` (specifically `rotate`) - Animated for open/close rotation transitions
   *
   * To completely disable animated styles and use your own via className or style prop,
   * set `isAnimatedStyleActive={false}`.
   */
  className?: string;
  /**
   * Icon configuration for the default chevron
   */
  iconProps?: SubMenuTriggerIndicatorIconProps;
  /**
   * Animation configuration for indicator
   * - `false` or `"disabled"`: Disable all animations
   * - `true` or `undefined`: Use default animations
   * - `object`: Custom animation configuration
   */
  animation?: SubMenuTriggerIndicatorAnimation;
  /**
   * Whether animated styles (react-native-reanimated) are active.
   * When `false`, the animated style is removed and you can implement custom logic.
   * @default true
   */
  isAnimatedStyleActive?: boolean;
}

/**
 * Props for the SubMenu Content component.
 * Renders inline content when the submenu is open.
 */
export interface SubMenuContentProps
  extends Omit<SubMenuPrimitivesTypes.ContentProps, 'forceMount'> {
  /** Additional CSS class for the content container */
  className?: string;
  /** The submenu items */
  children?: ReactNode;
}

/**
 * Context value for sub-menu animation.
 * Holds shared values for trigger/content measured heights.
 */
export interface SubMenuAnimationContextValue {
  /** Measured height of the trigger element (pixels) */
  triggerHeight: SharedValue<number>;
  /** Measured height of the content element (pixels) */
  contentHeight: SharedValue<number>;
  /** Padding top of the content element (pixels) */
  contentPaddingTop: SharedValue<number>;
}

export type {
  ISubMenuContext,
  ContentRef as SubMenuContentRef,
  RootRef as SubMenuRootRef,
  TriggerRef as SubMenuTriggerRef,
} from '../../primitives/sub-menu/sub-menu.types';
