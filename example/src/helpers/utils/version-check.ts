import Constants from 'expo-constants';
import { Platform } from 'react-native';

/** App Store link for the HeroUI Native app */
export const APP_STORE_URL =
  'https://apps.apple.com/us/app/heroui-native/id6757860059';

/** Resolved bundle/package identifier per platform */
const bundleInfo = Platform.select({
  ios: {
    id: Constants.expoConfig?.ios?.bundleIdentifier ?? 'com.herouinative.app',
  },
  android: {
    id: Constants.expoConfig?.android?.package ?? 'com.herouinative.android',
  },
});

/** Shape returned by both store-lookup helpers */
interface AppInfoFromStore {
  version: string;
  storeUrl: string;
}

/**
 * Fetches the latest app info from the iOS App Store via the iTunes lookup API.
 * @param country - optional ISO country code for regional lookups
 */
export async function getInfoFromAppStore(
  country = ''
): Promise<AppInfoFromStore | null> {
  try {
    const response = await fetch(
      `https://itunes.apple.com/lookup?bundleId=${bundleInfo?.id}&country=${country}`,
      { cache: 'no-store' }
    );

    const data = (await response.json()) as {
      results: Array<{ trackViewUrl: string; version: string }>;
    };

    const firstResult = data.results[0];
    if (!firstResult) {
      return null;
    }

    return {
      storeUrl: firstResult.trackViewUrl ?? '',
      version: firstResult.version ?? '',
    };
  } catch {
    return null;
  }
}

/**
 * Fetches the latest app info from the Google Play Store by scraping the
 * store page. Currently a stub -- returns `null` until an Android build is
 * published and the scraping targets are verified.
 * @param _country - reserved for future use
 */
export async function getInfoFromPlayStore(
  _country = ''
): Promise<AppInfoFromStore | null> {
  return null;
}

/**
 * Platform-aware wrapper that delegates to the correct store lookup function.
 * @param country - optional ISO country code for regional lookups
 */
export async function getAppInfoFromTheStore(
  country = ''
): Promise<AppInfoFromStore | null> {
  const selectedFunction = Platform.select({
    ios: getInfoFromAppStore,
    android: getInfoFromPlayStore,
  });

  if (selectedFunction) {
    return selectedFunction(country);
  }

  return null;
}

/**
 * Compares two semver-style version strings (e.g. "1.2.3") and returns `true`
 * when `newestVersion` is strictly greater than `installedVersion`.
 */
export function shouldUpdateApp(
  installedVersion: string,
  newestVersion: string
): boolean {
  if (!installedVersion || !newestVersion) {
    return false;
  }

  const installed = installedVersion.split('.').map(Number);
  const newest = newestVersion.split('.').map(Number);

  for (let i = 0; i < Math.max(installed.length, newest.length); i++) {
    const installedPart = installed[i] ?? 0;
    const newestPart = newest[i] ?? 0;

    if (installedPart < newestPart) {
      return true;
    } else if (installedPart > newestPart) {
      return false;
    }
  }

  return false;
}
