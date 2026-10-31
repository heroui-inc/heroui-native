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

/**
 * Thrown when `@lodev09/react-native-true-sheet` is not installed.
 */
export const MISSING_PACKAGE_ERROR =
  'BottomSheet requires @lodev09/react-native-true-sheet. Install it to use BottomSheet or presentation="bottom-sheet".';
