/* eslint-disable react-native/no-inline-styles */
import { LinearGradient } from 'expo-linear-gradient';
import { Chip, useTheme } from 'heroui-native';
import { Plus, Star, X } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { cn } from '../../helpers/utils/cn';

export default function ChipScreen() {
  const { isDark } = useTheme();
  const [hasNotification, setHasNotification] = useState(true);
  const [chipCount, setChipCount] = useState(3);

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
        <Chip>Basic Chip</Chip>
      </View>

      <Text className="text-lg font-bold text-muted-foreground mb-4">
        Sizes
      </Text>

      <View className="flex-row gap-4 mb-6">
        <Chip size="sm">Small Chip</Chip>
        <Chip size="md">Medium Chip</Chip>
        <Chip size="lg">Large Chip</Chip>
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
        <Chip variant="primary" color="default">
          <Chip.Label>Default</Chip.Label>
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
        <Chip variant="secondary" color="default">
          <Chip.Label>Default</Chip.Label>
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
        <Chip variant="tertiary" color="default">
          <Chip.Label>Default</Chip.Label>
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
          <Chip.Label className="text-background text-base">Custom</Chip.Label>
        </Chip>
        <Chip
          variant="secondary"
          className="border-purple-600 bg-purple-100 rounded-sm"
        >
          <Chip.Label classNames={{ text: 'text-black' }}>Purple</Chip.Label>
        </Chip>
      </View>

      <Text className="text-lg font-bold text-muted-foreground mb-4">
        Gradient Background
      </Text>

      <View className="flex-row flex-wrap gap-4 mb-6 justify-center">
        <Chip className="border-0">
          <Chip.Background>
            <LinearGradient
              colors={['#ec4899', '#8b5cf6']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{ flex: 1 }}
            />
          </Chip.Background>
          <Chip.Label className="text-white font-semibold">Gradient</Chip.Label>
        </Chip>

        <Chip className="border-0 pl-2" size="lg">
          <Chip.Background>
            <LinearGradient
              colors={['#10b981', '#3b82f6']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={{ flex: 1 }}
            />
          </Chip.Background>
          <Chip.StartContent>
            <Star size={16} color="white" fill="white" />
          </Chip.StartContent>
          <Chip.Label className="text-white font-bold">Premium</Chip.Label>
        </Chip>

        <Chip className="border-0">
          <Chip.Background>
            <LinearGradient
              colors={['#f59e0b', '#ef4444']}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={{ flex: 1 }}
            />
          </Chip.Background>
          <Chip.Label>Hot</Chip.Label>
          <Chip.EndContent>
            <Text className="text-white text-xs">🔥</Text>
          </Chip.EndContent>
        </Chip>
      </View>

      <Text className="text-lg font-bold text-muted-foreground mb-4">
        Dynamic Parts
      </Text>

      <View className="gap-4 mb-6">
        <View className="flex-row gap-4 justify-center">
          <Chip variant="secondary">
            {hasNotification && (
              <Chip.StartContent>
                <View className="w-2 h-2 rounded-full bg-red-500" />
              </Chip.StartContent>
            )}
            <Chip.Label>Notifications</Chip.Label>
            <Chip.EndContent>
              <Pressable
                onPress={() => setHasNotification(!hasNotification)}
                hitSlop={8}
              >
                <Text className="text-accent text-xs font-bold">
                  {hasNotification ? 'ON' : 'OFF'}
                </Text>
              </Pressable>
            </Chip.EndContent>
          </Chip>
        </View>

        <View className="flex-row gap-4 justify-center">
          <Chip variant="primary" color="accent">
            <Chip.Label>Items</Chip.Label>
            <Chip.EndContent>
              <View className="ml-1 bg-white/20 px-2 rounded-full">
                <Text className="text-background text-xs font-bold">
                  {chipCount}
                </Text>
              </View>
            </Chip.EndContent>
          </Chip>

          <Pressable onPress={() => setChipCount(chipCount + 1)}>
            <Chip variant="secondary">
              <Chip.Label>Add Item</Chip.Label>
              <Chip.EndContent>
                <Plus size={14} color="#6B7280" />
              </Chip.EndContent>
            </Chip>
          </Pressable>

          <Pressable onPress={() => setChipCount(Math.max(0, chipCount - 1))}>
            <Chip variant="secondary" color="danger">
              <Chip.Label>Remove</Chip.Label>
              <Chip.EndContent>
                <X size={14} color="#EF4444" />
              </Chip.EndContent>
            </Chip>
          </Pressable>
        </View>

        <Text className="text-center text-sm text-muted-foreground mt-2">
          Tap chips to interact with dynamic content
        </Text>
      </View>
    </ScrollView>
  );
}
