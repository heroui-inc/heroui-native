# Spinner

Displays an animated loading indicator.

## Imports

Note: Before importing this component, ensure you have completed the setup as per the [Quick Start guide](../../../README.md).

```tsx
import { Spinner } from 'heroui-native';
```

## Usage

### Basic Usage

The Spinner component displays a rotating loading indicator.

```tsx
<Spinner />
```

### Sizes

Control the spinner size with the `size` prop.

```tsx
<Spinner size="sm" />
<Spinner size="md" />
<Spinner size="lg" />
```

### Colors

Use predefined color variants or custom colors.

```tsx
<Spinner color="default" />
<Spinner color="success" />
<Spinner color="warning" />
<Spinner color="danger" />
<Spinner color="#8B5CF6" />
```

### Loading State

Control the visibility of the spinner with the `isLoading` prop.

```tsx
<Spinner isLoading={true} />
<Spinner isLoading={false} />
```

### Animation Speed

Customize the rotation speed using the compound Indicator component.

```tsx
<Spinner>
  <Spinner.Indicator speed={0.5} />
</Spinner>

<Spinner>
  <Spinner.Indicator speed={2} />
</Spinner>
```

### Custom Icon

Replace the default spinner icon with custom content.

```tsx
const themeColorForeground = useThemeColor('foreground')

<Spinner>
  <Spinner.Indicator>
    <Ionicons name="refresh" size={24} color={themeColorForeground} />
  </Spinner.Indicator>
</Spinner>

<Spinner>
  <Spinner.Indicator>
    <Text>⏳</Text>
  </Spinner.Indicator>
</Spinner>
```

## Example

```tsx
import { Spinner } from 'heroui-native';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function SpinnerExample() {
  const [isLoading, setIsLoading] = React.useState(true);

  return (
    <View className="gap-4 p-4 bg-background">
      <View className="flex-row items-center gap-2 p-4 rounded-lg bg-stone-200">
        <Spinner size="sm" color="default" />
        <Text className="text-stone-500">Loading content...</Text>
      </View>

      <View className="items-center p-8 rounded-2xl bg-stone-200">
        <Spinner size="lg" color="success" isLoading={isLoading} />
        <Text className="text-stone-500 mt-4">Processing...</Text>
        <TouchableOpacity onPress={() => setIsLoading(!isLoading)}>
          <Text className="text-primary mt-2 text-sm">
            {isLoading ? 'Tap to stop' : 'Tap to start'}
          </Text>
        </TouchableOpacity>
      </View>

      <View className="flex-row gap-4 items-center justify-center">
        <Spinner size="md" color="#EC4899">
          <Spinner.Indicator speed={0.7}>
            <Ionicons name="refresh" size={24} color="#EC4899" />
          </Spinner.Indicator>
        </Spinner>
      </View>
    </View>
  );
}
```

## Anatomy

```tsx
<Spinner>
  <Spinner.Indicator>...</Spinner.Indicator>
</Spinner>
```

- **Spinner**: Main container that controls loading state, size, and color. Renders a default animated indicator if no children provided.
- **Spinner.Indicator**: Optional sub-component for customizing animation speed, easing, and icon appearance. Accepts custom children to replace the default icon.

## API Reference

### Spinner

| prop           | type                                                        | default     | description                                        |
| -------------- | ----------------------------------------------------------- | ----------- | -------------------------------------------------- |
| `children`     | `React.ReactNode`                                           | `undefined` | Content to render inside the spinner               |
| `size`         | `'sm' \| 'md' \| 'lg'`                                      | `'md'`      | Size of the spinner                                |
| `color`        | `'default' \| 'success' \| 'warning' \| 'danger' \| string` | `'default'` | Color theme of the spinner                         |
| `isLoading`    | `boolean`                                                   | `true`      | Whether the spinner is loading                     |
| `className`    | `string`                                                    | `undefined` | Custom class name for the spinner                  |
| `...ViewProps` | `ViewProps`                                                 | -           | All standard React Native View props are supported |

### Spinner.Indicator

| prop                    | type                         | default     | description                                      |
| ----------------------- | ---------------------------- | ----------- | ------------------------------------------------ |
| `children`              | `React.ReactNode`            | `undefined` | Content to render inside the indicator           |
| `speed`                 | `number`                     | `1`         | Speed in rounds per second                       |
| `animationEasing`       | `WithTimingConfig['easing']` | `undefined` | Reanimated timing easing for indicator           |
| `iconProps`             | `SpinnerIconProps`           | `undefined` | Props for the default icon                       |
| `className`             | `string`                     | `undefined` | Custom class name for the indicator element      |
| `...Animated.ViewProps` | `Animated.ViewProps`         | -           | All Reanimated Animated.View props are supported |

### SpinnerIconProps

| prop     | type               | default          | description        |
| -------- | ------------------ | ---------------- | ------------------ |
| `width`  | `number \| string` | `24`             | Width of the icon  |
| `height` | `number \| string` | `24`             | Height of the icon |
| `color`  | `string`           | `'currentColor'` | Color of the icon  |
