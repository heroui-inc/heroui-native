# Popover

Displays a floating content panel anchored to a trigger element with placement and alignment options.

## Imports

Note: Before importing this component, ensure you have completed the setup as per the [Quick Start guide](../../../README.md).

```tsx
import { Popover } from 'heroui-native';
```

## Usage

### Basic Usage

The Popover component uses compound parts to create floating content panels.

```tsx
<Popover>
  <Popover.Trigger>...</Popover.Trigger>
  <Popover.Portal>
    <Popover.Overlay />
    <Popover.Content>...</Popover.Content>
  </Popover.Portal>
</Popover>
```

### With Title and Description

Structure popover content with title and description for better information hierarchy.

```tsx
<Popover>
  <Popover.Trigger>...</Popover.Trigger>
  <Popover.Portal>
    <Popover.Overlay />
    <Popover.Content>
      <Popover.Close />
      <Popover.Title>...</Popover.Title>
      <Popover.Description>...</Popover.Description>
    </Popover.Content>
  </Popover.Portal>
</Popover>
```

### With Arrow

Add an arrow pointing to the trigger element for better visual connection.

```tsx
<Popover>
  <Popover.Trigger>...</Popover.Trigger>
  <Popover.Portal>
    <Popover.Overlay />
    <Popover.Content placement="top">
      <Popover.Arrow />
      ...
    </Popover.Content>
  </Popover.Portal>
</Popover>
```

### Width Control

Control the width of the popover content using the `width` prop.

```tsx
{
  /* Fixed width in pixels */
}
<Popover>
  <Popover.Trigger>...</Popover.Trigger>
  <Popover.Portal>
    <Popover.Overlay />
    <Popover.Content width={320}>...</Popover.Content>
  </Popover.Portal>
</Popover>;

{
  /* Match trigger width */
}
<Popover>
  <Popover.Trigger>...</Popover.Trigger>
  <Popover.Portal>
    <Popover.Overlay />
    <Popover.Content width="trigger">...</Popover.Content>
  </Popover.Portal>
</Popover>;

{
  /* Full width (100%) */
}
<Popover>
  <Popover.Trigger>...</Popover.Trigger>
  <Popover.Portal>
    <Popover.Overlay />
    <Popover.Content width="full">...</Popover.Content>
  </Popover.Portal>
</Popover>;

{
  /* Auto-size to content (default) */
}
<Popover>
  <Popover.Trigger>...</Popover.Trigger>
  <Popover.Portal>
    <Popover.Overlay />
    <Popover.Content width="content-fit">...</Popover.Content>
  </Popover.Portal>
</Popover>;
```

### Bottom Sheet Presentation

Use bottom sheet presentation for mobile-optimized interaction patterns.

```tsx
<Popover>
  <Popover.Trigger>...</Popover.Trigger>
  <Popover.Portal>
    <Popover.Overlay />
    <Popover.Content presentation="bottom-sheet">
      <Popover.Title>...</Popover.Title>
      <Popover.Description>...</Popover.Description>
      <Popover.Close asChild>
        <Button>Close</Button>
      </Popover.Close>
    </Popover.Content>
  </Popover.Portal>
</Popover>
```

### Placement Options

Control where the popover appears relative to the trigger element.

```tsx
<Popover>
  <Popover.Trigger>...</Popover.Trigger>
  <Popover.Portal>
    <Popover.Content placement="left">...</Popover.Content>
  </Popover.Portal>
</Popover>
```

### Alignment Options

Fine-tune content alignment along the placement axis.

```tsx
<Popover>
  <Popover.Trigger>...</Popover.Trigger>
  <Popover.Portal>
    <Popover.Content placement="top" align="start">
      ...
    </Popover.Content>
  </Popover.Portal>
</Popover>
```

### Custom Animation

Configure custom animations for open and close transitions.

```tsx
<Popover>
  <Popover.Trigger>...</Popover.Trigger>
  <Popover.Portal
    progressAnimationConfigs={{
      onOpen: {
        animationType: 'spring',
        animationConfig: { damping: 15, stiffness: 300 },
      },
      onClose: {
        animationType: 'timing',
        animationConfig: { duration: 200 },
      },
    }}
  >
    <Popover.Content>...</Popover.Content>
  </Popover.Portal>
</Popover>
```

### Programmatic control

```tsx
// Open or close popover programmatically using ref
const popoverRef = useRef<PopoverTriggerRef>(null);

// Open programmatically
popoverRef.current?.open();

// Close programmatically
popoverRef.current?.close();

// Full example
<Popover>
  <Popover.Trigger ref={popoverRef} asChild>
    <Button>Trigger</Button>
  </Popover.Trigger>
  <Popover.Portal>
    <Popover.Overlay />
    <Popover.Content>
      <Text>Content</Text>
      <Button onPress={() => popoverRef.current?.close()}>Close</Button>
    </Popover.Content>
  </Popover.Portal>
</Popover>;
```

## Example

