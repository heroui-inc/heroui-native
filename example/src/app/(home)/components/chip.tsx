import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Chip } from 'heroui-native';
import { StyleSheet, View } from 'react-native';
import { withUniwind } from 'uniwind';
import { AppText } from '../../../components/app-text';
import type { UsageVariant } from '../../../components/component-presentation/types';
import { UsageVariantFlatList } from '../../../components/component-presentation/usage-variant-flatlist';

const StyledIonicons = withUniwind(Ionicons);

const SizesContent = () => {
  return (
    <View className="flex-1 px-5">
      <View className="flex-1 items-center justify-center">
        <View className="flex-row items-center gap-4">
          <Chip size="sm">Small</Chip>
          <Chip size="md">Medium</Chip>
          <Chip size="lg">Large</Chip>
        </View>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const VariantsContent = () => {
  return (
    <View className="flex-1 px-5">
      <View className="flex-1 items-center justify-center gap-4">
        <Chip variant="primary" className="self-center">
          Primary
        </Chip>
        <Chip variant="secondary" className="self-center">
          Secondary
        </Chip>
        <Chip variant="tertiary" className="self-center">
          Tertiary
        </Chip>
        <Chip variant="soft" className="self-center">
          Soft
        </Chip>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const PrimaryVariantColorsContent = () => {
  return (
    <View className="flex-1 px-5">
      <View className="flex-1 items-center justify-center">
        <View className="gap-4">
          <View className="flex-row gap-4 justify-center">
            <Chip variant="primary" color="accent">
              Accent
            </Chip>
            <Chip variant="primary" color="default">
              Default
            </Chip>
            <Chip variant="primary" color="success">
              Success
            </Chip>
          </View>
          <View className="flex-row gap-4 justify-center">
            <Chip variant="primary" color="warning">
              Warning
            </Chip>
            <Chip variant="primary" color="danger">
              Danger
            </Chip>
          </View>
        </View>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const SecondaryVariantColorsContent = () => {
  return (
    <View className="flex-1 px-5">
      <View className="flex-1 items-center justify-center">
        <View className="gap-4">
          <View className="flex-row gap-4 justify-center">
            <Chip variant="secondary" color="accent">
              Accent
            </Chip>
            <Chip variant="secondary" color="default">
              Default
            </Chip>
            <Chip variant="secondary" color="success">
              Success
            </Chip>
          </View>
          <View className="flex-row gap-4 justify-center">
            <Chip variant="secondary" color="warning">
              Warning
            </Chip>
            <Chip variant="secondary" color="danger">
              Danger
            </Chip>
          </View>
        </View>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const TertiaryVariantColorsContent = () => {
  return (
    <View className="flex-1 px-5">
      <View className="flex-1 items-center justify-center">
        <View className="gap-4">
          <View className="flex-row gap-4 justify-center">
            <Chip variant="tertiary" color="accent">
              Accent
            </Chip>
            <Chip variant="tertiary" color="default">
              Default
            </Chip>
            <Chip variant="tertiary" color="success">
              Success
            </Chip>
          </View>
          <View className="flex-row gap-4 justify-center">
            <Chip variant="tertiary" color="warning">
              Warning
            </Chip>
            <Chip variant="tertiary" color="danger">
              Danger
            </Chip>
          </View>
        </View>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const SoftVariantColorsContent = () => {
  return (
    <View className="flex-1 px-5">
      <View className="flex-1 items-center justify-center">
        <View className="gap-4">
          <View className="flex-row gap-4 justify-center">
            <Chip variant="soft" color="accent">
              Accent
            </Chip>
            <Chip variant="soft" color="default">
              Default
            </Chip>
            <Chip variant="soft" color="success">
              Success
            </Chip>
          </View>
          <View className="flex-row gap-4 justify-center">
            <Chip variant="soft" color="warning">
              Warning
            </Chip>
            <Chip variant="soft" color="danger">
              Danger
            </Chip>
          </View>
        </View>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const WithStartContentContent = () => {
  return (
    <View className="flex-1 px-5 items-center justify-center">
      <View className="gap-8">
        <View className="flex-row flex-wrap gap-4 justify-center">
          <Chip variant="tertiary">
            <AppText className="text-xs">📌</AppText>
            <Chip.Title>Featured</Chip.Title>
          </Chip>
          <Chip size="md" variant="secondary" color="success">
            <StyledIonicons name="add" size={16} className="text-green-500" />
            <Chip.Title>New</Chip.Title>
          </Chip>
          <Chip size="lg" variant="tertiary" color="warning">
            <StyledIonicons name="star" size={12} className="text-yellow-500" />
            <Chip.Title>Premium</Chip.Title>
          </Chip>
        </View>

        <View className="flex-row flex-wrap gap-4 justify-center">
          <Chip size="md" variant="secondary">
            <View className="size-1.5 mr-1.5 rounded-full bg-accent" />
            <Chip.Title>Information</Chip.Title>
          </Chip>
          <Chip size="md" variant="secondary" color="success">
            <View className="size-1.5 mr-1.5 rounded-full bg-success" />
            <Chip.Title>Completed</Chip.Title>
          </Chip>
          <Chip size="md" variant="secondary" color="warning">
            <View className="size-1.5 mr-1.5 rounded-full bg-warning" />
            <Chip.Title>Pending</Chip.Title>
          </Chip>
          <Chip size="md" variant="secondary" color="danger">
            <View className="size-1.5 mr-1.5 rounded-full bg-danger" />
            <Chip.Title>Failed</Chip.Title>
          </Chip>
        </View>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const WithEndContentContent = () => {
  return (
    <View className="flex-1 px-5 items-center justify-center">
      <View className="flex-row gap-4 justify-center">
        <Chip size="sm" variant="secondary">
          <Chip.Title className="text-muted">Close</Chip.Title>
          <StyledIonicons name="close" size={12} className="text-gray-500" />
        </Chip>
        <Chip size="md" variant="primary" color="danger" className="pr-1.5">
          <Chip.Title>Remove</Chip.Title>
          <StyledIonicons name="close" size={16} className="text-white" />
        </Chip>
        <Chip
          size="lg"
          variant="secondary"
          color="default"
          className="pr-1.5 p-0.5 pl-2 gap-2"
        >
          <Chip.Title className="text-muted">Clear</Chip.Title>
          <View className="rounded-full p-1 bg-muted/20">
            <StyledIonicons name="close" size={12} className="text-muted" />
          </View>
        </Chip>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const CustomStylingContent = () => {
  return (
    <View className="flex-1 px-5 items-center justify-center">
      <View className="flex-row flex-wrap gap-4 justify-center">
        <Chip className="bg-purple-600 px-6">
          <Chip.Title className="text-background text-base">Custom</Chip.Title>
        </Chip>
        <Chip
          variant="secondary"
          className="border-purple-600 bg-purple-100 rounded-sm"
        >
          <Chip.Title className="text-purple-800">Purple</Chip.Title>
        </Chip>

        <Chip>
          <LinearGradient
            colors={['#ec4899', '#8b5cf6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={StyleSheet.absoluteFill}
          />
          <Chip.Title className="text-white font-semibold">Gradient</Chip.Title>
        </Chip>

        <Chip size="lg">
          <LinearGradient
            colors={['#10b981', '#3b82f6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
          <Chip.Title className="text-white font-bold">Premium</Chip.Title>
        </Chip>

        <Chip>
          <LinearGradient
            colors={['#f59e0b', '#ef4444']}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={StyleSheet.absoluteFill}
          />
          <Chip.Title className="text-white font-semibold">Hot</Chip.Title>
        </Chip>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const CHIP_VARIANTS: UsageVariant[] = [
  {
    value: 'sizes',
    label: 'Sizes',
    content: <SizesContent />,
  },
  {
    value: 'variants',
    label: 'Variants',
    content: <VariantsContent />,
  },
  {
    value: 'primary-variant-colors',
    label: 'Primary variant colors',
    content: <PrimaryVariantColorsContent />,
  },
  {
    value: 'secondary-variant-colors',
    label: 'Secondary variant colors',
    content: <SecondaryVariantColorsContent />,
  },
  {
    value: 'tertiary-variant-colors',
    label: 'Tertiary variant colors',
    content: <TertiaryVariantColorsContent />,
  },
  {
    value: 'soft-variant-colors',
    label: 'Soft variant colors',
    content: <SoftVariantColorsContent />,
  },
  {
    value: 'with-start-content',
    label: 'With start content',
    content: <WithStartContentContent />,
  },
  {
    value: 'with-end-content',
    label: 'With end content',
    content: <WithEndContentContent />,
  },
  {
    value: 'custom-styling',
    label: 'Custom styling',
    content: <CustomStylingContent />,
  },
];

export default function ChipScreen() {
  return <UsageVariantFlatList data={CHIP_VARIANTS} />;
}
