# Accordion

A collapsible component that allows users to expand and collapse content sections with animated transitions.

## Imports

Note: Before importing this component, ensure you have completed the setup as per the [Quick Start guide](../../../README.md).

```tsx
import { Accordion } from 'heroui-native';
```

## Usage

### Basic Usage

The Accordion component uses compound parts to create expandable content sections.

```tsx
<Accordion selectionMode="single">
  <Accordion.Item value="1">
    <Accordion.Trigger>
      ...
      <Accordion.Indicator />
    </Accordion.Trigger>
    <Accordion.Content>...</Accordion.Content>
  </Accordion.Item>
</Accordion>
```

### Single Selection Mode

Allow only one item to be expanded at a time.

```tsx
<Accordion selectionMode="single" defaultValue="2">
  <Accordion.Item value="1">
    <Accordion.Trigger>...</Accordion.Trigger>
    <Accordion.Content>...</Accordion.Content>
  </Accordion.Item>
  <Accordion.Item value="2">
    <Accordion.Trigger>...</Accordion.Trigger>
    <Accordion.Content>...</Accordion.Content>
  </Accordion.Item>
</Accordion>
```

### Multiple Selection Mode

Allow multiple items to be expanded simultaneously.

```tsx
<Accordion selectionMode="multiple" defaultValue={['1', '3']}>
  <Accordion.Item value="1">
    <Accordion.Trigger>...</Accordion.Trigger>
    <Accordion.Content>...</Accordion.Content>
  </Accordion.Item>
  <Accordion.Item value="2">
    <Accordion.Trigger>...</Accordion.Trigger>
    <Accordion.Content>...</Accordion.Content>
  </Accordion.Item>
  <Accordion.Item value="3">
    <Accordion.Trigger>...</Accordion.Trigger>
    <Accordion.Content>...</Accordion.Content>
  </Accordion.Item>
</Accordion>
```

### Surface Variant

Apply a surface container style to the accordion.

```tsx
<Accordion selectionMode="single" variant="surface">
  <Accordion.Item value="1">
    <Accordion.Trigger>
      ...
      <Accordion.Indicator />
    </Accordion.Trigger>
    <Accordion.Content>...</Accordion.Content>
  </Accordion.Item>
</Accordion>
```

### Custom Indicator

Replace the default chevron indicator with custom content.

```tsx
<Accordion selectionMode="single">
  <Accordion.Item value="1">
    <Accordion.Trigger>
      ...
      <Accordion.Indicator>
        <CustomIndicator />
      </Accordion.Indicator>
    </Accordion.Trigger>
    <Accordion.Content>...</Accordion.Content>
  </Accordion.Item>
</Accordion>
```

### Without Dividers

Hide the dividers between accordion items.

```tsx
<Accordion selectionMode="single" isDividerVisible={false}>
  <Accordion.Item value="1">
    <Accordion.Trigger>...</Accordion.Trigger>
    <Accordion.Content>...</Accordion.Content>
  </Accordion.Item>
  <Accordion.Item value="2">
    <Accordion.Trigger>...</Accordion.Trigger>
    <Accordion.Content>...</Accordion.Content>
  </Accordion.Item>
</Accordion>
```

## Example

