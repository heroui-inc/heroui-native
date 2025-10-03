/**
 * Display names for RadioGroup components
 */
export const DISPLAY_NAME = {
  RADIO_GROUP_ROOT: 'HeroUINative.RadioGroup.Root',
  RADIO_GROUP_ERROR_MESSAGE: 'HeroUINative.RadioGroup.ErrorMessage',
  RADIO_GROUP_ITEM: 'HeroUINative.RadioGroup.Item',
  RADIO_GROUP_ITEM_INDICATOR: 'HeroUINative.RadioGroup.ItemIndicator',
  RADIO_GROUP_ITEM_INDICATOR_BACKGROUND:
    'HeroUINative.RadioGroup.ItemIndicatorBackground',
  RADIO_GROUP_ITEM_INDICATOR_THUMB:
    'HeroUINative.RadioGroup.ItemIndicatorThumb',
  RADIO_GROUP_ITEM_CONTENT: 'HeroUINative.RadioGroup.ItemContent',
  RADIO_GROUP_ITEM_TITLE: 'HeroUINative.RadioGroup.ItemTitle',
  RADIO_GROUP_ITEM_DESCRIPTION: 'HeroUINative.RadioGroup.ItemDescription',
} as const;

export const DEFAULT_INDICATOR_BORDER_COLOR_TIMING_CONFIG = {
  duration: 0,
};

export const DEFAULT_INDICATOR_THUMB_SPRING_CONFIG = {
  damping: 140,
  stiffness: 1600,
  mass: 6,
};

export const DEFAULT_HIT_SLOP = 6;
