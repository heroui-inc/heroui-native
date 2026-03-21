# Radio

An individual radio option that indicates a single selection from a set of choices.

## Import

```tsx
import { Radio } from 'heroui-native';
```

## Anatomy

```tsx
<Radio>
  <Radio.Indicator>
    <Radio.IndicatorThumb />
  </Radio.Indicator>
</Radio>
```

- **Radio**: Main container that handles selection state and user interaction. Operates in two modes: standalone with `isSelected`/`onSelectedChange`, or inside a `RadioGroup.Item` where it automatically derives state from the group context. Renders a default indicator if no children are provided. Supports render function children to access state (`isSelected`, `isDisabled`, `isInvalid`).
- **Radio.Indicator**: Optional container for the radio circle. Renders default thumb if no children are provided. Manages the visual selection state with variant and invalid styling.
- **Radio.IndicatorThumb**: Optional inner circle that appears when selected. Animates scale based on selection state. Can be replaced with custom content.

## Usage

### Basic Usage

The Radio component renders with a default indicator and thumb if no children are provided. It automatically detects whether it's on a surface background for proper variant styling.

```tsx
<Radio isSelected={isSelected} onSelectedChange={setIsSelected} />
```

### Inside RadioGroup

When used inside a `RadioGroup.Item`, the Radio automatically derives its state from the group context.

```tsx
<RadioGroup value={value} onValueChange={setValue}>
  <RadioGroup.Item value="option1">
    <Label>Option 1</Label>
    <Radio />
  </RadioGroup.Item>
  <RadioGroup.Item value="option2">
    <Label>Option 2</Label>
    <Radio />
  </RadioGroup.Item>
</RadioGroup>
```

### Custom Indicator Styling

Customize the indicator and thumb appearance using className props on compound parts.

```tsx
<Radio>
  <Radio.Indicator className="size-8 bg-red-500 border-red-400">
    <Radio.IndicatorThumb className="size-3.5 bg-red-100" />
  </Radio.Indicator>
</Radio>
```

### With ControlField

Wrap the Radio inside a `ControlField.Indicator` to create a tappable field row with label and description. The `ControlField` manages the selection state and passes it down to the Radio automatically.

```tsx
<ControlField isSelected={isSelected} onSelectedChange={setIsSelected}>
  <View className="flex-1">
    <Label>Enable notifications</Label>
    <Description>Receive alerts for important updates</Description>
  </View>
  <ControlField.Indicator variant="radio" />
</ControlField>
```

### Custom Indicator Content

Replace the default thumb with custom content inside the indicator.

```tsx
<RadioGroup.Item value="email">
  {({ isSelected }) => (
    <>
      <Radio>
        <Radio.Indicator>{isSelected && <CustomIcon />}</Radio.Indicator>
      </Radio>
      <Label>Email Notifications</Label>
    </>
  )}
</RadioGroup.Item>
```

### Render Function Children

Use a render function on the Radio root to access selection state for conditional styling.

```tsx
<RadioGroup.Item value="item1">
  {({ isSelected }) => (
    <View className={cn('p-3 rounded-2xl', isSelected && 'bg-surface')}>
      <Radio>
        <Radio.Indicator
          className={cn(!isSelected && 'border border-muted/10')}
        />
      </Radio>
      <Label>Item Label</Label>
    </View>
  )}
</RadioGroup.Item>
```

### Disable Animations

Disable all animations including children using the `animation` prop on the root.

```tsx
<Radio
  animation="disable-all"
  isSelected={isSelected}
  onSelectedChange={setIsSelected}
>
  <Radio.Indicator>
    <Radio.IndicatorThumb />
  </Radio.Indicator>
</Radio>
```

### Custom Thumb Animation

Customize the scale animation on the indicator thumb.

```tsx
<Radio isSelected={isSelected} onSelectedChange={setIsSelected}>
  <Radio.Indicator>
    <Radio.IndicatorThumb
      animation={{
        scale: {
          value: [2, 1],
          timingConfig: { duration: 500 },
        },
      }}
    />
  </Radio.Indicator>
</Radio>
```

## Example

```tsx
import {
  cn,
  Description,
  Label,
  Radio,
  RadioGroup,
  Separator,
  Surface,
} from 'heroui-native';
import React from 'react';
import { View, Text } from 'react-native';

export default function RadioExample() {
  const [priority, setPriority] = React.useState('medium');

  return (
    <Surface className="w-full gap-6">
      <View>
        <Text className="text-foreground font-semibold text-base">
          Priority Level
        </Text>
        <Text className="text-muted text-sm">
          Set the priority for this task
        </Text>
      </View>
      <RadioGroup value={priority} onValueChange={setPriority}>
        <RadioGroup.Item value="high">
          {({ isSelected }) => (
            <>
              <View className="flex-1">
                <Label>High Priority</Label>
                <Description>Urgent - requires immediate attention</Description>
              </View>
              <Radio>
                <Radio.Indicator
                  className={cn(
                    'size-8',
                    isSelected && 'bg-red-500 border-red-400'
                  )}
                >
                  <Radio.IndicatorThumb className="size-3.5 bg-red-100" />
                </Radio.Indicator>
              </Radio>
            </>
          )}
        </RadioGroup.Item>

        <Separator />

        <RadioGroup.Item value="medium">
          {({ isSelected }) => (
            <>
              <View className="flex-1">
                <Label>Medium Priority</Label>
                <Description>Important - complete within this week</Description>
              </View>
              <Radio>
                <Radio.Indicator
                  className={cn(
                    'size-8',
                    isSelected && 'bg-amber-500 border-amber-400'
                  )}
                >
                  <Radio.IndicatorThumb className="size-3.5 bg-amber-100" />
                </Radio.Indicator>
              </Radio>
            </>
          )}
        </RadioGroup.Item>

        <Separator />

        <RadioGroup.Item value="low">
          {({ isSelected }) => (
            <>
              <View className="flex-1">
                <Label>Low Priority</Label>
                <Description>Standard - complete when possible</Description>
              </View>
              <Radio>
                <Radio.Indicator
                  className={cn(
                    'size-8',
                    isSelected && 'bg-emerald-500 border-emerald-400'
                  )}
                >
                  <Radio.IndicatorThumb className="size-3.5 bg-emerald-100" />
                </Radio.Indicator>
              </Radio>
            </>
          )}
        </RadioGroup.Item>
      </RadioGroup>
    </Surface>
  );
}
```