```tsx
import { Accordion, useThemeColor } from 'heroui-native';
import { Ionicons } from '@expo/vector-icons';
import { View, Text } from 'react-native';

export default function AccordionExample() {
  const themeColorMuted = useThemeColor('muted');

  const accordionData = [
    {
      id: '1',
      title: 'How do I place an order?',
      icon: <Ionicons name="bag-outline" size={16} color={themeColorMuted} />,
      content:
        'Lorem ipsum dolor sit amet consectetur. Netus nunc mauris risus consequat. Libero placerat dignissim consectetur nisl.',
    },
    {
      id: '2',
      title: 'What payment methods do you accept?',
      icon: <Ionicons name="card-outline" size={16} color={themeColorMuted} />,
      content:
        'Lorem ipsum dolor sit amet consectetur. Netus nunc mauris risus consequat. Libero placerat dignissim consectetur nisl.',
    },
    {
      id: '3',
      title: 'How much does shipping cost?',
      icon: <Ionicons name="cube-outline" size={16} color={themeColorMuted} />,
      content:
        'Lorem ipsum dolor sit amet consectetur. Netus nunc mauris risus consequat. Libero placerat dignissim consectetur nisl.',
    },
  ];

  return (
    <Accordion selectionMode="single" variant="surface" defaultValue="2">
      {accordionData.map((item) => (
        <Accordion.Item key={item.id} value={item.id}>
          <Accordion.Trigger>
            <View className="flex-row items-center flex-1 gap-3">
              {item.icon}
              <Text className="text-foreground text-base flex-1">
                {item.title}
              </Text>
            </View>
            <Accordion.Indicator />
          </Accordion.Trigger>
          <Accordion.Content>
            <Text className="text-muted text-base/relaxed px-[25px]">
              {item.content}
            </Text>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion>
  );
}
```

## Anatomy

```tsx
<Accordion>
  <Accordion.Item>
    <Accordion.Trigger>
      ...
      <Accordion.Indicator>...</Accordion.Indicator>
    </Accordion.Trigger>
    <Accordion.Content>...</Accordion.Content>
  </Accordion.Item>
</Accordion>
```

- **Accordion**: Main container that manages the accordion state and behavior. Controls expansion/collapse of items, supports single or multiple selection modes, and provides variant styling (default or surface).
- **Accordion.Item**: Container for individual accordion items. Wraps the trigger and content, managing the expanded state for each item.
- **Accordion.Trigger**: Interactive element that toggles item expansion. Built on Header and Trigger primitives, includes press feedback animation.
- **Accordion.Indicator**: Optional visual indicator showing expansion state. Defaults to an animated chevron icon that rotates based on item state.
- **Accordion.Content**: Container for expandable content. Animated with layout transitions for smooth expand/collapse effects.

## API Reference

### Accordion

| prop                    | type                                               | default     | description                                                       |
| ----------------------- | -------------------------------------------------- | ----------- | ----------------------------------------------------------------- |
| `children`              | `React.ReactNode`                                  | -           | Children elements to be rendered inside the accordion             |
| `selectionMode`         | `'single' \| 'multiple'`                           | -           | Whether the accordion allows single or multiple expanded items    |
| `variant`               | `'default' \| 'surface'`                           | `'default'` | Visual variant of the accordion                                   |
| `isDividerVisible`      | `boolean`                                          | `true`      | Whether to display a divider at the bottom of each accordion item |
| `defaultValue`          | `string \| string[] \| undefined`                  | -           | Default expanded item(s) in uncontrolled mode                     |
| `value`                 | `string \| string[] \| undefined`                  | -           | Controlled expanded item(s)                                       |
| `isDisabled`            | `boolean`                                          | -           | Whether all accordion items are disabled                          |
| `isCollapsible`         | `boolean`                                          | `true`      | Whether expanded items can be collapsed                           |
| `className`             | `string`                                           | -           | Additional CSS classes for the container                          |
| `classNames`            | `ElementSlots<RootSlots>`                          | -           | Additional CSS classes for the slots                              |
| `onValueChange`         | `(value: string \| string[] \| undefined) => void` | -           | Callback when expanded items change                               |
| `...Animated.ViewProps` | `Animated.ViewProps`                               | -           | All Reanimated Animated.View props are supported                  |

#### ElementSlots<RootSlots>

| prop        | type     | description                                     |
| ----------- | -------- | ----------------------------------------------- |
| `container` | `string` | Custom class name for the accordion container   |
| `divider`   | `string` | Custom class name for the divider between items |

### Accordion.Item

