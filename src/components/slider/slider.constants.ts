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
 * Thumb diameter in pixels
 */
export const THUMB_SIZE = 20;

/**
 * Track cross-axis thickness in pixels (height for horizontal, width for vertical)
 */
export const TRACK_HEIGHT = 20;

/**
 * Extra hit-slop around the thumb to improve touch target
 */
export const THUMB_HIT_SLOP = 10;

/**
 * Spring animation configuration for thumb scale feedback
 */
export const THUMB_SPRING_CONFIG = {
  damping: 15,
  stiffness: 200,
  mass: 0.5,
};
