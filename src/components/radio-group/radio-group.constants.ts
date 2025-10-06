/**
 * Display names for RadioGroup components
 */
export const DISPLAY_NAME = {
  RADIO_GROUP_ROOT: 'HeroUINative.RadioGroup.Root',
  RADIO_GROUP_ITEM: 'HeroUINative.RadioGroup.Item',
  RADIO_GROUP_INDICATOR: 'HeroUINative.RadioGroup.Indicator',
  RADIO_GROUP_INDICATOR_THUMB: 'HeroUINative.RadioGroup.IndicatorThumb',
  RADIO_GROUP_TITLE: 'HeroUINative.RadioGroup.Title',
  RADIO_GROUP_DESCRIPTION: 'HeroUINative.RadioGroup.Description',
  RADIO_GROUP_ERROR_MESSAGE: 'HeroUINative.RadioGroup.ErrorMessage',
} as const;

export const DEFAULT_INDICATOR_THUMB_SPRING_CONFIG = {
  damping: 140,
  stiffness: 1600,
  mass: 6,
};

export const DEFAULT_HIT_SLOP = 6;
