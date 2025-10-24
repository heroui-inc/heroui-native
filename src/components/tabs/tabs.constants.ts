import type { WithSpringConfig } from 'react-native-reanimated';

export const DISPLAY_NAME = {
  ROOT: 'HeroUINative.Tabs.Root',
  LIST: 'HeroUINative.Tabs.List',
  SCROLL_VIEW: 'HeroUINative.Tabs.ScrollView',
  TRIGGER: 'HeroUINative.Tabs.Trigger',
  LABEL: 'HeroUINative.Tabs.Label',
  INDICATOR: 'HeroUINative.Tabs.Indicator',
  CONTENT: 'HeroUINative.Tabs.Content',
} as const;

export const DEFAULT_INDICATOR_SPRING_CONFIG: WithSpringConfig = {
  stiffness: 1200,
  damping: 120,
};
