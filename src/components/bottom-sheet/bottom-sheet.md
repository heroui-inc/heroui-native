# BottomSheet

Displays a bottom sheet that slides up from the bottom with animated transitions and swipe-to-dismiss gestures.

## Import

```tsx
import { BottomSheet } from 'heroui-native';
```

## Anatomy

```tsx
<BottomSheet>
  <BottomSheet.Trigger>...</BottomSheet.Trigger>
  <BottomSheet.Portal>
    <BottomSheet.Overlay>...</BottomSheet.Overlay>
    <BottomSheet.Content>
      <BottomSheet.Close />
      <BottomSheet.Title>...</BottomSheet.Title>
      <BottomSheet.Description>...</BottomSheet.Description>
    </BottomSheet.Content>
  </BottomSheet.Portal>
</BottomSheet>
```

- **BottomSheet**: Root component that manages open state and provides context to child components.
- **BottomSheet.Trigger**: Pressable element that opens the bottom sheet when pressed.
- **BottomSheet.Portal**: Renders bottom sheet content in a portal with full window overlay.
- **BottomSheet.Overlay**: Background overlay that covers the screen, typically closes bottom sheet when pressed.
- **BottomSheet.Content**: Main bottom sheet container using @gorhom/bottom-sheet for rendering with gesture support.
- **BottomSheet.Close**: Close button for the bottom sheet. Can accept custom children or uses default close icon.
- **BottomSheet.Title**: Bottom sheet title text with semantic heading role and accessibility linking.
- **BottomSheet.Description**: Bottom sheet description text that provides additional context with accessibility linking.

## Usage

### Basic Bottom Sheet

Simple bottom sheet with title, description, and close button.

```tsx
<BottomSheet>
  <BottomSheet.Trigger asChild>
    <Button>Open Bottom Sheet</Button>
  </BottomSheet.Trigger>
  <BottomSheet.Portal>
    <BottomSheet.Overlay />
    <BottomSheet.Content>
      <BottomSheet.Close />
      <BottomSheet.Title>...</BottomSheet.Title>
      <BottomSheet.Description>...</BottomSheet.Description>
    </BottomSheet.Content>
  </BottomSheet.Portal>
</BottomSheet>
```

### Detached Bottom Sheet

Bottom sheet that appears detached from the bottom edge with custom spacing.

```tsx
<BottomSheet>
  <BottomSheet.Trigger>...</BottomSheet.Trigger>
  <BottomSheet.Portal>
    <BottomSheet.Overlay />
    <BottomSheet.Content
      detached={true}
      bottomInset={insets.bottom + 12}
      className="mx-4"
      backgroundClassName="rounded-[32px]"
    >
      ...
    </BottomSheet.Content>
  </BottomSheet.Portal>
</BottomSheet>
```

### Scrollable with Snap Points

Bottom sheet with multiple snap points and scrollable content.

```tsx
<BottomSheet>
  <BottomSheet.Trigger>...</BottomSheet.Trigger>
  <BottomSheet.Portal>
    <BottomSheet.Overlay />
    <BottomSheet.Content snapPoints={['25%', '50%', '90%']}>
      <ScrollView>...</ScrollView>
    </BottomSheet.Content>
  </BottomSheet.Portal>
</BottomSheet>
```

### Custom Overlay

Replace the default overlay with custom content like blur effects.

```tsx
import { useBottomSheet, useBottomSheetAnimation } from 'heroui-native';
import { StyleSheet, Pressable } from 'react-native';
import { interpolate, useDerivedValue } from 'react-native-reanimated';
import { AnimatedBlurView } from './animated-blur-view';
import { useUniwind } from 'uniwind';

export const BottomSheetBlurOverlay = () => {
  const { theme } = useUniwind();
  const { onOpenChange } = useBottomSheet();
  const { progress } = useBottomSheetAnimation();

  const blurIntensity = useDerivedValue(() => {
    return interpolate(progress.get(), [0, 1, 2], [0, 40, 0]);
  });

  return (
    <Pressable style={StyleSheet.absoluteFill} onPress={() => onOpenChange(false)}>
      <AnimatedBlurView
        blurIntensity={blurIntensity}
        tint={theme === 'dark' ? 'dark' : 'systemUltraThinMaterialDark'}
        style={StyleSheet.absoluteFill}
      />
    </Pressable>
  );
};
```

