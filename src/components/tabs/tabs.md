# Tabs

Organize content into tabbed views with animated transitions and indicators.

## Imports

Note: Before importing this component, ensure you have completed the setup as per the [Quick Start guide](../../../README.md).

```tsx
import { Tabs } from 'heroui-native';
```

## Usage

### Basic Usage

The Tabs component uses compound parts to create navigable content sections.

```tsx
<Tabs value="tab1" onValueChange={setActiveTab}>
  <Tabs.List>
    <Tabs.Indicator />
    <Tabs.Trigger value="tab1">
      <Tabs.Label>Tab 1</Tabs.Label>
    </Tabs.Trigger>
    <Tabs.Trigger value="tab2">
      <Tabs.Label>Tab 2</Tabs.Label>
    </Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="tab1">...</Tabs.Content>
  <Tabs.Content value="tab2">...</Tabs.Content>
</Tabs>
```

### Pill Variant

Default rounded pill style for tab triggers.

```tsx
<Tabs value={activeTab} onValueChange={setActiveTab} variant="pill">
  <Tabs.List>
    <Tabs.Indicator />
    <Tabs.Trigger value="settings">
      <Tabs.Label>Settings</Tabs.Label>
    </Tabs.Trigger>
    <Tabs.Trigger value="profile">
      <Tabs.Label>Profile</Tabs.Label>
    </Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="settings">...</Tabs.Content>
  <Tabs.Content value="profile">...</Tabs.Content>
</Tabs>
```

### Line Variant

Underline style indicator for a more minimal appearance.

```tsx
<Tabs value={activeTab} onValueChange={setActiveTab} variant="line">
  <Tabs.List>
    <Tabs.Indicator />
    <Tabs.Trigger value="overview">
      <Tabs.Label>Overview</Tabs.Label>
    </Tabs.Trigger>
    <Tabs.Trigger value="analytics">
      <Tabs.Label>Analytics</Tabs.Label>
    </Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="overview">...</Tabs.Content>
  <Tabs.Content value="analytics">...</Tabs.Content>
</Tabs>
```

### Scrollable Tabs

Handle many tabs with horizontal scrolling.

```tsx
<Tabs value={activeTab} onValueChange={setActiveTab}>
  <Tabs.List>
    <Tabs.ScrollView scrollAlign="center">
      <Tabs.Indicator />
      <Tabs.Trigger value="tab1">
        <Tabs.Label>First Tab</Tabs.Label>
      </Tabs.Trigger>
      <Tabs.Trigger value="tab2">
        <Tabs.Label>Second Tab</Tabs.Label>
      </Tabs.Trigger>
      <Tabs.Trigger value="tab3">
        <Tabs.Label>Third Tab</Tabs.Label>
      </Tabs.Trigger>
      <Tabs.Trigger value="tab4">
        <Tabs.Label>Fourth Tab</Tabs.Label>
      </Tabs.Trigger>
      <Tabs.Trigger value="tab5">
        <Tabs.Label>Fifth Tab</Tabs.Label>
      </Tabs.Trigger>
    </Tabs.ScrollView>
  </Tabs.List>
  <Tabs.Content value="tab1">...</Tabs.Content>
  <Tabs.Content value="tab2">...</Tabs.Content>
  <Tabs.Content value="tab3">...</Tabs.Content>
  <Tabs.Content value="tab4">...</Tabs.Content>
  <Tabs.Content value="tab5">...</Tabs.Content>
</Tabs>
```

### Disabled Tabs

Disable specific tabs to prevent interaction.

```tsx
<Tabs value={activeTab} onValueChange={setActiveTab}>
  <Tabs.List>
    <Tabs.Indicator />
    <Tabs.Trigger value="active">
      <Tabs.Label>Active</Tabs.Label>
    </Tabs.Trigger>
    <Tabs.Trigger value="disabled" isDisabled>
      <Tabs.Label>Disabled</Tabs.Label>
    </Tabs.Trigger>
    <Tabs.Trigger value="another">
      <Tabs.Label>Another</Tabs.Label>
    </Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="active">...</Tabs.Content>
  <Tabs.Content value="another">...</Tabs.Content>
</Tabs>
```

### With Icons

Combine icons with labels for enhanced visual context.

