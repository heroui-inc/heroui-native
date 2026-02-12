/**
 * Display names for the Select components
 */
export const DISPLAY_NAME = {
  ROOT: 'HeroUINative.Select.Root',
  TRIGGER: 'HeroUINative.Select.Trigger',
  VALUE: 'HeroUINative.Select.Value',
  PORTAL: 'HeroUINative.Select.Portal',
  OVERLAY: 'HeroUINative.Select.Overlay',
  CONTENT: 'HeroUINative.Select.Content',
  ITEM: 'HeroUINative.Select.Item',
  ITEM_LABEL: 'HeroUINative.Select.ItemLabel',
  ITEM_DESCRIPTION: 'HeroUINative.Select.ItemDescription',
  ITEM_INDICATOR: 'HeroUINative.Select.ItemIndicator',
  LIST_LABEL: 'HeroUINative.Select.ListLabel',
  CLOSE: 'HeroUINative.Select.Close',
  TRIGGER_INDICATOR: 'HeroUINative.Select.TriggerIndicator',
  CHEVRON_DOWN_ICON: 'HeroUINative.Select.ChevronDownIcon',
} as const;

/**
 * Default icon size for the indicator
 */
export const DEFAULT_ICON_SIZE = 16;

/**
 * Spring configuration for indicator animation
 */
export const INDICATOR_SPRING_CONFIG = {
  damping: 140,
  stiffness: 1000,
  mass: 4,
};

/**
 * Default offset from trigger element
 */
export const DEFAULT_OFFSET = 8;

/**
 * Default alignment offset
 */
export const DEFAULT_ALIGN_OFFSET = 0;

/**
 * Default screen edge insets
 */
export const DEFAULT_INSETS = {
  top: 12,
  bottom: 12,
  left: 12,
  right: 12,
};
