import { Divider, Surface } from 'heroui-native';
import { View } from 'react-native';
import { AppText } from '../../../components/app-text';
import type { UsageVariant } from '../../../components/component-presentation/types';
import { UsageVariantFlatList } from '../../../components/component-presentation/usage-variant-flatlist';

const DividerInActionContent = () => {
  return (
    <View className="flex-1 items-center justify-center px-5">
      <Surface variant="secondary" className="px-6 py-7">
        <AppText className="text-base font-medium text-foreground">
          HeroUI Native
        </AppText>
        <AppText className="text-sm text-muted">
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
    </View>
  );
};

// ------------------------------------------------------------------------------

const VariantsContent = () => {
  return (
    <View className="flex-1 items-center justify-center px-5">
      <View className="gap-8 w-full">
        <View>
          <AppText className="text-sm text-muted mb-2">Thin (default)</AppText>
          <Divider variant="thin" />
        </View>

        <View>
          <AppText className="text-sm text-muted mb-2">Thick</AppText>
          <Divider variant="thick" />
        </View>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const OrientationContent = () => {
  return (
    <View className="flex-1 items-center justify-center px-5">
      <View className="gap-8 w-full">
        <View>
          <AppText className="text-sm text-muted mb-2">
            Horizontal (default)
          </AppText>
          <Divider />
        </View>

        <View>
          <AppText className="text-sm text-muted mb-2">Vertical</AppText>
          <View className="h-20 w-full flex-row justify-center">
            <Divider orientation="vertical" />
          </View>
        </View>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const CustomThicknessContent = () => {
  return (
    <View className="flex-1 items-center justify-center px-5">
      <View className="gap-8 w-full">
        <View>
          <AppText className="text-sm text-muted mb-2">
            Default (hairline width)
          </AppText>
          <Divider />
        </View>

        <View>
          <AppText className="text-sm text-muted mb-2">1px</AppText>
          <Divider thickness={1} />
        </View>

        <View>
          <AppText className="text-sm text-muted mb-2">2px</AppText>
          <Divider thickness={2} />
        </View>

        <View>
          <AppText className="text-sm text-muted mb-2">5px</AppText>
          <Divider thickness={5} />
        </View>

        <View>
          <AppText className="text-sm text-muted mb-2">10px</AppText>
          <Divider thickness={10} />
        </View>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const CustomColorsContent = () => {
  return (
    <View className="flex-1 items-center justify-center px-5">
      <View className="gap-8 w-full">
        <View>
          <AppText className="text-sm text-muted mb-2">
            Custom Background Color
          </AppText>
          <Divider className="bg-accent" thickness={2} />
        </View>

        <View>
          <AppText className="text-sm text-muted mb-2">Success Color</AppText>
          <Divider className="bg-success" thickness={2} />
        </View>

        <View>
          <AppText className="text-sm text-muted mb-2">Warning Color</AppText>
          <Divider className="bg-warning" thickness={2} />
        </View>

        <View>
          <AppText className="text-sm text-muted mb-2">Danger Color</AppText>
          <Divider className="bg-danger" thickness={2} />
        </View>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const DIVIDER_VARIANTS: UsageVariant[] = [
  {
    value: 'divider-in-action',
    label: 'Divider in action',
    content: <DividerInActionContent />,
  },
  {
    value: 'variants',
    label: 'Variants',
    content: <VariantsContent />,
  },
  {
    value: 'orientation',
    label: 'Orientation',
    content: <OrientationContent />,
  },
  {
    value: 'custom-thickness',
    label: 'Custom thickness',
    content: <CustomThicknessContent />,
  },
  {
    value: 'custom-colors',
    label: 'Custom colors',
    content: <CustomColorsContent />,
  },
];

export default function DividerScreen() {
  return <UsageVariantFlatList data={DIVIDER_VARIANTS} />;
}
