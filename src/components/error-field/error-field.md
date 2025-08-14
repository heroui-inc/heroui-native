# ErrorField

Displays validation error messages with smooth animations.

## Interactive Demo

[Interactive demo placeholder - will be added to documentation site]

## Imports

Note: Before importing this component, ensure you have completed the setup as per the [Quick Start guide](../../../README.md).

```tsx
import { ErrorField } from 'heroui-native';
```

## Usage

### Basic Usage

The ErrorField component displays error messages when validation fails.

```tsx
<ErrorField isInvalid={true}>This field is required</ErrorField>
```

### Controlled Visibility

Control when the error appears using the `isInvalid` prop.

```tsx
const [isInvalid, setIsInvalid] = useState(false);

<ErrorField isInvalid={isInvalid}>
  Please enter a valid email address
</ErrorField>;
```

### Custom Content

Pass custom React components as children instead of strings.

```tsx
<ErrorField isInvalid={true}>
  <View className="flex-row items-center">
    <Icon name="alert-circle" />
    <Text className="ml-2 text-danger">Invalid input</Text>
  </View>
</ErrorField>
```

### Custom Animations

Override default entering and exiting animations.

```tsx
import { SlideInDown, SlideOutUp } from 'react-native-reanimated';

<ErrorField
  isInvalid={true}
  entering={SlideInDown.duration(200)}
  exiting={SlideOutUp.duration(150)}
>
  Field validation failed
</ErrorField>;
```

### Custom Styling

Apply custom styles to the container and text elements.

```tsx
<ErrorField
  isInvalid={true}
  className="mt-2"
  classNames={{
    container: 'bg-danger/10 p-2 rounded',
    text: 'text-xs font-medium',
  }}
>
  Password must be at least 8 characters
</ErrorField>
```

## Example

```tsx
import { ErrorField, TextField } from 'heroui-native';
import { useState } from 'react';
import { View } from 'react-native';

export default function ErrorFieldExample() {
  const [email, setEmail] = useState('');
  const [showError, setShowError] = useState(false);

  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleBlur = () => {
    setShowError(email !== '' && !isValidEmail);
  };

  return (
    <View className="p-4">
      <TextField>
        <TextField.Label>Email Address</TextField.Label>
        <TextField.Input
          placeholder="Enter your email"
          value={email}
          onChangeText={setEmail}
          onBlur={handleBlur}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextField.Description>
          We'll use this to contact you
        </TextField.Description>
      </TextField>

      <ErrorField isInvalid={showError} className="ml-1">
        Please enter a valid email address
      </ErrorField>
    </View>
  );
}
```

## API Reference

### ErrorField

| prop                   | type                                    | default     | description                                                           |
| ---------------------- | --------------------------------------- | ----------- | --------------------------------------------------------------------- |
| `children`             | `React.ReactNode`                       | `undefined` | The content of the error field. String children are wrapped with Text |
| `isInvalid`            | `boolean`                               | `false`     | Controls the visibility of the error field                            |
| `className`            | `string`                                | `undefined` | Additional CSS classes for the container                              |
| `classNames`           | `{ container?: string, text?: string }` | `undefined` | Additional CSS classes for different parts of the component           |
| `...AnimatedViewProps` | `AnimatedProps<ViewProps>`              | -           | All Reanimated Animated.View props are supported                      |
