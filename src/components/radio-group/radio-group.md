# RadioGroup

A set of radio buttons where only one option can be selected at a time.

## Imports

Note: Before importing this component, ensure you have completed the setup as per the [Quick Start guide](../../../README.md).

```tsx
import { RadioGroup } from 'heroui-native';
```

## Usage

### Basic Usage

RadioGroup with simple string children automatically renders title and indicator.

```tsx
<RadioGroup value={value} onValueChange={setValue}>
  <RadioGroup.Item value="option1">Option 1</RadioGroup.Item>
  <RadioGroup.Item value="option2">Option 2</RadioGroup.Item>
  <RadioGroup.Item value="option3">Option 3</RadioGroup.Item>
</RadioGroup>
```

### With Descriptions

Add descriptive text below each radio option for additional context.

```tsx
<RadioGroup value={value} onValueChange={setValue}>
  <RadioGroup.Item value="standard">
    <View>
      <RadioGroup.Title>Standard Shipping</RadioGroup.Title>
      <RadioGroup.Description>
        Delivered in 5-7 business days
      </RadioGroup.Description>
    </View>
    <RadioGroup.Indicator />
  </RadioGroup.Item>
  <RadioGroup.Item value="express">
    <View>
      <RadioGroup.Title>Express Shipping</RadioGroup.Title>
      <RadioGroup.Description>
        Delivered in 2-3 business days
      </RadioGroup.Description>
    </View>
    <RadioGroup.Indicator />
  </RadioGroup.Item>
</RadioGroup>
```

### Custom Indicator

Replace the default indicator thumb with custom content.

```tsx
<RadioGroup value={value} onValueChange={setValue}>
  <RadioGroup.Item value="custom">
    <RadioGroup.Title>Custom Option</RadioGroup.Title>
    <RadioGroup.Indicator>
      {value === 'custom' && (
        <Animated.View entering={FadeIn}>
          <Icon name="check" size={12} />
        </Animated.View>
      )}
    </RadioGroup.Indicator>
  </RadioGroup.Item>
</RadioGroup>
```

### With Error Message

Display validation errors below the radio group.

```tsx
<RadioGroup value={value} onValueChange={setValue} isInvalid={!value}>
  <RadioGroup.Item value="agree">I agree to the terms</RadioGroup.Item>
  <RadioGroup.Item value="disagree">I do not agree</RadioGroup.Item>
  <RadioGroup.ErrorMessage>
    Please select an option to continue
  </RadioGroup.ErrorMessage>
</RadioGroup>
```

## Example

```tsx
import { RadioGroup, Surface, useTheme } from 'heroui-native';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';
import { AppText } from '../components/app-text';

export default function PaymentMethodExample() {
  const [paymentMethod, setPaymentMethod] = React.useState('card');
  const { colors } = useTheme();

  return (
    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
      <RadioGroup.Item value="card">
        <View>
          <View className="flex-row items-center gap-1.5">
            <Ionicons name="card-outline" size={16} color={colors.foreground} />
            <RadioGroup.Title>Credit/Debit Card</RadioGroup.Title>
          </View>
          <RadioGroup.Description>
            Pay securely with your credit or debit card
          </RadioGroup.Description>
        </View>
        <RadioGroup.Indicator />
      </RadioGroup.Item>

      <RadioGroup.Item value="paypal">
        <View>
          <RadioGroup.Title>PayPal</RadioGroup.Title>
          <RadioGroup.Description>
            Fast and secure payment with PayPal
          </RadioGroup.Description>
        </View>
        <RadioGroup.Indicator />
      </RadioGroup.Item>

      <RadioGroup.Item value="bank">
        <View>
          <RadioGroup.Title>Bank Transfer</RadioGroup.Title>
          <RadioGroup.Description>
            Direct transfer from your bank account
          </RadioGroup.Description>
        </View>
        <RadioGroup.Indicator />
      </RadioGroup.Item>
    </RadioGroup>
  );
}
```

## Anatomy

```tsx
<RadioGroup>
  <RadioGroup.Item>
    <RadioGroup.Title>...</RadioGroup.Title>
    <RadioGroup.Description>...</RadioGroup.Description>
    <RadioGroup.Indicator>
      <RadioGroup.IndicatorThumb />
    </RadioGroup.Indicator>
  </RadioGroup.Item>
  <RadioGroup.ErrorMessage>...</RadioGroup.ErrorMessage>
</RadioGroup>
```

- **RadioGroup**: Container that manages the selection state of radio items. Supports both horizontal and vertical orientations.
- **RadioGroup.Item**: Individual radio option within a RadioGroup. Must be used inside RadioGroup. Handles selection state and renders default indicator if no children provided.
- **RadioGroup.Title**: Optional clickable text title for the radio option. Linked to the radio for accessibility.
- **RadioGroup.Description**: Optional secondary text below the title. Provides additional context about the radio option.
- **RadioGroup.Indicator**: Optional container for the radio circle. Renders default thumb if no children provided. Manages the visual selection state.
- **RadioGroup.IndicatorThumb**: Optional inner circle that appears when selected. Animates scale based on selection. Can be replaced with custom content.
- **RadioGroup.ErrorMessage**: Error message displayed when radio group is invalid. Shown with animation below the radio group content.

