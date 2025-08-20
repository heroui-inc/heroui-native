# Button

A pressable component that triggers actions with customizable variants, sizes, and animations.

## Interactive Demo

[Interactive demo placeholder - will be added to documentation site]

## Imports

Note: Before importing this component, ensure you have completed the setup as per the [Quick Start guide](../../../README.md).

```tsx
import { Button } from 'heroui-native';
```

## Usage

### Basic Usage

The Button component accepts string children or compound parts for flexible layouts.

```tsx
<Button>Basic Button</Button>
```

### With Icons

Add icons to the start or end of the button using compound parts.

```tsx
<Button>
  <Button.StartContent>...</Button.StartContent>
  <Button.Label>...</Button.Label>
</Button>

<Button>
  <Button.Label>...</Button.Label>
  <Button.EndContent>...</Button.EndContent>
</Button>
```

### With Both Start and End Content

Combine multiple parts for complex button layouts.

```tsx
<Button>
  <Button.StartContent>...</Button.StartContent>
  <Button.Label>...</Button.Label>
  <Button.EndContent>...</Button.EndContent>
</Button>
```

### Icon Only Button

Create square icon buttons with proper aspect ratio.

```tsx
<Button isIconOnly>
  <Button.Label>...</Button.Label>
</Button>
```

### Custom Background

Add gradients or custom backgrounds using the Background component.

```tsx
<Button>
  <Button.Background>...</Button.Background>
  <Button.Label>...</Button.Label>
</Button>
```

## Example

```tsx
import { Button } from 'heroui-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { View, StyleSheet } from 'react-native';

export default function ButtonExample() {
  const { colors } = useTheme();

  return (
    <View className="gap-4">
      <Button variant="primary" onPress={() => console.log('Download pressed')}>
        <Button.StartContent>
          <Ionicons name="download" size={18} color={colors.accentForeground} />
        </Button.StartContent>
        <Button.Label>Download File</Button.Label>
      </Button>

      <Button>
        <Button.Background>
          <LinearGradient
            colors={['#9333ea', '#ec4899']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={StyleSheet.absoluteFill}
          />
        </Button.Background>
        <Button.Label classNames={{ text: 'text-white font-bold' }}>
          Gradient Button
        </Button.Label>
      </Button>

      <Button
        variant="secondary"
        size="sm"
        isFullWidth={false}
        className="self-end"
      >
        <Button.Label>Like</Button.Label>
        <Button.EndContent>
          <Ionicons
            name="heart"
            size={16}
            color={colors.accentSoftForeground}
          />
        </Button.EndContent>
      </Button>
    </View>
  );
}
```

## Anatomy

```tsx
<Button>
  <Button.Background>...</Button.Background>
  <Button.StartContent>...</Button.StartContent>
  <Button.Label>...</Button.Label>
  <Button.EndContent>...</Button.EndContent>
</Button>
```

- **Button**: Main container that handles press interactions, animations, and variants. Provides sensible defaults when sub-components are omitted.
- **Button.Background**: Optional background element with absolute positioning. Rendered beneath all other content. Use for gradients or custom backgrounds.
- **Button.StartContent**: Optional content displayed at the start of the button. Use for icons or other elements before the label.
- **Button.Label**: Optional label that displays text or custom content. When string is provided, it renders as Text. Otherwise renders children as-is.
- **Button.EndContent**: Optional content displayed at the end of the button. Use for icons or other elements after the label.

## API Reference

### Button

| prop                         | type                                                            | description                                                          |
| ---------------------------- | --------------------------------------------------------------- | -------------------------------------------------------------------- |
| `children`                   | `React.ReactNode`                                               | Children elements to be rendered inside the button                   |
| `variant`                    | `'primary' \| 'secondary' \| 'tertiary' \| 'ghost' \| 'danger'` | Visual variant of the button                                         |
| `size`                       | `'sm' \| 'md' \| 'lg'`                                          | Size of the button                                                   |
| `isIconOnly`                 | `boolean`                                                       | Whether the button displays an icon only (needed for correct layout) |
| `isDisabled`                 | `boolean`                                                       | Whether the button is disabled                                       |
| `className`                  | `string`                                                        | Additional CSS classes                                               |
| `disableAnimation`           | `DisableAnimation`                                              | Whether to disable the animation (scale and/or highlight)            |
| `animationConfig`            | `AnimationConfig`                                               | Animation configuration for press states (scale and highlight)       |
| `...Animated.PressableProps` | `Animated.PressableProps`                                       | All Reanimated AnimatedPressable props are supported                 |

#### DisableAnimation

| prop        | type      | description                                |
| ----------- | --------- | ------------------------------------------ |
| `scale`     | `boolean` | Whether to disable the scale animation     |
| `highlight` | `boolean` | Whether to disable the highlight animation |

#### AnimationConfig

| prop        | type                                                          | description                           |
| ----------- | ------------------------------------------------------------- | ------------------------------------- |
| `scale`     | `{ value?: number, config?: TimingConfig }`                   | Animation configuration for scale     |
| `highlight` | `{ color?: string, opacity?: number, config?: TimingConfig }` | Animation configuration for highlight |

#### TimingConfig

| prop       | type                                      | description                                    |
| ---------- | ----------------------------------------- | ---------------------------------------------- |
| `duration` | `number`                                  | Duration of the animation in milliseconds      |
| `easing`   | `EasingFunction \| EasingFunctionFactory` | Easing function to control the animation curve |

### Button.Background

| prop                    | type                 | description                                      |
| ----------------------- | -------------------- | ------------------------------------------------ |
| `children`              | `React.ReactNode`    | Content to be rendered as the button background  |
| `className`             | `string`             | Additional CSS classes                           |
| `...Animated.ViewProps` | `Animated.ViewProps` | All Reanimated Animated.View props are supported |

### Button.StartContent

| prop                    | type                 | description                                       |
| ----------------------- | -------------------- | ------------------------------------------------- |
| `children`              | `React.ReactNode`    | Content to be rendered at the start of the button |
| `className`             | `string`             | Additional CSS classes                            |
| `...Animated.ViewProps` | `Animated.ViewProps` | All Reanimated Animated.View props are supported  |

### Button.Label

| prop                    | type                       | description                                                                   |
| ----------------------- | -------------------------- | ----------------------------------------------------------------------------- |
| `children`              | `React.ReactNode`          | Content to be rendered as label. If string, will be wrapped in Text component |
| `className`             | `string`                   | Additional CSS classes for container                                          |
| `classNames`            | `ElementSlots<LabelSlots>` | Additional CSS classes for the different parts of the label                   |
| `...Animated.ViewProps` | `Animated.ViewProps`       | All Reanimated Animated.View props are supported                              |

#### ElementSlots<LabelSlots>

| prop        | type     | description                                  |
| ----------- | -------- | -------------------------------------------- |
| `container` | `string` | Custom class name for the label container    |
| `text`      | `string` | Custom class name for the label text element |

### Button.EndContent

| prop                    | type                 | description                                      |
| ----------------------- | -------------------- | ------------------------------------------------ |
| `children`              | `React.ReactNode`    | Content to be rendered at the end of the button  |
| `className`             | `string`             | Additional CSS classes                           |
| `...Animated.ViewProps` | `Animated.ViewProps` | All Reanimated Animated.View props are supported |
