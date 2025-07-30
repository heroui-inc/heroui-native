import { Surface } from 'heroui-native';
import { ScrollView, Text, View } from 'react-native';

export default function SurfaceScreen() {
  return (
    <ScrollView
      className="bg-background"
      contentContainerClassName="items-center justify-center p-4"
      contentInsetAdjustmentBehavior="automatic"
    >
      <Text className="text-lg font-bold text-muted-foreground mb-4">
        Basic Usage
      </Text>

      <View className="w-full gap-4 mb-6">
        <Surface>
          <Text className="text-foreground">
            Default Surface with variant="1"
          </Text>
        </Surface>
      </View>

      <Text className="text-lg font-bold text-muted-foreground mb-4">
        Variants
      </Text>

      <View className="w-full gap-4 mb-6">
        <Surface variant="none">
          <Text className="text-foreground">
            Variant "none" - Transparent background, no border
          </Text>
        </Surface>

        <Surface variant="1">
          <Text className="text-foreground">
            Variant "1" - Surface-1 background with border
          </Text>
        </Surface>

        <Surface variant="2">
          <Text className="text-foreground">
            Variant "2" - Surface-2 background with border
          </Text>
        </Surface>

        <Surface variant="3">
          <Text className="text-foreground">
            Variant "3" - Surface-3 background with border
          </Text>
        </Surface>
      </View>

      <Text className="text-lg font-bold text-muted-foreground mb-4">
        Nested Surfaces
      </Text>

      <View className="w-full gap-4 mb-6">
        <Surface variant="1">
          <Text className="text-foreground mb-2">Level 1 Surface</Text>
          <Surface variant="2">
            <Text className="text-foreground mb-2">Level 2 Surface</Text>
            <Surface variant="3">
              <Text className="text-foreground">Level 3 Surface</Text>
            </Surface>
          </Surface>
        </Surface>
      </View>

      <Text className="text-lg font-bold text-muted-foreground mb-4">
        With Custom Content
      </Text>

      <View className="w-full gap-4 mb-6">
        <Surface variant="1">
          <View className="gap-2">
            <Text className="text-lg font-semibold text-foreground">
              Card Title
            </Text>
            <Text className="text-muted-foreground">
              This is a card-like surface component that can contain any content
              with consistent padding and styling.
            </Text>
          </View>
        </Surface>

        <Surface variant="2" className="bg-accent-soft">
          <Text className="text-accent-soft-foreground">
            Surface with custom background color
          </Text>
        </Surface>
      </View>

      <Text className="text-lg font-bold text-muted-foreground mb-4">
        Layout Examples
      </Text>

      <View className="w-full gap-4 mb-6">
        <View className="flex-row gap-4">
          <Surface variant="1" className="flex-1">
            <Text className="text-foreground text-center">Left</Text>
          </Surface>
          <Surface variant="2" className="flex-1">
            <Text className="text-foreground text-center">Right</Text>
          </Surface>
        </View>

        <Surface variant="none" className="p-0">
          <View className="p-6">
            <Text className="text-foreground">
              Surface with custom padding (p-0 + inner p-6)
            </Text>
          </View>
        </Surface>
      </View>
    </ScrollView>
  );
}
