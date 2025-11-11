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
import { Checkbox, Divider, FormField, Surface } from 'heroui-native';
import React from 'react';
import { View, Text } from 'react-native';

interface CheckboxFieldProps {
  isSelected: boolean;
  onSelectedChange: (value: boolean) => void;
  title: string;
  description: string;
}

const CheckboxField: React.FC<CheckboxFieldProps> = ({
  isSelected,
  onSelectedChange,
  title,
  description,
}) => {
  return (
    <FormField
      isSelected={isSelected}
      onSelectedChange={onSelectedChange}
      alignIndicator="start"
      className="items-start"
    >
      <FormField.Indicator>
        <Checkbox className="mt-0.5" />
      </FormField.Indicator>
      <FormField.Content>
        <FormField.Title className="text-lg">{title}</FormField.Title>
        <FormField.Description className="text-base">
          {description}
        </FormField.Description>
      </FormField.Content>
    </FormField>
  );
};

export default function BasicUsage() {
  const [fields, setFields] = React.useState({
    newsletter: true,
    marketing: false,
    terms: false,
  });

  const fieldConfigs: Record<
    keyof typeof fields,
    { title: string; description: string }
  > = {
    newsletter: {
      title: 'Subscribe to newsletter',
      description: 'Get weekly updates about new features and tips',
    },
    marketing: {
      title: 'Marketing communications',
      description: 'Receive promotional emails and special offers',
    },
    terms: {
      title: 'Accept terms and conditions',
      description: 'Agree to our Terms of Service and Privacy Policy',
    },
  };

  const handleFieldChange = (key: keyof typeof fields) => (value: boolean) => {
    setFields((prev) => ({ ...prev, [key]: value }));
  };

  const fieldKeys = Object.keys(fields) as Array<keyof typeof fields>;

  return (
    <View className="flex-1 items-center justify-center px-5">
      <Surface className="py-5 w-full">
        {fieldKeys.map((key, index) => (
          <React.Fragment key={key}>
            {index > 0 && <Divider className="my-4" />}
            <CheckboxField
              isSelected={fields[key]}
              onSelectedChange={handleFieldChange(key)}
              title={fieldConfigs[key].title}
              description={fieldConfigs[key].description}
            />
          </React.Fragment>
        ))}
      </Surface>
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

- **Checkbox**: Main container that handles selection state and user interaction. Renders default indicator with checkmark if no children provided. Automatically detects surface context for proper styling. Supports press scale animation. Supports render function children to access state (`isSelected`, `isInvalid`, `isDisabled`).
- **Checkbox.Indicator**: Optional checkmark container with default slide, scale, opacity, and border radius animations when selected. Renders animated check icon with SVG path animation if no children provided. Animations can be customized or disabled. Supports render function children to access state.

## API Reference

### Checkbox

| prop                | type                                                                   | default     | description                                                               |
| ------------------- | ---------------------------------------------------------------------- | ----------- | ------------------------------------------------------------------------- |
| `children`          | `React.ReactNode \| ((props: CheckboxRenderProps) => React.ReactNode)` | `undefined` | Child elements or render function to customize the checkbox               |
| `isSelected`        | `boolean`                                                              | `undefined` | Whether the checkbox is currently selected                                |
| `onSelectedChange`  | `(isSelected: boolean) => void`                                        | `undefined` | Callback fired when the checkbox selection state changes                  |
| `isDisabled`        | `boolean`                                                              | `false`     | Whether the checkbox is disabled and cannot be interacted with            |
| `isInvalid`         | `boolean`                                                              | `false`     | Whether the checkbox is invalid (shows danger color)                      |
| `isOnSurface`       | `boolean`                                                              | `undefined` | Whether checkbox is on a surface background (auto-detected if not set)    |
| `hitSlop`           | `number`                                                               | `6`         | Hit slop for the pressable area                                           |
| `animationConfig`   | `CheckboxRootAnimationConfig`                                          | `undefined` | Configuration for press scale animation                                   |
| `className`         | `string`                                                               | `undefined` | Additional CSS classes to apply                                           |
| `...PressableProps` | `PressableProps`                                                       | -           | All standard React Native Pressable props are supported (except disabled) |

#### CheckboxRenderProps

| prop         | type      | description                      |
| ------------ | --------- | -------------------------------- |
| `isSelected` | `boolean` | Whether the checkbox is selected |
| `isInvalid`  | `boolean` | Whether the checkbox is invalid  |
| `isDisabled` | `boolean` | Whether the checkbox is disabled |

#### CheckboxRootAnimationConfig

| prop    | type                                                    | description                            |
| ------- | ------------------------------------------------------- | -------------------------------------- |
| `scale` | `{ value?: number; timingConfig?: WithTimingConfig; isDisabled?: boolean; }` | Configuration for press scale animation |

**scale** object properties:
- `value` (number, default: `0.95`): Animation target value for scale when pressed
- `timingConfig` (WithTimingConfig): Animation timing configuration from Reanimated
- `isDisabled` (boolean, default: `false`): Whether to disable the scale animation

### Checkbox.Indicator

| prop                            | type                                                                   | default     | description                                                                  |
| ------------------------------- | ---------------------------------------------------------------------- | ----------- | ---------------------------------------------------------------------------- |
| `children`                      | `React.ReactNode \| ((props: CheckboxRenderProps) => React.ReactNode)` | `undefined` | Content or render function for the checkbox indicator                        |
| `className`                     | `string`                                                               | `undefined` | Additional CSS classes for the indicator                                     |
| `iconProps`                     | `CheckboxIndicatorIconProps`                                           | `undefined` | Custom props for the default animated check icon                             |
| `isDefaultAnimationDisabled`    | `boolean`                                                              | `false`     | Whether to disable default indicator animations (transform, opacity, borderRadius) |
| `...AnimatedViewProps`          | `AnimatedProps<ViewProps>`                                             | -           | All standard React Native Animated View props are supported                  |

#### CheckboxIndicatorIconProps

| prop            | type     | description                                    |
| --------------- | -------- | ---------------------------------------------- |
| `size`          | `number` | Icon size                                       |
| `strokeWidth`   | `number` | Icon stroke width                               |
| `color`         | `string` | Icon color                                      |
| `enterDuration` | `number` | Duration of enter animation (check appearing)  |
| `exitDuration`  | `number` | Duration of exit animation (check disappearing) |
