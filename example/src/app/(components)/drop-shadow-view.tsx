/* eslint-disable react-native/no-inline-styles */
import { DropShadowView } from 'heroui-native';
import { Text, View } from 'react-native';
import { ScreenScrollView } from '../../components/screen-scroll-view';
import { SectionTitle } from '../../components/section-title';

export default function DropShadowViewScreen() {
  return (
    <ScreenScrollView contentContainerClassName="gap-16">
      <SectionTitle title="Shadow Sizes" />
      <View className="gap-8">
        <DropShadowView
          className="bg-surface-1 p-4 rounded-lg"
          shadowSize="none"
        >
          <Text className="text-foreground font-semibold">No Shadow</Text>
          <Text className="text-muted-foreground text-sm">
            shadowSize="none"
          </Text>
        </DropShadowView>

        <DropShadowView className="bg-surface-1 p-4 rounded-lg" shadowSize="xs">
          <Text className="text-foreground font-semibold">Extra Small</Text>
          <Text className="text-muted-foreground text-sm">shadowSize="xs"</Text>
        </DropShadowView>

        <DropShadowView className="bg-surface-1 p-4 rounded-lg" shadowSize="sm">
          <Text className="text-foreground font-semibold">Small</Text>
          <Text className="text-muted-foreground text-sm">shadowSize="sm"</Text>
        </DropShadowView>

        <DropShadowView className="bg-surface-1 p-4 rounded-lg" shadowSize="md">
          <Text className="text-foreground font-semibold">
            Medium (Default)
          </Text>
          <Text className="text-muted-foreground text-sm">shadowSize="md"</Text>
        </DropShadowView>

        <DropShadowView className="bg-surface-1 p-4 rounded-lg" shadowSize="lg">
          <Text className="text-foreground font-semibold">Large</Text>
          <Text className="text-muted-foreground text-sm">shadowSize="lg"</Text>
        </DropShadowView>

        <DropShadowView className="bg-surface-1 p-4 rounded-lg" shadowSize="xl">
          <Text className="text-foreground font-semibold">Extra Large</Text>
          <Text className="text-muted-foreground text-sm">shadowSize="xl"</Text>
        </DropShadowView>
      </View>

      <SectionTitle title="Custom Colors" />
      <View className="gap-8">
        <DropShadowView
          className="bg-blue-100 p-4 rounded-lg"
          shadowSize="xl"
          shadowColor="#3b82f6"
        >
          <Text className="text-blue-900 font-semibold">Blue Shadow</Text>
          <Text className="text-blue-700 text-sm">shadowColor="#3b82f6"</Text>
        </DropShadowView>

        <DropShadowView
          className="bg-emerald-100 p-4 rounded-lg"
          shadowSize="xl"
          shadowColor="#10b981"
        >
          <Text className="text-emerald-900 font-semibold">Green Shadow</Text>
          <Text className="text-emerald-700 text-sm">
            shadowColor="#10b981"
          </Text>
        </DropShadowView>

        <DropShadowView
          className="bg-violet-100 p-4 rounded-lg"
          shadowSize="xl"
          shadowColor="#8b5cf6"
        >
          <Text className="text-violet-900 font-semibold">Purple Shadow</Text>
          <Text className="text-violet-700 text-sm">shadowColor="#8b5cf6"</Text>
        </DropShadowView>

        <DropShadowView
          className="bg-red-100 p-4 rounded-lg"
          shadowSize="xl"
          shadowColor="#ef4444"
        >
          <Text className="text-red-900 font-semibold">Red Shadow</Text>
          <Text className="text-red-700 text-sm">shadowColor="#ef4444"</Text>
        </DropShadowView>
      </View>

      <SectionTitle title="Platform-Specific Overrides" />
      <View className="gap-8">
        <DropShadowView
          className="bg-surface-1 p-4 rounded-lg"
          shadowSize="md"
          iosShadowStyle={{
            shadowOffset: { width: 4, height: 4 },
            shadowOpacity: 0.3,
            shadowRadius: 8,
          }}
          androidShadowStyle={{
            elevation: 10,
          }}
        >
          <Text className="text-foreground font-semibold">
            Custom iOS & Android
          </Text>
          <Text className="text-muted-foreground text-sm">
            iOS: offset 4x4, opacity 0.3, radius 8
          </Text>
          <Text className="text-muted-foreground text-sm">
            Android: elevation 10
          </Text>
        </DropShadowView>

        <DropShadowView
          className="bg-surface-1 p-4 rounded-lg"
          shadowSize="lg"
          shadowColor="rgba(59, 130, 246, 0.5)"
          iosShadowStyle={{
            shadowOffset: { width: 0, height: 10 },
            shadowRadius: 20,
          }}
          androidShadowStyle={{
            elevation: 16,
          }}
        >
          <Text className="text-foreground font-semibold">Dramatic Shadow</Text>
          <Text className="text-muted-foreground text-sm">
            Semi-transparent blue shadow with custom platform styles
          </Text>
        </DropShadowView>
      </View>

      <SectionTitle title="Layout Examples" />
      <View className="gap-8">
        <View className="flex-row gap-4">
          <DropShadowView
            className="flex-1 bg-surface-1 p-4 rounded-lg"
            shadowSize="sm"
          >
            <Text className="text-foreground text-center">Left</Text>
          </DropShadowView>
          <DropShadowView
            className="flex-1 bg-surface-2 p-4 rounded-lg"
            shadowSize="sm"
          >
            <Text className="text-foreground text-center">Right</Text>
          </DropShadowView>
        </View>

        <DropShadowView className="bg-surface-1 p-6 rounded-lg" shadowSize="md">
          <Text className="text-lg font-semibold text-foreground mb-2">
            Card Component
          </Text>
          <Text className="text-muted-foreground mb-4">
            This is a card-like component with a drop shadow that automatically
            adapts to the current theme (light/dark).
          </Text>
          <View className="flex-row gap-2">
            <View className="bg-accent px-3 py-1 rounded">
              <Text className="text-accent-foreground text-sm">Action 1</Text>
            </View>
            <View className="bg-accent-soft px-3 py-1 rounded">
              <Text className="text-accent-soft-foreground text-sm">
                Action 2
              </Text>
            </View>
          </View>
        </DropShadowView>
      </View>

      <SectionTitle title="Platform Notes" />
      <View className="gap-8">
        <DropShadowView className="bg-surface-1 p-4 rounded-lg" shadowSize="md">
          <Text className="text-foreground font-semibold mb-2">
            iOS Shadow Properties
          </Text>
          <Text className="text-muted-foreground text-sm">
            • shadowColor - Full color support
          </Text>
          <Text className="text-muted-foreground text-sm">
            • shadowOffset - Direction and distance
          </Text>
          <Text className="text-muted-foreground text-sm">
            • shadowOpacity - Transparency control
          </Text>
          <Text className="text-muted-foreground text-sm">
            • shadowRadius - Blur amount
          </Text>
        </DropShadowView>

        <DropShadowView className="bg-surface-1 p-4 rounded-lg" shadowSize="md">
          <Text className="text-foreground font-semibold mb-2">
            Android Shadow Properties
          </Text>
          <Text className="text-muted-foreground text-sm">
            • shadowColor - Works with elevation
          </Text>
          <Text className="text-muted-foreground text-sm">
            • elevation - Material Design shadow depth
          </Text>
          <Text className="text-muted-foreground text-sm">
            Note: Other shadow properties are ignored on Android
          </Text>
          <Text className="text-muted-foreground text-sm font-semibold mt-2">
            ⚠️ Android requires background color for shadows
          </Text>
        </DropShadowView>
      </View>
    </ScreenScrollView>
  );
}
