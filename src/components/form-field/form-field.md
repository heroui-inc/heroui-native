# FormField

Provides consistent layout and interaction for form controls with label, description, and error handling. Perfect for Switch and Checkbox components when you want the entire field to be pressable.

## Import

```tsx
import { Description, FieldError, FormField, Label } from 'heroui-native';
```

## Anatomy

```tsx
<FormField>
  <Label>...</Label>
  <Description>...</Description>
  <FormField.Indicator>...</FormField.Indicator>
  <FieldError>...</FieldError>
</FormField>
```

- **FormField**: Root container that manages layout and state propagation
- **Label**: Primary text label for the control (from [Label](../label/label.md) component)
- **Description**: Secondary descriptive helper text (from [Description](../description/description.md) component)
- **FormField.Indicator**: Container for the form control component (Switch, Checkbox)
- **FieldError**: Validation error message display (from [FieldError](../field-error/field-error.md) component)

## Usage

### Basic Usage

FormField wraps form controls to provide consistent layout and state management.

```tsx
<FormField isSelected={value} onSelectedChange={setValue}>
  <Label className="flex-1">Label text</Label>
  <FormField.Indicator />
</FormField>
```

### With Description

Add helper text below the label using the Description component.

```tsx
<FormField isSelected={value} onSelectedChange={setValue}>
  <View className="flex-1">
    <Label>Enable notifications</Label>
    <Description>
      Receive push notifications about your account activity
    </Description>
  </View>
  <FormField.Indicator />
</FormField>
```

### With Error Message

Display validation errors using the ErrorMessage component.

```tsx
<FormField
  isSelected={value}
  onSelectedChange={setValue}
  isInvalid={!value}
  className="flex-col items-start gap-1"
>
  <View className="flex-row items-center gap-2">
    <View className="flex-1">
      <Label>I agree to the terms</Label>
      <Description>
        By checking this box, you agree to our Terms of Service
      </Description>
    </View>
    <FormField.Indicator variant="checkbox" />
  </View>
  <FieldError>This field is required</FieldError>
</FormField>
```

### Disabled State

Control interactivity with the disabled prop.

```tsx
<FormField isSelected={value} onSelectedChange={setValue} isDisabled>
  <View className="flex-1">
    <Label>Disabled field</Label>
    <Description>This field is disabled</Description>
  </View>
  <FormField.Indicator />
</FormField>
```

### Disabling All Animations

Disable all animations including children by using `"disable-all"`. This cascades down to all child components.

```tsx
<FormField
  isSelected={value}
  onSelectedChange={setValue}
  animation="disable-all"
>
  <View className="flex-1">
    <Label>Label text</Label>
    <Description>Description text</Description>
  </View>
  <FormField.Indicator />
</FormField>
```

## Example

```tsx
import {
  Checkbox,
  Description,
  FieldError,
  FormField,
  Label,
  Switch,
} from 'heroui-native';
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
          <View className="flex-1">
            <Label>Enable notifications</Label>
            <Description>
              Receive push notifications about your account activity
            </Description>
          </View>
          <FormField.Indicator />
        </FormField>

        <FormField
          isSelected={terms}
          onSelectedChange={setTerms}
          isInvalid={!terms}
          className="flex-col items-start gap-1"
        >
          <View className="flex-row items-center gap-2">
            <View className="flex-1">
              <Label>I agree to the terms and conditions</Label>
              <Description>
                By checking this box, you agree to our Terms of Service
              </Description>
            </View>
            <FormField.Indicator className="mt-0.5">
              <Checkbox />
            </FormField.Indicator>
          </View>
          <FieldError>This field is required</FieldError>
        </FormField>

        <FormField isSelected={newsletter} onSelectedChange={setNewsletter}>
          <View className="flex-1">
            <Label>Subscribe to newsletter</Label>
          </View>
          <FormField.Indicator>
            <Checkbox color="warning" />
          </FormField.Indicator>
        </FormField>
      </View>
    </ScrollView>
  );
}
```

You can find more examples in the [GitHub repository](https://github.com/heroui-inc/heroui-native/blob/beta/example/src/app/(home)/components/form-field.tsx).

## API Reference

### FormField

| prop              | type                                                                    | default     | description                                                                               |
| ----------------- | ----------------------------------------------------------------------- | ----------- | ----------------------------------------------------------------------------------------- |
| children          | `React.ReactNode \| ((props: FormFieldRenderProps) => React.ReactNode)` | -           | Content to render inside the form control, or a render function                           |
| isSelected        | `boolean`                                                               | `undefined` | Whether the control is selected/checked                                                   |
| isDisabled        | `boolean`                                                               | `false`     | Whether the form control is disabled                                                      |
| isInvalid         | `boolean`                                                               | `false`     | Whether the form control is invalid                                                       |
| className         | `string`                                                                | -           | Custom class name for the root element                                                    |
| onSelectedChange  | `(isSelected: boolean) => void`                                         | -           | Callback when selection state changes                                                     |
| animation         | `"disable-all" \| undefined`                                            | `undefined` | Animation configuration. Use `"disable-all"` to disable all animations including children |
| ...PressableProps | `PressableProps`                                                        | -           | All React Native Pressable props are supported                                            |

### Label

The `Label` component automatically consumes form state (`isDisabled`, `isInvalid`) from the FormField context.

**Note**: For complete prop documentation, see the [Label component documentation](../label/label.md).

### Description

The `Description` component automatically consumes form state (`isDisabled`, `isInvalid`) from the FormField context.

**Note**: For complete prop documentation, see the [Description component documentation](../description/description.md).

### FormField.Indicator

| prop         | type                     | default    | description                                                |
| ------------ | ------------------------ | ---------- | ---------------------------------------------------------- |
| children     | `React.ReactNode`        | -          | Control component to render (Switch, Checkbox)             |
| variant      | `'checkbox' \| 'switch'` | `'switch'` | Variant of the control to render when no children provided |
| className    | `string`                 | -          | Custom class name for the indicator element                |
| ...ViewProps | `ViewProps`              | -          | All React Native View props are supported                  |

**Note**: When children are provided, the component automatically passes down `isSelected`, `onSelectedChange`, `isDisabled`, and `isInvalid` props from the FormField context if they are not already present on the child component.

### FieldError

The `FieldError` component automatically consumes form state (`isInvalid`) from the FormField context.

**Note**: For complete prop documentation, see the [FieldError component documentation](../field-error/field-error.md). The error message visibility is controlled by the `isInvalid` state of the parent FormField.

## Hooks

### useFormField

**Returns:**

| property           | type                                           | description                                    |
| ------------------ | ---------------------------------------------- | ---------------------------------------------- |
| `isSelected`       | `boolean \| undefined`                         | Whether the control is selected/checked        |
| `onSelectedChange` | `((isSelected: boolean) => void) \| undefined` | Callback when selection state changes          |
| `isDisabled`       | `boolean`                                      | Whether the form control is disabled           |
| `isInvalid`        | `boolean`                                      | Whether the form control is invalid            |
| `isPressed`        | `SharedValue<boolean>`                         | Reanimated shared value indicating press state |
