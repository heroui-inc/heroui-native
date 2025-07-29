import { Easing, LinearTransition } from 'react-native-reanimated';

/**
 * Display names for Accordion components
 */
export const DISPLAY_NAME = {
  ROOT: 'HeroUINative.Accordion.Root',
  ITEM: 'HeroUINative.Accordion.Item',
  TRIGGER: 'HeroUINative.Accordion.Trigger',
  INDICATOR: 'HeroUINative.Accordion.Indicator',
  CONTENT: 'HeroUINative.Accordion.Content',
};

/**
 * Animation duration for accordion transitions in milliseconds
 */
export const ANIMATION_DURATION = 200;

/**
 * Animation easing function for smooth transitions
 */
export const ANIMATION_EASING = Easing.bezier(0.32, 0, 0.67, 0);

/**
 * Default layout transition for accordion animations
 */
export const ACCORDION_LAYOUT_TRANSITION = LinearTransition.springify()
  .damping(34)
  .stiffness(380);

/**
 * Highlight animation configuration
 */
export const HIGHLIGHT_CONFIG = {
  duration: 150,
  easing: Easing.out(Easing.quad),
};

/**
 * Default icon size for the indicator
 */
export const DEFAULT_ICON_SIZE = 16;

/**
 * Default icon stroke width
 */
export const DEFAULT_ICON_STROKE_WIDTH = 2;

/**
 * Rotation values for indicator animation
 */
export const INDICATOR_ROTATION = {
  COLLAPSED: '0deg',
  EXPANDED: '180deg',
};

/**
 * Spring configuration for indicator animation
 */
export const INDICATOR_SPRING_CONFIG = {
  damping: 28,
  stiffness: 260,
};