```tsx
import { Ionicons } from '@expo/vector-icons';
import { Button, Popover, useThemeColor } from 'heroui-native';
import { Text, View } from 'react-native';

export default function PopoverExample() {
  const themeColorMuted = useThemeColor('muted');

  return (
    <Popover>
      <Popover.Trigger asChild>
        <Button variant="tertiary" size="sm">
          <Button.StartContent>
            <Ionicons
              name="information-circle"
              size={20}
              color={themeColorMuted}
            />
          </Button.StartContent>
          <Button.LabelContent>Show Info</Button.LabelContent>
        </Button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Overlay />
        <Popover.Content width={320} className="gap-1 rounded-xl px-6 py-4">
          <Popover.Close className="absolute top-3 right-3 z-50" />
          <Popover.Title>Information</Popover.Title>
          <Popover.Description>
            This popover includes a title and description to provide more
            structured information to users.
          </Popover.Description>
        </Popover.Content>
      </Popover.Portal>
    </Popover>
  );
}
```

## Anatomy

```tsx
<Popover>
  <Popover.Trigger>...</Popover.Trigger>
  <Popover.Portal>
    <Popover.Overlay />
    <Popover.Content>
      <Popover.Arrow />
      <Popover.Close />
      <Popover.Title>...</Popover.Title>
      <Popover.Description>...</Popover.Description>
    </Popover.Content>
  </Popover.Portal>
</Popover>
```

- **Popover**: Main container that manages open/close state, positioning, and provides context to child components.
- **Popover.Trigger**: Clickable element that toggles popover visibility. Wraps any child element with press handlers.
- **Popover.Portal**: Renders popover content in a portal layer above other content. Ensures proper stacking and positioning.
- **Popover.Overlay**: Optional background overlay. Can be transparent or semi-transparent to capture outside clicks.
- **Popover.Content**: Container for popover content with positioning, styling, and collision detection. Supports both popover and bottom-sheet presentations.
- **Popover.Arrow**: Optional arrow element pointing to the trigger. Automatically positioned based on placement.
- **Popover.Close**: Close button that dismisses the popover when pressed. Renders a default X icon if no children provided.
- **Popover.Title**: Optional title text with pre-styled typography.
- **Popover.Description**: Optional description text with muted styling.

## API Reference

### Popover

| prop           | type                        | default | description                                         |
| -------------- | --------------------------- | ------- | --------------------------------------------------- |
| `children`     | `ReactNode`                 | -       | Children elements to be rendered inside the popover |
| `isOpen`       | `boolean`                   | -       | Whether the popover is open (controlled mode)       |
| `onOpenChange` | `(isOpen: boolean) => void` | -       | Callback when the popover open state changes        |
| `closeDelay`   | `number`                    | `400`   | Delay in milliseconds before closing the popover    |
| `asChild`      | `boolean`                   | `false` | Whether to render as a child element                |
| `...ViewProps` | `ViewProps`                 | -       | All standard React Native View props are supported  |

### Popover.Trigger

| prop                | type             | default | description                                             |
| ------------------- | ---------------- | ------- | ------------------------------------------------------- |
| `children`          | `ReactNode`      | -       | The trigger element content                             |
| `className`         | `string`         | -       | Additional CSS classes for the trigger                  |
| `asChild`           | `boolean`        | `true`  | Whether to render as a child element                    |
| `...PressableProps` | `PressableProps` | -       | All standard React Native Pressable props are supported |

### Popover.Portal

| prop                       | type                              | default | description                                         |
| -------------------------- | --------------------------------- | ------- | --------------------------------------------------- |
| `children`                 | `ReactNode`                       | -       | The portal content (required)                       |
| `hostName`                 | `string`                          | -       | Optional name of the host element for the portal    |
| `forceMount`               | `boolean`                         | -       | Whether to force mount the component in the DOM     |
| `className`                | `string`                          | -       | Additional CSS classes for the portal container     |
| `progressAnimationConfigs` | `PopoverProgressAnimationConfigs` | -       | Animation configurations for open/close transitions |
| `...ViewProps`             | `ViewProps`                       | -       | All standard React Native View props are supported  |

#### PopoverProgressAnimationConfigs

| prop      | type                                             | description                         |
| --------- | ------------------------------------------------ | ----------------------------------- |
| `onOpen`  | `SpringAnimationConfig \| TimingAnimationConfig` | Animation configuration for opening |
| `onClose` | `SpringAnimationConfig \| TimingAnimationConfig` | Animation configuration for closing |

### Popover.Overlay

| prop                         | type                 | default | description                                          |
| ---------------------------- | -------------------- | ------- | ---------------------------------------------------- |
| `className`                  | `string`             | -       | Additional CSS classes for the overlay               |
| `closeOnPress`               | `boolean`            | `true`  | Whether to close the popover when overlay is pressed |
| `forceMount`                 | `boolean`            | -       | Whether to force mount the component in the DOM      |
| `isDefaultAnimationDisabled` | `boolean`            | `false` | Whether to disable the default opacity animation     |
| `asChild`                    | `boolean`            | `false` | Whether to render as a child element                 |
| `...Animated.ViewProps`      | `Animated.ViewProps` | -       | All Reanimated Animated.View props are supported     |

