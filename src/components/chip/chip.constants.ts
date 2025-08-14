import { LinearTransition } from 'react-native-reanimated';

/**
 * Display names for chip components
 */
export const DISPLAY_NAME = {
  CHIP_ROOT: 'HeroUINative.Chip.Root',
  CHIP_START_CONTENT: 'HeroUINative.Chip.StartContent',
  CHIP_LABEL: 'HeroUINative.Chip.Label',
  CHIP_END_CONTENT: 'HeroUINative.Chip.EndContent',
  CHIP_BACKGROUND: 'HeroUINative.Chip.Background',
} as const;

/**
 * Default layout transition for animated chip components
 */
export const DEFAULT_LAYOUT_TRANSITION = LinearTransition.springify()
  .damping(42)
  .stiffness(600);
