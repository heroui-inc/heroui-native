import Ionicons from '@expo/vector-icons/Ionicons';
import { useLingui } from '@lingui/react/macro';
import { BottomSheet, Button } from 'heroui-native';
import { useState } from 'react';
import { View } from 'react-native';
import { withUniwind } from 'uniwind';

const StyledIonicons = withUniwind(Ionicons);

export const BasicBottomSheetContent = () => {
  const { t } = useLingui();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View className="flex-1">
      <View className="flex-1 items-center justify-center">
        <BottomSheet isOpen={isOpen} onOpenChange={setIsOpen}>
          <BottomSheet.Trigger asChild>
            <Button variant="secondary" isDisabled={isOpen}>
              {t`Basic bottom sheet`}
            </Button>
          </BottomSheet.Trigger>
          <BottomSheet.Portal>
            <BottomSheet.Overlay />
            <BottomSheet.Content>
              <View className="items-center mb-5">
                <View className="size-20 items-center justify-center rounded-full bg-green-500/10">
                  <StyledIonicons
                    name="shield-checkmark"
                    size={40}
                    className="text-green-500"
                  />
                </View>
              </View>
              <View className="mb-8 gap-2 items-center">
                <BottomSheet.Title className="text-center">
                  {t`Keep yourself safe`}
                </BottomSheet.Title>
                <BottomSheet.Description className="text-center">
                  {t`Update your software to the latest version for better security and performance.`}
                </BottomSheet.Description>
              </View>
              <View className="gap-3">
                <Button
                  onPress={() => setIsOpen(false)}
                >{t`Update Now`}</Button>
                <Button variant="tertiary" onPress={() => setIsOpen(false)}>
                  {t`Later`}
                </Button>
              </View>
            </BottomSheet.Content>
          </BottomSheet.Portal>
        </BottomSheet>
      </View>
    </View>
  );
};