### Popover.Content (Popover Presentation)

| prop                         | type                                             | default         | description                                            |
| ---------------------------- | ------------------------------------------------ | --------------- | ------------------------------------------------------ |
| `children`                   | `ReactNode`                                      | -               | The popover content                                    |
| `width`                      | `number \| 'trigger' \| 'content-fit' \| 'full'` | `'content-fit'` | Width sizing strategy for the content                  |
| `placement`                  | `'top' \| 'bottom' \| 'left' \| 'right'`         | `'bottom'`      | Placement of the popover relative to trigger           |
| `align`                      | `'start' \| 'center' \| 'end'`                   | `'start'`       | Alignment along the placement axis                     |
| `avoidCollisions`            | `boolean`                                        | `true`          | Whether to flip placement when close to viewport edges |
| `offset`                     | `number`                                         | `0`             | Distance from trigger element in pixels                |
| `alignOffset`                | `number`                                         | `0`             | Offset along the alignment axis in pixels              |
| `disablePositioningStyle`    | `boolean`                                        | `false`         | Whether to disable automatic positioning styles        |
| `forceMount`                 | `boolean`                                        | -               | Whether to force mount the component in the DOM        |
| `insets`                     | `Insets`                                         | -               | Screen edge insets to respect when positioning         |
| `className`                  | `string`                                         | -               | Additional CSS classes for the content container       |
| `presentation`               | `'popover'`                                      | -               | Presentation mode for the popover                      |
| `isDefaultAnimationDisabled` | `boolean`                                        | `false`         | Whether to disable the default animations              |
| `asChild`                    | `boolean`                                        | `false`         | Whether to render as a child element                   |
| `...Animated.ViewProps`      | `Animated.ViewProps`                             | -               | All Reanimated Animated.View props are supported       |

### Popover.Content (Bottom Sheet Presentation)

| prop                       | type                   | default | description                                      |
| -------------------------- | ---------------------- | ------- | ------------------------------------------------ |
| `children`                 | `ReactNode`            | -       | The bottom sheet content                         |
| `presentation`             | `'bottom-sheet'`       | -       | Presentation mode for the popover                |
| `bottomSheetViewClassName` | `string`               | -       | Additional CSS classes for the bottom sheet view |
| `bottomSheetViewProps`     | `BottomSheetViewProps` | -       | Props for the bottom sheet view                  |
| `enablePanDownToClose`     | `boolean`              | `true`  | Whether pan down gesture closes the sheet        |
| `backgroundStyle`          | `ViewStyle`            | -       | Style for the bottom sheet background            |
| `handleIndicatorStyle`     | `ViewStyle`            | -       | Style for the bottom sheet handle indicator      |
| `...BottomSheetProps`      | `BottomSheetProps`     | -       | All @gorhom/bottom-sheet props are supported     |

### Popover.Arrow

| prop           | type                                     | default | description                                         |
| -------------- | ---------------------------------------- | ------- | --------------------------------------------------- |
| `className`    | `string`                                 | -       | Additional CSS classes for the arrow                |
| `height`       | `number`                                 | `8`     | Height of the arrow in pixels                       |
| `width`        | `number`                                 | `16`    | Width of the arrow in pixels                        |
| `color`        | `string`                                 | -       | Color of the arrow (defaults to content background) |
| `placement`    | `'top' \| 'bottom' \| 'left' \| 'right'` | -       | Placement of the popover (inherited from content)   |
| `...ViewProps` | `ViewProps`                              | -       | All standard React Native View props are supported  |

### Popover.Close

| prop                | type                    | default | description                                             |
| ------------------- | ----------------------- | ------- | ------------------------------------------------------- |
| `children`          | `ReactNode`             | -       | The close button content                                |
| `className`         | `string`                | -       | Additional CSS classes for the close button             |
| `iconProps`         | `PopoverCloseIconProps` | -       | Close icon configuration                                |
| `hitSlop`           | `number \| Insets`      | `12`    | Additional touch area around the button                 |
| `asChild`           | `boolean`               | -       | Whether to render as a child element                    |
| `...PressableProps` | `PressableProps`        | -       | All standard React Native Pressable props are supported |

#### PopoverCloseIconProps

| prop    | type     | default              | description       |
| ------- | -------- | -------------------- | ----------------- |
| `size`  | `number` | `18`                 | Size of the icon  |
| `color` | `string` | `--colors.muted` | Color of the icon |

### Popover.Title

| prop           | type        | default | description                                        |
| -------------- | ----------- | ------- | -------------------------------------------------- |
| `children`     | `ReactNode` | -       | The title text content                             |
| `className`    | `string`    | -       | Additional CSS classes for the title               |
| `...TextProps` | `TextProps` | -       | All standard React Native Text props are supported |

### Popover.Description

| prop           | type        | default | description                                        |
| -------------- | ----------- | ------- | -------------------------------------------------- |
| `children`     | `ReactNode` | -       | The description text content                       |
| `className`    | `string`    | -       | Additional CSS classes for the description         |
| `...TextProps` | `TextProps` | -       | All standard React Native Text props are supported |
