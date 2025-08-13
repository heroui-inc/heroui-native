# Checkbox

A selectable control that allows users to toggle between checked and unchecked states.

## Interactive Demo

[Interactive demo placeholder - will be added to documentation site]

## Imports

Note: Before importing this component, ensure you have completed the setup as per the [Quick Start guide](https://heroui.com/docs/quick-start).

```tsx
import { Checkbox } from 'heroui-native';
```

## Usage

### Basic Usage

The Checkbox component renders with default background and indicator if no children provided.

```tsx
<Checkbox isSelected={isSelected} onSelectedChange={setIsSelected} />
```

### With Custom Background

Replace the default background with custom content using the Background component.

```tsx
<Checkbox isSelected={isSelected} onSelectedChange={setIsSelected}>
  <Checkbox.Background>...</Checkbox.Background>
</Checkbox>
```

### With Custom Indicator

Replace the default checkmark with custom content using the Indicator component.

```tsx
<Checkbox isSelected={isSelected} onSelectedChange={setIsSelected}>
  <Checkbox.Indicator>...</Checkbox.Indicator>
</Checkbox>
```

### With Both Custom Parts

Combine custom background and indicator for fully customized checkboxes.

```tsx
<Checkbox isSelected={isSelected} onSelectedChange={setIsSelected}>
  <Checkbox.Background>...</Checkbox.Background>
  <Checkbox.Indicator>...</Checkbox.Indicator>
</Checkbox>
```

## Example

```tsx
import { Checkbox, useTheme } from 'heroui-native';
import { Minus, Plus } from 'lucide-react-native';
import React from 'react';
import { View } from 'react-native';
import Animated, { ZoomIn } from 'react-native-reanimated';

export default function CheckboxExample() {
  const [defaultCheck, setDefaultCheck] = React.useState(true);
  const [success, setSuccess] = React.useState(true);
  const [warning, setWarning] = React.useState(true);
  const [danger, setDanger] = React.useState(true);
  const [custom, setCustom] = React.useState(true);

  const { colors } = useTheme();

  return (
    <View className="flex-row gap-4">
      <Checkbox isSelected={defaultCheck} onSelectedChange={setDefaultCheck} />

      <Checkbox
        isSelected={success}
        onSelectedChange={setSuccess}
        color="success"
      />

      <Checkbox
        isSelected={warning}
        onSelectedChange={setWarning}
        color="warning"
      />

      <Checkbox
        isSelected={danger}
        onSelectedChange={setDanger}
        color="danger"
      />

      <Checkbox
        isSelected={custom}
        onSelectedChange={setCustom}
        className="w-8 h-8"
      >
        <Checkbox.Indicator>
          {custom ? (
            <Animated.View key="selected" entering={ZoomIn}>
              <Minus
                size={16}
                color={colors.accentForeground}
                strokeWidth={3}
              />
            </Animated.View>
          ) : (
            <Animated.View key="unselected" entering={ZoomIn}>
              <Plus size={16} color={colors.accent} strokeWidth={3} />
            </Animated.View>
          )}
        </Checkbox.Indicator>
      </Checkbox>
    </View>
  );
}
```

## Anatomy

```tsx
<Checkbox>
  <Checkbox.Background>...</Checkbox.Background>
  <Checkbox.Indicator>...</Checkbox.Indicator>
</Checkbox>
```

- **Checkbox**: Main container that handles selection state and user interaction. Renders default background and indicator with checkmark if no children provided. Animates border color based on selection state.
- **Checkbox.Background**: Optional background layer that fills when selected. Animates background color transitions. Can be customized with different colors or replaced with custom content.
- **Checkbox.Indicator**: Optional checkmark container that scales in when selected. Renders default check icon if no children provided. Handles enter/exit animations and can be replaced with custom indicators.

## API Reference

### Checkbox

| prop                | type                                              | default     | description                                                               |
| ------------------- | ------------------------------------------------- | ----------- | ------------------------------------------------------------------------- |
| `children`          | `React.ReactNode`                                 | `undefined` | Child elements to render inside the checkbox                              |
| `isSelected`        | `boolean`                                         | `undefined` | Whether the checkbox is currently selected                                |
| `onSelectedChange`  | `(isSelected: boolean) => void`                   | `undefined` | Callback fired when the checkbox selection state changes                  |
| `color`             | `'default' \| 'success' \| 'warning' \| 'danger'` | `'default'` | Color theme of the checkbox                                               |
| `isDisabled`        | `boolean`                                         | `false`     | Whether the checkbox is disabled and cannot be interacted with            |
| `isReadOnly`        | `boolean`                                         | `false`     | Whether the checkbox is read-only                                         |
| `isValid`           | `boolean`                                         | `true`      | Whether the checkbox is valid                                             |
| `className`         | `string`                                          | `undefined` | Additional CSS classes to apply                                           |
| `colors`            | `CheckboxBorderColors`                            | `undefined` | Custom colors for different checkbox border states                        |
| `animationConfig`   | `TimingConfig`                                    | `undefined` | Animation configuration for checkbox border color transition              |
| `...PressableProps` | `PressableProps`                                  | -           | All standard React Native Pressable props are supported (except disabled) |

#### CheckboxBorderColors

| prop             | type     | description                                |
| ---------------- | -------- | ------------------------------------------ |
| `defaultBorder`  | `string` | Border color when checkbox is not selected |
| `selectedBorder` | `string` | Border color when checkbox is selected     |

#### TimingConfig

| prop       | type                                      | description                                    |
| ---------- | ----------------------------------------- | ---------------------------------------------- |
| `duration` | `number`                                  | Duration of the animation in milliseconds      |
| `easing`   | `EasingFunction \| EasingFunctionFactory` | Easing function to control the animation curve |

### Checkbox.Background

| prop              | type                       | default     | description                                                      |
| ----------------- | -------------------------- | ----------- | ---------------------------------------------------------------- |
| `children`        | `React.ReactNode`          | `undefined` | Content to be rendered as the checkbox background                |
| `className`       | `string`                   | `undefined` | Additional CSS classes for the background                        |
| `colors`          | `CheckboxBackgroundColors` | `undefined` | Custom colors for different checkbox background states           |
| `animationConfig` | `TimingConfig`             | `undefined` | Animation configuration for checkbox background color transition |
| `...ViewProps`    | `ViewProps`                | -           | All standard React Native View props are supported               |

#### CheckboxBackgroundColors

| prop                 | type     | description                                    |
| -------------------- | -------- | ---------------------------------------------- |
| `defaultBackground`  | `string` | Background color when checkbox is not selected |
| `selectedBackground` | `string` | Background color when checkbox is selected     |

### Checkbox.Indicator

| prop              | type                         | default     | description                                                     |
| ----------------- | ---------------------------- | ----------- | --------------------------------------------------------------- |
| `children`        | `React.ReactNode`            | `undefined` | Content to be rendered as the checkbox indicator                |
| `className`       | `string`                     | `undefined` | Additional CSS classes for the indicator                        |
| `iconProps`       | `CheckboxIndicatorIconProps` | `undefined` | Custom icon props for the default indicator                     |
| `animationConfig` | `TimingConfig`               | `undefined` | Animation configuration for checkbox indicator scale transition |
| `...ViewProps`    | `ViewProps`                  | -           | All standard React Native View props are supported              |

#### CheckboxIndicatorIconProps

| prop          | type     | description            |
| ------------- | -------- | ---------------------- |
| `size`        | `number` | Indicator size         |
| `strokeWidth` | `number` | Indicator stroke width |
| `color`       | `string` | Indicator color        |
