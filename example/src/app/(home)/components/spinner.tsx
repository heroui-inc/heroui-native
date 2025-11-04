import { Ionicons } from '@expo/vector-icons';
import { Button, Spinner } from 'heroui-native';
import React from 'react';
import { Text, View } from 'react-native';
import { withUniwind } from 'uniwind';
import type { UsageVariant } from '../../../components/component-presentation/types';
import { UsageVariantFlatList } from '../../../components/component-presentation/usage-variant-flatlist';

const StyledIonicons = withUniwind(Ionicons);

const SizesContent = () => {
  return (
    <View className="flex-1">
      <View className="flex-1 items-center justify-center">
        <View className="flex-row gap-4">
          <Spinner size="sm" color="default" />
          <Spinner size="md" color="default" />
          <Spinner size="lg" color="default" />
        </View>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const ColorsContent = () => {
  return (
    <View className="flex-1">
      <View className="flex-1 items-center justify-center">
        <View className="flex-row gap-4">
          <Spinner size="md" color="default" />
          <Spinner size="md" color="success" />
          <Spinner size="md" color="warning" />
          <Spinner size="md" color="danger" />
        </View>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const CustomColorsContent = () => {
  return (
    <View className="flex-1">
      <View className="flex-1 items-center justify-center">
        <View className="flex-row gap-4">
          <Spinner size="md" color="#8B5CF6" />
          <Spinner size="md" color="#EC4899" />
          <Spinner size="md" color="#10B981" />
        </View>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const CustomContentContent = () => {
  return (
    <View className="flex-1 items-center justify-center">
      <View className="flex-row gap-4">
        <Spinner size="md" color="default">
          <Spinner.Indicator speed={0.7}>
            <StyledIonicons
              name="reload"
              size={24}
              className="text-foreground"
            />
          </Spinner.Indicator>
        </Spinner>
        <Spinner size="lg" color="default">
          <Spinner.Indicator speed={0.7}>
            <Text className="text-xl">⏳</Text>
          </Spinner.Indicator>
        </Spinner>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const AnimationSpeedContent = () => {
  return (
    <View className="flex-1 items-center justify-center">
      <View className="flex-row gap-4">
        <View className="items-center">
          <Spinner size="md" color="default">
            <Spinner.Indicator speed={0.5} />
          </Spinner>
          <Text className="text-xs text-muted mt-2">0.5x</Text>
        </View>
        <View className="items-center">
          <Spinner size="md" color="default">
            <Spinner.Indicator speed={1} />
          </Spinner>
          <Text className="text-xs text-muted mt-2">1x</Text>
        </View>
        <View className="items-center">
          <Spinner size="md" color="default">
            <Spinner.Indicator speed={2} />
          </Spinner>
          <Text className="text-xs text-muted mt-2">2x</Text>
        </View>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const StateAnimationContent = () => {
  const [isLoading, setIsLoading] = React.useState(true);

  return (
    <View className="flex-1 items-center justify-center">
      <View className="items-center gap-6">
        <Spinner size="lg" isLoading={isLoading} />
        <Button
          variant="secondary"
          size="sm"
          onPress={() => setIsLoading(!isLoading)}
        >
          {isLoading ? 'Tap to stop' : 'Tap to start'}
        </Button>
      </View>
    </View>
  );
};

// ------------------------------------------------------------------------------

const SPINNER_VARIANTS: UsageVariant[] = [
  {
    value: 'sizes',
    label: 'Sizes',
    content: <SizesContent />,
  },
  {
    value: 'colors',
    label: 'Colors',
    content: <ColorsContent />,
  },
  {
    value: 'custom-colors',
    label: 'Custom colors',
    content: <CustomColorsContent />,
  },
  {
    value: 'custom-content',
    label: 'With custom content',
    content: <CustomContentContent />,
  },
  {
    value: 'animation-speed',
    label: 'Animation speed',
    content: <AnimationSpeedContent />,
  },
  {
    value: 'state-animation',
    label: 'State animation preview',
    content: <StateAnimationContent />,
  },
];

export default function SpinnerScreen() {
  return <UsageVariantFlatList data={SPINNER_VARIANTS} />;
}
