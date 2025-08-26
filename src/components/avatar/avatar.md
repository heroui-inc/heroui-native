# Avatar

A component for displaying user profile pictures with fallback support.

## Imports

Note: Before importing this component, ensure you have completed the setup as per the [Quick Start guide](../../../README.md).

```tsx
import { Avatar } from 'heroui-native';
```

## Usage

### Basic Usage

The Avatar component displays a profile image with automatic fallback handling.

```tsx
<Avatar>
  <Avatar.Image source="https://example.com/profile.jpg" alt="Profile" />
  <Avatar.Fallback>JD</Avatar.Fallback>
</Avatar>
```

### Different Sizes

Avatars come in four sizes: `sm`, `md`, `lg`, and `xl`.

```tsx
<Avatar size="sm">
  <Avatar.Image source="https://example.com/profile.jpg" alt="Profile" />
  <Avatar.Fallback>JD</Avatar.Fallback>
</Avatar>

<Avatar size="lg">
  <Avatar.Image source="https://example.com/profile.jpg" alt="Profile" />
  <Avatar.Fallback>JD</Avatar.Fallback>
</Avatar>
```

### Different Radius

Customize the border radius with predefined options.

```tsx
<Avatar radius="lg">
  <Avatar.Image source="https://example.com/profile.jpg" alt="Profile" />
  <Avatar.Fallback>JD</Avatar.Fallback>
</Avatar>

<Avatar radius="full">
  <Avatar.Image source="https://example.com/profile.jpg" alt="Profile" />
  <Avatar.Fallback>JD</Avatar.Fallback>
</Avatar>
```

### Image Only

Use just the image without fallback for simple cases.

```tsx
<Avatar>
  <Avatar.Image source="https://example.com/profile.jpg" alt="Profile" />
</Avatar>
```

### Fallback Only

Show fallback content when no image is provided.

```tsx
<Avatar>
  <Avatar.Fallback>JD</Avatar.Fallback>
</Avatar>
```

### Avatar Groups

Group multiple avatars together with overflow handling.

```tsx
<Avatar.Group max={3} showTotal>
  <Avatar>
    <Avatar.Image source="https://example.com/user1.jpg" alt="User 1" />
    <Avatar.Fallback>U1</Avatar.Fallback>
  </Avatar>
  <Avatar>
   <Avatar.Image source="https://example.com/user1.jpg" alt="User 1" />
    <Avatar.Fallback>U2</Avatar.Fallback>
  </Avatar>
  <Avatar>
   <Avatar.Image source="https://example.com/user1.jpg" alt="User 1" />
    <Avatar.Fallback>U3</Avatar.Fallback>
  </Avatar>
  <Avatar>
  <Avatar.Image source="https://example.com/user1.jpg" alt="User 1" />
    <Avatar.Fallback>U4</Avatar.Fallback>
  </Avatar>
</Avatar.Group>
```

## Example

