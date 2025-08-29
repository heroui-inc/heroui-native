/* eslint-disable react-native/no-inline-styles */
import { DropShadowView } from 'heroui-native';
import { View } from 'react-native';

import { AppText } from '../../../components/app-text';
import { ScreenScrollView } from '../../../components/screen-scroll-view';
import { SectionTitle } from '../../../components/section-title';

export default function DropShadowViewScreen() {
  return (
    <ScreenScrollView contentContainerClassName="gap-16">
      <SectionTitle title="Shadow Sizes" />
      <View className="gap-8">
        <DropShadowView
          className="bg-surface-1 p-4 rounded-lg"
          shadowSize="none"
        >
          <AppText className="text-foreground font-semibold">No Shadow</AppText>
          <AppText className="text-muted-foreground text-sm">
            shadowSize="none"
          </AppText>
        </DropShadowView>

        <DropShadowView className="bg-surface-1 p-4 rounded-lg" shadowSize="xs">
          <AppText className="text-foreground font-semibold">
            Extra Small
          </AppText>
          <AppText className="text-muted-foreground text-sm">
            shadowSize="xs"
          </AppText>
        </DropShadowView>

        <DropShadowView className="bg-surface-1 p-4 rounded-lg" shadowSize="sm">
          <AppText className="text-foreground font-semibold">Small</AppText>
          <AppText className="text-muted-foreground text-sm">
            shadowSize="sm"
          </AppText>
        </DropShadowView>

        <DropShadowView className="bg-surface-1 p-4 rounded-lg" shadowSize="md">
          <AppText className="text-foreground font-semibold">
            Medium (Default)
          </AppText>
          <AppText className="text-muted-foreground text-sm">
            shadowSize="md"
          </AppText>
        </DropShadowView>

        <DropShadowView className="bg-surface-1 p-4 rounded-lg" shadowSize="lg">
          <AppText className="text-foreground font-semibold">Large</AppText>
          <AppText className="text-muted-foreground text-sm">
            shadowSize="lg"
          </AppText>
        </DropShadowView>

        <DropShadowView className="bg-surface-1 p-4 rounded-lg" shadowSize="xl">
          <AppText className="text-foreground font-semibold">
            Extra Large
          </AppText>
          <AppText className="text-muted-foreground text-sm">
            shadowSize="xl"
          </AppText>
        </DropShadowView>
      </View>

      <SectionTitle title="Custom Colors" />
      <View className="gap-8">
        <DropShadowView
          className="bg-blue-100 p-4 rounded-lg"
          shadowSize="xl"
          shadowColor="#3b82f6"
        >
          <AppText className="text-blue-900 font-semibold">Blue Shadow</AppText>
          <AppText className="text-blue-700 text-sm">
            shadowColor="#3b82f6"
          </AppText>
        </DropShadowView>

        <DropShadowView
          className="bg-emerald-100 p-4 rounded-lg"
          shadowSize="xl"
          shadowColor="#10b981"
        >
          <AppText className="text-emerald-900 font-semibold">
            Green Shadow
          </AppText>
          <AppText className="text-emerald-700 text-sm">
            shadowColor="#10b981"
          </AppText>
        </DropShadowView>

        <DropShadowView
          className="bg-violet-100 p-4 rounded-lg"
          shadowSize="xl"
          shadowColor="#8b5cf6"
        >
          <AppText className="text-violet-900 font-semibold">
            Purple Shadow
          </AppText>
          <AppText className="text-violet-700 text-sm">
            shadowColor="#8b5cf6"
          </AppText>
        </DropShadowView>

        <DropShadowView
          className="bg-red-100 p-4 rounded-lg"
          shadowSize="xl"
          shadowColor="#ef4444"
        >
          <AppText className="text-red-900 font-semibold">Red Shadow</AppText>
          <AppText className="text-red-700 text-sm">
            shadowColor="#ef4444"
          </AppText>
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
          <AppText className="text-foreground font-semibold">
            Custom iOS & Android
          </AppText>
          <AppText className="text-muted-foreground text-sm">
            iOS: offset 4x4, opacity 0.3, radius 8
          </AppText>
          <AppText className="text-muted-foreground text-sm">
            Android: elevation 10
          </AppText>
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
          <AppText className="text-foreground font-semibold">
            Dramatic Shadow
          </AppText>
          <AppText className="text-muted-foreground text-sm">
            Semi-transparent blue shadow with custom platform styles
          </AppText>
        </DropShadowView>
      </View>

      <SectionTitle title="Layout Examples" />
      <View className="gap-8">
        <View className="flex-row gap-4">
          <DropShadowView
            className="flex-1 bg-surface-1 p-4 rounded-lg"
            shadowSize="sm"
          >
            <AppText className="text-foreground text-center">Left</AppText>
          </DropShadowView>
          <DropShadowView
            className="flex-1 bg-surface-2 p-4 rounded-lg"
            shadowSize="sm"
          >
            <AppText className="text-foreground text-center">Right</AppText>
          </DropShadowView>
        </View>

        <DropShadowView className="bg-surface-1 p-6 rounded-lg" shadowSize="md">
          <AppText className="text-lg font-semibold text-foreground mb-2">
            Card Component
          </AppText>
          <AppText className="text-muted-foreground mb-4">
            This is a card-like component with a drop shadow that automatically
            adapts to the current theme (light/dark).
          </AppText>
          <View className="flex-row gap-2">
            <View className="bg-accent px-3 py-1 rounded">
              <AppText className="text-accent-foreground text-sm">
                Action 1
              </AppText>
            </View>
            <View className="bg-accent-soft px-3 py-1 rounded">
              <AppText className="text-accent-soft-foreground text-sm">
                Action 2
              </AppText>
            </View>
          </View>
        </DropShadowView>
      </View>

      <SectionTitle title="Platform Notes" />
      <View className="gap-8">
        <DropShadowView className="bg-surface-1 p-4 rounded-lg" shadowSize="md">
          <AppText className="text-foreground font-semibold mb-2">
            iOS Shadow Properties
          </AppText>
          <AppText className="text-muted-foreground text-sm">
            • shadowColor - Full color support
          </AppText>
          <AppText className="text-muted-foreground text-sm">
            • shadowOffset - Direction and distance
          </AppText>
          <AppText className="text-muted-foreground text-sm">
            • shadowOpacity - Transparency control
          </AppText>
          <AppText className="text-muted-foreground text-sm">
            • shadowRadius - Blur amount
          </AppText>
        </DropShadowView>

        <DropShadowView className="bg-surface-1 p-4 rounded-lg" shadowSize="md">
          <AppText className="text-foreground font-semibold mb-2">
            Android Shadow Properties
          </AppText>
          <AppText className="text-muted-foreground text-sm">
            • shadowColor - Works with elevation
          </AppText>
          <AppText className="text-muted-foreground text-sm">
            • elevation - Material Design shadow depth
          </AppText>
          <AppText className="text-muted-foreground text-sm">
            Note: Other shadow properties are ignored on Android
          </AppText>
          <AppText className="text-muted-foreground text-sm font-semibold mt-2">
            ⚠️ Android requires background color for shadows
          </AppText>
        </DropShadowView>
      </View>
    </ScreenScrollView>
  );
}
