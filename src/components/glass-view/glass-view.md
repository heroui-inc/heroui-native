# GlassView

Absolute-fill frosted-glass layer built on an optional blur package — `expo-blur` (preferred) or `@react-native-community/blur`.

## Import

```tsx
import { GlassView } from 'heroui-native';
```

## Anatomy

```tsx
<GlassView />
```

- **GlassView**: Absolute-fill blur layer. Renders the blur unconditionally — theme gating is the responsibility of the part that mounts it. Overlay components (Popover, Dialog, Menu, BottomSheet, Select, Toast) expose theme-gated `X.Glass` compound parts that render `null` unless the `--theme` CSS variable resolves to `glass`.

## Setup

The `X.Glass` parts activate when a glass theme sets the `--theme` variable:

```css
@theme inline static {
  --theme: glass;
}
```

The `heroui-native-pro/themes/glass` theme does this for you. Install one of the optional blur dependencies for native blur:

```bash
# Expo projects (preferred)
npx expo install expo-blur

# or, bare React Native projects
npm install @react-native-community/blur
```

The `blurPackage` prop selects which package renders the layer (`'expo-blur'` by default, `'community-blur'` for @react-native-community/blur); when the preferred package is not installed, GlassView falls back to the other installed one. With `community-blur`, the `tint`/`intensity` props are mapped to its `blurType`/`blurAmount`, and `experimentalBlurMethod` is ignored (it blurs natively on Android).

Without either package, GlassView renders a plain transparent layer — the glass theme's translucent surface colors still apply, just without native blur.

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
      <GlassView intensity={80} tint="light" />
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

| prop                     | type                            | default                                    | description                                                                                     |
| ------------------------ | ------------------------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| `blurPackage`            | `'expo-blur' \| 'community-blur'` | `'expo-blur'`                            | Which blur package renders the layer; falls back to the other installed one.                    |
| `intensity`              | `number`                        | `50`                                       | Blur intensity (0-100). Maps to expo-blur `intensity` / community `blurAmount`.                 |
| `tint`                   | `ExpoBlurTint`                  | derived from the active light/dark scheme  | Blur tint. Maps to expo-blur `tint` / community `blurType`.                                     |
| `experimentalBlurMethod` | `'none' \| 'dimezisBlurView'`   | `'dimezisBlurView'` on Android             | expo-blur only: Android blur implementation. Ignored with @react-native-community/blur.         |
| `className`              | `string`                        | -                                          | Additional classes for the blur layer (e.g. radius clipping).                                   |
| `...ViewProps`           | `ViewProps`                     | -                                          | All standard React Native View props.                                                           |

### useIsGlassTheme

Hook returning `true` when the active `--theme` is `glass`.

## Performance

Blur layers are comparatively expensive, especially on Android. Avoid stacking many simultaneous GlassViews (e.g. large toast stacks); overlay components already avoid double-blur where surfaces overlap.
