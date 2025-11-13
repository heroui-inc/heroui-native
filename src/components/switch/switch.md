# Switch

A toggle control that allows users to switch between on and off states.

## Imports

Note: Before importing this component, ensure you have completed the setup as per the [Quick Start guide](../../../README.md).

```tsx
import { Switch } from 'heroui-native';
```

## Usage

### Basic Usage

The Switch component renders with default thumb if no children provided.

```tsx
<Switch isSelected={isSelected} onSelectedChange={setIsSelected} />
```

### With Custom Thumb

Replace the default thumb with custom content using the Thumb component.

```tsx
<Switch isSelected={isSelected} onSelectedChange={setIsSelected}>
  <Switch.Thumb>...</Switch.Thumb>
</Switch>
```

### With Start and End Content

Add icons or text that appear on each side of the switch.

```tsx
<Switch isSelected={isSelected} onSelectedChange={setIsSelected}>
  <Switch.Thumb />
  <Switch.StartContent>...</Switch.StartContent>
  <Switch.EndContent>...</Switch.EndContent>
</Switch>
```

### With Render Function

Use render functions for dynamic content based on switch state.

```tsx
<Switch isSelected={isSelected} onSelectedChange={setIsSelected}>
  {({ isSelected, isDisabled }) => (
    <>
      <Switch.Thumb>
        {({ isSelected }) => (isSelected ? <CheckIcon /> : <XIcon />)}
      </Switch.Thumb>
    </>
  )}
</Switch>
```

### With Custom Animations

Customize animations for the switch root and thumb components.

```tsx
<Switch
  animation={{
    scale: {
      value: [1, 0.9],
      timingConfig: { duration: 200 },
    },
    backgroundColor: {
      value: ['#172554', '#eab308'],
    },
  }}
>
  <Switch.Thumb
    animation={{
      left: {
        value: 4,
        springConfig: {
          damping: 30,
          stiffness: 300,
          mass: 1,
        },
      },
      backgroundColor: {
        value: ['#dbeafe', '#854d0e'],
      },
    }}
  />
</Switch>
```

### Disable Animations

Disable animations entirely or only for specific components.

```tsx
{
  /* Disable all animations including children */
}
<Switch animation="disable-all">
  <Switch.Thumb />
</Switch>;

{
  /* Disable only root animations, thumb can still animate */
}
<Switch>
  <Switch.Thumb animation={false} />
</Switch>;
```

## Example

```tsx
import { Switch } from 'heroui-native';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';
import Animated, { ZoomIn } from 'react-native-reanimated';

export default function SwitchExample() {
  const [darkMode, setDarkMode] = React.useState(false);

  return (
    <View className="flex-row gap-4">
      <Switch
        isSelected={darkMode}
        onSelectedChange={setDarkMode}
        className="w-[56px] h-[32px]"
        animation={{
          backgroundColor: {
            value: ['#172554', '#eab308'],
          },
        }}
      >
        <Switch.Thumb
          className="size-[22px]"
          animation={{
            left: {
              value: 4,
              springConfig: {
                damping: 30,
                stiffness: 300,
                mass: 1,
              },
            },
          }}
        />
        <Switch.StartContent className="left-2">
          {darkMode && (
            <Animated.View key="sun" entering={ZoomIn.springify()}>
              <Ionicons name="sunny" size={16} color="#854d0e" />
            </Animated.View>
          )}
        </Switch.StartContent>
        <Switch.EndContent className="right-2">
          {!darkMode && (
            <Animated.View key="moon" entering={ZoomIn.springify()}>
              <Ionicons name="moon" size={16} color="#dbeafe" />
            </Animated.View>
          )}
        </Switch.EndContent>
      </Switch>
    </View>
  );
}
```

## Anatomy

```tsx
<Switch>
  <Switch.Thumb>...</Switch.Thumb>
  <Switch.StartContent>...</Switch.StartContent>
  <Switch.EndContent>...</Switch.EndContent>
</Switch>
```