```tsx
<Tabs value={activeTab} onValueChange={setActiveTab}>
  <Tabs.List>
    <Tabs.Indicator />
    <Tabs.Trigger value="home">
      <Icon name="home" size={16} />
      <Tabs.Label>Home</Tabs.Label>
    </Tabs.Trigger>
    <Tabs.Trigger value="search">
      <Icon name="search" size={16} />
      <Tabs.Label>Search</Tabs.Label>
    </Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="home">...</Tabs.Content>
  <Tabs.Content value="search">...</Tabs.Content>
</Tabs>
```

## Example

```tsx
import { Tabs, TextField, FormField, Checkbox, Button } from 'heroui-native';
import { useState } from 'react';
import { View, Text } from 'react-native';
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from 'react-native-reanimated';

const AnimatedContentContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <Animated.View
    entering={FadeIn.duration(200)}
    exiting={FadeOut.duration(200)}
    className="gap-6"
  >
    {children}
  </Animated.View>
);

export default function TabsExample() {
  const [activeTab, setActiveTab] = useState('general');

  const [showSidebar, setShowSidebar] = useState(true);
  const [accountActivity, setAccountActivity] = useState(true);
  const [name, setName] = useState('');

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} variant="pill">
      <Tabs.List>
        <Tabs.ScrollView>
          <Tabs.Indicator />
          <Tabs.Trigger value="general">
            <Tabs.Label>General</Tabs.Label>
          </Tabs.Trigger>
          <Tabs.Trigger value="notifications">
            <Tabs.Label>Notifications</Tabs.Label>
          </Tabs.Trigger>
          <Tabs.Trigger value="profile">
            <Tabs.Label>Profile</Tabs.Label>
          </Tabs.Trigger>
        </Tabs.ScrollView>
      </Tabs.List>

      <Animated.View
        layout={LinearTransition.duration(200)}
        className="px-4 py-6 border border-border rounded-xl"
      >
        <Tabs.Content value="general">
          <AnimatedContentContainer>
            <FormField
              isSelected={showSidebar}
              onSelectedChange={setShowSidebar}
              alignIndicator="start"
            >
              <FormField.Indicator>
                <Checkbox />
              </FormField.Indicator>
              <FormField.Content>
                <FormField.Title>Show sidebar</FormField.Title>
                <FormField.Description>
                  Display the sidebar navigation panel
                </FormField.Description>
              </FormField.Content>
            </FormField>
          </AnimatedContentContainer>
        </Tabs.Content>

        <Tabs.Content value="notifications">
          <AnimatedContentContainer>
            <FormField
              isSelected={accountActivity}
              onSelectedChange={setAccountActivity}
            >
              <FormField.Indicator>
                <Checkbox />
              </FormField.Indicator>
              <FormField.Content>
                <FormField.Title>Account activity</FormField.Title>
                <FormField.Description>
                  Notifications about your account activity
                </FormField.Description>
              </FormField.Content>
            </FormField>
          </AnimatedContentContainer>
        </Tabs.Content>

        <Tabs.Content value="profile">
          <AnimatedContentContainer>
            <TextField isRequired>
              <TextField.Label>Name</TextField.Label>
              <TextField.Input
                value={name}
                onChangeText={setName}
                placeholder="Enter your full name"
              />
            </TextField>
            <Button size="sm" className="self-start">
              <Button.Label>Update profile</Button.Label>
            </Button>
          </AnimatedContentContainer>
        </Tabs.Content>
      </Animated.View>
    </Tabs>
  );
}
```

## Anatomy

```tsx
<Tabs>
  <Tabs.List>
    <Tabs.ScrollView>
      <Tabs.Indicator />
      <Tabs.Trigger>
        <Tabs.Label>...</Tabs.Label>
      </Tabs.Trigger>
    </Tabs.ScrollView>
  </Tabs.List>
  <Tabs.Content>...</Tabs.Content>
</Tabs>
```

- **Tabs**: Main container that manages tab state and selection. Controls active tab, handles value changes, and provides context to child components.
- **Tabs.List**: Container for tab triggers. Groups triggers together with optional styling variants (pill or line).
- **Tabs.ScrollView**: Optional scrollable wrapper for tab triggers. Enables horizontal scrolling when tabs overflow with automatic centering of active tab.
- **Tabs.Trigger**: Interactive button for each tab. Handles press events to change active tab and measures its position for indicator animation.
- **Tabs.Label**: Text content for tab triggers. Displays the tab title with appropriate styling.
- **Tabs.Indicator**: Animated visual indicator for active tab. Smoothly transitions between tabs using spring or timing animations.
- **Tabs.Content**: Container for tab panel content. Shows content when its value matches the active tab.

