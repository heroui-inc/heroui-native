import { Divider, Surface } from 'heroui-native';
import { Text, View } from 'react-native';
import { ScreenScrollView } from '../../components/screen-scroll-view';
import { SectionTitle } from '../../components/section-title';

export default function DividerScreen() {
  return (
    <ScreenScrollView contentContainerClassName="gap-16">
      <SectionTitle title="Orientation" />
      <View className="gap-8">
        <View>
          <Text className="text-sm text-muted-foreground mb-2">
            Horizontal (default)
          </Text>
          <Divider />
        </View>

        <View>
          <Text className="text-sm text-muted-foreground mb-2">Vertical</Text>
          <View className="h-20 w-full flex-row justify-center">
            <Divider orientation="vertical" />
          </View>
        </View>
      </View>

      <SectionTitle title="Variants" />
      <View className="gap-8">
        <View>
          <Text className="text-sm text-muted-foreground mb-2">
            Thin (default)
          </Text>
          <Divider variant="thin" />
        </View>

        <View>
          <Text className="text-sm text-muted-foreground mb-2">Thick</Text>
          <Divider variant="thick" />
        </View>
      </View>

      <SectionTitle title="Custom Thickness" />
      <View className="gap-8">
        <View>
          <Text className="text-sm text-muted-foreground mb-2">1px</Text>
          <Divider thickness={1} />
        </View>

        <View>
          <Text className="text-sm text-muted-foreground mb-2">2px</Text>
          <Divider thickness={2} />
        </View>

        <View>
          <Text className="text-sm text-muted-foreground mb-2">5px</Text>
          <Divider thickness={5} />
        </View>

        <View>
          <Text className="text-sm text-muted-foreground mb-2">10px</Text>
          <Divider thickness={10} />
        </View>
      </View>

      <SectionTitle title="Custom Styling" />
      <View className="gap-8">
        <View>
          <Text className="text-sm text-muted-foreground mb-2">
            Custom Background Color
          </Text>
          <Divider className="bg-accent" thickness={2} />
        </View>

        <View>
          <Text className="text-sm text-muted-foreground mb-2">
            Success Color
          </Text>
          <Divider className="bg-success" thickness={2} />
        </View>

        <View>
          <Text className="text-sm text-muted-foreground mb-2">
            Warning Color
          </Text>
          <Divider className="bg-warning" thickness={2} />
        </View>

        <View>
          <Text className="text-sm text-muted-foreground mb-2">
            Danger Color
          </Text>
          <Divider className="bg-danger" thickness={2} />
        </View>
      </View>

      <SectionTitle title="Layout Examples" />
      <Surface variant="2">
        <Text className="text-base font-medium text-foreground">
          HeroUI Native
        </Text>
        <Text className="text-sm text-muted-foreground">
          A modern React Native component library.
        </Text>
        <Divider className="my-4" />
        <View className="flex-row items-center h-5">
          <Text className="text-sm text-foreground">Components</Text>
          <Divider orientation="vertical" className="mx-3" />
          <Text className="text-sm text-foreground">Themes</Text>
          <Divider orientation="vertical" className="mx-3" />
          <Text className="text-sm text-foreground">Examples</Text>
        </View>
      </Surface>
    </ScreenScrollView>
  );
}
