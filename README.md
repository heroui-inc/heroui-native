<p align="center">
  <a href="https://heroui.com">
      <img width="20%" src="https://raw.githubusercontent.com/heroui-inc/heroui/main/apps/docs/public/isotipo.png" alt="heroui" />
      <h1 align="center">HeroUI Native</h1>
  </a>
</p>

<p align="center">
  Beautiful, fast and modern React Native UI library
</p>

## Getting Started

### 1. Install HeroUI Native

```bash
npm install heroui-native
# or
yarn add heroui-native
# or
pnpm add heroui-native
```

### 2. Install Mandatory Peer Dependencies

```bash
npm install react-native-reanimated@~3.17.4 react-native-safe-area-context@5.4.0 react-native-svg@^15.12.1 tailwind-variants@^2.0.1 tailwind-merge@^3.3.1
# or
yarn add react-native-reanimated@~3.17.4 react-native-safe-area-context@5.4.0 react-native-svg@^15.12.1 tailwind-variants@^2.0.1 tailwind-merge@^3.3.1
# or
pnpm add react-native-reanimated@~3.17.4 react-native-safe-area-context@5.4.0 react-native-svg@^15.12.1 tailwind-variants@^2.0.1 tailwind-merge@^3.3.1
```

### 3. Set Up NativeWind

Follow the [NativeWind installation guide](https://www.nativewind.dev/docs/getting-started/installation) to set up Tailwind CSS for React Native.

### 4. Set Up Theme

Configure your theme following the instructions in our [Theme Documentation](./src/theme/theme.md)

### 5. Import Your First Component

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

- [Theme System](./src/theme/theme.md) - Complete theming guide including colors, dark mode, and customization
- Components - Full component library documentation
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
