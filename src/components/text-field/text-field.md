# TextField

A text input component with label, description, and error handling for collecting user input.

## Interactive Demo

[Interactive demo placeholder - will be added to documentation site]

## Imports

Note: Before importing this component, ensure you have completed the setup as per the [Quick Start guide](../../../README.md).

```tsx
import { TextField } from 'heroui-native';
```

## Usage

### Basic Usage

TextField provides a complete form input structure with label and description.

```tsx
<TextField>
  <TextField.Label>Email</TextField.Label>
  <TextField.Input placeholder="Enter your email" />
  <TextField.Description>We'll never share your email</TextField.Description>
</TextField>
```

### With Required Field

Mark fields as required to show an asterisk in the label.

```tsx
<TextField isRequired>
  <TextField.Label>Username</TextField.Label>
  <TextField.Input placeholder="Choose a username" />
</TextField>
```

### With Start and End Content

Add icons or other content at the beginning or end of the input.

```tsx
<TextField>
  <TextField.Label>Password</TextField.Label>
  <TextField.Input placeholder="Enter password" secureTextEntry>
    <TextField.InputStartContent>...</TextField.InputStartContent>
    <TextField.InputEndContent>...</TextField.InputEndContent>
  </TextField.Input>
</TextField>
```

### With Validation

Display error messages when the field is invalid.

```tsx
<TextField isRequired isValid={false}>
  <TextField.Label>Email</TextField.Label>
  <TextField.Input placeholder="Enter your email" />
  <TextField.ErrorMessage>Please enter a valid email</TextField.ErrorMessage>
</TextField>
```

### Multiline Input

Create text areas for longer content.

```tsx
<TextField>
  <TextField.Label>Message</TextField.Label>
  <TextField.Input
    placeholder="Type your message..."
    multiline
    numberOfLines={4}
  />
  <TextField.Description>Maximum 500 characters</TextField.Description>
</TextField>
```

### Disabled State

Disable the entire field to prevent interaction.

```tsx
<TextField isDisabled>
  <TextField.Label>Disabled Field</TextField.Label>
  <TextField.Input placeholder="Cannot edit" value="Read only value" />
</TextField>
```

### Custom Colors

Customize the input colors for different states.

```tsx
<TextField>
  <TextField.Label>Custom Styled</TextField.Label>
  <TextField.Input
    placeholder="Custom colors"
    colors={{
      blurBackground: '#eff6ff',
      focusBackground: '#dbeafe',
      blurBorder: '#2563eb',
      focusBorder: '#1d4ed8',
      errorBorder: '#dc2626',
    }}
  />
</TextField>
```

## Example

```tsx
import { Ionicons } from '@expo/vector-icons';
import { TextField, useTheme } from 'heroui-native';
import React from 'react';
import { ScrollView, View } from 'react-native';

export default function TextFieldExample() {
  const { colors } = useTheme();
  const [email, setEmail] = React.useState('');
  const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return (
    <ScrollView className="bg-background p-6">
      <View className="gap-6">
        <TextField isRequired isValid={email === '' || isValidEmail}>
          <TextField.Label>Email Address</TextField.Label>
          <TextField.Input
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          >
            <TextField.InputStartContent>
              <Ionicons
                name="mail-outline"
                size={16}
                color={colors.mutedForeground}
              />
            </TextField.InputStartContent>
          </TextField.Input>
          <TextField.Description>
            We'll send a confirmation to this email
          </TextField.Description>
          <TextField.ErrorMessage>
            Please enter a valid email address
          </TextField.ErrorMessage>
        </TextField>

        <TextField isRequired>
          <TextField.Label>Password</TextField.Label>
          <TextField.Input placeholder="Enter password" secureTextEntry>
            <TextField.InputStartContent>
              <Ionicons
                name="lock-closed-outline"
                size={16}
                color={colors.mutedForeground}
              />
            </TextField.InputStartContent>
            <TextField.InputEndContent>
              <Ionicons
                name="eye-outline"
                size={16}
                color={colors.mutedForeground}
              />
            </TextField.InputEndContent>
          </TextField.Input>
        </TextField>

        <TextField>
          <TextField.Label>Bio</TextField.Label>
          <TextField.Input
            placeholder="Tell us about yourself..."
            multiline
            numberOfLines={4}
          />
          <TextField.Description>
            Brief description for your profile
          </TextField.Description>
        </TextField>
      </View>
    </ScrollView>
  );
}
```

## Anatomy

```tsx
<TextField>
  <TextField.Label>...</TextField.Label>
  <TextField.Input>
    <TextField.InputStartContent>...</TextField.InputStartContent>
    <TextField.InputEndContent>...</TextField.InputEndContent>
  </TextField.Input>
  <TextField.Description>...</TextField.Description>
  <TextField.ErrorMessage>...</TextField.ErrorMessage>
</TextField>
```

- **TextField**: Root container that provides spacing and state management
- **TextField.Label**: Label with optional asterisk for required fields
- **TextField.Input**: Input container with animated border and background
- **TextField.InputStartContent**: Optional content at the start of the input
- **TextField.InputEndContent**: Optional content at the end of the input
- **TextField.Description**: Helper text displayed below the input
- **TextField.ErrorMessage**: Error message shown when field is invalid

