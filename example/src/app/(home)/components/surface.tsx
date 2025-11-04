import { Surface, type SurfaceRootProps } from 'heroui-native';
import { View } from 'react-native';
import { AppText } from '../../../components/app-text';
import type { UsageVariant } from '../../../components/component-presentation/types';
import { UsageVariantFlatList } from '../../../components/component-presentation/usage-variant-flatlist';

type SurfaceItemProps = {
  variant: SurfaceRootProps['variant'];
  title: string;
  description: string;
};

const SurfaceItem = ({ variant, title, description }: SurfaceItemProps) => {
  return (
    <Surface variant={variant} className="gap-2">
      <AppText className="text-foreground font-medium">{title}</AppText>
      <AppText className="text-muted">{description}</AppText>
    </Surface>
  );
};

const VariantsContent = () => {
  return (
    <View className="flex-1 items-center justify-center">
      <View className="gap-4 w-full px-5">
        <SurfaceItem
          variant="default"
          title="Surface Content"
          description="This is a default surface variant. It uses bg-surface styling."
        />
        <SurfaceItem
          variant="secondary"
          title="Surface Content"
          description="This is a secondary surface variant. It uses bg-surface-secondary styling."
        />
        <SurfaceItem
          variant="tertiary"
          title="Surface Content"
          description="This is a tertiary surface variant. It uses bg-surface-tertiary styling."
        />
        <SurfaceItem
          variant="quaternary"
          title="Surface Content"
          description="This is a quaternary surface variant. It uses bg-surface-quaternary styling."
        />
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

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
