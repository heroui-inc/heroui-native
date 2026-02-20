import type { SlottableViewProps, ViewRef } from '../../helpers/internal/types';

/**
 * Value type for slider - single number or array for range sliders
 */
type SliderValue = number | number[];

/**
 * Orientation of the slider
 */
type SliderOrientation = 'horizontal' | 'vertical';

/**
 * State object provided to render functions
 */
interface SliderState {
  /** Current slider value(s) by thumb index */
  values: number[];
  /** Returns the formatted string label for a given thumb index */
  getThumbValueLabel: (index: number) => string;
}

/**
 * Render props provided to children render functions on Track and Output
 */
interface SliderRenderProps {
  /** Current slider state with values and label helpers */
  state: SliderState;
  /** Orientation of the slider */
  orientation: SliderOrientation;
  /** Whether the slider is disabled */
  isDisabled: boolean;
}

/**
 * Context value provided by the primitive Root to all slider sub-components.
 * Contains all value-related state and business logic.
 */
interface SliderContextValue {
  /** Current slider values (one per thumb) */
  values: number[];
  /** Minimum value */
  minValue: number;
  /** Maximum value */
  maxValue: number;
  /** Step increment */
  step: number;
  /** Current orientation */
  orientation: SliderOrientation;
  /** Whether the slider is disabled */
  isDisabled: boolean;
  /** Number format options for labels */
  formatOptions?: Intl.NumberFormatOptions;
  /** Get the percentage position (0–1) for a given thumb index */
  getThumbPercent: (index: number) => number;
  /** Get the formatted label for a given thumb index */
  getThumbValueLabel: (index: number) => string;
  /**
   * Get the minimum allowed value for a thumb.
   * For range sliders the min is bounded by the previous thumb's value.
   */
  getThumbMinValue: (index: number) => number;
  /**
   * Get the maximum allowed value for a thumb.
   * For range sliders the max is bounded by the next thumb's value.
   */
  getThumbMaxValue: (index: number) => number;
  /** Update a thumb value by index */
  updateValue: (index: number, newValue: number) => void;
  /** Whether a given thumb is currently being dragged */
  isThumbDragging: (index: number) => boolean;
  /**
   * Set the dragging state of a thumb.
   * When dragging transitions `true → false`, `onChangeEnd` fires automatically
   * with the latest committed value.
   */
  setThumbDragging: (index: number, dragging: boolean) => void;
  /** Snaps the closest thumb to a target value (used for tap-to-position) */
  handleTapAtValue: (targetValue: number) => void;
  /** Track layout width (horizontal) or height (vertical) in pixels */
  trackSize: number;
  /** Set the track layout size after measurement */
  setTrackSize: (size: number) => void;
  /** Measured thumb size (main-axis dimension) in pixels, populated via onLayout */
  thumbSize: number;
  /** Set the thumb size after measurement */
  setThumbSize: (size: number) => void;
}

// ---------------------------------------------------------------------------
// Component props
// ---------------------------------------------------------------------------

/**
 * Props for the primitive Slider Root component.
 * Manages value state, provides context, and handles accessibility.
 */
interface RootProps extends Omit<SlottableViewProps, 'children'> {
  /** Children content */
  children?: React.ReactNode;

  /** Current slider value (controlled mode) */
  value?: SliderValue;

  /** Default slider value (uncontrolled mode) */
  defaultValue?: SliderValue;

  /** Callback fired when the slider value changes during interaction */
  onChange?: (value: SliderValue) => void;

  /** Callback fired when an interaction completes (drag end or tap) */
  onChangeEnd?: (value: SliderValue) => void;

  /**
   * Minimum value of the slider
   * @default 0
   */
  minValue?: number;

  /**
   * Maximum value of the slider
   * @default 100
   */
  maxValue?: number;

  /**
   * Step increment for the slider
   * @default 1
   */
  step?: number;

  /** Intl.NumberFormat options for value label formatting */
  formatOptions?: Intl.NumberFormatOptions;

  /**
   * Orientation of the slider
   * @default "horizontal"
   */
  orientation?: SliderOrientation;

  /**
   * Whether the slider is disabled
   * @default false
   */
  isDisabled?: boolean;
}

/**
 * Props for the primitive Slider Track component.
 * Supports render-function children that receive slider state.
 */
interface TrackProps extends Omit<SlottableViewProps, 'children'> {
  /** Children content or render function receiving slider state */
  children?: React.ReactNode | ((props: SliderRenderProps) => React.ReactNode);
}

/**
 * Props for the primitive Slider Fill component
 */
type FillProps = SlottableViewProps;

/**
 * Props for the primitive Slider Thumb component
 */
interface ThumbProps extends SlottableViewProps {
  /**
   * Index of this thumb within the slider (for range sliders)
   * @default 0
   */
  index?: number;
}

/**
 * Props for the primitive Slider Output component.
 * Supports render-function children that receive slider state.
 */
interface OutputProps extends Omit<SlottableViewProps, 'children'> {
  /** Children content or render function receiving slider state */
  children?: React.ReactNode | ((props: SliderRenderProps) => React.ReactNode);
}

// ---------------------------------------------------------------------------
// Ref types
// ---------------------------------------------------------------------------

type RootRef = ViewRef;
type TrackRef = ViewRef;
type FillRef = ViewRef;
type ThumbRef = ViewRef;
type OutputRef = ViewRef;

export type {
  FillProps,
  FillRef,
  OutputProps,
  OutputRef,
  RootProps,
  RootRef,
  SliderContextValue,
  SliderOrientation,
  SliderRenderProps,
  SliderState,
  SliderValue,
  ThumbProps,
  ThumbRef,
  TrackProps,
  TrackRef,
};
