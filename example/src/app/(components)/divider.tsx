import { Divider, Surface } from 'heroui-native';
import { ScrollView, Text, View } from 'react-native';

export default function DividerScreen() {
  return (
    <ScrollView
      className="bg-background"
      contentContainerClassName="items-center justify-center p-4"
      contentInsetAdjustmentBehavior="automatic"
    >
      {/* Orientation Section */}
      <Text className="text-lg font-bold text-muted-foreground mb-4">
        Orientation
      </Text>

      <View className="w-full mb-6">
        <Text className="text-sm text-muted-foreground mb-2">
          Horizontal (default)
        </Text>
        <Divider />

        <Text className="text-sm text-muted-foreground mb-2 mt-4">
          Vertical
        </Text>
        <View className="h-20 w-full flex-row justify-center">
          <Divider orientation="vertical" />
        </View>
      </View>

      {/* Variants Section */}
      <Text className="text-lg font-bold text-muted-foreground mb-4">
        Variants
      </Text>

      <View className="w-full mb-6">
        <Text className="text-sm text-muted-foreground mb-2">
          Thin (default)
        </Text>
        <Divider variant="thin" />

        <Text className="text-sm text-muted-foreground mb-2 mt-4">Thick</Text>
        <Divider variant="thick" />
      </View>

      {/* Custom Thickness Section */}
      <Text className="text-lg font-bold text-muted-foreground mb-4">
        Custom Thickness
      </Text>

      <View className="w-full mb-6">
        <Text className="text-sm text-muted-foreground mb-2">1px</Text>
        <Divider thickness={1} />

        <Text className="text-sm text-muted-foreground mb-2 mt-4">2px</Text>
        <Divider thickness={2} />

        <Text className="text-sm text-muted-foreground mb-2 mt-4">5px</Text>
        <Divider thickness={5} />

        <Text className="text-sm text-muted-foreground mb-2 mt-4">10px</Text>
        <Divider thickness={10} />
      </View>

      {/* Custom Styling Section */}
      <Text className="text-lg font-bold text-muted-foreground mb-4">
        Custom Styling
      </Text>

      <View className="w-full mb-6">
        <Text className="text-sm text-muted-foreground mb-2">
          Custom Background Color
        </Text>
        <Divider className="bg-accent" variant="thick" />

        <Text className="text-sm text-muted-foreground mb-2 mt-4">
          Success Color
        </Text>
        <Divider className="bg-success" thickness={2} />

        <Text className="text-sm text-muted-foreground mb-2 mt-4">
          Warning Color
        </Text>
        <Divider className="bg-warning" thickness={2} />

        <Text className="text-sm text-muted-foreground mb-2 mt-4">
          Danger Color
        </Text>
        <Divider className="bg-danger" thickness={2} />
      </View>

      {/* Combined Examples Section */}
      <Text className="text-lg font-bold text-muted-foreground mb-4">
        Combined Examples
      </Text>

      <View className="w-full mb-6">
        <Text className="text-sm text-muted-foreground mb-2">
          Vertical Thick with Custom Color
        </Text>
        <View className="h-24 w-full flex-row justify-center">
          <Divider
            orientation="vertical"
            variant="thick"
            className="bg-accent"
          />
        </View>

        <Text className="text-sm text-muted-foreground mb-2 mt-4">
          Custom Width for Vertical
        </Text>
        <View className="h-24 w-full flex-row justify-center">
          <Divider orientation="vertical" thickness={8} className="bg-muted" />
        </View>
      </View>

      {/* Layout Examples Section */}
      <Text className="text-lg font-bold text-muted-foreground mb-4">
        Layout Examples
      </Text>

      <View className="w-full mb-6">
        <Surface variant="2">
          <Text className="text-foreground mb-2">Content above divider</Text>
          <Divider className="my-2" />
          <Text className="text-foreground mt-2">Content below divider</Text>
        </Surface>

        <Surface variant="2" className="mt-4 flex-row items-center">
          <Text className="text-foreground">Left</Text>
          <View className="mx-4 h-8">
            <Divider orientation="vertical" />
          </View>
          <Text className="text-foreground">Right</Text>
        </Surface>
      </View>
    </ScrollView>
  );
}
