# Tooltip

Displays a brief label anchored to a trigger element, used to provide additional context for an action or element.

## Import

```tsx
import { Tooltip } from 'heroui-native';
```

## Anatomy

```tsx
<Tooltip>
  <Tooltip.Trigger>...</Tooltip.Trigger>
  <Tooltip.Portal>
    <Tooltip.Content>
      <Tooltip.Arrow />
      <Tooltip.Text>...</Tooltip.Text>
    </Tooltip.Content>
  </Tooltip.Portal>
</Tooltip>
```

- **Tooltip**: Root container that manages open/close state, trigger mode, delay, and animation settings.
- **Tooltip.Trigger**: Pressable that opens the tooltip on press or long press. Exposes imperative `open()` and `close()` methods via ref.
- **Tooltip.Portal**: Renders tooltip content in a portal layer above other content. Tapping outside the tooltip automatically dismisses it.
- **Tooltip.Content**: Positioned tooltip bubble with enter/exit animations and collision detection.
- **Tooltip.Arrow**: Optional SVG arrow pointing toward the trigger element. Inherits placement from `Tooltip.Content`.
- **Tooltip.Text**: Pre-styled text component for tooltip labels.

## Usage

### Basic Usage

The Tooltip component uses compound parts to display a floating label anchored to a trigger.

```tsx
<Tooltip>
  <Tooltip.Trigger>...</Tooltip.Trigger>
  <Tooltip.Portal>
    <Tooltip.Content placement="top">
      <Tooltip.Text>Save document</Tooltip.Text>
    </Tooltip.Content>
  </Tooltip.Portal>
</Tooltip>
```

### With Arrow

Add an arrow to visually connect the tooltip bubble to the trigger element.

```tsx
<Tooltip>
  <Tooltip.Trigger>...</Tooltip.Trigger>
  <Tooltip.Portal>
    <Tooltip.Content placement="top">
      <Tooltip.Arrow />
      <Tooltip.Text>Save document</Tooltip.Text>
    </Tooltip.Content>
  </Tooltip.Portal>
</Tooltip>
```

> **Note:** When using `<Tooltip.Arrow />` with a bordered content bubble, pass `fill` matching the content background and `stroke` matching the border color so the arrow appears as a seamless extension of the bubble. Use `strokeBaselineInset` to match the border width (defaults to `1` for 1px borders).

```tsx
<Tooltip>
  <Tooltip.Trigger>...</Tooltip.Trigger>
  <Tooltip.Portal>
    <Tooltip.Content placement="top" className="border border-accent/50 bg-accent/15">
      <Tooltip.Arrow fill={fill} stroke={stroke} />
      <Tooltip.Text className="text-accent">Save document</Tooltip.Text>
    </Tooltip.Content>
  </Tooltip.Portal>
</Tooltip>
```

### Placement Options

Control where the tooltip appears relative to the trigger element.

```tsx
<Tooltip>
  <Tooltip.Trigger>...</Tooltip.Trigger>
  <Tooltip.Portal>
    <Tooltip.Content placement="right">
      <Tooltip.Text>...</Tooltip.Text>
    </Tooltip.Content>
  </Tooltip.Portal>
</Tooltip>
```

### Trigger Mode

By default tooltips open on press and toggle closed on a second press. Use `mode="long-press"` to open on long press and close when the finger is released — better suited for supplementary hints that should not interrupt the main interaction.

```tsx
{/* Default: toggles on press */}
<Tooltip mode="press">
  ...
</Tooltip>

{/* Opens on long press, closes on release */}
<Tooltip mode="long-press" delay={400}>
  ...
</Tooltip>
```

### Controlled State

Manage open state externally to control multiple tooltips or implement exclusive open behavior, where opening one tooltip closes any other that is currently open.

```tsx
const [openId, setOpenId] = useState<string | null>(null);

{items.map(({ id }) => (
  <Tooltip
    key={id}
    isOpen={openId === id}
    onOpenChange={(open) => setOpenId(open ? id : null)}
  >
    <Tooltip.Trigger>...</Tooltip.Trigger>
    <Tooltip.Portal>
      <Tooltip.Content placement="top">
        <Tooltip.Text>...</Tooltip.Text>
      </Tooltip.Content>
    </Tooltip.Portal>
  </Tooltip>
))}
```

