# Avatar

Displays a user avatar with support for images, text initials, or fallback icons.

## Imports

Note: Before importing this component, ensure you have completed the setup as per the [Quick Start guide](../../../README.md).

```tsx
import { Avatar } from 'heroui-native';
```

## Usage

### Basic Usage

The Avatar component displays a default person icon when no image or text is provided.

```tsx
<Avatar>
  <Avatar.Fallback />
</Avatar>
```

### With Image

Display an avatar image with automatic fallback handling.

```tsx
<Avatar>
  <Avatar.Image source={{ uri: 'https://example.com/avatar.jpg' }} />
  <Avatar.Fallback>JD</Avatar.Fallback>
</Avatar>
```

### With Text Initials

Show text initials as the avatar content.

```tsx
<Avatar>
  <Avatar.Fallback>AB</Avatar.Fallback>
</Avatar>
```

### With Custom Icon

Provide a custom icon as fallback content.

```tsx
<Avatar>
  <Avatar.Fallback>
    <Ionicons name="person" size={18} />
  </Avatar.Fallback>
</Avatar>
```

### Sizes

Control the avatar size with the size prop.

```tsx
<Avatar size="sm">
  <Avatar.Fallback />
</Avatar>

<Avatar size="md">
  <Avatar.Fallback />
</Avatar>

<Avatar size="lg">
  <Avatar.Fallback />
</Avatar>
```

### Variants

Choose between different visual styles with the `variant` prop.

```tsx
<Avatar variant="default">
  <Avatar.Fallback>DF</Avatar.Fallback>
</Avatar>

<Avatar variant="soft">
  <Avatar.Fallback>SF</Avatar.Fallback>
</Avatar>
```

### Colors

Apply different color variants to the avatar.

```tsx
<Avatar color="default">
  <Avatar.Fallback>DF</Avatar.Fallback>
</Avatar>

<Avatar color="accent">
  <Avatar.Fallback>AC</Avatar.Fallback>
</Avatar>

<Avatar color="success">
  <Avatar.Fallback>SC</Avatar.Fallback>
</Avatar>

<Avatar color="warning">
  <Avatar.Fallback>WR</Avatar.Fallback>
</Avatar>

<Avatar color="danger">
  <Avatar.Fallback>DG</Avatar.Fallback>
</Avatar>
```

### Delayed Fallback

Show fallback after a delay to prevent flashing during image load.

```tsx
<Avatar>
  <Avatar.Image source={{ uri: imageUrl }} />
  <Avatar.Fallback delayMs={600}>NA</Avatar.Fallback>
</Avatar>
```

### Custom Image Component

Use a custom image component with the asChild prop.

```tsx
import { Image } from 'expo-image';

<Avatar>
  <Avatar.Image source={{ uri: imageUrl }} asChild>
    <Image style={{ width: '100%', height: '100%' }} contentFit="cover" />
  </Avatar.Image>
  <Avatar.Fallback>EI</Avatar.Fallback>
</Avatar>;
```

### Animation Control

Control animations at different levels of the Avatar component.

#### Disable All Animations

Disable all animations including children from the root component:

```tsx
<Avatar animation="disable-all">
  <Avatar.Image source={{ uri: imageUrl }} />
  <Avatar.Fallback>JD</Avatar.Fallback>
</Avatar>
```

#### Custom Image Animation

Customize the image opacity animation:

```tsx
<Avatar>
  <Avatar.Image
    source={{ uri: imageUrl }}
    animation={{
      opacity: {
        value: [0.3, 1],
        timingConfig: { duration: 300 },
      },
    }}
  />
  <Avatar.Fallback>JD</Avatar.Fallback>
</Avatar>
```

#### Custom Fallback Animation

Customize the fallback entering animation:

```tsx
import { FadeInDown } from 'react-native-reanimated';

<Avatar>
  <Avatar.Image source={{ uri: imageUrl }} />
  <Avatar.Fallback
    animation={{
      entering: {
        value: FadeInDown.duration(400),
      },
    }}
  >
    JD
  </Avatar.Fallback>
</Avatar>;
```

#### Disable Individual Animations

Disable animations for specific components:

```tsx
<Avatar>
  <Avatar.Image source={{ uri: imageUrl }} animation={false} />
  <Avatar.Fallback animation="disabled">JD</Avatar.Fallback>
</Avatar>
```

## Example

```tsx
import { Avatar } from 'heroui-native';
import { View } from 'react-native';

export default function AvatarExample() {
  const users = [
    { id: 1, image: 'https://example.com/user1.jpg', name: 'John Doe' },
    { id: 2, image: 'https://example.com/user2.jpg', name: 'Jane Smith' },
    { id: 3, image: 'https://example.com/user3.jpg', name: 'Bob Johnson' },
  ];

  return (
    <View className="flex-row gap-4">
      {users.map((user) => (
        <Avatar key={user.id} size="lg" color="accent">
          <Avatar.Image source={{ uri: user.image }} />
          <Avatar.Fallback>
            {user.name
              .split(' ')
              .map((n) => n[0])
              .join('')}
          </Avatar.Fallback>
        </Avatar>
      ))}
    </View>
  );
}
```

## Anatomy

```tsx
<Avatar>
  <Avatar.Image />
  <Avatar.Fallback />
</Avatar>
```

- **Avatar**: Main container that manages avatar display state. Provides size and color context to child components. Supports animation configuration to control all child animations.
- **Avatar.Image**: Optional image component that displays the avatar image. Handles loading states and errors automatically with opacity-based fade-in animation.
- **Avatar.Fallback**: Optional fallback component shown when image fails to load or is unavailable. Displays a default person icon when no children are provided. Supports configurable entering animations with delay support.

## API Reference

### Avatar

| prop           | type                                                          | default     | description                                                                               |
| -------------- | ------------------------------------------------------------- | ----------- | ----------------------------------------------------------------------------------------- |
| `children`     | `React.ReactNode`                                             | -           | Avatar content (Image and/or Fallback components)                                         |
| `size`         | `'sm' \| 'md' \| 'lg'`                                        | `'md'`      | Size of the avatar                                                                        |
| `variant`      | `'default' \| 'soft'`                                         | `'default'` | Visual variant of the avatar                                                              |
| `color`        | `'default' \| 'accent' \| 'success' \| 'warning' \| 'danger'` | `'accent'`  | Color variant of the avatar                                                               |
| `className`    | `string`                                                      | -           | Additional CSS classes to apply                                                           |
| `animation`    | `"disable-all"` \| `undefined`                                | `undefined` | Animation configuration. Use `"disable-all"` to disable all animations including children |
| `alt`          | `string`                                                      | -           | Alternative text description for accessibility                                            |
| `...ViewProps` | `ViewProps`                                                   | -           | All standard React Native View props are supported                                        |

### Avatar.Image

Props extend different base types depending on the `asChild` prop value:

- When `asChild={false}` (default): extends `AnimatedProps<ImageProps>` from React Native Reanimated
- When `asChild={true}`: extends primitive image props for custom image components

**Note:** When using `asChild={true}` with custom image components, the `className` prop may not be applied in some cases depending on the custom component's implementation. Ensure your custom component properly handles style props.

| prop                    | type                                                                                                   | default     | description                                                                                                                                               |
| ----------------------- | ------------------------------------------------------------------------------------------------------ | ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `source`                | `ImageSourcePropType`                                                                                  | -           | Image source (required when `asChild={false}`)                                                                                                            |
| `asChild`               | `boolean`                                                                                              | `false`     | Whether to use a custom image component as child                                                                                                          |
| `className`             | `string`                                                                                               | -           | Additional CSS classes to apply                                                                                                                           |
| `animation`             | `boolean \| "disabled" \| { opacity?: { value?: [number, number], timingConfig?: WithTimingConfig } }` | `undefined` | Animation configuration. `false` or `"disabled"` disables animations. `true` or `undefined` uses defaults. Object allows custom opacity animation config. |
| `onLoadingStatusChange` | `(status: 'loading' \| 'loaded' \| 'error') => void`                                                   | -           | Callback fired when the loading status changes                                                                                                            |
| `...AnimatedProps`      | `AnimatedProps<ImageProps>` or primitive props                                                         | -           | Additional props based on `asChild` value                                                                                                                 |

**Animation Details:**

