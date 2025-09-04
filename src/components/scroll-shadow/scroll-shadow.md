# ScrollShadow

Adds dynamic gradient shadows to scrollable content based on scroll position and overflow.

## Imports

Note: Before importing this component, ensure you have completed the setup as per the [Quick Start guide](../../../README.md).

```tsx
import { ScrollShadow } from 'heroui-native';
```

## Usage

### Basic Usage

Wrap any scrollable component to automatically add edge shadows.

```tsx
<ScrollShadow>
  <ScrollView>...</ScrollView>
</ScrollShadow>
```

### Horizontal Scrolling

The component auto-detects horizontal scrolling from the child's `horizontal` prop.

```tsx
<ScrollShadow>
  <FlatList horizontal data={data} renderItem={...} />
</ScrollShadow>
```

### Custom Shadow Size

Control the gradient shadow height/width with the `size` prop.

```tsx
<ScrollShadow size={100}>
  <ScrollView>...</ScrollView>
</ScrollShadow>
```

### Visibility Control

Specify which shadows to display using the `visibility` prop.

```tsx
<ScrollShadow visibility="top">
  <ScrollView>...</ScrollView>
</ScrollShadow>

<ScrollShadow visibility="bottom">
  <ScrollView>...</ScrollView>
</ScrollShadow>

<ScrollShadow visibility="none">
  <ScrollView>...</ScrollView>
</ScrollShadow>
```

### Custom Shadow Color

Override the default shadow color which uses the theme's background.

```tsx
<ScrollShadow color="#ffffff">
  <ScrollView>...</ScrollView>
</ScrollShadow>
```

### With Custom Scroll Handler

**Important:** ScrollShadow internally converts the child to a Reanimated animated component. If you need to use the `onScroll` prop, you must use `useAnimatedScrollHandler` from react-native-reanimated.

```tsx
import Animated, { useAnimatedScrollHandler } from 'react-native-reanimated';

const scrollHandler = useAnimatedScrollHandler({
  onScroll: (event) => {
    console.log(event.contentOffset.y);
  },
});

<ScrollShadow>
  <Animated.ScrollView onScroll={scrollHandler}>...</Animated.ScrollView>
</ScrollShadow>;
```

## Example

```tsx
import { ScrollShadow, Surface } from 'heroui-native';
import { FlatList, ScrollView, Text, View } from 'react-native';

export default function ScrollShadowExample() {
  const horizontalData = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    title: `Card ${i + 1}`,
  }));

  return (
    <View className="flex-1 bg-background">
      <Text className="px-5 py-3 text-lg font-semibold">Horizontal List</Text>
      <ScrollShadow>
        <FlatList
          data={horizontalData}
          horizontal
          renderItem={({ item }) => (
            <Surface variant="2" className="w-32 h-24 justify-center px-4">
              <Text>{item.title}</Text>
            </Surface>
          )}
          showsHorizontalScrollIndicator={false}
          contentContainerClassName="p-5 gap-4"
        />
      </ScrollShadow>

      <Text className="px-5 py-3 text-lg font-semibold">Vertical Content</Text>
      <ScrollShadow size={80} className="h-48">
        <ScrollView
          contentContainerClassName="p-5"
          showsVerticalScrollIndicator={false}
        >
          <Text className="mb-4 text-2xl font-bold">Long Content</Text>
          <Text className="mb-4 text-base leading-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris.
          </Text>
          <Text className="mb-4 text-base leading-6">
            Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae.
          </Text>
        </ScrollView>
      </ScrollShadow>
    </View>
  );
}
```

## API Reference

### ScrollShadow

| prop           | type                                                                   | default     | description                                                                                                   |
| -------------- | ---------------------------------------------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------- |
| `children`     | `React.ReactElement`                                                   | -           | The scrollable component to enhance with shadows. Must be a single React element (ScrollView, FlatList, etc.) |
| `size`         | `number`                                                               | `50`        | Size (height/width) of the gradient shadow in pixels                                                          |
| `orientation`  | `'horizontal' \| 'vertical'`                                           | auto-detect | Orientation of the scroll shadow. If not provided, will auto-detect from child's `horizontal` prop            |
| `visibility`   | `'auto' \| 'top' \| 'bottom' \| 'left' \| 'right' \| 'both' \| 'none'` | `'auto'`    | Visibility mode for the shadows. 'auto' shows shadows based on scroll position and content overflow           |
| `color`        | `string`                                                               | theme color | Custom color for the gradient shadow. If not provided, uses the theme's background color                      |
| `isEnabled`    | `boolean`                                                              | `true`      | Whether the shadow effect is enabled                                                                          |
| `className`    | `string`                                                               | -           | Additional CSS classes to apply to the container                                                              |
| `...ViewProps` | `ViewProps`                                                            | -           | All standard React Native View props are supported                                                            |
