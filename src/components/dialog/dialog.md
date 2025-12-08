# Dialog

Displays a modal overlay with animated transitions and gesture-based dismissal.

## Imports

Note: Before importing this component, ensure you have completed the setup as per the [Quick Start guide](../../../README.md).

```tsx
import { Dialog, useDialog, useDialogAnimation } from 'heroui-native';
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

Configure open and close animations with spring or timing. The `closeDelay` should typically match your closing animation duration.

```tsx
<Dialog
  isOpen={isOpen}
  onOpenChange={setIsOpen}
  closeDelay={200} // Match this with closing animation duration
  animation={{
    entering: {
      type: 'spring',
      config: { damping: 130, stiffness: 1100 },
    },
    exiting: {
      type: 'timing',
      config: { duration: 200 }, // Should match closeDelay
    },
  }}
>
  <Dialog.Trigger>...</Dialog.Trigger>
  <Dialog.Portal>
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

| prop                       | type                       | default | description                                                                          |
| -------------------------- | -------------------------- | ------- | ------------------------------------------------------------------------------------ |
| `children`                 | `React.ReactNode`          | -       | Dialog content and trigger elements                                                  |
| `isOpen`                   | `boolean`                  | -       | Controlled open state of the dialog                                                  |
| `isDefaultOpen`            | `boolean`                  | `false` | Initial open state when uncontrolled                                                 |
| `closeDelay`               | `number`                   | `300`   | Delay in milliseconds before dialog closes (should match closing animation duration) |
| `isDismissKeyboardOnClose` | `boolean`                  | `true`  | Whether to dismiss keyboard when dialog closes                                       |
| `animation`                | `DialogRootAnimation`      | -       | Animation configuration for open/close transitions                                   |
| `onOpenChange`             | `(value: boolean) => void` | -       | Callback when open state changes                                                     |
| `...ViewProps`             | `ViewProps`                | -       | All standard React Native View props are supported                                   |

#### DialogRootAnimation

`DialogRootAnimation` accepts the following values:

- `true` or `undefined`: Use default animations
- `false` or `"disabled"`: Disable only root animations (children can still animate)
- `"disable-all"`: Disable all animations including children (cascades down)
- `object`: Custom animation configuration with the following properties:

| prop       | type                                                             | description                         |
| ---------- | ---------------------------------------------------------------- | ----------------------------------- |
| `entering` | `AnimationValue<SpringAnimationConfig \| TimingAnimationConfig>` | Animation configuration for opening |
| `exiting`  | `AnimationValue<SpringAnimationConfig \| TimingAnimationConfig>` | Animation configuration for closing |

### Dialog.Trigger

| prop                       | type                    | default | description                                                    |
| -------------------------- | ----------------------- | ------- | -------------------------------------------------------------- |
| `children`                 | `React.ReactNode`       | -       | Trigger element content                                        |
| `asChild`                  | `boolean`               | -       | Render as child element without wrapper                        |
| `...TouchableOpacityProps` | `TouchableOpacityProps` | -       | All standard React Native TouchableOpacity props are supported |

### Dialog.Portal

| prop         | type                   | default | description                                      |
| ------------ | ---------------------- | ------- | ------------------------------------------------ |
| `children`   | `React.ReactNode`      | -       | Portal content (overlay and dialog)              |
| `className`  | `string`               | -       | Additional CSS classes for portal container      |
| `style`      | `StyleProp<ViewStyle>` | -       | Additional styles for portal container           |
| `hostName`   | `string`               | -       | Optional portal host name for specific container |
| `forceMount` | `boolean`              | -       | Force mount when closed for animation purposes   |

### Dialog.Overlay

| prop                | type                     | default | description                                             |
| ------------------- | ------------------------ | ------- | ------------------------------------------------------- |
| `children`          | `React.ReactNode`        | -       | Custom overlay content                                  |
| `className`         | `string`                 | -       | Additional CSS classes for overlay                      |
| `style`             | `ViewStyle`              | -       | Additional styles for overlay container                 |
| `animation`         | `DialogOverlayAnimation` | -       | Animation configuration for overlay                     |
| `isCloseOnPress`    | `boolean`                | `true`  | Whether pressing overlay closes dialog                  |
| `forceMount`        | `boolean`                | -       | Force mount when closed for animation purposes          |
| `...PressableProps` | `PressableProps`         | -       | All standard React Native Pressable props are supported |

