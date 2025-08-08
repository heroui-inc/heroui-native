import type {
  BaseAnimationBuilder,
  EntryExitAnimationFunction,
  LayoutAnimationFunction,
  WithSpringConfig,
} from 'react-native-reanimated';
import type { TimingConfig } from '../../helpers/types';
import type {
  SlottableViewProps,
  ViewRef,
} from '../../helpers/types/primitives';
import type {
  ContentProps as PrimitiveContentProps,
  ItemProps as PrimitiveItemProps,
  RootProps as PrimitiveRootProps,
  TriggerProps as PrimitiveTriggerProps,
} from '../../primitives/accordion';
import type { ElementSlots } from '../../theme';
import type { RootSlots } from './accordion.styles';

/**
 * Variant types for the Accordion component
 */
export type AccordionVariant = 'default' | 'border';

/**
 * Props for the Accordion root component
 */
export type AccordionRootProps = PrimitiveRootProps & {
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
   * Whether to display a divider at the bottom of each accordion item
   * @default true
   */
  showDivider?: boolean;
  /**
   * Additional CSS classes for the container
   */
  className?: string;
  /**
   * Additional CSS classes for the slots
   */
  classNames?: ElementSlots<RootSlots>;
  /**
   * Custom layout animation for accordion transitions
   */
  layoutTransition?: LayoutAnimationFunction;
};

/**
 * Props for the Accordion.Item component
 */
export interface AccordionItemProps extends PrimitiveItemProps {
  /**
   * Children elements to be rendered inside the accordion item
   */
  children?: React.ReactNode;
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
  /**
   * Custom highlight color for press feedback
   */
  highlightColor?: string;
  /**
   * Custom highlight opacity for press feedback
   * @default 0.03
   */
  highlightOpacity?: number;
  /**
   * Custom timing config for highlight animation
   */
  highlightTimingConfig?: TimingConfig;
  /**
   * Whether to hide the highlight on press
   * @default false
   */
  hideHighlight?: boolean;
}

/**
 * Props for the Accordion.Indicator component
 */
export interface AccordionIndicatorProps extends SlottableViewProps {
  /**
   * Custom indicator content, if not provided defaults to animated chevron
   */
  children?: React.ReactNode;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Icon configuration
   */
  iconProps?: {
    /**
     * Size of the icon
     * @default 16
     */
    size?: number;
    /**
     * Stroke width of the icon
     * @default 2
     */
    strokeWidth?: number;
    /**
     * Color of the icon
     */
    color?: string;
  };
  /**
   * Animation configuration for the indicator rotation
   */
  animationConfig?: TimingConfig;
  /**
   * Spring configuration for indicator animation
   */
  springConfig?: WithSpringConfig;
}

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
   * Custom entering animation for content
   */
  entering?:
    | BaseAnimationBuilder
    | typeof BaseAnimationBuilder
    | EntryExitAnimationFunction;
  /**
   * Custom exiting animation for content
   */
  exiting?:
    | BaseAnimationBuilder
    | typeof BaseAnimationBuilder
    | EntryExitAnimationFunction;
}

/**
 * Context values shared between Accordion components (extends primitive context)
 */
export interface AccordionContextValue {
  /**
   * Visual variant of the accordion
   */
  variant: AccordionVariant;
  /**
   * Whether to show dividers between items
   */
  showDivider: boolean;
  /**
   * Custom layout animation for accordion transitions
   */
  layoutTransition?: LayoutAnimationFunction;
}

/**
 * Reference type for Accordion Indicator component
 */
export type AccordionIndicatorRef = ViewRef;
