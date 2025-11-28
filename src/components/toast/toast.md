# Toast

Displays temporary notification messages that appear at the top or bottom of the screen.

## Imports

Note: Before importing this component, ensure you have completed the setup as per the [Quick Start guide](../../../README.md).

```tsx
import { Toast, useToast } from 'heroui-native';
```

## Usage

### Usage Pattern 1: Simple String

Show a toast with a simple string message.

```tsx
const { toast } = useToast();

toast.show('This is a toast message');
```

### Usage Pattern 2: Config Object

Show a toast with label, description, variant, and action button using a config object.

```tsx
const { toast } = useToast();

toast.show({
  variant: 'success',
  label: 'You have upgraded your plan',
  description: 'You can continue using HeroUI Chat',
  icon: <Icon name="check" />,
  actionLabel: 'Close',
  onActionPress: ({ hide }) => hide(),
});
```

### Usage Pattern 3: Custom Component

Show a toast with a fully custom component for complete control over styling and layout.

```tsx
const { toast } = useToast();

toast.show({
  component: (props) => (
    <Toast variant="accent" placement="top" {...props}>
      <Toast.Label>Custom Toast</Toast.Label>
      <Toast.Description>This is a custom toast component</Toast.Description>
      <Toast.Close />
    </Toast>
  ),
});
```

**Note**: Toast items are memoized for performance. If you need to pass external state (like loading state) to a custom toast component, it will not update automatically. Use shared state techniques instead, such as React Context, state management libraries, or refs to ensure state updates propagate to the toast component.

## Example

```tsx
import { Button, Toast, useToast, useThemeColor } from 'heroui-native';
import { View } from 'react-native';

export default function ToastExample() {
  const { toast } = useToast();
  const themeColorForeground = useThemeColor('foreground');

  return (
    <View className="gap-4 p-4">
      <Button
        onPress={() =>
          toast.show({
            variant: 'success',
            label: 'You have upgraded your plan',
            description: 'You can continue using HeroUI Chat',
            actionLabel: 'Close',
            onActionPress: ({ hide }) => hide(),
          })
        }
      >
        Show Success Toast
      </Button>

      <Button
        onPress={() =>
          toast.show({
            component: (props) => (
              <Toast variant="accent" {...props}>
                <Toast.Label>Custom Toast</Toast.Label>
                <Toast.Description>
                  This uses a custom component
                </Toast.Description>
                <Toast.Action onPress={() => props.hide()}>Undo</Toast.Action>
                <Toast.Close className="absolute top-0 right-0" />
              </Toast>
            ),
          })
        }
      >
        Show Custom Toast
      </Button>
    </View>
  );
}
```

## Anatomy

```tsx
<Toast>
  <Toast.Label>...</Toast.Label>
  <Toast.Description>...</Toast.Description>
  <Toast.Action>...</Toast.Action>
  <Toast.Close />
</Toast>
```

- **Toast**: Main container that displays notification messages. Handles positioning, animations, and swipe gestures.
- **Toast.Label**: Title text of the toast notification. Inherits variant styling from parent Toast context.
- **Toast.Description**: Descriptive text content displayed below the label.
- **Toast.Action**: Action button within the toast. Button variant is automatically determined based on toast variant but can be overridden.
- **Toast.Close**: Close button for dismissing the toast. Renders as an icon-only button that calls hide when pressed.

## Global Configuration

Configure toast behavior globally using `HeroUINativeProvider` config prop. Global configs serve as defaults for all toasts unless overridden locally.

### Insets

Insets control the distance of toast sides from screen edges. Insets are added to safe area insets. To set all toasts to have a side distance of 20px from screen edges, configure insets:

```tsx
<HeroUINativeProvider
  config={{
    toast: {
      insets: {
        top: 20,
        bottom: 20,
        left: 20,
        right: 20,
      },
    },
  }}
>
  {children}
</HeroUINativeProvider>
```

