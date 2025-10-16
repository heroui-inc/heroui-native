import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ModelSelect } from '../../../components/showcases/raycast/model-select';

export default function Raycast() {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="flex-1 px-3 justify-end"
      style={{ paddingTop: insets.top + 8, paddingBottom: insets.bottom + 8 }}
    >
      <View className="p-3 bg-surface-3" style={styles.borderCurve}>
        <ModelSelect />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  borderCurve: {
    borderCurve: 'continuous',
  },
});
