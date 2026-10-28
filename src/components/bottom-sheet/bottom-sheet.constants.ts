import type { SheetDetent } from '@lodev09/react-native-true-sheet';

/**
 * Display names for BottomSheet components
 */
export const DISPLAY_NAME = {
  ROOT: 'HeroUINative.BottomSheet.Root',
  CLOSE: 'HeroUINative.BottomSheet.Close',
  TITLE: 'HeroUINative.BottomSheet.Title',
  DESCRIPTION: 'HeroUINative.BottomSheet.Description',
};

/**
 * Detents used when `BottomSheet` gets none: size the sheet to its content.
 */
export const DEFAULT_DETENTS: SheetDetent[] = ['auto'];
