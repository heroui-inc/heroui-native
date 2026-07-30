import { useLingui } from '@lingui/react/macro';
import { Label } from 'heroui-native';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SelectButtonTrigger } from '../../../components/select/select-button-trigger';

export default function SelectNativeModalScreen() {
  const { t } = useLingui();
  const insets = useSafeAreaInsets();

  return (
    <View className="pt-24 px-5">
      <Label className="ms-1.5 mb-1" isRequired>
        {t`State`}
      </Label>
      <SelectButtonTrigger contentOffset={insets.top + 10} />
    </View>
  );
}
