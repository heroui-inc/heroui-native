<p align="center">
  <a href="https://heroui.com">
      <img width="20%" src="https://raw.githubusercontent.com/heroui-inc/heroui/main/apps/docs/public/isotipo.png" alt="heroui" />
      <h1 align="center">HeroUI Native</h1>
  </a>
</p>

<p align="center">
  Beautiful, fast and modern React Native UI library
</p>

<p align="center">
  v1.0.0-alpha.7
</p>

## Preview App

Experience HeroUI Native components in action with our preview app! You can explore all components and their variants directly on your device.

### Prerequisites

Make sure you have the latest version of [Expo Go](https://expo.dev/go) installed on your mobile device.

### How to Access

Choose one of the following methods to access the preview app:

#### Option 1: Scan the QR Code

Use your device's camera or Expo Go app to scan:

<p align="center">
  <img width="20%" src="./expo-go-qr.png" alt="Expo Go QR Code" />
</p>

> **Note for Android users:** If scanning the QR code with your device's camera or other scanner apps redirects to a browser and shows a 404 error, open Expo Go first and use its built-in QR scanner instead.

#### Option 2: Click the Link

Open the preview app directly by clicking this link on your mobile device:

**[https://link.heroui.com/native-demo](https://link.heroui.com/native-demo)**

This will automatically open the app in Expo Go if it's installed on your device.

## Getting Started

### 1. Install HeroUI Native

```bash
npm install heroui-native
```

### 2. Install Mandatory Peer Dependencies

```bash
npm install react-native-reanimated@~3.17.4 react-native-safe-area-context@5.4.0 react-native-svg@^15.12.1 tailwind-variants@1.0.0 tailwind-merge@^3.3.1
```

> **Important:** It's recommended to use the exact versions specified above to avoid compatibility issues. Version mismatches may cause unexpected bugs.

> **Note:** We will upgrade to Reanimated v4 as soon as Expo SDK 54 is released, ensuring full compatibility with the latest Expo ecosystem.

> **Note:** We currently use tailwind-variants v1.0.0 as the latest version has known issues on Android devices. We're actively investigating this and will update once the issue is resolved.

### 3. Set Up NativeWind

Follow the [NativeWind installation guide](https://www.nativewind.dev/docs/getting-started/installation) to set up Tailwind CSS for React Native.

### 4. Configure Tailwind

Update your `tailwind.config.js` to include the HeroUI Native plugin:

```javascript
import heroUINativePlugin from 'heroui-native/tailwind-plugin';

module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './node_modules/heroui-native/lib/**/*.{js,ts,jsx,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {},
  },
  plugins: [heroUINativePlugin],
};
```

> **Important:** Import the tailwind plugin from `heroui-native/tailwind-plugin` and not from `heroui-native`.

> **Important:** The `'./node_modules/heroui-native/lib/**/*.{js,ts,jsx,tsx}'` path is crucial for Tailwind to process the library's component styles. Without it, HeroUI Native components won't be styled correctly.

### 5. Wrap Your App with Provider

Wrap your application with `HeroUINativeProvider`:

```tsx
import { HeroUINativeProvider } from 'heroui-native';

export default function App() {
  return <HeroUINativeProvider>{/* Your app content */}</HeroUINativeProvider>;
}
```

### 6. Use Your First Component

```tsx
import { Button } from 'heroui-native';
import { View } from 'react-native';

export default function MyComponent() {
  return (
    <View className="flex-1 justify-center items-center bg-background">
      <Button onPress={() => console.log('Pressed!')}>Get Started</Button>
    </View>
  );
}
```

## Documentation

### Core

- [Provider Configuration](./src/providers/hero-ui-native/provider.md) - Complete setup and configuration guide
- [Theming](./src/providers/theme/theme.md) - Theme customization, colors, and dark mode
- [Custom Fonts](./src/providers/theme/theme.md#custom-fonts) - How to use custom fonts with HeroUI Native

### Components

- [Accordion](./src/components/accordion/accordion.md)
- [Button](./src/components/button/button.md)
- [Card](./src/components/card/card.md)
- [Checkbox](./src/components/checkbox/checkbox.md)
- [Chip](./src/components/chip/chip.md)
- [Divider](./src/components/divider/divider.md)
- [Drop Shadow View](./src/components/drop-shadow-view/drop-shadow-view.md)
- [Error Field](./src/components/error-field/error-field.md)
- [Form Field](./src/components/form-field/form-field.md)
- [Radio](./src/components/radio/radio.md)
- [Radio Group](./src/components/radio-group/radio-group.md)
- [Spinner](./src/components/spinner/spinner.md)
- [Surface](./src/components/surface/surface.md)
- [Switch](./src/components/switch/switch.md)
- [Text Field](./src/components/text-field/text-field.md)

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for a history of changes to this library.

## Community

We're excited to see the community adopt HeroUI, raise issues, and provide feedback.
Whether it's a feature request, bug report, or a project to showcase, please get involved!

- [Discord](https://discord.gg/9b6yyZKmH4)
- [X](https://x.com/hero_ui)
- [GitHub Discussions](https://github.com/heroui-inc/heroui/discussions)

## Contributing

Contributions are always welcome!

See [CONTRIBUTING.md](https://github.com/heroui-inc/heroui-native/blob/main/CONTRIBUTING.md) for ways to get started.

Please adhere to this project's [CODE_OF_CONDUCT](https://github.com/heroui-inc/heroui-native/blob/main/CODE_OF_CONDUCT.md).

## License

[MIT](./LICENSE)
