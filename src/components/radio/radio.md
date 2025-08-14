# Radio

A selectable control that allows users to choose one option from a set of mutually exclusive choices.

## Interactive Demo

[Interactive demo placeholder - will be added to documentation site]

## Imports

Note: Before importing this component, ensure you have completed the setup as per the [Quick Start guide](https://heroui.com/docs/quick-start).

```tsx
import { Radio, RadioGroup } from 'heroui-native';
```

## Usage

### Basic Usage

The Radio component must be used within a RadioGroup to manage selection state.

```tsx
<RadioGroup value={value} onValueChange={setValue}>
  <Radio value="option1">
    <Radio.Content>
      <Radio.Label>Option 1</Radio.Label>
    </Radio.Content>
  </Radio>
  <Radio value="option2">
    <Radio.Content>
      <Radio.Label>Option 2</Radio.Label>
    </Radio.Content>
  </Radio>
</RadioGroup>
```

### With Description

Add descriptive text to provide more context about each radio option.

```tsx
<RadioGroup value={value} onValueChange={setValue}>
  <Radio value="option1">
    <Radio.Content>
      <Radio.Label>Option 1</Radio.Label>
      <Radio.Description>
        Additional details about this option
      </Radio.Description>
    </Radio.Content>
  </Radio>
  <Radio value="option2">
    <Radio.Content>
      <Radio.Label>Option 2</Radio.Label>
      <Radio.Description>More information about this choice</Radio.Description>
    </Radio.Content>
  </Radio>
</RadioGroup>
```

### With Custom Indicator

Customize the radio indicator appearance with custom colors and animations.

```tsx
<RadioGroup value={value} onValueChange={setValue}>
  <Radio value="option1">
    <Radio.Indicator colors={{ selectedBorder: '#a855f7' }}>
      <Radio.IndicatorBackground>...</Radio.IndicatorBackground>
      <Radio.IndicatorThumb>...</Radio.IndicatorThumb>
    </Radio.Indicator>
    <Radio.Content>
      <Radio.Label>Custom Indicator</Radio.Label>
    </Radio.Content>
  </Radio>
</RadioGroup>
```

### With Color Variants

Use different color themes for radio buttons.

```tsx
<RadioGroup value={value} onValueChange={setValue}>
  <Radio value="default" color="default">
    <Radio.Content>
      <Radio.Label>Default</Radio.Label>
    </Radio.Content>
  </Radio>
  <Radio value="success" color="success">
    <Radio.Content>
      <Radio.Label>Success</Radio.Label>
    </Radio.Content>
  </Radio>
  <Radio value="warning" color="warning">
    <Radio.Content>
      <Radio.Label>Warning</Radio.Label>
    </Radio.Content>
  </Radio>
  <Radio value="danger" color="danger">
    <Radio.Content>
      <Radio.Label>Danger</Radio.Label>
    </Radio.Content>
  </Radio>
</RadioGroup>
```

### With Indicator Alignment

Position the indicator on either side of the content.

```tsx
<RadioGroup value={value} onValueChange={setValue}>
  <Radio value="start" alignIndicator="start">
    <Radio.Content>
      <Radio.Label>Indicator on Start</Radio.Label>
    </Radio.Content>
  </Radio>
  <Radio value="end" alignIndicator="end">
    <Radio.Content>
      <Radio.Label>Indicator on End</Radio.Label>
    </Radio.Content>
  </Radio>
</RadioGroup>
```

## Example

```tsx
import { Radio, RadioGroup, useTheme } from 'heroui-native';
import { Zap } from 'lucide-react-native';
import React from 'react';
import { View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';

export default function RadioExample() {
  const [selectedPlan, setSelectedPlan] = React.useState('basic');
  const [selectedColor, setSelectedColor] = React.useState('success');
  const { theme } = useTheme();

  return (
    <View className="gap-8">
      <RadioGroup value={selectedPlan} onValueChange={setSelectedPlan}>
        <Radio value="basic">
          <Radio.Content>
            <Radio.Label>Basic Plan</Radio.Label>
            <Radio.Description>Perfect for individuals</Radio.Description>
          </Radio.Content>
        </Radio>
        <Radio value="pro">
          <Radio.Content>
            <Radio.Label>Pro Plan</Radio.Label>
            <Radio.Description>Best for teams</Radio.Description>
          </Radio.Content>
        </Radio>
        <Radio value="enterprise">
          <Radio.Content>
            <Radio.Label>Enterprise</Radio.Label>
            <Radio.Description>Custom solutions</Radio.Description>
          </Radio.Content>
        </Radio>
      </RadioGroup>

      <RadioGroup value={selectedColor} onValueChange={setSelectedColor}>
        <Radio value="default" color="default">
          <Radio.Content>
            <Radio.Label>Default</Radio.Label>
          </Radio.Content>
        </Radio>
        <Radio value="success" color="success">
          <Radio.Content>
            <Radio.Label>Success</Radio.Label>
          </Radio.Content>
        </Radio>
        <Radio value="warning" color="warning">
          <Radio.Content>
            <Radio.Label>Warning</Radio.Label>
          </Radio.Content>
        </Radio>
        <Radio value="danger" color="danger">
          <Radio.Indicator>
            <Radio.IndicatorThumb>
              {selectedColor === 'danger' ? (
                <Animated.View key="zap-icon" entering={FadeIn.duration(200)}>
                  <Zap
                    size={12}
                    color={theme === 'dark' ? 'black' : 'white'}
                    fill={theme === 'dark' ? 'black' : 'white'}
                  />
                </Animated.View>
              ) : null}
            </Radio.IndicatorThumb>
          </Radio.Indicator>
          <Radio.Content>
            <Radio.Label>Danger with Icon</Radio.Label>
          </Radio.Content>
        </Radio>
      </RadioGroup>
    </View>
  );
}
```

## Anatomy

```tsx
<RadioGroup>
  <Radio>
    <Radio.Indicator>
      <Radio.IndicatorBackground>...</Radio.IndicatorBackground>
      <Radio.IndicatorThumb>...</Radio.IndicatorThumb>
    </Radio.Indicator>
    <Radio.Content>
      <Radio.Label>...</Radio.Label>
      <Radio.Description>...</Radio.Description>
    </Radio.Content>
  </Radio>
  <RadioGroup.ErrorMessage>...</RadioGroup.ErrorMessage>
</RadioGroup>
```

- **RadioGroup**: Container that manages the selection state of Radio components. Supports both horizontal and vertical orientations.
- **Radio**: Individual radio option within a RadioGroup. Must be used inside RadioGroup. Handles selection state and renders default indicator if no children provided. Animates border color based on selection state.
- **Radio.Indicator**: Optional container for the radio circle. Renders default background and thumb if no children provided. Manages the visual selection state.
- **Radio.IndicatorBackground**: Optional background of the radio circle. Animates background color based on selection state. Can be customized with different colors and animations.
- **Radio.IndicatorThumb**: Optional inner circle that appears when selected. Animates scale based on selection. Can be replaced with custom content.
- **Radio.Content**: Optional container for label and description. Provides consistent layout and spacing. Only renders if label or description exist.
- **Radio.Label**: Optional text label for the radio option. Clickable by default and linked to the radio for accessibility.
- **Radio.Description**: Optional secondary text below the label. Provides additional context about the radio option.
- **RadioGroup.ErrorMessage**: Error message displayed when radio group is invalid. Shown with animation below the radio group content. Takes full width when orientation is horizontal.

## API Reference

### RadioGroup

See [RadioGroup documentation](../radio-group/radio-group.md#api-reference) for complete RadioGroup props reference.

### Radio

| prop                | type                                              | default     | description                                                             |
| ------------------- | ------------------------------------------------- | ----------- | ----------------------------------------------------------------------- |
| `children`          | `React.ReactNode`                                 | `undefined` | Radio content                                                           |
| `value`             | `string`                                          | `undefined` | The value associated with this radio item                               |
| `color`             | `'default' \| 'success' \| 'warning' \| 'danger'` | `'default'` | Color variant                                                           |
| `alignIndicator`    | `'start' \| 'end'`                                | `'end'`     | Alignment of the indicator                                              |
| `isDisabled`        | `boolean`                                         | `false`     | Whether this specific radio item is disabled                            |
| `isReadOnly`        | `boolean`                                         | `false`     | Whether the radio is read-only                                          |
| `isValid`           | `boolean`                                         | `true`      | Whether the radio is valid                                              |
| `className`         | `string`                                          | `undefined` | Custom class name                                                       |
| `...PressableProps` | `Omit<PressableProps, 'disabled'>`                | -           | All standard React Native Pressable props are supported except disabled |

### Radio.Indicator

| prop                   | type                                                     | default     | description                                         |
| ---------------------- | -------------------------------------------------------- | ----------- | --------------------------------------------------- |
| `children`             | `React.ReactNode`                                        | `undefined` | Indicator content                                   |
| `className`            | `string`                                                 | `undefined` | Custom class name                                   |
| `colors`               | `Pick<RadioColors, 'defaultBorder' \| 'selectedBorder'>` | `undefined` | Custom border colors                                |
| `animationConfig`      | `TimingConfig`                                           | `undefined` | Animation configuration for border color transition |
| `...AnimatedViewProps` | `AnimatedProps<ViewProps>`                               | -           | All Reanimated Animated.View props are supported    |

#### RadioColors

| prop                 | type     | description                        |
| -------------------- | -------- | ---------------------------------- |
| `defaultBorder`      | `string` | Border color when not selected     |
| `selectedBorder`     | `string` | Border color when selected         |
| `defaultBackground`  | `string` | Background color when not selected |
| `selectedBackground` | `string` | Background color when selected     |
| `selectedThumb`      | `string` | Thumb color when selected          |

#### TimingConfig

| prop       | type                                      | description                                    |
| ---------- | ----------------------------------------- | ---------------------------------------------- |
| `duration` | `number`                                  | Duration of the animation in milliseconds      |
| `easing`   | `EasingFunction \| EasingFunctionFactory` | Easing function to control the animation curve |

### Radio.IndicatorBackground

| prop                   | type                                                             | default     | description                                      |
| ---------------------- | ---------------------------------------------------------------- | ----------- | ------------------------------------------------ |
| `children`             | `React.ReactNode`                                                | `undefined` | Background content                               |
| `className`            | `string`                                                         | `undefined` | Custom class name                                |
| `colors`               | `Pick<RadioColors, 'defaultBackground' \| 'selectedBackground'>` | `undefined` | Custom background colors                         |
| `...AnimatedViewProps` | `AnimatedProps<ViewProps>`                                       | -           | All Reanimated Animated.View props are supported |

### Radio.IndicatorThumb

| prop                   | type                                 | default     | description                                      |
| ---------------------- | ------------------------------------ | ----------- | ------------------------------------------------ |
| `children`             | `React.ReactNode`                    | `undefined` | Thumb content                                    |
| `className`            | `string`                             | `undefined` | Custom class name                                |
| `colors`               | `Pick<RadioColors, 'selectedThumb'>` | `undefined` | Custom thumb colors                              |
| `animationConfig`      | `SpringConfig`                       | `undefined` | Animation configuration for scale transition     |
| `...AnimatedViewProps` | `AnimatedProps<ViewProps>`           | -           | All Reanimated Animated.View props are supported |

#### SpringConfig

| prop        | type     | description                                    |
| ----------- | -------- | ---------------------------------------------- |
| `mass`      | `number` | Mass of the spring                             |
| `damping`   | `number` | Amount of damping applied to the spring motion |
| `stiffness` | `number` | Stiffness of the spring                        |

### Radio.Content

| prop           | type              | default     | description                                        |
| -------------- | ----------------- | ----------- | -------------------------------------------------- |
| `children`     | `React.ReactNode` | `undefined` | Content children                                   |
| `className`    | `string`          | `undefined` | Custom class name                                  |
| `...ViewProps` | `ViewProps`       | -           | All standard React Native View props are supported |

### Radio.Label

| prop                   | type                       | default     | description                                             |
| ---------------------- | -------------------------- | ----------- | ------------------------------------------------------- |
| `children`             | `React.ReactNode`          | `undefined` | Label text content                                      |
| `className`            | `string`                   | `undefined` | Custom class name for the label element                 |
| `classNames`           | `ElementSlots<LabelSlots>` | `undefined` | Custom class names for different parts of the component |
| `...AnimatedViewProps` | `AnimatedProps<ViewProps>` | -           | All Reanimated Animated.View props are supported        |

#### ElementSlots<LabelSlots>

| prop        | type     | description                               |
| ----------- | -------- | ----------------------------------------- |
| `container` | `string` | Custom class name for the label container |
| `text`      | `string` | Custom class name for the label text      |

### Radio.Description

| prop                   | type                             | default     | description                                             |
| ---------------------- | -------------------------------- | ----------- | ------------------------------------------------------- |
| `children`             | `React.ReactNode`                | `undefined` | Description text content                                |
| `className`            | `string`                         | `undefined` | Custom class name for the description element           |
| `classNames`           | `ElementSlots<DescriptionSlots>` | `undefined` | Custom class names for different parts of the component |
| `...AnimatedViewProps` | `AnimatedProps<ViewProps>`       | -           | All Reanimated Animated.View props are supported        |

#### ElementSlots<DescriptionSlots>

| prop        | type     | description                                     |
| ----------- | -------- | ----------------------------------------------- |
| `container` | `string` | Custom class name for the description container |
| `text`      | `string` | Custom class name for the description text      |

### RadioGroup.ErrorMessage

See [RadioGroup documentation](../radio-group/radio-group.md#radiogrouperrormessage) for RadioGroup.ErrorMessage props reference.
