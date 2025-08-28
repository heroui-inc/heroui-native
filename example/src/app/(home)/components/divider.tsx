import { Divider, Surface } from 'heroui-native';
import { View } from 'react-native';
import { AppText } from '../../../components/app-text';
import { ScreenScrollView } from '../../../components/screen-scroll-view';
import { SectionTitle } from '../../../components/section-title';

export default function DividerScreen() {
  return (
    <ScreenScrollView contentContainerClassName="gap-16">
      <SectionTitle title="Orientation" />
      <View className="gap-8">
        <View>
          <AppText className="text-sm text-muted-foreground mb-2">
            Horizontal (default)
          </AppText>
          <Divider />
        </View>

        <View>
          <AppText className="text-sm text-muted-foreground mb-2">
            Vertical
          </AppText>
          <View className="h-20 w-full flex-row justify-center">
            <Divider orientation="vertical" />
          </View>
        </View>
      </View>

      <SectionTitle title="Variants" />
      <View className="gap-8">
        <View>
          <AppText className="text-sm text-muted-foreground mb-2">
            Thin (default)
          </AppText>
          <Divider variant="thin" />
        </View>

        <View>
          <AppText className="text-sm text-muted-foreground mb-2">
            Thick
          </AppText>
          <Divider variant="thick" />
        </View>
      </View>

      <SectionTitle title="Custom Thickness" />
      <View className="gap-8">
        <View>
          <AppText className="text-sm text-muted-foreground mb-2">1px</AppText>
          <Divider thickness={1} />
        </View>

        <View>
          <AppText className="text-sm text-muted-foreground mb-2">2px</AppText>
          <Divider thickness={2} />
        </View>

        <View>
          <AppText className="text-sm text-muted-foreground mb-2">5px</AppText>
          <Divider thickness={5} />
        </View>

        <View>
          <AppText className="text-sm text-muted-foreground mb-2">10px</AppText>
          <Divider thickness={10} />
        </View>
      </View>

      <SectionTitle title="Custom Styling" />
      <View className="gap-8">
        <View>
          <AppText className="text-sm text-muted-foreground mb-2">
            Custom Background Color
          </AppText>
          <Divider className="bg-accent" thickness={2} />
        </View>

        <View>
          <AppText className="text-sm text-muted-foreground mb-2">
            Success Color
          </AppText>
          <Divider className="bg-success" thickness={2} />
        </View>

        <View>
          <AppText className="text-sm text-muted-foreground mb-2">
            Warning Color
          </AppText>
          <Divider className="bg-warning" thickness={2} />
        </View>

        <View>
          <AppText className="text-sm text-muted-foreground mb-2">
            Danger Color
          </AppText>
          <Divider className="bg-danger" thickness={2} />
        </View>
      </View>

      <SectionTitle title="Layout Examples" />
      <Surface variant="2">
        <AppText className="text-base font-medium text-foreground">
          HeroUI Native
        </AppText>
        <AppText className="text-sm text-muted-foreground">
          A modern React Native component library.
        </AppText>
        <Divider className="my-4" />
        <View className="flex-row items-center h-5">
          <AppText className="text-sm text-foreground">Components</AppText>
          <Divider orientation="vertical" className="mx-3" />
          <AppText className="text-sm text-foreground">Themes</AppText>
          <Divider orientation="vertical" className="mx-3" />
          <AppText className="text-sm text-foreground">Examples</AppText>
        </View>
      </Surface>
    </ScreenScrollView>
  );
}
