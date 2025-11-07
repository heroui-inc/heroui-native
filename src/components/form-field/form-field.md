# FormField

Provides consistent layout and interaction for form controls with label, description, and error handling. Perfect for Switch and Checkbox components when you want the entire field to be pressable.

## Imports

Note: Before importing this component, ensure you have completed the setup as per the [Quick Start guide](../../../README.md).

```tsx
import { FormField } from 'heroui-native';
```

## Usage

### Basic Usage

FormField wraps form controls to provide consistent layout and state management.

```tsx
<FormField isSelected={value} onSelectedChange={setValue}>
  <FormField.Content>
    <FormField.Title>Label text</FormField.Title>
  </FormField.Content>
  <FormField.Indicator>
    <Switch />
  </FormField.Indicator>
</FormField>
```

### With Description

Add helper text below the label using the Description component.

```tsx
<FormField isSelected={value} onSelectedChange={setValue}>
  <FormField.Content>
    <FormField.Title>Enable notifications</FormField.Title>
    <FormField.Description>
      Receive push notifications about your account activity
    </FormField.Description>
  </FormField.Content>
  <FormField.Indicator>
    <Switch />
  </FormField.Indicator>
</FormField>
```

### With Error Message

Display validation errors using the ErrorMessage component.

```tsx
<FormField isSelected={value} onSelectedChange={setValue} isInvalid={!value}>
  <FormField.Content>
    <FormField.Title>I agree to the terms</FormField.Title>
  </FormField.Content>
  <FormField.Indicator>
    <Checkbox />
  </FormField.Indicator>
  <FormField.ErrorMessage>This field is required</FormField.ErrorMessage>
</FormField>
```

### Inline Layout

Use inline layout for compact horizontal form fields.

```tsx
<View className="flex-row gap-4">
  <FormField isSelected={value1} onSelectedChange={setValue1} isInline>
    <FormField.Content>
      <FormField.Title>Option 1</FormField.Title>
    </FormField.Content>
    <FormField.Indicator>
      <Switch />
    </FormField.Indicator>
  </FormField>

  <FormField isSelected={value2} onSelectedChange={setValue2} isInline>
    <FormField.Content>
      <FormField.Title>Option 2</FormField.Title>
    </FormField.Content>
    <FormField.Indicator>
      <Switch />
    </FormField.Indicator>
  </FormField>
</View>
```

### Vertical Orientation

Stack the indicator above the content for vertical layouts.

```tsx
<FormField
  isSelected={value}
  onSelectedChange={setValue}
  orientation="vertical"
>
  <FormField.Content>
    <FormField.Title>Vertical layout</FormField.Title>
    <FormField.Description>
      The control appears above the text
    </FormField.Description>
  </FormField.Content>
  <FormField.Indicator>
    <Switch />
  </FormField.Indicator>
</FormField>
```

### Disabled and Read-Only States

Control interactivity with disabled and read-only props.

```tsx
<FormField isSelected={value} onSelectedChange={setValue} isDisabled>
  <FormField.Content>
    <FormField.Title>Disabled field</FormField.Title>
  </FormField.Content>
  <FormField.Indicator>
    <Switch />
  </FormField.Indicator>
</FormField>
```

## Example

```tsx
import { Checkbox, FormField, Switch } from 'heroui-native';
import React from 'react';
import { ScrollView, View } from 'react-native';

export default function FormFieldExample() {
  const [notifications, setNotifications] = React.useState(false);
  const [terms, setTerms] = React.useState(false);
  const [newsletter, setNewsletter] = React.useState(true);

  return (
    <ScrollView className="bg-background p-4">
      <View className="gap-4">
        <FormField
          isSelected={notifications}
          onSelectedChange={setNotifications}
        >
          <FormField.Content>
            <FormField.Title>Enable notifications</FormField.Title>
            <FormField.Description>
              Receive push notifications about your account activity
            </FormField.Description>
          </FormField.Content>
          <FormField.Indicator>
            <Switch />
          </FormField.Indicator>
        </FormField>

        <FormField
          isSelected={terms}
          onSelectedChange={setTerms}
          isInvalid={!terms}
        >
          <FormField.Content>
            <FormField.Title>
              I agree to the terms and conditions
            </FormField.Title>
            <FormField.Description>
              By checking this box, you agree to our Terms of Service
            </FormField.Description>
          </FormField.Content>
          <FormField.Indicator className="mt-0.5">
            <Checkbox />
          </FormField.Indicator>
          <FormField.ErrorMessage>
            This field is required
          </FormField.ErrorMessage>
        </FormField>

        <FormField isSelected={newsletter} onSelectedChange={setNewsletter}>
          <FormField.Content>
            <FormField.Title>Subscribe to newsletter</FormField.Title>
          </FormField.Content>
          <FormField.Indicator>
            <Checkbox color="warning" />
          </FormField.Indicator>
        </FormField>
      </View>
    </ScrollView>
  );
}
```

## Anatomy

