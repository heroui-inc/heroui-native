import { LinearTransition } from 'react-native-reanimated';

/**
 * Display names for chip components
 */
export const DISPLAY_NAME = {
  CHIP_ROOT: 'HeroUINative.Chip.Root',
  CHIP_LABEL_CONTENT: 'HeroUINative.Chip.Label',
} as const;

/**
 * Default layout transition for animated chip components
 */
export const DEFAULT_LAYOUT_TRANSITION = LinearTransition.springify();
