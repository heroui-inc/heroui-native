// Component export
export { default as Slider, useSliderContext, useSliderStyle } from './slider';

// ClassNames export for external reuse
export { sliderClassNames } from './slider.styles';

// Re-export primitive context and value types for consumer convenience
export type {
  SliderContextValue,
  SliderOrientation,
  SliderRenderProps,
  SliderState,
  SliderValue,
} from '../../primitives/slider/slider.types';

// Component-level type exports
export type {
  SliderColor,
  SliderFillProps,
  SliderOutputProps,
  SliderProps,
  SliderSize,
  SliderStyleContextValue,
  SliderThumbProps,
  SliderTrackProps,
} from './slider.types';