### Content Wrapper with KeyboardAvoidingView

Wrap toast content with KeyboardAvoidingView to ensure toasts adjust when the keyboard appears:

```tsx
import {
  KeyboardAvoidingView,
  KeyboardProvider,
} from 'react-native-keyboard-controller';
import { HeroUINativeProvider } from 'heroui-native';
import { useCallback } from 'react';

function AppContent() {
  const contentWrapper = useCallback(
    (children: React.ReactNode) => (
      <KeyboardAvoidingView
        pointerEvents="box-none"
        behavior="padding"
        keyboardVerticalOffset={12}
        className="flex-1"
      >
        {children}
      </KeyboardAvoidingView>
    ),
    []
  );

  return (
    <KeyboardProvider>
      <HeroUINativeProvider
        config={{
          toast: {
            contentWrapper,
          },
        }}
      >
        {children}
      </HeroUINativeProvider>
    </KeyboardProvider>
  );
}
```

### Default Props

Set global defaults for variant, placement, animation, and swipe behavior:

```tsx
<HeroUINativeProvider
  config={{
    toast: {
      defaultProps: {
        variant: 'accent',
        placement: 'bottom',
        isSwipeable: false,
      },
    },
  }}
>
  {children}
</HeroUINativeProvider>
```

## Styling Notes

### Border as Padding

Toast uses `border-[16px]` class which serves as padding. This is intentional because when visible toasts have different heights, the toast adapts to the last visible toast height. In cases where a toast originally has one height and gets smaller when a new toast comes to stack, content might be visible behind the last toast without proper padding. The border ensures consistent spacing regardless of toast height changes.

For padding, use `border` classes. For actual borders, use `outline` classes.

## API Reference

### Toast

| prop           | type                                                          | default     | description                                                               |
| -------------- | ------------------------------------------------------------- | ----------- | ------------------------------------------------------------------------- |
| `variant`      | `'default' \| 'accent' \| 'success' \| 'warning' \| 'danger'` | `'default'` | Visual variant of the toast                                               |
| `placement`    | `'top' \| 'bottom'`                                           | `'top'`     | Placement of the toast on screen                                          |
| `isSwipeable`  | `boolean`                                                     | `true`      | Whether the toast can be swiped to dismiss and dragged with rubber effect |
| `animation`    | `ToastRootAnimation \| false \| "disabled" \| "disable-all"`  | -           | Animation configuration for toast                                         |
| `className`    | `string`                                                      | -           | Additional CSS class for the toast container                              |
| `...ViewProps` | `ViewProps`                                                   | -           | All standard React Native View props are supported                        |

### Toast.Label

| prop           | type              | default | description                                        |
| -------------- | ----------------- | ------- | -------------------------------------------------- |
| `children`     | `React.ReactNode` | -       | Content to be rendered as label                    |
| `className`    | `string`          | -       | Additional CSS classes                             |
| `...TextProps` | `TextProps`       | -       | All standard React Native Text props are supported |

### Toast.Description

| prop           | type              | default | description                                        |
| -------------- | ----------------- | ------- | -------------------------------------------------- |
| `children`     | `React.ReactNode` | -       | Content to be rendered as description              |
| `className`    | `string`          | -       | Additional CSS classes                             |
| `...TextProps` | `TextProps`       | -       | All standard React Native Text props are supported |

### Toast.Action

Toast.Action extends all props from [Button](../button/button.md) component. Button variant is automatically determined based on toast variant but can be overridden.

| prop        | type                   | default | description                                                                  |
| ----------- | ---------------------- | ------- | ---------------------------------------------------------------------------- |
| `children`  | `React.ReactNode`      | -       | Content to be rendered as action button label                                |
| `variant`   | `ButtonVariant`        | -       | Button variant. If not provided, automatically determined from toast variant |
| `size`      | `'sm' \| 'md' \| 'lg'` | `'sm'`  | Size of the action button                                                    |
| `className` | `string`               | -       | Additional CSS classes                                                       |

