# Dialog

Displays a modal overlay with animated transitions and gesture-based dismissal.

## Imports

Note: Before importing this component, ensure you have completed the setup as per the [Quick Start guide](../../../README.md).

```tsx
import { Dialog, useDialog } from 'heroui-native';
```

## Usage

### Basic Dialog

Simple dialog with title, description, and close button.

```tsx
<Dialog isOpen={isOpen} onOpenChange={setIsOpen}>
  <Dialog.Trigger asChild>
    <Button>Open Dialog</Button>
  </Dialog.Trigger>
  <Dialog.Portal>
    <Dialog.Overlay />
    <Dialog.Content>
      <Dialog.Close />
      <Dialog.Title>...</Dialog.Title>
      <Dialog.Description>...</Dialog.Description>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog>
```

### Custom Animations

Configure open and close animations with spring or timing.

```tsx
<Dialog isOpen={isOpen} onOpenChange={setIsOpen}>
  <Dialog.Trigger>...</Dialog.Trigger>
  <Dialog.Portal
    progressAnimationConfigs={{
      onOpen: {
        animationType: 'spring',
        animationConfig: { damping: 130, stiffness: 1100 },
      },
      onClose: {
        animationType: 'timing',
        animationConfig: { duration: 200 },
      },
    }}
  >
    <Dialog.Overlay />
    <Dialog.Content>...</Dialog.Content>
  </Dialog.Portal>
</Dialog>
```

### Custom Backdrop

Replace the default overlay with custom content.

```tsx
<Dialog isOpen={isOpen} onOpenChange={setIsOpen}>
  <Dialog.Trigger>...</Dialog.Trigger>
  <Dialog.Portal>
    <Dialog.Overlay className="bg-transparent">
      <BlurView style={StyleSheet.absoluteFill} />
    </Dialog.Overlay>
    <Dialog.Content>...</Dialog.Content>
  </Dialog.Portal>
</Dialog>
```

### Scrollable Content

Handle long content with scroll views.

```tsx
<Dialog isOpen={isOpen} onOpenChange={setIsOpen}>
  <Dialog.Trigger>...</Dialog.Trigger>
  <Dialog.Portal>
    <Dialog.Overlay />
    <Dialog.Content>
      <Dialog.Close />
      <Dialog.Title>...</Dialog.Title>
      <View className="h-[300px]">
        <ScrollView>...</ScrollView>
      </View>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog>
```

### Form Dialog

Dialog with text inputs and keyboard handling.

```tsx
<Dialog isOpen={isOpen} onOpenChange={setIsOpen}>
  <Dialog.Trigger>...</Dialog.Trigger>
  <Dialog.Portal>
    <Dialog.Overlay />
    <KeyboardAvoidingView behavior="padding">
      <Dialog.Content>
        <Dialog.Close />
        <Dialog.Title>...</Dialog.Title>
        <TextField>...</TextField>
        <Button onPress={handleSubmit}>Submit</Button>
      </Dialog.Content>
    </KeyboardAvoidingView>
  </Dialog.Portal>
</Dialog>
```

## Example

```tsx
import { Button, Dialog } from 'heroui-native';
import { View } from 'react-native';
import { useState } from 'react';

export default function DialogExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog isOpen={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <Button variant="primary">Open Dialog</Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay />
        <Dialog.Content>
          <Dialog.Close />
          <View className="mb-5 gap-1.5">
            <Dialog.Title>Confirm Action</Dialog.Title>
            <Dialog.Description>
              Are you sure you want to proceed with this action? This cannot be
              undone.
            </Dialog.Description>
          </View>
          <View className="flex-row justify-end gap-3">
            <Dialog.Close asChild>
              <Button variant="ghost" size="sm">
                Cancel
              </Button>
            </Dialog.Close>
            <Button size="sm">Confirm</Button>
          </View>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog>
  );
}
```

## Anatomy

```tsx
<Dialog>
  <Dialog.Trigger>...</Dialog.Trigger>
  <Dialog.Portal>
    <Dialog.Overlay>...</Dialog.Overlay>
    <Dialog.Content>
      <Dialog.Close>...</Dialog.Close>
      <Dialog.Title>...</Dialog.Title>
      <Dialog.Description>...</Dialog.Description>
    </Dialog.Content>
  </Dialog.Portal>
</Dialog>
```

- **Dialog**: Root component that manages open state and provides context to child components.
- **Dialog.Trigger**: Pressable element that opens the dialog when pressed.
- **Dialog.Portal**: Renders dialog content in a portal with centered layout and animation control.
- **Dialog.Overlay**: Background overlay that appears behind the dialog content, typically closes dialog when pressed.
- **Dialog.Content**: Main dialog container with gesture support for drag-to-dismiss.
- **Dialog.Close**: Close button that dismisses the dialog when pressed.
- **Dialog.Title**: Dialog title text with semantic heading role.
- **Dialog.Description**: Dialog description text that provides additional context.

## API Reference

### Dialog

| prop                       | type                       | default | description                                        |
| -------------------------- | -------------------------- | ------- | -------------------------------------------------- |
| `children`                 | `React.ReactNode`          | -       | Dialog content and trigger elements                |
| `isOpen`                   | `boolean`                  | -       | Controlled open state of the dialog                |
| `isDefaultOpen`            | `boolean`                  | `false` | Initial open state when uncontrolled               |
| `closeDelay`               | `number`                   | `300`   | Delay in milliseconds before dialog closes         |
| `isDismissKeyboardOnClose` | `boolean`                  | `true`  | Whether to dismiss keyboard when dialog closes     |
| `onOpenChange`             | `(value: boolean) => void` | -       | Callback when open state changes                   |
| `...ViewProps`             | `ViewProps`                | -       | All standard React Native View props are supported |

