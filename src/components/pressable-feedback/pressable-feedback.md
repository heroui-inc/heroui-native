# PressableFeedback

Container component that provides visual feedback for press interactions with automatic scale animation.

## Imports

Note: Before importing this component, ensure you have completed the setup as per the [Quick Start guide](../../../README.md).

```tsx
import { PressableFeedback } from 'heroui-native';
```

## Usage

### Basic Usage

The PressableFeedback component wraps content to provide press feedback effects. By default, it applies a subtle scale animation when pressed.

```tsx
<PressableFeedback>...</PressableFeedback>
```

### Highlight Variant

Default iOS-style highlight feedback effect with automatic scale animation.

```tsx
<PressableFeedback feedbackVariant="highlight">...</PressableFeedback>
```

### Ripple Variant

Android-style ripple feedback effect that emanates from the press point, combined with scale animation.

```tsx
<PressableFeedback feedbackVariant="ripple">...</PressableFeedback>
```

### Custom Highlight Animation

Configure highlight overlay opacity and background color while maintaining the default scale effect.

```tsx
<PressableFeedback
  feedbackVariant="highlight"
  animation={{
    highlight: {
      opacity: { value: [0, 0.2] },
      backgroundColor: { value: '#3b82f6' },
    },
  }}
>
  ...
</PressableFeedback>
```

### Custom Ripple Animation

Configure ripple effect color, opacity, and duration along with scale animation.

```tsx
<PressableFeedback
  feedbackVariant="ripple"
  animation={{
    ripple: {
      backgroundColor: { value: '#ec4899' },
      opacity: { value: [0, 0.3, 0] },
      progress: { baseDuration: 600 },
    },
  }}
>
  ...
</PressableFeedback>
```

### Feedback Position

Control whether the feedback effect renders above or below content.

```tsx
<PressableFeedback feedbackPosition="behind">
  ...
</PressableFeedback>

<PressableFeedback feedbackPosition="top">
  ...
</PressableFeedback>
```

### Custom Scale Animation

Customize or disable the default scale animation on press.

```tsx
<PressableFeedback
  animation={{
    scale: {
      value: 0.98,
      timingConfig: { duration: 150 }
    }
  }}
>
  ...
</PressableFeedback>

<PressableFeedback animation={{ scale: "disabled" }}>
  ...
</PressableFeedback>
```

### Disabled State

Disable press interactions and all feedback animations.

```tsx
<PressableFeedback animation="disabled">...</PressableFeedback>
```

## Example

```tsx
import { PressableFeedback, Card } from 'heroui-native';
import { View, Text, Image } from 'react-native';

export default function PressableFeedbackExample() {
  return (
    <View className="flex-1 items-center justify-center px-5">
      <View className="flex-row gap-4">
        <PressableFeedback
          feedbackVariant="ripple"
          className="flex-1 aspect-[1/1.3] rounded-3xl"
          animation={{
            ripple: {
              backgroundColor: { value: '#fecdd3' },
              opacity: { value: [0, 0.2, 0] },
            },
          }}
        >
          <Card className="flex-1">
            <View className="flex-1 gap-4">
              <Card.Header>
                <Image
                  source={{
                    uri: 'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/demo1.jpg',
                  }}
                  style={{
                    height: 60,
                    aspectRatio: 1,
                    borderRadius: 14,
                  }}
                />
              </Card.Header>
              <Card.Body className="flex-1">
                <Card.Title>Indie Hackers</Card.Title>
                <Card.Description className="text-sm">
                  148 members
                </Card.Description>
              </Card.Body>
              <Card.Footer className="flex-row items-center gap-2">
                <View className="size-3 rounded-full bg-rose-400" />
                <AppText className="text-sm font-medium text-foreground">
                  @indiehackers
                </AppText>
              </Card.Footer>
            </View>
          </Card>
        </PressableFeedback>
        <PressableFeedback
          feedbackVariant="ripple"
          className="flex-1 aspect-[1/1.3] rounded-3xl"
          animation={{
            ripple: {
              backgroundColor: { value: '#67e8f9' },
            },
          }}
        >
          <Card className="flex-1">
            <View className="flex-1 gap-4">
              <Card.Header>
                <Image
                  source={{
                    uri: 'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/demo2.jpg',
                  }}
                  style={{
                    height: 60,
                    aspectRatio: 1,
                    borderRadius: 14,
                  }}
                />
              </Card.Header>
              <Card.Body className="flex-1">
                <Card.Title>AI Builders</Card.Title>
                <Card.Description className="text-sm">
                  362 members
                </Card.Description>
              </Card.Body>
              <Card.Footer className="flex-row items-center gap-2">
                <View className="size-3 rounded-full bg-emerald-400" />
                <AppText className="text-sm font-medium text-foreground">
                  @aibuilders
                </AppText>
              </Card.Footer>
            </View>
          </Card>
        </PressableFeedback>
      </View>
    </View>
  );
}
```

