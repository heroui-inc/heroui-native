# HeroUI Native Theme System

## Purpose

The HeroUI Native theme system provides a comprehensive theming solution for React Native applications, built on top of NativeWind. It offers:

- **Dynamic Theme Switching**: Seamless light/dark mode transitions
- **Color System**: Semantic color tokens with HSL-based architecture
- **Type Safety**: Full TypeScript support for theme configuration
- **Runtime Access**: Direct access to theme colors via React Context
- **Tailwind Integration**: Use theme colors directly in className props
- **Color Manipulation**: Advanced color utilities via colorKit

## Setup

### 1. Prerequisites

Make sure you have completed the necessary installation steps as per the [Quick Start Guide](../quickstart), including:

- HeroUI Native package installation
- NativeWind configuration
- Required peer dependencies

### 2. Configure Tailwind

Update your `tailwind.config.ts` to include the HeroUI plugin and content paths:

```typescript
import { herouiNative } from 'heroui-native/theme';

export default {
  content: [
    // Your app's content paths
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',

    // IMPORTANT: Include HeroUI components (pointing to ROOT node_modules)
    './node_modules/heroui-native/lib/**/*.{js,ts,jsx,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {},
  },
  plugins: [herouiNative],
};
```

### 3. Add Theme Provider

Wrap your app with the `ThemeProvider` at the root level:

```tsx
import { ThemeProvider } from 'heroui-native';

export default function App() {
  return <ThemeProvider>{/* Your app content */}</ThemeProvider>;
}
```

## Usage

### NativeWind Classes

Use semantic color tokens directly in your className props:

```tsx
// Base colors
<View className="bg-background" />
<View className="bg-panel border-border" />

// Semantic colors
<View className="bg-surface" />
<Text className="text-surface-foreground" />

// Accent colors
<Button className="bg-accent" />
<View className="bg-accent-soft" />

// Status colors
<Alert className="bg-success" />
<Warning className="bg-warning" />
<Error className="bg-danger" />

// Surface levels
<Card className="bg-surface-1" />
<Modal className="bg-surface-2" />
<Overlay className="bg-surface-3" />

// Border radius utilities
<View className="rounded-xs" /> // 0.25x base radius
<View className="rounded-sm" /> // 0.5x base radius
<View className="rounded-md" /> // 0.75x base radius
<View className="rounded-lg" /> // 1x base radius
<View className="rounded-xl" /> // 1.5x base radius

// Opacity
<View className="opacity-disabled" />
```

### Color Constants

Access theme colors programmatically for runtime styling:

```tsx
import { useTheme } from 'heroui-native';

function MyComponent() {
  const { colors } = useTheme();

  return (
    <View style={{ backgroundColor: colors.background }}>
      <Text style={{ color: colors.foreground }}>Hello World</Text>
    </View>
  );
}
```

### useTheme Hook

The `useTheme` hook provides complete theme control:

```tsx
import { useTheme } from 'heroui-native';

function ThemeToggle() {
  const { theme, isDark, toggleTheme, setTheme, colors } = useTheme();

  return (
    <View>
      <Text>Current theme: {theme}</Text>
      <Text>Is dark mode: {isDark ? 'Yes' : 'No'}</Text>

      <Button onPress={toggleTheme}>Toggle Theme</Button>

      <Button onPress={() => setTheme('dark')}>Set Dark Theme</Button>

      <View style={{ backgroundColor: colors.accent }}>
        <Text style={{ color: colors.accentForeground }}>Accent Color</Text>
      </View>
    </View>
  );
}
```

### ColorKit Utilities