- The image uses opacity-based animation that transitions from `[0, 1]` (invisible to visible) when the image loads
- Default timing: `{ duration: 200, easing: Easing.in(Easing.ease) }`
- Animation is automatically disabled when `asChild={true}`

### Avatar.Fallback

| prop                    | type                                                                        | default               | description                                                                                                                                         |
| ----------------------- | --------------------------------------------------------------------------- | --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `children`              | `React.ReactNode`                                                           | -                     | Fallback content (text, icon, or custom element)                                                                                                    |
| `delayMs`               | `number`                                                                    | `0`                   | Delay in milliseconds before showing the fallback (applied to entering animation)                                                                   |
| `color`                 | `'default' \| 'accent' \| 'success' \| 'warning' \| 'danger'`               | inherited from parent | Color variant of the fallback                                                                                                                       |
| `className`             | `string`                                                                    | -                     | Additional CSS classes for the container                                                                                                            |
| `classNames`            | `{ container?: string, text?: string }`                                     | -                     | Additional CSS classes for different parts                                                                                                          |
| `textProps`             | `TextProps`                                                                 | -                     | Props to pass to Text component when children is a string                                                                                           |
| `iconProps`             | `PersonIconProps`                                                           | -                     | Props to customize the default person icon                                                                                                          |
| `animation`             | `boolean \| "disabled" \| { entering?: { value?: EntryOrExitLayoutType } }` | `undefined`           | Animation configuration. `false` or `"disabled"` disables animations. `true` or `undefined` uses defaults. Object allows custom entering animation. |
| `...Animated.ViewProps` | `Animated.ViewProps`                                                        | -                     | All Reanimated Animated.View props are supported                                                                                                    |

**Animation Details:**

- Default entering animation: `FadeIn.duration(200).easing(Easing.in(Easing.ease))`
- The `delayMs` prop is automatically applied to the entering animation delay
- Custom entering animations can be provided via the `animation` prop

#### PersonIconProps

| prop    | type     | description                |
| ------- | -------- | -------------------------- |
| `size`  | `number` | Size of the icon in pixels |
| `color` | `string` | Color of the icon          |

### useAvatar Hook

Hook to access Avatar primitive root context. Provides access to avatar status.

**Note:** The `status` property is particularly useful for adding a skeleton loader while the image is loading.

```tsx
import { Avatar, useAvatar, Skeleton } from 'heroui-native';

function AvatarWithSkeleton() {
  return (
    <Avatar>
      <Avatar.Image source={{ uri: imageUrl }} />
      <AvatarContent />
      <Avatar.Fallback>JD</Avatar.Fallback>
    </Avatar>
  );
}

function AvatarContent() {
  const { status } = useAvatar();

  if (status === 'loading') {
    return <Skeleton className="absolute inset-0 rounded-full" />;
  }

  return null;
}
```

| property    | type                                                 | description                                                 |
| ----------- | ---------------------------------------------------- | ----------------------------------------------------------- |
| `status`    | `'loading' \| 'loaded' \| 'error'`                   | Current loading state of the avatar image.                  |
| `setStatus` | `(status: 'loading' \| 'loaded' \| 'error') => void` | Function to manually set the avatar status (advanced usage) |

**Status Values:**

- `'loading'`: Image is currently being loaded. Use this state to show a skeleton loader.
- `'loaded'`: Image has successfully loaded.
- `'error'`: Image failed to load or source is invalid. The fallback component is automatically shown in this state.

## Important Notes

### Dynamic Prop Changes

When dynamically changing Avatar props such as `size`, `color`, `variant`, or `animation`, you need to set a unique `key` prop to `Avatar.Image` to ensure the image component properly re-renders and goes through the `loading` → `loaded` cycle.

```tsx
const [size, setSize] = useState('md');
const [animation, setAnimation] = useState(undefined);

<Avatar size={size} animation={animation}>
  <Avatar.Image
    key={`${size}-${animation}`} // Unique key ensures proper re-render
    source={{ uri: imageUrl }}
  />
  <Avatar.Fallback>JD</Avatar.Fallback>
</Avatar>;
```

Without the `key` prop, the image component may not properly reset its loading state when these props change, which can cause the opacity animation to not trigger correctly.
