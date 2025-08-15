import { Surface } from 'heroui-native';
import { Text, View } from 'react-native';
import { ScreenScrollView } from '../../components/screen-scroll-view';
import { SectionTitle } from '../../components/section-title';

export default function SurfaceScreen() {
  return (
    <ScreenScrollView contentContainerClassName="gap-16">
      <SectionTitle title="Basic Usage" />
      <Surface className="h-20">
        <Text className="text-foreground">
          Default Surface with variant="1"
        </Text>
      </Surface>

      <SectionTitle title="Variants" />
      <View className="gap-8">
        <Surface variant="none" className="h-20">
          <Text className="text-foreground">
            Variant "none" - Transparent background, no border
          </Text>
        </Surface>

        <Surface variant="1" className="h-20">
          <Text className="text-foreground">
            Variant "1" - Surface-1 background with border
          </Text>
        </Surface>

        <Surface variant="2" className="h-20">
          <Text className="text-foreground">
            Variant "2" - Surface-2 background with border
          </Text>
        </Surface>

        <Surface variant="3" className="h-20">
          <Text className="text-foreground">
            Variant "3" - Surface-3 background with border
          </Text>
        </Surface>
      </View>

      <SectionTitle title="Nested Surfaces" />
      <Surface variant="1">
        <Text className="text-foreground mb-2">Level 1 Surface</Text>
        <Surface variant="2">
          <Text className="text-foreground mb-2">Level 2 Surface</Text>
          <Surface variant="3">
            <Text className="text-foreground">Level 3 Surface</Text>
          </Surface>
        </Surface>
      </Surface>

      <SectionTitle title="With Custom Content" />
      <View className="gap-8">
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
    </ScreenScrollView>
  );
}
