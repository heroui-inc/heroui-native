import type { SheetDetent } from '@lodev09/react-native-true-sheet';
import { Sheet } from '@lodev09/react-native-true-sheet/navigation/expo-router';
import { useThemeColor } from 'heroui-native';

/* eslint-disable lingui/no-unlocalized-strings -- route names and TrueSheet detent values, not copy. */
const BASE_ROUTE = 'index';
const DETAILS_DETENTS: SheetDetent[] = ['auto'];
/* eslint-enable lingui/no-unlocalized-strings */

/**
 * Keeps the base screen under a sheet route opened directly (deep link or a
 * push from another navigator).
 */
export const unstable_settings = { anchor: BASE_ROUTE };

/**
 * TrueSheet navigator: `index` renders as a regular screen and every other
 * route in this folder is presented as a native sheet over it. `reanimated`
 * drives the sheets with Reanimated, like `BottomSheet`.
 */
export default function SheetNavigatorLayout() {
  const themeColorOverlay = useThemeColor('overlay');

  return (
    <Sheet>
      <Sheet.Screen name={BASE_ROUTE} />
      <Sheet.Screen
        name="details"
        options={{
          reanimated: true,
          detents: DETAILS_DETENTS,
          backgroundColor: themeColorOverlay,
        }}
      />
      <Sheet.Screen
        name="filters"
        options={{
          reanimated: true,
          detents: [0.5, 1],
          backgroundColor: themeColorOverlay,
        }}
      />
    </Sheet>
  );
}
