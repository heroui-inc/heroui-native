import type { TimingConfig } from '@/helpers/types';
import type { SlottableViewProps, ViewRef } from '@/helpers/types/primitives';
import type {
  ContentProps as PrimitiveContentProps,
  ItemProps as PrimitiveItemProps,
  RootProps as PrimitiveRootProps,
  TriggerProps as PrimitiveTriggerProps,
} from '@/primitives/accordion';

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
  classNames?: {
    /**
     * Container slot class name
     */
    container?: string;
    /**
     * Divider slot class name
     */
    divider?: string;
  };
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
}

/**
 * Reference type for Accordion Indicator component
 */
export type AccordionIndicatorRef = ViewRef;
