# Switch

A toggle control that allows users to switch between on and off states.

## Imports

Note: Before importing this component, ensure you have completed the setup as per the [Quick Start guide](../../../README.md).

```tsx
import { Switch } from 'heroui-native';
```

## Usage

### Basic Usage

The Switch component renders with default thumb if no children provided.

```tsx
<Switch isSelected={isSelected} onSelectedChange={setIsSelected} />
```

### With Custom Thumb

Replace the default thumb with custom content using the Thumb component.

```tsx
<Switch isSelected={isSelected} onSelectedChange={setIsSelected}>
  <Switch.Thumb>...</Switch.Thumb>
</Switch>
```

### With Start and End Content

Add icons or text that appear on each side of the switch.

```tsx
<Switch isSelected={isSelected} onSelectedChange={setIsSelected}>
  <Switch.Thumb />
  <Switch.StartContent>...</Switch.StartContent>
  <Switch.EndContent>...</Switch.EndContent>
</Switch>
```

## Example

```tsx
import { Switch } from 'heroui-native';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';
import Animated, { ZoomIn } from 'react-native-reanimated';

export default function SwitchExample() {
  const [darkMode, setDarkMode] = React.useState(false);

  return (
    <View className="flex-row gap-4">
      <Switch
        isSelected={darkMode}
        onSelectedChange={setDarkMode}
        className="w-[56px] h-[32px]"
        classNames={{
          contentPaddingContainer: 'px-1.5',
        }}
        colors={{
          defaultBackground: '#172554',
          selectedBackground: '#eab308',
          defaultBorder: '#dbeafe20',
          selectedBorder: '#eab308',
        }}
      >
        <Switch.Thumb
          width={22}
          colors={{
            defaultBackground: '#dbeafe',
            selectedBackground: '#854d0e',
          }}
        />
        <Switch.StartContent className="left-0.5">
          {darkMode && (
            <Animated.View key="sun" entering={ZoomIn}>
              <Ionicons name="sunny" size={16} color="#854d0e" />
            </Animated.View>
          )}
        </Switch.StartContent>
        <Switch.EndContent className="right-0.5">
          {!darkMode && (
            <Animated.View key="moon" entering={ZoomIn}>
              <Ionicons name="moon" size={16} color="#dbeafe" />
            </Animated.View>
          )}
        </Switch.EndContent>
      </Switch>
    </View>
  );
}
```

## Anatomy

```tsx
<Switch>
  <Switch.Thumb>...</Switch.Thumb>
  <Switch.StartContent>...</Switch.StartContent>
  <Switch.EndContent>...</Switch.EndContent>
</Switch>
```

- **Switch**: Main container that handles toggle state and user interaction. Renders default thumb if no children provided. Animates background and border colors based on selection state. Acts as a pressable area for toggling.
- **Switch.Thumb**: Optional sliding thumb element that moves between positions. Uses spring animation for smooth transitions. Can contain custom content like icons or be customized with different colors and sizes.
- **Switch.StartContent**: Optional content displayed on the left side of the switch. Typically used for icons or text that appear when switch is off. Positioned absolutely within the switch container.
- **Switch.EndContent**: Optional content displayed on the right side of the switch. Typically used for icons or text that appear when switch is on. Positioned absolutely within the switch container.

## API Reference

### Switch

