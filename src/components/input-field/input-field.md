# InputField

A compound text input component that wraps a text input and optional leading or trailing addons in a single styled container.

## Import

```tsx
import { InputField } from 'heroui-native';
```

## Anatomy

```tsx
<InputField>
  <InputField.Addon>{/* leading content */}</InputField.Addon>
  <InputField.Input />
  <InputField.Addon>{/* trailing content */}</InputField.Addon>
</InputField>
```

- **InputField**: Root container that owns the visual shell (border, background, rounded corners) and tracks focus state. Accepts `value` and `onChange`, providing them to children via context.
- **InputField.Addon**: Plain flex `View` for leading or trailing content such as icons, labels, or buttons. Naturally sized as a flex sibling — no absolute positioning required.
- **InputField.Input**: Wraps the [Input](../input/input.md) component with shell-stripping overrides so the root owns the visual shell. Reads `value` and `onChangeText` from context automatically.

## Usage

### Basic Usage

InputField works seamlessly with or without addons for collecting user input.

```tsx
import { InputField } from 'heroui-native';

<InputField value={value} onChange={setValue}>
  <InputField.Input placeholder="Enter your email" />
</InputField>
```

### With Leading Addon

Place an icon before the input using `InputField.Addon`.

```tsx
<InputField value={value} onChange={setValue}>
  <InputField.Addon>
    <Icon name="mail" size={16} />
  </InputField.Addon>
  <InputField.Input placeholder="Email" keyboardType="email-address" />
</InputField>
```

### With Leading and Trailing Addons

Place addons on both sides of the input to compose complex layouts.

```tsx
<InputField value={value} onChange={setValue}>
  <InputField.Addon>
    <Text>$</Text>
  </InputField.Addon>
  <InputField.Input placeholder="0.00" keyboardType="decimal-pad" />
  <InputField.Addon>
    <Text>USD</Text>
  </InputField.Addon>
</InputField>
```

### With Trailing Interactive Addon

Addons can contain pressable elements such as a password visibility toggle.

```tsx
<InputField value={value} onChange={setValue}>
  <InputField.Input placeholder="Password" secureTextEntry={!isVisible} />
  <InputField.Addon>
    <Pressable onPress={() => setIsVisible(!isVisible)}>
      <Icon name={isVisible ? 'eye-off' : 'eye'} size={16} />
    </Pressable>
  </InputField.Addon>
</InputField>
```

### Within TextField

InputField works seamlessly with TextField for complete form structure.

```tsx
<TextField isRequired isInvalid={hasError}>
  <Label>Amount</Label>
  <InputField value={value} onChange={setValue}>
    <InputField.Addon>
      <Text>$</Text>
    </InputField.Addon>
    <InputField.Input placeholder="0.00" keyboardType="decimal-pad" />
  </InputField>
  <FieldError>Please enter a valid amount</FieldError>
</TextField>
```

### With Validation

Display error state when the input is invalid.

```tsx
<InputField isInvalid={isInvalid} value={value} onChange={setValue}>
  <InputField.Input placeholder="Username" />
</InputField>
```

### Disabled State

Disable the input to prevent interaction.

```tsx
<InputField isDisabled value="Read only value">
  <InputField.Input placeholder="Cannot edit" />
</InputField>
```

## Example

```tsx
import { Ionicons } from '@expo/vector-icons';
import { FieldError, InputField, Label, TextField } from 'heroui-native';
import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

export default function InputFieldExample() {
  const [amount, setAmount] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <View className="gap-4 px-5">
      <TextField isRequired>
        <Label>Amount</Label>
        <InputField value={amount} onChange={setAmount}>
          <InputField.Addon>
            <Text>$</Text>
          </InputField.Addon>
          <InputField.Input placeholder="0.00" keyboardType="decimal-pad" />
        </InputField>
        <FieldError>Please enter a valid amount</FieldError>
      </TextField>

      <TextField isRequired>
        <Label>Password</Label>
        <InputField value={password} onChange={setPassword}>
          <InputField.Input
            placeholder="Enter your password"
            secureTextEntry={!isPasswordVisible}
          />
          <InputField.Addon>
            <Pressable onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
              <Ionicons
                name={isPasswordVisible ? 'eye-off-outline' : 'eye-outline'}
                size={16}
              />
            </Pressable>
          </InputField.Addon>
        </InputField>
      </TextField>
    </View>
  );
}
```

