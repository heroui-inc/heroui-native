import type { SheetDetent } from '@lodev09/react-native-true-sheet';

/**
 * Display names for NativeBottomSheet components
 */
export const DISPLAY_NAME = {
  ROOT: 'HeroUINative.NativeBottomSheet.Root',
  CLOSE: 'HeroUINative.NativeBottomSheet.Close',
  TITLE: 'HeroUINative.NativeBottomSheet.Title',
  DESCRIPTION: 'HeroUINative.NativeBottomSheet.Description',
};

/**
 * Detents used when `NativeBottomSheet` gets none: size to content, matching
 * the dynamic sizing default of `BottomSheet.Content`.
 */
export const DEFAULT_DETENTS: SheetDetent[] = ['auto'];