For inherited props including `onPress`, `isDisabled`, and all Button props, see [Button API Reference](../button/button.md#api-reference).

### Toast.Close

Toast.Close extends all props from [Button](../button/button.md) component.

| prop        | type                                | default | description                                    |
| ----------- | ----------------------------------- | ------- | ---------------------------------------------- |
| `children`  | `React.ReactNode`                   | -       | Custom close icon. Defaults to CloseIcon       |
| `iconProps` | `{ size?: number; color?: string }` | -       | Props for the default close icon               |
| `size`      | `'sm' \| 'md' \| 'lg'`              | `'sm'`  | Size of the close button                       |
| `className` | `string`                            | -       | Additional CSS classes                         |
| `onPress`   | `(event: any) => void`              | -       | Custom press handler. Defaults to hiding toast |

For inherited props including `isDisabled` and all Button props, see [Button API Reference](../button/button.md#api-reference).

### ToastRootAnimation

| prop         | type                                                              | default     | description                                                                      |
| ------------ | ----------------------------------------------------------------- | ----------- | -------------------------------------------------------------------------------- |
| `opacity`    | `{ value?: [number, number]; timingConfig?: WithTimingConfig }`   | `[1, 0]`    | Opacity interpolation values for fade effect as toasts move beyond visible stack |
| `translateY` | `{ value?: [number, number]; timingConfig?: WithTimingConfig }`   | `[0, 10]`   | Translate Y interpolation values for peek effect of stacked toasts               |
| `scale`      | `{ value?: [number, number]; timingConfig?: WithTimingConfig }`   | `[1, 0.97]` | Scale interpolation values for depth effect of stacked toasts                    |
| `entering`   | `{ top?: EntryOrExitLayoutType; bottom?: EntryOrExitLayoutType }` | -           | Custom entering animation for top and bottom placements                          |
| `exiting`    | `{ top?: EntryOrExitLayoutType; bottom?: EntryOrExitLayoutType }` | -           | Custom exiting animation for top and bottom placements                           |

### ToastProviderProps

Props for configuring toast behavior globally via `HeroUINativeProvider` config prop.

| prop               | type                                                | default | description                                                      |
| ------------------ | --------------------------------------------------- | ------- | ---------------------------------------------------------------- |
| `defaultProps`     | `ToastGlobalConfig`                                 | -       | Global toast configuration used as defaults for all toasts       |
| `insets`           | `ToastInsets`                                       | -       | Insets for spacing from screen edges (added to safe area insets) |
| `maxVisibleToasts` | `number`                                            | `3`     | Maximum number of visible toasts before opacity starts fading    |
| `contentWrapper`   | `(children: React.ReactNode) => React.ReactElement` | -       | Custom wrapper function to wrap toast content                    |
| `children`         | `React.ReactNode`                                   | -       | Children to render                                               |

#### ToastGlobalConfig

Global toast configuration used as defaults for all toasts unless overridden locally.

| prop          | type                                                          | description                                                               |
| ------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------- |
| `variant`     | `'default' \| 'accent' \| 'success' \| 'warning' \| 'danger'` | Visual variant of the toast                                               |
| `placement`   | `'top' \| 'bottom'`                                           | Placement of the toast on screen                                          |
| `isSwipeable` | `boolean`                                                     | Whether the toast can be swiped to dismiss and dragged with rubber effect |
| `animation`   | `ToastRootAnimation \| false \| "disabled" \| "disable-all"`  | Animation configuration for toast                                         |

#### ToastInsets

Insets for spacing from screen edges. Values are added to safe area insets.

| prop     | type     | default | description                                                                                               |
| -------- | -------- | ------- | --------------------------------------------------------------------------------------------------------- |
| `top`    | `number` | -       | Inset from the top edge in pixels (added to safe area inset). Platform-specific: iOS = 0, Android = 12    |
| `bottom` | `number` | -       | Inset from the bottom edge in pixels (added to safe area inset). Platform-specific: iOS = 6, Android = 12 |
| `left`   | `number` | -       | Inset from the left edge in pixels (added to safe area inset). Default: 12                                |
| `right`  | `number` | -       | Inset from the right edge in pixels (added to safe area inset). Default: 12                               |

### useToast

Hook to access toast functionality. Must be used within a `ToastProvider` (provided by `HeroUINativeProvider`).

| return value     | type           | description                              |
| ---------------- | -------------- | ---------------------------------------- |
| `toast`          | `ToastManager` | Toast manager with show and hide methods |
| `isToastVisible` | `boolean`      | Whether any toast is currently visible   |

#### ToastManager

| method | type                                              | description                                                                                                                          |
| ------ | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `show` | `(options: string \| ToastShowOptions) => string` | Show a toast. Returns the ID of the shown toast. Supports three usage patterns: simple string, config object, or custom component    |
| `hide` | `(ids?: string \| string[] \| 'all') => void`     | Hide one or more toasts. No argument hides the last toast, 'all' hides all toasts, single ID or array of IDs hides specific toast(s) |

#### ToastShowOptions

Options for showing a toast. Can be either a config object with default styling or a custom component.

**When using config object (without component):**

| prop            | type                                                                                                                              | default | description                                                                         |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------- | ------- | ----------------------------------------------------------------------------------- |
| `variant`       | `'default' \| 'accent' \| 'success' \| 'warning' \| 'danger'`                                                                     | -       | Visual variant of the toast                                                         |
| `placement`     | `'top' \| 'bottom'`                                                                                                               | -       | Placement of the toast on screen                                                    |
| `isSwipeable`   | `boolean`                                                                                                                         | -       | Whether the toast can be swiped to dismiss                                          |
| `animation`     | `ToastRootAnimation \| false \| "disabled" \| "disable-all"`                                                                      | -       | Animation configuration for toast                                                   |
| `duration`      | `number \| 'persistent'`                                                                                                          | `4000`  | Duration in milliseconds before auto-hide. Set to 'persistent' to prevent auto-hide |
| `id`            | `string`                                                                                                                          | -       | Optional ID for the toast. If not provided, one will be generated                   |
| `label`         | `string`                                                                                                                          | -       | Label text for the toast                                                            |
| `description`   | `string`                                                                                                                          | -       | Description text for the toast                                                      |
| `actionLabel`   | `string`                                                                                                                          | -       | Action button label text                                                            |
| `onActionPress` | `(helpers: { show: (options: string \| ToastShowOptions) => string; hide: (ids?: string \| string[] \| 'all') => void }) => void` | -       | Callback function called when the action button is pressed                          |
| `icon`          | `React.ReactNode`                                                                                                                 | -       | Icon element to display in the toast                                                |
| `onShow`        | `() => void`                                                                                                                      | -       | Callback function called when the toast is shown                                    |
| `onHide`        | `() => void`                                                                                                                      | -       | Callback function called when the toast is hidden                                   |

**When using custom component:**

| prop        | type                                                 | default | description                                                                         |
| ----------- | ---------------------------------------------------- | ------- | ----------------------------------------------------------------------------------- |
| `id`        | `string`                                             | -       | Optional ID for the toast. If not provided, one will be generated                   |
| `component` | `(props: ToastComponentProps) => React.ReactElement` | -       | A function that receives toast props and returns a React element                    |
| `duration`  | `number \| 'persistent'`                             | `4000`  | Duration in milliseconds before auto-hide. Set to 'persistent' to prevent auto-hide |
| `onShow`    | `() => void`                                         | -       | Callback function called when the toast is shown                                    |
| `onHide`    | `() => void`                                         | -       | Callback function called when the toast is hidden                                   |
