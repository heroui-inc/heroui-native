/* eslint-disable react-native/no-inline-styles */
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Chip, useTheme } from 'heroui-native';
import { useState } from 'react';
import { View } from 'react-native';
import { AppText } from '../../components/app-text';
import { ScreenScrollView } from '../../components/screen-scroll-view';
import { SectionTitle } from '../../components/section-title';
import { cn } from '../../helpers/utils/cn';

export default function ChipScreen() {
  const { isDark } = useTheme();
  const [hasNotification, setHasNotification] = useState(true);
  const [chipCount, setChipCount] = useState(3);

  return (
    <ScreenScrollView contentContainerClassName="gap-16">
      <SectionTitle title="Basic Usage" />
      <Chip className="self-center">Basic Chip</Chip>

      <SectionTitle title="Sizes" />
      <View className="flex-row gap-4 self-center">
        <Chip size="sm">Small Chip</Chip>
        <Chip size="md">Medium Chip</Chip>
        <Chip size="lg">Large Chip</Chip>
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
            <Chip.StartContent>
              <AppText className="text-xs">📌</AppText>
            </Chip.StartContent>
            <Chip.Label>Featured</Chip.Label>
          </Chip>
          <Chip size="md" variant="secondary" color="success">
            <Chip.StartContent>
              <Ionicons name="add" size={16} color="#10B981" />
            </Chip.StartContent>
            <Chip.Label>New</Chip.Label>
          </Chip>
          <Chip size="lg" variant="tertiary" color="warning">
            <Chip.StartContent className="pr-1">
              <Ionicons name="star" size={12} color="#F59E0B" />
            </Chip.StartContent>
            <Chip.Label>Premium</Chip.Label>
          </Chip>
        </View>

        <View className="flex-row flex-wrap gap-4 justify-center">
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
      </View>

      <SectionTitle title="With End Content" />
      <View className="flex-row gap-4 justify-center">
        <Chip size="sm" variant="secondary">
          <Chip.Label>Close</Chip.Label>
          <Chip.EndContent>
            <Ionicons name="close" size={12} color="#6B7280" />
          </Chip.EndContent>
        </Chip>
        <Chip size="md" variant="primary" color="danger" className="pr-1.5">
          <Chip.Label>Remove</Chip.Label>
          <Chip.EndContent>
            <Ionicons name="close" size={16} color="white" />
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
              <Ionicons
                name="close"
                size={12}
                color={isDark ? 'white' : 'black'}
              />
            </View>
          </Chip.EndContent>
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
          <Chip.Label classNames={{ text: 'text-purple-800' }}>
            Purple
          </Chip.Label>
        </Chip>
      </View>

      <SectionTitle title="Gradient Background" />
      <View className="flex-row flex-wrap gap-4 justify-center">
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
            <Ionicons name="star" size={16} color="white" />
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
            <AppText className="text-white text-xs">🔥</AppText>
          </Chip.EndContent>
        </Chip>
      </View>

      <SectionTitle title="Dynamic Parts" />
      <View className="gap-8">
        <View className="flex-row gap-4 justify-center">
          <Chip
            variant="secondary"
            className={cn(hasNotification ? 'px-6 py-2' : 'px-4 py-1')}
            onPress={() => setHasNotification(!hasNotification)}
            hitSlop={8}
          >
            <Chip.StartContent>
              <View
                className={cn(
                  'w-2 h-2 rounded-full bg-red-500',
                  hasNotification ? 'bg-red-500' : 'bg-stone-400'
                )}
              />
            </Chip.StartContent>
            <Chip.Label>Notifications</Chip.Label>
            <Chip.EndContent>
              <AppText className="text-accent text-xs font-bold">
                {hasNotification ? 'ON' : 'OFF'}
              </AppText>
            </Chip.EndContent>
          </Chip>
        </View>

        <View className="flex-row gap-4 justify-center">
          <Chip variant="primary" color="accent">
            <Chip.Label>Items</Chip.Label>
            <Chip.EndContent>
              <View className="ml-1 bg-white/20 px-2 rounded-full">
                <AppText className="text-background text-xs font-bold">
                  {chipCount}
                </AppText>
              </View>
            </Chip.EndContent>
          </Chip>

          <Chip variant="secondary" onPress={() => setChipCount(chipCount + 1)}>
            <Chip.Label>Add Item</Chip.Label>
            <Chip.EndContent>
              <Ionicons name="add" size={14} color="#6B7280" />
            </Chip.EndContent>
          </Chip>

          <Chip
            variant="secondary"
            onPress={() => setChipCount(Math.max(0, chipCount - 1))}
          >
            <Chip.Label>Remove</Chip.Label>
            <Chip.EndContent>
              <Ionicons name="close" size={14} color="#EF4444" />
            </Chip.EndContent>
          </Chip>
        </View>

        <AppText className="text-center text-sm text-muted-foreground">
          Tap chips to interact with dynamic content
        </AppText>
      </View>
    </ScreenScrollView>
  );
}
