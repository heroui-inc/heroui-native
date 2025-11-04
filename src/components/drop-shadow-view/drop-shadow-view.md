# DropShadowView

Container that wraps children with platform-specific drop shadows.

## Imports

Note: Before importing this component, ensure you have completed the setup as per the [Quick Start guide](../../../README.md).

```tsx
import { DropShadowView } from 'heroui-native';
```

## Usage

### Basic Usage

The DropShadowView component provides optimized shadow rendering with automatic theme awareness.

```tsx
<DropShadowView>...</DropShadowView>
```

### Shadow Sizes

Control shadow depth with preset sizes from none to extra large.

```tsx
<DropShadowView shadowSize="none">...</DropShadowView>

<DropShadowView shadowSize="xs">...</DropShadowView>

<DropShadowView shadowSize="sm">...</DropShadowView>

<DropShadowView shadowSize="md">...</DropShadowView>

<DropShadowView shadowSize="lg">...</DropShadowView>

<DropShadowView shadowSize="xl">...</DropShadowView>
```

### Custom Shadow Colors

Apply custom shadow colors that work across both platforms.

```tsx
<DropShadowView shadowColor="#3b82f6">...</DropShadowView>

<DropShadowView shadowColor="#10b981">...</DropShadowView>

<DropShadowView shadowColor="rgba(139, 92, 246, 0.5)">...</DropShadowView>
```

### Platform-Specific Customization

Fine-tune shadows for each platform using dedicated style props.

```tsx
<DropShadowView
  iosShadowStyle={{
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  }}
  androidShadowStyle={{
    elevation: 10,
  }}
>
  ...
</DropShadowView>
```

## Example

```tsx
import { DropShadowView } from 'heroui-native';
import { ScrollView, Text, View } from 'react-native';

export default function DropShadowViewExample() {
  return (
    <ScrollView className="bg-background p-4">
      <View className="gap-4">
        <DropShadowView className="bg-surface-1 p-4 rounded-lg" shadowSize="sm">
          <Text className="text-foreground font-semibold">Small Shadow</Text>
          <Text className="text-muted text-sm">
            Subtle elevation for cards and containers
          </Text>
        </DropShadowView>

        <DropShadowView className="bg-surface-1 p-6 rounded-lg" shadowSize="md">
          <Text className="text-lg font-semibold text-foreground mb-2">
            Card Component
          </Text>
          <Text className="text-muted mb-4">
            This card uses medium shadow for standard elevation.
          </Text>
          <View className="flex-row gap-2">
            <View className="bg-accent px-3 py-1 rounded">
              <Text className="text-accent-foreground text-sm">Action</Text>
            </View>
          </View>
        </DropShadowView>

        <DropShadowView
          className="bg-surface-1 p-4 rounded-lg"
          shadowSize="xl"
          shadowColor="red"
        >
          <Text className="text-red-900 font-semibold">Custom Blue Shadow</Text>
          <Text className="text-red-700 text-sm">
            Large shadow with custom color
          </Text>
        </DropShadowView>
      </View>
    </ScrollView>
  );
}
```

## API Reference

### DropShadowView

| prop                    | type                                             | default                                       | description                                      |
| ----------------------- | ------------------------------------------------ | --------------------------------------------- | ------------------------------------------------ |
| `children`              | `React.ReactNode`                                | -                                             | Content to be wrapped with the drop shadow       |
| `shadowSize`            | `'none' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'`                                        | Shadow size preset                               |
| `shadowColor`           | `string`                                         | `'black'` for light, `'white'` for dark theme | Shadow color                                     |
| `className`             | `string`                                         | -                                             | Additional CSS classes for styling               |
| `iosShadowStyle`        | `IOSShadowStyle`                                 | -                                             | iOS-specific shadow style overrides              |
| `androidShadowStyle`    | `AndroidShadowStyle`                             | -                                             | Android-specific shadow style overrides          |
| `...Animated.ViewProps` | `Animated.ViewProps`                             | -                                             | All Reanimated Animated.View props are supported |

### IOSShadowStyle

| prop            | type                         | description                                     |
| --------------- | ---------------------------- | ----------------------------------------------- |
| `shadowColor`   | `ViewStyle['shadowColor']`   | Shadow color                                    |
| `shadowOffset`  | `ViewStyle['shadowOffset']`  | Shadow offset `{width: number, height: number}` |
| `shadowOpacity` | `ViewStyle['shadowOpacity']` | Shadow opacity (0-1)                            |
| `shadowRadius`  | `ViewStyle['shadowRadius']`  | Shadow blur radius                              |

### AndroidShadowStyle

| prop          | type                       | description             |
| ------------- | -------------------------- | ----------------------- |
| `shadowColor` | `ViewStyle['shadowColor']` | Shadow color            |
| `elevation`   | `ViewStyle['elevation']`   | Shadow elevation (0-24) |