## API Reference

### TextField

| prop         | type              | default | description                                         |
| ------------ | ----------------- | ------- | --------------------------------------------------- |
| children     | `React.ReactNode` | -       | Content to render inside the text field             |
| isDisabled   | `boolean`         | `false` | Whether the entire text field is disabled           |
| isValid      | `boolean`         | `true`  | Whether the text field is in a valid state          |
| isRequired   | `boolean`         | `false` | Whether the text field is required (shows asterisk) |
| className    | `string`          | -       | Custom class name for the root element              |
| ...ViewProps | `ViewProps`       | -       | All standard React Native View props are supported  |

### TextField.Label

| prop                  | type                       | default | description                                         |
| --------------------- | -------------------------- | ------- | --------------------------------------------------- |
| children              | `React.ReactNode`          | -       | Label text content                                  |
| className             | `string`                   | -       | Custom class name for the label element             |
| classNames            | `ElementSlots<LabelSlots>` | -       | Custom class names for different parts of the label |
| ...Animated.TextProps | `AnimatedProps<TextProps>` | -       | All Reanimated Animated.Text props are supported    |

#### ElementSlots<LabelSlots>

| prop     | type     | description                          |
| -------- | -------- | ------------------------------------ |
| text     | `string` | Custom class name for the label text |
| asterisk | `string` | Custom class name for the asterisk   |

### TextField.Input

| prop                 | type                       | default                  | description                                             |
| -------------------- | -------------------------- | ------------------------ | ------------------------------------------------------- |
| children             | `React.ReactNode`          | -                        | Content to render inside the input container            |
| className            | `string`                   | -                        | Custom class name for the input container               |
| classNames           | `ElementSlots<InputSlots>` | -                        | Custom class names for different parts of the input     |
| colors               | `TextFieldInputColors`     | -                        | Custom colors for input background and border           |
| animationConfig      | `TimingConfig`             | -                        | Animation configuration for focus/blur transitions      |
| placeholderTextColor | `string`                   | `colors.mutedForeground` | Color of the placeholder text                           |
| ...TextInputProps    | `TextInputProps`           | -                        | All standard React Native TextInput props are supported |

#### ElementSlots<InputSlots>

| prop      | type     | description                                  |
| --------- | -------- | -------------------------------------------- |
| container | `string` | Custom class name for the input container    |
| input     | `string` | Custom class name for the text input element |

#### TextFieldInputColors

| prop            | type     | description                            |
| --------------- | -------- | -------------------------------------- |
| blurBackground  | `string` | Background color when input is blurred |
| focusBackground | `string` | Background color when input is focused |
| errorBackground | `string` | Background color when input is invalid |
| blurBorder      | `string` | Border color when input is blurred     |
| focusBorder     | `string` | Border color when input is focused     |
| errorBorder     | `string` | Border color when input is invalid     |

#### TimingConfig

| prop     | type                                      | description                                |
| -------- | ----------------------------------------- | ------------------------------------------ |
| duration | `number`                                  | Duration of the animation in milliseconds  |
| easing   | `EasingFunction \| EasingFunctionFactory` | Easing function to control animation curve |

### TextField.InputStartContent

| prop         | type              | default | description                                        |
| ------------ | ----------------- | ------- | -------------------------------------------------- |
| children     | `React.ReactNode` | -       | Content to render at the start of the input        |
| className    | `string`          | -       | Custom class name for the start content element    |
| ...ViewProps | `ViewProps`       | -       | All standard React Native View props are supported |

### TextField.InputEndContent

| prop         | type              | default | description                                        |
| ------------ | ----------------- | ------- | -------------------------------------------------- |
| children     | `React.ReactNode` | -       | Content to render at the end of the input          |
| className    | `string`          | -       | Custom class name for the end content element      |
| ...ViewProps | `ViewProps`       | -       | All standard React Native View props are supported |

### TextField.Description

| prop                  | type                       | default | description                                      |
| --------------------- | -------------------------- | ------- | ------------------------------------------------ |
| children              | `React.ReactNode`          | -       | Description text content                         |
| className             | `string`                   | -       | Custom class name for the description element    |
| ...Animated.ViewProps | `AnimatedProps<ViewProps>` | -       | All Reanimated Animated.View props are supported |

### TextField.ErrorMessage

| prop                  | type                            | default | description                                             |
| --------------------- | ------------------------------- | ------- | ------------------------------------------------------- |
| children              | `React.ReactNode`               | -       | Error message content                                   |
| isValid               | `boolean`                       | `true`  | Controls the visibility of the error field              |
| className             | `string`                        | -       | Custom class name for styling                           |
| classNames            | `ElementSlots<ErrorFieldSlots>` | -       | Custom class names for different parts of the component |
| ...Animated.ViewProps | `AnimatedProps<ViewProps>`      | -       | All Reanimated Animated.View props are supported        |

#### ElementSlots<ErrorFieldSlots>

| prop      | type     | description                               |
| --------- | -------- | ----------------------------------------- |
| container | `string` | Custom class name for the error container |
| text      | `string` | Custom class name for the error text      |
