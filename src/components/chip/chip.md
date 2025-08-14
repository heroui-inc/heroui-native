# Chip

Displays a compact element with label and optional icons.

## Interactive Demo

[Interactive demo placeholder - will be added to documentation site]

## Imports

Note: Before importing this component, ensure you have completed the setup as per the [Quick Start guide](../../../README.md).

```tsx
import { Chip } from 'heroui-native';
```

## Usage

### Basic Usage

Add label to display a text content.

```tsx
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
import { X, Star } from 'lucide-react-native';
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
          <Star size={12} color="#F59E0B" fill="#F59E0B" />
        </Chip.StartContent>
        <Chip.Label>Premium</Chip.Label>
      </Chip>

      <Chip variant="tertiary" color="danger">
        <Chip.Label>Remove</Chip.Label>
        <Chip.EndContent>
          <X size={16} color="#EF4444" />
        </Chip.EndContent>
      </Chip>
    </View>
  );
}
```

## Anatomy

```tsx
<Chip>
  <Chip.StartContent>...</Chip.StartContent>
  <Chip.Label>...</Chip.Label>
  <Chip.EndContent>...</Chip.EndContent>
</Chip>
```

- **Chip**: Main container that displays a compact element. Supports three variants and five colors.
- **Chip.StartContent**: Optional leading content displayed before the label. Use for icons or other visual elements at the start of the chip.
- **Chip.Label**: Text content of the chip. Inherits size, variant, and color from parent Chip via context.
- **Chip.EndContent**: Optional trailing content displayed after the label. Use for icons, badges, or interactive elements at the end of the chip.

## API Reference

### Chip

| prop           | type                                                          | default     | description                                        |
| -------------- | ------------------------------------------------------------- | ----------- | -------------------------------------------------- |
| `children`     | `React.ReactNode`                                             | -           | Child elements to render inside the chip           |
| `size`         | `'sm' \| 'md' \| 'lg'`                                        | `'md'`      | Size of the chip                                   |
| `variant`      | `'primary' \| 'secondary' \| 'tertiary'`                      | `'primary'` | Visual variant of the chip                         |
| `color`        | `'accent' \| 'default' \| 'success' \| 'warning' \| 'danger'` | `'accent'`  | Color theme of the chip                            |
| `className`    | `string`                                                      | -           | Custom class name for the chip                     |
| `...ViewProps` | `ViewProps`                                                   | -           | All standard React Native View props are supported |

### Chip.StartContent

| prop           | type              | default | description                                        |
| -------------- | ----------------- | ------- | -------------------------------------------------- |
| `children`     | `React.ReactNode` | -       | Child elements to render inside the start content  |
| `className`    | `string`          | -       | Custom class name for the start content            |
| `...ViewProps` | `ViewProps`       | -       | All standard React Native View props are supported |

### Chip.Label

| prop           | type              | default | description                                        |
| -------------- | ----------------- | ------- | -------------------------------------------------- |
| `children`     | `React.ReactNode` | -       | Child elements to render as the label              |
| `className`    | `string`          | -       | Custom class name for the label                    |
| `...TextProps` | `TextProps`       | -       | All standard React Native Text props are supported |

### Chip.EndContent

| prop           | type              | default | description                                        |
| -------------- | ----------------- | ------- | -------------------------------------------------- |
| `children`     | `React.ReactNode` | -       | Child elements to render inside the end content    |
| `className`    | `string`          | -       | Custom class name for the end content              |
| `...ViewProps` | `ViewProps`       | -       | All standard React Native View props are supported |
