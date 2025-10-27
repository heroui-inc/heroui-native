import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SelectButtonTrigger } from '../../../components/select/select-button-trigger';

export default function SelectNativeModalScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View className="pt-24 px-5 items-center">
      <SelectButtonTrigger contentOffset={insets.top + 20} />
    </View>
  );
}