```tsx
<BottomSheet>
  <BottomSheet.Trigger>...</BottomSheet.Trigger>
  <BottomSheet.Portal>
    <BottomSheetBlurOverlay />
    <BottomSheet.Content>...</BottomSheet.Content>
  </BottomSheet.Portal>
</BottomSheet>
```

### Text Input with Keyboard Avoidance

When using text input components (like `Input`, `InputOTP`, or `TextField`) inside a bottom sheet, you need to handle keyboard interactions properly to ensure the bottom sheet adjusts its position when the keyboard appears.

#### When to Use `useBottomSheetInputHandlers`

Use the `useBottomSheetInputHandlers` hook when:
- You have text input components (`Input`, `InputOTP`, `TextField`) inside a `BottomSheet.Content`
- You need the bottom sheet to automatically adjust its position when the keyboard appears
- You want proper keyboard avoidance behavior

**Important**: This hook must be called inside a `BottomSheet.Content` component. Calling it outside this context will throw an error.

#### How to Use

1. Import the hook from `heroui-native`:
```tsx
import { useBottomSheetInputHandlers, Input } from 'heroui-native';
```

2. Call the hook inside your bottom sheet content component:
```tsx
const MyBottomSheetContent = () => {
  const { onFocus, onBlur } = useBottomSheetInputHandlers();
  const [value, setValue] = useState('');

  return (
    <BottomSheet.Content>
      <Input
        value={value}
        onChangeText={setValue}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </BottomSheet.Content>
  );
};
```

#### Complete Example

```tsx
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import {
  BottomSheet,
  Button,
  Input,
  useBottomSheetInputHandlers,
} from 'heroui-native';
import { useState } from 'react';
import { View } from 'react-native';

const SearchBottomSheetContent = () => {
  const { onFocus, onBlur } = useBottomSheetInputHandlers();
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <BottomSheet.Content>
      <BottomSheetScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerClassName="p-5"
      >
        <Input
          placeholder="Search..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </BottomSheetScrollView>
    </BottomSheet.Content>
  );
};

export default function Example() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <BottomSheet isOpen={isOpen} onOpenChange={setIsOpen}>
      <BottomSheet.Trigger asChild>
        <Button variant="secondary">Open Search</Button>
      </BottomSheet.Trigger>
      <BottomSheet.Portal>
        <BottomSheet.Overlay />
        <SearchBottomSheetContent />
      </BottomSheet.Portal>
    </BottomSheet>
  );
}
```

