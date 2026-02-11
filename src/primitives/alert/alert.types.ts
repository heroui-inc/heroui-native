import type {
  SlottableTextProps,
  SlottableViewProps,
  TextRef,
  ViewRef,
} from '../../helpers/internal/types';

/**
 * Context for the alert root component.
 * Provides unique identifier for accessibility labelling.
 */
type RootContext = {
  /** Unique identifier for the alert, used for aria-labelledby and aria-describedby */
  nativeID: string;
};

/**
 * Props for the Alert root component.
 * Extends SlottableViewProps to support the asChild pattern.
 *
 * @extends SlottableViewProps Inherits view props for slot-based composition
 */
type RootProps = SlottableViewProps & {
  /** Unique identifier for the alert. Auto-generated when not provided. */
  id?: string | number;
};

/**
 * Props for the Alert indicator component.
 * Visual indicator (e.g., icon, status dot) - decorative, hidden from assistive tech.
 *
 * @extends SlottableViewProps Inherits view props for slot-based composition
 */
type IndicatorProps = SlottableViewProps;

/**
 * Props for the Alert content wrapper component.
 * Container for title and description, provides layout structure.
 *
 * @extends SlottableViewProps Inherits view props for slot-based composition
 */
type ContentProps = SlottableViewProps;

/**
 * Props for the Alert title component.
 * Primary heading of the alert, used for aria-labelledby association.
 *
 * @extends SlottableTextProps Inherits text props for slot-based composition
 */
type TitleProps = SlottableTextProps;

/**
 * Props for the Alert description component.
 * Secondary text of the alert, used for aria-describedby association.
 *
 * @extends SlottableTextProps Inherits text props for slot-based composition
 */
type DescriptionProps = SlottableTextProps;

/** Reference type for the Alert root component */
type RootRef = ViewRef;
/** Reference type for the Alert indicator component */
type IndicatorRef = ViewRef;
/** Reference type for the Alert content component */
type ContentRef = ViewRef;
/** Reference type for the Alert title component */
type TitleRef = TextRef;
/** Reference type for the Alert description component */
type DescriptionRef = TextRef;

export type {
  ContentProps,
  ContentRef,
  DescriptionProps,
  DescriptionRef,
  IndicatorProps,
  IndicatorRef,
  RootContext,
  RootProps,
  RootRef,
  TitleProps,
  TitleRef,
};
