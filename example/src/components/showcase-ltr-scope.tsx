import { LayoutDirectionScope, PortalHost } from 'heroui-native';
import { type FC, type ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { LayoutDirection } from 'uniwind';

/**
 * Portal host that keeps showcase overlays inside the left-to-right scope.
 *
 * `Portal` writes into a module-level store and the default `PortalHost` renders
 * at the app root, which is outside this subtree. Overlays therefore have to
 * target this host explicitly via `hostName` or they would render right-to-left
 * while the showcase around them renders left-to-right.
 */
export const SHOWCASE_PORTAL_HOST = 'showcase';

export type ShowcaseLtrScopeProps = {
  /** Showcase content to pin to left-to-right */
  children: ReactNode;
};

/**
 * Pins showcase screens to a left-to-right layout regardless of the app-level
 * RTL setting.
 *
 * Showcases exist to demonstrate finished product designs (paywalls, onboarding
 * flows, brand clones), so they stay in English and LTR. Everything else in the
 * example app follows the RTL switch in the settings sheet.
 *
 * Three separate direction systems have to be overridden:
 *
 * 1. `LayoutDirection` (uniwind) scopes the `rtl:` class variants.
 * 2. A `direction` style on a real `View` flips Yoga layout. `LayoutDirection`
 *    sets this on its own wrapper, but that wrapper uses `display: contents`,
 *    which Yoga skips on RN 0.86 — the same reason the root layout carries an
 *    explicit `direction` style.
 * 3. `LayoutDirectionScope` (heroui-native) overrides the direction that library
 *    components read in JS: gesture inversion, animation offsets, and popover
 *    start/end alignment.
 */
export const ShowcaseLtrScope: FC<ShowcaseLtrScopeProps> = ({ children }) => {
  return (
    <LayoutDirection rtl={false}>
      <View className="flex-1" style={styles.directionLTR}>
        <LayoutDirectionScope isRTL={false}>
          {children}
          <PortalHost name={SHOWCASE_PORTAL_HOST} />
        </LayoutDirectionScope>
      </View>
    </LayoutDirection>
  );
};

const styles = StyleSheet.create({
  directionLTR: {
    direction: 'ltr',
  },
});
