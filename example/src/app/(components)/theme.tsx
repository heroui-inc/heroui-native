import { DropShadowView } from 'heroui-native';
import { ScrollView, Text, View } from 'react-native';

export default function Theme() {
  return (
    <ScrollView
      className="flex-1 px-4 py-6 bg-background"
      contentContainerClassName="pb-20"
      contentInsetAdjustmentBehavior="automatic"
    >
      <View className="gap-4">
        <DropShadowView className="bg-surface-1 p-4 rounded-lg" shadowSize="sm">
          <Text className="text-foreground font-semibold">Small Shadow</Text>
          <Text className="text-muted-foreground text-sm">
            Subtle elevation for cards and containers
          </Text>
        </DropShadowView>

        <DropShadowView className="bg-surface-1 p-6 rounded-lg" shadowSize="md">
          <Text className="text-lg font-semibold text-foreground mb-2">
            Card Component
          </Text>
          <Text className="text-muted-foreground mb-4">
            This card uses medium shadow for standard elevation.
          </Text>
          <View className="flex-row gap-2">
            <View className="bg-accent px-3 py-1 rounded">
              <Text className="text-accent-foreground text-sm">Action</Text>
            </View>
          </View>
        </DropShadowView>

        <DropShadowView
          className="bg-surface-1 p-4 rounded-lg"
          shadowSize="xl"
          shadowColor="red"
        >
          <Text className="text-red-900 font-semibold">Custom Blue Shadow</Text>
          <Text className="text-red-700 text-sm">
            Large shadow with custom color
          </Text>
        </DropShadowView>
      </View>
    </ScrollView>
  );
}
