// Component export
export { default as Slider, useSlider } from './slider';

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
  SliderFillProps,
  SliderOutputProps,
  SliderProps,
  SliderThumbProps,
  SliderTrackProps,
} from './slider.types';
