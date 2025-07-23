import type { SlottableViewProps, ViewRef } from '@/helpers/types';

/**
 * Props for the activity indicator root component.
 *
 * @extends SlottableViewProps Inherits view props
 */
export interface RootProps extends SlottableViewProps {
  /** Whether the activity indicator is loading */
  loading?: boolean;
}

/** Reference type for the activity indicator root component */
export type RootRef = ViewRef;

/**
 * Props for the activity indicator indicator component.
 *
 * @extends SlottableViewProps Inherits view props
 */
export interface IndicatorProps extends SlottableViewProps {}

/** Reference type for the activity indicator indicator component */
export type IndicatorRef = ViewRef;