You can find more examples in the [GitHub repository](<https://github.com/heroui-inc/heroui-native/blob/main/example/src/app/(home)/components/radio-group.tsx>).

## API Reference

### Radio

| prop                | type                                                                | default     | description                                                               |
| ------------------- | ------------------------------------------------------------------- | ----------- | ------------------------------------------------------------------------- |
| `children`          | `React.ReactNode \| ((props: RadioRenderProps) => React.ReactNode)` | `undefined` | Child elements or render function to customize the radio                  |
| `variant`           | `'primary' \| 'secondary'`                                          | `'primary'` | Variant style for the radio                                               |
| `isSelected`        | `boolean`                                                           | `undefined` | Whether the radio is currently selected                                   |
| `isDisabled`        | `boolean`                                                           | `undefined` | Whether the radio is disabled and cannot be interacted with               |
| `isInvalid`         | `boolean`                                                           | `false`     | Whether the radio is invalid (shows danger color)                         |
| `className`         | `string`                                                            | `undefined` | Additional CSS classes to apply                                           |
| `animation`         | `RadioRootAnimation`                                                | -           | Animation configuration for radio                                         |
| `onSelectedChange`  | `(isSelected: boolean) => void`                                     | `undefined` | Callback fired when the radio selection state changes                     |
| `...PressableProps` | `PressableProps`                                                    | -           | All standard React Native Pressable props are supported (except disabled) |

#### RadioRenderProps

| prop         | type      | description                   |
| ------------ | --------- | ----------------------------- |
| `isSelected` | `boolean` | Whether the radio is selected |
| `isDisabled` | `boolean` | Whether the radio is disabled |
| `isInvalid`  | `boolean` | Whether the radio is invalid  |

#### RadioRootAnimation

Animation configuration for radio root component. Can be:

- `"disable-all"`: Disable all animations including children (Indicator, IndicatorThumb)
- `undefined`: Use default animations

### Radio.Indicator

| prop                   | type                       | default     | description                                      |
| ---------------------- | -------------------------- | ----------- | ------------------------------------------------ |
| `children`             | `React.ReactNode`          | `undefined` | Content for the radio indicator                  |
| `className`            | `string`                   | `undefined` | Additional CSS classes for the indicator         |
| `...AnimatedViewProps` | `AnimatedProps<ViewProps>` | -           | All Reanimated Animated.View props are supported |

### Radio.IndicatorThumb

| prop                    | type                           | default     | description                                                  |
| ----------------------- | ------------------------------ | ----------- | ------------------------------------------------------------ |
| `className`             | `string`                       | `undefined` | Additional CSS classes for the thumb                         |
| `animation`             | `RadioIndicatorThumbAnimation` | -           | Animation configuration for the thumb                        |
| `isAnimatedStyleActive` | `boolean`                      | `true`      | Whether animated styles (react-native-reanimated) are active |
| `...AnimatedViewProps`  | `AnimatedProps<ViewProps>`     | -           | All Reanimated Animated.View props are supported             |

#### RadioIndicatorThumbAnimation

Animation configuration for radio indicator thumb component. Can be:

- `false` or `"disabled"`: Disable all animations
- `true` or `undefined`: Use default animations
- `object`: Custom animation configuration

| prop                 | type                    | default                                              | description                                     |
| -------------------- | ----------------------- | ---------------------------------------------------- | ----------------------------------------------- |
| `state`              | `'disabled' \| boolean` | -                                                    | Disable animations while customizing properties |
| `scale.value`        | `[number, number]`      | `[1.5, 1]`                                           | Scale values [unselected, selected]             |
| `scale.timingConfig` | `WithTimingConfig`      | `{ duration: 300, easing: Easing.out(Easing.ease) }` | Animation timing configuration                  |

## Hooks

### useRadio

Hook to access radio context values within custom components or compound components.

```tsx
import { useRadio } from 'heroui-native';

const CustomIndicator = () => {
  const { isSelected, isDisabled, isInvalid, variant } = useRadio();
};
```

**Returns:** `UseRadioReturn`

| property           | type                                           | description                                                 |
| ------------------ | ---------------------------------------------- | ----------------------------------------------------------- |
| `isSelected`       | `boolean \| undefined`                         | Whether the radio is currently selected                     |
| `onSelectedChange` | `((isSelected: boolean) => void) \| undefined` | Callback function to change the radio selection state       |
| `isDisabled`       | `boolean`                                      | Whether the radio is disabled and cannot be interacted with |
| `isInvalid`        | `boolean`                                      | Whether the radio is invalid (shows danger color)           |
| `variant`          | `'primary' \| 'secondary' \| undefined`        | Current variant style of the radio                          |
| `nativeID`         | `string \| undefined`                          | Native ID for the radio element                             |

**Note:** This hook must be used within a `Radio` component. It will throw an error if called outside of the radio context.
