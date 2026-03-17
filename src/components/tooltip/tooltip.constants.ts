/**
 * Display names for the Tooltip components
 */
export const DISPLAY_NAME = {
  ROOT: 'HeroUINative.Tooltip.Root',
  TRIGGER: 'HeroUINative.Tooltip.Trigger',
  PORTAL: 'HeroUINative.Tooltip.Portal',
  CONTENT: 'HeroUINative.Tooltip.Content',
  ARROW: 'HeroUINative.Tooltip.Arrow',
  TEXT: 'HeroUINative.Tooltip.Text',
} as const;

/**
 * Default offset from trigger element in pixels
 */
export const DEFAULT_OFFSET = 8;

/**
 * Default long-press duration in milliseconds before the tooltip opens
 */
export const DEFAULT_DELAY_DURATION = 500;

/**
 * Default screen edge insets in pixels
 */
export const DEFAULT_INSETS = {
  top: 12,
  bottom: 12,
  left: 12,
  right: 12,
};

/**
 * Minimum pixel gap between the arrow and the edge of the tooltip bubble.
 * Prevents the arrow from overhanging the rounded corners.
 */
export const ARROW_EDGE_PADDING = 12;
