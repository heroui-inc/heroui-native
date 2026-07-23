# GlassView

Absolute-fill frosted-glass layer. Real blur on iOS via the optional `expo-blur` package; an opaque flattened theme color on Android / web.

## Import

```tsx
import { GlassView } from 'heroui-native';
```

## Anatomy

```tsx
<GlassView />
```

- **GlassView**: Absolute-fill layer. Renders unconditionally — theme gating is the responsibility of the part that mounts it. Overlay components (Popover, Dialog, Menu, BottomSheet, Select, Toast) expose theme-gated background compound parts that mount `GlassView` when the `--theme` CSS variable resolves to `glass`.

## Setup

The background parts activate when a glass theme sets the `--theme` variable:

```css
@theme inline static {
  --theme: glass;
}
```

The `heroui-native-pro/themes/glass` theme does this for you. Install the optional blur dependency for native blur on iOS:

```bash
npx expo install expo-blur
```

## Platform behavior

- **iOS** (with expo-blur installed): a native `BlurView` blurs the content behind the layer; `intensity` and `tint` are forwarded. Translucent theme tokens frost through the blur.
- **Android / web**, or any platform without expo-blur: the layer paints an opaque color — the `fallbackColor` theme token (default `"overlay"`) alpha-composited over `--background` — approximating the frosted look without translucency. Field surfaces pass `fallbackColor="field"`.

## Usage

### Standalone

```tsx
<View className="relative rounded-3xl overflow-hidden">
  <GlassView />
  <Text>Content above the glass</Text>
</View>
```

### Customizing a component's background layer

Components with an injectable background render it automatically; replace it via the `background` prop:

```tsx
<Popover.Content
  background={
    <Popover.ContentBackground>
      <GlassView intensity={80} tint="light" fallbackColor="overlay" />
    </Popover.ContentBackground>
  }
>
  ...
</Popover.Content>

// remove the layer entirely
<Popover.Content background={null}>...</Popover.Content>
```

## API Reference

### GlassView

| prop            | type           | default                                   | description                                                                                          |
| --------------- | -------------- | ----------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| `intensity`     | `number`       | `30`                                      | Blur intensity (0-100). iOS only, forwarded to expo-blur.                                            |
| `tint`          | `ExpoBlurTint` | derived from the active light/dark scheme | Blur tint. iOS only, forwarded to expo-blur.                                                         |
| `fallbackColor` | `ThemeColor`   | `'overlay'`                               | Theme token flattened over `--background` and painted opaque on Android / web (ignored on iOS blur). |
| `className`     | `string`       | -                                         | Additional classes for the layer (e.g. radius clipping).                                             |
| `...ViewProps`  | `ViewProps`    | -                                         | All standard React Native View props.                                                                |

### useIsGlassTheme

Hook returning `true` when the active `--theme` is `glass`.

## Performance

Blur layers are comparatively expensive. Avoid stacking many simultaneous GlassViews (e.g. large toast stacks); overlay components already avoid double-blur where surfaces overlap. The Android / web fallback is a plain opaque view and has no blur cost.