## API Reference

### Tabs

| prop            | type                      | default  | description                                        |
| --------------- | ------------------------- | -------- | -------------------------------------------------- |
| `children`      | `React.ReactNode`         | -        | Children elements to be rendered inside tabs       |
| `value`         | `string`                  | -        | Currently active tab value                         |
| `variant`       | `'pill' \| 'line'`        | `'pill'` | Visual variant of the tabs                         |
| `className`     | `string`                  | -        | Additional CSS classes for the container           |
| `onValueChange` | `(value: string) => void` | -        | Callback when the active tab changes               |
| `...ViewProps`  | `ViewProps`               | -        | All standard React Native View props are supported |

### Tabs.List

| prop           | type              | default | description                                        |
| -------------- | ----------------- | ------- | -------------------------------------------------- |
| `children`     | `React.ReactNode` | -       | Children elements to be rendered inside the list   |
| `className`    | `string`          | -       | Additional CSS classes                             |
| `...ViewProps` | `ViewProps`       | -       | All standard React Native View props are supported |

### Tabs.ScrollView

| prop                        | type                                     | default    | description                                              |
| --------------------------- | ---------------------------------------- | ---------- | -------------------------------------------------------- |
| `children`                  | `React.ReactNode`                        | -          | Children elements to be rendered inside the scroll view  |
| `scrollAlign`               | `'start' \| 'center' \| 'end' \| 'none'` | `'center'` | Scroll alignment variant for the selected item           |
| `className`                 | `string`                                 | -          | Additional CSS classes for the scroll view               |
| `contentContainerClassName` | `string`                                 | -          | Additional CSS classes for the content container         |
| `...ScrollViewProps`        | `ScrollViewProps`                        | -          | All standard React Native ScrollView props are supported |

### Tabs.Trigger

| prop                | type              | default | description                                             |
| ------------------- | ----------------- | ------- | ------------------------------------------------------- |
| `children`          | `React.ReactNode` | -       | Children elements to be rendered inside the trigger     |
| `value`             | `string`          | -       | The unique value identifying this tab                   |
| `isDisabled`        | `boolean`         | `false` | Whether the trigger is disabled                         |
| `className`         | `string`          | -       | Additional CSS classes                                  |
| `...PressableProps` | `PressableProps`  | -       | All standard React Native Pressable props are supported |

### Tabs.Label

| prop           | type              | default | description                                        |
| -------------- | ----------------- | ------- | -------------------------------------------------- |
| `children`     | `React.ReactNode` | -       | Text content to be rendered as label               |
| `className`    | `string`          | -       | Additional CSS classes                             |
| `...TextProps` | `TextProps`       | -       | All standard React Native Text props are supported |

### Tabs.Indicator

| prop                    | type                           | default              | description                                      |
| ----------------------- | ------------------------------ | -------------------- | ------------------------------------------------ |
| `children`              | `React.ReactNode`              | -                    | Custom indicator content                         |
| `className`             | `string`                       | -                    | Additional CSS classes                           |
| `animationConfig`       | `TabsIndicatorAnimationConfig` | `{ type: 'spring' }` | Animation configuration for the indicator        |
| `...Animated.ViewProps` | `Animated.ViewProps`           | -                    | All Reanimated Animated.View props are supported |

#### TabsIndicatorAnimationConfig

| prop     | type                                   | description                        |
| -------- | -------------------------------------- | ---------------------------------- |
| `type`   | `'spring' \| 'timing'`                 | Type of animation to use           |
| `config` | `WithSpringConfig \| WithTimingConfig` | Reanimated animation configuration |

### Tabs.Content

| prop           | type              | default | description                                         |
| -------------- | ----------------- | ------- | --------------------------------------------------- |
| `children`     | `React.ReactNode` | -       | Children elements to be rendered inside the content |
| `value`        | `string`          | -       | The value of the tab this content belongs to        |
| `className`    | `string`          | -       | Additional CSS classes                              |
| `...ViewProps` | `ViewProps`       | -       | All standard React Native View props are supported  |
