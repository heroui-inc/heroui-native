import { Surface } from 'heroui-native';
import { View } from 'react-native';
import { AppText } from '../../../components/app-text';
import type { UsageVariant } from '../../../components/component-presentation/types';
import { UsageVariantFlatList } from '../../../components/component-presentation/usage-variant-flatlist';

const VariantsContent = () => {
  return (
    <View className="flex-1 items-center justify-center">
      <View className="gap-4 w-full px-5">
        <Surface variant="default" className="gap-2">
          <AppText className="text-foreground font-medium">
            Surface Content
          </AppText>
          <AppText className="text-muted">
            This is a default surface variant. It uses bg-surface styling.
          </AppText>
        </Surface>

        <Surface variant="secondary" className="gap-2">
          <AppText className="text-foreground font-medium">
            Surface Content
          </AppText>
          <AppText className="text-muted">
            This is a secondary surface variant. It uses bg-surface-secondary
            styling.
          </AppText>
        </Surface>

        <Surface variant="tertiary" className="gap-2">
          <AppText className="text-foreground font-medium">
            Surface Content
          </AppText>
          <AppText className="text-muted">
            This is a tertiary surface variant. It uses bg-surface-tertiary
            styling.
          </AppText>
        </Surface>

        <Surface variant="quaternary" className="gap-2">
          <AppText className="text-foreground font-medium">
            Surface Content
          </AppText>
          <AppText className="text-muted">
            This is a quaternary surface variant. It uses bg-surface-quaternary
            styling.
          </AppText>
        </Surface>
      </View>
    </View>
  );
};

const SURFACE_VARIANTS: UsageVariant[] = [
  {
    value: 'variants',
    label: 'Variants',
    content: <VariantsContent />,
  },
];

export default function SurfaceScreen() {
  return <UsageVariantFlatList data={SURFACE_VARIANTS} />;
}
