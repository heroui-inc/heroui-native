export const DISPLAY_NAME = {
  RADIO: 'HeroUINative.Radio.Root',
  RADIO_INDICATOR: 'HeroUINative.Radio.Indicator',
  RADIO_INDICATOR_BACKGROUND: 'HeroUINative.Radio.IndicatorBackground',
  RADIO_INDICATOR_THUMB: 'HeroUINative.Radio.IndicatorThumb',
  RADIO_CONTENT: 'HeroUINative.Radio.Content',
  RADIO_TITLE: 'HeroUINative.Radio.Title',
  RADIO_DESCRIPTION: 'HeroUINative.Radio.Description',
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
