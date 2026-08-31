import type { ReactNode } from 'react';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const styles = StyleSheet.create({
  /**
   * Stretch to the portal/wrapper width, but wrap the dialog height.
   * `flex: 1` plus `justifyContent: 'center'` would fill the overlay and
   * ignore parent alignment (`justify-center` vs `justify-start`), which
   * breaks keyboard-safe layouts like `TextInputDialogContent`.
   * Passing any `style` also opts out of GH's default `{ flex: 1 }`.
   */
  root: {
    alignSelf: 'stretch',
  },
});

/**
 * Nested gesture root for content rendered through a portal.
 *
 * RNGH 3's `GestureDetector` is a native host view and throws on Android when
 * it cannot find a `GestureHandlerRootView` in its native ancestor chain.
 * Portal children are React descendants of the app root, but that is not
 * enough on Android under 3.x. A nested root is a layout-only `View` on
 * RNGH 2 (nested roots are ignored for gesture routing).
 *
 * @see https://github.com/heroui-inc/heroui-native/issues/444
 */
export function PortalGestureRoot({ children }: { children: ReactNode }) {
  return (
    <GestureHandlerRootView style={styles.root} pointerEvents="box-none">
      {children}
    </GestureHandlerRootView>
  );
}