```tsx
<FormField>
  <FormField.Content>
    <FormField.Title>...</FormField.Title>
    <FormField.Description>...</FormField.Description>
  </FormField.Content>
  <FormField.Indicator>...</FormField.Indicator>
  <FormField.ErrorMessage>...</FormField.ErrorMessage>
</FormField>
```

- **FormField**: Root container that manages layout and state propagation
- **FormField.Content**: Container for label and description text
- **FormField.Title**: Primary text title for the control
- **FormField.Description**: Secondary descriptive helper text
- **FormField.Indicator**: Container for the form control component
- **FormField.ErrorMessage**: Validation error message display

## API Reference

### FormField

| prop                       | type                            | default        | description                                                  |
| -------------------------- | ------------------------------- | -------------- | ------------------------------------------------------------ |
| children                   | `React.ReactNode`               | -              | Content to render inside the form control                    |
| orientation                | `'horizontal' \| 'vertical'`    | `'horizontal'` | Layout orientation of the form control                       |
| alignIndicator             | `'start' \| 'end'`              | `'end'`        | Alignment of the indicator (horizontal orientation only)     |
| isSelected                 | `boolean`                       | `undefined`    | Whether the control is selected/checked                      |
| isDisabled                 | `boolean`                       | `false`        | Whether the form control is disabled                         |
| isInline                   | `boolean`                       | `false`        | Whether the form control is inline (for flex-row containers) |
| isInvalid                  | `boolean`                       | `false`        | Whether the form control is invalid                          |
| className                  | `string`                        | -              | Custom class name for the root element                       |
| onSelectedChange           | `(isSelected: boolean) => void` | -              | Callback when selection state changes                        |
| ...Animated.PressableProps | `AnimatedProps<PressableProps>` | -              | All Reanimated AnimatedPressable props are supported         |

### FormField.Content

| prop                  | type                       | default | description                                      |
| --------------------- | -------------------------- | ------- | ------------------------------------------------ |
| children              | `React.ReactNode`          | -       | Content to render inside the content container   |
| className             | `string`                   | -       | Custom class name for the content element        |
| ...Animated.ViewProps | `AnimatedProps<ViewProps>` | -       | All Reanimated Animated.View props are supported |

### FormField.Title

| prop                  | type                       | default | description                                     |
| --------------------- | -------------------------- | ------- | ----------------------------------------------- |
| children              | `React.ReactNode`          | -       | Title text content                              |
| className             | `string`                   | -       | Custom class name for the title element         |
| ...Animated.TextProps | `AnimatedProps<TextProps>` | -       | All Reanimated AnimatedText props are supported |

### FormField.Description

| prop                  | type                       | default | description                                     |
| --------------------- | -------------------------- | ------- | ----------------------------------------------- |
| children              | `React.ReactNode`          | -       | Description text content                        |
| className             | `string`                   | -       | Custom class name for the description element   |
| ...Animated.TextProps | `AnimatedProps<TextProps>` | -       | All Reanimated AnimatedText props are supported |

### FormField.Indicator

| prop                  | type                       | default | description                                      |
| --------------------- | -------------------------- | ------- | ------------------------------------------------ |
| children              | `React.ReactNode`          | -       | Control component to render (Switch, Checkbox)   |
| className             | `string`                   | -       | Custom class name for the indicator element      |
| ...Animated.ViewProps | `AnimatedProps<ViewProps>` | -       | All Reanimated Animated.View props are supported |

### FormField.ErrorMessage

| prop                  | type                           | default | description                                             |
| --------------------- | ------------------------------ | ------- | ------------------------------------------------------- |
| children              | `React.ReactNode`              | -       | Error message content                                   |
| isInvalid             | `boolean`                      | `false` | Controls the visibility of the error field              |
| className             | `string`                       | -       | Custom class name for styling                           |
| classNames            | `ElementSlots<ErrorViewSlots>` | -       | Custom class names for different parts of the component |
| ...Animated.ViewProps | `AnimatedProps<ViewProps>`     | -       | All Reanimated Animated.View props are supported        |

#### ElementSlots<ErrorViewSlots>

| prop        | type     | description                               |
| ----------- | -------- | ----------------------------------------- |
| `container` | `string` | Custom class name for the error container |
| `text`      | `string` | Custom class name for the error text      |

## Hooks

### useFormField

**Returns:**

| property           | type                                           | description                                    |
| ------------------ | ---------------------------------------------- | ---------------------------------------------- |
| `isSelected`       | `boolean \| undefined`                         | Whether the control is selected/checked        |
| `onSelectedChange` | `((isSelected: boolean) => void) \| undefined` | Callback when selection state changes          |
| `isDisabled`       | `boolean`                                      | Whether the form control is disabled           |
| `isInline`         | `boolean`                                      | Whether the form control is inline             |
| `isInvalid`        | `boolean`                                      | Whether the form control is invalid            |
| `isPressed`        | `SharedValue<boolean>`                         | Reanimated shared value indicating press state |