You can find more examples in the [GitHub repository](<https://github.com/heroui-inc/heroui-native/blob/rc/example/src/app/(home)/components/input-field.tsx>).

## API Reference

### InputField

| prop           | type                      | default     | description                                                                               |
| -------------- | ------------------------- | ----------- | ----------------------------------------------------------------------------------------- |
| `children`     | `React.ReactNode`         | -           | Children elements to be rendered inside the input field                                   |
| `value`        | `string`                  | -           | Controlled input text value                                                               |
| `onChange`     | `(value: string) => void` | -           | Callback fired when the input text changes                                                |
| `isDisabled`   | `boolean`                 | `false`     | Whether the entire input field is disabled                                                |
| `isInvalid`    | `boolean`                 | `false`     | Whether the input field is in an invalid state                                            |
| `isRequired`   | `boolean`                 | `false`     | Whether the input field is required (shows asterisk in label)                             |
| `className`    | `string`                  | -           | Additional CSS classes for the root container                                             |
| `animation`    | `AnimationRootDisableAll` | -           | Animation configuration. Use `"disable-all"` to disable all animations including children |
| `...ViewProps` | `ViewProps`               | -           | All standard React Native View props are supported                                        |

#### AnimationRootDisableAll

Animation configuration for the InputField root component. Can be:

- `"disable-all"`: Disable all animations including children (cascades down)
- `undefined`: Use default animations

### InputField.Addon

A `View` sized to its content, placed before or after `InputField.Input`. Use `pointerEvents="none"` with `accessibilityElementsHidden` and `importantForAccessibility="no-hide-descendants"` for purely decorative icons.

| prop           | type              | default | description                                        |
| -------------- | ----------------- | ------- | -------------------------------------------------- |
| `children`     | `React.ReactNode` | -       | Content to render inside the addon                 |
| `className`    | `string`          | -       | Additional CSS classes                             |
| `...ViewProps` | `ViewProps`       | -       | All standard React Native View props are supported |

### InputField.Input

Extends [Input](../input/input.md) props with `value` and `onChangeText` omitted — they are provided by the InputField root via context.

| prop                        | type             | default               | description                                                              |
| --------------------------- | ---------------- | --------------------- | ------------------------------------------------------------------------ |
| `isInvalid`                 | `boolean`        | from context          | Whether the input is in an invalid state (overrides context)             |
| `isDisabled`                | `boolean`        | from context          | Whether the input is disabled (overrides context)                        |
| `isBottomSheetAware`        | `boolean`        | `true`                | Whether focus/blur handlers are wired to bottom sheet keyboard avoidance |
| `className`                 | `string`         | -                     | Additional CSS classes for the TextInput                                 |
| `selectionColorClassName`   | `string`         | `"accent-accent"`     | Custom className for the selection color                                 |
| `placeholderColorClassName` | `string`         | `"field-placeholder"` | Custom className for the placeholder text color                          |
| `...TextInputProps`         | `TextInputProps` | -                     | All standard React Native TextInput props are supported                  |

> **Note**: When used within a `TextField` component, `InputField` automatically consumes form state (isDisabled, isInvalid, isRequired) from `TextField` via context.

## Hooks

### useInputField

Hook to access the InputField context values. Must be used within an `InputField` component.

```tsx
import { useInputField } from 'heroui-native';

const { value, onChange, isFocused, isDisabled, isInvalid } = useInputField();
```

#### Returns

| property       | type                         | description                                      |
| -------------- | ---------------------------- | ------------------------------------------------ |
| `value`        | `string \| undefined`        | Current controlled input text value              |
| `onChange`     | `((value: string) => void) \| undefined` | Callback to update the input text    |
| `isFocused`    | `boolean`                    | Whether the inner TextInput is currently focused |
| `setIsFocused` | `(focused: boolean) => void` | Callback to update the focus state               |
| `isDisabled`   | `boolean`                    | Whether the input field is disabled              |
| `isInvalid`    | `boolean`                    | Whether the input field is in an invalid state   |
| `isRequired`   | `boolean`                    | Whether the input field is required              |