```tsx
import { Avatar } from 'heroui-native';
import { View } from 'react-native';

export default function AvatarExample() {
  return (
    <View className="gap-4 p-4">
      {/* Basic Avatar */}
      <Avatar>
        <Avatar.Image 
          source="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e" 
          alt="John Doe" 
        />
        <Avatar.Fallback>JD</Avatar.Fallback>
      </Avatar>

      {/* Different Sizes */}
      <View className="flex-row gap-4">
        <Avatar size="sm">
          <Avatar.Image source="https://example.com/small.jpg" alt="Small" />
          <Avatar.Fallback>SM</Avatar.Fallback>
        </Avatar>
        <Avatar size="md">
          <Avatar.Image source="https://example.com/medium.jpg" alt="Medium" />
          <Avatar.Fallback>MD</Avatar.Fallback>
        </Avatar>
        <Avatar size="lg">
          <Avatar.Image source="https://example.com/large.jpg" alt="Large" />
          <Avatar.Fallback>LG</Avatar.Fallback>
        </Avatar>
        <Avatar size="xl">
          <Avatar.Image source="https://example.com/xlarge.jpg" alt="XLarge" />
          <Avatar.Fallback>XL</Avatar.Fallback>
        </Avatar>
      </View>

      {/* Different Radius */}
      <View className="flex-row gap-4">
        <Avatar radius="sm">
          <Avatar.Fallback>SM</Avatar.Fallback>
        </Avatar>
        <Avatar radius="md">
          <Avatar.Fallback>MD</Avatar.Fallback>
        </Avatar>
        <Avatar radius="lg">
          <Avatar.Fallback>LG</Avatar.Fallback>
        </Avatar>
        <Avatar radius="xl">
          <Avatar.Fallback>XL</Avatar.Fallback>
        </Avatar>
        <Avatar radius="full">
          <Avatar.Fallback>FU</Avatar.Fallback>
        </Avatar>
      </View>

      {/* Avatar Group */}
      <Avatar.Group max={4} showTotal>
        <Avatar>
          <Avatar.Image source="https://example.com/user1.jpg" alt="User 1" />
          <Avatar.Fallback>U1</Avatar.Fallback>
        </Avatar>
        <Avatar>
          <Avatar.Image source="https://example.com/user2.jpg" alt="User 2" />
          <Avatar.Fallback>U2</Avatar.Fallback>
        </Avatar>
        <Avatar>
          <Avatar.Image source="https://example.com/user3.jpg" alt="User 3" />
          <Avatar.Fallback>U3</Avatar.Fallback>
        </Avatar>
        <Avatar>
          <Avatar.Image source="https://example.com/user4.jpg" alt="User 4" />
          <Avatar.Fallback>U4</Avatar.Fallback>
        </Avatar>
        <Avatar>
          <Avatar.Image source="https://example.com/user5.jpg" alt="User 5" />
          <Avatar.Fallback>U5</Avatar.Fallback>
        </Avatar>
        <Avatar>
          <Avatar.Image source="https://example.com/user6.jpg" alt="User 6" />
          <Avatar.Fallback>U6</Avatar.Fallback>
        </Avatar>
      </Avatar.Group>
    </View>
  );
}
```

## API Reference

### Avatar.Root

The main avatar container component.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | `'md'` | Size of the avatar |
| `radius` | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'full'` | Border radius of the avatar |
| `isDisabled` | `boolean` | `false` | Whether the avatar is disabled |
| `children` | `ReactNode` | - | Avatar content (Image and/or Fallback) |

### Avatar.Image

Displays the profile image with error handling.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `source` | `string` | - | **Required.** Source of the image |
| `alt` | `string` | - | Alt text for accessibility |
| `style` | `StyleProp<ImageStyle>` | - | Custom style object |

### Avatar.Fallback

Shows fallback content when the image fails to load or is not provided.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `children` | `ReactNode` | `'?'` | Fallback content to display |
| `style` | `StyleProp<ViewStyle>` | - | Custom style object |



## Styling

The Avatar component uses Tailwind CSS classes for styling. You can customize the appearance by:

1. **Modifying the theme colors** in your theme configuration
2. **Overriding styles** using the `className` prop
3. **Custom styling** using the `style` prop

### Default Sizes

- `sm`: 32x32 pixels (w-8 h-8)
- `md`: 40x40 pixels (w-10 h-10)
- `lg`: 48x48 pixels (w-12 h-12)
- `xl`: 64x64 pixels (w-16 h-16)

### Default Radius

- `sm`: rounded-md
- `md`: rounded-lg
- `lg`: rounded-xl
- `xl`: rounded-2xl
- `full`: rounded-full

## Accessibility

The Avatar component includes several accessibility features:

- **Alt text support** for images via the `alt` prop
- **Semantic markup** for screen readers
- **Proper contrast** with fallback text

## Best Practices

1. **Always provide alt text or fallback** for images to improve accessibility
2. **Use meaningful fallback content** (initials, icons, or descriptive text)
3. **Choose appropriate sizes** based on your UI context
