import type {
  AnimatedProps,
  BaseAnimationBuilder,
  EntryExitAnimationFunction,
  LayoutAnimationFunction,
  WithSpringConfig,
  WithTimingConfig,
} from 'react-native-reanimated';
import type { ElementSlots } from '../../helpers/theme/types';
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
 * Props for the Accordion root component
 */
export type AccordionRootProps = AnimatedProps<PrimitiveRootProps> & {
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
  isDividerVisible?: boolean;
  /**
   * Additional CSS classes for the container
   */
  className?: string;
  /**
   * Additional CSS classes for the slots
   */
  classNames?: ElementSlots<RootSlots>;
};

/**
 * Props for the Accordion.Item component
 */
export interface AccordionItemProps extends AnimatedProps<PrimitiveItemProps> {
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
   * @default 0.5
   */
  highlightOpacity?: number;
  /**
   * Custom timing config for highlight animation
   */
  highlightTimingConfig?: WithTimingConfig;
  /**
   * Whether to show the highlight on press
   * @default true
   */
  isHighlightVisible?: boolean;
}

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
   */
  className?: string;
  /**
   * Icon configuration
   */
  iconProps?: AccordionIndicatorIconProps;
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
  isDividerVisible: boolean;
  /**
   * Custom layout animation for accordion transitions
   */
  layoutTransition?:
    | BaseAnimationBuilder
    | LayoutAnimationFunction
    | typeof BaseAnimationBuilder;
}