### Disabled Trigger

Prevent the tooltip from opening by disabling the trigger. The `isDisabled` prop on `Tooltip.Trigger` disables that specific trigger without affecting the root, while `isDisabled` on `Tooltip` disables the entire component.

```tsx
{/* Disabled trigger only */}
<Tooltip>
  <Tooltip.Trigger isDisabled>...</Tooltip.Trigger>
  ...
</Tooltip>

{/* Entire tooltip disabled */}
<Tooltip isDisabled>
  <Tooltip.Trigger>...</Tooltip.Trigger>
  ...
</Tooltip>
```

### Programmatic Control

Open or close the tooltip from outside the component tree using an imperative ref.

```tsx
const tooltipRef = useRef<TooltipTriggerRef>(null);

// Open programmatically
tooltipRef.current?.open();

// Close programmatically
tooltipRef.current?.close();

// Full example
<Tooltip>
  <Tooltip.Trigger ref={tooltipRef}>
    <Button>Hover me</Button>
  </Tooltip.Trigger>
  <Tooltip.Portal>
    <Tooltip.Content placement="top">
      <Tooltip.Text>Opened via ref</Tooltip.Text>
    </Tooltip.Content>
  </Tooltip.Portal>
</Tooltip>
```

### Custom Animation

Configure custom animations for open and close transitions using the `animation` prop on `Tooltip` or `Tooltip.Content`.

```tsx
{/* Disable all animations */}
<Tooltip animation="disable-all">
  ...
</Tooltip>

{/* Custom content animation */}
<Tooltip>
  <Tooltip.Trigger>...</Tooltip.Trigger>
  <Tooltip.Portal>
    <Tooltip.Content
      placement="top"
      animation={{
        entering: {
          type: 'spring',
          config: { damping: 15, stiffness: 300 },
        },
        exiting: {
          type: 'timing',
          config: { duration: 150 },
        },
      }}
    >
      <Tooltip.Text>...</Tooltip.Text>
    </Tooltip.Content>
  </Tooltip.Portal>
</Tooltip>
```

## Example

```tsx
import { colorKit, Tooltip, useThemeColor } from 'heroui-native';
import { View } from 'react-native';
import { FloppyDiscIcon } from './icons/floppy-disc';
import { PencilIcon } from './icons/pencil';
import { TrashIcon } from './icons/trash';

const actions = [
  { id: 'save', Icon: FloppyDiscIcon, tip: 'Save changes' },
  { id: 'edit', Icon: PencilIcon, tip: 'Edit item' },
  { id: 'delete', Icon: TrashIcon, tip: 'Delete item' },
] as const;

export default function TooltipExample() {
  const accent = useThemeColor('accent');
  const fill = colorKit.setAlpha(accent, 0.15).hex();
  const stroke = colorKit.setAlpha(accent, 0.5).hex();

  return (
    <View className="flex-row gap-4">
      {actions.map(({ id, Icon, tip }) => (
        <Tooltip key={id}>
          <Tooltip.Trigger>
            <View className="size-12 items-center justify-center rounded-2xl bg-accent/10">
              <Icon size={22} />
            </View>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content
              placement="top"
              className="border border-accent/50 bg-accent/15"
            >
              <Tooltip.Arrow fill={fill} stroke={stroke} />
              <Tooltip.Text className="text-accent font-medium">{tip}</Tooltip.Text>
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip>
      ))}
    </View>
  );
}
```

