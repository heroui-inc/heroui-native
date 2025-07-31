import type { SurfaceRootProps } from '@/components/surface/surface.types';
import type {
  SlottableTextProps,
  SlottableViewProps,
} from '@/helpers/types/primitives';

/**
 * Props for the Card.Root component
 */
export interface CardRootProps extends Omit<SurfaceRootProps, 'variant'> {
  /**
   * Visual variant of the card surface
   * @default '1'
   */
  surfaceVariant?: SurfaceRootProps['variant'];
}

/**
 * Props for the Card.Details component
 */
export interface CardDetailsProps extends SlottableViewProps {
  /**
   * Children elements to be rendered inside the details container
   */
  children?: React.ReactNode;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Props for the Card.Header component
 */
export interface CardHeaderProps extends SlottableViewProps {
  /**
   * Children elements to be rendered inside the header
   */
  children?: React.ReactNode;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Props for the Card.Body component
 */
export interface CardBodyProps extends SlottableViewProps {
  /**
   * Children elements to be rendered inside the body
   */
  children?: React.ReactNode;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Props for the Card.Footer component
 */
export interface CardFooterProps extends SlottableViewProps {
  /**
   * Children elements to be rendered inside the footer
   */
  children?: React.ReactNode;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Props for the Card.Title component
 */
export interface CardTitleProps extends SlottableTextProps {
  /**
   * Children elements to be rendered as the title text
   */
  children?: React.ReactNode;
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Props for the Card.Description component
 */
export interface CardDescriptionProps extends SlottableTextProps {
  /**
   * Children elements to be rendered as the description text
   */
  children?: React.ReactNode;
  /**
   * Additional CSS classes
   */
  className?: string;
}
