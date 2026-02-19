import type { SliderSize } from './slider.types';

/**
 * Display names for Slider components
 */
export const DISPLAY_NAME = {
  ROOT: 'HeroUI.Slider.Root',
  OUTPUT: 'HeroUI.Slider.Output',
  TRACK: 'HeroUI.Slider.Track',
  FILL: 'HeroUI.Slider.Fill',
  THUMB: 'HeroUI.Slider.Thumb',
};

/**
 * Thumb size mappings by slider size variant (diameter in pixels)
 */
export const THUMB_SIZE_MAP: Record<SliderSize, number> = {
  sm: 16,
  md: 20,
  lg: 24,
};

/**
 * Track height mappings by slider size variant (height in pixels for horizontal)
 */
export const TRACK_HEIGHT_MAP: Record<SliderSize, number> = {
  sm: 4,
  md: 6,
  lg: 8,
};

/**
 * Hit slop for the thumb to improve touch target
 */
export const THUMB_HIT_SLOP_MAP: Record<SliderSize, number> = {
  sm: 12,
  md: 10,
  lg: 8,
};

/**
 * Spring animation configuration for thumb scale feedback
 */
export const THUMB_SPRING_CONFIG = {
  damping: 15,
  stiffness: 200,
  mass: 0.5,
};
