import { useLingui } from '@lingui/react/macro';
import {
  Button,
  NativeBottomSheet,
  type NativeBottomSheetRef,
} from 'heroui-native';
import { useRef } from 'react';
import { View } from 'react-native';

export default function NativeBottomSheetNativeModalScreen() {
  const { t } = useLingui();
  const sheetRef = useRef<NativeBottomSheetRef>(null);

  return (
    <View className="flex-1 items-center justify-center px-5">
      <Button variant="secondary" onPress={() => sheetRef.current?.present()}>
        {t`Open sheet`}
      </Button>
      <NativeBottomSheet ref={sheetRef}>
        <View className="mb-8 gap-2">
          <NativeBottomSheet.Title>
            {t`Presented over a native modal`}
          </NativeBottomSheet.Title>
          <NativeBottomSheet.Description>
            {t`The sheet is presented above this modal without an extra overlay.`}
          </NativeBottomSheet.Description>
        </View>
        <Button onPress={() => sheetRef.current?.dismiss()}>{t`Close`}</Button>
      </NativeBottomSheet>
    </View>
  );
}
