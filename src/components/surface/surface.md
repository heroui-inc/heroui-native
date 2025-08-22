# Surface

Container component that provides elevation and background styling.

## Imports

Note: Before importing this component, ensure you have completed the setup as per the [Quick Start guide](../../../README.md).

```tsx
import { Surface } from 'heroui-native';
```

## Usage

### Basic Usage

The Surface component creates a container with consistent padding and styling.

```tsx
<Surface>...</Surface>
```

### Variants

Control the visual appearance with different elevation levels.

```tsx
<Surface variant="none">
  ...
</Surface>

<Surface variant="1">
  ...
</Surface>

<Surface variant="2">
  ...
</Surface>

<Surface variant="3">
  ...
</Surface>
```

### Nested Surfaces

Create visual hierarchy by nesting surfaces with different variants.

```tsx
<Surface variant="1">
  ...
  <Surface variant="2">
    ...
    <Surface variant="3">...</Surface>
  </Surface>
</Surface>
```

### Custom Styling

Apply custom styles using className or style props.

```tsx
<Surface className="bg-accent-soft">
  ...
</Surface>

<Surface variant="none" className="p-0">
  ...
</Surface>
```

## Example

```tsx
import { Surface } from 'heroui-native';
import { Text, View } from 'react-native';

export default function SurfaceExample() {
  return (
    <View className="gap-4 p-4">
      <Surface variant="1">
        <View className="gap-2">
          <Text className="text-lg font-semibold text-foreground">
            Card Title
          </Text>
          <Text className="text-muted-foreground">
            This is a surface component that provides consistent elevation and
            styling for content containers.
          </Text>
        </View>
      </Surface>

      <View className="flex-row gap-4">
        <Surface variant="2" className="flex-1">
          <Text className="text-foreground text-center">Left Panel</Text>
        </Surface>
        <Surface variant="3" className="flex-1">
          <Text className="text-foreground text-center">Right Panel</Text>
        </Surface>
      </View>
    </View>
  );
}
```

## API Reference

### Surface

| prop           | type                          | default | description                                            |
| -------------- | ----------------------------- | ------- | ------------------------------------------------------ |
| `variant`      | `'none' \| '1' \| '2' \| '3'` | `'1'`   | Visual variant controlling background color and border |
| `children`     | `React.ReactNode`             | -       | Content to be rendered inside the surface              |
| `className`    | `string`                      | -       | Additional CSS classes to apply                        |
| `...ViewProps` | `ViewProps`                   | -       | All standard React Native View props are supported     |
