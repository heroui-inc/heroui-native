# Chip

Displays a compact element with label and optional icons.

## Imports

Note: Before importing this component, ensure you have completed the setup as per the [Quick Start guide](../../../README.md).

```tsx
import { Chip } from 'heroui-native';
```

## Usage

### Basic Usage

Add label with string or compound structure.

```tsx
<Chip>Basic Chip</Chip>

<Chip>
  <Chip.Label>Basic Chip</Chip.Label>
</Chip>
```

### With Background

Add custom background like gradients using absolute positioned background.

```tsx
<Chip>
  <Chip.Background>
    <LinearGradient colors={['#FF6B6B', '#4ECDC4']} style={{ flex: 1 }} />
  </Chip.Background>
  <Chip.Label>Gradient</Chip.Label>
</Chip>
```

### Size Variants

Control the chip size with three available options.

```tsx
<Chip size="sm">...</Chip>
<Chip size="md">...</Chip>
<Chip size="lg">...</Chip>
```

### Visual Variants

Choose from three visual styles for different emphasis levels.

```tsx
<Chip variant="primary">...</Chip>
<Chip variant="secondary">...</Chip>
<Chip variant="tertiary">...</Chip>
```

### Color Variants

Apply different colors for semantic meaning.

```tsx
<Chip color="accent">...</Chip>
<Chip color="default">...</Chip>
<Chip color="success">...</Chip>
<Chip color="warning">...</Chip>
<Chip color="danger">...</Chip>
```

## Example

```tsx
import { Chip } from 'heroui-native';
import { View } from 'react-native';

export default function ChipExample() {
  return (
    <View className="flex-row gap-4">
      <Chip variant="secondary" color="success">
        Completed
      </Chip>

      <Chip variant="primary" color="warning">
        Premium
      </Chip>

      <Chip variant="tertiary" color="danger">
        Danger
      </Chip>
    </View>
  );
}
```

## Anatomy

```tsx
<Chip>
  <Chip.Background>...</Chip.Background>
  <Chip.Label>...</Chip.Label>
</Chip>
```

- **Chip**: Main container that displays a compact element. Accepts string children directly or compound components for custom layouts.
- **Chip.Background**: Optional background element with absolute positioning. Rendered beneath all other content for gradients or custom backgrounds.
- **Chip.Label**: Text content of the chip. When string is provided, renders as Text. Otherwise renders children as-is.

## API Reference

### Chip

| prop               | type                                                          | default     | description                                                               |
| ------------------ | ------------------------------------------------------------- | ----------- | ------------------------------------------------------------------------- |
| `children`         | `React.ReactNode`                                             | -           | Child elements to render inside the chip. String children render as label |
| `size`             | `'sm' \| 'md' \| 'lg'`                                        | `'md'`      | Size of the chip                                                          |
| `variant`          | `'primary' \| 'secondary' \| 'tertiary'`                      | `'primary'` | Visual variant of the chip                                                |
| `color`            | `'accent' \| 'default' \| 'success' \| 'warning' \| 'danger'` | `'accent'`  | Color theme of the chip                                                   |
| `className`        | `string`                                                      | -           | Custom class name for the chip                                            |
| `...AnimatedProps` | `AnimatedProps<PressableProps>`                               | -           | All Reanimated AnimatedPressable props are supported                      |

### Chip.Background

| prop               | type                       | default | description                                      |
| ------------------ | -------------------------- | ------- | ------------------------------------------------ |
| `children`         | `React.ReactNode`          | -       | Content to be rendered as the chip background    |
| `className`        | `string`                   | -       | Custom class name for the background             |
| `...AnimatedProps` | `AnimatedProps<ViewProps>` | -       | All Reanimated Animated.View props are supported |

### Chip.Label

| prop               | type                       | default | description                                                                         |
| ------------------ | -------------------------- | ------- | ----------------------------------------------------------------------------------- |
| `children`         | `React.ReactNode`          | -       | Child elements to render as the label. If string, will be wrapped in Text component |
| `className`        | `string`                   | -       | Custom class name for the label                                                     |
| `classNames`       | `ElementSlots<LabelSlots>` | -       | Additional CSS classes for the different parts of the label                         |
| `textProps`        | `TextProps`                | -       | Additional props to pass to the Text component when children is a string            |
| `...AnimatedProps` | `AnimatedProps<ViewProps>` | -       | All Reanimated Animated.View props are supported                                    |

#### ElementSlots<LabelSlots>

| prop        | type     | description                                  |
| ----------- | -------- | -------------------------------------------- |
| `container` | `string` | Custom class name for the label container    |
| `text`      | `string` | Custom class name for the label text element |
