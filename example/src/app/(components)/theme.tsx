import { Surface } from 'heroui-native';
import { ScrollView, Text, View } from 'react-native';

export default function Theme() {
  return (
    <ScrollView
      className="flex-1 px-4 py-6 bg-background"
      contentContainerClassName="pb-20"
      contentInsetAdjustmentBehavior="automatic"
    >
      <View className="gap-4 p-4">
        <Surface variant="1">
          <View className="gap-2">
            <Text className="text-lg font-semibold text-foreground">
              Card Title
            </Text>
            <Text className="text-muted-foreground">
              This is a surface component that provides consistent elevation and
              styling for content containers.
            </Text>
          </View>
        </Surface>

        <View className="flex-row gap-4">
          <Surface variant="2" className="flex-1">
            <Text className="text-foreground text-center">Left Panel</Text>
          </Surface>
          <Surface variant="3" className="flex-1">
            <Text className="text-foreground text-center">Right Panel</Text>
          </Surface>
        </View>
      </View>
    </ScrollView>
  );
}
