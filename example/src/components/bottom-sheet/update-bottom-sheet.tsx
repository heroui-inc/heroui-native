import * as Linking from 'expo-linking';
import * as Updates from 'expo-updates';
import { BottomSheet, Button } from 'heroui-native';
import type { FC } from 'react';
import { Platform, View } from 'react-native';
import { APP_STORE_URL } from '../../helpers/utils/version-check';

export type UpdateBottomSheetMode = 'new-version' | 'ota-update';

type UpdateBottomSheetProps = {
  isOpen: boolean;
  onOpenChange: (value: boolean) => void;
  mode: UpdateBottomSheetMode;
};

const CONTENT: Record<
  UpdateBottomSheetMode,
  {
    title: string;
    description: string;
    primaryLabel: string;
  }
> = {
  'new-version': {
    title: 'New Version Available',
    description:
      'A newer version is available on the App Store. Update to get the latest features and improvements.',
    primaryLabel: 'Download Now',
  },
  'ota-update': {
    title: 'Update Ready',
    description:
      'New updates are ready. The app needs a quick refresh to apply them (no download required).',
    primaryLabel: 'Refresh Now',
  },
};

/**
 * BottomSheet that handles two update scenarios:
 * - "new-version": directs the user to the App Store
 * - "ota-update": applies an already-fetched OTA update via `Updates.reloadAsync`
 */
export const UpdateBottomSheet: FC<UpdateBottomSheetProps> = ({
  isOpen,
  onOpenChange,
  mode,
}) => {
  const { title, description, primaryLabel } = CONTENT[mode];

  const handlePrimaryPress = () => {
    if (mode === 'new-version') {
      const storeLink = Platform.select({
        ios: APP_STORE_URL,
        android: undefined,
      });

      if (storeLink) {
        Linking.openURL(storeLink);
      }
    } else {
      Updates.reloadAsync();
    }
  };

  const handleDismiss = () => {
    onOpenChange(false);
  };

  return (
    <BottomSheet isOpen={isOpen} onOpenChange={onOpenChange}>
      <BottomSheet.Portal>
        <BottomSheet.Overlay className="bg-black/50" />
        <BottomSheet.Content>
          <View className="mb-8 gap-2 items-center">
            <BottomSheet.Title className="text-center">
              {title}
            </BottomSheet.Title>
            <BottomSheet.Description className="text-center">
              {description}
            </BottomSheet.Description>
          </View>
          <View className="gap-3">
            <Button onPress={handlePrimaryPress}>{primaryLabel}</Button>
            <Button variant="tertiary" onPress={handleDismiss}>
              Later
            </Button>
          </View>
        </BottomSheet.Content>
      </BottomSheet.Portal>
    </BottomSheet>
  );
};
