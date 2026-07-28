/**
 * Display names for the SubMenu components
 */
export const DISPLAY_NAME = {
  ROOT: 'HeroUINative.SubMenu.Root',
  BACKGROUND: 'HeroUINative.SubMenu.Background',
  TRIGGER: 'HeroUINative.SubMenu.Trigger',
  TRIGGER_INDICATOR: 'HeroUINative.SubMenu.TriggerIndicator',
  CONTENT: 'HeroUINative.SubMenu.Content',
};

/** Default icon size for the trigger indicator chevron */
export const DEFAULT_INDICATOR_ICON_SIZE = 16;

/** Spring configuration for indicator rotation animation */
export const INDICATOR_SPRING_CONFIG = {
  damping: 140,
  stiffness: 1000,
  mass: 4,
};

/** Default padding above submenu content when expanded */
export const DEFAULT_ROOT_CONTENT_PADDING_TOP = 12;

/**
 * Duration (ms) of the background layer fade-out on close. Roughly matches
 * the settle time of `ROOT_CONTENT_SPRING_CONFIG` so the surface dissolves
 * while the root collapses instead of unmounting instantly and exposing the
 * menu items behind it.
 */
export const BACKGROUND_EXITING_DURATION = 200;

/** Spring config for root content container expand/collapse animation */
export const ROOT_CONTENT_SPRING_CONFIG = {
  damping: 100,
  stiffness: 950,
  mass: 3,
};

/** Default margin horizontal/vertical when submenu is open */
export const DEFAULT_ROOT_CONTENT_MARGIN = -16;

/** Default padding horizontal when submenu is open */
export const DEFAULT_ROOT_CONTENT_PADDING_HORIZONTAL = 6;