## API Reference

### PressableFeedback

The component includes a default scale animation (0.985) that is automatically applied on press. This scale value is intelligently adjusted based on container width for consistent visual feedback across different sizes.

| prop               | type                                                                                                                        | default       | description                                                                                                                           |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `children`         | `React.ReactNode`                                                                                                           | -             | Content to be wrapped with press feedback                                                                                             |
| `feedbackVariant`  | `'highlight' \| 'ripple'`                                                                                                   | `'highlight'` | Type of feedback effect to display                                                                                                    |
| `feedbackPosition` | `'behind' \| 'top'`                                                                                                         | `'top'`       | Controls z-index positioning of feedback effect relative to children                                                                  |
| `isDisabled`       | `boolean`                                                                                                                   | `false`       | Whether the pressable component is disabled                                                                                           |
| `className`        | `string`                                                                                                                    | -             | Additional CSS classes                                                                                                                |
| `animation`        | `boolean \| 'disabled' \| 'disable-all' \| PressableFeedbackHighlightRootAnimation \| PressableFeedbackRippleRootAnimation` | -             | Animation configuration. Set to `'disabled'` to disable root animations, `'disable-all'` to disable all animations including children |
| `...AnimatedProps` | `AnimatedProps<PressableProps>`                                                                                             | -             | All Reanimated Animated Pressable props are supported                                                                                 |

#### PressableFeedbackHighlightRootAnimation

| prop        | type                                  | description                               |
| ----------- | ------------------------------------- | ----------------------------------------- |
| `scale`     | `PressableFeedbackScaleAnimation`     | Scale animation for the root container    |
| `highlight` | `PressableFeedbackHighlightAnimation` | Highlight overlay animation configuration |

#### PressableFeedbackRippleRootAnimation

| prop     | type                               | description                            |
| -------- | ---------------------------------- | -------------------------------------- |
| `scale`  | `PressableFeedbackScaleAnimation`  | Scale animation for the root container |
| `ripple` | `PressableFeedbackRippleAnimation` | Ripple effect animation configuration  |

#### PressableFeedbackScaleAnimation

| prop                     | type               | default                                              | description                                                                |
| ------------------------ | ------------------ | ---------------------------------------------------- | -------------------------------------------------------------------------- |
| `value`                  | `number`           | `0.985`                                              | Scale value when pressed (automatically adjusted based on container width) |
| `timingConfig`           | `WithTimingConfig` | `{ duration: 300, easing: Easing.out(Easing.ease) }` | Animation timing configuration                                             |
| `ignoreScaleCoefficient` | `boolean`          | `false`                                              | Ignore automatic scale coefficient and use the scale value directly        |

#### PressableFeedbackHighlightAnimation

| prop              | type                            | description                           |
| ----------------- | ------------------------------- | ------------------------------------- |
| `opacity`         | `AnimationValue<OpacityConfig>` | Opacity animation for highlight       |
| `backgroundColor` | `AnimationValue<ColorConfig>`   | Background color of highlight overlay |

#### PressableFeedbackRippleAnimation

| prop              | type                                  | description                       |
| ----------------- | ------------------------------------- | --------------------------------- |
| `backgroundColor` | `AnimationValue<ColorConfig>`         | Background color of ripple effect |
| `progress`        | `AnimationValue<ProgressConfig>`      | Progress animation configuration  |
| `opacity`         | `AnimationValue<RippleOpacityConfig>` | Opacity animation for ripple      |
| `scale`           | `AnimationValue<RippleScaleConfig>`   | Scale animation for ripple        |

#### ProgressConfig

| prop                        | type      | default | description                                                                  |
| --------------------------- | --------- | ------- | ---------------------------------------------------------------------------- |
| `baseDuration`              | `number`  | `1000`  | Base duration for ripple progress (automatically adjusted based on diagonal) |
| `minBaseDuration`           | `number`  | -       | Minimum base duration for the ripple progress animation                      |
| `ignoreDurationCoefficient` | `boolean` | `false` | Ignore automatic duration coefficient and use base duration directly         |
