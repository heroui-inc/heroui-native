import type { MessageDescriptor } from '@lingui/core';
import { msg } from '@lingui/core/macro';
import { useLingui } from '@lingui/react/macro';
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
    title: MessageDescriptor;
    description: MessageDescriptor;
    primaryLabel: MessageDescriptor;
  }
> = {
  'new-version': {
    title: msg`New Version Available`,
    description: msg`A newer version is available on the App Store. Update to get the latest features and improvements.`,
    primaryLabel: msg`Download Now`,
  },
  'ota-update': {
    title: msg`Update Ready`,
    description: msg`New updates are ready. The app needs a quick refresh to apply them (no download required).`,
    primaryLabel: msg`Refresh Now`,
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
  const { t } = useLingui();
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
              {t(title)}
            </BottomSheet.Title>
            <BottomSheet.Description className="text-center">
              {t(description)}
            </BottomSheet.Description>
          </View>
          <View className="gap-3">
            <Button onPress={handlePrimaryPress}>{t(primaryLabel)}</Button>
            <Button variant="tertiary" onPress={handleDismiss}>
              {t`Later`}
            </Button>
          </View>
        </BottomSheet.Content>
      </BottomSheet.Portal>
    </BottomSheet>
  );
};
