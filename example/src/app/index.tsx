import { Test } from 'heroui-native';
import { Text, View } from 'react-native';

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-black">
      <Text className="text-xl font-bold text-blue-400 mb-6">
        Welcome to HeroUI Native!
      </Text>
      <Test />
    </View>
  );
}
