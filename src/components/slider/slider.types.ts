import type { ViewProps, ViewStyle } from 'react-native';
import type { ElementSlots } from '../../helpers/internal/types/theme';
import type {
  RootProps as PrimitiveRootProps,
  SliderRenderProps,
} from '../../primitives/slider/slider.types';
import type { RootSlots } from './slider.styles';

/**
 * Props for the Slider root component.
 * Extends the primitive Root props with visual styling props.
 *
 * Value-related props (value, defaultValue, onChange, onChangeEnd, minValue,
 * maxValue, step, formatOptions, orientation, isDisabled, aria-label) are
 * inherited from the primitive and do not need to be redeclared.
 */
interface SliderProps extends Omit<PrimitiveRootProps, 'asChild'> {
  /**
   * Additional CSS classes for different parts of the component
   */
  classNames?: ElementSlots<RootSlots>;

  /**
   * Styles for different parts of the component
   */
  styles?: Partial<Record<RootSlots, ViewStyle>>;
}

/**
 * Props for the Slider.Output sub-component.
 * Displays the current slider value as formatted text.
 */
interface SliderOutputProps extends Omit<ViewProps, 'children'> {
  /**
   * Children content or render function receiving slider state
   */
  children?: React.ReactNode | ((props: SliderRenderProps) => React.ReactNode);

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Props for the Slider.Track sub-component.
 * Container for Fill and Thumb elements.
 */
interface SliderTrackProps extends Omit<ViewProps, 'children'> {
  /**
   * Children content or render function receiving slider state
   */
  children?: React.ReactNode | ((props: SliderRenderProps) => React.ReactNode);

  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Props for the Slider.Fill sub-component.
 * Visual representation of the selected range.
 */
interface SliderFillProps extends ViewProps {
  /**
   * Additional CSS classes
   */
  className?: string;
}

/**
 * Props for the Slider.Thumb sub-component.
 * Draggable thumb element within the track.
 */
interface SliderThumbProps extends ViewProps {
  /**
   * Index of this thumb within the slider (for range sliders)
   * @default 0
   */
  index?: number;

  /**
   * Whether this individual thumb is disabled
   */
  isDisabled?: boolean;

  /**
   * Additional CSS classes
   */
  className?: string;
}

export type {
  SliderFillProps,
  SliderOutputProps,
  SliderProps,
  SliderThumbProps,
  SliderTrackProps,
};
