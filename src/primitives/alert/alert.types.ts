import type {
  SlottableTextProps,
  SlottableViewProps,
  TextRef,
  ViewRef,
} from '../../helpers/internal/types';

/**
 * Alert status type controlling the visual treatment and icon displayed.
 */
export type AlertStatus =
  | 'default'
  | 'accent'
  | 'success'
  | 'warning'
  | 'danger';

/**
 * Context for the alert root component.
 * Provides unique identifier for accessibility labelling and the current status.
 */
export type RootContext = {
  /** Unique identifier for the alert, used for aria-labelledby and aria-describedby */
  nativeID: string;
  /** Current alert status for sub-component styling */
  status: AlertStatus;
};

/**
 * Props for the Alert root component.
 * Extends SlottableViewProps to support the asChild pattern.
 *
 * @extends SlottableViewProps Inherits view props for slot-based composition
 */
export type RootProps = SlottableViewProps & {
  /** Unique identifier for the alert. Auto-generated when not provided. */
  id?: string | number;
  /**
   * The status of the alert, controlling its icon and color treatment.
   *
   * @default "default"
   */
  status?: AlertStatus;
};

/**
 * Props for the Alert indicator component.
 * Visual indicator (e.g., icon, status dot) - decorative, hidden from assistive tech.
 *
 * @extends SlottableViewProps Inherits view props for slot-based composition
 */
export type IndicatorProps = SlottableViewProps;

/**
 * Props for the Alert content wrapper component.
 * Container for title and description, provides layout structure.
 *
 * @extends SlottableViewProps Inherits view props for slot-based composition
 */
export type ContentProps = SlottableViewProps;

/**
 * Props for the Alert title component.
 * Primary heading of the alert, used for aria-labelledby association.
 *
 * @extends SlottableTextProps Inherits text props for slot-based composition
 */
export type TitleProps = SlottableTextProps;

/**
 * Props for the Alert description component.
 * Secondary text of the alert, used for aria-describedby association.
 *
 * @extends SlottableTextProps Inherits text props for slot-based composition
 */
export type DescriptionProps = SlottableTextProps;

/** Reference type for the Alert root component */
export type RootRef = ViewRef;
/** Reference type for the Alert indicator component */
export type IndicatorRef = ViewRef;
/** Reference type for the Alert content component */
export type ContentRef = ViewRef;
/** Reference type for the Alert title component */
export type TitleRef = TextRef;
/** Reference type for the Alert description component */
export type DescriptionRef = TextRef;
