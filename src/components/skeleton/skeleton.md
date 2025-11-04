# Skeleton

Displays a loading placeholder with shimmer or pulse animation effects.

## Imports

Note: Before importing this component, ensure you have completed the setup as per the [Quick Start guide](../../../README.md).

```tsx
import { Skeleton } from 'heroui-native';
```

## Usage

### Basic Usage

The Skeleton component creates an animated placeholder while content is loading.

```tsx
<Skeleton className="h-20 w-full rounded-lg" />
```

### With Content

Show skeleton while loading, then display content when ready.

```tsx
<Skeleton isLoading={isLoading} className="h-20 rounded-lg">
  <View className="h-20 bg-primary rounded-lg">
    <Text>Loaded Content</Text>
  </View>
</Skeleton>
```

### Animation Types

Control the animation style with the `animationType` prop.

```tsx
<Skeleton animationType="shimmer" className="h-20 w-full rounded-lg" />
<Skeleton animationType="pulse" className="h-20 w-full rounded-lg" />
<Skeleton animationType="none" className="h-20 w-full rounded-lg" />
```

### Custom Shimmer Configuration

Customize the shimmer effect with duration, speed, and highlight color.

```tsx
<Skeleton
  className="h-16 w-full rounded-lg"
  animationType="shimmer"
  shimmerConfig={{
    duration: 2000,
    speed: 2,
    highlightColor: 'rgba(59, 130, 246, 0.3)',
  }}
>
  ...
</Skeleton>
```

### Custom Pulse Configuration

Configure pulse animation with duration and opacity range.

```tsx
<Skeleton
  className="h-16 w-full rounded-lg"
  animationType="pulse"
  pulseConfig={{
    duration: 500,
    minOpacity: 0.1,
    maxOpacity: 0.8,
  }}
>
  ...
</Skeleton>
```

### Shape Variations

Create different skeleton shapes using className for styling.

```tsx
<Skeleton className="h-4 w-full rounded-md" />
<Skeleton className="h-4 w-3/4 rounded-md" />
<Skeleton className="h-4 w-1/2 rounded-md" />
<Skeleton className="size-12 rounded-full" />
```

### Custom Enter/Exit Animations

Apply custom Reanimated transitions when skeleton appears or disappears.

```tsx
<Skeleton
  entering={FadeIn.duration(300)}
  exiting={FadeOut.duration(300)}
  isLoading={isLoading}
  className="h-20 w-full rounded-lg"
>
  ...
</Skeleton>
```

## Example

```tsx
import { Avatar, Card, Skeleton } from 'heroui-native';
import { useState } from 'react';
import { Image, Text, View } from 'react-native';

export default function SkeletonExample() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Card className="p-4">
      <View className="flex-row items-center gap-3 mb-4">
        <Skeleton isLoading={isLoading} className="h-10 w-10 rounded-full">
          <Avatar size="sm" alt="Avatar">
            <Avatar.Image source={{ uri: 'https://i.pravatar.cc/150?img=4' }} />
            <Avatar.Fallback />
          </Avatar>
        </Skeleton>

        <View className="flex-1 gap-1">
          <Skeleton isLoading={isLoading} className="h-3 w-32 rounded-md">
            <Text className="font-semibold text-foreground">John Doe</Text>
          </Skeleton>
          <Skeleton isLoading={isLoading} className="h-3 w-24 rounded-md">
            <Text className="text-sm text-muted">@johndoe</Text>
          </Skeleton>
        </View>
      </View>

      <Skeleton
        isLoading={isLoading}
        className="h-48 w-full rounded-lg"
        shimmerConfig={{
          duration: 1500,
          speed: 1,
        }}
      >
        <View className="h-48 bg-surface-tertiary rounded-lg overflow-hidden">
          <Image
            source={{
              uri: 'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/backgrounds/cards/car1.jpg',
            }}
            className="h-full w-full"
          />
        </View>
      </Skeleton>
    </Card>
  );
}
```

## API Reference

### Skeleton

| prop                    | type                             | default     | description                                      |
| ----------------------- | -------------------------------- | ----------- | ------------------------------------------------ |
| `children`              | `React.ReactNode`                | -           | Content to show when not loading                 |
| `isLoading`             | `boolean`                        | `true`      | Whether the skeleton is currently loading        |
| `animationType`         | `'shimmer' \| 'pulse' \| 'none'` | `'shimmer'` | Animation type                                   |
| `className`             | `string`                         | -           | Additional CSS classes for styling               |
| `shimmerConfig`         | `ShimmerConfig`                  | -           | Shimmer animation configuration                  |
| `pulseConfig`           | `PulseConfig`                    | -           | Pulse animation configuration                    |
| `...Animated.ViewProps` | `AnimatedProps<ViewProps>`       | -           | All Reanimated Animated.View props are supported |

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
| `minOpacity` | `number`         | Minimum opacity value (default: 0.5)               |
| `maxOpacity` | `number`         | Maximum opacity value (default: 1)                 |
