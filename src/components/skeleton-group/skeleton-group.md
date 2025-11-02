# SkeletonGroup

Coordinates multiple skeleton loading placeholders with centralized animation control.

## Imports

Note: Before importing this component, ensure you have completed the setup as per the [Quick Start guide](../../../README.md).

```tsx
import { SkeletonGroup } from 'heroui-native';
```

## Usage

### Basic Usage

The SkeletonGroup component manages multiple skeleton items with shared loading state and animation.

```tsx
<SkeletonGroup isLoading={isLoading}>
  <SkeletonGroup.Item className="h-4 w-full rounded-md" />
  <SkeletonGroup.Item className="h-4 w-3/4 rounded-md" />
  <SkeletonGroup.Item className="h-4 w-1/2 rounded-md" />
</SkeletonGroup>
```

### With Container Layout

Use className on the group to control layout of skeleton items.

```tsx
<SkeletonGroup isLoading={isLoading} className="flex-row items-center gap-3">
  <SkeletonGroup.Item className="h-12 w-12 rounded-lg" />
  <View className="flex-1 gap-1.5">
    <SkeletonGroup.Item className="h-4 w-full rounded-md" />
    <SkeletonGroup.Item className="h-3 w-2/3 rounded-md" />
  </View>
</SkeletonGroup>
```

### With isSkeletonOnly for Pure Skeleton Layouts

Use `isSkeletonOnly` when the group contains only skeleton placeholders with layout wrappers (like View) that have no content to render in the loaded state. This prop hides the entire group when `isLoading` is false, preventing empty containers from affecting your layout.

```tsx
<SkeletonGroup
  isLoading={isLoading}
  isSkeletonOnly // Hides entire group when isLoading is false
  className="flex-row items-center gap-3"
>
  <SkeletonGroup.Item className="h-12 w-12 rounded-lg" />
  {/* This View is only for layout, no content */}
  <View className="flex-1 gap-1.5">
    <SkeletonGroup.Item className="h-4 w-full rounded-md" />
    <SkeletonGroup.Item className="h-3 w-2/3 rounded-md" />
  </View>
</SkeletonGroup>
```

### With Animation Types

Control animation style for all items in the group.

```tsx
<SkeletonGroup isLoading={isLoading} animationType="pulse">
  <SkeletonGroup.Item className="h-10 w-10 rounded-full" />
  <SkeletonGroup.Item className="h-4 w-32 rounded-md" />
  <SkeletonGroup.Item className="h-3 w-24 rounded-md" />
</SkeletonGroup>
```

### With Custom Animation Configuration

Configure shimmer or pulse animations for the entire group.

```tsx
<SkeletonGroup
  isLoading={isLoading}
  animationType="shimmer"
  shimmerConfig={{
    duration: 2000,
    highlightColor: 'rgba(59, 130, 246, 0.3)',
  }}
>
  <SkeletonGroup.Item className="h-16 w-full rounded-lg" />
  <SkeletonGroup.Item className="h-4 w-3/4 rounded-md" />
</SkeletonGroup>
```

### With Enter/Exit Animations

Apply Reanimated transitions when the group appears or disappears.

```tsx
<SkeletonGroup
  entering={FadeInLeft}
  exiting={FadeOutRight}
  isLoading={isLoading}
  className="w-full gap-2"
>
  <SkeletonGroup.Item className="h-4 w-full rounded-md" />
  <SkeletonGroup.Item className="h-4 w-3/4 rounded-md" />
</SkeletonGroup>
```

## Example

```tsx
import { Card, SkeletonGroup, Avatar } from 'heroui-native';
import { useState } from 'react';
import { Text, View, Image } from 'react-native';

export default function SkeletonGroupExample() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <SkeletonGroup isLoading={isLoading}>
      <Card className="p-4">
        <Card.Header>
          <View className="flex-row items-center gap-3 mb-4">
            <SkeletonGroup.Item className="h-10 w-10 rounded-full">
              <Avatar size="sm" alt="Avatar">
                <Avatar.Image
                  source={{ uri: 'https://i.pravatar.cc/150?img=4' }}
                />
                <Avatar.Fallback />
              </Avatar>
            </SkeletonGroup.Item>

            <View className="flex-1 gap-1">
              <SkeletonGroup.Item className="h-3 w-32 rounded-md">
                <Text className="font-semibold text-foreground">John Doe</Text>
              </SkeletonGroup.Item>
              <SkeletonGroup.Item className="h-3 w-24 rounded-md">
                <Text className="text-sm text-muted">@johndoe</Text>
              </SkeletonGroup.Item>
            </View>
          </View>

          <View className="mb-4 gap-1.5">
            <SkeletonGroup.Item className="h-4 w-full rounded-md">
              <Text className="text-base text-foreground">
                This is the first line of the post content.
              </Text>
            </SkeletonGroup.Item>
            <SkeletonGroup.Item className="h-4 w-full rounded-md">
              <Text className="text-base text-foreground">
                Second line with more interesting content to read.
              </Text>
            </SkeletonGroup.Item>
            <SkeletonGroup.Item className="h-4 w-2/3 rounded-md">
              <Text className="text-base text-foreground">
                Last line is shorter.
              </Text>
            </SkeletonGroup.Item>
          </View>
        </Card.Header>

        <SkeletonGroup.Item className="h-48 w-full rounded-lg">
          <View className="h-48 bg-surface-tertiary rounded-lg overflow-hidden">
            <Image
              source={{
                uri: 'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/backgrounds/cards/car1.jpg',
              }}
              className="h-full w-full"
            />
          </View>
        </SkeletonGroup.Item>
      </Card>
    </SkeletonGroup>
  );
}
```