- **Switch**: Main container that handles toggle state and user interaction. Renders default thumb if no children provided. Animates scale (on press) and background color based on selection state. Acts as a pressable area for toggling.
- **Switch.Thumb**: Optional sliding thumb element that moves between positions. Uses spring animation for smooth transitions. Can contain custom content like icons or be customized with different styles and animations.
- **Switch.StartContent**: Optional content displayed on the left side of the switch. Typically used for icons or text that appear when switch is off. Positioned absolutely within the switch container.
- **Switch.EndContent**: Optional content displayed on the right side of the switch. Typically used for icons or text that appear when switch is on. Positioned absolutely within the switch container.

## API Reference

### Switch

| prop                        | type                                                                 | default     | description                                                            |
| --------------------------- | -------------------------------------------------------------------- | ----------- | ---------------------------------------------------------------------- |
| `children`                  | `React.ReactNode \| ((props: SwitchRenderProps) => React.ReactNode)` | `undefined` | Content to render inside the switch, or a render function              |
| `isSelected`                | `boolean`                                                            | `undefined` | Whether the switch is currently selected                               |
| `isDisabled`                | `boolean`                                                            | `false`     | Whether the switch is disabled and cannot be interacted with           |
| `className`                 | `string`                                                             | `undefined` | Custom class name for the switch                                       |
| `animation`                 | `SwitchRootAnimation`                                                | `undefined` | Animation configuration for switch (see Animation Configuration below) |
| `onSelectedChange`          | `(isSelected: boolean) => void`                                      | `undefined` | Callback fired when the switch selection state changes                 |
| `...AnimatedPressableProps` | `AnimatedProps<PressableProps>`                                      | -           | All React Native Reanimated Pressable props are supported              |

#### SwitchRenderProps

| prop         | type      | description                    |
| ------------ | --------- | ------------------------------ |
| `isSelected` | `boolean` | Whether the switch is selected |
| `isDisabled` | `boolean` | Whether the switch is disabled |

#### SwitchRootAnimation

Animation configuration for the Switch root component. Can be:

- `false` or `"disabled"`: Disable only root animations (children can still animate)
- `"disable-all"`: Disable all animations including children
- `true` or `undefined`: Use default animations
- `object`: Custom animation configuration with the following properties:

**Animation Properties:**

| property          | type                          | default     | description                                   |
| ----------------- | ----------------------------- | ----------- | --------------------------------------------- |
| `scale`           | `AnimationValue<ScaleConfig>` | `undefined` | Scale animation configuration for press state |
| `backgroundColor` | `AnimationValue<BgConfig>`    | `undefined` | Background color animation configuration      |

**ScaleConfig:**

| property       | type               | default             | description                       |
| -------------- | ------------------ | ------------------- | --------------------------------- |
| `value`        | `[number, number]` | `[1, 0.96]`         | Scale values [unpressed, pressed] |
| `timingConfig` | `WithTimingConfig` | `{ duration: 150 }` | Animation timing configuration    |

**BgConfig:**

| property       | type               | default                                                        | description                                    |
| -------------- | ------------------ | -------------------------------------------------------------- | ---------------------------------------------- |
| `value`        | `[string, string]` | Uses theme colors (surface-quaternary, accent)                 | Background color values [unselected, selected] |
| `timingConfig` | `WithTimingConfig` | `{ duration: 175, easing: Easing.bezier(0.25, 0.1, 0.25, 1) }` | Animation timing configuration                 |

### Switch.Thumb

| prop           | type                                                                 | default     | description                                              |
| -------------- | -------------------------------------------------------------------- | ----------- | -------------------------------------------------------- |
| `children`     | `React.ReactNode \| ((props: SwitchRenderProps) => React.ReactNode)` | `undefined` | Content to render inside the thumb, or a render function |
| `className`    | `string`                                                             | `undefined` | Custom class name for the thumb element                  |
| `animation`    | `SwitchThumbAnimation`                                               | `undefined` | Animation configuration for thumb (see below)            |
| `...ViewProps` | `ViewProps`                                                          | -           | All standard React Native View props are supported       |

#### SwitchThumbAnimation

Animation configuration for the Switch thumb component. Can be:

