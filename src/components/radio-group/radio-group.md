# RadioGroup

Container that manages the selection state of Radio components.

## Interactive Demo

[Interactive demo placeholder - will be added to documentation site]

## Imports

Note: Before importing this component, ensure you have completed the setup as per the [Quick Start guide](../../../README.md).

```tsx
import { RadioGroup } from 'heroui-native';
```

## Usage

### Basic Usage

RadioGroup manages the selection state for a set of Radio components.

```tsx
<RadioGroup value={value} onValueChange={setValue}>
  <Radio value="option1">...</Radio>
  <Radio value="option2">...</Radio>
  <Radio value="option3">...</Radio>
</RadioGroup>
```

### Horizontal Orientation

Display radio options in a horizontal layout.

```tsx
<RadioGroup value={value} onValueChange={setValue} orientation="horizontal">
  <Radio value="option1">...</Radio>
  <Radio value="option2">...</Radio>
  <Radio value="option3">...</Radio>
</RadioGroup>
```

### Disabled State

Disable all radio options within the group.

```tsx
<RadioGroup value={value} onValueChange={setValue} isDisabled>
  <Radio value="option1">...</Radio>
  <Radio value="option2">...</Radio>
  <Radio value="option3">...</Radio>
</RadioGroup>
```

### With Validation

Show validation errors using the ErrorMessage component.

```tsx
<RadioGroup value={value} onValueChange={setValue} isValid={false}>
  <Radio value="option1">...</Radio>
  <Radio value="option2">...</Radio>
  <Radio value="option3">...</Radio>
  <RadioGroup.ErrorMessage>Please select an option</RadioGroup.ErrorMessage>
</RadioGroup>
```

## Example

```tsx
import { Radio, RadioGroup } from 'heroui-native';
import React from 'react';
import { View, Text } from 'react-native';

export default function RadioGroupExample() {
  const [selectedCity, setSelectedCity] = React.useState('london');
  const [selectedPlan, setSelectedPlan] = React.useState('');

  const isValidSelection = selectedPlan !== '';

  return (
    <View className="gap-8">
      <View>
        <Text className="text-lg font-semibold mb-3">Select City</Text>
        <RadioGroup value={selectedCity} onValueChange={setSelectedCity}>
          <Radio value="paris">
            <Radio.Content>
              <Radio.Label>Paris</Radio.Label>
            </Radio.Content>
          </Radio>
          <Radio value="london">
            <Radio.Content>
              <Radio.Label>London</Radio.Label>
            </Radio.Content>
          </Radio>
          <Radio value="berlin">
            <Radio.Content>
              <Radio.Label>Berlin</Radio.Label>
            </Radio.Content>
          </Radio>
        </RadioGroup>
      </View>

      <View>
        <Text className="text-lg font-semibold mb-3">Choose Plan</Text>
        <RadioGroup
          value={selectedPlan}
          onValueChange={setSelectedPlan}
          isValid={isValidSelection}
          orientation="vertical"
        >
          <Radio value="basic">
            <Radio.Content>
              <Radio.Label>Basic Plan</Radio.Label>
              <Radio.Description>Perfect for individuals</Radio.Description>
            </Radio.Content>
          </Radio>
          <Radio value="pro">
            <Radio.Content>
              <Radio.Label>Pro Plan</Radio.Label>
              <Radio.Description>Best for small teams</Radio.Description>
            </Radio.Content>
          </Radio>
          <Radio value="enterprise">
            <Radio.Content>
              <Radio.Label>Enterprise</Radio.Label>
              <Radio.Description>
                Custom solutions for large organizations
              </Radio.Description>
            </Radio.Content>
          </Radio>
          <RadioGroup.ErrorMessage>
            Please select a plan to continue
          </RadioGroup.ErrorMessage>
        </RadioGroup>
      </View>
    </View>
  );
}
```

## Anatomy

```tsx
<RadioGroup>
  <Radio>...</Radio>
  <RadioGroup.ErrorMessage>...</RadioGroup.ErrorMessage>
</RadioGroup>
```

- **RadioGroup**: Container that manages the selection state of Radio components. Provides context for value, orientation, and validation state to all child Radio components.
- **RadioGroup.ErrorMessage**: Error message displayed when radio group is invalid. Shown with animation below the radio group content. Takes full width when orientation is horizontal.

## API Reference

### RadioGroup

| prop            | type                          | default      | description                                        |
| --------------- | ----------------------------- | ------------ | -------------------------------------------------- |
| `children`      | `React.ReactNode`             | `undefined`  | Radio group content                                |
| `value`         | `string \| undefined`         | `undefined`  | The currently selected value of the radio group    |
| `orientation`   | `'horizontal' \| 'vertical'`  | `'vertical'` | Radio group orientation                            |
| `isDisabled`    | `boolean`                     | `false`      | Whether the entire radio group is disabled         |
| `isValid`       | `boolean`                     | `true`       | Whether the radio group is valid                   |
| `className`     | `string`                      | `undefined`  | Custom class name                                  |
| `onValueChange` | `(value: string) => void`     | `undefined`  | Callback fired when the selected value changes     |
| `...ViewProps`  | `Omit<ViewProps, 'disabled'>` | -            | All standard React Native View props are supported |

### RadioGroup.ErrorMessage

| prop                   | type                            | default     | description                                                           |
| ---------------------- | ------------------------------- | ----------- | --------------------------------------------------------------------- |
| `children`             | `React.ReactNode`               | `undefined` | The content of the error field. String children are wrapped with Text |
| `isValid`              | `boolean`                       | `true`      | Controls the visibility of the error field                            |
| `className`            | `string`                        | `undefined` | Additional CSS classes for the container                              |
| `classNames`           | `ElementSlots<ErrorFieldSlots>` | `undefined` | Additional CSS classes for different parts of the component           |
| `...AnimatedViewProps` | `AnimatedProps<ViewProps>`      | -           | All Reanimated Animated.View props are supported                      |

#### ElementSlots<ErrorFieldSlots>

| prop        | type     | description                               |
| ----------- | -------- | ----------------------------------------- |
| `container` | `string` | Custom class name for the error container |
| `text`      | `string` | Custom class name for the error text      |