## Anatomy

```tsx
<SkeletonGroup>
  <SkeletonGroup.Item />
</SkeletonGroup>
```

- **SkeletonGroup**: Root container that provides centralized control for all skeleton items
- **SkeletonGroup.Item**: Individual skeleton item that inherits props from the parent group

## API Reference

### SkeletonGroup

| prop                    | type                             | default     | description                                                            |
| ----------------------- | -------------------------------- | ----------- | ---------------------------------------------------------------------- |
| `children`              | `React.ReactNode`                | -           | SkeletonGroup.Item components and layout elements                      |
| `isLoading`             | `boolean`                        | `true`      | Whether the skeleton items are currently loading                       |
| `isSkeletonOnly`        | `boolean`                        | `false`     | Hides entire group when isLoading is false (for skeleton-only layouts) |
| `animationType`         | `'shimmer' \| 'pulse' \| 'none'` | `'shimmer'` | Animation type for all items in the group                              |
| `className`             | `string`                         | -           | Additional CSS classes for the group container                         |
| `style`                 | `StyleProp<ViewStyle>`           | -           | Custom styles for the group container                                  |
| `shimmerConfig`         | `ShimmerConfig`                  | -           | Shimmer animation configuration for all items                          |
| `pulseConfig`           | `PulseConfig`                    | -           | Pulse animation configuration for all items                            |
| `...Animated.ViewProps` | `AnimatedProps<ViewProps>`       | -           | All Reanimated Animated.View props are supported                       |

#### ShimmerConfig

| prop             | type             | description                                        |
| ---------------- | ---------------- | -------------------------------------------------- |
| `duration`       | `number`         | Animation duration in milliseconds (default: 1500) |
| `easing`         | `EasingFunction` | Easing function for the animation                  |
| `speed`          | `number`         | Speed multiplier for the animation (default: 1)    |
| `highlightColor` | `string`         | Highlight color for the shimmer effect             |

#### PulseConfig

| prop         | type             | description                                        |
| ------------ | ---------------- | -------------------------------------------------- |
| `duration`   | `number`         | Animation duration in milliseconds (default: 1000) |
| `easing`     | `EasingFunction` | Easing function for the animation                  |
| `minOpacity` | `number`         | Minimum opacity value (default: 0.3)               |
| `maxOpacity` | `number`         | Maximum opacity value (default: 1)                 |

### SkeletonGroup.Item

| prop                    | type                             | default   | description                                                         |
| ----------------------- | -------------------------------- | --------- | ------------------------------------------------------------------- |
| `children`              | `React.ReactNode`                | -         | Content to show when not loading                                    |
| `isLoading`             | `boolean`                        | inherited | Whether the skeleton is currently loading (overrides group setting) |
| `animationType`         | `'shimmer' \| 'pulse' \| 'none'` | inherited | Animation type (overrides group setting)                            |
| `className`             | `string`                         | -         | Additional CSS classes for styling the item                         |
| `shimmerConfig`         | `ShimmerConfig`                  | inherited | Shimmer animation configuration (overrides group setting)           |
| `pulseConfig`           | `PulseConfig`                    | inherited | Pulse animation configuration (overrides group setting)             |
| `...Animated.ViewProps` | `AnimatedProps<ViewProps>`       | -         | All Reanimated Animated.View props are supported                    |

## Important Notes

### Props Inheritance

SkeletonGroup.Item components inherit all animation-related props from their parent SkeletonGroup:

- `isLoading`
- `animationType`
- `shimmerConfig`
- `pulseConfig`

Individual items can override any inherited prop by providing their own value.
