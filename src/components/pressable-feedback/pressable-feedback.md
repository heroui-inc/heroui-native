
# PressableFeedback

A pressable component that provides visual feedback with ripple or highlight effects.  
By default, it uses ripple on Android and highlight on iOS.

## Imports

Note: Before importing this component, ensure you have completed the setup as per the [Quick Start guide](../../../README.md).

```tsx
import { PressableFeedback } from 'heroui-native';
```

## Usage

### Basic Usage

The PressableFeedback component accepts children or render functions for flexible layouts.

```tsx
<PressableFeedback onPress={() => console.log('Pressed')}>
  <Text>Press me</Text>
</PressableFeedback>
```

### With Ripple Effect

```tsx
<PressableFeedback variant="ripple">
  <Text>Ripple Effect</Text>
</PressableFeedback>
```

### With Highlight Effect

```tsx
<PressableFeedback variant="highlight">
  <Text>Highlight Effect</Text>
</PressableFeedback>
```

### With Render Props

```tsx
<PressableFeedback>
  {({ pressed, hovered }) => (
    <Text style={{ opacity: pressed ? 0.5 : 1 }}>
      {hovered ? 'Hovering' : 'Not Hovering'}
    </Text>
  )}
</PressableFeedback>
```

### With Custom Ripple Config

```tsx
<PressableFeedback
  variant="ripple"
  animationConfig={{
    duration: 400,
    opacity: 0.3,
    color: 'blue',
  }}
>
  <Text>Custom Ripple</Text>
</PressableFeedback>
```

### With Custom Highlight Config

```tsx
<PressableFeedback
  variant="highlight"
  animationConfig={{
    duration: 200,
    opacity: 0.15,
    color: 'red',
  }}
>
  <Text>Custom Highlight</Text>
</PressableFeedback>
```

## Example

```tsx
import { PressableFeedback } from 'heroui-native';
import { Text, View } from 'react-native';

export default function PressableFeedbackExample() {
  return (
    <View className="gap-4">
      <PressableFeedback variant="ripple" onPress={() => console.log('Ripple pressed')}>
        <Text>Ripple Button</Text>
      </PressableFeedback>

      <PressableFeedback variant="highlight" onPress={() => console.log('Highlight pressed')}>
        <Text>Highlight Button</Text>
      </PressableFeedback>

      <PressableFeedback>
        {({ pressed }) => (
          <Text style={{ opacity: pressed ? 0.5 : 1 }}>Press State Example</Text>
        )}
      </PressableFeedback>
    </View>
  );
}
```

## Anatomy

```tsx
<PressableFeedback>
  ...
</PressableFeedback>
```

- **PressableFeedback**: Main container that manages press, hover, and layout state.

## API Reference

### PressableFeedback

| prop            | type                                                                                   | description                                                                 |
| --------------- | -------------------------------------------------------------------------------------- | --------------------------------------------------------------------------- |
| `children`      | `React.ReactNode \| (state: PressableFeedbackState) => React.ReactNode`                 | Child elements or function that receives `hovered` and `pressed` state      |
| `variant`       | `'ripple' \| 'highlight'`                                                              | Feedback variant. Defaults to platform-specific (`ripple` on Android, `highlight` on iOS) |
| `isDisabled`    | `boolean`                                                                              | Whether the component is disabled                                           |
| `color`         | `string`                                                                               | Custom color for ripple or highlight effect                                 |
| `animationConfig` | `RippleAnimationConfig \| HighlightAnimationConfig`                                   | Custom animation settings                                                   |
| `className`     | `string`                                                                               | Additional CSS classes                                                      |
| `...PressableProps` | `PressableProps` from React Native                                                  | All other props are forwarded to the underlying `Pressable`                 |

### RippleAnimationConfig

| prop       | type                                         | description                                      | default |
| ---------- | -------------------------------------------- | ------------------------------------------------ | ------- |
| `duration` | `number`                                     | Duration of the ripple animation in ms           | 250     |
| `easing`   | `EasingFunction \| EasingFunctionFactory`    | Easing function for the animation                | `Easing.bezier(0.25, 0.1, 0.25, 1)` |
| `opacity`  | `number`                                     | Ripple opacity when pressed                      | 0.2     |
| `color`    | `string`                                     | Ripple color                                     | black (light) / white (dark) |
| `disabled` | `boolean`                                    | Whether to disable the ripple effect             | false   |

### HighlightAnimationConfig

| prop       | type                                         | description                                      | default |
| ---------- | -------------------------------------------- | ------------------------------------------------ | ------- |
| `duration` | `number`                                     | Duration of the highlight animation in ms        | 100     |
| `easing`   | `EasingFunction \| EasingFunctionFactory`    | Easing function for the animation                | `Easing.inOut(Easing.quad)` |
| `opacity`  | `number`                                     | Highlight opacity when pressed                   | 0.2     |
| `color`    | `string`                                     | Highlight color                                  | black (light) / white (dark) |
| `disabled` | `boolean`                                    | Whether to disable the highlight effect          | false   |

### PressableFeedbackState

| prop     | type    | description                             |
| -------- | ------- | --------------------------------------- |
| `hovered`| boolean | True when pointer is over the component |
| `pressed`| boolean | True when component is pressed          |
