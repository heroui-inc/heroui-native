# ErrorView

Displays validation error message content with smooth animations.

## Imports

Note: Before importing this component, ensure you have completed the setup as per the [Quick Start guide](../../../README.md).

```tsx
import { ErrorView } from 'heroui-native';
```

## Usage

### Basic Usage

The ErrorView component displays error messages when validation fails.

```tsx
<ErrorView isInvalid={true}>This field is required</ErrorView>
```

### Controlled Visibility

Control when the error appears using the `isInvalid` prop.

```tsx
const [isInvalid, setIsInvalid] = useState(false);

<ErrorView isInvalid={isInvalid}>
  Please enter a valid email address
</ErrorView>;
```

### Custom Content

Pass custom React components as children instead of strings.

```tsx
<ErrorView isInvalid={true}>
  <View className="flex-row items-center">
    <Icon name="alert-circle" />
    <Text className="ml-2 text-danger">Invalid input</Text>
  </View>
</ErrorView>
```

### Custom Animations

Override default entering and exiting animations.

```tsx
import { SlideInDown, SlideOutUp } from 'react-native-reanimated';

<ErrorView
  isInvalid={true}
  entering={SlideInDown.duration(200)}
  exiting={SlideOutUp.duration(150)}
>
  Field validation failed
</ErrorView>;
```

### Custom Styling

Apply custom styles to the container and text elements.

```tsx
<ErrorView
  isInvalid={true}
  className="mt-2"
  classNames={{
    container: 'bg-danger/10 p-2 rounded',
    text: 'text-xs font-medium',
  }}
>
  Password must be at least 8 characters
</ErrorView>
```

### Custom Text Props

Pass additional props to the Text component when children is a string.

```tsx
<ErrorView
  isInvalid={true}
  textProps={{
    numberOfLines: 1,
    ellipsizeMode: 'tail',
    style: { letterSpacing: 0.5 }
  }}
>
  This is a very long error message that might need to be truncated
</ErrorView>
```

## Example

```tsx
import { ErrorView, TextField } from 'heroui-native';
import { useState } from 'react';
import { View } from 'react-native';

export default function ErrorViewExample() {
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

      <ErrorView isInvalid={showError} className="ml-1">
        Please enter a valid email address
      </ErrorView>
    </View>
  );
}
```

## API Reference

### ErrorView

| prop                   | type                                    | default     | description                                                           |
| ---------------------- | --------------------------------------- | ----------- | --------------------------------------------------------------------- |
| `children`             | `React.ReactNode`                       | `undefined` | The content of the error field. String children are wrapped with Text |
| `isInvalid`            | `boolean`                               | `false`     | Controls the visibility of the error field                            |
| `className`            | `string`                                | `undefined` | Additional CSS classes for the container                              |
| `classNames`           | `{ container?: string, text?: string }` | `undefined` | Additional CSS classes for different parts of the component           |
| `textProps`            | `TextProps`                             | `undefined` | Additional props to pass to the Text component when children is a string |
| `...AnimatedViewProps` | `AnimatedProps<ViewProps>`              | -           | All Reanimated Animated.View props are supported                      |
