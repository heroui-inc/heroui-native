import { Surface } from 'heroui-native';
import { View } from 'react-native';
import { AppText } from '../../../components/app-text';
import { ScreenScrollView } from '../../../components/screen-scroll-view';
import { SectionTitle } from '../../../components/section-title';

export default function SurfaceScreen() {
  return (
    <ScreenScrollView contentContainerClassName="gap-16">
      <SectionTitle title="Basic Usage" />
      <Surface className="h-20">
        <AppText className="text-foreground">
          Default Surface with variant="1"
        </AppText>
      </Surface>

      <SectionTitle title="Variants" />
      <View className="gap-8">
        <Surface variant="none" className="h-20">
          <AppText className="text-foreground">
            Variant "none" - Transparent background, no border
          </AppText>
        </Surface>

        <Surface variant="1" className="h-20">
          <AppText className="text-foreground">
            Variant "1" - Surface-1 background with border
          </AppText>
        </Surface>

        <Surface variant="2" className="h-20">
          <AppText className="text-foreground">
            Variant "2" - Surface-2 background with border
          </AppText>
        </Surface>

        <Surface variant="3" className="h-20">
          <AppText className="text-foreground">
            Variant "3" - Surface-3 background with border
          </AppText>
        </Surface>
      </View>

      <SectionTitle title="Nested Surfaces" />
      <Surface variant="1">
        <AppText className="text-foreground mb-2">Level 1 Surface</AppText>
        <Surface variant="2">
          <AppText className="text-foreground mb-2">Level 2 Surface</AppText>
          <Surface variant="3">
            <AppText className="text-foreground">Level 3 Surface</AppText>
          </Surface>
        </Surface>
      </Surface>

      <SectionTitle title="With Custom Content" />
      <View className="gap-8">
        <Surface variant="1">
          <View className="gap-2">
            <AppText className="text-lg font-semibold text-foreground">
              Card Title
            </AppText>
            <AppText className="text-muted-foreground">
              This is a card-like surface component that can contain any content
              with consistent padding and styling.
            </AppText>
          </View>
        </Surface>

        <Surface variant="2" className="bg-lime-100">
          <AppText className="text-lime-800">
            Surface with custom background color
          </AppText>
        </Surface>
      </View>
    </ScreenScrollView>
  );
}