- `false` or `"disabled"`: Disable all animations
- `true` or `undefined`: Use default animations
- `object`: Custom animation configuration with the following properties:

**Animation Properties:**

| property          | type                         | default     | description                              |
| ----------------- | ---------------------------- | ----------- | ---------------------------------------- |
| `left`            | `AnimationValue<LeftConfig>` | `undefined` | Left position animation configuration    |
| `backgroundColor` | `AnimationValue<BgConfig>`   | `undefined` | Background color animation configuration |

**LeftConfig:**

The `left` animation moves the thumb between left and right positions. When you provide a single `value` (e.g., `value: 2`), it applies the same offset to both sides: `2px` from the left when unselected, and `2px` from the right when selected.

| property       | type               | default                                      | description                                       |
| -------------- | ------------------ | -------------------------------------------- | ------------------------------------------------- |
| `value`        | `number`           | `2`                                          | Offset value from the edges (left/right)          |
| `springConfig` | `WithSpringConfig` | `{ damping: 120, stiffness: 1600, mass: 2 }` | Spring animation configuration for thumb position |

**BgConfig:**

| property       | type               | default                                                        | description                                    |
| -------------- | ------------------ | -------------------------------------------------------------- | ---------------------------------------------- |
| `value`        | `[string, string]` | `['white', theme accent-foreground color]`                     | Background color values [unselected, selected] |
| `timingConfig` | `WithTimingConfig` | `{ duration: 175, easing: Easing.bezier(0.25, 0.1, 0.25, 1) }` | Animation timing configuration                 |

### Switch.StartContent

| prop           | type              | default     | description                                        |
| -------------- | ----------------- | ----------- | -------------------------------------------------- |
| `children`     | `React.ReactNode` | `undefined` | Content to render inside the switch content        |
| `className`    | `string`          | `undefined` | Custom class name for the content element          |
| `...ViewProps` | `ViewProps`       | -           | All standard React Native View props are supported |

### Switch.EndContent

| prop           | type              | default     | description                                        |
| -------------- | ----------------- | ----------- | -------------------------------------------------- |
| `children`     | `React.ReactNode` | `undefined` | Content to render inside the switch content        |
| `className`    | `string`          | `undefined` | Custom class name for the content element          |
| `...ViewProps` | `ViewProps`       | -           | All standard React Native View props are supported |

## Styling Notes

### Border Styling

If you need to apply a border to the switch root, use the `outline` style properties instead of `border`. This ensures the border doesn't affect the internal layout calculations for the thumb position:

```tsx
<Switch className="outline outline-accent">
  <Switch.Thumb />
</Switch>
```

Using `outline` keeps the border visual without impacting the switch's internal width calculations, ensuring the thumb animates correctly.

## Integration with FormField

The Switch component integrates seamlessly with FormField for press state sharing:

```tsx
<FormField isSelected={isSelected} onSelectedChange={setIsSelected}>
  <FormField.Content>
    <FormField.Title>Enable notifications</FormField.Title>
    <FormField.Description>Receive push notifications</FormField.Description>
  </FormField.Content>
  <FormField.Indicator>
    <Switch />
  </FormField.Indicator>
</FormField>
```

When wrapped in FormField, the Switch will automatically respond to press events on the entire FormField container, creating a larger touch target and better user experience.

## Hooks

### useSwitch

A hook that provides access to the Switch context. This is useful when building custom switch components or when you need to access switch state in child components.

**Returns:**

| Property     | Type      | Description                    |
| ------------ | --------- | ------------------------------ |
| `isSelected` | `boolean` | Whether the switch is selected |
| `isDisabled` | `boolean` | Whether the switch is disabled |

**Example:**

```tsx
import { useSwitch } from 'heroui-native';

function CustomSwitchContent() {
  const { isSelected, isDisabled } = useSwitch();

  return (
    <View>
      <Text>Status: {isSelected ? 'On' : 'Off'}</Text>
      {isDisabled && <Text>Disabled</Text>}
    </View>
  );
}

// Usage
<Switch>
  <CustomSwitchContent />
  <Switch.Thumb />
</Switch>;
```
