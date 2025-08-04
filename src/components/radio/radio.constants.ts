import { Easing } from 'react-native-reanimated';

export const DISPLAY_NAME = {
  RADIO_GROUP: 'HeroUINative.RadioGroup.Root',
  RADIO: 'HeroUINative.Radio.Root',
  RADIO_INDICATOR: 'HeroUINative.Radio.Indicator',
  RADIO_INDICATOR_BACKGROUND: 'HeroUINative.Radio.IndicatorBackground',
  RADIO_INDICATOR_THUMB: 'HeroUINative.Radio.IndicatorThumb',
  RADIO_CONTENT: 'HeroUINative.Radio.Content',
  RADIO_LABEL: 'HeroUINative.Radio.Label',
  RADIO_DESCRIPTION: 'HeroUINative.Radio.Description',
} as const;

export const ANIMATION_DURATION = 175;
export const ANIMATION_EASING = Easing.out(Easing.ease);

export const DEFAULT_TIMING_CONFIG = {
  duration: ANIMATION_DURATION,
  easing: ANIMATION_EASING,
};

export const DEFAULT_SPRING_CONFIG = {
  damping: 40,
  stiffness: 800,
};

export const DEFAULT_HIT_SLOP = 6;
