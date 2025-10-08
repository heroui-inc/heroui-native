import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Chip, cn, useTheme } from 'heroui-native';
import { StyleSheet, View } from 'react-native';
import { AppText } from '../../../components/app-text';
import { ScreenScrollView } from '../../../components/screen-scroll-view';
import { SectionTitle } from '../../../components/section-title';

export default function ChipScreen() {
  const { isDark } = useTheme();

  return (
    <ScreenScrollView contentContainerClassName="gap-16">
      <SectionTitle title="Basic Usage" />
      <Chip className="self-center">Basic Chip</Chip>

      <SectionTitle title="Sizes" />
      <View className="flex-row gap-4 self-center">
        <Chip size="sm">Small</Chip>
        <Chip size="md">Medium</Chip>
        <Chip size="lg">Large</Chip>
      </View>

      <SectionTitle title="Variants" />
      <View className="flex-row gap-4 self-center">
        <Chip variant="primary">Primary</Chip>
        <Chip variant="secondary">Secondary</Chip>
        <Chip variant="tertiary">Tertiary</Chip>
      </View>

      <SectionTitle title="Colors - Primary Variant" />
      <View className="flex-row flex-wrap gap-4 justify-center">
        <Chip variant="primary" color="accent">
          Accent
        </Chip>
        <Chip variant="primary" color="default">
          Default
        </Chip>
        <Chip variant="primary" color="success">
          Success
        </Chip>
        <Chip variant="primary" color="warning">
          Warning
        </Chip>
        <Chip variant="primary" color="danger">
          Danger
        </Chip>
      </View>

      <SectionTitle title="Colors - Secondary Variant" />
      <View className="flex-row flex-wrap gap-4 justify-center">
        <Chip variant="secondary" color="accent">
          Accent
        </Chip>
        <Chip variant="secondary" color="default">
          Default
        </Chip>
        <Chip variant="secondary" color="success">
          Success
        </Chip>
        <Chip variant="secondary" color="warning">
          Warning
        </Chip>
        <Chip variant="secondary" color="danger">
          Danger
        </Chip>
      </View>

      <SectionTitle title="Colors - Tertiary Variant" />
      <View className="flex-row flex-wrap gap-4 justify-center">
        <Chip variant="tertiary" color="accent">
          Accent
        </Chip>
        <Chip variant="tertiary" color="default">
          Default
        </Chip>
        <Chip variant="tertiary" color="success">
          Success
        </Chip>
        <Chip variant="tertiary" color="warning">
          Warning
        </Chip>
        <Chip variant="tertiary" color="danger">
          Danger
        </Chip>
      </View>

      <SectionTitle title="With Start Content" />
      <View className="gap-8">
        <View className="flex-row flex-wrap gap-4 justify-center">
          <Chip size="sm" variant="primary">
            <AppText className="text-xs">📌</AppText>
            <Chip.Label>Featured</Chip.Label>
          </Chip>
          <Chip size="md" variant="secondary" color="success">
            <Ionicons name="add" size={16} color="#10B981" />
            <Chip.Label>New</Chip.Label>
          </Chip>
          <Chip size="lg" variant="tertiary" color="warning">
            <Ionicons name="star" size={12} color="#F59E0B" />
            <Chip.Label>Premium</Chip.Label>
          </Chip>
        </View>

        <View className="flex-row flex-wrap gap-4 justify-center">
          <Chip size="md" variant="secondary">
            <View className="size-1.5 mr-1.5 rounded-full bg-accent" />
            <Chip.Label>Information</Chip.Label>
          </Chip>
          <Chip size="md" variant="secondary" color="success">
            <View className="size-1.5 mr-1.5 rounded-full bg-success" />
            <Chip.Label>Completed</Chip.Label>
          </Chip>
          <Chip size="md" variant="secondary" color="warning">
            <View className="size-1.5 mr-1.5 rounded-full bg-warning" />
            <Chip.Label>Pending</Chip.Label>
          </Chip>
          <Chip size="md" variant="secondary" color="danger">
            <View className="size-1.5 mr-1.5 rounded-full bg-danger" />
            <Chip.Label>Failed</Chip.Label>
          </Chip>
        </View>
      </View>

      <SectionTitle title="With End Content" />
      <View className="flex-row gap-4 justify-center">
        <Chip size="sm" variant="secondary">
          <Chip.Label>Close</Chip.Label>
          <Ionicons name="close" size={12} color="#6B7280" />
        </Chip>
        <Chip size="md" variant="primary" color="danger" className="pr-1.5">
          <Chip.Label>Remove</Chip.Label>
          <Ionicons name="close" size={16} color="white" />
        </Chip>
        <Chip
          size="lg"
          variant="tertiary"
          color="accent"
          className="pr-1.5 p-0.5 pl-2 gap-2"
        >
          <Chip.Label>Clear</Chip.Label>
          <View
            className={cn(
              'rounded-full p-1',
              isDark ? 'bg-neutral-700' : 'bg-neutral-200'
            )}
          >
            <Ionicons
              name="close"
              size={12}
              color={isDark ? 'white' : 'black'}
            />
          </View>
        </Chip>
      </View>

      <SectionTitle title="Custom Styling" />
      <View className="flex-row gap-4 justify-center">
        <Chip className="bg-purple-600 px-6">
          <Chip.Label className="text-background text-base">Custom</Chip.Label>
        </Chip>
        <Chip
          variant="secondary"
          className="border-purple-600 bg-purple-100 rounded-sm"
        >
          <Chip.Label className="text-purple-800">Purple</Chip.Label>
        </Chip>
      </View>

      <SectionTitle title="Gradient Background" />
      <View className="flex-row flex-wrap gap-4 justify-center">
        <Chip className="border-0">
          <LinearGradient
            colors={['#ec4899', '#8b5cf6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={StyleSheet.absoluteFill}
          />
          <Chip.Label className="text-white font-semibold">Gradient</Chip.Label>
        </Chip>

        <Chip className="border-0" size="lg">
          <LinearGradient
            colors={['#10b981', '#3b82f6']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
          <Chip.Label className="text-white font-bold">Premium</Chip.Label>
        </Chip>

        <Chip className="border-0">
          <LinearGradient
            colors={['#f59e0b', '#ef4444']}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={StyleSheet.absoluteFill}
          />
          <Chip.Label className="text-white font-semibold">Hot</Chip.Label>
        </Chip>
      </View>
    </ScreenScrollView>
  );
}
