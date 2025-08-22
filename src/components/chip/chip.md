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

### With Start Content

Add icons or visual elements at the start of the chip.

```tsx
<Chip>
  <Chip.StartContent>...</Chip.StartContent>
  <Chip.Label>Featured</Chip.Label>
</Chip>
```

### With End Content

Add icons or interactive elements at the end of the chip.

```tsx
<Chip>
  <Chip.Label>Remove</Chip.Label>
  <Chip.EndContent>...</Chip.EndContent>
</Chip>
```

### With Both Contents

Combine start and end content for complex chips.

```tsx
<Chip>
  <Chip.StartContent>...</Chip.StartContent>
  <Chip.Label>Status</Chip.Label>
  <Chip.EndContent>...</Chip.EndContent>
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
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';

export default function ChipExample() {
  return (
    <View className="flex-row gap-4">
      <Chip variant="secondary" color="success">
        <Chip.StartContent>
          <View className="w-1.5 h-1.5 mr-1.5 rounded-full bg-success" />
        </Chip.StartContent>
        <Chip.Label>Completed</Chip.Label>
      </Chip>

      <Chip variant="primary" color="warning">
        <Chip.StartContent className="pr-1">
          <Ionicons name="star" size={12} color="#F59E0B" />
        </Chip.StartContent>
        <Chip.Label>Premium</Chip.Label>
      </Chip>

      <Chip variant="tertiary" color="danger">
        <Chip.Label>Remove</Chip.Label>
        <Chip.EndContent>
          <Ionicons name="close" size={16} color="#EF4444" />
        </Chip.EndContent>
      </Chip>
    </View>
  );
}
```

## Anatomy

```tsx
<Chip>
  <Chip.Background>...</Chip.Background>
  <Chip.StartContent>...</Chip.StartContent>
  <Chip.Label>...</Chip.Label>
  <Chip.EndContent>...</Chip.EndContent>
</Chip>
```

- **Chip**: Main container that displays a compact element. Accepts string children directly or compound components for custom layouts.
- **Chip.Background**: Optional background element with absolute positioning. Rendered beneath all other content for gradients or custom backgrounds.
- **Chip.StartContent**: Optional leading content displayed before the label. Use for icons or other visual elements at the start of the chip.
- **Chip.Label**: Text content of the chip. When string is provided, renders as Text. Otherwise renders children as-is.
- **Chip.EndContent**: Optional trailing content displayed after the label. Use for icons, badges, or interactive elements at the end of the chip.

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

### Chip.StartContent

| prop               | type                       | default | description                                       |
| ------------------ | -------------------------- | ------- | ------------------------------------------------- |
| `children`         | `React.ReactNode`          | -       | Child elements to render inside the start content |
| `className`        | `string`                   | -       | Custom class name for the start content           |
| `...AnimatedProps` | `AnimatedProps<ViewProps>` | -       | All Reanimated Animated.View props are supported  |

### Chip.Label

| prop               | type                       | default | description                                                                         |
| ------------------ | -------------------------- | ------- | ----------------------------------------------------------------------------------- |
| `children`         | `React.ReactNode`          | -       | Child elements to render as the label. If string, will be wrapped in Text component |
| `className`        | `string`                   | -       | Custom class name for the label                                                     |
| `classNames`       | `ElementSlots<LabelSlots>` | -       | Additional CSS classes for the different parts of the label                         |
| `...AnimatedProps` | `AnimatedProps<ViewProps>` | -       | All Reanimated Animated.View props are supported                                    |

#### ElementSlots<LabelSlots>

| prop        | type     | description                                  |
| ----------- | -------- | -------------------------------------------- |
| `container` | `string` | Custom class name for the label container    |
| `text`      | `string` | Custom class name for the label text element |

### Chip.EndContent

| prop               | type                       | default | description                                      |
| ------------------ | -------------------------- | ------- | ------------------------------------------------ |
| `children`         | `React.ReactNode`          | -       | Child elements to render inside the end content  |
| `className`        | `string`                   | -       | Custom class name for the end content            |
| `...AnimatedProps` | `AnimatedProps<ViewProps>` | -       | All Reanimated Animated.View props are supported |
