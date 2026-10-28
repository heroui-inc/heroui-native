import { useLingui } from '@lingui/react/macro';
import {
  BottomSheet,
  Button,
  Dialog,
  useToast,
  type BottomSheetRef,
} from 'heroui-native';
import { useRef, useState } from 'react';
import { View } from 'react-native';

/**
 * Dialog and toast used as usual. Both render above the presented sheet.
 */
export const OverlayBottomSheetContent = () => {
  const { t } = useLingui();
  const { toast } = useToast();
  const sheetRef = useRef<BottomSheetRef>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <View className="flex-1">
      <View className="flex-1 items-center justify-center">
        <Button variant="secondary" onPress={() => sheetRef.current?.present()}>
          {t`Sheet with dialog and toast`}
        </Button>
        <BottomSheet ref={sheetRef}>
          <BottomSheet.Title className="mb-2">
            {t`Presented sheet`}
          </BottomSheet.Title>
          <BottomSheet.Description className="mb-6">
            {t`Dialog and toast stay above this sheet.`}
          </BottomSheet.Description>
          <View className="gap-3">
            <Button onPress={() => setIsDialogOpen(true)}>
              {t`Open dialog`}
            </Button>
            <Button
              variant="secondary"
              onPress={() =>
                toast.show({
                  label: t`Above the sheet`,
                  description: t`This toast is rendered above the presented sheet.`,
                })
              }
            >
              {t`Show toast`}
            </Button>
          </View>
        </BottomSheet>
      </View>
      <Dialog isOpen={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <Dialog.Portal>
          <Dialog.Overlay />
          <Dialog.Content>
            <Dialog.Title className="mb-2">{t`Above the sheet`}</Dialog.Title>
            <Dialog.Description className="mb-6">
              {t`This dialog stays above the presented sheet.`}
            </Dialog.Description>
            <Button onPress={() => setIsDialogOpen(false)}>{t`Close`}</Button>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog>
    </View>
  );
};
