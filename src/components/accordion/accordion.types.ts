import type { ViewStyle } from 'react-native';
import type {
  AnimatedProps,
  EntryOrExitLayoutType,
  WithSpringConfig,
} from 'react-native-reanimated';
import type {
  Animation,
  AnimationRoot,
  AnimationValue,
  ElementSlots,
  LayoutTransition,
} from '../../helpers/internal/types';
import type {
  ContentProps as PrimitiveContentProps,
  IndicatorProps as PrimitiveIndicatorProps,
  ItemProps as PrimitiveItemProps,
  RootProps as PrimitiveRootProps,
  TriggerProps as PrimitiveTriggerProps,
} from '../../primitives/accordion';
import type { RootSlots } from './accordion.styles';

/**
 * Variant types for the Accordion component
 */
export type AccordionVariant = 'default' | 'surface';

/**
 * Icon props for the Accordion.Indicator component
 */
export interface AccordionIndicatorIconProps {
  /**
   * Size of the icon
   * @default 16
   */
  size?: number;
  /**
   * Color of the icon
   * @default foreground
   */
  color?: string;
}

/**
 * Animation configuration for accordion root component
 */
export type AccordionRootAnimation = AnimationRoot<{
  layout?: AnimationValue<{
    /**
     * Custom layout animation for accordion transitions
     * @default LinearTransition.springify().damping(140).stiffness(1600).mass(4)
     */
    value?: LayoutTransition;
  }>;
}>;

/**
 * Props for the Accordion root component
 */
export type AccordionRootProps = Omit<
  AnimatedProps<PrimitiveRootProps>,
  'layout'
> & {
  /**
   * Children elements to be rendered inside the accordion
   */
  children?: React.ReactNode;
  /**
   * Visual variant of the accordion
   * @default 'default'
   */
  variant?: AccordionVariant;
  /**
   * Whether to hide the separator between accordion items
   * @default false
   */
  hideSeparator?: boolean;
  /**
   * Additional CSS classes for the container
   */
  className?: string;
  /**
   * Additional CSS classes for the slots
   */
  classNames?: ElementSlots<RootSlots>;
  /**
   * Styles for different parts of the accordion root
   */
  styles?: Partial<Record<RootSlots, ViewStyle>>;
  /**
   * Animation configuration for accordion
   * - `false` or `"disabled"`: Disable only root animations
   * - `"disable-all"`: Disable all animations including children
   * - `true` or `undefined`: Use default animations
   * - `object`: Custom animation configuration
   */
  animation?: AccordionRootAnimation;
};

/**
 * Render function props for accordion item children
 */
export type AccordionItemRenderProps = {
  /**
   * Whether the accordion item is currently expanded
   */
  isExpanded: boolean;
  /**
   * Unique value identifier for this accordion item
   */
  value: string;
};

/**
 * Props for the Accordion.Item component
 */
export interface AccordionItemProps
  extends Omit<AnimatedProps<PrimitiveItemProps>, 'children'> {
  /**
   * Children elements to be rendered inside the accordion item, or a render function
   */
  children?:
    | React.ReactNode
    | ((props: AccordionItemRenderProps) => React.ReactNode);
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Props for the Accordion.Trigger component
 */
export interface AccordionTriggerProps extends PrimitiveTriggerProps {
  /**
   * Children elements to be rendered inside the trigger
   */
  children?: React.ReactNode;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Animation configuration for accordion indicator component
 */
export type AccordionIndicatorAnimation = Animation<{
  rotation?: AnimationValue<{
    /**
     * Rotation values [collapsed, expanded] in degrees
     * @default [0, -180]
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
 * Props for the Accordion.Indicator component
 */
export interface AccordionIndicatorProps
  extends AnimatedProps<PrimitiveIndicatorProps> {
  /**
   * Custom indicator content, if not provided defaults to animated chevron
   */
  children?: React.ReactNode;
  /**
   * Additional CSS classes
   *
   * @note The following style properties are occupied by animations and cannot be set via className:
   * - `transform` (specifically `rotate`) - Animated for expand/collapse rotation transitions
   *
   * To customize this property, use the `animation` prop:
   * ```tsx
   * <Accordion.Indicator
   *   animation={{
   *     rotation: { value: [0, -180], springConfig: { damping: 140, stiffness: 1000, mass: 4 } }
   *   }}
   * />
   * ```
   *
   * To completely disable animated styles and use your own via className or style prop, set `isAnimatedStyleActive={false}`.
   */
  className?: string;
  /**
   * Icon configuration
   */
  iconProps?: AccordionIndicatorIconProps;
  /**
   * Animation configuration for indicator
   * - `false` or `"disabled"`: Disable all animations
   * - `true` or `undefined`: Use default animations
   * - `object`: Custom animation configuration
   */
  animation?: AccordionIndicatorAnimation;
  /**
   * Whether animated styles (react-native-reanimated) are active
   * When `false`, the animated style is removed and you can implement custom logic
   * This prop should only be used when you want to write custom styling logic instead of the default animated styles
   * @default true
   */
  isAnimatedStyleActive?: boolean;
}

/**
 * Animation configuration for accordion content component
 */
export type AccordionContentAnimation = Animation<{
  entering?: AnimationValue<{
    /**
     * Custom entering animation for content
     */
    value?: EntryOrExitLayoutType;
  }>;
  exiting?: AnimationValue<{
    /**
     * Custom exiting animation for content
     */
    value?: EntryOrExitLayoutType;
  }>;
}>;

/**
 * Props for the Accordion.Content component
 */
export interface AccordionContentProps extends PrimitiveContentProps {
  /**
   * Children elements to be rendered inside the content
   */
  children?: React.ReactNode;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Animation configuration for content
   * - `false` or `"disabled"`: Disable all animations
   * - `true` or `undefined`: Use default animations
   * - `object`: Custom animation configuration
   */
  animation?: AccordionContentAnimation;
}

/**
 * Context values shared between Accordion components (extends primitive context)
 */
export interface AccordionContextValue {
  /**
   * Visual variant of the accordion
   */
  variant: AccordionVariant;
}

/**
 * Context value for accordion animation state
 */
export interface AccordionAnimationContextValue {
  /**
   * Custom layout animation for accordion transitions
   */
  layoutTransition?: LayoutTransition;
}