### Dialog.Trigger

| prop                       | type                    | default | description                                                    |
| -------------------------- | ----------------------- | ------- | -------------------------------------------------------------- |
| `children`                 | `React.ReactNode`       | -       | Trigger element content                                        |
| `asChild`                  | `boolean`               | `true`  | Render as child element without wrapper                        |
| `...TouchableOpacityProps` | `TouchableOpacityProps` | -       | All standard React Native TouchableOpacity props are supported |

### Dialog.Portal

| prop                       | type                             | default | description                                        |
| -------------------------- | -------------------------------- | ------- | -------------------------------------------------- |
| `children`                 | `React.ReactNode`                | -       | Portal content (overlay and dialog)                |
| `className`                | `string`                         | -       | Additional CSS classes for portal container        |
| `style`                    | `StyleProp<ViewStyle>`           | -       | Additional styles for portal container             |
| `progressAnimationConfigs` | `DialogProgressAnimationConfigs` | -       | Animation configuration for open/close transitions |
| `hostName`                 | `string`                         | -       | Optional portal host name for specific container   |
| `forceMount`               | `boolean`                        | -       | Force mount when closed for animation purposes     |

#### DialogProgressAnimationConfigs

| prop      | type                                             | description                         |
| --------- | ------------------------------------------------ | ----------------------------------- |
| `onOpen`  | `SpringAnimationConfig \| TimingAnimationConfig` | Animation configuration for opening |
| `onClose` | `SpringAnimationConfig \| TimingAnimationConfig` | Animation configuration for closing |

### Dialog.Overlay

| prop                         | type              | default | description                                                                         |
| ---------------------------- | ----------------- | ------- | ----------------------------------------------------------------------------------- |
| `children`                   | `React.ReactNode` | -       | Custom overlay content                                                              |
| `className`                  | `string`          | -       | Additional CSS classes for overlay                                                  |
| `isDefaultAnimationDisabled` | `boolean`         | `false` | Disables default opacity animation. Use when animating with custom useAnimatedStyle |
| `isCloseOnPress`             | `boolean`         | `true`  | Whether pressing overlay closes dialog                                              |
| `forceMount`                 | `boolean`         | -       | Force mount when closed for animation purposes                                      |
| `...PressableProps`          | `PressableProps`  | -       | All standard React Native Pressable props are supported                             |

### Dialog.Content

| prop                         | type                                 | default | description                                                                                   |
| ---------------------------- | ------------------------------------ | ------- | --------------------------------------------------------------------------------------------- |
| `children`                   | `React.ReactNode`                    | -       | Dialog content                                                                                |
| `className`                  | `string`                             | -       | Additional CSS classes for content container                                                  |
| `style`                      | `StyleProp<ViewStyle>`               | -       | Additional styles for content container                                                       |
| `onLayout`                   | `(event: LayoutChangeEvent) => void` | -       | Layout event handler                                                                          |
| `isDefaultAnimationDisabled` | `boolean`                            | `false` | Disables default animations (opacity, scale). Use when animating with custom useAnimatedStyle |
| `forceMount`                 | `boolean`                            | -       | Force mount when closed for animation purposes                                                |
| `...Animated.ViewProps`      | `Animated.ViewProps`                 | -       | All Reanimated Animated.View props are supported                                              |

### Dialog.Close

| prop                       | type                    | default | description                                                    |
| -------------------------- | ----------------------- | ------- | -------------------------------------------------------------- |
| `children`                 | `React.ReactNode`       | -       | Custom close button content                                    |
| `className`                | `string`                | -       | Additional CSS classes for close button                        |
| `iconProps`                | `DialogCloseIconProps`  | -       | Configuration for default close icon                           |
| `asChild`                  | `boolean`               | -       | Render as child element without wrapper                        |
| `...TouchableOpacityProps` | `TouchableOpacityProps` | -       | All standard React Native TouchableOpacity props are supported |

#### DialogCloseIconProps

| prop    | type     | description                                 |
| ------- | -------- | ------------------------------------------- |
| `size`  | `number` | Icon size (default: 18)                     |
| `color` | `string` | Icon color (default: '--colors-foreground') |

### Dialog.Title

| prop           | type              | default | description                                        |
| -------------- | ----------------- | ------- | -------------------------------------------------- |
| `children`     | `React.ReactNode` | -       | Title content                                      |
| `className`    | `string`          | -       | Additional CSS classes for title                   |
| `...TextProps` | `TextProps`       | -       | All standard React Native Text props are supported |

### Dialog.Description

| prop           | type              | default | description                                        |
| -------------- | ----------------- | ------- | -------------------------------------------------- |
| `children`     | `React.ReactNode` | -       | Description content                                |
| `className`    | `string`          | -       | Additional CSS classes for description             |
| `...TextProps` | `TextProps`       | -       | All standard React Native Text props are supported |

### useDialog

Hook to access dialog context for advanced customization.

```tsx
const { progress, isDragging, dialogState, onOpenChange } = useDialog();
```

| property       | type                          | description                                  |
| -------------- | ----------------------------- | -------------------------------------------- |
| `isOpen`       | `boolean`                     | Current open state                           |
| `onOpenChange` | `(value: boolean) => void`    | Function to change open state                |
| `dialogState`  | `'idle' \| 'open' \| 'close'` | Internal dialog state                        |
| `progress`     | `SharedValue<number>`         | Animation progress (0=idle, 1=open, 2=close) |
| `isDragging`   | `SharedValue<boolean>`        | Whether dialog is being dragged              |
