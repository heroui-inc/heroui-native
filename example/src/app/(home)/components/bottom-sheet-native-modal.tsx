import { View } from 'react-native';
import { BasicBottomSheetContent } from '../../../components/bottom-sheet/basic';

export default function BottomSheetNativeModalScreen() {
  return (
    <View className="pt-24 px-5">
      <View className="mt-8">
        <BasicBottomSheetContent />
      </View>
    </View>
  );
}