#### DialogOverlayAnimation

`DialogOverlayAnimation` accepts the following values:

- `true` or `undefined`: Use default animations
- `false` or `"disabled"`: Disable all animations
- `object`: Custom animation configuration with the following properties:

| prop      | type                                                   | description                                                                                      |
| --------- | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| `opacity` | `AnimationValue<{ value?: [number, number, number] }>` | Opacity animation configuration. Values represent [idle, open, close] states. Default: [0, 1, 0] |

### Dialog.Content

| prop                    | type                                 | default | description                                         |
| ----------------------- | ------------------------------------ | ------- | --------------------------------------------------- |
| `children`              | `React.ReactNode`                    | -       | Dialog content                                      |
| `className`             | `string`                             | -       | Additional CSS classes for content container        |
| `style`                 | `StyleProp<ViewStyle>`               | -       | Additional styles for content container             |
| `onLayout`              | `(event: LayoutChangeEvent) => void` | -       | Layout event handler                                |
| `animation`             | `DialogContentAnimation`             | -       | Animation configuration for content                 |
| `isSwipeable`           | `boolean`                            | `true`  | Whether the dialog content can be swiped to dismiss |
| `forceMount`            | `boolean`                            | -       | Force mount when closed for animation purposes      |
| `...Animated.ViewProps` | `Animated.ViewProps`                 | -       | All Reanimated Animated.View props are supported    |

#### DialogContentAnimation

`DialogContentAnimation` accepts the following values:

- `true` or `undefined`: Use default animations
- `false` or `"disabled"`: Disable all animations
- `object`: Custom animation configuration with the following properties:

| prop      | type                                                   | description                                                                                          |
| --------- | ------------------------------------------------------ | ---------------------------------------------------------------------------------------------------- |
| `opacity` | `AnimationValue<{ value?: [number, number, number] }>` | Opacity animation configuration. Values represent [idle, open, close] states. Default: [0, 1, 0]     |
| `scale`   | `AnimationValue<{ value?: [number, number, number] }>` | Scale animation configuration. Values represent [idle, open, close] states. Default: [0.97, 1, 0.97] |

### Dialog.Close

| prop                       | type                    | default | description                                                    |
| -------------------------- | ----------------------- | ------- | -------------------------------------------------------------- |
| `children`                 | `React.ReactNode`       | -       | Custom close button content                                    |
| `className`                | `string`                | -       | Additional CSS classes for close button                        |
| `iconProps`                | `DialogCloseIconProps`  | -       | Configuration for default close icon                           |
| `hitSlop`                  | `number`                | `12`    | Hit slop area for the close button                             |
| `asChild`                  | `boolean`               | -       | Render as child element without wrapper                        |
| `...TouchableOpacityProps` | `TouchableOpacityProps` | -       | All standard React Native TouchableOpacity props are supported |

#### DialogCloseIconProps

| prop    | type     | description                             |
| ------- | -------- | --------------------------------------- |
| `size`  | `number` | Icon size (default: 18)                 |
| `color` | `string` | Icon color (default: theme color muted) |

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

Hook to access dialog primitive context.

```tsx
const { isOpen, onOpenChange } = useDialog();
```

| property       | type                       | description                   |
| -------------- | -------------------------- | ----------------------------- |
| `isOpen`       | `boolean`                  | Current open state            |
| `onOpenChange` | `(value: boolean) => void` | Function to change open state |

### useDialogAnimation

Hook to access dialog animation context for advanced customization.

```tsx
const { dialogState, progress, isDragging } = useDialogAnimation();
```

| property      | type                          | description                                  |
| ------------- | ----------------------------- | -------------------------------------------- |
| `dialogState` | `'idle' \| 'open' \| 'close'` | Internal dialog state                        |
| `progress`    | `SharedValue<number>`         | Animation progress (0=idle, 1=open, 2=close) |
| `isDragging`  | `SharedValue<boolean>`        | Whether dialog is being dragged              |
