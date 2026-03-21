import type * as AlertPrimitiveTypes from '../../primitives/alert/alert.types';

/**
 * Props for the icon rendered inside the alert indicator.
 */
export interface AlertIconProps {
  /**
   * Icon size in pixels
   *
   * @default 20
   */
  size?: number;
  /**
   * Icon color as a CSS color string
   */
  color?: string;
}

/**
 * Props for the Alert root component.
 * Renders a styled alert container with status-based visual treatment.
 */
export interface AlertRootProps extends AlertPrimitiveTypes.RootProps {
  /**
   * Children elements to render inside the alert
   */
  children?: React.ReactNode;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Props for the Alert.Indicator component.
 * Renders a status icon by default when no children are provided.
 */
export interface AlertIndicatorProps
  extends AlertPrimitiveTypes.IndicatorProps {
  /**
   * Custom children to render instead of the default status icon
   */
  children?: React.ReactNode;
  /**
   * Additional CSS classes
   */
  className?: string;
  /**
   * Props passed to the default status icon (size and color overrides)
   */
  iconProps?: AlertIconProps;
}

/**
 * Props for the Alert.Content component.
 * Container for the title and description.
 */
export interface AlertContentProps extends AlertPrimitiveTypes.ContentProps {
  /**
   * Children elements (typically Alert.Title and Alert.Description)
   */
  children?: React.ReactNode;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Props for the Alert.Title component.
 * Renders the alert heading with status-based text color.
 */
export interface AlertTitleProps
  extends Omit<AlertPrimitiveTypes.TitleProps, 'asChild'> {
  /**
   * Title text content
   */
  children?: React.ReactNode;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Props for the Alert.Description component.
 * Renders the alert body text with muted styling.
 */
export interface AlertDescriptionProps
  extends Omit<AlertPrimitiveTypes.DescriptionProps, 'asChild'> {
  /**
   * Description text content
   */
  children?: React.ReactNode;
  /**
   * Additional CSS classes
   */
  className?: string;
}
