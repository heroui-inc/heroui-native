import { Spinner } from 'heroui-native';
import { Loader } from 'lucide-react-native';
import { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function Theme() {
  const [loading, setLoading] = useState(true);

  return (
    <ScrollView
      className="flex-1 px-4 py-6 bg-background"
      contentContainerClassName="pb-20"
      contentInsetAdjustmentBehavior="automatic"
    >
      <View className="gap-4 p-4 bg-background">
        <View className="flex-row items-center gap-2 p-4 rounded-lg bg-stone-200">
          <Spinner size="sm" color="default" />
          <Text className="text-stone-500">Loading content...</Text>
        </View>

        <View className="items-center p-8 rounded-2xl bg-stone-200">
          <Spinner size="lg" color="success" loading={loading} />
          <Text className="text-stone-500 mt-4">Processing...</Text>
          <TouchableOpacity onPress={() => setLoading(!loading)}>
            <Text className="text-primary mt-2 text-sm">
              {loading ? 'Tap to stop' : 'Tap to start'}
            </Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row gap-4 items-center justify-center">
          <Spinner size="md" color="#EC4899">
            <Spinner.Indicator speed={0.7}>
              <Loader size={24} color="#EC4899" />
            </Spinner.Indicator>
          </Spinner>
        </View>
      </View>
    </ScrollView>
  );
}