See more examples:
- [Bottom sheet with text input](https://github.com/heroui-inc/heroui-native/blob/beta/example/src/components/bottom-sheet/with-text-input.tsx)
- [Bottom sheet with OTP input](https://github.com/heroui-inc/heroui-native/blob/beta/example/src/components/bottom-sheet/with-otp-input.tsx)

## Example

```tsx
import { BottomSheet, Button } from 'heroui-native';
import { useState } from 'react';
import { View } from 'react-native';
import { withUniwind } from 'uniwind';
import Ionicons from '@expo/vector-icons/Ionicons';

const StyledIonicons = withUniwind(Ionicons);

export default function BottomSheetExample() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <BottomSheet isOpen={isOpen} onOpenChange={setIsOpen}>
      <BottomSheet.Trigger asChild>
        <Button variant="secondary">Open Bottom Sheet</Button>
      </BottomSheet.Trigger>
      <BottomSheet.Portal>
        <BottomSheet.Overlay />
        <BottomSheet.Content>
          <View className="items-center mb-5">
            <View className="size-20 items-center justify-center rounded-full bg-green-500/10">
              <StyledIonicons
                name="shield-checkmark"
                size={40}
                className="text-green-500"
              />
            </View>
          </View>
          <View className="mb-8 gap-2 items-center">
            <BottomSheet.Title className="text-center">
              Keep yourself safe
            </BottomSheet.Title>
            <BottomSheet.Description className="text-center">
              Update your software to the latest version for better security and
              performance.
            </BottomSheet.Description>
          </View>
          <View className="gap-3">
            <Button onPress={() => setIsOpen(false)}>Update Now</Button>
            <Button variant="tertiary" onPress={() => setIsOpen(false)}>
              Later
            </Button>
          </View>
        </BottomSheet.Content>
      </BottomSheet.Portal>
    </BottomSheet>
  );
}
```

You can find more examples in the [GitHub repository](https://github.com/heroui-inc/heroui-native/blob/beta/example/src/app/(home)/components/bottom-sheet.tsx).

## API Reference

### BottomSheet

| prop           | type                       | default | description                                          |
| -------------- | -------------------------- | ------- | ---------------------------------------------------- |
| `children`     | `React.ReactNode`          | -       | Bottom sheet content and trigger elements            |
| `isOpen`       | `boolean`                  | -       | Controlled open state of the bottom sheet            |
| `isDefaultOpen`| `boolean`                  | `false` | Initial open state when uncontrolled                 |
| `animation`    | `AnimationRootDisableAll`  | -       | Animation configuration                              |
| `onOpenChange` | `(value: boolean) => void` | -       | Callback when open state changes                     |
| `...ViewProps` | `ViewProps`                | -       | All standard React Native View props are supported   |

#### Animation Configuration

Animation configuration for bottom sheet root component. Can be:

- `"disable-all"`: Disable all animations including children
- `undefined`: Use default animations

### BottomSheet.Trigger

| prop                       | type                    | default | description                                                    |
| -------------------------- | ----------------------- | ------- | -------------------------------------------------------------- |
| `children`                 | `React.ReactNode`       | -       | Trigger element content                                        |
| `asChild`                  | `boolean`               | -       | Render as child element without wrapper                        |
| `...TouchableOpacityProps` | `TouchableOpacityProps` | -       | All standard React Native TouchableOpacity props are supported |

### BottomSheet.Portal

| prop         | type                   | default | description                                      |
| ------------ | ---------------------- | ------- | ------------------------------------------------ |
| `children`   | `React.ReactNode`      | -       | Portal content (overlay and bottom sheet)        |
| `className`  | `string`               | -       | Additional CSS classes for portal container      |
| `style`      | `StyleProp<ViewStyle>` | -       | Additional styles for portal container           |
| `hostName`   | `string`               | -       | Optional portal host name for specific container |
| `forceMount` | `boolean`              | -       | Force mount when closed for animation purposes   |

### BottomSheet.Overlay

| prop                    | type                          | default | description                                                  |
| ----------------------- | ----------------------------- | ------- | ------------------------------------------------------------ |
| `children`              | `React.ReactNode`             | -       | Custom overlay content                                       |
| `className`             | `string`                      | -       | Additional CSS classes for overlay                           |
| `style`                 | `ViewStyle`                   | -       | Additional styles for overlay container                      |
| `animation`             | `Omit<PopupOverlayAnimation, 'entering' \| 'exiting'>` | -       | Animation configuration                                      |
| `isAnimatedStyleActive` | `boolean`                                                | `true`  | Whether animated styles (react-native-reanimated) are active |
| `isCloseOnPress`        | `boolean`                                                | `true`  | Whether pressing overlay closes bottom sheet                 |
| `...PressableProps`     | `PressableProps`                                         | -       | All standard React Native Pressable props are supported      |

#### Animation Configuration

Animation configuration for bottom sheet overlay component. Can be:

- `false` or `"disabled"`: Disable all animations
- `true` or `undefined`: Use default animations
- `object`: Custom animation configuration (excluding `entering` and `exiting` properties)

| prop            | type                       | default     | description                                     |
| --------------- | -------------------------- | ----------- | ----------------------------------------------- |
| `state`         | `'disabled' \| boolean`    | -           | Disable animations while customizing properties |
| `opacity.value` | `[number, number, number]` | `[0, 1, 0]` | Opacity values [idle, open, close]              |

### BottomSheet.Content

| prop                        | type                                     | default | description                                                                                        |
| --------------------------- | ---------------------------------------- | ------- | -------------------------------------------------------------------------------------------------- |
| `children`                  | `React.ReactNode`                        | -       | Bottom sheet content                                                                               |
| `className`                 | `string`                                 | -       | Additional CSS classes for bottom sheet container                                                  |
| `containerClassName`        | `string`                                 | -       | Additional CSS classes for container                                                               |
| `contentContainerClassName` | `string`                                 | -       | Additional CSS classes for content container                                                       |
| `backgroundClassName`       | `string`                                 | -       | Additional CSS classes for background                                                              |
| `handleClassName`           | `string`                                 | -       | Additional CSS classes for handle                                                                  |
| `handleIndicatorClassName`  | `string`                                 | -       | Additional CSS classes for handle indicator                                                        |
| `contentContainerProps`     | `Omit<BottomSheetViewProps, 'children'>` | -       | Props for the content container                                                                    |
| `animation`                 | `AnimationDisabled`                      | -       | Animation configuration                                                                            |
| `...GorhomBottomSheetProps` | `Partial<GorhomBottomSheetProps>`        | -       | All [@gorhom/bottom-sheet props](https://gorhom.dev/react-native-bottom-sheet/props) are supported |

**Note**: You can use all components from [@gorhom/bottom-sheet](https://gorhom.dev/react-native-bottom-sheet/components/bottomsheetview) inside the content, such as `BottomSheetView`, `BottomSheetScrollView`, `BottomSheetFlatList`, etc.

### BottomSheet.Close

BottomSheet.Close extends [CloseButton](../close-button/close-button.md) and automatically handles bottom sheet dismissal when pressed.

### BottomSheet.Title

| prop           | type              | default | description                                        |
| -------------- | ----------------- | ------- | -------------------------------------------------- |
| `children`     | `React.ReactNode` | -       | Title content                                      |
| `className`    | `string`          | -       | Additional CSS classes for title                   |
| `...TextProps` | `TextProps`       | -       | All standard React Native Text props are supported |

### BottomSheet.Description

| prop           | type              | default | description                                        |
| -------------- | ----------------- | ------- | -------------------------------------------------- |
| `children`     | `React.ReactNode` | -       | Description content                                |
| `className`    | `string`          | -       | Additional CSS classes for description             |
| `...TextProps` | `TextProps`       | -       | All standard React Native Text props are supported |

## Hooks

### useBottomSheet

Hook to access bottom sheet primitive context.

```tsx
const { isOpen, onOpenChange } = useBottomSheet();
```

| property       | type                       | description                   |
| -------------- | -------------------------- | ----------------------------- |
| `isOpen`       | `boolean`                  | Current open state            |
| `onOpenChange` | `(value: boolean) => void` | Function to change open state |

### useBottomSheetAnimation

Hook to access bottom sheet animation context for advanced customization.

```tsx
const { progress } = useBottomSheetAnimation();
```

| property   | type                  | description                                  |
| ---------- | --------------------- | -------------------------------------------- |
| `progress` | `SharedValue<number>` | Animation progress (0=idle, 1=open, 2=close) |

### useBottomSheetInputHandlers

Hook that provides keyboard handling functions for text inputs inside bottom sheets. This hook manages focus and blur events to properly communicate with the bottom sheet's internal keyboard state management.

**Important**: This hook must be called inside a `BottomSheet.Content` component. Calling it outside this context will throw an error.

```tsx
const { onFocus, onBlur } = useBottomSheetInputHandlers();
```

| property | type                    | description                                                      |
| -------- | ----------------------- | ---------------------------------------------------------------- |
| `onFocus`| `(e: FocusEvent) => void` | Handler function to attach to input's `onFocus` prop            |
| `onBlur` | `(e: BlurEvent) => void` | Handler function to attach to input's `onBlur` prop             |

**Usage Example:**

```tsx
import { useBottomSheetInputHandlers, Input } from 'heroui-native';

const MyContent = () => {
  const { onFocus, onBlur } = useBottomSheetInputHandlers();
  
  return (
    <BottomSheet.Content>
      <Input
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </BottomSheet.Content>
  );
};
```

See the [Text Input with Keyboard Avoidance](#text-input-with-keyboard-avoidance) section for more details and complete examples.

## Special Notes

### Handling Close Callbacks

It's recommended to use `BottomSheet`'s `onOpenChange` prop for handling close callbacks, as it reliably fires for all close scenarios (swiping down, pressing overlay, pressing close button, programmatic close, etc.).

```tsx
<BottomSheet
  isOpen={isOpen}
  onOpenChange={(value) => {
    setIsOpen(value);
    if (!value) {
      // This callback runs whenever the bottom sheet closes
      // regardless of how it was closed
      yourCallbackOnClose();
    }
  }}
>
  ...
</BottomSheet>
```

**Note**: `BottomSheet.Content`'s `onClose` prop (from @gorhom/bottom-sheet) has limitations and will only fire when the bottom sheet is closed by swiping down. It won't fire when closing via overlay press, close button, or programmatic close. For reliable close callbacks, always use `BottomSheet`'s `onOpenChange` prop instead.
