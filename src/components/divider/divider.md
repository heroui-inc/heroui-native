# Divider

A simple line to separate content visually.

## Interactive Demo

[Interactive demo placeholder - will be added to documentation site]

## Imports

Note: Before importing this component, ensure you have completed the setup as per the [Quick Start guide](../../../README.md).

```tsx
import { Divider } from 'heroui-native';
```

## Usage

### Basic Usage

The Divider component creates a visual separation between content sections.

```tsx
<Divider />
```

### Orientation

Control the direction of the divider with the `orientation` prop.

```tsx
<View>
  <Text>Horizontal divider</Text>
  <Divider orientation="horizontal" />
  <Text>Content below</Text>
</View>

<View className="h-24 flex-row">
  <Text>Left</Text>
  <Divider orientation="vertical" />
  <Text>Right</Text>
</View>
```

### Variants

Choose between thin and thick variants for different visual emphasis.

```tsx
<Divider variant="thin" />
<Divider variant="thick" />
```

### Custom Thickness

Set a specific thickness value for precise control.

```tsx
<Divider thickness={1} />
<Divider thickness={5} />
<Divider thickness={10} />
```

## Example

```tsx
import { Divider, Surface } from 'heroui-native';
import { Text, View } from 'react-native';

export default function DividerExample() {
  return (
    <Surface variant="2">
      <Text className="text-base font-medium text-foreground">
        HeroUI Native
      </Text>
      <Text className="text-sm text-muted-foreground">
        A modern React Native component library.
      </Text>

      <Divider className="my-4" />

      <View className="flex-row items-center h-5">
        <Text className="text-sm text-foreground">Components</Text>

        <Divider orientation="vertical" className="mx-3" />

        <Text className="text-sm text-foreground">Themes</Text>

        <Divider orientation="vertical" className="mx-3" />

        <Text className="text-sm text-foreground">Examples</Text>
      </View>
    </Surface>
  );
}
```

## API Reference

### Divider

| prop           | type                         | default        | description                                                                                  |
| -------------- | ---------------------------- | -------------- | -------------------------------------------------------------------------------------------- |
| `variant`      | `'thin' \| 'thick'`          | `'thin'`       | Variant style of the divider                                                                 |
| `orientation`  | `'horizontal' \| 'vertical'` | `'horizontal'` | Orientation of the divider                                                                   |
| `thickness`    | `number`                     | `undefined`    | Custom thickness in pixels. Controls height for horizontal or width for vertical orientation |
| `className`    | `string`                     | `undefined`    | Additional CSS classes to apply                                                              |
| `...ViewProps` | `ViewProps`                  | -              | All standard React Native View props are supported                                           |