| prop                | type                                              | default     | description                                                                |
| ------------------- | ------------------------------------------------- | ----------- | -------------------------------------------------------------------------- |
| `children`          | `React.ReactNode`                                 | `undefined` | Content to render inside the switch                                        |
| `color`             | `'default' \| 'success' \| 'warning' \| 'danger'` | `'default'` | Color theme of the switch                                                  |
| `isSelected`        | `boolean`                                         | `undefined` | Whether the switch is currently selected                                   |
| `isDisabled`        | `boolean`                                         | `false`     | Whether the switch is disabled and cannot be interacted with               |
| `className`         | `string`                                          | `undefined` | Custom class name for the switch                                           |
| `classNames`        | `ElementSlots<RootSlots>`                         | `undefined` | Custom class names for different parts of the component                    |
| `colors`            | `SwitchColors`                                    | `undefined` | Custom colors for different switch states                                  |
| `animationConfig`   | `TimingConfig`                                    | `undefined` | Animation configuration for switch background and border colors transition |
| `onSelectedChange`  | `(isSelected: boolean) => void`                   | `undefined` | Callback fired when the switch selection state changes                     |
| `...PressableProps` | `Omit<PressableProps, 'disabled'>`                | -           | All standard React Native Pressable props are supported (except disabled)  |

#### ElementSlots<RootSlots>

| prop                      | type     | description                                             |
| ------------------------- | -------- | ------------------------------------------------------- |
| `container`               | `string` | Custom class name for the main switch container element |
| `contentPaddingContainer` | `string` | Custom class name for the content padding wrapper       |
| `contentContainer`        | `string` | Custom class name for the content container element     |

#### SwitchColors

| prop                 | type     | description                                  |
| -------------------- | -------- | -------------------------------------------- |
| `defaultBorder`      | `string` | Border color when switch is not selected     |
| `selectedBorder`     | `string` | Border color when switch is selected         |
| `defaultBackground`  | `string` | Background color when switch is not selected |
| `selectedBackground` | `string` | Background color when switch is selected     |

#### TimingConfig

| prop       | type                                      | description                                    |
| ---------- | ----------------------------------------- | ---------------------------------------------- |
| `duration` | `number`                                  | Duration of the animation in milliseconds      |
| `easing`   | `EasingFunction \| EasingFunctionFactory` | Easing function to control the animation curve |

### Switch.Thumb

| prop              | type                         | default     | description                                        |
| ----------------- | ---------------------------- | ----------- | -------------------------------------------------- |
| `children`        | `React.ReactNode`            | `undefined` | Content to render inside the thumb                 |
| `width`           | `number`                     | `18`        | Width of the thumb component                       |
| `height`          | `number`                     | `undefined` | Height of the thumb component                      |
| `className`       | `string`                     | `undefined` | Custom class name for the thumb element            |
| `colors`          | `SwitchThumbColors`          | `undefined` | Custom colors for different states                 |
| `animationConfig` | `SwitchThumbAnimationConfig` | `undefined` | Animation configuration for thumb                  |
| `...ViewProps`    | `ViewProps`                  | -           | All standard React Native View props are supported |

#### SwitchThumbColors

| prop                 | type     | description                                  |
| -------------------- | -------- | -------------------------------------------- |
| `defaultBackground`  | `string` | Background color when switch is not selected |
| `selectedBackground` | `string` | Background color when switch is selected     |

#### SwitchThumbAnimationConfig

| prop              | type           | description                                                    |
| ----------------- | -------------- | -------------------------------------------------------------- |
| `translateX`      | `SpringConfig` | Spring animation configuration for thumb motion                |
| `backgroundColor` | `TimingConfig` | Timing animation configuration for background color transition |

### Switch.StartContent

| prop           | type              | default     | description                                        |
| -------------- | ----------------- | ----------- | -------------------------------------------------- |
| `children`     | `React.ReactNode` | `undefined` | Content to render inside the switch content        |
| `className`    | `string`          | `undefined` | Custom class name for the content element          |
| `...ViewProps` | `ViewProps`       | -           | All standard React Native View props are supported |

### Switch.EndContent

| prop           | type              | default     | description                                        |
| -------------- | ----------------- | ----------- | -------------------------------------------------- |
| `children`     | `React.ReactNode` | `undefined` | Content to render inside the switch content        |
| `className`    | `string`          | `undefined` | Custom class name for the content element          |
| `...ViewProps` | `ViewProps`       | -           | All standard React Native View props are supported |