You can find more examples in the [GitHub repository](<https://github.com/heroui-inc/heroui-native/blob/rc/example/src/app/(home)/components/tooltip.tsx>).

## API Reference

### Tooltip

| prop            | type                        | default     | description                                                                                     |
| --------------- | --------------------------- | ----------- | ----------------------------------------------------------------------------------------------- |
| `children`      | `ReactNode`                 | -           | Children elements to be rendered inside the tooltip                                             |
| `isOpen`        | `boolean`                   | -           | Whether the tooltip is open (controlled mode)                                                   |
| `isDefaultOpen` | `boolean`                   | -           | The open state of the tooltip when initially rendered (uncontrolled mode)                       |
| `onOpenChange`  | `(isOpen: boolean) => void` | -           | Callback when the tooltip open state changes                                                    |
| `isDisabled`    | `boolean`                   | -           | Whether the tooltip is disabled                                                                 |
| `mode`          | `TooltipTriggerMode`        | `'press'`   | How the tooltip is triggered. `'press'` toggles on tap; `'long-press'` opens on hold and closes on release |
| `delay`         | `number`                    | `500`       | Delay in milliseconds before opening when using `mode="long-press"`                             |
| `animation`     | `AnimationRootDisableAll`   | -           | Animation configuration. Can be `false`, `"disabled"`, `"disable-all"`, `true`, or `undefined` |
| `...ViewProps`  | `ViewProps`                 | -           | All standard React Native View props are supported                                              |

#### AnimationRootDisableAll

Animation configuration for the tooltip root component. Can be:

- `false` or `"disabled"`: Disable only root animations
- `"disable-all"`: Disable all animations including children
- `true` or `undefined`: Use default animations

### Tooltip.Trigger

| prop                | type                  | default    | description                                                                                                                                                                                     |
| ------------------- | --------------------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `children`          | `ReactNode`           | -          | The element that triggers the tooltip                                                                                                                                                           |
| `isDisabled`        | `boolean`             | `false`    | Whether the trigger is disabled                                                                                                                                                                 |
| `accessibilityRole` | `AccessibilityRole`   | `'button'` | Accessibility role for the trigger element                                                                                                                                                      |

> **Note:** `Tooltip.Trigger` always wraps its children in a `Pressable`. If the child is itself interactive (e.g. a Button), both elements will respond to gestures independently. This can cause gesture conflicts on Android. Use `useTooltip` with a custom trigger if stricter gesture control is needed.

**Ref — `TooltipTriggerRef`**

| method    | description              |
| --------- | ------------------------ |
| `open()`  | Opens the tooltip        |
| `close()` | Closes the tooltip       |

### Tooltip.Portal

| prop                       | type        | default | description                                                                                                                    |
| -------------------------- | ----------- | ------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `children`                 | `ReactNode` | -       | The portal content (required)                                                                                                  |
| `disableFullWindowOverlay` | `boolean`   | `false` | When true on iOS, uses a regular View instead of FullWindowOverlay. Enables the element inspector; tooltip won't appear above native modals |
| `hostName`                 | `string`    | -       | Optional name of the host element for the portal                                                                               |
| `forceMount`               | `boolean`   | -       | Whether to force mount the component in the DOM                                                                                |
| `className`                | `string`    | -       | Additional CSS classes for the portal container                                                                                |

### Tooltip.Content

| prop              | type                           | default      | description                                                   |
| ----------------- | ------------------------------ | ------------ | ------------------------------------------------------------- |
| `children`        | `ReactNode`                    | -            | The tooltip content                                           |
| `placement`       | `TooltipPlacement`             | `'bottom'`   | Placement of the tooltip relative to the trigger              |
| `align`           | `'start' \| 'center' \| 'end'` | `'center'`   | Alignment of the tooltip along the cross-axis                 |
| `avoidCollisions` | `boolean`                      | `true`       | Whether to flip placement when close to viewport edges        |
| `offset`          | `number`                       | `8`          | Distance from the trigger element in pixels                   |
| `alignOffset`     | `number`                       | `0`          | Offset along the alignment axis in pixels                     |
| `className`       | `string`                       | -            | Additional CSS classes for the tooltip bubble                 |
| `style`           | `StyleProp<ViewStyle>`         | -            | Additional styles for the tooltip bubble                      |
| `animation`       | `PopupPopoverContentAnimation` | -            | Animation configuration                                       |

#### TooltipPlacement

`'top' | 'bottom' | 'left' | 'right'`

#### PopupPopoverContentAnimation

Animation configuration for tooltip content. Can be:

- `false` or `"disabled"`: Disable all animations
- `true` or `undefined`: Use default animations
- `object`: Custom animation configuration

| prop       | type                    | default                                                         | description                                       |
| ---------- | ----------------------- | --------------------------------------------------------------- | ------------------------------------------------- |
| `state`    | `'disabled' \| boolean` | -                                                               | Disable animations while customizing properties   |
| `entering` | `EntryOrExitLayoutType` | Keyframe with translateY/translateX, scale, and opacity (200ms) | Custom Keyframe animation for entering transition |
| `exiting`  | `EntryOrExitLayoutType` | Keyframe mirroring entering animation (150ms)                   | Custom Keyframe animation for exiting transition  |

### Tooltip.Arrow

| prop                  | type                     | default | description                                                                                                                                            |
| --------------------- | ------------------------ | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `children`            | `ReactNode`              | -       | Custom arrow content — replaces the default SVG arrow when provided                                                                                    |
| `height`              | `number`                 | `12`    | Height of the arrow in pixels                                                                                                                          |
| `width`               | `number`                 | `20`    | Width of the arrow in pixels                                                                                                                           |
| `fill`                | `string`                 | -       | Fill color of the arrow. Defaults to the `overlay` theme color. Pass a value matching the content background when using a custom background color      |
| `stroke`              | `string`                 | -       | Stroke (border) color of the arrow. Set this to match the content border so the arrow connects seamlessly                                              |
| `strokeWidth`         | `number`                 | `1`     | Stroke width of the arrow in pixels                                                                                                                    |
| `strokeBaselineInset` | `number`                 | `1`     | Inset in pixels used to align the arrow baseline with the content border. Set this to match the content border width                                   |
| `placement`           | `TooltipPlacement`       | -       | Explicit placement override. When omitted, inherits placement from `Tooltip.Content`                                                                   |
| `className`           | `string`                 | -       | Additional CSS classes for the arrow container                                                                                                         |
| `style`               | `StyleProp<ViewStyle>`   | -       | Additional styles for the arrow container                                                                                                              |

### Tooltip.Text

| prop           | type        | default | description                                        |
| -------------- | ----------- | ------- | -------------------------------------------------- |
| `children`     | `ReactNode` | -       | The label text content                             |
| `className`    | `string`    | -       | Additional CSS classes for the text                |
| `...TextProps` | `TextProps` | -       | All standard React Native Text props are supported |

## Hooks

### useTooltip

Hook to access tooltip context values within custom components or compound components.

```tsx
import { useTooltip } from 'heroui-native';

const CustomContent = () => {
  const { isOpen, onOpenChange, triggerPosition } = useTooltip();
  // ... your implementation
};
```

**Returns:** `UseTooltipReturn`

| property             | type                                                | description                                                        |
| -------------------- | --------------------------------------------------- | ------------------------------------------------------------------ |
| `isOpen`             | `boolean`                                           | Whether the tooltip is currently open                              |
| `onOpenChange`       | `(open: boolean) => void`                           | Callback function to change the tooltip open state                 |
| `isDefaultOpen`      | `boolean \| undefined`                              | Whether the tooltip should be open by default (uncontrolled mode)  |
| `isDisabled`         | `boolean \| undefined`                              | Whether the tooltip is disabled                                    |
| `triggerPosition`    | `LayoutPosition \| null`                            | The position of the trigger element relative to the viewport       |
| `setTriggerPosition` | `(triggerPosition: LayoutPosition \| null) => void` | Function to update the trigger element's position                  |
| `contentLayout`      | `LayoutRectangle \| null`                           | The layout measurements of the tooltip content                     |
| `setContentLayout`   | `(contentLayout: LayoutRectangle \| null) => void`  | Function to update the content layout measurements                 |
| `nativeID`           | `string`                                            | Unique identifier for the tooltip instance                         |

**Note:** This hook must be used within a `Tooltip` component. It will throw an error if called outside of the tooltip context.

## Special Notes

### Element Inspector (iOS)

Tooltip uses FullWindowOverlay on iOS. To enable the React Native element inspector during development, set `disableFullWindowOverlay={true}` on `Tooltip.Portal`. Tradeoff: the tooltip will not appear above native modals when disabled.
