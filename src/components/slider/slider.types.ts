import type {
  FillProps as PrimitiveFillProps,
  OutputProps as PrimitiveOutputProps,
  RootProps as PrimitiveRootProps,
  ThumbProps as PrimitiveThumbProps,
  TrackProps as PrimitiveTrackProps,
} from '../../primitives/slider/slider.types';

/**
 * Props for the Slider root component.
 * Extends the primitive Root props with visual styling.
 *
 * Value-related props (value, defaultValue, onChange, onChangeEnd, minValue,
 * maxValue, step, formatOptions, orientation, isDisabled, aria-label) are
 * inherited from the primitive and do not need to be redeclared.
 */
interface SliderProps extends PrimitiveRootProps {
  /** Additional CSS classes */
  className?: string;
}

/**
 * Props for the Slider.Output sub-component.
 * Displays the current slider value as formatted text.
 */
interface SliderOutputProps extends PrimitiveOutputProps {
  /** Additional CSS classes */
  className?: string;
}

/**
 * Props for the Slider.Track sub-component.
 * Container for Fill and Thumb elements.
 */
interface SliderTrackProps extends PrimitiveTrackProps {
  /** Additional CSS classes */
  className?: string;
}

/**
 * Props for the Slider.Fill sub-component.
 * Visual representation of the selected range.
 */
interface SliderFillProps extends PrimitiveFillProps {
  /** Additional CSS classes */
  className?: string;
}

/**
 * Props for the Slider.Thumb sub-component.
 * Draggable thumb element within the track.
 */
interface SliderThumbProps extends PrimitiveThumbProps {
  /**
   * Whether this individual thumb is disabled
   */
  isDisabled?: boolean;

  /** Additional CSS classes */
  className?: string;
}

export type {
  SliderFillProps,
  SliderOutputProps,
  SliderProps,
  SliderThumbProps,
  SliderTrackProps,
};
