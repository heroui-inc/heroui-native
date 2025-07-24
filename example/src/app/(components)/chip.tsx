import { cn } from '@/helpers/utils';
import { Chip, useTheme } from 'heroui-native';
import { Plus, Star, X } from 'lucide-react-native';
import { ScrollView, Text, View } from 'react-native';

export default function ChipScreen() {
  const { isDark } = useTheme();

  return (
    <ScrollView
      className="bg-background"
      contentContainerClassName="items-center justify-center p-4"
      contentInsetAdjustmentBehavior="automatic"
    >
      <Text className="text-lg font-bold text-muted-foreground mb-4">
        Basic Usage
      </Text>

      <View className="flex-row gap-4 mb-6">
        <Chip />
      </View>

      <Text className="text-lg font-bold text-muted-foreground mb-4">
        Sizes
      </Text>

      <View className="flex-row gap-4 mb-6">
        <Chip size="sm" />
        <Chip size="md" />
        <Chip size="lg" />
      </View>

      <Text className="text-lg font-bold text-muted-foreground mb-4">
        Variants
      </Text>

      <View className="gap-4 mb-6">
        <View className="flex-row gap-4">
          <Chip variant="primary">
            <Chip.Label>Primary</Chip.Label>
          </Chip>
          <Chip variant="secondary">
            <Chip.Label>Secondary</Chip.Label>
          </Chip>
          <Chip variant="tertiary">
            <Chip.Label>Tertiary</Chip.Label>
          </Chip>
        </View>
      </View>

      <Text className="text-lg font-bold text-muted-foreground mb-4">
        Colors - Primary Variant
      </Text>

      <View className="flex-row flex-wrap gap-4 mb-6 justify-center">
        <Chip variant="primary" color="accent">
          <Chip.Label>Accent</Chip.Label>
        </Chip>
        <Chip variant="primary" color="base">
          <Chip.Label>Base</Chip.Label>
        </Chip>
        <Chip variant="primary" color="success">
          <Chip.Label>Success</Chip.Label>
        </Chip>
        <Chip variant="primary" color="warning">
          <Chip.Label>Warning</Chip.Label>
        </Chip>
        <Chip variant="primary" color="danger">
          <Chip.Label>Danger</Chip.Label>
        </Chip>
      </View>

      <Text className="text-lg font-bold text-muted-foreground mb-4">
        Colors - Secondary Variant
      </Text>

      <View className="flex-row flex-wrap gap-4 mb-6 justify-center">
        <Chip variant="secondary" color="accent">
          <Chip.Label>Accent</Chip.Label>
        </Chip>
        <Chip variant="secondary" color="base">
          <Chip.Label>Base</Chip.Label>
        </Chip>
        <Chip variant="secondary" color="success">
          <Chip.Label>Success</Chip.Label>
        </Chip>
        <Chip variant="secondary" color="warning">
          <Chip.Label>Warning</Chip.Label>
        </Chip>
        <Chip variant="secondary" color="danger">
          <Chip.Label>Danger</Chip.Label>
        </Chip>
      </View>

      <Text className="text-lg font-bold text-muted-foreground mb-4">
        Colors - Tertiary Variant
      </Text>

      <View className="flex-row flex-wrap gap-4 mb-6 justify-center">
        <Chip variant="tertiary" color="accent">
          <Chip.Label>Accent</Chip.Label>
        </Chip>
        <Chip variant="tertiary" color="base">
          <Chip.Label>Base</Chip.Label>
        </Chip>
        <Chip variant="tertiary" color="success">
          <Chip.Label>Success</Chip.Label>
        </Chip>
        <Chip variant="tertiary" color="warning">
          <Chip.Label>Warning</Chip.Label>
        </Chip>
        <Chip variant="tertiary" color="danger">
          <Chip.Label>Danger</Chip.Label>
        </Chip>
      </View>

      <Text className="text-lg font-bold text-muted-foreground mb-4">
        With Start Content
      </Text>

      <View className="flex-row flex-wrap gap-4 mb-6 justify-center">
        <Chip size="sm" variant="primary">
          <Chip.StartContent>
            <Text className="text-xs">📌</Text>
          </Chip.StartContent>
          <Chip.Label>Featured</Chip.Label>
          <Chip.EndContent>
            <Text className="text-xs">📌</Text>
          </Chip.EndContent>
        </Chip>
        <Chip size="md" variant="secondary" color="success">
          <Chip.StartContent>
            <Plus size={16} color="#10B981" />
          </Chip.StartContent>
          <Chip.Label>New</Chip.Label>
        </Chip>
        <Chip size="lg" variant="tertiary" color="warning">
          <Chip.StartContent className="pr-1">
            <Star size={12} color="#F59E0B" fill="#F59E0B" />
          </Chip.StartContent>
          <Chip.Label>Premium</Chip.Label>
        </Chip>
      </View>

      <View className="flex-row flex-wrap gap-4 mb-6 justify-center">
        <Chip size="md" variant="secondary">
          <Chip.StartContent>
            <View className="w-1.5 h-1.5 mr-1.5 rounded-full bg-accent" />
          </Chip.StartContent>
          <Chip.Label>Information</Chip.Label>
        </Chip>
        <Chip size="md" variant="secondary" color="success">
          <Chip.StartContent>
            <View className="w-1.5 h-1.5 mr-1.5 rounded-full bg-success" />
          </Chip.StartContent>
          <Chip.Label>Completed</Chip.Label>
        </Chip>
        <Chip size="md" variant="secondary" color="warning">
          <Chip.StartContent>
            <View className="w-1.5 h-1.5 mr-1.5 rounded-full bg-warning" />
          </Chip.StartContent>
          <Chip.Label>Pending</Chip.Label>
        </Chip>
        <Chip size="md" variant="secondary" color="danger">
          <Chip.StartContent>
            <View className="w-1.5 h-1.5 mr-1.5 rounded-full bg-danger" />
          </Chip.StartContent>
          <Chip.Label>Failed</Chip.Label>
        </Chip>
      </View>

      <Text className="text-lg font-bold text-muted-foreground mb-4">
        With End Content
      </Text>

      <View className="flex-row gap-4 mb-6 justify-center">
        <Chip size="sm" variant="secondary">
          <Chip.Label>Close</Chip.Label>
          <Chip.EndContent>
            <X size={12} color="#6B7280" strokeWidth={3} />
          </Chip.EndContent>
        </Chip>
        <Chip size="md" variant="primary" color="danger" className="pr-1.5">
          <Chip.Label>Remove</Chip.Label>
          <Chip.EndContent>
            <X size={16} color="white" />
          </Chip.EndContent>
        </Chip>
        <Chip size="lg" variant="tertiary" color="accent" className="pr-1.5">
          <Chip.Label>Clear</Chip.Label>
          <Chip.EndContent className="ml-1">
            <View
              className={cn(
                'rounded-full p-1',
                isDark ? 'bg-neutral-700' : 'bg-neutral-200'
              )}
            >
              <X size={12} color={isDark ? 'white' : 'black'} strokeWidth={3} />
            </View>
          </Chip.EndContent>
        </Chip>
      </View>

      <Text className="text-lg font-bold text-muted-foreground mb-4">
        Custom Styling
      </Text>

      <View className="flex-row gap-4 mb-6 justify-center">
        <Chip className="bg-purple-600 px-6">
          <Chip.Label className="text-white text-base">Custom</Chip.Label>
        </Chip>
        <Chip
          variant="secondary"
          className="border-purple-600 bg-purple-50 rounded-sm"
        >
          <Chip.Label className="text-purple-600">Purple</Chip.Label>
        </Chip>
      </View>
    </ScrollView>
  );
}
