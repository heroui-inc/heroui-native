# Button

Interactive component that triggers an action when pressed.

## Imports

Note: Before importing this component, ensure you have completed the setup as per the [Quick Start guide](../../../README.md).

```tsx
import { Button } from 'heroui-native';
```

## Usage

### Basic Usage

The Button component accepts string children that automatically render as label.

```tsx
<Button>Basic Button</Button>
```

### With Compound Parts

Use Button.Label for explicit control over the label component.

```tsx
<Button>
  <Button.Label>Click me</Button.Label>
</Button>
```

### With Icons

Combine icons with labels for enhanced visual communication.

```tsx
<Button>
  <Icon name="add" size={20} />
  <Button.Label>Add Item</Button.Label>
</Button>

<Button>
  <Button.Label>Download</Button.Label>
  <Icon name="download" size={18} />
</Button>
```

### Icon Only

Create square icon-only buttons using the isIconOnly prop.

```tsx
<Button isIconOnly>
  <Icon name="heart" size={18} />
</Button>
```

### Sizes

Control button dimensions with three size options.

```tsx
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>
```

### Variants

Choose from six visual variants for different emphasis levels.

```tsx
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="tertiary">Tertiary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="destructive-soft">Destructive Soft</Button>

```

### Loading State with Spinner

Transform button to loading state with spinner animation.

```tsx
const themeColorAccentForeground = useThemeColor('accent-foreground');

<Button
  variant="primary"
  onPress={() => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
    }, 3000);
  }}
  isIconOnly={isDownloading}
  className="self-center"
>
  {isDownloading ? (
    <Spinner entering={FadeIn.delay(50)} color={themeColorAccentForeground} />
  ) : (
    'Download now'
  )}
</Button>;
```

### Custom Background with LinearGradient

Add gradient backgrounds using absolute positioned elements.

```tsx
<Button>
  <LinearGradient
    colors={['#9333ea', '#ec4899']}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
    style={StyleSheet.absoluteFill}
  />
  <Button.Label className="text-white font-bold">Gradient</Button.Label>
</Button>
```

## Example

```tsx
import { Button, useThemeColor } from 'heroui-native';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';

export default function ButtonExample() {
  const themeColorAccentForeground = useThemeColor('accent-foreground');
  const themeColorAccentSoftForeground = useThemeColor(
    'accent-soft-foreground'
  );
  const themeColorDangerForeground = useThemeColor('danger-foreground');
  const themeColorDefaultForeground = useThemeColor('default-foreground');

  return (
    <View className="gap-4 p-4">
      <Button variant="primary">
        <Ionicons name="add" size={20} color={themeColorAccentForeground} />
        <Button.Label>Add Item</Button.Label>
      </Button>

      <View className="flex-row gap-4">
        <Button size="sm" isIconOnly>
          <Ionicons name="heart" size={16} color={themeColorAccentForeground} />
        </Button>
        <Button size="sm" variant="secondary" isIconOnly>
          <Ionicons
            name="bookmark"
            size={16}
            color={themeColorAccentSoftForeground}
          />
        </Button>
        <Button size="sm" variant="destructive" isIconOnly>
          <Ionicons name="trash" size={16} color={themeColorDangerForeground} />
        </Button>
      </View>

      <Button variant="tertiary">
        <Button.Label>Learn More</Button.Label>
        <Ionicons
          name="chevron-forward"
          size={18}
          color={themeColorDefaultForeground}
        />
      </Button>
    </View>
  );
}
```

## Anatomy

```tsx
<Button>
  <Button.Label>...</Button.Label>
</Button>
```

- **Button**: Main container that handles press interactions, animations, and variants. Renders string children as label or accepts compound components for custom layouts.
- **Button.Label**: Text content of the button. Inherits size and variant styling from parent Button context.

## API Reference

### Button

| prop                         | type                                                                                       | default     | description                                                    |
| ---------------------------- | ------------------------------------------------------------------------------------------ | ----------- | -------------------------------------------------------------- |
| `children`                   | `React.ReactNode`                                                                          | -           | Content to be rendered inside the button                       |
| `variant`                    | `'primary' \| 'secondary' \| 'tertiary' \| 'ghost' \| 'destructive' \| 'destructive-soft'` | `'primary'` | Visual variant of the button                                   |
| `size`                       | `'sm' \| 'md' \| 'lg'`                                                                     | `'md'`      | Size of the button                                             |
| `isIconOnly`                 | `boolean`                                                                                  | `false`     | Whether the button displays an icon only (square aspect ratio) |
| `isDisabled`                 | `boolean`                                                                                  | `false`     | Whether the button is disabled                                 |
| `className`                  | `string`                                                                                   | -           | Additional CSS classes                                         |
| `animationConfig`            | `AnimationConfig`                                                                          | -           | Scale on press animation configuration                         |
| `skipLayoutAnimation`        | `boolean`                                                                                  | `false`     | Whether to skip the layout animation                           |
| `...Animated.PressableProps` | `Animated.PressableProps`                                                                  | -           | All Reanimated AnimatedPressable props are supported           |

#### AnimationConfig

Configuration object for button press animations including scale and highlight effects.

| prop        | type                       | description                                   |
| ----------- | -------------------------- | --------------------------------------------- |
| `scale`     | `ScaleAnimationConfig`     | Configuration for scale animation on press    |
| `highlight` | `HighlightAnimationConfig` | Configuration for highlight/overlay animation |

##### ScaleAnimationConfig

| prop         | type               | default | description                                   |
| ------------ | ------------------ | ------- | --------------------------------------------- |
| `scale`      | `number`           | `0.995` | Target scale value when button is pressed     |
| `config`     | `WithTimingConfig` | -       | Reanimated timing configuration for animation |
| `isDisabled` | `boolean`          | `false` | Whether to disable the scale animation        |

##### HighlightAnimationConfig

| prop         | type               | default | description                                                       |
| ------------ | ------------------ | ------- | ----------------------------------------------------------------- |
| `opacity`    | `number`           | `0.2`   | Opacity of the highlight overlay when pressed                     |
| `color`      | `string`           | auto    | Color of the highlight overlay (auto-calculated based on variant) |
| `config`     | `WithTimingConfig` | -       | Reanimated timing configuration for animation                     |
| `isDisabled` | `boolean`          | `false` | Whether to disable the highlight animation                        |

### Button.Label

| prop                    | type                 | default | description                                      |
| ----------------------- | -------------------- | ------- | ------------------------------------------------ |
| `children`              | `React.ReactNode`    | -       | Content to be rendered as label                  |
| `className`             | `string`             | -       | Additional CSS classes                           |
| `...Animated.TextProps` | `Animated.TextProps` | -       | All Reanimated Animated.Text props are supported |