| prop                    | type                 | default | description                                                |
| ----------------------- | -------------------- | ------- | ---------------------------------------------------------- |
| `children`              | `React.ReactNode`    | -       | Children elements to be rendered inside the accordion item |
| `value`                 | `string`             | -       | Unique value to identify this item                         |
| `isDisabled`            | `boolean`            | -       | Whether this specific item is disabled                     |
| `className`             | `string`             | -       | Additional CSS classes                                     |
| `...Animated.ViewProps` | `Animated.ViewProps` | -       | All Reanimated Animated.View props are supported           |

### Accordion.Trigger

| prop                    | type               | default | description                                             |
| ----------------------- | ------------------ | ------- | ------------------------------------------------------- |
| `children`              | `React.ReactNode`  | -       | Children elements to be rendered inside the trigger     |
| `className`             | `string`           | -       | Additional CSS classes                                  |
| `highlightColor`        | `string`           | -       | Custom highlight color for press feedback               |
| `highlightOpacity`      | `number`           | `0.5`   | Custom highlight opacity for press feedback             |
| `highlightTimingConfig` | `WithTimingConfig` | -       | Reanimated timing configuration for highlight animation |
| `isHighlightVisible`    | `boolean`          | `true`  | Whether to show the highlight on press                  |
| `isDisabled`            | `boolean`          | -       | Whether the trigger is disabled                         |
| `...PressableProps`     | `PressableProps`   | -       | All standard React Native Pressable props are supported |

### Accordion.Indicator

| prop                    | type                          | default | description                                                            |
| ----------------------- | ----------------------------- | ------- | ---------------------------------------------------------------------- |
| `children`              | `React.ReactNode`             | -       | Custom indicator content, if not provided defaults to animated chevron |
| `className`             | `string`                      | -       | Additional CSS classes                                                 |
| `iconProps`             | `AccordionIndicatorIconProps` | -       | Icon configuration                                                     |
| `springConfig`          | `WithSpringConfig`            | -       | Spring configuration for indicator animation                           |
| `...Animated.ViewProps` | `Animated.ViewProps`          | -       | All Reanimated Animated.View props are supported                       |

#### AccordionIndicatorIconProps

| prop    | type     | default      | description       |
| ------- | -------- | ------------ | ----------------- |
| `size`  | `number` | `16`         | Size of the icon  |
| `color` | `string` | `foreground` | Color of the icon |

### Accordion.Content

| prop           | type                                                                                | default | description                                         |
| -------------- | ----------------------------------------------------------------------------------- | ------- | --------------------------------------------------- |
| `children`     | `React.ReactNode`                                                                   | -       | Children elements to be rendered inside the content |
| `className`    | `string`                                                                            | -       | Additional CSS classes                              |
| `entering`     | `BaseAnimationBuilder \| typeof BaseAnimationBuilder \| EntryExitAnimationFunction` | -       | Custom reanimated entering animation for content    |
| `exiting`      | `BaseAnimationBuilder \| typeof BaseAnimationBuilder \| EntryExitAnimationFunction` | -       | Custom reanimated exiting animation for content     |
| `...ViewProps` | `ViewProps`                                                                         | -       | All standard React Native View props are supported  |

## Special Note

When using the Accordion component alongside other components in the same view, you should import and apply `AccordionLayoutTransition` to those components to ensure smooth and consistent layout animations across the entire screen.

```jsx
import { Accordion, AccordionLayoutTransition } from 'heroui-native';
import Animated from 'react-native-reanimated';

<Animated.ScrollView layout={AccordionLayoutTransition}>
  <Animated.View layout={AccordionLayoutTransition}>
    {/* Other content */}
  </Animated.View>

  <Accordion>{/* Accordion items */}</Accordion>
</Animated.ScrollView>;
```

This ensures that when the accordion expands or collapses, all components on the screen animate with the same timing and easing, creating a cohesive user experience.
