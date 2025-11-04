# Checkbox

A selectable control that allows users to toggle between checked and unchecked states.

## Imports

Note: Before importing this component, ensure you have completed the setup as per the [Quick Start guide](../../../README.md).

```tsx
import { Checkbox } from 'heroui-native';
```

## Usage

### Basic Usage

The Checkbox component renders with default background and indicator if no children provided.

```tsx
<Checkbox isSelected={isSelected} onSelectedChange={setIsSelected} />
```

### With Custom Indicator

Use a render function in the Indicator to show/hide custom icons based on state.

```tsx
<Checkbox isSelected={isSelected} onSelectedChange={setIsSelected}>
  <Checkbox.Indicator>
    {({ isSelected }) => (isSelected ? <CheckIcon /> : null)}
  </Checkbox.Indicator>
</Checkbox>
```

### With Render Function

Use a render function on the Checkbox to access state and customize the entire content.

```tsx
<Checkbox isSelected={isSelected} onSelectedChange={setIsSelected}>
  {({ isSelected, isInvalid, isDisabled }) => (
    <Checkbox.Indicator>
      {({ isSelected }) => (isSelected ? <CheckIcon /> : <PlusIcon />)}
    </Checkbox.Indicator>
  )}
</Checkbox>
```

### Invalid State

Show validation errors with the `isInvalid` prop.

```tsx
<Checkbox
  isSelected={isSelected}
  onSelectedChange={setIsSelected}
  isInvalid={hasError}
/>
```

## Example

```tsx
import { Checkbox, useThemeColor } from 'heroui-native';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';
import Animated, { ZoomIn } from 'react-native-reanimated';

export default function CheckboxExample() {
  const [defaultCheck, setDefaultCheck] = React.useState(true);
  const [success, setSuccess] = React.useState(true);
  const [warning, setWarning] = React.useState(true);
  const [danger, setDanger] = React.useState(true);
  const [custom, setCustom] = React.useState(true);

  const themeColorAccentForeground = useThemeColor('accent-foreground');
  const themeColorAccent = useThemeColor('accent');

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
              <Ionicons
                name="remove"
                size={16}
                color={themeColorAccentForeground}
              />
            </Animated.View>
          ) : (
            <Animated.View key="unselected" entering={ZoomIn}>
              <Ionicons name="add" size={16} color={themeColorAccent} />
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
  <Checkbox.Indicator>...</Checkbox.Indicator>
</Checkbox>
```

- **Checkbox**: Main container that handles selection state and user interaction. Renders default indicator with checkmark if no children provided. Animates background and border color based on selection state. Supports render function children to access state (`isSelected`, `isInvalid`, `isDisabled`).
- **Checkbox.Indicator**: Optional checkmark container that scales in when selected. Renders default check icon if no children provided. Handles enter/exit animations and can be replaced with custom indicators. Supports render function children to access state.

## API Reference

### Checkbox

| prop                | type                                                                   | default     | description                                                               |
| ------------------- | ---------------------------------------------------------------------- | ----------- | ------------------------------------------------------------------------- |
| `children`          | `React.ReactNode \| ((props: CheckboxRenderProps) => React.ReactNode)` | `undefined` | Child elements or render function to customize the checkbox               |
| `isSelected`        | `boolean`                                                              | `undefined` | Whether the checkbox is currently selected                                |
| `onSelectedChange`  | `(isSelected: boolean) => void`                                        | `undefined` | Callback fired when the checkbox selection state changes                  |
| `isDisabled`        | `boolean`                                                              | `false`     | Whether the checkbox is disabled and cannot be interacted with            |
| `isInvalid`         | `boolean`                                                              | `false`     | Whether the checkbox is invalid                                           |
| `className`         | `string`                                                               | `undefined` | Additional CSS classes to apply                                           |
| `animatedColors`    | `CheckboxAnimatedColors`                                               | `undefined` | Custom colors for checkbox background and border in different states      |
| `...PressableProps` | `PressableProps`                                                       | -           | All standard React Native Pressable props are supported (except disabled) |

#### CheckboxRenderProps

| prop         | type      | description                      |
| ------------ | --------- | -------------------------------- |
| `isSelected` | `boolean` | Whether the checkbox is selected |
| `isInvalid`  | `boolean` | Whether the checkbox is invalid  |
| `isDisabled` | `boolean` | Whether the checkbox is disabled |

#### CheckboxAnimatedColors

| prop              | type                                                                                          | description                                   |
| ----------------- | --------------------------------------------------------------------------------------------- | --------------------------------------------- |
| `backgroundColor` | `{ default?: string; selected?: string; defaultInvalid?: string; selectedInvalid?: string; }` | Custom background colors for different states |
| `borderColor`     | `{ default?: string; selected?: string; defaultInvalid?: string; selectedInvalid?: string; }` | Custom border colors for different states     |

### Checkbox.Indicator

| prop              | type                                                                   | default     | description                                                     |
| ----------------- | ---------------------------------------------------------------------- | ----------- | --------------------------------------------------------------- |
| `children`        | `React.ReactNode \| ((props: CheckboxRenderProps) => React.ReactNode)` | `undefined` | Content or render function for the checkbox indicator           |
| `className`       | `string`                                                               | `undefined` | Additional CSS classes for the indicator                        |
| `iconProps`       | `CheckboxIndicatorIconProps`                                           | `undefined` | Custom icon props for the default indicator                     |
| `animationConfig` | `TimingConfig`                                                         | `undefined` | Animation configuration for checkbox indicator scale transition |
| `...ViewProps`    | `ViewProps`                                                            | -           | All standard React Native View props are supported              |

#### CheckboxIndicatorIconProps

| prop    | type     | description     |
| ------- | -------- | --------------- |
| `size`  | `number` | Indicator size  |
| `color` | `string` | Indicator color |
