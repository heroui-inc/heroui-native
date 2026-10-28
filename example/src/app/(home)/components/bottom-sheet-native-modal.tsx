import { useLingui } from '@lingui/react/macro';
import { BottomSheet, Button, type BottomSheetRef } from 'heroui-native';
import { useRef } from 'react';
import { View } from 'react-native';

export default function BottomSheetNativeModalScreen() {
  const { t } = useLingui();
  const sheetRef = useRef<BottomSheetRef>(null);

  return (
    <View className="flex-1 items-center justify-center px-5">
      <Button variant="secondary" onPress={() => sheetRef.current?.present()}>
        {t`Open sheet`}
      </Button>
      <BottomSheet ref={sheetRef}>
        <View className="mb-8 gap-2">
          <BottomSheet.Title>
            {t`Presented over a native modal`}
          </BottomSheet.Title>
          <BottomSheet.Description>
            {t`The sheet is presented above this modal without an extra overlay.`}
          </BottomSheet.Description>
        </View>
        <Button onPress={() => sheetRef.current?.dismiss()}>{t`Close`}</Button>
      </BottomSheet>
    </View>
  );
}
