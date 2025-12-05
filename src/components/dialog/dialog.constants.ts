import { Easing, type WithTimingConfig } from 'react-native-reanimated';

/**
 * Display names for Dialog components
 */
export const DISPLAY_NAME = {
  ROOT: 'HeroUINative.Dialog.Root',
  TRIGGER: 'HeroUINative.Dialog.Trigger',
  PORTAL: 'HeroUINative.Dialog.Portal',
  OVERLAY: 'HeroUINative.Dialog.Overlay',
  CONTENT: 'HeroUINative.Dialog.Content',
  CLOSE: 'HeroUINative.Dialog.Close',
  LABEL: 'HeroUINative.Dialog.Label',
  DESCRIPTION: 'HeroUINative.Dialog.Description',
};

/**
 * Default entering animation type
 */
export const DEFAULT_ENTERING_TYPE = 'timing' as const;

/**
 * Default exiting animation type
 */
export const DEFAULT_EXITING_TYPE = 'timing' as const;

/**
 * Default entering animation configuration
 */
export const DEFAULT_ENTERING_CONFIG: WithTimingConfig = {
  duration: 250,
  easing: Easing.out(Easing.ease),
};

/**
 * Default exiting animation configuration
 */
export const DEFAULT_EXITING_CONFIG: WithTimingConfig = {
  duration: 150,
  easing: Easing.bezier(0.4, 0, 1, 1),
};