## API Reference

### RadioGroup

| prop            | type                    | default     | description                                        |
| --------------- | ----------------------- | ----------- | -------------------------------------------------- |
| `children`      | `React.ReactNode`       | `undefined` | Radio group content                                |
| `value`         | `string \| undefined`   | `undefined` | The currently selected value of the radio group    |
| `onValueChange` | `(val: string) => void` | `undefined` | Callback fired when the selected value changes     |
| `isDisabled`    | `boolean`               | `false`     | Whether the entire radio group is disabled         |
| `isInvalid`     | `boolean`               | `false`     | Whether the radio group is invalid                 |
| `className`     | `string`                | `undefined` | Custom class name                                  |
| `...ViewProps`  | `ViewProps`             | -           | All standard React Native View props are supported |

### RadioGroup.Item

| prop                | type                                              | default     | description                                                               |
| ------------------- | ------------------------------------------------- | ----------- | ------------------------------------------------------------------------- |
| `children`          | `React.ReactNode`                                 | `undefined` | Radio item content                                                        |
| `value`             | `string`                                          | `undefined` | The value associated with this radio item                                 |
| `color`             | `'default' \| 'success' \| 'warning' \| 'danger'` | `'default'` | Color variant                                                             |
| `isDisabled`        | `boolean`                                         | `false`     | Whether this specific radio item is disabled                              |
| `isInvalid`         | `boolean`                                         | `false`     | Whether the radio item is invalid                                         |
| `className`         | `string`                                          | `undefined` | Custom class name                                                         |
| `...PressableProps` | `PressableProps`                                  | -           | All standard React Native Pressable props are supported (except disabled) |

### RadioGroup.Indicator

| prop                    | type                       | default     | description                                      |
| ----------------------- | -------------------------- | ----------- | ------------------------------------------------ |
| `children`              | `React.ReactNode`          | `undefined` | Indicator content                                |
| `className`             | `string`                   | `undefined` | Custom class name                                |
| `...Animated.ViewProps` | `AnimatedProps<ViewProps>` | -           | All Reanimated Animated.View props are supported |

### RadioGroup.IndicatorThumb

| prop                    | type                       | default     | description                                      |
| ----------------------- | -------------------------- | ----------- | ------------------------------------------------ |
| `className`             | `string`                   | `undefined` | Custom class name                                |
| `...Animated.ViewProps` | `AnimatedProps<ViewProps>` | -           | All Reanimated Animated.View props are supported |

### RadioGroup.Title

| prop                    | type                       | default     | description                                      |
| ----------------------- | -------------------------- | ----------- | ------------------------------------------------ |
| `children`              | `React.ReactNode`          | `undefined` | Title text content                               |
| `className`             | `string`                   | `undefined` | Custom class name for the title element          |
| `...Animated.TextProps` | `AnimatedProps<TextProps>` | -           | All Reanimated Animated.Text props are supported |

### RadioGroup.Description

| prop                    | type                       | default     | description                                      |
| ----------------------- | -------------------------- | ----------- | ------------------------------------------------ |
| `children`              | `React.ReactNode`          | `undefined` | Description text content                         |
| `className`             | `string`                   | `undefined` | Custom class name for the description element    |
| `...Animated.TextProps` | `AnimatedProps<TextProps>` | -           | All Reanimated Animated.Text props are supported |

### RadioGroup.ErrorMessage

| prop                    | type                           | default     | description                                      |
| ----------------------- | ------------------------------ | ----------- | ------------------------------------------------ |
| `children`              | `React.ReactNode`              | `undefined` | The content of the error field                   |
| `isInvalid`             | `boolean`                      | `false`     | Controls the visibility of the error field       |
| `className`             | `string`                       | `undefined` | Additional CSS class for styling                 |
| `classNames`            | `ElementSlots<ErrorViewSlots>` | `undefined` | Additional CSS classes for different parts       |
| `textProps`             | `TextProps`                    | `undefined` | Additional props to pass to the Text component   |
| `...Animated.ViewProps` | `AnimatedProps<ViewProps>`     | -           | All Reanimated Animated.View props are supported |

## Hooks

### useRadioGroupContext

**Returns:**

| Property        | Type                      | Description                                    |
| --------------- | ------------------------- | ---------------------------------------------- |
| `value`         | `string \| undefined`     | Currently selected value                       |
| `isDisabled`    | `boolean`                 | Whether the radio group is disabled            |
| `isInvalid`     | `boolean`                 | Whether the radio group is in an invalid state |
| `onValueChange` | `(value: string) => void` | Function to change the selected value          |

### useRadioGroupItemContext

**Returns:**

| Property     | Type                                              | Description                        |
| ------------ | ------------------------------------------------- | ---------------------------------- |
| `color`      | `'default' \| 'success' \| 'warning' \| 'danger'` | Current color variant              |
| `isSelected` | `boolean`                                         | Whether the radio item is selected |
| `isDisabled` | `boolean`                                         | Whether the radio item is disabled |
| `isInvalid`  | `boolean`                                         | Whether the radio item is invalid  |
