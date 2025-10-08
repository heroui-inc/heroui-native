# Button

Interactive component that triggers an action when pressed.

## Imports

Note: Before importing this component, ensure you have completed the setup as per the [Quick Start guide](../README.md).

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

Choose from five visual variants for different emphasis levels.

```tsx
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="tertiary">Tertiary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>
```

### Loading State with Spinner

Transform button to loading state with spinner animation.

```tsx
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
    <Spinner
      entering={FadeIn.delay(50)}
      color={colors.accentForeground}
    />
  ) : (
    'Download now'
  )}
</Button>
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
import { Button, useTheme } from 'heroui-native';
import { Ionicons } from '@expo/vector-icons';
import { View } from 'react-native';

export default function ButtonExample() {
  const { colors } = useTheme();

  return (
    <View className="gap-4 p-4">
      <Button variant="primary">
        <Ionicons name="add" size={20} color={colors.accentForeground} />
        <Button.Label>Add Item</Button.Label>
      </Button>

      <View className="flex-row gap-4">
        <Button size="sm" isIconOnly>
          <Ionicons name="heart" size={16} color={colors.accentForeground} />
        </Button>
        <Button size="sm" variant="secondary" isIconOnly>
          <Ionicons
            name="bookmark"
            size={16}
            color={colors.accentSoftForeground}
          />
        </Button>
        <Button size="sm" variant="danger" isIconOnly>
          <Ionicons
            name="trash"
            size={16}
            color={colors.dangerForeground}
          />
        </Button>
      </View>

      <Button variant="tertiary">
        <Button.Label>Learn More</Button.Label>
        <Ionicons
          name="chevron-forward"
          size={18}
          color={colors.defaultForeground}
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

| prop | type | default | description |
| --- | --- | --- | --- |
| `children` | `React.ReactNode` | - | Content to be rendered inside the button |
| `variant` | `'primary' \| 'secondary' \| 'tertiary' \| 'ghost' \| 'danger'` | `'primary'` | Visual variant of the button |
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Size of the button |
| `isIconOnly` | `boolean` | `false` | Whether the button displays an icon only (square aspect ratio) |
| `isDisabled` | `boolean` | `false` | Whether the button is disabled |
| `className` | `string` | - | Additional CSS classes |
| `animationConfig` | `AnimationConfig` | - | Scale on press animation configuration |
| `skipLayoutAnimation` | `boolean` | `false` | Whether to skip the layout animation |
| `onPress` | `(event: GestureResponderEvent) => void` | - | Called when button is pressed |
| `onPressIn` | `(event: GestureResponderEvent) => void` | - | Called when press gesture starts |
| `onPressOut` | `(event: GestureResponderEvent) => void` | - | Called when press gesture ends |
| `onLongPress` | `(event: GestureResponderEvent) => void` | - | Called when button is long pressed |
| `...PressableProps` | `PressableProps` | - | All standard React Native Pressable props are supported |

#### AnimationConfig

| prop | type | description |
| --- | --- | --- |
| `isAnimationDisabled` | `boolean` | Whether to disable the animation |
| `targetScaleValue` | `number` | Animation target value for scale |
| `timingConfig` | `TimingConfig` | Animation timing configuration |

#### TimingConfig

| prop | type | description |
| --- | --- | --- |
| `duration` | `number` | Duration of the animation in milliseconds |
| `easing` | `EasingFunction \| EasingFunctionFactory` | Easing function to control the animation curve |

### Button.Label

| prop | type | default | description |
| --- | --- | --- | --- |
| `children` | `React.ReactNode` | - | Content to be rendered as label |
| `className` | `string` | - | Additional CSS classes |
| `...Animated.TextProps` | `Animated.TextProps` | - | All Reanimated Animated.Text props are supported |