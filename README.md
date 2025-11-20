<p align="center">
  <a href="https://heroui.com">
      <img width="100%" src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/images/heroui-native-repo-2.png" alt="heroui" />
  </a>
</p>
<p align="center">
  Beautiful, fast and modern React Native UI library
</p>

<p align="center">
  v1.0.0-beta.2
</p>

## Preview App

Experience HeroUI Native components in action with our preview app! You can explore all components and their variants directly on your device.

### Prerequisites

Make sure you have the latest version of [Expo Go](https://expo.dev/go) installed on your mobile device

### How to Access

Choose one of the following methods to access the preview app:

#### Option 1: Scan the QR Code

Use your device's camera or Expo Go app to scan:

<p align="center">
  <img width="25%" src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/images/qr-code-native.png" alt="Expo Go QR Code" />
</p>

> **Note for Android users:** If scanning the QR code with your device's camera or other scanner apps redirects to a browser and shows a 404 error, open Expo Go first and use its built-in QR scanner instead.

#### Option 2: Click the Link

**[📱 Open Demo App in Expo Go](https://link.heroui.com/native-demo)**

This will automatically open the app in Expo Go if it's installed on your device.

## Quick Start with Example App

Want to start building with HeroUI Native immediately? We provide a standalone example app that's fully configured and ready to use:

**[🚀 HeroUI Native Example App](https://github.com/heroui-inc/heroui-native-example)**

This repository contains a pre-configured React Native app with HeroUI Native already set up, including:

- All necessary dependencies installed
- Uniwind configuration ready
- Example components showcasing best practices
- Perfect for quickly prototyping or starting a new project

Simply clone, install, and start building!

## Getting Started

### 1. Install HeroUI Native

```bash
npm install heroui-native
```

### 2. Install Mandatory Peer Dependencies

```bash
npm install react-native-screens react-native-reanimated@~4.1.0 react-native-worklets@^0.5.1 react-native-safe-area-context@5.6.0 react-native-svg@^15.12.1 tailwind-variants@^3.1.0 tailwind-merge@^3.3.1 @gorhom/bottom-sheet@^5
```

> **Important:** It's recommended to use the exact versions specified above to avoid compatibility issues. Version mismatches may cause unexpected bugs.

### 3. Set Up Uniwind

Follow the [Uniwind installation guide](https://docs.uniwind.dev/quickstart) to set up Tailwind CSS for React Native.

If you're migrating from NativeWind, see the [migration guide](https://docs.uniwind.dev/migration-from-nativewind).

### 4. Configure global.css

Inside your `global.css` file add the following imports:

```css
@import 'tailwindcss';
@import 'uniwind';

@import 'heroui-native/styles';

/* Path to the heroui-native lib inside node_modules from the root of your project */
@source './node_modules/heroui-native/lib';
```

> **Note:** If you need the color scheme from the alpha version of HeroUI Native, you can find it in [example/themes/alpha.css](./example/themes/alpha.css).

#### Running on Web (Expo)

> **Note:** We are currently focusing on the mobile version. Using HeroUI Native on web is not recommended at this time.

If you're using Expo and want to run your app on web, follow these additional steps:

1. **Install web dependencies:**

```bash
npx expo install react-dom react-native-web @expo/metro-runtime
```

2. **Update your `app.json`:**

```json
{
  "expo": {
    "web": {
      "bundler": "metro"
    }
  }
}
```

3. **Add `darkMode: 'class'` to your `tailwind.config.js`** (already included in the configuration above)

### 5. Wrap Your App with Provider

Wrap your application with `HeroUINativeProvider`. Since HeroUI Native uses `react-native-gesture-handler` under the hood, you must wrap it with `GestureHandlerRootView`:

```tsx
import { HeroUINativeProvider } from 'heroui-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <HeroUINativeProvider>{/* Your app content */}</HeroUINativeProvider>
    </GestureHandlerRootView>
  );
}
```

> **Note:** `react-native-gesture-handler` is required because HeroUI Native uses it internally for gesture handling. Make sure to install it if you haven't already: `npm install react-native-gesture-handler`

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
- [Theming](./src/styles/theme.md) - Theme customization, colors, fonts and dark mode

### Components

- [Accordion](./src/components/accordion/accordion.md)
- [Avatar](./src/components/avatar/avatar.md)
- [Button](./src/components/button/button.md)
- [Card](./src/components/card/card.md)
- [Checkbox](./src/components/checkbox/checkbox.md)
- [Chip](./src/components/chip/chip.md)
- [Dialog](./src/components/dialog/dialog.md)
- [Divider](./src/components/divider/divider.md)
- [Error View](./src/components/error-view/error-view.md)
- [Form Field](./src/components/form-field/form-field.md)
- [Popover](./src/components/popover/popover.md)
- [Pressable Feedback](./src/components/pressable-feedback/pressable-feedback.md)
- [Radio Group](./src/components/radio-group/radio-group.md)
- [Scroll Shadow](./src/components/scroll-shadow/scroll-shadow.md)
- [Select](./src/components/select/select.md)
- [Skeleton](./src/components/skeleton/skeleton.md)
- [Skeleton Group](./src/components/skeleton-group/skeleton-group.md)
- [Spinner](./src/components/spinner/spinner.md)
- [Surface](./src/components/surface/surface.md)
- [Switch](./src/components/switch/switch.md)
- [Tabs](./src/components/tabs/tabs.md)
- [Text Field](./src/components/text-field/text-field.md)

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for a history of changes to this library.

## Roadmap

See [Roadmap](https://herouinative.featurebase.app/roadmap) to see what we're working on.

## Community

We're excited to see the community adopt HeroUI, raise issues, and provide feedback.
Whether it's a feature request, bug report, or a project to showcase, please get involved!

- [Discord](https://discord.gg/9b6yyZKmH4)
- [X](https://x.com/hero_ui)
- [GitHub Discussions](https://github.com/heroui-inc/heroui/discussions)

## Contributing

Contributions are always welcome! We appreciate your help in making HeroUI Native better.

### How to Contribute

- **Bug Fixes**: Check our [GitHub Issues](https://github.com/heroui-inc/heroui-native/issues) for bugs that need fixing
- **New Components**: Only core team can add new components. Check our [Roadmap](https://herouinative.featurebase.app/roadmap) to see what's planned
- **Feature Proposals**: Start a discussion in [GitHub Discussions](https://github.com/heroui-inc/heroui/discussions) before implementing

**Important:** Please do not add new components or variants, change existing designs, or modify component behavior without prior discussion. We follow a strict design system based on our Figma designs and roadmap.

For detailed guidelines, see [CONTRIBUTING.md](https://github.com/heroui-inc/heroui-native/blob/main/CONTRIBUTING.md).

Please adhere to this project's [CODE_OF_CONDUCT](https://github.com/heroui-inc/heroui-native/blob/main/CODE_OF_CONDUCT.md).

## License

[MIT](./LICENSE)
