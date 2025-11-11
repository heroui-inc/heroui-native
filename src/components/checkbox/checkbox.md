# Checkbox

A selectable control that allows users to toggle between checked and unchecked states.

## Imports

Note: Before importing this component, ensure you have completed the setup as per the [Quick Start guide](../../../README.md).

```tsx
import { Checkbox } from 'heroui-native';
```

## Usage

### Basic Usage

The Checkbox component renders with a default animated indicator if no children are provided. It automatically detects whether it's on a surface background for proper styling.

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

Show validation errors with the `isInvalid` prop, which applies danger color styling.

```tsx
<Checkbox
  isSelected={isSelected}
  onSelectedChange={setIsSelected}
  isInvalid={hasError}
/>
```

### Custom Animations

Customize or disable animations for both the root checkbox and indicator.

```tsx
{
  /* Disable all animations (root and indicator) */
}
<Checkbox
  animation="disable-all"
  isSelected={isSelected}
  onSelectedChange={setIsSelected}
>
  <Checkbox.Indicator />
</Checkbox>;

{
  /* Disable only root animation */
}
<Checkbox
  animation="disabled"
  isSelected={isSelected}
  onSelectedChange={setIsSelected}
>
  <Checkbox.Indicator />
</Checkbox>;

{
  /* Disable only indicator animation */
}
<Checkbox isSelected={isSelected} onSelectedChange={setIsSelected}>
  <Checkbox.Indicator animation="disabled" />
</Checkbox>;

{
  /* Custom animation configuration */
}
<Checkbox
  animation={{ scale: { value: [1, 0.9], timingConfig: { duration: 200 } } }}
  isSelected={isSelected}
  onSelectedChange={setIsSelected}
>
  <Checkbox.Indicator
    animation={{
      scale: { value: [0.5, 1] },
      opacity: { value: [0, 1] },
      translateX: { value: [-8, 0] },
      borderRadius: { value: [12, 0] },
    }}
  />
</Checkbox>;
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

- **Checkbox**: Main container that handles selection state and user interaction. Renders default indicator with animated checkmark if no children provided. Automatically detects surface context for proper styling. Features press scale animation that can be customized or disabled. Supports render function children to access state (`isSelected`, `isInvalid`, `isDisabled`).
- **Checkbox.Indicator**: Optional checkmark container with default slide, scale, opacity, and border radius animations when selected. Renders animated check icon with SVG path drawing animation if no children provided. All animations can be individually customized or disabled. Supports render function children to access state.

## API Reference

### Checkbox

| prop                | type                                                                   | default     | description                                                                                                                                                          |
| ------------------- | ---------------------------------------------------------------------- | ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `children`          | `React.ReactNode \| ((props: CheckboxRenderProps) => React.ReactNode)` | `undefined` | Child elements or render function to customize the checkbox                                                                                                          |
| `isSelected`        | `boolean`                                                              | `undefined` | Whether the checkbox is currently selected                                                                                                                           |
| `onSelectedChange`  | `(isSelected: boolean) => void`                                        | `undefined` | Callback fired when the checkbox selection state changes                                                                                                             |
| `isDisabled`        | `boolean`                                                              | `false`     | Whether the checkbox is disabled and cannot be interacted with                                                                                                       |
| `isInvalid`         | `boolean`                                                              | `false`     | Whether the checkbox is invalid (shows danger color)                                                                                                                 |
| `isOnSurface`       | `boolean`                                                              | `undefined` | Whether checkbox is on a surface background (auto-detected if not set)                                                                                               |
| `hitSlop`           | `number`                                                               | `6`         | Hit slop for the pressable area                                                                                                                                      |
| `animation`         | `CheckboxRootAnimation`                                                | `undefined` | Animation configuration for press scale animation. Use `"disable-all"` to disable all animations including indicator, or `"disabled"` to disable only root animation |
| `className`         | `string`                                                               | `undefined` | Additional CSS classes to apply                                                                                                                                      |
| `...PressableProps` | `PressableProps`                                                       | -           | All standard React Native Pressable props are supported (except disabled)                                                                                            |

#### CheckboxRenderProps

| prop         | type      | description                      |
| ------------ | --------- | -------------------------------- |
| `isSelected` | `boolean` | Whether the checkbox is selected |
| `isInvalid`  | `boolean` | Whether the checkbox is invalid  |
| `isDisabled` | `boolean` | Whether the checkbox is disabled |

#### CheckboxRootAnimation

Configuration object or string literal to control root checkbox animations.

**Type:** `CheckboxRootAnimation = boolean | "disabled" | "disable-all" | { scale?: AnimationValue }`

**String values:**

- `"disabled" | false`: Disables only the root press scale animation
- `"disable-all"`: Disables all animations (root and indicator)

**Object configuration:**

| prop    | type                                                                            | description                             |
| ------- | ------------------------------------------------------------------------------- | --------------------------------------- |
| `scale` | `AnimationValue<{ value?: [number, number]; timingConfig?: WithTimingConfig }>` | Configuration for press scale animation |

**scale** properties:

- `value` (`[number, number]`, default: `[1, 0.95]`): Scale values for [unpressed, pressed] states
- `timingConfig` (`WithTimingConfig`): Animation timing configuration from Reanimated (default: `{ duration: 150 }`)

### Checkbox.Indicator

| prop                   | type                                                                   | default     | description                                                                                            |
| ---------------------- | ---------------------------------------------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------ |
| `children`             | `React.ReactNode \| ((props: CheckboxRenderProps) => React.ReactNode)` | `undefined` | Content or render function for the checkbox indicator                                                  |
| `className`            | `string`                                                               | `undefined` | Additional CSS classes for the indicator                                                               |
| `iconProps`            | `CheckboxIndicatorIconProps`                                           | `undefined` | Custom props for the default animated check icon                                                       |
| `animation`            | `CheckboxIndicatorAnimation`                                           | `undefined` | Animation configuration for indicator animations. Use `"disabled"` to disable all indicator animations |
| `...AnimatedViewProps` | `AnimatedProps<ViewProps>`                                             | -           | All standard React Native Animated View props are supported                                            |

#### CheckboxIndicatorIconProps

Props for customizing the default animated check icon.

| prop            | type     | description                                      |
| --------------- | -------- | ------------------------------------------------ |
| `size`          | `number` | Icon size                                        |
| `strokeWidth`   | `number` | Icon stroke width                                |
| `color`         | `string` | Icon color (defaults to theme accent-foreground) |
| `enterDuration` | `number` | Duration of enter animation (check appearing)    |
| `exitDuration`  | `number` | Duration of exit animation (check disappearing)  |

#### CheckboxIndicatorAnimation

Configuration object or string literal to control indicator animations.

**Type:** `CheckboxIndicatorAnimation = boolean | "disabled" | { opacity?: AnimationValue; borderRadius?: AnimationValue; translateX?: AnimationValue; scale?: AnimationValue }`

**String values:**

- `"disabled" | false`: Disables all indicator animations (opacity, borderRadius, translateX, scale)

**Object configuration:**

| prop           | type                                                                            | description                                    |
| -------------- | ------------------------------------------------------------------------------- | ---------------------------------------------- |
| `opacity`      | `AnimationValue<{ value?: [number, number]; timingConfig?: WithTimingConfig }>` | Opacity animation configuration                |
| `borderRadius` | `AnimationValue<{ value?: [number, number]; timingConfig?: WithTimingConfig }>` | Border radius animation configuration          |
| `translateX`   | `AnimationValue<{ value?: [number, number]; timingConfig?: WithTimingConfig }>` | Horizontal translation animation configuration |
| `scale`        | `AnimationValue<{ value?: [number, number]; timingConfig?: WithTimingConfig }>` | Scale animation configuration                  |

**Default animation values:**

- `opacity`: `value: [0, 1]`, `timingConfig: { duration: 100 }`
- `borderRadius`: `value: [8, 0]`, `timingConfig: { duration: 50 }`
- `translateX`: `value: [-4, 0]`, `timingConfig: { duration: 100 }`
- `scale`: `value: [0.8, 1]`, `timingConfig: { duration: 100 }`

Each animation property supports:

- `value` (`[number, number]`): Animation values for [unselected, selected] states
- `timingConfig` (`WithTimingConfig`): Reanimated timing configuration