HeroUI includes a powerful color manipulation library adapted from the excellent [reanimated-color-picker](https://github.com/alabsi91/reanimated-color-picker) by [@alabsi91](https://github.com/alabsi91). Special thanks to the original author for creating such a comprehensive color utility library!

ColorKit powers HeroUI's internal theme color processing and manipulation, ensuring consistent color transformations across all theme configurations. As a bonus, these utilities are also exposed for your use in creating dynamic color variations.

For detailed documentation and advanced usage, please refer to the [ColorKit documentation](https://alabsi91.github.io/reanimated-color-picker/docs/ColorKit).

Basic usage examples:

```tsx
import { colorKit, useTheme } from 'heroui-native';

const { colors } = useTheme();

// Set alpha/opacity - useful for transparent variations
const transparent = colorKit.setAlpha(colors.accent, 0); // 50% opacity
const semiTransparent = colorKit.setAlpha(colors.accent, 0.5); // 50% opacity

// Convert between color formats
const hsl = colorKit.hex2hsl('#ff0000'); // Returns: { h: 0, s: 100, l: 50 }
const rgb = colorKit.hsl2rgb(hsl); // Returns: { r: 255, g: 0, b: 0 }
const hex = colorKit.rgb2hex(rgb); // Returns: '#ff0000'

// Manipulate colors
const lighter = colorKit.lighten('#ff0000', 20); // 20% lighter
const darker = colorKit.darken('#ff0000', 20); // 20% darker
const saturated = colorKit.saturate('#ff0000', 30); // 30% more saturated

// Check color properties
const isLight = colorKit.isLight('#ffffff'); // true
const isDark = colorKit.isDark('#000000'); // true
const luminance = colorKit.getLuminance('#808080'); // 0.5

// Generate color harmonies
const complementary = colorKit.getComplementary('#ff0000');
const triadic = colorKit.getTriadic('#ff0000');
const analogous = colorKit.getAnalogous('#ff0000');
```

## Default Theme Options

HeroUI Native comes with carefully crafted light and dark themes out of the box. Each theme provides a complete set of semantic color tokens designed for optimal contrast and readability in their respective modes. The theme system automatically switches between these themes based on your configuration or system preferences.

The semantic color tokens serve specific purposes across both themes:

### Base Colors

- **`background`**: Main app background color
- **`foreground`**: Default text color on background
- **`panel`**: Elevated panel/card background
- **`muted`**: Subdued color for less important elements
- **`mutedForeground`**: Text color for muted elements

### Interactive Colors

- **`surface`**: Interactive surface background
- **`surfaceForeground`**: Text on interactive surfaces
- **`default`**: Default button/input background
- **`defaultForeground`**: Text on default elements
- **`accent`**: Primary brand/accent color
- **`accentForeground`**: Text on accent backgrounds
- **`accentSoft`**: Softer accent variant
- **`accentSoftForeground`**: Text on soft accent

### Status Colors

- **`success`**: Success state background
- **`successForeground`**: Text on success backgrounds
- **`warning`**: Warning state background
- **`warningForeground`**: Text on warning backgrounds
- **`danger`**: Error/danger state background
- **`dangerForeground`**: Text on danger backgrounds

### Surface Levels

- **`surface1`**: Base elevation level
- **`surface2`**: Medium elevation level
- **`surface3`**: High elevation level

### Utility Colors

- **`border`**: Default border color
- **`divider`**: Divider/separator color
- **`link`**: Link text color

### Layout Variables

#### Base Variables

- **`radius`**: Base border radius (default: 12px)
- **`radiusPanel`**: Panel border radius (default: 8px)
- **`radiusPanelInner`**: Inner panel radius (default: 4px)
- **`opacityDisabled`**: Disabled state opacity (default: 0.5)

#### Calculated Radius Variants

The theme system automatically calculates radius variants based on the base `radius` value:

- **`rounded-xs`**: `calc(var(--radius) * 0.25)` — 25% of base radius (3px with default)
- **`rounded-sm`**: `calc(var(--radius) * 0.5)` — 50% of base radius (6px with default)
- **`rounded-md`**: `calc(var(--radius) * 0.75)` — 75% of base radius (9px with default)
- **`rounded-lg`**: `calc(var(--radius) * 1)` — 100% of base radius (12px with default)
- **`rounded-xl`**: `calc(var(--radius) * 1.5)` — 150% of base radius (18px with default)
- **`rounded-2xl`**: `calc(var(--radius) * 2)` — 200% of base radius (24px with default)
- **`rounded-3xl`**: `calc(var(--radius) * 3)` — 300% of base radius (36px with default)
- **`rounded-4xl`**: `calc(var(--radius) * 4)` — 400% of base radius (48px with default)

These calculated values ensure consistent radius scaling throughout your application. When you customize the base `radius`, all variants automatically scale proportionally.

## Customization

### Basic Theme Customization

Override specific colors while preserving the rest of the theme:

```tsx
const customTheme = {
  light: {
    colors: {
      background: '#ffffff',
      foreground: '#000000',
      accent: '#0066cc',
      accentForeground: '#ffffff',
    },
  },
  dark: {
    colors: {
      background: '#1a1a1a',
      foreground: '#ffffff',
      accent: '#4499ff',
      accentForeground: '#000000',
    },
  },
};

<ThemeProvider theme={customTheme}>{/* Your app */}</ThemeProvider>;
```

### Advanced Customization

Customize colors, border radius, and opacity values:

```tsx
const customTheme = {
  light: {
    colors: {
      // Colors in any format (hex, rgb, hsl, etc.)
      background: 'hsl(0 0% 100%)',
      foreground: 'rgb(0, 0, 0)',
      accent: '#0066cc',
      success: 'hsl(120 60% 50%)',
      // ... other colors
    },
    borderRadius: {
      'DEFAULT': '16px', // Base radius
      'panel': '12px', // Panel radius
      'panel-inner': '6px', // Inner panel radius
    },
    opacity: {
      disabled: 0.6, // Custom disabled opacity
    },
  },
  dark: {
    colors: {
      background: 'hsl(0 0% 5%)',
      foreground: 'hsl(0 0% 95%)',
      // ... other colors
    },
  },
};

<ThemeProvider theme={customTheme} colorScheme="system">
  {/* Your app */}
</ThemeProvider>;
```

### Color Format Support

The theme system accepts colors in multiple formats:

```tsx
const theme = {
  light: {
    colors: {
      // Hexadecimal
      accent: '#0066cc',

      // RGB/RGBA
      success: 'rgb(34, 197, 94)',
      warning: 'rgba(251, 146, 60, 0.9)',

      // HSL/HSLA
      danger: 'hsl(0 72% 51%)',
      muted: 'hsla(0, 0%, 45%, 0.8)',

      // Named colors
      background: 'white',
      foreground: 'black',
    },
  },
};
```

All colors are automatically converted to HSL format internally for consistency and manipulation.

## API Reference

### ThemeProvider

| Prop          | Type                            | Default     | Description                                                   |
| ------------- | ------------------------------- | ----------- | ------------------------------------------------------------- |
| `children`    | `React.ReactNode`               | Required    | React children components to be wrapped by the theme provider |
| `colorScheme` | `'light' \| 'dark' \| 'system'` | `'system'`  | Initial color scheme to use                                   |
| `theme`       | `ThemeConfig`                   | `undefined` | Custom theme configuration using Tailwind's extend pattern    |

### useTheme Hook

Returns an object with the following properties:

| Property      | Type                                 | Description                                      |
| ------------- | ------------------------------------ | ------------------------------------------------ |
| `theme`       | `'light' \| 'dark'`                  | Current active theme                             |
| `isDark`      | `boolean`                            | Whether the current theme is dark                |
| `colors`      | `ColorConstants`                     | The theme colors in HSL format                   |
| `toggleTheme` | `() => void`                         | Function to toggle between light and dark themes |
| `setTheme`    | `(theme: 'light' \| 'dark') => void` | Function to set a specific theme                 |

```tsx
const { theme, isDark, colors, toggleTheme, setTheme } = useTheme();
```

### Theme Configuration

#### ThemeConfig Structure

| Property | Type             | Description                        |
| -------- | ---------------- | ---------------------------------- |
| `light`  | `ThemeExtension` | Optional light theme customization |
| `dark`   | `ThemeExtension` | Optional dark theme customization  |

#### ThemeExtension Properties

| Property                   | Type                      | Description                           |
| -------------------------- | ------------------------- | ------------------------------------- |
| `colors`                   | `Partial<ColorConstants>` | Custom color overrides                |
| `borderRadius`             | `object`                  | Custom border radius values           |
| `borderRadius.DEFAULT`     | `string`                  | Base border radius (default: '12px')  |
| `borderRadius.panel`       | `string`                  | Panel border radius (default: '8px')  |
| `borderRadius.panel-inner` | `string`                  | Inner panel radius (default: '4px')   |
| `opacity`                  | `object`                  | Custom opacity values                 |
| `opacity.disabled`         | `number`                  | Disabled state opacity (default: 0.5) |

### Color Constants Type

All color properties accept string values in any format supported by ColorKit (hex, rgb, hsl, etc.).

#### Base Colors

| Property          | Description                               |
| ----------------- | ----------------------------------------- |
| `background`      | Main app background color                 |
| `foreground`      | Default text color on background          |
| `panel`           | Elevated panel/card background            |
| `muted`           | Subdued color for less important elements |
| `mutedForeground` | Text color for muted elements             |

#### Interactive Colors

| Property               | Description                     |
| ---------------------- | ------------------------------- |
| `surface`              | Interactive surface background  |
| `surfaceForeground`    | Text on interactive surfaces    |
| `default`              | Default button/input background |
| `defaultForeground`    | Text on default elements        |
| `accent`               | Primary brand/accent color      |
| `accentForeground`     | Text on accent backgrounds      |
| `accentSoft`           | Softer accent variant           |
| `accentSoftForeground` | Text on soft accent             |

#### Status Colors

| Property            | Description                   |
| ------------------- | ----------------------------- |
| `success`           | Success state background      |
| `successForeground` | Text on success backgrounds   |
| `warning`           | Warning state background      |
| `warningForeground` | Text on warning backgrounds   |
| `danger`            | Error/danger state background |
| `dangerForeground`  | Text on danger backgrounds    |

#### Surface Levels

| Property   | Description            |
| ---------- | ---------------------- |
| `surface1` | Base elevation level   |
| `surface2` | Medium elevation level |
| `surface3` | High elevation level   |

#### Utility Colors

| Property  | Description             |
| --------- | ----------------------- |
| `border`  | Default border color    |
| `divider` | Divider/separator color |
| `link`    | Link text color         |

## Best Practices

1. **Use Semantic Tokens**: Prefer semantic color names (`accent`, `success`) over raw colors for better maintainability.

2. **Respect System Preferences**: Use `colorScheme="system"` to automatically match the device's theme preference.

3. **Test Both Themes**: Always test your UI in both light and dark modes to ensure proper contrast and readability.

4. **Consistent Color Formats**: While the system accepts multiple formats, stick to one format (preferably HSL) for consistency.

5. **Leverage CSS Variables**: Use NativeWind classes for styling when possible, falling back to runtime colors only when necessary.

6. **Theme-Aware Components**: Build components that automatically adapt to theme changes using the `useTheme` hook.

## Examples

### Theme-Aware Card Component

```tsx
import { View, Text } from 'react-native';
import { useTheme } from 'heroui-native/theme';

export function Card({ title, children }) {
  const { isDark } = useTheme();

  return (
    <View
      className={`
      bg-panel rounded-lg p-4 
      ${isDark ? 'shadow-xl' : 'shadow-md'}
    `}
    >
      <Text className="text-foreground text-lg font-bold mb-2">{title}</Text>
      <View className="text-muted-foreground">{children}</View>
    </View>
  );
}
```

### Dynamic Color Interpolation

```tsx
import { colorKit } from 'heroui-native/theme';
import { useTheme } from 'heroui-native/theme';

function GradientButton({ onPress, children }) {
  const { colors } = useTheme();

  // Create gradient from accent color
  const gradientStart = colors.accent;
  const gradientEnd = colorKit.lighten(colors.accent, 20);

  return (
    <LinearGradient
      colors={[gradientStart, gradientEnd]}
      className="rounded-lg p-4"
    >
      <TouchableOpacity onPress={onPress}>
        <Text className="text-accent-foreground font-bold">{children}</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}
```
