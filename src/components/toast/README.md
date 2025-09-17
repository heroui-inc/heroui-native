# Toast Component

A simplified toast notification component for React Native, built with HeroUI Native.

## Features

- ✅ Simple toast notifications
- ✅ Multiple variants (success, danger, warning, info, default)
- ✅ Action buttons
- ✅ Auto-dismiss functionality
- ✅ Customizable styling
- ❌ No swipe gestures
- ❌ No wiggle animations
- ❌ No position management

## Usage

### Basic Setup

First, add the `Toaster` component to your app root:

```tsx
import { Toaster } from 'heroui-native';

export default function App() {
  return (
    <>
      {/* Your app content */}
      <Toaster />
    </>
  );
}
```

### Using the Toast Hook

```tsx
import { useToast } from 'heroui-native';

function MyComponent() {
  const { toast, dismiss } = useToast();

  const showSuccessToast = () => {
    toast({
      title: 'Success!',
      description: 'Your action was completed successfully.',
      variant: 'success',
      duration: 5000,
    });
  };

  const showActionToast = () => {
    toast({
      title: 'Action Required',
      description: 'Please confirm your action.',
      action: {
        label: 'Confirm',
        onPress: () => {
          // Handle action
          console.log('Action confirmed');
        },
      },
    });
  };

  return (
    <View>
      <Button onPress={showSuccessToast}>Show Success Toast</Button>
      <Button onPress={showActionToast}>Show Action Toast</Button>
    </View>
  );
}
```

### Toast Variants

- `default` - Standard toast with neutral styling
- `success` - Green styling for success messages
- `danger` - Red styling for error messages
- `warning` - Yellow styling for warning messages
- `info` - Blue styling for informational messages

### Toast Options

```tsx
toast({
  id: 'unique-id', // Optional: custom ID
  title: 'Toast Title', // Optional: main message
  description: 'Toast description', // Optional: additional details
  variant: 'success', // Optional: toast variant
  duration: 5000, // Optional: auto-dismiss time in ms
  closeButton: true, // Optional: show close button
  action: { // Optional: action button
    label: 'Action',
    onPress: () => {},
  },
  onDismiss: (id) => {}, // Optional: callback when dismissed
  onAutoClose: (id) => {}, // Optional: callback when auto-closed
});
```

### Customizing the Toaster

```tsx
<Toaster
  duration={3000}
  visibleToasts={5}
  closeButton={true}
  gap={8}
  toastOptions={{
    unstyled: false,
    titleClassName: 'custom-title-class',
    descriptionClassName: 'custom-description-class',
  }}
/>
```

## Props

### Toast Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string \| number` | - | Unique identifier for the toast |
| `title` | `string` | - | Main toast message |
| `description` | `string` | - | Additional toast details |
| `variant` | `ToastVariant` | `'default'` | Toast styling variant |
| `duration` | `number` | `5000` | Auto-dismiss time in milliseconds |
| `closeButton` | `boolean` | `true` | Whether to show close button |
| `action` | `ActionConfig` | - | Action button configuration |
| `onDismiss` | `function` | - | Callback when toast is dismissed |
| `onAutoClose` | `function` | - | Callback when toast auto-closes |

### Toaster Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `duration` | `number` | `5000` | Default duration for all toasts |
| `visibleToasts` | `number` | `3` | Maximum number of visible toasts |
| `closeButton` | `boolean` | `true` | Default close button setting |
| `gap` | `number` | `8` | Gap between toasts |
| `toastOptions` | `object` | `{}` | Additional toast styling options |

## Styling

The toast component uses NativeWind for styling. You can customize the appearance by modifying the `toast.styles.ts` file or passing custom className props.

## Accessibility

- Toasts are announced to screen readers
- Action buttons are properly labeled
- Close buttons have appropriate accessibility labels
- Keyboard navigation support for action buttons
